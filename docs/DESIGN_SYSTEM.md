# NutriCalc Design System

## Overview

The NutriCalc design system provides a comprehensive set of design tokens, components, and guidelines for building consistent and beautiful user interfaces. The system is built with modern web standards and focuses on accessibility, usability, and visual appeal.

## Design Philosophy

- **Nature-Inspired**: Uses emerald green as the primary color to reflect the plant/nutrient theme
- **Modern & Clean**: Minimalist approach with plenty of whitespace
- **Accessible**: WCAG 2.1 AA compliant with proper contrast ratios
- **Consistent**: Systematic approach to spacing, typography, and colors
- **Responsive**: Mobile-first design that scales beautifully

## Color Palette

### Primary Colors (Emerald)
```css
--color-primary-50: 240 253 244;   /* Very light emerald */
--color-primary-100: 209 250 229;  /* Light emerald */
--color-primary-500: 16 185 129;   /* Main emerald */
--color-primary-600: 5 150 105;    /* Dark emerald */
--color-primary-700: 4 120 87;     /* Darker emerald */
```

### Secondary Colors (Blue)
```css
--color-secondary-50: 239 246 255;  /* Very light blue */
--color-secondary-500: 59 130 246;  /* Main blue */
--color-secondary-600: 37 99 235;   /* Dark blue */
```

### Neutral Colors (Stone)
```css
--color-neutral-50: 250 250 249;   /* Almost white */
--color-neutral-100: 245 245 244;  /* Very light gray */
--color-neutral-200: 231 229 228;  /* Light gray */
--color-neutral-600: 87 83 78;     /* Medium gray */
--color-neutral-900: 28 25 23;     /* Almost black */
```

### Semantic Colors
- **Success**: Green variants for positive actions
- **Error**: Red variants for destructive actions
- **Warning**: Orange variants for caution
- **Info**: Sky blue variants for information

## Typography

### Font Scale
```css
--font-size-xs: 0.75rem;     /* 12px */
--font-size-sm: 0.875rem;    /* 14px */
--font-size-base: 1rem;      /* 16px */
--font-size-lg: 1.125rem;    /* 18px */
--font-size-xl: 1.25rem;     /* 20px */
--font-size-2xl: 1.5rem;     /* 24px */
--font-size-3xl: 1.875rem;   /* 30px */
--font-size-4xl: 2.25rem;    /* 36px */
```

### Font Weights
- **Normal**: 400 - Body text
- **Medium**: 500 - Emphasized text
- **Semibold**: 600 - Headings
- **Bold**: 700 - Strong emphasis

### Line Heights
- **Tight**: 1.25 - Headings
- **Normal**: 1.5 - Body text
- **Relaxed**: 1.75 - Long-form content

## Spacing System

Based on 4px grid system:
```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
```

## Border Radius
```css
--radius-sm: 0.375rem;  /* 6px */
--radius-md: 0.5rem;    /* 8px */
--radius-lg: 0.75rem;   /* 12px */
--radius-xl: 1rem;      /* 16px */
--radius-2xl: 1.5rem;   /* 24px */
--radius-full: 9999px;  /* Fully rounded */
```

## Shadows
```css
--shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
```

## Transitions
```css
--transition-fast: 150ms ease-in-out;
--transition-normal: 200ms ease-in-out;
--transition-slow: 300ms ease-in-out;
```

## Usage Guidelines

### Do's
- Use the defined color palette consistently
- Follow the spacing system for layouts
- Use semantic colors for their intended purpose
- Maintain proper contrast ratios
- Use consistent border radius values

### Don'ts
- Don't create custom colors outside the palette
- Don't use arbitrary spacing values
- Don't mix different shadow styles
- Don't ignore accessibility guidelines
- Don't use colors without considering contrast

## Implementation

The design system is implemented in `src/styles/design-system.css` using CSS custom properties and Tailwind CSS utility classes. All components should use these tokens for consistency.

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Accessibility

All colors meet WCAG 2.1 AA contrast requirements:
- Text on background: 4.5:1 minimum
- Large text on background: 3:1 minimum
- Interactive elements: Proper focus indicators
- Color is not the only means of conveying information
