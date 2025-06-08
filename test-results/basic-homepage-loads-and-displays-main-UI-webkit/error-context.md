# Test info

- Name: homepage loads and displays main UI
- Location: D:\coding\NutriCalc\tests\basic.spec.ts:3:5

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()

Locator: locator('text=Calculator')
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for locator('text=Calculator')

    at D:\coding\NutriCalc\tests\basic.spec.ts:7:49
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
- main:
  - text: "AI Hallo! Ich bin dein KI-Helfer. Frag mich z.B. 'Wie erstelle ich einen Dünger?' oder 'Ist mein N-Wert ok?' Vorschläge:"
  - button "Wie erstelle ich einen Dünger?"
  - button "Ist mein N-Wert ok?"
  - button "Was ist EC?"
  - textbox "API Key fehlt" [disabled]
  - button "Fragen" [disabled]
  - heading "Setup" [level=2]
  - text: Wassermenge (Liter)
  - spinbutton "Wassermenge (Liter)": "10"
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
  - heading "Dünger & Dosierung" [level=3]
  - combobox:
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
  - heading "Berechnete Hauptwerte" [level=3]
  - text: N (Stickstoff) 0 ppm P (Phosphor) 0 ppm K (Kalium) 0 ppm EC 0 mS/cm
  - button "Exportieren"
  - text: Importieren
```

# Test source

```ts
  1 | import { test, expect } from '@playwright/test';
  2 |
  3 | test('homepage loads and displays main UI', async ({ page }) => {
  4 |   await page.goto('/');
  5 |   await expect(page).toHaveTitle(/NutriCalc/i);
  6 |   await expect(page.locator('nav')).toBeVisible();
> 7 |   await expect(page.locator('text=Calculator')).toBeVisible();
    |                                                 ^ Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
  8 |   await expect(page.locator('text=Settings')).toBeVisible();
  9 | }); 
```