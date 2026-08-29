import { test, expect } from '@playwright/test';

// Fulfill external font/analytics requests with an empty 200 response so the
// page's 'load' event fires reliably even when the CI runner can't reach
// external networks (Google Fonts, Fontshare, Google Tag Manager).
test.beforeEach(async ({ page }) => {
  await page.route(
    /fonts\.googleapis\.com|fonts\.gstatic\.com|api\.fontshare\.com|googletagmanager\.com/,
    (route) => route.fulfill({ status: 200, contentType: 'text/plain', body: '' })
  );
});

test('home page loads and renders the hero heading', async ({ page }) => {
  const response = await page.goto('/');
  expect(response?.status()).toBe(200);

  const heading = page.locator('h1');
  await expect(heading).toContainText('THIS ASSERTION IS DELIBERATELY WRONG');
  await expect(heading.locator('.gradient-text')).toHaveText(
    'Installed and operated by the people who built it.'
  );
});
