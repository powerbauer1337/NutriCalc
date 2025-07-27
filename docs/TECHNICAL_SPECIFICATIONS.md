# NutriCalc Technical Specifications

## 1. System Requirements

### Hardware Requirements
**Minimum Specifications:**
- **Processor**: 1 GHz or faster processor
- **Memory**: 512 MB RAM (1 GB recommended)
- **Storage**: 10 MB available disk space
- **Display**: 1024x768 screen resolution

**Recommended Specifications:**
- **Processor**: Dual-core 2 GHz or faster
- **Memory**: 2 GB RAM
- **Storage**: 50 MB available disk space
- **Display**: 1920x1080 screen resolution

### Software Requirements
**Supported Operating Systems:**
- Windows 10 or later
- macOS 10.15 (Catalina) or later
- Linux distributions with modern browser support
- iOS 14 or later (mobile Safari)
- Android 10 or later (Chrome Mobile)

**Required Browser Features:**
- ECMAScript 2020 (ES11) support
- LocalStorage API
- Fetch API
- Promise support
- CSS Grid and Flexbox
- CSS Custom Properties
- WebGL (for future charting enhancements)

### Network Requirements
- **Internet Connection**: Required for AI features and updates
- **Bandwidth**: Minimum 1 Mbps for AI interactions
- **Latency**: <100ms for optimal responsiveness
- **Firewall**: Outbound HTTPS access to generativelanguage.googleapis.com

## 2. Application Architecture

### Technology Stack
**Frontend Framework:**
- React 18.x with Hooks
- TypeScript 5.x
- Tailwind CSS 3.x
- Class Variance Authority 0.x
- Clsx 2.x
- Tailwind-Merge 1.x

**Build Tools:**
- Vite 4.x
- ESLint 8.x
- Prettier 2.x
- TypeScript Compiler 5.x

**Testing Framework:**
- Vitest 0.x
- React Testing Library 14.x
- Playwright 1.x

### File Structure
```
nutricalc/
├── index.html                  # Entry point
├── src/
│   ├── App.tsx                 # Main application component
│   ├── index.tsx               # React DOM renderer
│   ├── components/             # UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Navigation.tsx
│   │   ├── ChatBar.tsx
│   │   ├── SetupTab.tsx
│   │   ├── FertilizerTab.tsx
│   │   ├── AnalysisTab.tsx
│   │   ├── DetailsTab.tsx
│   │   ├── ReferencesTab.tsx
│   │   ├── SettingsPage.tsx
│   │   ├── MixingAssistant.tsx
│   │   ├── WateringScheduler.tsx
│   │   ├── NutrientBarChart.tsx
│   │   └── ...
│   ├── contexts/               # React contexts
│   │   ├── ThemeContext.tsx
│   │   ├── ToastContext.tsx
│   │   ├── WaterContext.tsx
│   │   └── DataPersistenceContext.tsx
│   ├── hooks/                  # Custom hooks
│   │   ├── useApiKey.ts
│   │   ├── useAppSettings.ts
│   │   ├── useLocalStorage.ts
│   │   └── useDebounce.ts
│   ├── utils/                  # Utility functions
│   │   ├── calculateNutrients.ts
│   │   ├── nutrientUtils.ts
│   │   ├── cn.ts
│   │   └── memoization.ts
│   ├── constants/              # Application constants
│   │   └── index.ts
│   ├── types/                  # TypeScript types
│   │   └── index.ts
│   ├── styles/                 # CSS files
│   │   ├── design-system.css
│   │   └── index.css
│   └── test/                   # Test utilities
│       └── setup.ts
├── docs/                       # Documentation
├── tests/                      # End-to-end tests
├── public/                     # Static assets
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── eslint.config.js            # ESLint configuration
└── playwright.config.ts        # Playwright configuration
```

### Module Bundling
- **Entry Point**: `src/index.tsx`
- **Output Directory**: `dist/`
- **Module Format**: ES Modules
- **Chunking Strategy**: Route-based code splitting
- **Asset Handling**: Base64 inlining for small assets (<4KB)

## 3. Data Structures and Models

### Core Data Models

#### Fertilizer Model
```typescript
interface Fertilizer {
  id: string
  name: string
  type: 'powder' | 'liquid'
  unit: string
  n: number
  p: number
  k: number
  ec: number
  ph: number
  description?: string
  category?: string
  composition?: Record<string, number>
}
```

#### Nutrient Calculation Model
```typescript
interface NutrientCalculation {
  nutrients: {
    n: number
    p: number
    k: number
    ca: number
    mg: number
    s: number
    fe: number
    mn: number
    zn: number
    cu: number
    b: number
    mo: number
    ec: number
    ph: number
  }
  contributions: Record<string, Record<string, number>>
  stage: GrowthStage
}
```

#### Growth Stage Model
```typescript
interface GrowthStage {
  name: string
  n: [number, number]
  p: [number, number]
  k: [number, number]
  ec: [number, number]
}
```

#### Water Type Model
```typescript
interface WaterType {
  name: string
  ca?: number
  mg?: number
  s?: number
  ec?: number
  ph?: number
  baseEC?: number
}
```

#### User Settings Model
```typescript
interface UserSettings {
  theme: 'light' | 'dark'
  unit: 'liter' | 'gallon'
  waterAmount: string
  growthPhase: string
  waterType: string
  notifications: boolean
}
```

### Data Storage Schema

#### LocalStorage Keys
```javascript
{
  "nutricalc_gemini_api_key": "encrypted_api_key_string",
  "nutricalc_custom_fertilizers": "[{fertilizer_object}, ...]",
  "nutricalc_custom_water": "{water_profile_object}",
  "appSettings": "{user_settings_object}",
  "nutricalc_watering_events": "[{watering_event_object}, ...]",
  "theme": "'light'|'dark'"
}
```

#### Recipe Export Format
```json
{
  "version": "1.0.0",
  "waterVolume": 10,
  "growthStage": "early_veg",
  "waterType": "ro",
  "customWaterProfile": {},
  "selectedFertilizers": [
    {
      "id": "fertilizer_id",
      "amount": 5.0,
      "active": true
    }
  ],
  "customFertilizers": [
    {
      "id": "custom_fertilizer_id",
      "name": "Custom Blend",
      "type": "liquid",
      "unit": "ml",
      "composition": {
        "n": 5.0,
        "p": 3.0,
        "k": 7.0
      },
      "concentration": "100"
    }
  ]
}
```

## 4. API Specifications

### Google Gemini API Integration

#### Endpoint
```
POST https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent
```

#### Request Headers
```
Content-Type: application/json
x-goog-api-key: {USER_API_KEY}
```

#### Request Body
```json
{
  "contents": [
    {
      "role": "user",
      "parts": [
        {
          "text": "User's question with context"
        }
      ]
    }
  ],
  "generationConfig": {
    "temperature": 0.6,
    "maxOutputTokens": 150
  },
  "safetySettings": [
    {
      "category": "HARM_CATEGORY_HARASSMENT",
      "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    }
  ]
}
```

#### Response Format
```json
{
  "candidates": [
    {
      "content": {
        "parts": [
          {
            "text": "AI-generated response"
          }
        ]
      }
    }
  ]
}
```

#### Rate Limits
- **Free Tier**: 60 requests per minute
- **Paid Tier**: Depends on plan
- **Timeout**: 30-second request timeout
- **Retries**: Exponential backoff up to 3 attempts

## 5. Performance Specifications

### Loading Performance
- **Initial Load**: <3 seconds on 3G network
- **Bundle Size**: <500 KB compressed
- **First Paint**: <1 second
- **Interactive**: <2 seconds

### Runtime Performance
- **Frame Rate**: 60 FPS during animations
- **Input Latency**: <100ms for user interactions
- **Calculation Time**: <50ms for nutrient calculations
- **Memory Usage**: <100 MB during normal operation

### Caching Strategy
- **Static Assets**: 1-year cache headers
- **API Responses**: 5-minute cache for reference data
- **User Data**: Persistent in LocalStorage
- **Service Workers**: Future offline support

## 6. Security Specifications

### Data Protection
- **Encryption**: AES-256 for sensitive LocalStorage data
- **Transport**: TLS 1.3 for all external communications
- **Sanitization**: Input validation and output encoding
- **Isolation**: No cross-site scripting vulnerabilities

### Authentication
- **API Keys**: User-managed, client-side storage only
- **No Server Storage**: Zero server-side user data storage
- **Session Management**: Browser session persistence
- **Credential Security**: No username/password requirements

### Compliance
- **GDPR**: Data protection regulation compliance
- **CCPA**: California Consumer Privacy Act adherence
- **COPPA**: No collection of children's personal information
- **Privacy by Design**: Privacy considerations in all features

## 7. Accessibility Specifications

### WCAG 2.1 AA Compliance
- **Contrast Ratios**: Minimum 4.5:1 for normal text
- **Keyboard Navigation**: 100% keyboard operable
- **Screen Reader Support**: ARIA labels and roles
- **Focus Management**: Visible focus indicators

### Supported Assistive Technologies
- **Screen Readers**: NVDA, JAWS, VoiceOver
- **Keyboard Navigation**: Full functionality without mouse
- **Voice Control**: Compatibility with voice recognition software
- **High Contrast**: Support for high contrast mode

### Accessibility Features
- **Semantic HTML**: Proper heading structure and landmarks
- **Alt Text**: Descriptive alt text for all images
- **Form Labels**: Explicit labels for all form controls
- **Error Handling**: Accessible error messages

## 8. Internationalization Specifications

### Supported Languages
- **Primary**: German (de)
- **Secondary**: English (en)
- **Future Support**: Easily extensible to other languages

### Localization Features
- **Text Direction**: Support for RTL languages
- **Number Formatting**: Locale-appropriate number formats
- **Date/Time Formats**: Regional date and time representations
- **Currency Support**: Multiple currency display options

### Character Encoding
- **Standard**: UTF-8 encoding for all text
- **Special Characters**: Full Unicode support
- **Emoji Support**: Modern emoji rendering
- **Font Support**: Web-safe fonts with fallbacks

## 9. Testing Specifications

### Test Coverage Requirements
- **Unit Tests**: 85% code coverage minimum
- **Component Tests**: 90% component coverage
- **Integration Tests**: 80% critical path coverage
- **End-to-End Tests**: 70% user journey coverage

### Performance Benchmarks
- **Load Time**: <3 seconds on average connection
- **Interaction Lag**: <100ms response time
- **Animation Frame Rate**: 60 FPS minimum
- **Memory Growth**: <10% increase during session

### Browser Compatibility Matrix
| Browser | Version | Support Level |
|---------|---------|---------------|
| Chrome  | 88+     | Full          |
| Firefox | 85+     | Full          |
| Safari  | 14+     | Full          |
| Edge    | 88+     | Full          |
| Opera   | 74+     | Partial       |
| Samsung | 15+     | Partial       |

### Device Compatibility
- **Desktop**: Windows, macOS, Linux
- **Tablet**: iPad, Android tablets
- **Mobile**: iPhone, Android phones
- **Screen Readers**: NVDA, JAWS, VoiceOver

## 10. Deployment Specifications

### Build Artifacts
- **HTML**: Single index.html file
- **JavaScript**: Bundled and minified JS files
- **CSS**: Compiled and minified CSS files
- **Assets**: Optimized images and icons
- **Source Maps**: Development builds only

### Hosting Requirements
- **Static Hosting**: Any static file hosting service
- **HTTPS**: Required for API functionality
- **CORS**: No CORS restrictions needed
- **Compression**: Gzip/Brotli support recommended

### Update Mechanism
- **Versioning**: Semantic versioning (MAJOR.MINOR.PATCH)
- **Backward Compatibility**: Maintained within MINOR versions
- **Migration Path**: Automatic for PATCH versions
- **Breaking Changes**: Clearly documented in release notes

### Monitoring and Analytics
- **Error Tracking**: Console error reporting
- **Performance Metrics**: Web Vitals collection
- **User Feedback**: In-app feedback mechanisms
- **Usage Analytics**: Opt-in only, privacy-focused

These technical specifications provide a comprehensive overview of NutriCalc's architecture, requirements, and implementation details, serving as a reference for developers, testers, and system administrators working with the application.