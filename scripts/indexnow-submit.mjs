#!/usr/bin/env node

/**
 * Submit the canonical URLs from public/sitemap.xml to IndexNow.
 *
 * This script is deliberately dry-run by default. With --submit it first
 * verifies that every host serves the required ownership key before sending
 * any notification, preventing invalid submissions and accidental spam.
 */
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const KEY_PATTERN = /^[A-Za-z0-9-]{8,128}$/;
const args = process.argv.slice(2);
const submit = args.includes('--submit');
const hostFilters = args
  .filter((arg) => arg.startsWith('--host='))
  .map((arg) => arg.slice('--host='.length).toLowerCase());
const sitemapArg = args.find((arg) => arg.startsWith('--sitemap='));
const sitemapPath = resolve(process.cwd(), sitemapArg?.slice('--sitemap='.length) || 'public/sitemap.xml');
const endpoint = process.env.INDEXNOW_ENDPOINT || 'https://api.indexnow.org/indexnow';
const key = process.env.INDEXNOW_KEY;

if (!key || !KEY_PATTERN.test(key)) {
  console.error('INDEXNOW_KEY must be an 8–128 character key containing only letters, numbers, and hyphens.');
  process.exit(1);
}

const sitemap = await readFile(sitemapPath, 'utf8');
const urls = [...sitemap.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((match) => match[1]);
if (urls.length === 0) {
  throw new Error(`No <loc> entries found in ${sitemapPath}`);
}

const byHost = new Map();
for (const rawUrl of urls) {
  const url = new URL(rawUrl);
  if (url.protocol !== 'https:') throw new Error(`Only HTTPS URLs may be submitted: ${rawUrl}`);
  if (hostFilters.length > 0 && !hostFilters.includes(url.hostname.toLowerCase())) continue;
  const list = byHost.get(url.hostname) || [];
  list.push(url.href);
  byHost.set(url.hostname, list);
}

if (byHost.size === 0) {
  throw new Error('No sitemap URLs matched the requested --host filter.');
}

for (const [host, urlList] of byHost) {
  const keyLocation = `https://${host}/${key}.txt`;
  console.log(`${host}: ${urlList.length} canonical URL${urlList.length === 1 ? '' : 's'}`);
  console.log(`  ownership key: ${keyLocation}`);

  if (!submit) continue;

  const keyResponse = await fetch(keyLocation, { redirect: 'error' });
  const keyBody = (await keyResponse.text()).trim();
  if (!keyResponse.ok || keyBody !== key) {
    throw new Error(`Ownership verification failed for ${host} (${keyResponse.status}). Deploy the key file before submitting.`);
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host, key, keyLocation, urlList }),
  });
  const body = await response.text();
  if (!response.ok) throw new Error(`IndexNow rejected ${host}: ${response.status} ${body}`);
  console.log(`  submitted: ${response.status}${body ? ` ${body}` : ''}`);
}

if (!submit) console.log('Dry run only. Re-run with --submit after the deployed key URL is reachable.');
