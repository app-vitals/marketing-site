import { test as base, expect } from '@playwright/test';

// Every test navigates through this fixture so external requests (fonts,
// Google Tag Manager) are stubbed before the first goto. This keeps CI
// runs (which do have real network access) from ever loading the real
// gtag.js and reporting Playwright page loads as live traffic in GA4.
export const test = base.extend({
  page: async ({ page }, use) => {
    await page.route(
      /fonts\.googleapis\.com|fonts\.gstatic\.com|api\.fontshare\.com|googletagmanager\.com/,
      (route) => route.fulfill({ status: 200, contentType: 'text/plain', body: '' })
    );
    await use(page);
  },
});

export { expect };
