# NutriCalc Design System

## Rationale
A design system ensures visual consistency, accessibility, and development efficiency by providing a single source of truth for UI standards and reusable components. This approach is recommended by industry leaders ([NNG](https://www.nngroup.com/articles/design-systems-101/)), enabling scalable, user-friendly, and maintainable interfaces.

## Color Palette
- **Primary:**
  - Blue 600: #2563eb (Tailwind `bg-blue-600`)
  - Blue 700: #1d4ed8 (Tailwind `bg-blue-700`)
- **Accent:**
  - Yellow 500: #eab308 (Tailwind `bg-yellow-500`)
  - Green 500: #22c55e (Tailwind `bg-green-500`)
  - Red 500: #ef4444 (Tailwind `bg-red-500`)
- **Backgrounds:**
  - Light: #f8fafc (Tailwind `bg-slate-50`)
  - Dark: #0f172a (Tailwind `bg-slate-900`)
  - Card: #ffffff (Tailwind `bg-white`), #1e293b (Tailwind `bg-slate-800`)
- **Text:**
  - Default: #0f172a (Tailwind `text-slate-900`)
  - Muted: #64748b (Tailwind `text-slate-500`)
  - Inverse: #f1f5f9 (Tailwind `text-slate-100`)
- **Borders:**
  - #e5e7eb (Tailwind `border-slate-200`)
  - #334155 (Tailwind `border-slate-700`)

> All colors meet WCAG AA contrast requirements for accessibility.

## Typography Scale
- **Font Family:**
  - Sans-serif (Tailwind default: `font-sans`)
- **Font Sizes:**
  - Heading 1: 2.25rem / 36px (`text-3xl`)
  - Heading 2: 1.5rem / 24px (`text-xl`)
  - Heading 3: 1.25rem / 20px (`text-lg`)
  - Body: 1rem / 16px (`text-base`)
  - Small: 0.875rem / 14px (`text-sm`)
  - Extra Small: 0.75rem / 12px (`text-xs`)
- **Font Weight:**
  - Headings: 700 (bold)
  - Body: 400 (normal)

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
Use a div with `rounded-lg shadow p-4 bg-white dark:bg-slate-800` for card containers.

**Example:**
```jsx
<div className="rounded-lg shadow p-4 bg-white dark:bg-slate-800">
  ...content...
</div>
```

### Input (Pattern)
Use `px-2 py-1 border rounded-md text-base dark:bg-slate-700 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500` for inputs.

**Example:**
```jsx
<input className="px-2 py-1 border rounded-md text-base dark:bg-slate-700 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
```

---

## UI Audit Checklist

- [x] All interactive elements have accessible labels (`aria-label`, `htmlFor`)
- [x] Focus states are visible for all inputs and buttons
- [x] Sufficient color contrast for text and backgrounds
- [x] Consistent use of color palette and typography
- [x] Consistent spacing and layout utilities
- [x] Use of reusable Button component
- [ ] All icons/buttons have descriptive labels for screen readers
- [ ] Keyboard navigation for all controls
- [ ] ARIA roles/attributes where appropriate (e.g., `role="alert"` for toasts)
- [ ] Document any custom variants or exceptions

---

## Navigation Patterns

### Responsive Sidebar & Bottom Navigation

- **Sidebar (md+ screens):**
  - Fixed on the left, always visible.
  - Shows icons and labels for each major tab.
  - Uses ARIA roles: `navigation`, `tablist`, `tab`.
  - Keyboard navigation: arrow keys, Home/End, focus ring.
  - Clear active state for current tab.
- **Bottom nav (mobile):**
  - Fixed at the bottom, always visible.
  - Icons and labels for each tab.
  - Same ARIA roles and keyboard navigation as sidebar.
  - Ensures navigation is within thumb's reach on mobile.

**Accessibility:**
- All nav buttons have `aria-label` and clear focus states.
- Uses `role="tablist"` and `role="tab"` for screen readers.
- Keyboard navigation: arrow keys, Home/End, focus ring.

**Example Usage:**
```jsx
<Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
```

---

*This document will evolve as the design system matures. All contributors should propose changes via pull request for review.* 