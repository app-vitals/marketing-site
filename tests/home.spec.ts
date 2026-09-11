import { test, expect } from './fixtures';

test('home page loads and renders the hero heading', async ({ page }) => {
  const response = await page.goto('/');
  expect(response?.status()).toBe(200);

  const heading = page.locator('h1');
  await expect(heading).toContainText('The open source alternative to Devin.');
  await expect(heading.locator('.gradient-text')).toHaveText(
    'Installed and operated by the people who built it.'
  );
});
