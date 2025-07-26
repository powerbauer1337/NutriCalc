
# NutriCalc Repository Summary

## Purpose
NutriCalc is a comprehensive cannabis nutrient calculator SPA (Single Page Application) designed to help growers calculate precise nutrient requirements for cannabis plants across different growth stages. It provides a user-friendly interface for managing fertilizers, water profiles, and nutrient calculations with data persistence and export capabilities.

## General Setup
- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS with dark mode support
- **Build Tool**: Vite with PWA support
- **Testing**: Playwright for E2E tests
- **Deployment**: Docker containerized with nginx
- **Package Manager**: npm

## Repository Structure

```
src/
├── components/          # React components (TypeScript)
├── contexts/           # React contexts for state management
├── hooks/              # Custom React hooks
├── utils/              # Utility functions and calculations
├── constants/          # Application constants and defaults
├── types/              # TypeScript type definitions
├── styles/             # CSS and styling files
├── assets/             # Static assets (images, icons)
└── App.tsx             # Main application component

docs/                  # Documentation files
.github/workflows/     # CI/CD workflows
dist/                  # Build output
```

## CI/CD Workflows

### Build & Development Scripts
- **TypeScript Compilation**: Ensures all TypeScript files compile correctly via `npm run build`
- **ESLint**: Code quality and style enforcement via `npm run lint`
- **Prettier**: Code formatting consistency via `npm run format`
- **Build Verification**: Production build validation via `npm run build`
- **Development**: Hot-reload development server via `npm run dev`
- **Preview**: Production build preview via `npm run preview`

### Key Package.json Scripts
- `dev`: Start development server with hot reload
- `build`: Build for production with TypeScript compilation
- `preview`: Preview production build locally
- `lint`: Run ESLint for code quality checks
- `format`: Format code with Prettier
- `test`: Run Playwright E2E tests (when configured)

## Key Features
- **Nutrient Calculator**: Precise nutrient calculations for cannabis growth stages
- **Fertilizer Management**: Custom fertilizer database with import/export
- **Water Profile Management**: Custom water profiles and mixing
- **Data Persistence**: LocalStorage with export/import functionality
- **Responsive Design**: Mobile-first responsive design
- **Dark Mode**: Theme switching support
- **PWA Support**: Installable web app with offline capabilities

## Development Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

