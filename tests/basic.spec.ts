import { test, expect } from '@playwright/test';

test('homepage loads and displays main UI', async ({ page }) => {
  await page.goto('/', { timeout: 60000 });
  await expect(page).toHaveTitle(/NutriCalc/i);
  await page.waitForSelector('nav', { timeout: 60000 });
  await expect(page.locator('nav')).toBeVisible();
  await expect(page.locator('text=Setup')).toBeVisible();
  await expect(page.locator('text=Details')).toBeVisible();
  await expect(page.locator('text=Analyse')).toBeVisible();
  await expect(page.locator('text=Dünger')).toBeVisible();
  await expect(page.locator('text=Einstellungen')).toBeVisible();
  await expect(page.locator('text=Referenzen')).toBeVisible();
}); 