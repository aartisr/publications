import { useEffect, useState } from 'react';
import { Download, Share2, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

const isStandalone = () =>
  window.matchMedia('(display-mode: standalone)').matches ||
  (navigator as Navigator & { standalone?: boolean }).standalone === true;

export function PwaInstallPrompt() {
  const [promptEvent, setPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [installed, setInstalled] = useState(() => typeof window !== 'undefined' && isStandalone());
  const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as Window & { MSStream?: unknown }).MSStream;

  useEffect(() => {
    const onBeforeInstall = (event: Event) => {
      event.preventDefault();
      setPromptEvent(event as BeforeInstallPromptEvent);
    };
    const onInstalled = () => {
      setInstalled(true);
      setIsOpen(false);
      setPromptEvent(null);
    };
    window.addEventListener('beforeinstallprompt', onBeforeInstall);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  const install = async () => {
    if (!promptEvent) return;
    await promptEvent.prompt();
    const choice = await promptEvent.userChoice;
    if (choice.outcome === 'accepted') setInstalled(true);
    setPromptEvent(null);
    setIsOpen(false);
  };

  if (installed) return null;

  return (
    <div className="fixed bottom-5 left-4 sm:left-6 z-40">
      {isOpen && (
        <section id="pwa-install-help" className="mb-2 w-[min(20rem,calc(100vw-2rem))] rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-xl backdrop-blur" aria-label="Install this app">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Keep the archive handy</h2>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">
                Install for a focused, app-like reader and resilient access to recently opened pages.
              </p>
            </div>
            <button onClick={() => setIsOpen(false)} className="rounded-lg p-1 text-slate-500 hover:bg-slate-100" aria-label="Close install help">
              <X className="h-4 w-4" />
            </button>
          </div>

          {promptEvent ? (
            <button onClick={install} className="mt-3 inline-flex min-h-10 items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-xs font-bold text-white hover:bg-slate-700">
              <Download className="h-4 w-4" /> Install app
            </button>
          ) : isIos ? (
            <p className="mt-3 flex items-center gap-1.5 text-xs font-medium text-slate-700">
              <Share2 className="h-4 w-4" /> Tap Share, then <strong>Add to Home Screen</strong>.
            </p>
          ) : (
            <p className="mt-3 text-xs font-medium text-slate-700">Use your browser menu and choose <strong>Install app</strong> or <strong>Add to Home screen</strong>.</p>
          )}
        </section>
      )}

      <button onClick={() => setIsOpen((open) => !open)} className="inline-flex h-9 items-center gap-1.5 rounded-full border border-slate-300 bg-white/90 px-3 text-[11px] font-semibold text-slate-600 shadow-sm backdrop-blur hover:border-slate-400 hover:text-slate-900" aria-expanded={isOpen} aria-controls="pwa-install-help">
        <Download className="h-3.5 w-3.5" /> Install
      </button>
    </div>
  );
}
