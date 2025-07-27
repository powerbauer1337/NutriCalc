# NutriCalc Design Tokens: Z-Index System

## Overview

This document defines the comprehensive z-index token system for NutriCalc, ensuring consistent layer stacking hierarchy and proper component depth management. The system provides a clear stacking order that prevents visual conflicts and maintains accessibility standards.

## Z-Index Scale

The z-index system follows a structured approach with semantic naming to ensure predictable layering:

```css
--z-index-auto: auto;
--z-index-base: 0;
--z-index-dropdown: 1000;
--z-index-sticky: 1020;
--z-index-fixed: 1030;
--z-index-backdrop: 1040;
--z-index-modal: 1050;
--z-index-popover: 1060;
--z-index-tooltip: 1070;
--z-index-toast: 1080;
```

## Layer Hierarchy

### Base Layer (0-999)
```css
--z-index-background: -1;           /* Background elements */
--z-index-base: 0;                  /* Default layer */
--z-index-content: 1;               /* Main content */
--z-index-decoration: 2;            /* Decorative elements */
--z-index-interactive: 10;          /* Interactive elements */
--z-index-card: 20;                 /* Card components */
--z-index-dropdown-content: 50;     /* Dropdown content */
```

### Floating Layers (1000-1999)
```css
--z-index-dropdown: 1000;           /* Dropdown menus */
--z-index-sticky: 1020;             /* Sticky elements */
--z-index-fixed: 1030;              /* Fixed position elements */
```

### Overlay Layers (2000-2999)
```css
--z-index-backdrop: 2000;           /* Modal backdrops */
--z-index-modal: 2010;              /* Modal dialogs */
--z-index-drawer: 2020;             /* Side drawers */
--z-index-popover: 2030;            /* Popover components */
```

### Notification Layers (3000+)
```css
--z-index-tooltip: 3000;            /* Tooltips */
--z-index-toast: 3010;              /* Toast notifications */
--z-index-alert: 3020;              /* Alert banners */
```

## Component-Specific Z-Index Tokens

### Navigation
```css
--z-index-nav-sidebar: var(--z-index-fixed);
--z-index-nav-topbar: var(--z-index-sticky);
--z-index-nav-bottombar: var(--z-index-fixed);
--z-index-nav-dropdown: var(--z-index-dropdown);
```

### Forms
```css
--z-index-form-dropdown: var(--z-index-dropdown);
--z-index-form-tooltip: var(--z-index-tooltip);
--z-index-form-error: var(--z-index-dropdown);
```

### Data Display
```css
--z-index-chart-tooltip: var(--z-index-tooltip);
--z-index-table-sticky: var(--z-index-sticky);
--z-index-table-dropdown: var(--z-index-dropdown);
```

### Feedback
```css
--z-index-modal-backdrop: var(--z-index-backdrop);
--z-index-modal-content: var(--z-index-modal);
--z-index-toast-container: var(--z-index-toast);
--z-index-tooltip-content: var(--z-index-tooltip);
--z-index-popover-content: var(--z-index-popover);
```

## Contextual Z-Index Adjustments

### Modal Context
```css
/* Within modals, create a new stacking context */
.modal {
  --z-index-modal-dropdown: 10;
  --z-index-modal-tooltip: 20;
  --z-index-modal-popover: 30;
}
```

### Drawer Context
```css
/* Within drawers, create a new stacking context */
.drawer {
  --z-index-drawer-dropdown: 10;
  --z-index-drawer-tooltip: 20;
}
```

## Stacking Context Management

### Creating New Stacking Contexts
```css
.stacking-context {
  /* Create a new stacking context */
  isolation: isolate;
  /* Or use any of these properties */
  position: relative;
  z-index: 0;
}
```

### Isolation Pattern
```css
.isolation-context {
  isolation: isolate;
  z-index: var(--z-index-base);
}
```

## Responsive Z-Index Adjustments

### Mobile-First Approach
```css
/* Default mobile z-index values */
:root {
  --z-index-nav-primary: var(--z-index-fixed);
  --z-index-nav-secondary: var(--z-index-dropdown);
}

/* Desktop adjustments */
@media (min-width: 64rem) {
  :root {
    --z-index-nav-primary: var(--z-index-sticky);
    --z-index-nav-secondary: var(--z-index-fixed);
  }
}
```

## Accessibility Considerations

### Focus Management
```css
/* Ensure focused elements are visible above others */
:focus {
  z-index: calc(var(--z-index-base) + 1);
}

/* Special handling for focus within modals */
.modal :focus {
  z-index: calc(var(--z-index-modal) + 1);
}
```

### Screen Reader Compatibility
```css
/* Ensure screen reader elements remain accessible */
.sr-only {
  z-index: -1;
}
```

## Implementation Guidelines

### CSS Implementation
```css
.dropdown {
  z-index: var(--z-index-dropdown);
}

.modal {
  z-index: var(--z-index-modal);
}

.tooltip {
  z-index: var(--z-index-tooltip);
}
```

### JavaScript Integration
```javascript
// Example of using z-index tokens in JavaScript
const zIndexValues = {
  dropdown: 1000,
  modal: 1050,
  tooltip: 1070
};

function setComponentZIndex(element, componentType) {
  element.style.zIndex = zIndexValues[componentType];
}
```

## Z-Index Usage Patterns

### Layering Cards
```css
.card {
  z-index: var(--z-index-card);
}

.card:hover {
  z-index: calc(var(--z-index-card) + 1);
}
```

### Modal with Backdrop
```css
.modal-backdrop {
  z-index: var(--z-index-backdrop);
}

.modal-content {
  z-index: var(--z-index-modal);
}
```

### Toast Notifications
```css
.toast-container {
  z-index: var(--z-index-toast);
}

.toast-item {
  z-index: calc(var(--z-index-toast) + 1);
}
```

## Debugging Z-Index Issues

### Developer Tools
```css
/* Add temporary outlines to visualize stacking */
.debug-z-index * {
  outline: 1px solid red;
}
```

### Common Issues and Solutions
1. **Elements appearing behind others**: Check parent z-index context
2. **z-index not working**: Ensure position is not static
3. **Stacking conflicts**: Use isolation to create new contexts

## Do's and Don'ts

### Do's
- Use semantic z-index tokens instead of arbitrary values
- Create new stacking contexts intentionally
- Test layering across different components
- Consider accessibility in z-index decisions
- Document complex stacking scenarios

### Don'ts
- Don't use z-index values outside the defined scale
- Don't create unnecessary stacking contexts
- Don't ignore parent stacking context limitations
- Don't use extremely high z-index values
- Don't forget about focus management

## Browser Support

The z-index system uses standard CSS properties which are supported in all modern browsers. For older browsers, ensure proper fallback values are provided.

All z-index values use standard integer units ensuring broad compatibility.