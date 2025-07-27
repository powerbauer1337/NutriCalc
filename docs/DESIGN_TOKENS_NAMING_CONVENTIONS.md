# NutriCalc Design Tokens: Naming Conventions and Usage Guidelines

## Overview

This document defines the naming conventions and usage guidelines for all design tokens in NutriCalc. Consistent naming ensures scalability, maintainability, and clear communication across design and development teams.

## Naming Convention Structure

All design tokens follow a consistent naming pattern:

```
--{category}-{subcategory}-{variant}-{state}
```

### Category
The broad classification of the token:
- `color` - Color values
- `font` - Typography properties
- `space` - Spacing and layout
- `size` - Dimensions and sizes
- `breakpoint` - Responsive breakpoints
- `motion` - Animations and transitions
- `z-index` - Layer stacking
- `radius` - Border radii
- `shadow` - Box shadows

### Subcategory
The specific type within the category:
- For colors: `primary`, `secondary`, `success`, `neutral`, etc.
- For fonts: `size`, `weight`, `family`, `line-height`, etc.
- For space: `padding`, `margin`, `gap`, etc.
- For size: `height`, `width`, `icon`, etc.

### Variant (Optional)
Specific variations within the subcategory:
- For colors: `50`, `100`, `500`, `900`, etc.
- For fonts: `xs`, `sm`, `base`, `lg`, etc.
- For space: `xs`, `sm`, `md`, `lg`, etc.

### State (Optional)
Contextual or interactive states:
- `hover`, `active`, `focus`, `disabled`
- `light`, `dark` (for theme variations)
- `mobile`, `tablet`, `desktop` (for responsive variations)

## Examples of Naming Patterns

### Color Tokens
```css
--color-primary-500
--color-success-600
--color-neutral-900
--color-border-focus
--color-text-on-primary
```

### Typography Tokens
```css
--font-size-lg
--font-weight-semibold
--font-family-primary
--font-line-height-relaxed
```

### Spacing Tokens
```css
--space-padding-md
--space-margin-lg
--space-gap-sm
```

### Sizing Tokens
```css
--size-height-input-md
--size-width-container-lg
--size-radius-button
```

## Semantic Naming

### Purpose-Driven Tokens
Tokens should describe their purpose rather than their appearance:

#### Good Examples:
```css
--color-background-success
--space-form-field-spacing
--font-heading-large
--size-button-min-width
```

#### Avoid These:
```css
--color-green
--space-24px
--font-size-18px
--size-width-200px
```

### Contextual Tokens
Tokens that describe their usage context:

```css
--color-button-primary-background
--color-button-primary-background-hover
--space-card-padding
--font-input-text
```

## Hierarchy and Organization

### Token Hierarchy
1. **Foundational Tokens** - Raw values (e.g., `--color-primary-500`)
2. **Alias Tokens** - Semantic mappings (e.g., `--color-background-primary`)
3. **Component Tokens** - Component-specific (e.g., `--color-button-background`)

### Foundational Tokens
These are the base values that all other tokens reference:

```css
/* Color Foundation */
--color-primary-500: #10b981;

/* Spacing Foundation */
--space-4: 1rem;

/* Typography Foundation */
--font-size-base: 1rem;
```

### Alias Tokens
These map foundational tokens to semantic purposes:

```css
/* Color Aliases */
--color-background-primary: var(--color-primary-500);
--color-text-on-primary: white;

/* Spacing Aliases */
--space-form-field: var(--space-4);

/* Typography Aliases */
--font-body: var(--font-size-base);
```

### Component Tokens
These are specific to individual components:

```css
/* Button Tokens */
--color-button-primary-background: var(--color-background-primary);
--color-button-primary-background-hover: var(--color-primary-600);
```

## Consistency Guidelines

### Naming Consistency
- Use consistent terminology across all tokens
- Follow established patterns for similar concepts
- Maintain parallel structure for related tokens

### Value Consistency
- Use the same foundational values for related tokens
- Maintain consistent scales (e.g., 4px grid for spacing)
- Ensure proper relationships between related tokens

### State Consistency
- Use consistent state naming across all components
- Apply states uniformly (hover, focus, active, disabled)
- Maintain predictable state behavior

## Responsive Token Naming

### Breakpoint Suffixes
Use breakpoint names as suffixes for responsive variations:

```css
--space-padding-responsive
--space-padding-responsive-sm
--space-padding-responsive-md
--space-padding-responsive-lg
```

### Media Query Tokens
Name media queries descriptively:

```css
--media-query-min-sm: "(min-width: 36rem)";
--media-query-max-md: "(max-width: 47.9375rem)";
```

## Theme Token Naming

### Theme Variations
Use theme names as prefixes or suffixes:

```css
--color-background-light: white;
--color-background-dark: #1e293b;
```

### Theme-Specific Tokens
For tokens that only exist in specific themes:

```css
--color-accent-light-theme: var(--color-primary-500);
--color-accent-dark-theme: var(--color-primary-400);
```

## Usage Guidelines

### When to Create New Tokens
Create a new token when:
1. The value is used in multiple places
2. The value has semantic meaning
3. The value might change in the future
4. The value needs to be themeable

### When NOT to Create Tokens
Don't create a token for:
1. One-time use values
2. Values that are unlikely to change
3. Values that are purely decorative
4. Values that break established patterns

### Token Documentation
Each token should include:
1. **Name** - The token name
2. **Value** - The actual value or reference
3. **Purpose** - What the token is used for
4. **Usage** - Where and how to use it
5. **Related** - Related tokens (if any)

## Implementation Best Practices

### CSS Custom Properties
Use CSS custom properties for all tokens:

```css
:root {
  --color-primary-500: #10b981;
  --space-4: 1rem;
}
```

### Fallback Values
Provide fallback values for older browsers:

```css
.element {
  color: #10b981; /* Fallback */
  color: var(--color-primary-500);
}
```

### Token Grouping
Group related tokens together in the CSS:

```css
/* Color Tokens */
--color-primary-500: #10b981;
--color-primary-600: #059669;

/* Spacing Tokens */
--space-4: 1rem;
--space-5: 1.25rem;
```

## Maintenance Guidelines

### Token Deprecation
When deprecating tokens:
1. Mark as deprecated in documentation
2. Provide migration path
3. Keep deprecated tokens for backward compatibility
4. Remove in major version updates

### Token Updates
When updating token values:
1. Understand the impact across the system
2. Update documentation
3. Test thoroughly
4. Communicate changes to team

### Token Audits
Regularly audit tokens to:
1. Remove unused tokens
2. Consolidate duplicate tokens
3. Ensure naming consistency
4. Verify accessibility compliance

## Tooling Integration

### Design Tools
- Use consistent naming in design tool libraries
- Sync token names between design and development
- Maintain parity between design and code tokens

### Development Tools
- Use token linting to enforce naming conventions
- Automate token generation from design tools
- Validate token usage in code reviews

## Common Patterns and Anti-Patterns

### Good Patterns
```css
/* Semantic and purpose-driven */
--color-background-success: var(--color-success-100);
--space-form-element-spacing: var(--space-3);
--font-heading-large: var(--font-weight-bold) var(--font-size-3xl)/var(--line-height-tight) var(--font-family-secondary);
```

### Anti-Patterns to Avoid
```css
/* Avoid generic names */
--color-blue: #3b82f6;
--space-big: 2rem;
--font-large: 1.5rem;

/* Avoid presentational names */
--color-light-green: #10b981;
--space-16px: 1rem;
```

## Cross-Team Communication

### Design Team
- Use token names in design specifications
- Maintain design tool libraries with token names
- Communicate token changes early

### Development Team
- Reference token names in code comments
- Use token names in component documentation
- Report token issues promptly

### Product Team
- Understand the impact of token changes
- Participate in token review processes
- Advocate for consistent token usage

## Versioning and Release Management

### Token Versioning
- Version token sets with semantic versioning
- Document breaking changes clearly
- Provide migration guides for major updates

### Release Process
1. Review token changes
2. Update documentation
3. Test across applications
4. Communicate changes
5. Deploy updates

## Accessibility Considerations

### Naming for Accessibility
- Use names that convey semantic meaning
- Consider how names might be interpreted by screen readers
- Ensure color token names indicate their purpose

### Contrast and Accessibility Tokens
```css
--color-text-primary-contrast: var(--color-neutral-900);
--color-text-on-primary-contrast: white;
```

## Performance Considerations

### Token Optimization
- Minimize the number of custom properties
- Group related tokens for better compression
- Avoid deeply nested variable references

### Runtime Performance
- Use transform and opacity for animations
- Limit the number of tokens used per component
- Cache token values when appropriate

## Browser Support

All naming conventions are compatible with:
- Modern browsers supporting CSS custom properties
- Build tools that process CSS variables
- Design tools that support token management

For older browsers, ensure proper fallbacks are provided.