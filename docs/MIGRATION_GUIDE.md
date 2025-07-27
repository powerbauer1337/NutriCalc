# NutriCalc Design System Migration Guide

## Overview

This document provides guidance for migrating existing components to the new design system standards. The migration is organized in phases to ensure backward compatibility and smooth transition.

For a complete implementation plan, see [DESIGN_SYSTEM_PLAN.md](./DESIGN_SYSTEM_PLAN.md).

## Migration Phases

See [Integration Strategy Diagram](./integration-strategy-diagram.md) for a visual representation of the migration phases.

### Phase 1: Foundation Alignment

#### Design Token Standardization
1. Replace hardcoded color values with design system tokens
2. Replace hardcoded spacing values with design system tokens
3. Replace hardcoded typography values with design system tokens

#### Component API Refactoring
1. Update Button component to use CVA for variants
2. Update Card component to use composition pattern
3. Ensure all components follow consistent prop naming

### Phase 2: Accessibility Improvements

#### Focus Management
1. Add focus trapping to modal components
2. Implement consistent focus indicators
3. Add keyboard navigation support to all interactive components

#### Screen Reader Support
1. Add ARIA attributes to all components
2. Implement proper heading structure
3. Add accessible labels for form elements

### Phase 3: New Component Implementation

#### Form Components
1. Implement standardized form controls with validation
2. Create error messaging components
3. Add form layout components

#### Feedback Components
1. Implement modal/dialog components
2. Add alert/notification components
3. Create loading indicator variants

### Phase 4: Responsive Design

#### Component Responsiveness
1. Ensure all components are mobile-friendly
2. Implement responsive layout patterns
3. Add touch-friendly interaction targets

## Component-Specific Migration Guides

### Button Component Migration

#### Current Implementation
```tsx
// Old Button usage
<button className="px-4 py-2 bg-emerald-600 text-white rounded-lg">
  Click me
</button>
```

#### New Implementation
```tsx
// New Button usage
import Button from './components/Button';

<Button variant="primary" size="md">
  Click me
</Button>
```

#### Migration Steps
1. Replace direct className usage with variant props
2. Add loading state support
3. Add icon support
4. Ensure proper accessibility attributes

### Card Component Migration

#### Current Implementation
```tsx
// Old Card usage
<div className="bg-white rounded-lg shadow p-6">
  <h3 className="text-lg font-semibold">Card Title</h3>
  <p>Card content</p>
</div>
```

#### New Implementation
```tsx
// New Card usage
import { Card, CardHeader, CardTitle, CardContent } from './components/Card';

<Card variant="elevated">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Card content</p>
  </CardContent>
</Card>
```

#### Migration Steps
1. Break single card component into composition pattern
2. Add variant support
3. Add padding options
4. Ensure proper semantic HTML structure

### Navigation Component Migration

#### Current Implementation
```tsx
// Old Navigation usage
<nav>
  <button className="nav-item">Tab 1</button>
  <button className="nav-item">Tab 2</button>
</nav>
```

#### New Implementation
```tsx
// New Navigation usage
import Navigation from './components/Navigation';

<Navigation 
  activeTab={activeTab} 
  setActiveTab={setActiveTab} 
/>
```

#### Migration Steps
1. Add proper ARIA roles and attributes
2. Implement keyboard navigation support
3. Add responsive design patterns
4. Ensure proper focus management

### Toast Component Migration

#### Current Implementation
```tsx
// Old Toast usage
<div className="toast-success">
  <span>Success message</span>
  <button>×</button>
</div>
```

#### New Implementation
```tsx
// New Toast usage
import { useToast } from './contexts/ToastContext';

const { addToast } = useToast();
addToast({ message: "Success message", type: "success" });
```

#### Migration Steps
1. Consolidate toast components under unified API
2. Add proper ARIA attributes
3. Implement auto-dismissal with user control
4. Ensure proper positioning

## Backward Compatibility

### Deprecation Strategy
1. Maintain old component APIs with deprecation warnings
2. Provide codemods for automated migration
3. Document breaking changes

### Gradual Migration
1. Allow both old and new components to coexist
2. Provide migration guides for each component
3. Update documentation to reference new components

## Testing During Migration

### Unit Testing
1. Ensure existing tests pass with new components
2. Add tests for new component APIs
3. Add accessibility tests

### Integration Testing
1. Test component composition
2. Test form integration
3. Test state management

### Visual Regression Testing
1. Create new snapshots for updated components
2. Test responsive behavior
3. Test dark mode compatibility

## Performance Considerations

### Bundle Size
1. Monitor component bundle size impact
2. Test tree-shaking effectiveness
3. Optimize dependencies

### Rendering Performance
1. Test component render times
2. Test performance with large datasets
3. Test memoization and optimization

## Common Migration Issues

### CSS Conflicts
1. Resolve conflicts between old and new styling
2. Update global CSS to support new components
3. Remove deprecated CSS classes

### State Management
1. Update state handling in components
2. Ensure proper prop drilling or context usage
3. Handle async state changes

### Event Handling
1. Update event handler signatures
2. Ensure proper event propagation
3. Add new event handlers for enhanced functionality

## Support and Resources

### Documentation
1. [DESIGN_SYSTEM_PLAN.md](./DESIGN_SYSTEM_PLAN.md) - Complete implementation plan
2. [Component Structure Diagram](./component-structure-diagram.md) - Visual component organization
3. [Component Hierarchy Diagram](./component-hierarchy-diagram.md) - Component hierarchy visualization
4. [Integration Strategy Diagram](./integration-strategy-diagram.md) - Migration phases visualization

### Getting Help
1. Review existing component implementations
2. Check TypeScript interfaces for API guidance
3. Refer to component documentation
4. Consult with the design team for UX questions

## Timeline and Rollout

### Phase 1: Foundation Alignment (2 weeks)
- Design token standardization
- Component API refactoring

### Phase 2: Accessibility Improvements (2 weeks)
- Focus management
- Screen reader support

### Phase 3: New Component Implementation (3 weeks)
- Form components
- Feedback components

### Phase 4: Responsive Design (2 weeks)
- Component responsiveness
- Touch-friendly interactions

### Total Estimated Time: 9 weeks

This timeline allows for thorough testing and gradual rollout while maintaining backward compatibility.
