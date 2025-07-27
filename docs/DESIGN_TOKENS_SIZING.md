# NutriCalc Design Tokens: Sizing System

## Overview

This document defines the comprehensive sizing token system for NutriCalc, ensuring consistent component dimensions, proper visual hierarchy, and responsive design. The system includes tokens for heights, widths, border radii, shadows, and icon sizes with appropriate adjustments for different contexts.

## Component Height Scale

### Form Elements and Buttons
```css
--size-height-input-xs: 1.5rem;     /* 24px */
--size-height-input-sm: 2rem;       /* 32px */
--size-height-input-md: 2.5rem;     /* 40px */
--size-height-input-lg: 3rem;       /* 48px */
--size-height-input-xl: 3.5rem;     /* 56px */
```

### Interactive Elements
```css
--size-height-touch-min: 2.75rem;   /* 44px - Minimum touch target */
--size-height-toolbar: 3rem;        /* 48px - Toolbar height */
--size-height-header: 4rem;         /* 64px - Header height */
--size-height-footer: 3rem;         /* 48px - Footer height */
```

### Cards and Containers
```css
--size-height-card-xs: 6rem;        /* 96px */
--size-height-card-sm: 8rem;        /* 128px */
--size-height-card-md: 12rem;       /* 192px */
--size-height-card-lg: 16rem;       /* 256px */
--size-height-card-xl: 20rem;       /* 320px */
```

## Width Scale

### Form Elements
```css
--size-width-input-xs: 4rem;        /* 64px */
--size-width-input-sm: 8rem;        /* 128px */
--size-width-input-md: 16rem;       /* 256px */
--size-width-input-lg: 24rem;       /* 384px */
--size-width-input-xl: 32rem;       /* 512px */
--size-width-input-full: 100%;      /* Full width */
```

### Containers
```css
--size-width-container-xs: 16rem;   /* 256px */
--size-width-container-sm: 24rem;   /* 384px */
--size-width-container-md: 32rem;   /* 512px */
--size-width-container-lg: 48rem;   /* 768px */
--size-width-container-xl: 64rem;   /* 1024px */
--size-width-container-2xl: 80rem;  /* 1280px */
```

### Avatars and Icons
```css
--size-width-avatar-xs: 1.5rem;     /* 24px */
--size-width-avatar-sm: 2rem;       /* 32px */
--size-width-avatar-md: 2.5rem;     /* 40px */
--size-width-avatar-lg: 3rem;       /* 48px */
--size-width-avatar-xl: 4rem;       /* 64px */
```

## Border Radius Scale

```css
--size-radius-none: 0;
--size-radius-xs: 0.125rem;         /* 2px */
--size-radius-sm: 0.25rem;          /* 4px */
--size-radius-md: 0.375rem;         /* 6px */
--size-radius-lg: 0.5rem;           /* 8px */
--size-radius-xl: 0.75rem;          /* 12px */
--size-radius-2xl: 1rem;            /* 16px */
--size-radius-3xl: 1.5rem;          /* 24px */
--size-radius-full: 9999px;         /* Pill shape */
```

### Semantic Border Radius Tokens
```css
--size-radius-button: var(--size-radius-md);     /* Button radius */
--size-radius-input: var(--size-radius-md);      /* Input radius */
--size-radius-card: var(--size-radius-lg);       /* Card radius */
--size-radius-avatar: var(--size-radius-full);   /* Avatar radius */
--size-radius-badge: var(--size-radius-full);    /* Badge radius */
```

## Shadow Scale

```css
--shadow-none: none;
--shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
--shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
--shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
```

### Semantic Shadow Tokens
```css
--shadow-button: var(--shadow-sm);      /* Button shadow */
--shadow-card: var(--shadow-md);        /* Card shadow */
--shadow-dropdown: var(--shadow-lg);    /* Dropdown shadow */
--shadow-modal: var(--shadow-xl);       /* Modal shadow */
--shadow-focus: var(--shadow-none);     /* Focus shadow (handled separately) */
```

## Icon Sizing

```css
--size-icon-xs: 0.75rem;    /* 12px */
--size-icon-sm: 1rem;       /* 16px */
--size-icon-md: 1.25rem;    /* 20px */
--size-icon-lg: 1.5rem;     /* 24px */
--size-icon-xl: 1.75rem;    /* 28px */
--size-icon-2xl: 2rem;      /* 32px */
--size-icon-3xl: 2.5rem;    /* 40px */
```

### Semantic Icon Tokens
```css
--size-icon-button: var(--size-icon-md);    /* Icon in buttons */
--size-icon-input: var(--size-icon-md);     /* Icon in inputs */
--size-icon-nav: var(--size-icon-lg);       /* Navigation icons */
--size-icon-alert: var(--size-icon-xl);     /* Alert icons */
```

## Breakpoint Tokens

```css
--breakpoint-xs: 0;             /* 0px - Extra small */
--breakpoint-sm: 36rem;         /* 576px - Small */
--breakpoint-md: 48rem;         /* 768px - Medium */
--breakpoint-lg: 64rem;         /* 1024px - Large */
--breakpoint-xl: 80rem;         /* 1280px - Extra large */
--breakpoint-2xl: 96rem;        /* 1536px - 2X large */
```

## Z-Index Scale

```css
--z-index-auto: auto;
--z-index-base: 0;
--z-index-dropdown: 10;
--z-index-sticky: 20;
--z-index-fixed: 30;
--z-index-backdrop: 40;
--z-index-modal: 50;
--z-index-popover: 60;
--z-index-tooltip: 70;
--z-index-toast: 80;
```

## Responsive Sizing Adjustments

### Mobile First (Default)
```css
:root {
  --size-responsive-container: var(--size-width-container-sm);
  --size-responsive-card: var(--size-height-card-md);
}
```

### Tablet Adjustments
```css
@media (min-width: 48rem) {
  :root {
    --size-responsive-container: var(--size-width-container-md);
    --size-responsive-card: var(--size-height-card-lg);
  }
}
```

### Desktop Adjustments
```css
@media (min-width: 64rem) {
  :root {
    --size-responsive-container: var(--size-width-container-lg);
    --size-responsive-card: var(--size-height-card-xl);
  }
}
```

### Large Screen Adjustments
```css
@media (min-width: 80rem) {
  :root {
    --size-responsive-container: var(--size-width-container-xl);
  }
}
```

## Component-Specific Sizing

### Buttons
```css
--size-button-min-width: 2.5rem;        /* 40px */
--size-button-padding-xs: 0.25rem 0.5rem;
--size-button-padding-sm: 0.5rem 0.75rem;
--size-button-padding-md: 0.75rem 1rem;
--size-button-padding-lg: 1rem 1.25rem;
```

### Cards
```css
--size-card-min-width: 16rem;           /* 256px */
--size-card-padding: 1.5rem;            /* 24px */
--size-card-gap: 1rem;                  /* 16px */
```

### Forms
```css
--size-form-field-height: var(--size-height-input-md);
--size-form-field-padding: 0.75rem;     /* 12px */
--size-form-group-spacing: 1.5rem;      /* 24px */
```

### Navigation
```css
--size-nav-height: var(--size-height-header);
--size-nav-width: 16rem;                /* 256px - Sidebar width */
--size-nav-item-height: 3rem;           /* 48px */
--size-nav-item-padding: 0.75rem 1rem;
```

## Accessibility Considerations

### Minimum Sizes
```css
--size-min-touch: 2.75rem;              /* 44px - Minimum touch target */
--size-min-focus: 2rem;                 /* 32px - Minimum focus area */
--size-min-form: var(--size-height-input-md);  /* 40px - Minimum form element */
```

### Focus Indicator Sizes
```css
--size-focus-ring-width: 0.125rem;      /* 2px */
--size-focus-ring-offset: 0.125rem;     /* 2px */
```

## Implementation Guidelines

### Do's
- Use semantic sizing tokens for consistent component dimensions
- Maintain proper sizing hierarchy
- Apply responsive sizing adjustments
- Ensure adequate touch target sizes

### Don'ts
- Don't use arbitrary sizing values
- Don't ignore responsive sizing needs
- Don't create sizing inconsistencies
- Don't use insufficient sizes for accessibility

## Usage Examples

### Component Sizing
```css
.button {
  height: var(--size-height-input-md);
  padding: var(--size-button-padding-md);
  border-radius: var(--size-radius-button);
  min-width: var(--size-button-min-width);
}

.card {
  height: var(--size-height-card-md);
  padding: var(--size-card-padding);
  border-radius: var(--size-radius-card);
  box-shadow: var(--shadow-card);
}
```

### Responsive Sizing
```css
.container {
  width: 100%;
  max-width: var(--size-responsive-container);
}

.card {
  height: var(--size-responsive-card);
}
```

### Icon Sizing
```css
.icon-button {
  width: var(--size-icon-button);
  height: var(--size-icon-button);
}

.alert-icon {
  width: var(--size-icon-alert);
  height: var(--size-icon-alert);
}
```

## Browser Support

The sizing system uses CSS custom properties which are supported in all modern browsers. For older browsers, fallback values should be provided in the implementation.

All sizing values use rem units which scale with the user's font size settings, ensuring accessibility compliance.
