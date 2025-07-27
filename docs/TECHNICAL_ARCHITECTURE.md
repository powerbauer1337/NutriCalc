# NutriCalc Technical Architecture and Design System

## 1. System Architecture Overview

### High-Level Architecture
NutriCalc follows a modern frontend architecture pattern with a clear separation of concerns:

```
┌─────────────────────────────────────────────────────────────┐
│                    Presentation Layer                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   React     │  │  Tailwind   │  │  Component Library  │  │
│  │ Components  │  │    CSS      │  │   (Design System)   │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│                    Business Logic Layer                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │  Utilities  │  │   Hooks     │  │   Calculations      │  │
│  │             │  │             │  │                     │  │
│  │ - cn()      │  │ - useApiKey │  │ - Nutrient Calc     │  │
│  │ - Memo      │  │ - useAppSet │  │ - Water Mixing      │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│                     Data Management Layer                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │  Contexts   │  │ LocalStore  │  │   Constants         │  │
│  │             │  │             │  │                     │  │
│  │ - Theme     │  │ - Settings  │  │ - Growth Stages     │  │
│  │ - Toast     │  │ - Recipes   │  │ - Water Types       │  │
│  │ - Water     │  │ - Fertiliz  │  │ - Nutrient Fields   │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│                     External Services Layer                 │
│  ┌─────────────┐  ┌─────────────┐                          │
│  │  Gemini AI  │  │   Browser   │                          │
│  │   API       │  │   APIs      │                          │
│  │             │  │             │                          │
│  │ - Chat      │  │ - Storage   │                          │
│  │ - Analysis  │  │ - Clipboard │                          │
│  └─────────────┘  └─────────────┘                          │
└─────────────────────────────────────────────────────────────┘
```

### Component Hierarchy
```
App
├── ThemeProvider
│   └── ToastProvider
│       └── WaterProvider
│           └── AppLayout
│               ├── Navigation
│               ├── Header
│               │   └── ChatBar
│               └── Main
│                   ├── SetupTab
│                   │   ├── Card (multiple)
│                   │   ├── WaterInput
│                   │   └── FertilizerManager
│                   ├── DetailsTab
│                   ├── AnalysisTab
│                   ├── FertilizerTab
│                   ├── SettingsPage
│                   ├── MixingAssistant
│                   │   └── NutrientBarChart
│                   ├── WateringScheduler
│                   └── ReferencesTab
```

### Data Flow Architecture
1. **User Input**: Components capture user interactions
2. **State Management**: React state/context manages UI state
3. **Business Logic**: Utilities process data and perform calculations
4. **Data Persistence**: LocalStorage stores user preferences and data
5. **External Services**: API calls for AI functionality
6. **UI Update**: Components re-render with updated data

## 2. Design System

### Color Palette Philosophy
NutriCalc's design system is built around a nature-inspired color palette that reflects the plant-focused purpose of the application:

#### Primary Colors (Emerald)
- **Emerald 50**: #ecfdf5 (Very light emerald for backgrounds)
- **Emerald 100**: #d1fae5 (Light emerald for hover states)
- **Emerald 500**: #10b981 (Main brand color for primary actions)
- **Emerald 600**: #059669 (Dark emerald for active states)
- **Emerald 700**: #047857 (Darker emerald for strong emphasis)

#### Secondary Colors (Blue)
- **Blue 50**: #eff6ff (Very light blue for subtle accents)
- **Blue 500**: #3b82f6 (Secondary action color)
- **Blue 600**: #2563eb (Dark blue for active states)

#### Neutral Colors (Stone)
- **Stone 50**: #fafaf9 (Almost white for clean backgrounds)
- **Stone 100**: #f5f5f4 (Very light gray for cards)
- **Stone 200**: #e7e5e4 (Light gray for borders)
- **Stone 600**: #57534e (Medium gray for text)
- **Stone 900**: #1c1917 (Almost black for headings)

#### Semantic Colors
- **Success**: Green variants for positive actions and states
- **Warning**: Orange variants for cautionary information
- **Error**: Red variants for destructive actions and errors
- **Info**: Sky blue variants for informational content

### Typography System
The typography system is designed for optimal readability across all device sizes:

#### Font Scale
- **xs**: 0.75rem (12px) - Captions, fine print
- **sm**: 0.875rem (14px) - Body text, labels
- **base**: 1rem (16px) - Default body text
- **lg**: 1.125rem (18px) - Lead paragraphs
- **xl**: 1.25rem (20px) - Subheadings
- **2xl**: 1.5rem (24px) - Section headings
- **3xl**: 1.875rem (30px) - Page titles
- **4xl**: 2.25rem (36px) - Hero headings

#### Font Weights
- **Normal (400)**: Default body text
- **Medium (500)**: Emphasized text
- **Semibold (600)**: Headings and subheadings
- **Bold (700)**: Strong emphasis and hero text

#### Line Heights
- **Tight (1.25)**: Headings for compact spacing
- **Normal (1.5)**: Body text for optimal readability
- **Relaxed (1.75)**: Long-form content for enhanced legibility

### Spacing System
Based on a 4px grid system for consistent visual rhythm:

- **1**: 0.25rem (4px)
- **2**: 0.5rem (8px)
- **3**: 0.75rem (12px)
- **4**: 1rem (16px)
- **5**: 1.25rem (20px)
- **6**: 1.5rem (24px)
- **8**: 2rem (32px)
- **10**: 2.5rem (40px)
- **12**: 3rem (48px)
- **16**: 4rem (64px)
- **20**: 5rem (80px)
- **24**: 6rem (96px)
- **32**: 8rem (128px)
- **40**: 10rem (160px)
- **48**: 12rem (192px)
- **56**: 14rem (224px)
- **64**: 16rem (256px)

### Border Radius Scale
- **sm**: 0.375rem (6px) - Small elements like buttons
- **md**: 0.5rem (8px) - Cards and containers
- **lg**: 0.75rem (12px) - Larger components
- **xl**: 1rem (16px) - Prominent sections
- **2xl**: 1.5rem (24px) - Hero sections
- **full**: 9999px - Circular elements

### Shadow System
- **sm**: 0 1px 3px 0 rgba(0, 0, 0, 0.1) - Subtle depth
- **md**: 0 4px 6px -1px rgba(0, 0, 0, 0.1) - Cards and panels
- **lg**: 0 10px 15px -3px rgba(0, 0, 0, 0.1) - Elevated elements
- **xl**: 0 20px 25px -5px rgba(0, 0, 0, 0.1) - Prominent components
- **2xl**: 0 25px 50px -12px rgba(0, 0, 0, 0.25) - Modal dialogs

### Transition System
- **fast**: 150ms ease-in-out - Immediate feedback
- **normal**: 200ms ease-in-out - Standard interactions
- **slow**: 300ms ease-in-out - Major transitions

## 3. Component Architecture

### Component Design Principles
1. **Single Responsibility**: Each component has one clear purpose
2. **Composition Over Inheritance**: Components are composed rather than extended
3. **Props Interface**: Explicit, typed interfaces for all component props
4. **Controlled Components**: State managed externally where appropriate
5. **Accessibility First**: Built-in accessibility features and ARIA attributes

### Component Variants with CVA
The component library uses Class Variance Authority (CVA) for managing component variants:

```typescript
const buttonVariants = cva(
  'base-classes',
  {
    variants: {
      variant: {
        primary: 'primary-classes',
        secondary: 'secondary-classes',
        // ...
      },
      size: {
        sm: 'small-classes',
        md: 'medium-classes',
        // ...
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);
```

### Component Composition Patterns
1. **Compound Components**: Related components that work together (Card, CardHeader, CardContent)
2. **Render Props**: Components that accept functions to customize rendering
3. **Higher-Order Components**: Functions that enhance component functionality
4. **Context Providers**: Components that provide data to child components

### State Management Patterns
1. **Local State**: useState for component-scoped data
2. **Context State**: useContext for shared application state
3. **Derived State**: useMemo for computed values
4. **Async State**: useEffect for side effects and data fetching

## 4. Data Management Architecture

### LocalStorage Strategy
NutriCalc uses a structured approach to LocalStorage management:

#### Storage Keys
- `nutricalc_gemini_api_key`: Encrypted API key storage
- `nutricalc_custom_fertilizers`: User-defined fertilizer database
- `nutricalc_custom_water`: Custom water profile settings
- `appSettings`: User preferences and default values
- `nutricalc_watering_events`: Scheduled watering events

#### Data Serialization
- **JSON Format**: All complex data structures serialized as JSON
- **Validation**: Parsing with try/catch to handle corruption
- **Defaults**: Fallback to default values on parsing errors
- **Versioning**: Schema version tracking for migrations

### Context-Based State Management
The application uses React Context for global state management:

#### ThemeContext
- Manages light/dark mode preferences
- Persists user choice in LocalStorage
- Respects system preference when no user choice exists

#### ToastContext
- Centralized notification system
- Multiple notification types (success, error, warning, info)
- Auto-dismissal with configurable durations
- Manual removal capability

#### WaterContext
- Shared water mixing calculations
- Cross-component data availability
- Real-time updates and synchronization

### Data Flow Patterns
1. **Unidirectional Data Flow**: Data flows from parent to child components
2. **Lifting State Up**: Shared state moved to common ancestor components
3. **Controlled Components**: Form elements controlled by React state
4. **State Colocation**: State kept as close to where it's used as possible

## 5. Performance Optimization Strategies

### Rendering Optimizations
1. **React.memo**: Prevent unnecessary re-renders for pure components
2. **useMemo**: Cache expensive calculations
3. **useCallback**: Memoize callback functions to prevent re-creation
4. **Virtual Scrolling**: Efficient rendering of large lists
5. **Code Splitting**: Dynamic imports for lazy loading components

### Bundle Optimization
1. **Tree Shaking**: Eliminate unused code from final bundle
2. **Minification**: Compress JavaScript and CSS assets
3. **Image Optimization**: Compressed and appropriately sized images
4. **Asset Preloading**: Critical resources preloaded for faster initial render

### Caching Strategies
1. **Browser Caching**: HTTP cache headers for static assets
2. **Service Worker**: Offline functionality and caching strategies
3. **Memoization**: In-memory caching of expensive function results
4. **LocalStorage**: Client-side persistence of user data

## 6. Accessibility Architecture

### WCAG 2.1 AA Compliance
NutriCalc is designed to meet WCAG 2.1 AA standards:

#### Perceivable
- **Text Alternatives**: All non-text content has descriptive alternatives
- **Adaptable**: Content can be presented in different ways
- **Distinguishable**: Content is easy to see and hear

#### Operable
- **Keyboard Accessible**: All functionality available via keyboard
- **Enough Time**: Users have enough time to read and use content
- **Seizures and Physical Reactions**: No content that causes seizures
- **Navigable**: Provide ways to help users navigate and find content
- **Input Modalities**: Make it easier for users to operate functionality through various inputs

#### Understandable
- **Readable**: Make text content readable and understandable
- **Predictable**: Make web pages appear and operate in predictable ways
- **Input Assistance**: Help users avoid and correct mistakes

#### Robust
- **Compatible**: Maximize compatibility with current and future user tools

### ARIA Implementation
- **Roles**: Proper semantic roles for all interactive elements
- **Properties**: ARIA properties for enhanced screen reader support
- **States**: Dynamic ARIA states for real-time updates
- **Labels**: Descriptive labels for all form controls and interactive elements

### Keyboard Navigation
- **Focus Management**: Logical tab order and focus trapping
- **Shortcut Keys**: Application-specific keyboard shortcuts
- **Skip Links**: Direct navigation to main content
- **Focus Indicators**: Visible focus states for all interactive elements

## 7. Responsive Design Architecture

### Mobile-First Approach
The design system follows a mobile-first philosophy:

#### Breakpoints
- **sm**: 640px - Small devices (landscape phones)
- **md**: 768px - Medium devices (tablets)
- **lg**: 1024px - Large devices (desktops)
- **xl**: 1280px - Extra large devices (wide screens)
- **2xl**: 1536px - Double extra large devices (ultra-wide screens)

#### Adaptive Patterns
1. **Navigation**: Sidebar on desktop, bottom nav on mobile
2. **Layout**: Grid-based responsive layouts
3. **Typography**: Fluid scaling for optimal readability
4. **Touch Targets**: Adequate sizing for touch interactions

### Progressive Enhancement
- **Core Functionality**: Works on all modern browsers
- **Enhanced Features**: Additional functionality for newer browsers
- **Graceful Degradation**: Fallbacks for older browser versions
- **Feature Detection**: JavaScript-based feature detection rather than browser sniffing

## 8. Security Architecture

### Client-Side Security
Since NutriCalc is a client-side application, security focuses on:

#### Data Protection
- **No Server Communication**: All data remains on the client
- **Encrypted Storage**: API keys encrypted before LocalStorage storage
- **Input Sanitization**: Validation and sanitization of all user inputs
- **Secure Defaults**: Safe default values and behaviors

#### API Security
- **HTTPS Only**: All external API calls use HTTPS
- **Key Management**: User-controlled API key storage
- **Rate Limiting**: Respect for API provider rate limits
- **Error Handling**: Secure error handling without exposing sensitive information

### Privacy Considerations
- **No Analytics**: No user tracking or analytics collection
- **No Third-Party Scripts**: Minimal external dependencies
- **Local Processing**: All calculations performed client-side
- **Data Ownership**: Users retain full ownership of their data

## 9. Testing Architecture

### Test Pyramid Implementation
NutriCalc follows a comprehensive testing strategy:

#### Unit Tests
- **Component Testing**: Individual component behavior verification
- **Utility Testing**: Function and helper validation
- **Hook Testing**: Custom hook functionality verification
- **Mocking**: Isolated testing with mocked dependencies

#### Integration Tests
- **Component Integration**: Testing component interactions
- **Context Testing**: Provider and consumer behavior
- **State Management**: Complex state flow validation
- **Data Flow**: End-to-end data processing verification

#### End-to-End Tests
- **User Flows**: Critical user journey validation
- **Cross-Browser Testing**: Consistency across browsers
- **Accessibility Testing**: Automated accessibility verification
- **Performance Testing**: Load time and runtime performance

### Testing Tools
- **Vitest**: Fast unit testing framework
- **React Testing Library**: Component testing utilities
- **Playwright**: End-to-end browser testing
- **axe-core**: Accessibility testing integration

## 10. Deployment Architecture

### Build Process
The application uses Vite for optimized builds:

#### Development Build
- **Hot Module Replacement**: Instant feedback during development
- **Fast Refresh**: Component-level updates without full page reload
- **Source Maps**: Debugging support with source maps
- **Development Server**: Local development server with proxy support

#### Production Build
- **Code Splitting**: Bundle splitting for optimal loading
- **Asset Minification**: Compression of JavaScript, CSS, and images
- **Tree Shaking**: Elimination of unused code
- **Environment Variables**: Production-specific configuration

### Hosting Strategy
- **Static Hosting**: Optimized for CDN delivery
- **Client-Side Routing**: SPA routing with history API
- **Fallback Handling**: Proper 404 handling for client-side routes
- **Compression**: Gzip/Brotli compression for faster delivery

### Performance Monitoring
- **Web Vitals**: Core Web Vitals tracking
- **Bundle Analysis**: Bundle size monitoring
- **Load Performance**: Page load time measurement
- **User Experience**: Real-user monitoring (where applicable)