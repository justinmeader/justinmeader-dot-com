import { test, expect } from '@playwright/test';

test('homepage loads and hero copy is visible', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Justin Meader/i);
  await expect(page.getByRole('heading', { name: 'Justin Meader' })).toBeVisible();
  await expect(page.getByText('A personal blog about systems, AI, games, guitar, and astrophotography in Maine.')).toBeVisible();
});

test('primary navigation links respond', async ({ page }) => {
  await page.goto('/');

  const names = ['Writings', 'About'];
  for (const name of names) {
    const link = page.getByRole('link', { name, exact: true }).first();
    await expect(link).toBeVisible();
    const href = await link.getAttribute('href');
    expect(href).toBeTruthy();

    const url = new URL(href!, page.url()).toString();
    const response = await page.request.get(url, { failOnStatusCode: false });
    expect(response.status(), `${name} (${url})`).toBeLessThan(400);
  }
});
