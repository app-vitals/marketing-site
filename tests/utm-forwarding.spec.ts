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

test('forwards UTM params from the URL onto booking CTA links on /products/shipwright', async ({ page }) => {
  const response = await page.goto(
    '/products/shipwright/?utm_source=linkedin&utm_medium=paid_social&utm_campaign=shipwright-q3-2026'
  );
  expect(response?.status()).toBe(200);

  const bookingLinks = page.locator('a[href*="vitals-os.com/cal/book/discovery"]');
  const count = await bookingLinks.count();
  expect(count).toBeGreaterThan(0);

  for (let i = 0; i < count; i++) {
    const href = await bookingLinks.nth(i).getAttribute('href');
    expect(href).toBe(
      'https://vitals-os.com/cal/book/discovery?utm_source=linkedin&utm_medium=paid_social&utm_campaign=shipwright-q3-2026'
    );
  }
});

test('forwards UTM params from the URL onto booking CTA links on /contact', async ({ page }) => {
  const response = await page.goto(
    '/contact/?utm_source=linkedin&utm_medium=paid_social&utm_campaign=shipwright-q3-2026'
  );
  expect(response?.status()).toBe(200);

  const bookingLink = page.locator('a[href*="vitals-os.com/cal/book/discovery"]').first();
  const href = await bookingLink.getAttribute('href');
  expect(href).toBe(
    'https://vitals-os.com/cal/book/discovery?utm_source=linkedin&utm_medium=paid_social&utm_campaign=shipwright-q3-2026'
  );
});

test('leaves booking CTA hrefs unchanged when no UTM params are present', async ({ page }) => {
  const response = await page.goto('/products/shipwright/');
  expect(response?.status()).toBe(200);

  const bookingLinks = page.locator('a[href*="vitals-os.com/cal/book/discovery"]');
  const count = await bookingLinks.count();
  expect(count).toBeGreaterThan(0);

  for (let i = 0; i < count; i++) {
    const href = await bookingLinks.nth(i).getAttribute('href');
    expect(href).toBe('https://vitals-os.com/cal/book/discovery');
  }
});

test('only forwards the recognized UTM params present, leaving others out', async ({ page }) => {
  const response = await page.goto(
    '/products/shipwright/?utm_source=linkedin&utm_content=video-ad&other_param=ignore-me'
  );
  expect(response?.status()).toBe(200);

  const bookingLink = page.locator('a[href*="vitals-os.com/cal/book/discovery"]').first();
  const href = await bookingLink.getAttribute('href');
  expect(href).toBe('https://vitals-os.com/cal/book/discovery?utm_source=linkedin&utm_content=video-ad');
});
