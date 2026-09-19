/* Service worker for resilient offline reading. Kept dependency-free so it
 * works on both Vercel and GitHub Pages, including the /publications/ base. */
const CACHE_NAME = 'asr-publications-v1';
const scopeUrl = new URL(self.registration.scope);
const appShellUrl = new URL('./', scopeUrl).href;
const manifestUrl = new URL('./site.webmanifest', scopeUrl).href;

async function precacheAppShell() {
  const cache = await caches.open(CACHE_NAME);
  const response = await fetch(appShellUrl, { cache: 'no-cache' });
  if (!response.ok) throw new Error(`Unable to cache application shell: ${response.status}`);

  const html = await response.clone().text();
  await cache.put(appShellUrl, response);

  // Vite fingerprints the entry assets in index.html. Extracting only
  // same-origin href/src values gives a reliable offline first launch without
  // caching third-party services such as analytics or CDN-hosted styles.
  const assets = [...html.matchAll(/(?:src|href)=["']([^"']+)["']/g)]
    .map((match) => new URL(match[1], appShellUrl))
    .filter((url) => url.origin === self.location.origin)
    .map((url) => url.href);

  await cache.addAll([...new Set([manifestUrl, ...assets])]);
}

self.addEventListener('install', (event) => {
  event.waitUntil(precacheAppShell());
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key.startsWith('asr-publications-') && key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Network-first navigation keeps current research pages fresh. When offline,
  // the cached app shell still lets readers browse content loaded previously.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(async () => (await caches.match(request)) || (await caches.match(appShellUrl)))
    );
    return;
  }

  // Cache-first for same-origin build assets. A background refresh means a
  // temporary network failure never prevents an already visited page loading.
  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
