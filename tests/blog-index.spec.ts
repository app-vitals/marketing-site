import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.route(
    /fonts\.googleapis\.com|fonts\.gstatic\.com|api\.fontshare\.com|googletagmanager\.com/,
    (route) => route.fulfill({ status: 200, contentType: 'text/plain', body: '' })
  );
});

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

  // The two newest posts must be first, matching the real frontmatter dates.
  expect(hrefs[0]).toBe('/blog/unlimited-resources-arent-the-bottleneck');
  expect(hrefs[1]).toBe('/blog/pointy-haired-boss');
});
