import { test, expect } from '@playwright/test';

test('homepage loads and displays main UI', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/NutriCalc/i);
  await expect(page.locator('nav')).toBeVisible();
  await expect(page.locator('text=Calculator')).toBeVisible();
  await expect(page.locator('text=Settings')).toBeVisible();
}); 