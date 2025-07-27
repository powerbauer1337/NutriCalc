# NutriCalc Project Overview

## Introduction

NutriCalc is an advanced nutrient calculator for plants, especially designed for cannabis cultivation. It is built as a modern single-page application (SPA) using React and TypeScript with a Tailwind CSS-based design system. The application enables precise calculation of nutrient solutions, management of custom fertilizers, and features an AI-powered assistant for user support.

## Key Features

### Core Functionality
- **Precise Nutrient Calculation**: Calculate accurate nutrient concentrations for hydroponic solutions based on water volume, growth phase, and water type
- **Fertilizer Management**: Add, edit, delete custom fertilizers (liquid/powder) with detailed composition data
- **Growth Stage Optimization**: Tailored nutrient profiles for different plant growth phases with target NPK/EC values
- **Water Mixing**: Mix different water sources with automatic calculations for pH, EC, and mineral content
- **Visual Analysis**: Modern charts and visual feedback for nutrient concentrations and optimization recommendations
- **Recipe Export/Import**: Save and share nutrient recipes as JSON files
- **Watering Scheduler**: Plan and manage watering schedules for plants

### User Interface & Experience
- **Modern UI Redesign**: Completely redesigned interface with a nature-inspired emerald color scheme
- **Responsive Design**: Beautiful interface that works seamlessly on all devices (desktop, tablet, mobile)
- **Dark Mode**: Toggle between light and dark themes based on user preference
- **Accessibility**: WCAG 2.1 AA compliant with full keyboard navigation and screen reader support
- **Component System**: Consistent, reusable UI components built with TypeScript and Tailwind CSS

For detailed information about the component system, see [DESIGN_SYSTEM_SUMMARY.md](./DESIGN_SYSTEM_SUMMARY.md).

### AI Integration
- **Gemini AI Assistant**: Intelligent recommendations and contextual help using Google's Gemini AI
- **Smart Suggestions**: Interactive suggestion chips for common questions
- **Contextual Responses**: AI receives current calculator data for relevant answers

## Technology Stack

### Frontend
- **React 18**: Modern UI library with hooks and functional components
- **TypeScript**: Full type safety for improved code quality and developer experience
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Class Variance Authority**: Type-safe component variants for consistent styling
- **Clsx + Tailwind Merge**: Optimal class name handling and conflict resolution

### Build & Development
- **Vite**: Fast development server and build tool
- **Vitest**: Unit testing framework with comprehensive test coverage
- **ESLint & Prettier**: Code quality and formatting tools
- **Playwright**: End-to-end testing framework

### External Services
- **Google Gemini API**: AI-powered chat assistant for contextual help
- **LocalStorage**: Client-side data persistence for user preferences and custom fertilizers

## Architecture Overview

### Component Architecture
The application follows a modular component-based architecture with:
- **Reusable UI Components**: Button, Card, Navigation, ChatBar, and others
- **Feature Components**: SetupTab, AnalysisTab, FertilizerTab, MixingAssistant, WateringScheduler
- **Context Providers**: Theme, Toast, Water, and Data Persistence contexts
- **Custom Hooks**: useApiKey, useAppSettings, useLocalStorage, useDebounce

For detailed information about the component architecture, see [COMPONENTS.md](./COMPONENTS.md).

### State Management
- **React Context API**: For global state management (theme, toast messages, water data)
- **LocalStorage**: For persistent user data (custom fertilizers, settings, watering events)
- **Component State**: For local UI state management

### Data Flow
1. User inputs data through forms and controls
2. Data is processed through calculation utilities
3. Results are displayed through visualization components
4. User data is persisted in LocalStorage
5. AI interactions are handled through the Gemini API

## Design System

### Color Palette
- **Primary**: Nature-inspired emerald green (#10b981)
- **Secondary**: Stone grays for neutral backgrounds and text
- **Semantic Colors**: Success (green), Warning (orange), Danger (red), Info (blue)

### Typography
- **Font Scale**: xs to 4xl with proper hierarchy
- **Font Weights**: 400 (normal) to 700 (bold)
- **Line Heights**: Tight to relaxed for optimal readability

### Spacing System
- **Grid-based**: 4px base unit for consistent spacing
- **Scale**: 1 (4px) to 16 (64px) with intermediate values

### Component Variants
- **Buttons**: 7 variants (primary, secondary, success, danger, warning, ghost, outline)
- **Cards**: 4 variants (default, elevated, outlined, ghost)
- **Navigation**: Responsive sidebar (desktop) and bottom navigation (mobile)

For detailed information about the design system, see [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md).

## Quality Assurance

### Code Quality
- **100% TypeScript**: Full type safety throughout the codebase
- **Zero Lint Errors**: Clean, maintainable code with ESLint
- **Formatted Code**: Consistent styling with Prettier

### Testing
- **Unit Tests**: Comprehensive test coverage with Vitest
- **Component Tests**: Testing component behavior and props
- **Integration Tests**: Testing component interactions
- **End-to-End Tests**: Playwright tests for critical user flows

For detailed information about testing strategies, see [DESIGN_SYSTEM_PLAN.md](./DESIGN_SYSTEM_PLAN.md).

### Accessibility
- **WCAG 2.1 AA Compliance**: Proper color contrast and semantic HTML
- **Keyboard Navigation**: Full keyboard accessibility for all controls
- **Screen Reader Support**: Proper ARIA attributes and labels
- **Focus Management**: Visible focus indicators for interactive elements

For detailed accessibility considerations, see [DESIGN_SYSTEM_PLAN.md](./DESIGN_SYSTEM_PLAN.md).

## Performance Considerations

### Bundle Optimization
- **Tree Shaking**: Only import used components and functions
- **Code Splitting**: Separate chunks for large components
- **Minification**: Production-ready optimized bundles

### Runtime Performance
- **Memoization**: React.memo for expensive components
- **Efficient Rendering**: Virtualized lists and optimized updates
- **Lazy Loading**: Components loaded on demand

## Security

### Data Protection
- **Client-Side Only**: All data stored locally in user's browser
- **No Server Communication**: Except for AI API calls
- **Secure API Keys**: User-managed API keys stored in LocalStorage

### API Security
- **HTTPS Only**: All API communications encrypted
- **Rate Limiting**: Respects API provider rate limits
- **Error Handling**: Proper error handling for API failures

## Browser Support

### Supported Browsers
- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

### Progressive Enhancement
- Core functionality works in all modern browsers
- Enhanced features for newer browsers
- Graceful degradation for older browsers

## Future Enhancements

### Planned Features
1. User accounts for cloud-based recipe storage
2. Enhanced data visualization with advanced charts
3. Community database for fertilizers and recipes
4. Multi-language support (internationalization)
5. Progressive Web App (PWA) features for offline usage

### Technical Improvements
1. Advanced animation and micro-interaction enhancements
2. Further bundle size optimizations
3. Performance monitoring and analytics
4. Additional accessibility improvements

For detailed information about the implementation plan for future enhancements, see [DESIGN_SYSTEM_PLAN.md](./DESIGN_SYSTEM_PLAN.md).