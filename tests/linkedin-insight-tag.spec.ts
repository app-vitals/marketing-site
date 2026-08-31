import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.route(
    /fonts\.googleapis\.com|fonts\.gstatic\.com|api\.fontshare\.com|googletagmanager\.com/,
    (route) => route.fulfill({ status: 200, contentType: 'text/plain', body: '' })
  );
});

test('LinkedIn Insight Tag uses the correct partner ID on /', async ({ page }) => {
  const response = await page.goto('/');
  expect(response?.status()).toBe(200);

  const html = await page.content();
  expect(html).not.toContain('519276394');
  expect(html).toMatch(/_linkedin_partner_id\s*=\s*["']9897204["']/);
  expect(html).toContain('pid=9897204');
});
