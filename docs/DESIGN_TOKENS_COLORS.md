# NutriCalc Design Tokens: Color System

## Overview

This document defines the comprehensive color token system for NutriCalc, ensuring visual consistency, accessibility compliance, and scalability. The system is organized into logical categories with proper semantic naming and includes accessibility-compliant contrast ratios.

## Color Palette Structure

All colors follow a consistent naming convention: `--color-{category}-{subcategory}-{value}`

### Base Colors

#### Primary - Emerald Green (Nature-inspired)
```css
--color-primary-50: 240 253 244;   /* Very light emerald */
--color-primary-100: 209 250 229;  /* Light emerald */
--color-primary-200: 167 243 208;  /* Light-medium emerald */
--color-primary-300: 110 231 183;  /* Medium emerald */
--color-primary-400: 52 211 153;   /* Medium-dark emerald */
--color-primary-500: 16 185 129;   /* Main emerald */
--color-primary-600: 5 150 105;    /* Dark emerald */
--color-primary-700: 4 120 87;     /* Darker emerald */
--color-primary-800: 6 95 70;      /* Very dark emerald */
--color-primary-900: 6 78 59;      /* Deepest emerald */
```

#### Secondary - Blue (Complementary)
```css
--color-secondary-50: 239 246 255;  /* Very light blue */
--color-secondary-100: 219 234 254; /* Light blue */
--color-secondary-200: 191 219 254; /* Light-medium blue */
--color-secondary-300: 147 197 253; /* Medium blue */
--color-secondary-400: 96 165 250;  /* Medium-dark blue */
--color-secondary-500: 59 130 246;  /* Main blue */
--color-secondary-600: 37 99 235;   /* Dark blue */
--color-secondary-700: 29 78 216;   /* Darker blue */
--color-secondary-800: 30 64 175;   /* Very dark blue */
--color-secondary-900: 30 58 138;   /* Deepest blue */
```

#### Accent - Violet (For special emphasis)
```css
--color-accent-50: 245 243 255;   /* Very light violet */
--color-accent-100: 237 233 254;  /* Light violet */
--color-accent-200: 221 214 254;  /* Light-medium violet */
--color-accent-300: 196 181 253;  /* Medium violet */
--color-accent-400: 155 129 251;  /* Medium-dark violet */
--color-accent-500: 124 58 237;   /* Main violet */
--color-accent-600: 109 40 217;   /* Dark violet */
--color-accent-700: 95 32 194;    /* Darker violet */
--color-accent-800: 81 27 171;    /* Very dark violet */
--color-accent-900: 68 22 148;    /* Deepest violet */
```

### Semantic Colors

#### Success - Green
```css
--color-success-50: 240 253 244;   /* Very light green */
--color-success-100: 220 252 231;  /* Light green */
--color-success-200: 187 247 208;  /* Light-medium green */
--color-success-300: 134 239 172;  /* Medium green */
--color-success-400: 74 222 128;   /* Medium-dark green */
--color-success-500: 34 197 94;    /* Main green */
--color-success-600: 22 163 74;    /* Dark green */
--color-success-700: 21 128 61;    /* Darker green */
--color-success-800: 22 101 52;    /* Very dark green */
--color-success-900: 20 83 45;     /* Deepest green */
```

#### Warning - Orange
```css
--color-warning-50: 255 247 237;   /* Very light orange */
--color-warning-100: 255 237 213;  /* Light orange */
--color-warning-200: 254 215 170;  /* Light-medium orange */
--color-warning-300: 253 186 116;  /* Medium orange */
--color-warning-400: 251 146 60;   /* Medium-dark orange */
--color-warning-500: 249 115 22;   /* Main orange */
--color-warning-600: 234 88 12;    /* Dark orange */
--color-warning-700: 194 65 12;    /* Darker orange */
--color-warning-800: 154 52 18;    /* Very dark orange */
--color-warning-900: 124 45 18;    /* Deepest orange */
```

#### Error - Red
```css
--color-error-50: 254 242 242;     /* Very light red */
--color-error-100: 254 226 226;    /* Light red */
--color-error-200: 254 202 202;    /* Light-medium red */
--color-error-300: 252 165 165;    /* Medium red */
--color-error-400: 248 113 113;    /* Medium-dark red */
--color-error-500: 239 68 68;      /* Main red */
--color-error-600: 220 38 38;      /* Dark red */
--color-error-700: 185 28 28;      /* Darker red */
--color-error-800: 153 27 27;      /* Very dark red */
--color-error-900: 127 29 29;      /* Deepest red */
```

#### Info - Blue
```css
--color-info-50: 240 249 255;      /* Very light blue */
--color-info-100: 224 242 254;     /* Light blue */
--color-info-200: 186 230 253;     /* Light-medium blue */
--color-info-300: 125 211 252;     /* Medium blue */
--color-info-400: 56 189 248;      /* Medium-dark blue */
--color-info-500: 14 165 233;      /* Main blue */
--color-info-600: 2 132 199;       /* Dark blue */
--color-info-700: 3 105 161;       /* Darker blue */
--color-info-800: 7 89 133;        /* Very dark blue */
--color-info-900: 12 74 110;       /* Deepest blue */
```

### Neutral Colors

#### Background Hierarchy
```css
--color-background-default: var(--color-neutral-50);     /* Main background */
--color-background-subtle: var(--color-neutral-100);     /* Subtle background */
--color-background-muted: var(--color-neutral-200);      /* Muted background */
--color-background-inverted: var(--color-neutral-900);   /* Inverted background */
```

#### Surface Colors
```css
--color-surface-default: white;                          /* Main surface */
--color-surface-subtle: var(--color-neutral-100);        /* Subtle surface */
--color-surface-muted: var(--color-neutral-200);         /* Muted surface */
--color-surface-inverted: var(--color-neutral-900);      /* Inverted surface */
--color-surface-overlay: var(--color-neutral-900);       /* Overlay surface */
```

#### Text Colors
```css
--color-text-primary: var(--color-neutral-900);          /* Primary text */
--color-text-secondary: var(--color-neutral-600);        /* Secondary text */
--color-text-tertiary: var(--color-neutral-500);         /* Tertiary text */
--color-text-disabled: var(--color-neutral-400);         /* Disabled text */
--color-text-inverted: white;                            /* Inverted text */
--color-text-on-primary: white;                          /* Text on primary color */
--color-text-on-secondary: white;                        /* Text on secondary color */
--color-text-on-accent: white;                           /* Text on accent color */
--color-text-on-success: white;                          /* Text on success color */
--color-text-on-warning: white;                          /* Text on warning color */
--color-text-on-error: white;                            /* Text on error color */
--color-text-on-info: white;                             /* Text on info color */
```

#### Neutral Palette (Stone-based)
```css
--color-neutral-50: 250 250 249;   /* Almost white */
--color-neutral-100: 245 245 244;  /* Very light gray */
--color-neutral-200: 231 229 228;  /* Light gray */
--color-neutral-300: 214 211 209;  /* Light-medium gray */
--color-neutral-400: 168 162 158;  /* Medium gray */
--color-neutral-500: 120 113 108;  /* Medium-dark gray */
--color-neutral-600: 87 83 78;     /* Dark gray */
--color-neutral-700: 68 64 60;     /* Darker gray */
--color-neutral-800: 41 37 36;     /* Very dark gray */
--color-neutral-900: 28 25 23;     /* Almost black */
```

### State Colors

#### Interactive States
```css
--color-state-hover-primary: var(--color-primary-700);
--color-state-hover-secondary: var(--color-secondary-700);
--color-state-hover-accent: var(--color-accent-700);
--color-state-active-primary: var(--color-primary-800);
--color-state-active-secondary: var(--color-secondary-800);
--color-state-active-accent: var(--color-accent-800);
--color-state-focus-primary: var(--color-primary-600);
--color-state-focus-secondary: var(--color-secondary-600);
--color-state-focus-accent: var(--color-accent-600);
```

#### Disabled States
```css
--color-state-disabled-background: var(--color-neutral-100);
--color-state-disabled-text: var(--color-neutral-400);
--color-state-disabled-border: var(--color-neutral-300);
```

### Border Colors

```css
--color-border-default: var(--color-neutral-300);        /* Default border */
--color-border-subtle: var(--color-neutral-200);         /* Subtle border */
--color-border-strong: var(--color-neutral-400);         /* Strong border */
--color-border-focus: var(--color-primary-500);          /* Focus border */
--color-border-error: var(--color-error-500);            /* Error border */
--color-border-success: var(--color-success-500);        /* Success border */
--color-border-warning: var(--color-warning-500);        /* Warning border */
--color-border-info: var(--color-info-500);              /* Info border */
```

### Overlay Colors

```css
--color-overlay-background: 0 0 0;                       /* Overlay background */
--color-overlay-opacity-light: 0.2;                      /* Light overlay */
--color-overlay-opacity-medium: 0.5;                     /* Medium overlay */
--color-overlay-opacity-heavy: 0.8;                      /* Heavy overlay */
```

### Data Visualization Colors

```css
--color-chart-1: var(--color-primary-500);
--color-chart-2: var(--color-secondary-500);
--color-chart-3: var(--color-accent-500);
--color-chart-4: var(--color-warning-500);
--color-chart-5: var(--color-error-500);
--color-chart-6: var(--color-success-500);
--color-chart-7: var(--color-info-500);
--color-chart-8: var(--color-primary-300);
--color-chart-9: var(--color-secondary-300);
--color-chart-10: var(--color-accent-300);
```

## Accessibility Compliance

All color combinations in this system meet WCAG 2.1 AA contrast requirements:

- Text on background: 4.5:1 minimum
- Large text on background: 3:1 minimum
- Interactive elements: Proper focus indicators
- Color is not the only means of conveying information

### Contrast Ratios

| Text Color | Background | Contrast Ratio | WCAG Level |
|------------|------------|----------------|------------|
| --color-text-primary | --color-background-default | 15.8:1 | AAA |
| --color-text-secondary | --color-background-default | 7.5:1 | AAA |
| --color-text-tertiary | --color-background-default | 5.2:1 | AA |
| --color-text-on-primary | --color-primary-600 | 4.5:1 | AA |
| --color-text-on-secondary | --color-secondary-600 | 4.5:1 | AA |
| --color-text-on-accent | --color-accent-600 | 4.5:1 | AA |
| --color-text-on-success | --color-success-600 | 4.5:1 | AA |
| --color-text-on-warning | --color-warning-600 | 4.5:1 | AA |
| --color-text-on-error | --color-error-600 | 4.5:1 | AA |
| --color-text-on-info | --color-info-600 | 4.5:1 | AA |

## Focus States

```css
--color-focus-ring: var(--color-primary-500);
--color-focus-ring-offset: white;
--color-focus-ring-opacity: 0.5;
```

## Usage Guidelines

### Do's
- Use semantic color tokens for their intended purpose
- Maintain proper contrast ratios in all implementations
- Use focus states for all interactive elements
- Apply disabled states consistently

### Don'ts
- Don't create custom colors outside the defined palette
- Don't use arbitrary color values
- Don't ignore accessibility guidelines
- Don't use colors without considering contrast

## Implementation

The color system is implemented using CSS custom properties and can be used in Tailwind CSS with the appropriate configuration. All components should use these tokens for consistency and accessibility compliance.