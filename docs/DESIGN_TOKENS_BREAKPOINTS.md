# NutriCalc Design Tokens: Breakpoint System

## Overview

This document defines the comprehensive breakpoint token system for NutriCalc, ensuring consistent responsive behavior across all devices and screen sizes. The system includes device-specific breakpoints, container constraints, and responsive behavior guidelines.

## Breakpoint Scale

The breakpoint system follows a mobile-first approach with five main breakpoints:

```css
--breakpoint-xs: 0;             /* 0px - Extra small (mobile) */
--breakpoint-sm: 36rem;         /* 576px - Small (landscape phones) */
--breakpoint-md: 48rem;         /* 768px - Medium (tablets) */
--breakpoint-lg: 64rem;         /* 1024px - Large (desktops) */
--breakpoint-xl: 80rem;         /* 1280px - Extra large (large desktops) */
--breakpoint-2xl: 96rem;        /* 1536px - 2X large (extra large screens) */
```

## Device Categories

### Mobile Devices
- **Portrait**: 320px - 480px
- **Landscape**: 481px - 767px
- **Target breakpoint**: `--breakpoint-xs` to `--breakpoint-sm`

### Tablet Devices
- **Portrait**: 768px - 1023px
- **Landscape**: 1024px - 1199px
- **Target breakpoint**: `--breakpoint-md` to `--breakpoint-lg`

### Desktop Devices
- **Small**: 1200px - 1439px
- **Large**: 1440px - 1919px
- **Extra Large**: 1920px+
- **Target breakpoint**: `--breakpoint-xl` to `--breakpoint-2xl`

## Media Query Tokens

### Min-Width Queries
```css
--media-query-min-sm: "(min-width: 36rem)";     /* 576px */
--media-query-min-md: "(min-width: 48rem)";     /* 768px */
--media-query-min-lg: "(min-width: 64rem)";     /* 1024px */
--media-query-min-xl: "(min-width: 80rem)";     /* 1280px */
--media-query-min-2xl: "(min-width: 96rem)";    /* 1536px */
```

### Max-Width Queries
```css
--media-query-max-xs: "(max-width: 35.9375rem)";  /* 575px */
--media-query-max-sm: "(max-width: 47.9375rem)";  /* 767px */
--media-query-max-md: "(max-width: 63.9375rem)";  /* 1023px */
--media-query-max-lg: "(max-width: 79.9375rem)";  /* 1279px */
--media-query-max-xl: "(max-width: 95.9375rem)";  /* 1535px */
```

### Range Queries
```css
--media-query-sm-only: "(min-width: 36rem) and (max-width: 47.9375rem)";
--media-query-md-only: "(min-width: 48rem) and (max-width: 63.9375rem)";
--media-query-lg-only: "(min-width: 64rem) and (max-width: 79.9375rem)";
--media-query-xl-only: "(min-width: 80rem) and (max-width: 95.9375rem)";
```

## Container Sizes

### Max Widths
```css
--container-max-width-xs: 100%;         /* Full width on mobile */
--container-max-width-sm: 36rem;        /* 576px */
--container-max-width-md: 48rem;        /* 768px */
--container-max-width-lg: 64rem;        /* 1024px */
--container-max-width-xl: 80rem;        /* 1280px */
--container-max-width-2xl: 96rem;       /* 1536px */
```

### Padding
```css
--container-padding-xs: var(--space-4);  /* 16px */
--container-padding-sm: var(--space-6);  /* 24px */
--container-padding-md: var(--space-8);  /* 32px */
--container-padding-lg: var(--space-10); /* 40px */
--container-padding-xl: var(--space-12); /* 48px */
```

## Grid System

### Columns
```css
--grid-columns: 12;                     /* 12-column grid system */
--grid-gutter-xs: var(--space-4);       /* 16px */
--grid-gutter-sm: var(--space-6);       /* 24px */
--grid-gutter-md: var(--space-8);       /* 32px */
--grid-gutter-lg: var(--space-10);      /* 40px */
--grid-gutter-xl: var(--space-12);      /* 48px */
```

### Responsive Grid Behavior
```css
--grid-column-width-xs: calc((100% - (var(--grid-columns) - 1) * var(--grid-gutter-xs)) / var(--grid-columns));
--grid-column-width-sm: calc((100% - (var(--grid-columns) - 1) * var(--grid-gutter-sm)) / var(--grid-columns));
--grid-column-width-md: calc((100% - (var(--grid-columns) - 1) * var(--grid-gutter-md)) / var(--grid-columns));
--grid-column-width-lg: calc((100% - (var(--grid-columns) - 1) * var(--grid-gutter-lg)) / var(--grid-columns));
--grid-column-width-xl: calc((100% - (var(--grid-columns) - 1) * var(--grid-gutter-xl)) / var(--grid-columns));
```

## Device-Specific Adaptations

### Mobile-First Approach
```css
/* Default styles for mobile */
:root {
  --device-type: "mobile";
  --touch-target-size: var(--size-min-touch);
  --navigation-type: "bottom";
}

/* Tablet adaptations */
@media (min-width: 48rem) {
  :root {
    --device-type: "tablet";
    --navigation-type: "sidebar";
  }
}

/* Desktop adaptations */
@media (min-width: 64rem) {
  :root {
    --device-type: "desktop";
    --navigation-type: "sidebar";
  }
}

/* Large screen adaptations */
@media (min-width: 80rem) {
  :root {
    --device-type: "large-desktop";
  }
}
```

## Responsive Behavior Patterns

### Navigation Patterns
```css
--nav-mobile-height: var(--size-height-header);
--nav-mobile-width: 100%;
--nav-desktop-width: 16rem;             /* 256px */
--nav-desktop-height: 100vh;
```

### Typography Scaling
```css
--typography-scale-mobile: 1;
--typography-scale-tablet: 1.125;
--typography-scale-desktop: 1.25;
--typography-scale-large: 1.5;
```

### Spacing Scaling
```css
--spacing-scale-mobile: 1;
--spacing-scale-tablet: 1.25;
--spacing-scale-desktop: 1.5;
--spacing-scale-large: 1.75;
```

## Implementation Guidelines

### CSS Media Query Usage
```css
/* Mobile first - default styles */

/* Tablet styles */
@media var(--media-query-min-md) {
  /* Tablet-specific styles */
}

/* Desktop styles */
@media var(--media-query-min-lg) {
  /* Desktop-specific styles */
}

/* Large screen styles */
@media var(--media-query-min-xl) {
  /* Large screen-specific styles */
}
```

### JavaScript Breakpoint Detection
```javascript
// Example of how to use breakpoints in JavaScript
const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536
};

const getCurrentBreakpoint = () => {
  const width = window.innerWidth;
  if (width >= breakpoints.xxl) return '2xl';
  if (width >= breakpoints.xl) return 'xl';
  if (width >= breakpoints.lg) return 'lg';
  if (width >= breakpoints.md) return 'md';
  if (width >= breakpoints.sm) return 'sm';
  return 'xs';
};
```

## Responsive Utility Classes

### Display Utilities
```css
.hide-xs {
  display: none;
}

@media var(--media-query-min-sm) {
  .hide-xs {
    display: block;
  }
}

.show-md {
  display: none;
}

@media var(--media-query-min-md) {
  .show-md {
    display: block;
  }
}
```

### Grid Utilities
```css
.grid-cols-1 {
  grid-template-columns: 1fr;
}

@media var(--media-query-min-sm) {
  .grid-cols-1-sm {
    grid-template-columns: 1fr;
  }
}

@media var(--media-query-min-md) {
  .grid-cols-2-md {
    grid-template-columns: 1fr 1fr;
  }
}

@media var(--media-query-min-lg) {
  .grid-cols-3-lg {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
```

## Accessibility Considerations

### Focus Management
```css
/* Ensure focus indicators are visible on all screen sizes */
@media var(--media-query-max-md) {
  :focus-visible {
    outline-offset: var(--space-focus-offset);
  }
}
```

### Text Scaling
```css
/* Ensure text remains readable on all devices */
@media var(--media-query-max-xs) {
  :root {
    font-size: 1rem; /* 16px base */
  }
}

@media var(--media-query-min-xl) {
  :root {
    font-size: 1.125rem; /* 18px base for large screens */
  }
}
```

## Testing Guidelines

### Device Testing
- Test on actual devices when possible
- Use browser dev tools for initial testing
- Verify touch target sizes on mobile
- Check readability on all screen sizes

### Breakpoint Testing
- Test at exact breakpoint values
- Test between breakpoints
- Verify content reflow
- Check for horizontal scrolling

## Do's and Don'ts

### Do's
- Use mobile-first approach
- Test across all breakpoints
- Maintain content hierarchy
- Ensure touch accessibility
- Use semantic breakpoint names

### Don'ts
- Don't create custom breakpoints
- Don't ignore mobile experience
- Don't use device-specific dimensions
- Don't break content flow
- Don't ignore accessibility

## Browser Support

The breakpoint system uses standard CSS media queries which are supported in all modern browsers. For older browsers, graceful degradation should be implemented.

All breakpoint values use rem units which scale with the user's font size settings, ensuring accessibility compliance.