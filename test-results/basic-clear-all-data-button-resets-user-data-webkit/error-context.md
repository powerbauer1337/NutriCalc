# Test info

- Name: clear all data button resets user data
- Location: D:\coding\NutriCalc\tests\basic.spec.ts:34:1

# Error details

```
Error: Timed out 10000ms waiting for expect(locator).toContainText(expected)

Locator: getByTestId('toast-message')
Expected string: "Alle Daten wurden zurückgesetzt."
Received: <element(s) not found>
Call log:
  - expect.toContainText with timeout 10000ms
  - waiting for getByTestId('toast-message')

    at D:\coding\NutriCalc\tests\basic.spec.ts:38:51
```

# Page snapshot

```yaml
- banner:
  - text: NutriCalc
  - button "Toggle Dark Mode":
    - img
- navigation:
  - button "Setup"
  - button "Details"
  - button "Analyse"
  - button "Dünger"
  - button "Einstellungen"
  - button "Referenzen"
- main:
  - text: "AI Hallo! Ich bin dein KI-Helfer. Frag mich z.B. 'Wie erstelle ich einen Dünger?' oder 'Ist mein N-Wert ok?' Vorschläge:"
  - 'button "Vorschlag: Wie erstelle ich einen Dünger?"': Wie erstelle ich einen Dünger?
  - 'button "Vorschlag: Ist mein N-Wert ok?"': Ist mein N-Wert ok?
  - 'button "Vorschlag: Was ist EC?"': Was ist EC?
  - textbox "KI Frage eingeben" [disabled]
  - button "Frage senden" [disabled]: Fragen
  - heading "Setup" [level=2]
  - text: Wassermenge (Liter)
  - spinbutton "Wassermenge": "10"
  - text: Wachstumsphase
  - combobox "Wachstumsphase":
    - option "Frühe Vegetation" [selected]
    - option "Späte Vegetation"
    - option "Frühe Blüte"
    - option "Mittlere Blüte"
    - option "Späte Blüte"
  - text: Wassertyp
  - combobox "Wassertyp":
    - option "Umkehrosmose" [selected]
    - option "Leitungswasser"
    - option "Eigenes Profil"
  - heading "Wasserqualität & Mischung" [level=2]
  - heading "Leitungswasser" [level=3]
  - button "Entfernen"
  - heading "Basische Parameter" [level=4]
  - text: "pH-Wert:"
  - spinbutton "pH-Wert:": "7.5"
  - text: "EC (mS/cm):"
  - spinbutton "EC (mS/cm):": "0.5"
  - heading "Mineralgehalt (mg/L)" [level=4]
  - text: "Ca:"
  - spinbutton "Ca:": "50"
  - text: "Mg:"
  - spinbutton "Mg:": "10"
  - text: "Na:"
  - spinbutton "Na:": "20"
  - text: "Schwefel:"
  - spinbutton "Schwefel:": "5"
  - text: "Eisen:"
  - spinbutton "Eisen:": "0.05"
  - text: "Mangan:"
  - spinbutton "Mangan:": "0.02"
  - text: "Zink:"
  - spinbutton "Zink:": "0.01"
  - text: "Kupfer:"
  - spinbutton "Kupfer:": "0.005"
  - text: "Bor:"
  - spinbutton "Bor:": "0.01"
  - text: "Molybdän:"
  - spinbutton "Molybdän:": "0.001"
  - text: "EC:"
  - spinbutton "EC:": "0.5"
  - text: "Volumen (L):"
  - spinbutton "Volumen (L):": "100"
  - heading "Umkehrosmosewasser" [level=3]
  - button "Entfernen"
  - heading "Basische Parameter" [level=4]
  - text: "pH-Wert:"
  - spinbutton "pH-Wert:": "6.5"
  - text: "EC (mS/cm):"
  - spinbutton "EC (mS/cm):": "0.05"
  - heading "Mineralgehalt (mg/L)" [level=4]
  - text: "Ca:"
  - spinbutton "Ca:": "0"
  - text: "Mg:"
  - spinbutton "Mg:": "0"
  - text: "Na:"
  - spinbutton "Na:": "0"
  - text: "Schwefel:"
  - spinbutton "Schwefel:": "0"
  - text: "Eisen:"
  - spinbutton "Eisen:": "0"
  - text: "Mangan:"
  - spinbutton "Mangan:": "0"
  - text: "Zink:"
  - spinbutton "Zink:": "0"
  - text: "Kupfer:"
  - spinbutton "Kupfer:": "0"
  - text: "Bor:"
  - spinbutton "Bor:": "0"
  - text: "Molybdän:"
  - spinbutton "Molybdän:": "0"
  - text: "EC:"
  - spinbutton "EC:": "0.05"
  - text: "Volumen (L):"
  - spinbutton "Volumen (L):": "0"
  - button "Leitungswasser hinzufügen"
  - button "Osmosewasser hinzufügen"
  - button "Eigene Quelle hinzufügen"
  - heading "Zusammenfassung der Wasserwerte" [level=3]
  - table:
    - rowgroup:
      - row "Quelle Volumen (L) pH EC (mS/cm) Stickstoff (N) Phosphor (P) Kalium (K) Calcium (CA) Magnesium (MG) Schwefel (S) Eisen (FE) Mangan (MN) Zink (ZN) Kupfer (CU) Bor (B) Molybdän (MO) EC (EC)":
        - cell "Quelle"
        - cell "Volumen (L)"
        - cell "pH"
        - cell "EC (mS/cm)"
        - cell "Stickstoff (N)"
        - cell "Phosphor (P)"
        - cell "Kalium (K)"
        - cell "Calcium (CA)"
        - cell "Magnesium (MG)"
        - cell "Schwefel (S)"
        - cell "Eisen (FE)"
        - cell "Mangan (MN)"
        - cell "Zink (ZN)"
        - cell "Kupfer (CU)"
        - cell "Bor (B)"
        - cell "Molybdän (MO)"
        - cell "EC (EC)"
    - rowgroup:
      - row "Leitungswasser 100.0 7.50 0.50 0.0 0.0 0.0 50.0 10.0 5.0 0.1 0.0 0.0 0.0 0.0 0.0 0.5":
        - cell "Leitungswasser"
        - cell "100.0"
        - cell "7.50"
        - cell "0.50"
        - cell "0.0"
        - cell "0.0"
        - cell "0.0"
        - cell "50.0"
        - cell "10.0"
        - cell "5.0"
        - cell "0.1"
        - cell "0.0"
        - cell "0.0"
        - cell "0.0"
        - cell "0.0"
        - cell "0.0"
        - cell "0.5"
      - row "Umkehrosmosewasser 0.0 6.50 0.05 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.1":
        - cell "Umkehrosmosewasser"
        - cell "0.0"
        - cell "6.50"
        - cell "0.05"
        - cell "0.0"
        - cell "0.0"
        - cell "0.0"
        - cell "0.0"
        - cell "0.0"
        - cell "0.0"
        - cell "0.0"
        - cell "0.0"
        - cell "0.0"
        - cell "0.0"
        - cell "0.0"
        - cell "0.0"
        - cell "0.1"
      - row "Gemischt 100.0 L 7.50 1.00 0.0 0.0 0.0 50.0 10.0 5.0 0.1 0.0 0.0 0.0 0.0 0.0 1.0":
        - cell "Gemischt"
        - cell "100.0 L"
        - cell "7.50"
        - cell "1.00"
        - cell "0.0"
        - cell "0.0"
        - cell "0.0"
        - cell "50.0"
        - cell "10.0"
        - cell "5.0"
        - cell "0.1"
        - cell "0.0"
        - cell "0.0"
        - cell "0.0"
        - cell "0.0"
        - cell "0.0"
        - cell "1.0"
  - heading "Gemischtes Wasser Ergebnis:" [level=3]
  - paragraph: "pH: 7.50"
  - paragraph: "EC: 1.00 mS/cm"
  - paragraph: "Ca: 50.0 mg/L"
  - paragraph: "Mg: 10.0 mg/L"
  - paragraph: "Na: N/A mg/L"
  - paragraph: "Gesamtvolumen: 100.0 L"
  - heading "Dünger & Dosierung" [level=3]
  - combobox "Dünger hinzufügen":
    - option "Dünger hinzufügen..." [selected]
    - option "Atami ATA CalMag"
    - option "Atami ATA Clean"
    - option "Atami ATA Terra Leaves"
    - option "Atami ATA Terra Max"
    - option "Atami B'cuzz Bloom Stimulator"
    - option "Atami B'cuzz Blossom Builder"
    - option "Atami B'cuzz Coco Nutrition A"
    - option "Atami B'cuzz Coco Nutrition B"
    - option "Atami B'cuzz Premium Plant Powder"
    - option "Athena Blended Bloom A"
    - option "Athena Blended Bloom B"
    - option "Athena Blended CaMg"
    - option "Athena Blended Grow A"
    - option "Athena Blended Grow B"
    - option "Athena Blended PK"
    - option "Athena Pro Bloom"
    - option "Athena Pro Core"
    - option "Athena Pro Fade"
    - option "Athena Pro Grow"
    - option "BioBizz Alg-a-mic"
    - option "BioBizz Bio Bloom"
    - option "BioBizz Bio Grow"
    - option "BioBizz Bio Heaven"
    - option "BioBizz CalMag"
    - option "BioBizz Fish Mix"
    - option "BioBizz Root Juice"
    - option "BioBizz Top Max"
  - heading "Berechnete Hauptwerte" [level=3]
  - text: N (Stickstoff) 0.00 ppm P (Phosphor) 0.00 ppm K (Kalium) 0.00 ppm EC 1.00 mS/cm
  - button "Exportieren"
  - text: Importieren
  - button "Auto-Optimieren"
  - button "Alle Daten löschen"
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
> 38 |   await expect(page.getByTestId('toast-message')).toContainText('Alle Daten wurden zurückgesetzt.', { timeout: 10000 });
     |                                                   ^ Error: Timed out 10000ms waiting for expect(locator).toContainText(expected)
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