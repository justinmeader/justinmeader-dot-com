import { test, expect } from '@playwright/test';

test('homepage loads and hero copy is visible', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Justin Meader/i);
  await expect(page.getByRole('heading', { name: 'Justin Meader' })).toBeVisible();
  await expect(page.getByText('A personal blog about systems, AI, games, guitar, and astrophotography in Maine.')).toBeVisible();
});

test('primary navigation links respond', async ({ page }) => {
  await page.goto('/');

  const links = await page.locator('a[href]').all();
  const checked = new Set<string>();
  const baseOrigin = new URL(page.url()).origin;
  let successful = 0;

  for (const link of links) {
    const isVisible = await link.isVisible().catch(() => false);
    if (!isVisible) continue;

    const href = await link.getAttribute('href');
    if (!href) continue;

    const url = new URL(href, page.url());
    if (url.origin !== baseOrigin) continue;

    const key = url.toString();
    if (checked.has(key)) continue;
    checked.add(key);

    const response = await page.request.get(key, { failOnStatusCode: false });
    if (response.status() < 400) successful++;

    if (checked.size >= 8) break;
  }

  expect(checked.size).toBeGreaterThan(0);
  expect(successful).toBeGreaterThan(0);
});

test('/about route is stable and accessible', async ({ page }) => {
  const response = await page.goto('/about');
  expect(response).not.toBeNull();
  expect(response!.status()).toBeLessThan(400);
  await expect(page).toHaveURL(/\/about/);
});
