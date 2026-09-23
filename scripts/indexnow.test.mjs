#!/usr/bin/env node
/**
 * Unit test for the pure logic in the IndexNow submitter (sitemap URL extraction + payload
 * building). Framework-free: plain node assert, exits non-zero on failure. Not part of the
 * Playwright e2e suite (this repo's only other test layer) — run directly with `node`, and wired
 * into .github/workflows/indexnow.yml so it actually executes in CI.
 */
import assert from 'node:assert/strict';
import { sitemapUrls, buildPayload } from './indexnow.mjs';

// Sitemap index (parent) form.
const indexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>https://app-vitals.com/sitemap-0.xml</loc></sitemap>
</sitemapindex>`;
assert.deepEqual(sitemapUrls(indexXml), ['https://app-vitals.com/sitemap-0.xml']);

// Child sitemap (urlset) form, including whitespace-padded <loc> content.
const childXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://app-vitals.com/</loc></url>
  <url><loc>https://app-vitals.com/blog/why-ai-adoption-fails/</loc></url>
  <url><loc> https://app-vitals.com/contact/ </loc></url>
</urlset>`;
assert.deepEqual(sitemapUrls(childXml), [
  'https://app-vitals.com/',
  'https://app-vitals.com/blog/why-ai-adoption-fails/',
  'https://app-vitals.com/contact/',
]);

// Empty/malformed/missing input yields no URLs rather than throwing.
assert.deepEqual(sitemapUrls(''), []);
assert.deepEqual(sitemapUrls('<urlset></urlset>'), []);
assert.deepEqual(sitemapUrls(undefined), []);

// Payload shape.
const payload = buildPayload('app-vitals.com', 'abc123', ['https://app-vitals.com/']);
assert.deepEqual(payload, {
  host: 'app-vitals.com',
  key: 'abc123',
  keyLocation: 'https://app-vitals.com/abc123.txt',
  urlList: ['https://app-vitals.com/'],
});

// Payload caps at the configured max (IndexNow's per-request limit is 10,000).
const manyUrls = Array.from({ length: 10 }, (_, i) => `https://app-vitals.com/p${i}/`);
const capped = buildPayload('app-vitals.com', 'abc123', manyUrls, 3);
assert.equal(capped.urlList.length, 3);
assert.deepEqual(capped.urlList, manyUrls.slice(0, 3));

console.log('indexnow.test: ok');
