

# NutriCalc Technical Architecture

## System Overview

NutriCalc is built as a modern single-page application (SPA) using React 18, designed for precision nutrient management in cannabis cultivation. The architecture follows a modular, component-based approach with clear separation of concerns.

## Architecture Layers

### 1. Presentation Layer
- **React Components**: Modular, reusable UI components
- **Tailwind CSS**: Utility-first styling framework
- **Responsive Design**: Mobile-first approach with breakpoints

### 2. State Management Layer
- **React Context**: Global state management without Redux
- **Local Storage**: Persistent client-side storage
- **Component State**: Local state for UI interactions

### 3. Business Logic Layer
- **Calculation Engine**: Pure functions for nutrient calculations
- **Data Validation**: Input sanitization and validation
- **Fertilizer Logic**: Concentration and contribution calculations

### 4. Data Access Layer
- **Browser APIs**: localStorage, sessionStorage
- **External APIs**: Google Gemini AI
- **Static Data**: Fertilizer database, growth stages

## Component Hierarchy

```
App
├── ThemeProvider
├── ToastProvider
├── WaterProvider
└── AppLayout
    ├── Header
    │   └── DarkModeToggle
    ├── Navigation
    ├── ChatBar
    └── Main Content (Dynamic)
        ├── SetupTab
        │   ├── WaterInput
        │   ├── FertilizerSelector
        │   └── ResultsDisplay
        ├── DetailsTab
        ├── AnalysisTab
        ├── FertilizerTab
        │   └── FertilizerManager
        ├── SettingsPage
        ├── MixingAssistant
        ├── WateringScheduler
        └── ReferencesTab
```

## Data Flow Architecture

### Unidirectional Data Flow
```
User Action → Component → Context → State Update → Re-render
```

### State Management Pattern
- **Global State**: Theme, notifications, water profiles
- **Local State**: Form inputs, component-specific UI
- **Derived State**: Calculated values from base state

## Calculation Engine Architecture

### Core Calculation Pipeline
```javascript
// Input Processing
waterVolume × growthStage × waterProfile → baseRequirements

// Fertilizer Processing
Σ(fertilizer.amount × fertilizer.concentration) → nutrientContributions

// Result Calculation
baseRequirements + nutrientContributions → finalNutrients

// Validation
finalNutrients vs growthStage.targets → statusFlags
```

### Nutrient Calculation Formula
```
Final Concentration = (Fertilizer Amount × Nutrient Percentage) / Water Volume
```

## Security Architecture

### Current Security Model
- **Client-side only**: No server-side validation
- **API Key exposure**: Direct client-side API calls
- **Input validation**: Basic sanitization

### Recommended Security Enhancements
```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Client App    │───▶│   Backend Proxy  │───▶│  External APIs  │
│   (Browser)     │    │   (Secure)       │    │   (Gemini AI)   │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## Performance Architecture

### Optimization Strategies
1. **Code Splitting**: Route-based lazy loading
2. **Memoization**: React.memo for expensive calculations
3. **Debouncing**: Input field updates
4. **Caching**: Calculation results caching

### Bundle Analysis
```
dist/assets/index-8ad006b8.js (210KB)
├── React Core (~45KB)
├── Tailwind Styles (~27KB)
├── Application Logic (~138KB)
└── Dependencies (~210KB total)
```

## Responsive Design Architecture

### Breakpoint Strategy
- **Mobile**: < 768px (Single column layout)
- **Tablet**: 768px - 1024px (Two column layout)
- **Desktop**: > 1024px (Three column layout)

### Component Responsiveness
```css
/* Mobile First Approach */
.mobile-stack { @apply flex-col; }
.tablet-grid { @apply md:grid md:grid-cols-2; }
.desktop-flex { @apply lg:flex lg:flex-row; }
```

## Testing Architecture

### Test Pyramid
```
         /\
        /  \ E2E Tests (Playwright)
       /    \
      /      \
     /        \
    /__________\
   /            \
  /  Integration \
 /     Tests      \
/__________________\
\                  /
 \   Unit Tests   /
  \______________/
```

### Test Coverage Areas
1. **Calculation Accuracy**: Nutrient math validation
2. **UI Interactions**: Tab navigation, form inputs
3. **Data Persistence**: Local storage operations
4. **API Integration**: AI chat functionality
5. **Responsive Design**: Cross-device compatibility

## Deployment Architecture

### Docker Multi-stage Build
```dockerfile
# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
```

### Environment Configuration
- **Development**: Vite dev server with hot reload
- **Staging**: Docker container with production build
- **Production**: Nginx serving static assets

## Data Schema

### Fertilizer Schema
```typescript
interface Fertilizer {
  id: string;
  name: string;
  type: 'liquid' | 'powder';
  unit: 'ml' | 'g';
  composition: {
    n: number;  // Nitrogen (g/L or %)
    p: number;  // Phosphorus (g/L or %)
    k: number;  // Potassium (g/L or %)
    ca: number; // Calcium (g/L or %)
    mg: number; // Magnesium (g/L or %)
    s: number;  // Sulfur (g/L or %)
    fe: number; // Iron (ppm or %)
    // ... micronutrients
  };
}
```

### Recipe Schema
```typescript
interface Recipe {
  id: string;
  name: string;
  waterVolume: number;
  growthStage: GrowthStage;
  waterType: WaterType;
  waterProfile: WaterProfile;
  fertilizers: SelectedFertilizer[];
  results: CalculationResults;
  createdAt: Date;
  updatedAt: Date;
}
```

## Error Handling Architecture

### Error Boundaries
```typescript
class ErrorBoundary extends React.Component {
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log to error reporting service
    console.error('Error caught:', error, errorInfo);
  }
}
```

### User Feedback System
- **Toast Notifications**: Non-blocking user feedback
- **Inline Validation**: Real-time form validation
- **Error Messages**: Clear, actionable error descriptions

## Accessibility Architecture

### WCAG 2.1 Compliance
- **Keyboard Navigation**: Tab order management
- **Screen Reader Support**: ARIA labels and descriptions
- **Color Contrast**: WCAG AA compliant color palette
- **Focus Management**: Visible focus indicators

## Monitoring & Analytics

### Performance Metrics
- **Core Web Vitals**: LCP, FID, CLS monitoring
- **Calculation Performance**: Nutrient calculation timing
- **Error Rates**: JavaScript error tracking
- **User Interactions**: Feature usage analytics

### Recommended Monitoring Setup
```typescript
// Performance monitoring
const measureCalculation = () => {
  performance.mark('calculation-start');
  // ... calculation logic
  performance.mark('calculation-end');
  performance.measure('calculation', 'calculation-start', 'calculation-end');
};
```

## Future Architecture Considerations

### Microservices Migration
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   API Gateway   │    │   Services      │
│   (React SPA)   │───▶│   (Auth/Rate)   │───▶│   - Calculator  │
│                 │    │                 │    │   - Fertilizer  │
└─────────────────┘    └─────────────────┘    │   - AI Service  │
                                               └─────────────────┘
```

### Progressive Web App (PWA)
- **Service Worker**: Offline functionality
- **App Shell**: Instant loading
- **Push Notifications**: Growth reminders
- **Background Sync**: Data synchronization

This architecture provides a solid foundation for current needs while remaining flexible for future enhancements and scaling requirements.

