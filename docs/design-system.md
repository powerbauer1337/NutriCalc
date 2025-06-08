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

*This document will evolve as the design system matures. All contributors should propose changes via pull request for review.* 