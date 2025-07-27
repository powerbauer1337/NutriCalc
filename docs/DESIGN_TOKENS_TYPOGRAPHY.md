# NutriCalc Design Tokens: Typography System

## Overview

This document defines the comprehensive typography token system for NutriCalc, ensuring visual hierarchy, readability, and responsive scaling. The system includes font families, sizes, weights, line heights, and letter spacing with appropriate adjustments for different screen sizes.

## Font Families

### Primary Font - System UI Stack
```css
--font-family-primary: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
--font-family-secondary: 'Georgia', 'Times New Roman', serif;
--font-family-mono: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
```

### Font Family Usage Guidelines
- **Primary**: Used for all body text and most UI elements
- **Secondary**: Used for headings and special text elements
- **Mono**: Used for code snippets and data displays

## Font Sizes

### Base Scale (Mobile First)
```css
--font-size-xs: 0.75rem;      /* 12px */
--font-size-sm: 0.875rem;     /* 14px */
--font-size-base: 1rem;       /* 16px */
--font-size-lg: 1.125rem;     /* 18px */
--font-size-xl: 1.25rem;      /* 20px */
--font-size-2xl: 1.5rem;      /* 24px */
--font-size-3xl: 1.875rem;    /* 30px */
--font-size-4xl: 2.25rem;     /* 36px */
--font-size-5xl: 3rem;        /* 48px */
--font-size-6xl: 3.75rem;     /* 60px */
--font-size-7xl: 4.5rem;      /* 72px */
--font-size-8xl: 6rem;        /* 96px */
--font-size-9xl: 8rem;        /* 128px */
```

### Responsive Font Size Adjustments
```css
/* Small screens (mobile) - default values above */

/* Medium screens (tablet) */
@media (min-width: 768px) {
  --font-size-xl: 1.375rem;   /* 22px */
  --font-size-2xl: 1.75rem;   /* 28px */
  --font-size-3xl: 2.125rem;  /* 34px */
  --font-size-4xl: 2.5rem;    /* 40px */
  --font-size-5xl: 3.5rem;    /* 56px */
}

/* Large screens (desktop) */
@media (min-width: 1024px) {
  --font-size-xl: 1.5rem;     /* 24px */
  --font-size-2xl: 2rem;      /* 32px */
  --font-size-3xl: 2.5rem;    /* 40px */
  --font-size-4xl: 3rem;      /* 48px */
  --font-size-5xl: 4rem;      /* 64px */
}
```

## Font Weights

```css
--font-weight-thin: 100;
--font-weight-extralight: 200;
--font-weight-light: 300;
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
--font-weight-extrabold: 800;
--font-weight-black: 900;
```

### Font Weight Usage Guidelines
- **Thin/ExtraLight**: Special decorative headings
- **Light**: Subtle text elements
- **Normal**: Body text
- **Medium**: UI labels and secondary headings
- **SemiBold**: Primary headings and important UI elements
- **Bold**: Section headings and emphasis
- **ExtraBold/Black**: Display headings

## Line Heights

```css
--line-height-none: 1;
--line-height-tight: 1.25;
--line-height-snug: 1.375;
--line-height-normal: 1.5;
--line-height-relaxed: 1.625;
--line-height-loose: 2;
```

### Line Height Usage Guidelines
- **Tight/None**: Large display text
- **Snug**: Headings
- **Normal**: Body text
- **Relaxed/Loose**: Paragraph text and long-form content

## Letter Spacing

```css
--letter-spacing-tighter: -0.05em;
--letter-spacing-tight: -0.025em;
--letter-spacing-normal: 0;
--letter-spacing-wide: 0.025em;
--letter-spacing-wider: 0.05em;
--letter-spacing-widest: 0.1em;
```

### Letter Spacing Usage Guidelines
- **Tighter/Tight**: Large display text for better visual cohesion
- **Normal**: Default for most text
- **Wide/Wider/Widest**: Uppercase text, special headings, or stylistic elements

## Typography Hierarchy

### Headings
```css
--font-heading-1: var(--font-weight-bold) var(--font-size-5xl)/var(--line-height-tight) var(--font-family-secondary);
--font-heading-2: var(--font-weight-semibold) var(--font-size-4xl)/var(--line-height-snug) var(--font-family-secondary);
--font-heading-3: var(--font-weight-semibold) var(--font-size-3xl)/var(--line-height-snug) var(--font-family-secondary);
--font-heading-4: var(--font-weight-semibold) var(--font-size-2xl)/var(--line-height-normal) var(--font-family-secondary);
--font-heading-5: var(--font-weight-semibold) var(--font-size-xl)/var(--line-height-normal) var(--font-family-secondary);
--font-heading-6: var(--font-weight-semibold) var(--font-size-lg)/var(--line-height-normal) var(--font-family-secondary);
```

### Body Text
```css
--font-body-xl: var(--font-weight-normal) var(--font-size-xl)/var(--line-height-relaxed) var(--font-family-primary);
--font-body-lg: var(--font-weight-normal) var(--font-size-lg)/var(--line-height-relaxed) var(--font-family-primary);
--font-body-base: var(--font-weight-normal) var(--font-size-base)/var(--line-height-relaxed) var(--font-family-primary);
--font-body-sm: var(--font-weight-normal) var(--font-size-sm)/var(--line-height-normal) var(--font-family-primary);
--font-body-xs: var(--font-weight-normal) var(--font-size-xs)/var(--line-height-normal) var(--font-family-primary);
```

### UI Text
```css
--font-ui-lg: var(--font-weight-medium) var(--font-size-lg)/var(--line-height-normal) var(--font-family-primary);
--font-ui-base: var(--font-weight-medium) var(--font-size-base)/var(--line-height-normal) var(--font-family-primary);
--font-ui-sm: var(--font-weight-medium) var(--font-size-sm)/var(--line-height-normal) var(--font-family-primary);
--font-ui-xs: var(--font-weight-medium) var(--font-size-xs)/var(--line-height-normal) var(--font-family-primary);
```

## Semantic Typography Tokens

### Content Hierarchy
```css
--font-display: var(--font-weight-bold) var(--font-size-7xl)/var(--line-height-tight) var(--font-family-secondary);
--font-title: var(--font-weight-bold) var(--font-size-5xl)/var(--line-height-tight) var(--font-family-secondary);
--font-heading: var(--font-weight-semibold) var(--font-size-3xl)/var(--line-height-snug) var(--font-family-secondary);
--font-subheading: var(--font-weight-semibold) var(--font-size-xl)/var(--line-height-normal) var(--font-family-primary);
--font-body: var(--font-weight-normal) var(--font-size-base)/var(--line-height-relaxed) var(--font-family-primary);
--font-caption: var(--font-weight-normal) var(--font-size-sm)/var(--line-height-normal) var(--font-family-primary);
--font-overline: var(--font-weight-bold) var(--font-size-xs)/var(--line-height-normal) var(--font-family-primary);
```

### Interactive Elements
```css
--font-button-lg: var(--font-weight-semibold) var(--font-size-lg)/var(--line-height-none) var(--font-family-primary);
--font-button-base: var(--font-weight-semibold) var(--font-size-base)/var(--line-height-none) var(--font-family-primary);
--font-button-sm: var(--font-weight-semibold) var(--font-size-sm)/var(--line-height-none) var(--font-family-primary);
--font-input: var(--font-weight-normal) var(--font-size-base)/var(--line-height-normal) var(--font-family-primary);
```

## Responsive Typography Adjustments

### Mobile First (Default)
- Base font size: 16px
- Headings scale down for smaller screens
- Line heights optimized for touch readability

### Tablet Adjustments
```css
@media (min-width: 768px) {
  :root {
    --font-size-body: var(--font-size-lg);
    --font-size-heading-1: var(--font-size-6xl);
    --font-size-heading-2: var(--font-size-5xl);
  }
}
```

### Desktop Adjustments
```css
@media (min-width: 1024px) {
  :root {
    --font-size-body: var(--font-size-xl);
    --font-size-heading-1: var(--font-size-7xl);
    --font-size-heading-2: var(--font-size-6xl);
    --line-height-body: var(--line-height-loose);
  }
}
```

### Large Screen Adjustments
```css
@media (min-width: 1536px) {
  :root {
    --font-size-display: var(--font-size-9xl);
    --font-size-heading-1: var(--font-size-8xl);
  }
}
```

## Accessibility Considerations

### Font Size Scaling
- All font sizes use relative units (rem) for accessibility
- Users can adjust base font size in browser settings
- Minimum font size for body text: 16px (1rem)

### Line Height for Readability
- Body text line height: 1.5-1.75 for optimal readability
- Heading line height: 1.2-1.3 for visual cohesion
- Paragraph spacing: 1.5x line height between paragraphs

### Text Spacing
```css
--text-spacing-paragraph: 1.5em;  /* Space between paragraphs */
--text-spacing-list: 0.5em;       /* Space between list items */
--text-spacing-heading: 0.75em;   /* Space after headings */
```

## Implementation Guidelines

### Do's
- Use semantic typography tokens for consistent hierarchy
- Maintain proper contrast ratios with background colors
- Ensure responsive adjustments maintain readability
- Use appropriate line heights for content type

### Don'ts
- Don't use arbitrary font sizes
- Don't ignore responsive font scaling
- Don't use insufficient line heights
- Don't create custom typography outside the system

## Usage Examples

### Headings
```css
h1 {
  font: var(--font-heading-1);
}

h2 {
  font: var(--font-heading-2);
}

h3 {
  font: var(--font-heading-3);
}
```

### Body Text
```css
p {
  font: var(--font-body);
}

.caption {
  font: var(--font-caption);
}
```

### UI Elements
```css
.button {
  font: var(--font-button-base);
}

.input {
  font: var(--font-input);
}
```

## Browser Support

The typography system uses standard CSS features supported in all modern browsers:
- CSS custom properties (CSS variables)
- Media queries for responsive adjustments
- Standard font properties

For older browsers, fallback values should be provided in the implementation.