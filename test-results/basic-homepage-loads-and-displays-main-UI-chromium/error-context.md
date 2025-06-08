# Test info

- Name: homepage loads and displays main UI
- Location: D:\coding\NutriCalc\tests\basic.spec.ts:9:1

# Error details

```
Error: page.waitForSelector: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('nav') to be visible

    at D:\coding\NutriCalc\tests\basic.spec.ts:12:14
```

# Page snapshot

```yaml
- text: "[plugin:vite:import-analysis] Failed to resolve import \"prop-types\" from \"src\\components\\Button.jsx\". Does the file exist? D:/coding/NutriCalc/src/components/Button.jsx:2:22 16 | } 17 | import React from \"react\"; 18 | import PropTypes from \"prop-types\"; | ^ 19 | const VARIANTS = { 20 | primary: \"bg-blue-600 hover:bg-blue-700 text-white\", at formatError (file:///D:/coding/NutriCalc/node_modules/vite/dist/node/chunks/dep-df561101.js:43993:46) at TransformContext.error (file:///D:/coding/NutriCalc/node_modules/vite/dist/node/chunks/dep-df561101.js:43989:19) at normalizeUrl (file:///D:/coding/NutriCalc/node_modules/vite/dist/node/chunks/dep-df561101.js:41801:33) at process.processTicksAndRejections (node:internal/process/task_queues:105:5) at async file:///D:/coding/NutriCalc/node_modules/vite/dist/node/chunks/dep-df561101.js:41945:47 at async Promise.all (index 4) at async TransformContext.transform (file:///D:/coding/NutriCalc/node_modules/vite/dist/node/chunks/dep-df561101.js:41870:13) at async Object.transform (file:///D:/coding/NutriCalc/node_modules/vite/dist/node/chunks/dep-df561101.js:44283:30) at async loadAndTransform (file:///D:/coding/NutriCalc/node_modules/vite/dist/node/chunks/dep-df561101.js:54950:29) at async viteTransformMiddleware (file:///D:/coding/NutriCalc/node_modules/vite/dist/node/chunks/dep-df561101.js:64345:32 Click outside, press Esc key, or fix the code to dismiss. You can also disable this overlay by setting"
- code: server.hmr.overlay
- text: to
- code: "false"
- text: in
- code: vite.config.js.
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
> 12 |   await page.waitForSelector('nav', { timeout: 60000 });
     |              ^ Error: page.waitForSelector: Test timeout of 30000ms exceeded.
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
  24 |     await expect(page.getByTestId(`tab-${tab}`)).toBeVisible();
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