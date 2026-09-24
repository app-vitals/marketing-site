#!/usr/bin/env node
/**
 * Post-deploy: submit every URL in the sitemap to IndexNow (Bing, DuckDuckGo, Seznam, Yandex —
 * Google does not consume IndexNow) so new/changed pages are discovered without waiting for a
 * recrawl. The key file (public/<key>.txt, served at the site root) is how IndexNow verifies
 * ownership; the workflow that calls this script waits for that file to be live before running it.
 *
 * Framework-free and defensive: any failure (network, malformed XML, missing sitemap) is logged
 * and swallowed — an indexing ping must never fail the deploy pipeline.
 */
import { setTimeout as delay } from 'node:timers/promises';

const HOST = 'app-vitals.com';
const KEY = 'd3dd28858177e41cc59346acba3eea63';
const SITE_ORIGIN = `https://${HOST}`;
const SITEMAP_INDEX_URL = `${SITE_ORIGIN}/sitemap-index.xml`;
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';
const MAX_URLS = 10000; // IndexNow per-request cap
const FETCH_TIMEOUT_MS = 15000;

/** Extract <loc> URLs from sitemap (or sitemap-index) XML. Exported for the unit test. */
export function sitemapUrls(xml) {
  if (!xml) return [];
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

/** Build the IndexNow submission payload. Exported for the unit test. */
export function buildPayload(host, key, urls, maxUrls = MAX_URLS) {
  return {
    host,
    key,
    keyLocation: `https://${host}/${key}.txt`,
    urlList: urls.slice(0, maxUrls),
  };
}

async function fetchText(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} fetching ${url}`);
    }
    return await res.text();
  } finally {
    clearTimeout(timer);
  }
}

async function collectSitemapUrls() {
  const indexXml = await fetchText(SITEMAP_INDEX_URL);
  const childSitemaps = sitemapUrls(indexXml);
  if (childSitemaps.length === 0) {
    console.error(`indexnow: no child sitemaps found in ${SITEMAP_INDEX_URL}; skipping.`);
    return [];
  }

  const urls = [];
  for (const sitemapUrl of childSitemaps) {
    try {
      const xml = await fetchText(sitemapUrl);
      urls.push(...sitemapUrls(xml));
    } catch (err) {
      console.error(`indexnow: failed to fetch/parse ${sitemapUrl} (non-fatal): ${err.message}`);
    }
    // Be polite between sitemap fetches; irrelevant for a single child sitemap, cheap insurance
    // if the site ever grows past astro-sitemap's per-file page cap.
    await delay(50);
  }
  return urls;
}

async function main() {
  const urls = await collectSitemapUrls();
  if (urls.length === 0) {
    console.error('indexnow: no URLs found in sitemap(s); skipping.');
    return;
  }

  const payload = buildPayload(HOST, KEY, urls);
  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  });
  // 200/202 = accepted. Anything else is logged but non-fatal.
  console.log(`indexnow: submitted ${payload.urlList.length} URLs -> HTTP ${res.status}`);
}

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].split('/').pop())) {
  main().catch((err) => {
    console.error(`indexnow: failed (non-fatal): ${err.message}`);
  });
}
