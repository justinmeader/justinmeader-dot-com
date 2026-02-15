import { test, expect } from '@playwright/test';

test.describe('visual snapshots', () => {
  test('capture homepage snapshot (desktop)', async ({ page }, testInfo) => {
    test.skip(!testInfo.project.name.includes('desktop'), 'desktop only');
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const screenshot = await page.screenshot({ fullPage: true });
    await testInfo.attach('homepage-desktop', { body: screenshot, contentType: 'image/png' });
    expect(screenshot.byteLength).toBeGreaterThan(10_000);
  });

  test('capture homepage snapshot (mobile)', async ({ page }, testInfo) => {
    test.skip(!testInfo.project.name.includes('mobile'), 'mobile only');
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const screenshot = await page.screenshot({ fullPage: true });
    await testInfo.attach('homepage-mobile', { body: screenshot, contentType: 'image/png' });
    expect(screenshot.byteLength).toBeGreaterThan(8_000);
  });
});
