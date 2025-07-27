# NutriCalc Development Guidelines and Best Practices

## Table of Contents
1. [Code Structure and Organization](#code-structure-and-organization)
2. [Component Development](#component-development)
3. [State Management](#state-management)
4. [Styling and Design System](#styling-and-design-system)
5. [Performance Optimization](#performance-optimization)
6. [Testing Guidelines](#testing-guidelines)
7. [Accessibility Standards](#accessibility-standards)
8. [Security Practices](#security-practices)
9. [Documentation Standards](#documentation-standards)
10. [Deployment and Release Process](#deployment-and-release-process)

## Code Structure and Organization

### Project Structure
```
nutricalc/
├── src/
│   ├── components/          # Reusable UI components
│   ├── contexts/            # React context providers
│   ├── hooks/               # Custom React hooks
│   ├── utils/               # Utility functions
│   ├── constants/           # Application constants
│   ├── types/               # TypeScript type definitions
│   ├── styles/              # Global styles and design system
│   └── test/                # Test utilities and setup
├── docs/                    # Documentation files
├── tests/                   # End-to-end tests
├── public/                  # Static assets
└── build/                   # Production build output
```

### File Naming Conventions
- **Components**: PascalCase (e.g., `Button.tsx`, `NutrientBarChart.tsx`)
- **Utilities**: camelCase (e.g., `calculateNutrients.ts`, `nutrientUtils.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `WATER_TYPES.ts`, `GROWTH_STAGES.ts`)
- **Hooks**: useCamelCase (e.g., `useAppSettings.ts`, `useLocalStorage.ts`)
- **Styles**: kebab-case (e.g., `design-system.css`, `index.css`)

### Module Organization
- **Single Responsibility**: Each file should have one clear purpose
- **Logical Grouping**: Related functionality grouped in directories
- **Index Files**: Use index.ts files for easy imports from directories
- **Barrel Exports**: Export related modules through index files

### Import/Export Patterns
```typescript
// Named exports for multiple items
export interface NutrientData { /* ... */ }
export const calculateEC = () => { /* ... */ }

// Default export for main component/function
const Button: React.FC<ButtonProps> = () => { /* ... */ }
export default Button

// Import patterns
import Button from './components/Button'
import { calculateEC, NutrientData } from './utils/nutrientUtils'
```

## Component Development

### Component Design Principles
1. **Single Responsibility**: Each component should have one clear purpose
2. **Reusability**: Design components to be flexible and configurable
3. **Composition**: Favor composition over inheritance
4. **Controlled vs Uncontrolled**: Use controlled components when state needs to be managed externally
5. **Accessibility**: Build accessibility in from the start

### TypeScript Interfaces
All components must have properly defined TypeScript interfaces:

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({ 
  className, 
  variant, 
  size, 
  loading, 
  leftIcon, 
  rightIcon, 
  children, 
  disabled, 
  ...props 
}) => {
  // Implementation
}
```

### Component Structure
```typescript
// 1. Imports
import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

// 2. Component variants (if using CVA)
const componentVariants = cva('base-classes', {
  variants: { /* ... */ },
  defaultVariants: { /* ... */ }
})

// 3. TypeScript interfaces
interface ComponentProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof componentVariants> {
  // Additional props
}

// 4. Component implementation
const Component: React.FC<ComponentProps> = ({ className, variant, ...props }) => {
  return (
    <div className={cn(componentVariants({ variant }), className)} {...props}>
      {/* Content */}
    </div>
  )
}

// 5. Display name for debugging
Component.displayName = 'Component'

// 6. Export
export default Component
```

### Component Best Practices
- **React.memo**: Use for performance optimization of expensive components
- **Forward Refs**: Implement when components need to expose DOM refs
- **Default Props**: Use defaultVariants with CVA instead of defaultProps
- **Prop Validation**: Comprehensive TypeScript interfaces instead of PropTypes
- **Error Boundaries**: Wrap components that might fail in ErrorBoundary

## State Management

### React Hooks Usage
1. **useState**: For local component state
2. **useEffect**: For side effects and lifecycle management
3. **useContext**: For accessing context values
4. **useReducer**: For complex state logic
5. **Custom Hooks**: Extract reusable state logic

### Context Pattern
```typescript
// Create context
interface ThemeContextType {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// Provider component
export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // Initialization logic
  })

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// Consumer hook
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
```

### State Management Best Practices
- **Lift State Up**: Share state by moving it to the closest common ancestor
- **Colocate State**: Keep state as close to where it's used as possible
- **Derived State**: Use useMemo for expensive calculations
- **Async State**: Use useEffect for data fetching and subscriptions
- **State Normalization**: Normalize complex state structures when needed

## Styling and Design System

### Tailwind CSS Usage
- **Utility-First**: Use Tailwind utility classes instead of custom CSS
- **Consistent Spacing**: Use design system spacing scale (rem-based)
- **Color Palette**: Stick to defined color system
- **Responsive Design**: Use responsive prefixes appropriately
- **Dark Mode**: Implement dark mode variants with dark: prefix

### Class Variance Authority (CVA)
```typescript
const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'underline-offset-4 hover:underline text-primary',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3 rounded-md',
        lg: 'h-11 px-8 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)
```

### Design System Implementation
- **Tokens**: Use CSS custom properties for design tokens
- **Consistency**: Maintain consistent styling across components
- **Accessibility**: Ensure proper color contrast ratios
- **Responsive**: Implement mobile-first responsive design
- **Theming**: Support light and dark themes

## Performance Optimization

### React Performance
- **React.memo**: Prevent unnecessary re-renders
- **useMemo**: Cache expensive calculations
- **useCallback**: Memoize callback functions
- **Code Splitting**: Lazy load components with React.lazy
- **Bundle Optimization**: Tree-shake unused code

### Rendering Optimization
```typescript
// Memoize expensive components
const ExpensiveComponent = React.memo(({ data }) => {
  // Expensive rendering logic
  return <div>{/* ... */}</div>
})

// Memoize calculations
const calculatedValue = useMemo(() => {
  return expensiveCalculation(data)
}, [data])

// Memoize callbacks
const handleClick = useCallback(() => {
  doSomething(expensiveValue)
}, [expensiveValue])
```

### Bundle Size Management
- **Tree Shaking**: Import only what you need
- **Code Splitting**: Split bundles by route or feature
- **Dynamic Imports**: Load modules on demand
- **Image Optimization**: Compress and appropriately size images
- **Dependency Audit**: Regularly review and update dependencies

## Testing Guidelines

### Test Structure
```
src/
├── __tests__/              # Unit tests colocated with components
├── test/                   # Test utilities and setup
└── components/
    └── Button/
        ├── Button.tsx
        └── Button.test.tsx
```

### Unit Testing with Vitest
```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import Button from './Button'

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Hello World</Button>)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    fireEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>)
    expect(screen.getByText('Disabled Button')).toBeDisabled()
  })
})
```

### Testing Best Practices
- **Test Behavior, Not Implementation**: Focus on what the component does
- **Arrange-Act-Assert**: Clear test structure
- **Edge Cases**: Test boundary conditions and error states
- **Accessibility**: Include accessibility tests
- **Snapshot Testing**: Use sparingly for UI structure verification

### End-to-End Testing with Playwright
```typescript
import { test, expect } from '@playwright/test'

test('should calculate nutrients correctly', async ({ page }) => {
  await page.goto('/')
  
  // Arrange
  await page.fill('[data-testid="water-volume"]', '10')
  await page.selectOption('[data-testid="growth-stage"]', 'early_veg')
  
  // Act
  await page.click('[data-testid="calculate-button"]')
  
  // Assert
  await expect(page.locator('[data-testid="nitrogen-result"]')).toContainText('150')
})
```

## Accessibility Standards

### WCAG 2.1 AA Compliance
- **Perceivable**: Text alternatives, adaptable content, distinguishable elements
- **Operable**: Keyboard accessible, enough time, navigable, input modalities
- **Understandable**: Readable, predictable, input assistance
- **Robust**: Compatible with current and future user tools

### ARIA Implementation
```tsx
// Proper labeling
<label htmlFor="water-volume">Wassermenge (L)</label>
<input id="water-volume" type="number" />

// ARIA roles and properties
<div role="tablist" aria-orientation="vertical">
  <button role="tab" aria-selected={isActive} aria-controls="panel-id">
    Tab Label
  </button>
</div>

// Live regions for dynamic content
<div aria-live="polite" aria-atomic="true">
  {statusMessage}
</div>
```

### Keyboard Navigation
- **Focus Management**: Logical tab order
- **Skip Links**: Direct navigation to main content
- **Focus Indicators**: Visible focus states
- **Keyboard Shortcuts**: Application-specific shortcuts
- **Trap Focus**: Contain focus within modals/dialogs

## Security Practices

### Client-Side Security
- **Input Validation**: Sanitize and validate all user inputs
- **XSS Prevention**: Escape output and use React's built-in escaping
- **No eval()**: Avoid dangerous JavaScript functions
- **Secure Storage**: Encrypt sensitive data in LocalStorage
- **CSP Headers**: Implement Content Security Policy

### API Security
```typescript
// Secure API key handling
const handleSendAI = async (userMessage: string) => {
  // Validate input
  if (!userMessage.trim()) return
  
  // Use AbortController for timeouts
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 30000)
  
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey // Only sent to Google
      },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: userMessage }] }]
      }),
      signal: controller.signal
    })
    
    // Handle response securely
    // ...
  } catch (error) {
    // Handle errors without exposing sensitive information
  } finally {
    clearTimeout(timeoutId)
  }
}
```

### Data Protection
- **Zero Server Storage**: No user data stored on external servers
- **Encryption**: Encrypt sensitive data before storage
- **Minimal Data**: Transmit only necessary information
- **User Control**: Users manage their own API keys
- **Privacy by Design**: Privacy considerations in every feature

## Documentation Standards

### Code Documentation
- **JSDoc/TSdoc**: Document complex functions and components
- **Inline Comments**: Explain non-obvious implementation details
- **README Updates**: Keep documentation synchronized with code changes
- **Type Definitions**: Comprehensive TypeScript interfaces
- **Example Usage**: Include usage examples in documentation

### Component Documentation
```typescript
/**
 * Button - A versatile button component with multiple variants and sizes.
 * 
 * @param {ButtonProps} props - The properties for the Button component
 * @param {string} [props.variant='primary'] - The button variant (primary|secondary|danger)
 * @param {string} [props.size='md'] - The button size (sm|md|lg)
 * @param {boolean} [props.loading=false] - Show loading spinner
 * @param {ReactNode} [props.leftIcon] - Icon to display on the left
 * @param {ReactNode} [props.rightIcon] - Icon to display on the right
 * 
 * @example
 * // Primary button
 * <Button variant="primary">Click me</Button>
 * 
 * @example
 * // Loading state
 * <Button loading>Loading...</Button>
 */
const Button: React.FC<ButtonProps> = ({ /* ... */ }) => {
  // Implementation
}
```

### Documentation Structure
1. **Overview**: Brief description of the component/module
2. **Props/API**: Detailed parameter documentation
3. **Examples**: Practical usage examples
4. **Best Practices**: Recommended usage patterns
5. **Accessibility**: Accessibility considerations
6. **Related Components**: Links to related functionality

## Deployment and Release Process

### Version Management
- **Semantic Versioning**: Follow MAJOR.MINOR.PATCH format
- **CHANGELOG.md**: Document all changes for each release
- **Release Tags**: Git tags for each version
- **Backward Compatibility**: Maintain compatibility within MINOR versions
- **Deprecation Warnings**: Warn before removing features

### Build Process
```bash
# Development build
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

### Quality Assurance
1. **Code Review**: All changes reviewed by team members
2. **Automated Testing**: Run full test suite before deployment
3. **Linting**: Ensure code meets style guidelines
4. **Type Checking**: Verify TypeScript compilation
5. **Bundle Analysis**: Check bundle size impact

### Release Checklist
- [ ] All tests passing
- [ ] Code reviewed and approved
- [ ] Documentation updated
- [ ] CHANGELOG.md updated
- [ ] Version bumped in package.json
- [ ] Git tag created
- [ ] Build verified
- [ ] Release notes prepared
- [ ] Announcement prepared

### Continuous Integration
- **Automated Testing**: Run tests on every commit
- **Code Quality**: Linting and type checking in CI pipeline
- **Security Scanning**: Dependency vulnerability scanning
- **Deployment**: Automated deployment to staging/production
- **Monitoring**: Post-deployment health checks

These development guidelines ensure consistent, maintainable, and high-quality code that aligns with modern React best practices while maintaining the specific requirements and standards of the NutriCalc project.