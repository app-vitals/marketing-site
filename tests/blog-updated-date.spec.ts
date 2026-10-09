import type { Page } from '@playwright/test';
import { test, expect } from './fixtures';

// A substantive post edit is signalled to crawlers via the optional `updated`
// frontmatter field: it drives both the sitemap <lastmod> and the BlogPosting
// dateModified. Posts without `updated` fall back to their publish `date`.
const UPDATED_POST = '/blog/shipwright-vs-claude-code-orchestrators/';
const UNCHANGED_POST = '/blog/shipwright-vs-devin/';

async function blogPosting(page: Page, url: string) {
  const response = await page.goto(url);
  expect(response?.status()).toBe(200);
  const blocks: Record<string, string>[] = await page
    .locator('script[type="application/ld+json"]')
    .evaluateAll((els) => els.map((el) => JSON.parse(el.textContent ?? '{}')));
  const posting = blocks.find((b) => b['@type'] === 'BlogPosting');
  expect(posting).toBeDefined();
  return posting!;
}

test('BlogPosting dateModified uses `updated` when set, else `date`', async ({ page }) => {
  const updated = await blogPosting(page, UPDATED_POST);
  expect(updated.datePublished).toBe('2026-08-14');
  expect(updated.dateModified).toBe('2026-10-07');

  const unchanged = await blogPosting(page, UNCHANGED_POST);
  expect(unchanged.dateModified).toBe(unchanged.datePublished);
});

test('sitemap lastmod uses `updated` when set, else `date`', async ({ request }) => {
  const xml = await (await request.get('/sitemap-0.xml')).text();
  const lastmod = (path: string) =>
    xml.match(new RegExp(`<loc>https://app-vitals.com${path}</loc><lastmod>([^<]+)</lastmod>`))?.[1];

  expect(lastmod(UPDATED_POST)).toMatch(/^2026-10-07/);
  expect(lastmod(UNCHANGED_POST)).not.toMatch(/^2026-10-07/);
});
