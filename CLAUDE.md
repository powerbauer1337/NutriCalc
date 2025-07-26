# NutriCalc - Claude Configuration

## Project Overview
NutriCalc ist ein fortschrittlicher Nährstoffrechner für Pflanzen (speziell Cannabis) als React SPA mit TypeScript, Vite, und Tailwind CSS. Die Anwendung bietet präzise Nährstoffberechnungen, AI-gestützte Beratung über Google Gemini API, und umfassende Dünger- und Wassermanagement-Features.

## Tech Stack
- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Build Tool**: Vite 4.x
- **Testing**: Vitest + Playwright + Testing Library  
- **Linting**: ESLint + Prettier
- **API Integration**: Google Generative AI (@google/generative-ai)
- **Icons**: Lucide React
- **Package Manager**: npm

## Project Structure
```
src/
├── components/         # React components (tabs, UI elements)
├── contexts/          # React contexts (Theme, Toast, Water, DataPersistence)
├── hooks/             # Custom hooks (useApiKey, useAppSettings, etc.)
├── types/             # TypeScript type definitions
├── utils/             # Utility functions (calculateNutrients, etc.)
├── constants/         # Configuration constants and data
└── styles/            # CSS styles

docs/                  # Project documentation
├── prd.md            # Product Requirements Document
├── workflow-rules.md # Development workflow guidelines
└── feature-improvement-ideas.md

tests/                # Playwright e2e tests
xnotes/              # Development notes and planning
```

## Development Commands
```bash
# Development
npm start              # Start dev server (Vite) on port 3002
npm run build          # Production build
npm run preview        # Preview production build

# Testing
npm test              # Run unit tests (Vitest)
npm run test:ui       # Run tests with UI
npm run test:coverage # Test coverage report
npx playwright test   # Run e2e tests

# Code Quality
npm run lint          # ESLint check
npm run lint:fix      # ESLint auto-fix
npm run format        # Prettier formatting
npm run type-check    # TypeScript type checking
```

## Key Features & Components

### Core Components
- **SetupTab**: Wassermenge, Wachstumsphase, Wassertyp-Konfiguration
- **FertilizerTab**: Düngemittel-Datenbank-Management (CRUD)
- **AnalysisTab**: Nährstoff-Visualisierung und Optimierungsempfehlungen
- **DetailsTab**: Mikronährstoff-Details anzeigen
- **MixingAssistant**: Interaktiver Misch-Assistent mit Live-Berechnungen
- **WateringScheduler**: Gießplan-Management
- **ChatBar**: AI-Helfer Integration (Google Gemini)

### State Management
- **ThemeContext**: Dark/Light Mode
- **ToastContext**: Benachrichtigungen
- **WaterContext**: Wasser-Mischungen management
- **DataPersistenceContext**: LocalStorage data persistence

### Key Utilities
- **calculateNutrients.ts**: Hauptberechungslogik für NPK, EC, pH
- **nutrientUtils.ts**: Hilfsfunktionen für Nährstoff-Berechnungen
- **memoization.ts**: Performance-Optimierung für Berechnungen

## Important Files
- `package.json`: Dependencies und Scripts
- `vite.config.js`: Vite-Konfiguration (PWA, Server-Settings)
- `tailwind.config.js`: Tailwind CSS-Konfiguration (Dark Mode)
- `tsconfig.json`: TypeScript-Konfiguration
- `eslint.config.js`: ESLint-Regeln
- `playwright.config.ts`: E2E-Test-Konfiguration

## Code Quality Standards
- **TypeScript**: Strict mode, no unused locals/parameters
- **ESLint**: React hooks rules, TypeScript integration
- **Prettier**: Consistent code formatting
- **Component Structure**: Functional components with hooks
- **Naming Conventions**: PascalCase für Components, camelCase für functions/variables

## API Integration
- **Google Gemini API**: AI chat assistant mit contextual data
- **LocalStorage**: User data persistence (custom fertilizers, settings)
- **JSON Import/Export**: Recipe und setup management

## Development Notes
- **Port**: Development server läuft auf Port 3002
- **Responsive**: Mobile-first approach mit Tailwind breakpoints
- **Accessibility**: ARIA labels, keyboard navigation support
- **PWA**: Progressive Web App features konfiguriert
- **Testing**: Unit tests für utilities, E2E tests für user flows

## Current Development Phase
**UI Redesign**: 6-phase plan zur Verbesserung von UX/Accessibility
- Phase 1: Foundation (color palette, component consistency) - **IN PROGRESS**
- Phase 2: Navigation redesign
- Phase 3: Micro-interactions & feedback
- Phase 4: Accessibility enhancements
- Phase 5: Help & documentation
- Phase 6: Testing & rollout

## Common Tasks
- **Adding new fertilizers**: Update `constants/index.ts` BASE_FERTILIZER_DATABASE
- **New components**: Follow existing patterns in `components/` folder
- **State updates**: Use appropriate context or local state
- **Testing**: Add unit tests for utilities, update E2E tests for new features
- **Styling**: Use Tailwind classes, follow existing responsive patterns

## Debugging & Troubleshooting
- **Dev Server Issues**: Check Node.js version (requires 20.19.0+ for Vite 7.x)
- **Build Errors**: Run `npm run type-check` für TypeScript issues
- **Dependency Problems**: Clear `node_modules` and `package-lock.json`, reinstall
- **Test Failures**: Check `test-results/` folder für detailed error context

## Security Considerations
- **API Keys**: Google Gemini API key management via settings
- **LocalStorage**: Keine sensitive Daten client-side speichern
- **CORS**: Vite dev server configured für external API calls