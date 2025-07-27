# NutriCalc Design Tokens: Spacing System

## Overview

This document defines the comprehensive spacing token system for NutriCalc, ensuring consistent layout, proper visual hierarchy, and responsive design. The system is based on a 4px grid and includes tokens for padding, margin, gaps, and positioning with appropriate adjustments for different screen sizes.

## Spacing Scale

The spacing system is based on a 4px grid with consistent naming conventions. All values are in rem units for accessibility and scalability.

```css
--space-0: 0;           /* 0px */
--space-0_5: 0.125rem;  /* 2px */
--space-1: 0.25rem;     /* 4px */
--space-1_5: 0.375rem;  /* 6px */
--space-2: 0.5rem;      /* 8px */
--space-2_5: 0.625rem;  /* 10px */
--space-3: 0.75rem;     /* 12px */
--space-3_5: 0.875rem;  /* 14px */
--space-4: 1rem;        /* 16px */
--space-5: 1.25rem;     /* 20px */
--space-6: 1.5rem;      /* 24px */
--space-7: 1.75rem;     /* 28px */
--space-8: 2rem;        /* 32px */
--space-9: 2.25rem;     /* 36px */
--space-10: 2.5rem;     /* 40px */
--space-11: 2.75rem;    /* 44px */
--space-12: 3rem;       /* 48px */
--space-14: 3.5rem;     /* 56px */
--space-16: 4rem;       /* 64px */
--space-20: 5rem;       /* 80px */
--space-24: 6rem;       /* 96px */
--space-28: 7rem;       /* 112px */
--space-32: 8rem;       /* 128px */
--space-36: 9rem;       /* 144px */
--space-40: 10rem;      /* 160px */
--space-44: 11rem;      /* 176px */
--space-48: 12rem;      /* 192px */
--space-52: 13rem;      /* 208px */
--space-56: 14rem;      /* 224px */
--space-60: 15rem;      /* 240px */
--space-64: 16rem;      /* 256px */
--space-72: 18rem;      /* 288px */
--space-80: 20rem;      /* 320px */
--space-96: 24rem;      /* 384px */
```

## Semantic Spacing Tokens

### Layout Spacing
```css
--space-layout-page: var(--space-6);        /* Page padding */
--space-layout-section: var(--space-12);    /* Section spacing */
--space-layout-container: var(--space-4);   /* Container padding */
```

### Component Spacing
```css
--space-component-xs: var(--space-1);       /* Extra small components */
--space-component-sm: var(--space-2);       /* Small components */
--space-component-md: var(--space-3);       /* Medium components */
--space-component-lg: var(--space-4);       /* Large components */
--space-component-xl: var(--space-6);       /* Extra large components */
```

### Content Spacing
```css
--space-content-xs: var(--space-0_5);       /* Extra small content */
--space-content-sm: var(--space-1);         /* Small content */
--space-content-md: var(--space-2);         /* Medium content */
--space-content-lg: var(--space-3);         /* Large content */
--space-content-xl: var(--space-4);         /* Extra large content */
```

### Form Spacing
```css
--space-form-field: var(--space-3);         /* Between form fields */
--space-form-group: var(--space-6);         /* Between form groups */
--space-form-inline: var(--space-2);        /* Inline form elements */
```

### Icon Spacing
```css
--space-icon-xs: var(--space-1);            /* Extra small icons */
--space-icon-sm: var(--space-1_5);          /* Small icons */
--space-icon-md: var(--space-2);            /* Medium icons */
--space-icon-lg: var(--space-3);            /* Large icons */
--space-icon-xl: var(--space-4);            /* Extra large icons */
```

## Responsive Spacing Adjustments

### Mobile First (Default)
```css
:root {
  --space-responsive-page: var(--space-4);
  --space-responsive-section: var(--space-8);
  --space-responsive-component: var(--space-2);
}
```

### Tablet Adjustments
```css
@media (min-width: 768px) {
  :root {
    --space-responsive-page: var(--space-6);
    --space-responsive-section: var(--space-10);
    --space-responsive-component: var(--space-3);
  }
}
```

### Desktop Adjustments
```css
@media (min-width: 1024px) {
  :root {
    --space-responsive-page: var(--space-8);
    --space-responsive-section: var(--space-12);
    --space-responsive-component: var(--space-4);
  }
}
```

### Large Screen Adjustments
```css
@media (min-width: 1536px) {
  :root {
    --space-responsive-page: var(--space-10);
    --space-responsive-section: var(--space-16);
    --space-responsive-component: var(--space-5);
  }
}
```

## Directional Spacing

### Padding Tokens
```css
--space-padding-xs: var(--space-1);
--space-padding-sm: var(--space-2);
--space-padding-md: var(--space-3);
--space-padding-lg: var(--space-4);
--space-padding-xl: var(--space-6);
--space-padding-2xl: var(--space-8);
--space-padding-3xl: var(--space-12);
```

### Margin Tokens
```css
--space-margin-xs: var(--space-1);
--space-margin-sm: var(--space-2);
--space-margin-md: var(--space-3);
--space-margin-lg: var(--space-4);
--space-margin-xl: var(--space-6);
--space-margin-2xl: var(--space-8);
--space-margin-3xl: var(--space-12);
```

### Inset Tokens (for positioning)
```css
--space-inset-xs: var(--space-1);
--space-inset-sm: var(--space-2);
--space-inset-md: var(--space-3);
--space-inset-lg: var(--space-4);
--space-inset-xl: var(--space-6);
--space-inset-2xl: var(--space-8);
--space-inset-3xl: var(--space-12);
```

## Gap Tokens (for flex/grid)

```css
--space-gap-xs: var(--space-1);
--space-gap-sm: var(--space-2);
--space-gap-md: var(--space-3);
--space-gap-lg: var(--space-4);
--space-gap-xl: var(--space-6);
--space-gap-2xl: var(--space-8);
--space-gap-3xl: var(--space-12);
```

## Spacing Usage Guidelines

### Layout Spacing
- **Page padding**: Use `--space-layout-page` for main page padding
- **Section spacing**: Use `--space-layout-section` between major sections
- **Container padding**: Use `--space-layout-container` for container elements

### Component Spacing
- **Component padding**: Use component spacing tokens for internal padding
- **Component margin**: Use component spacing tokens for external spacing
- **Component gaps**: Use gap tokens for flex/grid layouts within components

### Content Spacing
- **Paragraph spacing**: Use `--space-content-lg` between paragraphs
- **List item spacing**: Use `--space-content-md` between list items
- **Heading spacing**: Use appropriate content spacing after headings

### Form Spacing
- **Field spacing**: Use `--space-form-field` between form fields
- **Group spacing**: Use `--space-form-group` between form sections
- **Inline spacing**: Use `--space-form-inline` for inline form elements

## Accessibility Considerations

### Touch Target Spacing
- Minimum touch target size: 44px (11 * 4px)
- Spacing between touch targets: `--space-2` (8px) minimum
- Form field height: `--space-10` (40px) minimum

### Focus Indicator Spacing
```css
--space-focus-offset: var(--space-1);  /* Space around focus indicators */
```

## Implementation Examples

### Component Padding
```css
.card {
  padding: var(--space-component-md);
}

.button {
  padding: var(--space-component-sm) var(--space-component-md);
}
```

### Layout Spacing
```css
.page {
  padding: var(--space-layout-page);
}

.section {
  margin-bottom: var(--space-layout-section);
}
```

### Flex/Grid Gaps
```css
.grid {
  gap: var(--space-gap-md);
}

.flex {
  gap: var(--space-gap-sm);
}
```

### Responsive Spacing
```css
.responsive-section {
  padding: var(--space-responsive-page);
  margin-bottom: var(--space-responsive-section);
}
```

## Do's and Don'ts

### Do's
- Use semantic spacing tokens for consistent layouts
- Maintain proper spacing hierarchy
- Apply responsive spacing adjustments
- Ensure adequate touch target spacing

### Don'ts
- Don't use arbitrary spacing values
- Don't ignore responsive spacing needs
- Don't create spacing inconsistencies
- Don't use insufficient spacing for accessibility

## Browser Support

The spacing system uses CSS custom properties which are supported in all modern browsers. For older browsers, fallback values should be provided in the implementation.

All spacing values use rem units which scale with the user's font size settings, ensuring accessibility compliance.