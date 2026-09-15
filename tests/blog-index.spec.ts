import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { test, expect } from './fixtures';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogContentDir = path.join(__dirname, '../src/content/blog');

// Derives the expected N most-recent post slugs from the actual content
// collection on disk, sorted by frontmatter `date` — so this test stays
// correct as new posts are added instead of hardcoding slugs that go stale.
function mostRecentSlugs(count: number): string[] {
  const posts = readdirSync(blogContentDir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const raw = readFileSync(path.join(blogContentDir, file), 'utf-8');
      const match = raw.match(/^date:\s*"([^"]+)"/m);
      return { id: file.replace(/\.md$/, ''), date: match?.[1] ?? '' };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts.slice(0, count).map((post) => `/blog/${post.id}`);
}

test('blog index lists posts in strict descending date order', async ({ page }) => {
  const response = await page.goto('/blog/');
  expect(response?.status()).toBe(200);

  const cards = page.locator('div.space-y-2 > a');
  const count = await cards.count();
  expect(count).toBeGreaterThan(1);

  const hrefs = await cards.evaluateAll((links) => links.map((el) => el.getAttribute('href')));

  const dateTexts = await cards.evaluateAll((links) =>
    links.map((el) => el.querySelector('span.font-mono.text-\\[12px\\].text-white\\/30')?.textContent?.trim())
  );

  const dates = dateTexts.map((text) => new Date(text as string).getTime());
  dates.forEach((t) => expect(Number.isNaN(t)).toBe(false));

  for (let i = 0; i < dates.length - 1; i++) {
    expect(dates[i]).toBeGreaterThanOrEqual(dates[i + 1]);
  }

  // The two newest posts must be first, derived from the actual content
  // collection's frontmatter dates rather than hardcoded slugs.
  const [first, second] = mostRecentSlugs(2);
  expect(hrefs[0]).toBe(first);
  expect(hrefs[1]).toBe(second);
});
