# Migration Guide: NutriCalc UI Redesign

## Overview

This guide helps developers migrate from the old NutriCalc UI to the new modern design system. It covers breaking changes, new patterns, and step-by-step migration instructions.

## Breaking Changes

### Button Component

#### Before (Old)
```tsx
// Old button usage
<button className="btn-primary">Click me</button>
<button className="btn-secondary btn-sm">Small button</button>
```

#### After (New)
```tsx
// New button usage
<Button variant="primary">Click me</Button>
<Button variant="secondary" size="sm">Small button</Button>
```

#### Migration Steps
1. Replace `<button>` elements with `<Button>` component
2. Convert CSS classes to props:
   - `btn-primary` → `variant="primary"`
   - `btn-secondary` → `variant="secondary"`
   - `btn-danger` → `variant="danger"`
   - `btn-sm` → `size="sm"`
   - `btn-lg` → `size="lg"`

### Card Components

#### Before (Old)
```tsx
// Old card structure
<div className="card">
  <div className="card-header">
    <h3>Title</h3>
  </div>
  <div className="card-body">
    Content
  </div>
</div>
```

#### After (New)
```tsx
// New card structure
<Card variant="elevated">
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content
  </CardContent>
</Card>
```

#### Migration Steps
1. Import card components: `import { Card, CardHeader, CardTitle, CardContent } from './components/Card'`
2. Replace div elements with semantic card components
3. Use `CardTitle` for headings instead of raw `<h3>` elements

### Navigation Component

#### Before (Old)
```tsx
// Old navigation
<nav className="bg-white border-b">
  <button className={activeTab === 'setup' ? 'active' : ''}>
    Setup
  </button>
</nav>
```

#### After (New)
```tsx
// New navigation (handled internally)
<Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
```

#### Migration Steps
1. Remove custom navigation markup
2. Use the new `Navigation` component
3. Navigation automatically handles responsive behavior

### Color System

#### Before (Old)
```css
/* Old colors */
.text-blue-600 { color: #2563eb; }
.bg-gray-100 { background: #f3f4f6; }
```

#### After (New)
```css
/* New colors */
.text-emerald-600 { color: rgb(5 150 105); }
.bg-stone-100 { background: rgb(245 245 244); }
```

#### Migration Steps
1. Replace blue primary colors with emerald
2. Replace gray neutrals with stone
3. Use design system color tokens

## New Patterns

### Component Variants

#### Using Class Variance Authority
```tsx
// Define component variants
const buttonVariants = cva(
  'base-classes',
  {
    variants: {
      variant: {
        primary: 'primary-classes',
        secondary: 'secondary-classes',
      },
      size: {
        sm: 'small-classes',
        lg: 'large-classes',
      },
    },
  }
);

// Use in component
<button className={cn(buttonVariants({ variant, size }))}>
  Button
</button>
```

### Class Name Utility

#### Using cn() Function
```tsx
import { cn } from '../utils/cn';

// Merge classes with conflict resolution
const className = cn(
  'base-classes',
  condition && 'conditional-classes',
  props.className
);
```

### TypeScript Integration

#### Proper Component Types
```tsx
// Component with proper TypeScript
interface ComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated';
  children: React.ReactNode;
}

const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ variant = 'default', children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(componentVariants({ variant }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
```

## Step-by-Step Migration

### 1. Install Dependencies
```bash
npm install clsx tailwind-merge class-variance-authority
```

### 2. Update Imports
```tsx
// Old imports
import './old-styles.css';

// New imports
import { Button } from './components/Button';
import { Card, CardHeader, CardTitle, CardContent } from './components/Card';
import { cn } from './utils/cn';
```

### 3. Update Component Usage

#### Buttons
```tsx
// Before
<button className="btn btn-primary">Save</button>
<button className="btn btn-secondary btn-sm">Cancel</button>

// After
<Button variant="primary">Save</Button>
<Button variant="secondary" size="sm">Cancel</Button>
```

#### Forms
```tsx
// Before
<input className="input" />
<select className="select" />

// After
<input className="w-full px-4 py-2.5 bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500" />
<select className="w-full px-4 py-2.5 bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500" />
```

#### Layout
```tsx
// Before
<div className="container">
  <div className="card">
    Content
  </div>
</div>

// After
<div className="max-w-6xl mx-auto px-6">
  <Card variant="elevated">
    <CardContent>
      Content
    </CardContent>
  </Card>
</div>
```

### 4. Update Styling

#### Replace Old Classes
```tsx
// Before
className="bg-blue-600 text-white hover:bg-blue-700"

// After
className="bg-emerald-600 text-white hover:bg-emerald-700"
```

#### Use Design Tokens
```tsx
// Before
className="p-4 rounded-md shadow-md"

// After
className="p-6 rounded-lg shadow-sm"
```

### 5. Update Tests

#### Button Tests
```tsx
// Before
expect(button).toHaveClass('btn-primary');

// After
expect(button).toHaveClass('bg-emerald-600', 'text-white');
```

#### Component Tests
```tsx
// Before
render(<Button className="custom-class">Test</Button>);

// After
render(<Button variant="primary" className="custom-class">Test</Button>);
```

## Common Issues & Solutions

### Issue: Missing Styles
**Problem**: Components don't have expected styling
**Solution**: Ensure design-system.css is imported in your main CSS file

### Issue: TypeScript Errors
**Problem**: Type errors with new component props
**Solution**: Update component prop types and imports

### Issue: Class Conflicts
**Problem**: Tailwind classes not applying correctly
**Solution**: Use `cn()` utility for proper class merging

### Issue: Responsive Behavior
**Problem**: Components don't respond correctly on mobile
**Solution**: Use new responsive navigation and layout patterns

## Testing Migration

### 1. Visual Testing
- Compare before/after screenshots
- Test all component variants
- Verify responsive behavior

### 2. Functional Testing
- Ensure all interactions work
- Test keyboard navigation
- Verify accessibility features

### 3. Performance Testing
- Check bundle size impact
- Measure loading performance
- Test on various devices

## Rollback Plan

### If Issues Arise
1. **Partial Rollback**: Revert specific components
2. **Full Rollback**: Use git to revert to previous version
3. **Gradual Migration**: Migrate components one at a time

### Backup Strategy
```bash
# Create backup branch before migration
git checkout -b backup-before-ui-redesign
git push origin backup-before-ui-redesign

# Continue with migration on main branch
git checkout main
```

## Support & Resources

### Documentation
- [Design System](./DESIGN_SYSTEM.md)
- [Component Library](./COMPONENTS.md)
- [UI Redesign Overview](./UI_REDESIGN.md)

### Code Examples
- Check `src/components/` for implementation examples
- Review test files for usage patterns
- See `src/styles/design-system.css` for available tokens

### Getting Help
1. Check existing documentation
2. Review component source code
3. Look at test files for examples
4. Create GitHub issue for specific problems

## Conclusion

The migration to the new UI system provides significant benefits in terms of maintainability, consistency, and user experience. While there are breaking changes, the migration process is straightforward and well-documented.

Take time to understand the new patterns and gradually migrate components to ensure a smooth transition.
