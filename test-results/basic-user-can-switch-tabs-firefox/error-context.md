# Test info

- Name: user can switch tabs
- Location: D:\coding\NutriCalc\tests\basic.spec.ts:19:1

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()

Locator: getByTestId('tab-settings')
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for getByTestId('tab-settings')

    at D:\coding\NutriCalc\tests\basic.spec.ts:24:50
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | const setApiKey = async (page) => {
   4 |   await page.addInitScript(() => {
   5 |     window.localStorage.setItem('nutricalc_api_key', 'test-key');
   6 |   });
   7 | };
   8 |
   9 | test('homepage loads and displays main UI', async ({ page }) => {
  10 |   await page.goto('http://localhost:3002/', { timeout: 60000 });
  11 |   await expect(page).toHaveTitle(/NutriCalc/i);
  12 |   await page.waitForSelector('nav', { timeout: 60000 });
  13 |   await expect(page.locator('nav')).toBeVisible();
  14 |   for (const tab of ['basic', 'advanced', 'analysis', 'customfertilizer', 'settings', 'references']) {
  15 |     await expect(page.getByTestId(`tab-${tab}`)).toBeVisible();
  16 |   }
  17 | });
  18 |
  19 | test('user can switch tabs', async ({ page }) => {
  20 |   await page.goto('http://localhost:3002/', { timeout: 60000 });
  21 |   const tabs = ['basic', 'advanced', 'analysis', 'customfertilizer', 'settings', 'references'];
  22 |   for (const tab of tabs) {
  23 |     await page.getByTestId(`tab-${tab}`).click();
> 24 |     await expect(page.getByTestId(`tab-${tab}`)).toBeVisible();
     |                                                  ^ Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
  25 |   }
  26 | });
  27 |
  28 | test('auto-optimize button sets recommended values', async ({ page }) => {
  29 |   await page.goto('http://localhost:3002/', { timeout: 60000 });
  30 |   await page.getByRole('button', { name: 'Auto-Optimieren' }).click();
  31 |   await expect(page.getByTestId('toast-message')).toContainText('Empfohlene Dosierung geladen!', { timeout: 10000 });
  32 | });
  33 |
  34 | test('clear all data button resets user data', async ({ page }) => {
  35 |   await page.goto('http://localhost:3002/', { timeout: 60000 });
  36 |   page.once('dialog', dialog => dialog.accept());
  37 |   await page.getByRole('button', { name: 'Alle Daten löschen' }).click();
  38 |   await expect(page.getByTestId('toast-message')).toContainText('Alle Daten wurden zurückgesetzt.', { timeout: 10000 });
  39 | });
  40 |
  41 | test('import/export setup', async ({ page }) => {
  42 |   await page.goto('http://localhost:3002/', { timeout: 60000 });
  43 |   await page.getByRole('button', { name: 'Exportieren' }).click();
  44 |   // Import (simulate file input)
  45 |   // Skipping actual file upload for brevity; would use page.setInputFiles if a file is available
  46 |   expect(true).toBe(true);
  47 | });
  48 |
  49 | test('chatbar suggestion and send', async ({ page }) => {
  50 |   await setApiKey(page);
  51 |   await page.goto('http://localhost:3002/', { timeout: 60000 });
  52 |   await page.click('text=Wie erstelle ich einen Dünger?');
  53 |   const sendBtn = page.getByRole('button', { name: 'Frage senden' });
  54 |   await expect(sendBtn).toBeEnabled();
  55 |   await sendBtn.click();
  56 |   await expect(page.locator('text=Denke nach...')).toBeVisible({ timeout: 10000 });
  57 | }); 
```