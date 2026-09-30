import { test, expect } from './fixtures';

// Regression guard for the 2026-08-29 analytics outage: PR #131 hand-rewrote
// Google's gtag snippet as `function gtag(...args) { dataLayer.push(args) }` on a
// bundled (non-`is:inline`) script. That pushed a real Array instead of the
// `arguments` object, and Astro renamed `gtag` while scoping it to an ES module —
// so `window.gtag` was undefined and GA4 never saw a `config` command. Every
// BaseLayout page recorded zero sessions for a month.
//
// The `arguments` object is load-bearing: GA4's command queue identifies commands
// by it, so an Array-valued entry is silently ignored. These assertions must
// therefore distinguish `[object Arguments]` from `[object Array]` — a test that
// merely finds a `config` entry passes on the broken code too.
//
// The `fixtures` stub blocks the real gtag.js loader, but the inline snippet still
// runs, so `window.gtag` and `dataLayer` are populated exactly as in production.
// Nothing consumes dataLayer under the stub, so pushed entries stay as-pushed.

test('GA4 inline snippet defines a global gtag function on /', async ({ page }) => {
  const response = await page.goto('/');
  expect(response?.status()).toBe(200);

  const gtagType = await page.evaluate(() => typeof (window as { gtag?: unknown }).gtag);
  expect(gtagType).toBe('function');
});

test('GA4 config command is queued as an arguments object, not an Array', async ({ page }) => {
  await page.goto('/');

  const configEntries = await page.evaluate(() => {
    const layer = (window as { dataLayer?: unknown[] }).dataLayer ?? [];
    return layer.map((entry) => ({
      tag: Object.prototype.toString.call(entry),
      first: (entry as ArrayLike<unknown>)[0],
      second: (entry as ArrayLike<unknown>)[1],
    }));
  });

  // The config command must be present AND carried by an arguments object.
  expect(configEntries).toContainEqual({
    tag: '[object Arguments]',
    first: 'config',
    second: 'G-H7QY6C7T1L',
  });

  // Belt-and-braces: no entry may be a plain Array. This is what fails on the
  // rest-parameter form, where the config entry arrives as [object Array].
  expect(configEntries.map((e) => e.tag)).not.toContain('[object Array]');
});

test('GA4 snippet ships inline and unminified, with the gtag identifier intact', async ({ page }) => {
  await page.goto('/');

  // `is:inline` keeps the snippet in the document instead of bundling it into a
  // module where Astro would rename `gtag` and scope it away from `window`.
  const html = await page.content();
  expect(html).toContain('function gtag(');
  expect(html).toMatch(/gtag\(\s*['"]config['"]\s*,\s*['"]G-H7QY6C7T1L['"]\s*\)/);

  // The rest-parameter form that caused the outage must not come back.
  expect(html).not.toMatch(/function\s+\w+\s*\(\s*\.\.\./);
});
