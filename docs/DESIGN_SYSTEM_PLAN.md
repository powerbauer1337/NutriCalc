# NutriCalc Design System Implementation Plan

## Overview

This document outlines the plan for establishing a scalable design system with reusable components for NutriCalc, based on the UI/UX audit findings. The goal is to improve form validation, accessibility, and visual consistency while creating a foundation for future development.

## Component Library Structure

### Component Categories

1. **Foundational Components**
   - Design Tokens (Colors, Typography, Spacing, etc.)
   - Utility Functions (cn, etc.)

2. **Layout Components**
   - Grid System
   - Container
   - Card System
   - Responsive Layout

3. **Input Components**
   - Form Controls (Input, Textarea, Select)
   - Buttons
   - Checkbox/Radio
   - Slider
   - Toggle Switch

4. **Data Display Components**
   - Tables
   - Lists
   - Charts/Graphs
   - Badges
   - Progress Indicators

5. **Feedback Components**
   - Toasts/Notifications
   - Modals/Dialogs
   - Alerts
   - Loading Indicators

6. **Navigation Components**
   - Navigation
   - Breadcrumbs
   - Tabs
   - Pagination

7. **Form Components**
   - Form Layout
   - Form Validation
   - Error Messaging
   - Field Groups

## Component Naming Conventions and Hierarchy

### Naming Conventions

1. **PascalCase** for component names (e.g., `Button`, `CardHeader`)
2. **Descriptive names** that clearly indicate the component's purpose
3. **Consistent prefixes** for related components (e.g., `FormInput`, `FormSelect`)
4. **Avoid abbreviations** unless they are widely understood
5. **Use singular form** for components (e.g., `Button` not `Buttons`)

### Component Hierarchy

1. **Atomic Components** - Basic building blocks (Button, Input, Icon)
2. **Molecular Components** - Simple combinations of atomic components (InputGroup, FormField)
3. **Organismic Components** - Complex components combining molecules and atoms (Form, Card, Navigation)
4. **Template Components** - Page-level components that compose organisms
5. **Page Components** - Specific implementations of templates

### File Structure

```
src/
  components/
    foundational/
      Button/
        Button.tsx
        index.ts
      ...
    layout/
      Card/
        Card.tsx
        CardHeader.tsx
        CardContent.tsx
        CardFooter.tsx
        index.ts
      ...
    input/
      ...
    data-display/
      ...
    feedback/
      ...
    navigation/
      ...
    form/
      ...
```

## Design System Documentation Structure

### Documentation Structure

1. **Design System Overview**
   - Philosophy and Principles
   - Getting Started Guide

2. **Foundations**
   - Color Palette
   - Typography
   - Spacing System
   - Border Radius
   - Shadows
   - Transitions
   - Icons

3. **Component Library**
   - Component Categories (with links to detailed docs)
   - Component Status (Stable, Beta, Deprecated)

4. **Component Documentation (per component)**
   - Purpose and Use Cases
   - API Reference (Props/Types)
   - Variants and States
   - Usage Examples
   - Accessibility Guidelines
   - Best Practices
   - Related Components

5. **Patterns and Guidelines**
   - Form Patterns
   - Layout Patterns
   - Navigation Patterns
   - Error Handling Patterns
   - Responsive Design Guidelines

6. **Accessibility**
   - WCAG Compliance
   - Keyboard Navigation
   - Screen Reader Support
   - Focus Management

7. **Contributing**
   - Component Development Guidelines
   - Testing Requirements
   - Documentation Standards

## Component API Standardization Guidelines

### General Principles

1. **Consistent Prop Naming**
   - Use `isOpen`/`onOpen`/`onClose` for visibility control
   - Use `value`/`onChange` for data binding
   - Use `disabled` for interaction control
   - Use `loading` for async states
   - Use `error` for error states

2. **TypeScript First**
   - All components must have proper TypeScript interfaces
   - Use union types for variant props (e.g., `variant: 'primary' | 'secondary'`)
   - Export component props for reuse

3. **Accessibility Requirements**
   - All interactive components must support keyboard navigation
   - Proper ARIA attributes for screen readers
   - Focus management for modal/dialog components
   - Color contrast compliance

4. **Styling Consistency**
   - Use `className` prop for custom styling
   - Support CSS variables for theming
   - Consistent size variants (sm, md, lg)
   - Consistent state variants (hover, focus, disabled)

5. **Event Handling Patterns**
   - Prefix event handlers with `on` (e.g., `onClick`, `onChange`)
   - Provide event context in callbacks
   - Support native event propagation

6. **Composition Patterns**
   - Support `React.forwardRef` for DOM access
   - Use `React.PropsWithChildren` for components with children
   - Support render props for complex customization

7. **Form Integration**
   - Support `name` and `value` for form integration
   - Provide `onBlur` and `onFocus` handlers
   - Support form validation integration

## Integration Strategy

### Phase 1: Foundation Alignment
1. **Design Token Standardization**
   - Align existing CSS variables with design system tokens
   - Update component styles to use design tokens consistently
   - Create linting rules to enforce token usage

2. **Component API Refactoring**
   - Update Button component to match new API standards
   - Update Card component with consistent variants
   - Ensure all components follow naming conventions

### Phase 2: Accessibility Improvements
1. **Focus Management**
   - Add proper focus trapping for modal components
   - Implement consistent focus indicators
   - Add keyboard navigation support

2. **Screen Reader Support**
   - Add ARIA attributes to all interactive components
   - Implement proper heading structure
   - Add accessible labels for form elements

### Phase 3: New Component Implementation
1. **Form Components**
   - Implement standardized form controls with validation
   - Create error messaging components
   - Add form layout components

2. **Feedback Components**
   - Implement modal/dialog components
   - Add alert/notification components
   - Create loading indicator variants

### Phase 4: Responsive Design
1. **Component Responsiveness**
   - Ensure all components are mobile-friendly
   - Implement responsive layout patterns
   - Add touch-friendly interaction targets

### Backward Compatibility
1. **Deprecation Strategy**
   - Maintain old component APIs with deprecation warnings
   - Provide codemods for automated migration
   - Document breaking changes

2. **Gradual Migration**
   - Allow both old and new components to coexist
   - Provide migration guides for each component
   - Update documentation to reference new components

## Component Migration Guides

### Button Component Migration Guide

**From current implementation to new standardized API:**

1. **Props Changes**
   - Current: Uses direct CSS classes for variants
   - New: Uses `variant` and `size` props with CVA
   - Migration: Replace className-based variants with prop-based variants

2. **Accessibility Improvements**
   - Add proper ARIA attributes for loading states
   - Ensure focus ring is visible in all contexts
   - Add support for aria-label when used with icons only

### Card Component Migration Guide

1. **Structure Changes**
   - Current: Single Card component
   - New: Card composition system (Card, CardHeader, CardContent, CardFooter)
   - Migration: Break existing card implementations into sub-components

2. **Styling Updates**
   - Current: Uses direct Tailwind classes
   - New: Uses design system tokens and CVA variants
   - Migration: Replace direct classes with variant props

### Navigation Component Migration Guide

1. **Accessibility Enhancements**
   - Current: Basic keyboard navigation
   - New: Full keyboard navigation with Home/End support
   - Migration: Add proper ARIA roles and attributes

2. **Responsive Improvements**
   - Current: Basic responsive implementation
   - New: Enhanced responsive behavior with better breakpoints
   - Migration: Update CSS to use design system breakpoints

### Toast Component Migration Guide

1. **API Standardization**
   - Current: Separate ToastContainer and ToastMessage
   - New: Unified toast system with consistent API
   - Migration: Consolidate toast components under single API

2. **Styling Updates**
   - Current: Direct color classes
   - New: Use design system color tokens
   - Migration: Replace color classes with design system tokens

## Testing Strategies

### Unit Testing

1. **Component Rendering**
   - Test that components render correctly with default props
   - Test rendering with different variant combinations
   - Test conditional rendering based on props

2. **Prop Validation**
   - Test that components handle required props correctly
   - Test behavior with optional props
   - Test edge cases and invalid prop values

3. **Event Handling**
   - Test that event handlers are called appropriately
   - Test event parameters and context
   - Test event propagation behavior

### Accessibility Testing

1. **Keyboard Navigation**
   - Test that all interactive elements are keyboard accessible
   - Test focus order and focus management
   - Test keyboard shortcuts and special keys

2. **Screen Reader Support**
   - Test ARIA attributes are present and correct
   - Test that screen readers announce components properly
   - Test dynamic content updates

3. **Color Contrast**
   - Test color contrast ratios meet WCAG requirements
   - Test contrast in both light and dark modes
   - Test focus indicators visibility

### Integration Testing

1. **Form Components**
   - Test form validation and error messaging
   - Test integration with form libraries
   - Test controlled and uncontrolled component behavior

2. **Component Composition**
   - Test that components work together as expected
   - Test nested component behavior
   - Test component customization through props

### Visual Regression Testing

1. **Snapshot Testing**
   - Create snapshots of component render output
   - Test component variants and states
   - Update snapshots when intentional changes are made

2. **Cross-browser Testing**
   - Test components in supported browsers
   - Test responsive behavior across devices
   - Test dark mode and high contrast modes

### Performance Testing

1. **Rendering Performance**
   - Test component render times
   - Test performance with large datasets
   - Test memoization and optimization

2. **Bundle Size**
   - Monitor component bundle size impact
   - Test tree-shaking effectiveness
   - Optimize dependencies

## Accessibility Considerations

### Foundational Components

1. **Design Tokens**
   - Ensure all color combinations meet WCAG 2.1 AA contrast requirements
   - Provide accessible alternatives for color-only information
   - Document contrast ratios for all color pairings

### Layout Components

1. **Card System**
   - Use semantic HTML elements (article, section)
   - Provide proper heading structure
   - Ensure sufficient color contrast for text and borders

2. **Responsive Layout**
   - Implement skip links for keyboard navigation
   - Maintain proper reading order in responsive layouts
   - Ensure content reflows appropriately on small screens

### Input Components

1. **Form Controls**
   - Associate labels with inputs using htmlFor/id
   - Provide proper error messaging with aria-describedby
   - Implement visible focus indicators
   - Support keyboard navigation (Tab, Shift+Tab)

2. **Buttons**
   - Use button role for clickable elements
   - Provide aria-pressed for toggle buttons
   - Ensure sufficient touch target size (44px minimum)
   - Implement proper focus management

### Data Display Components

1. **Tables**
   - Use proper table markup (table, thead, tbody, th, td)
   - Associate headers with data cells using scope or headers attribute
   - Implement responsive table patterns for small screens
   - Provide sorting and filtering accessibility

2. **Charts/Graphs**
   - Provide text alternatives for data visualization
   - Implement keyboard navigation for chart elements
   - Use ARIA attributes to describe data relationships
   - Provide data in tabular format as alternative

### Feedback Components

1. **Toasts/Notifications**
   - Use appropriate ARIA roles (alert, status)
   - Implement auto-dismissal with user control
   - Provide non-visual feedback for screen readers
   - Ensure toasts don't obscure important content

2. **Modals/Dialogs**
   - Implement focus trapping within dialog
   - Provide proper ARIA roles (dialog, alertdialog)
   - Ensure backdrop click closes dialog when appropriate
   - Return focus to triggering element after close

### Navigation Components

1. **Navigation Menus**
   - Use proper ARIA roles (navigation, menu, menuitem)
   - Implement keyboard navigation (arrow keys, Home, End)
   - Provide visible current page indication
   - Ensure skip links are available

2. **Tabs**
   - Use tablist, tab, and tabpanel roles
   - Implement keyboard navigation (arrow keys, Home, End)
   - Manage focus between tabs and tab panels
   - Provide visual indication of active tab

### Form Components

1. **Form Layout**
   - Group related form elements with fieldset/legend
   - Provide clear visual hierarchy
   - Implement proper error identification and recovery
   - Ensure forms are keyboard navigable

2. **Validation**
   - Provide immediate feedback for validation errors
   - Associate errors with form fields using aria-describedby
   - Allow error correction without losing entered data
   - Implement success feedback for completed actions

## Usage Guidelines and Best Practices

### Component Usage Guidelines

1. **Component Selection**
   - Choose the right component for the use case
   - Follow the principle of least complexity (use simplest component that meets needs)
   - Consider accessibility requirements when selecting components
   - Check component status (Stable, Beta, Deprecated)

2. **Customization**
   - Use variant props instead of custom CSS when possible
   - Extend components through composition rather than modification
   - Use className prop for styling exceptions
   - Avoid overriding core functionality through CSS

3. **Performance**
   - Use React.memo for expensive components
   - Implement virtualization for large data sets
   - Lazy load non-critical components
   - Optimize images and media within components

### Design System Best Practices

1. **Consistency**
   - Use design tokens instead of hardcoded values
   - Follow established patterns and conventions
   - Maintain visual hierarchy through consistent typography
   - Use consistent spacing and alignment

2. **Responsive Design**
   - Design mobile-first
   - Use responsive utility classes
   - Test components across different viewport sizes
   - Ensure touch targets are appropriately sized

3. **Accessibility**
   - Test with keyboard navigation
   - Verify color contrast ratios
   - Use semantic HTML elements
   - Provide text alternatives for non-text content

### Development Best Practices

1. **Code Quality**
   - Write TypeScript interfaces for all components
   - Use ESLint and Prettier for code consistency
   - Follow functional programming principles
   - Implement proper error handling

2. **Documentation**
   - Document all public APIs
   - Provide usage examples for common scenarios
   - Include accessibility considerations
   - Update documentation with component changes

3. **Testing**
   - Write unit tests for all components
   - Include accessibility tests
   - Test responsive behavior
   - Implement visual regression testing

### Integration Best Practices

1. **Form Integration**
   - Use controlled components for form inputs
   - Implement proper validation patterns
   - Provide clear error messaging
   - Support form reset functionality

2. **State Management**
   - Lift state up when needed for component communication
   - Use context for global state
   - Implement proper state initialization
   - Handle async state changes appropriately

3. **Performance Optimization**
   - Use useCallback for event handlers passed to children
   - Implement proper dependency arrays in hooks
   - Avoid unnecessary re-renders
   - Use code splitting for large components