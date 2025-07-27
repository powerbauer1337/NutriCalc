# NutriCalc Design System

## Overview

The NutriCalc design system provides a comprehensive set of design tokens, components, and guidelines for building consistent and beautiful user interfaces. The system is built with modern web standards and focuses on accessibility, usability, and visual appeal.

For a detailed implementation plan, see [DESIGN_SYSTEM_PLAN.md](./DESIGN_SYSTEM_PLAN.md).

## Rationale & Philosophy

A design system ensures visual consistency, accessibility, and development efficiency by providing a single source of truth for UI standards and reusable components. This approach is recommended by industry leaders ([NNG](https://www.nngroup.com/articles/design-systems-101/)), enabling scalable, user-friendly, and maintainable interfaces.

- **Nature-Inspired**: Uses emerald green as the primary color to reflect the plant/nutrient theme
- **Modern & Clean**: Minimalist approach with plenty of whitespace
- **Accessible**: WCAG 2.1 AA compliant with proper contrast ratios
- **Consistent**: Systematic approach to spacing, typography, and colors
- **Responsive**: Mobile-first design that scales beautifully

## Color Palette

### Primary Colors (Emerald/Blue)
```css
--color-primary-50: 240 253 244;   /* Very light emerald */
--color-primary-100: 209 250 229;  /* Light emerald */
--color-primary-500: 16 185 129;   /* Main emerald */
--color-primary-600: 5 150 105;    /* Dark emerald */
--color-primary-700: 4 120 87;     /* Darker emerald */
--color-secondary-50: 239 246 255;  /* Very light blue */
--color-secondary-500: 59 130 246;  /* Main blue */
--color-secondary-600: 37 99 235;   /* Dark blue */
```

### Accent & Semantic Colors
```css
--color-accent-yellow-500: 234 179 8;   /* Yellow */
--color-accent-green-500: 34 197 94;    /* Green */
--color-accent-red-500: 239 68 68;      /* Red */
--color-info: 56 189 248;               /* Sky blue */
```

### Neutral Colors (Stone)
```css
--color-neutral-50: 250 250 249;   /* Almost white */
--color-neutral-100: 245 245 244;  /* Very light gray */
--color-neutral-200: 231 229 228;  /* Light gray */
--color-neutral-600: 87 83 78;     /* Medium gray */
--color-neutral-900: 28 25 23;     /* Almost black */
```

### Tailwind Color Mapping
- Blue 600: #2563eb (Tailwind `bg-blue-600`)
- Blue 700: #1d4ed8 (Tailwind `bg-blue-700`)
- Yellow 500: #eab308 (Tailwind `bg-yellow-500`)
- Green 500: #22c55e (Tailwind `bg-green-500`)
- Red 500: #ef4444 (Tailwind `bg-red-500`)
- Light: #f8fafc (Tailwind `bg-slate-50`)
- Dark: #0f172a (Tailwind `bg-slate-900`)
- Card: #ffffff (Tailwind `bg-white`), #1e293b (Tailwind `bg-slate-800`)
- Text: #0f172a (Tailwind `text-slate-900`), #64748b (Tailwind `text-slate-500`), #f1f5f9 (Tailwind `text-slate-100`)
- Borders: #e5e7eb (Tailwind `border-slate-200`), #334155 (Tailwind `border-slate-700`)

> All colors meet WCAG AA contrast requirements for accessibility.

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

### Font Family
- Sans-serif (Tailwind default: `font-sans`)

### Font Sizes (Tailwind)
- Heading 1: 2.25rem / 36px (`text-3xl`)
- Heading 2: 1.5rem / 24px (`text-xl`)
- Heading 3: 1.25rem / 20px (`text-lg`)
- Body: 1rem / 16px (`text-base`)
- Small: 0.875rem / 14px (`text-sm`)
- Extra Small: 0.75rem / 12px (`text-xs`)

### Font Weights
- Headings: 700 (bold)
- Body: 400 (normal)
- Medium: 500 (emphasis)
- Semibold: 600 (subheadings)

### Line Heights
- Tight: 1.25 - Headings
- Normal: 1.5 - Body text
- Relaxed: 1.75 - Long-form content

## Spacing System

Based on 4px grid system:
```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
```

## Usage Guidelines

- Use only the defined palette and typography for all UI elements.
- Ensure sufficient color contrast for text and interactive elements.
- Apply consistent spacing and sizing using Tailwind's utility classes.
- Reference this document when creating or updating components.

---

## Reusable UI Components

### Button
A reusable Button component ensures consistent styling and accessibility across the app.

**Variants:**
- `primary` (default): Blue background, white text
- `secondary`: Light/dark background, slate text
- `danger`: Red background, white text

**Props:**
- `variant`: 'primary' | 'secondary' | 'danger'
- `fullWidth`: boolean
- `disabled`: boolean
- `loading`: boolean (shows spinner)
- `className`: string (for custom styles)
- `type`: 'button' | 'submit' | 'reset'

**Accessibility:**
- Focus ring visible
- Disabled and loading states
- `aria-busy` for loading

**Example:**
```jsx
<Button variant="primary">Save</Button>
<Button variant="secondary" disabled>Cancel</Button>
<Button variant="danger" loading>Delete</Button>
```

### Card (Pattern)
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

## Component Library Structure

See [Component Structure Diagram](./component-structure-diagram.md) for a visual representation of the component library structure.

### Component Categories
1. **Foundational Components**
2. **Layout Components**
3. **Input Components**
4. **Data Display Components**
5. **Feedback Components**
6. **Navigation Components**
7. **Form Components**

## Component Hierarchy

See [Component Hierarchy Diagram](./component-hierarchy-diagram.md) for a visual representation of the component hierarchy.

1. **Atomic Components** - Basic building blocks
2. **Molecular Components** - Simple combinations
3. **Organismic Components** - Complex components
4. **Template Components** - Page-level compositions
5. **Page Components** - Specific implementations

## Integration Strategy

See [Integration Strategy Diagram](./integration-strategy-diagram.md) for a visual representation of the integration phases.

### Phases
1. **Foundation Alignment**
2. **Accessibility Improvements**
3. **New Component Implementation**
4. **Responsive Design**

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

For detailed accessibility considerations for each component category, see [DESIGN_SYSTEM_PLAN.md](./DESIGN_SYSTEM_PLAN.md).
