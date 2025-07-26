# NutriCalc Component Library

## Overview

This document provides comprehensive documentation for all components in the NutriCalc design system. Each component is built with TypeScript, follows accessibility best practices, and uses the design system tokens.

## Button Component

### Usage
```tsx
import Button from './components/Button';

// Basic usage
<Button>Click me</Button>

// With variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="danger">Delete</Button>

// With sizes
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>

// With icons
<Button leftIcon={<Icon />}>With Icon</Button>
<Button loading>Loading...</Button>
```

### Props
```tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}
```

### Variants
- **primary**: Main action button (emerald background)
- **secondary**: Secondary action (white background, border)
- **success**: Positive actions (green background)
- **danger**: Destructive actions (red background)
- **warning**: Caution actions (orange background)
- **ghost**: Minimal styling (transparent background)
- **outline**: Outlined button (transparent background, border)

### Accessibility
- Proper focus indicators
- Loading state with disabled interaction
- ARIA attributes for screen readers
- Keyboard navigation support

## Card Component

### Usage
```tsx
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './components/Card';

<Card variant="elevated">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Optional description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### Card Props
```tsx
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined' | 'ghost';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}
```

### Variants
- **default**: Standard card with subtle shadow
- **elevated**: Enhanced shadow for prominence
- **outlined**: Border-only styling
- **ghost**: No background or border

### Sub-components
- **CardHeader**: Top section with background
- **CardTitle**: Main heading (h3)
- **CardDescription**: Subtitle text
- **CardContent**: Main content area
- **CardFooter**: Bottom section with background

## Navigation Component

### Features
- **Responsive Design**: Sidebar on desktop, bottom nav on mobile
- **Keyboard Navigation**: Arrow keys, Home, End support
- **Accessibility**: Proper ARIA roles and labels
- **Modern Styling**: Backdrop blur, smooth transitions

### Usage
```tsx
import Navigation from './components/Navigation';

<Navigation 
  activeTab={activeTab} 
  setActiveTab={setActiveTab} 
/>
```

### Styling
- Desktop: Fixed sidebar with 64 width units
- Mobile: Fixed bottom navigation
- Active states with emerald accent colors
- Smooth hover and focus transitions

## ChatBar Component

### Features
- **AI Integration**: Beautiful AI avatar and responses
- **Loading States**: Animated spinner during processing
- **Suggestions**: Interactive suggestion chips
- **Modern Input**: Rounded input with emerald focus

### Usage
```tsx
import ChatBar from './components/ChatBar';

<ChatBar
  apiKey={!!apiKey}
  onSend={handleSendAI}
  isLoading={aiLoading}
  displayMessage={aiMessage}
  suggestions={chatSuggestions}
/>
```

### Props
```tsx
interface ChatBarProps {
  apiKey: boolean;
  onSend: (message: string) => void;
  isLoading: boolean;
  displayMessage: string;
  suggestions?: string[];
}
```

## Utility Functions

### cn() Function
Combines clsx and tailwind-merge for optimal class handling:

```tsx
import { cn } from '../utils/cn';

// Merge classes with conflict resolution
const className = cn(
  'base-classes',
  condition && 'conditional-classes',
  props.className
);
```

## Best Practices

### Component Development
1. **Use TypeScript**: All components should have proper type definitions
2. **Forward Refs**: Use React.forwardRef for components that need ref access
3. **Accessibility**: Include proper ARIA attributes and keyboard support
4. **Design Tokens**: Use design system tokens instead of arbitrary values
5. **Consistent Naming**: Follow established naming conventions

### Styling Guidelines
1. **Use CVA**: Implement variants with class-variance-authority
2. **Tailwind Classes**: Prefer utility classes over custom CSS
3. **Responsive Design**: Mobile-first approach with responsive utilities
4. **State Management**: Proper hover, focus, and disabled states

### Testing
1. **Unit Tests**: Test component behavior and props
2. **Accessibility**: Test keyboard navigation and screen readers
3. **Visual Regression**: Ensure consistent appearance
4. **Integration**: Test component interactions

## Migration Guide

### From Old Components
1. **Update Imports**: Change to new component paths
2. **Props Changes**: Update prop names and types
3. **Styling**: Remove custom classes, use variants
4. **Testing**: Update tests for new component structure

### Breaking Changes
- Button component now uses CVA variants instead of CSS classes
- Card components are now separate exports
- Navigation uses new responsive structure
- ChatBar has updated prop interface

## Performance Considerations

### Optimization Techniques
1. **React.memo**: Used for expensive components
2. **Lazy Loading**: Components loaded on demand
3. **Bundle Splitting**: Separate chunks for large components
4. **Tree Shaking**: Only import used components

### Bundle Size
- Button: ~2KB gzipped
- Card: ~1.5KB gzipped
- Navigation: ~3KB gzipped
- Total component library: ~15KB gzipped
