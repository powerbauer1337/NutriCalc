# NutriCalc Change Log

## 2024-05-10

### Refactoring & Project Structure
- Created a modern React project structure with the following directories:
  - `src/components/` for React components
  - `src/hooks/` for custom React hooks
  - `src/utils/` for utility/helper functions
  - `src/constants/` for configuration and constants
  - `src/styles/` for Tailwind and global CSS
  - `src/contexts/` for React context providers
- Added `package.json`, `vite.config.js`, `tailwind.config.js`, and `postcss.config.js` for modern development workflow (Vite, Tailwind, PostCSS).
- Created a main entry point (`src/index.js`) and root App component (`src/App.js`).

### Security Improvements
- Removed hardcoded Google Gemini API key from the codebase.
- Implemented secure API key management using localStorage and a dedicated settings tab.
- Added a custom React hook (`useApiKey`) for API key management.
- Added a settings tab UI for users to input, update, and remove their API key securely.

### Code Quality & Maintainability
- Moved configuration values and constants to `src/constants/index.js`.
- Moved nutrient calculation and helper functions to `src/utils/nutrientUtils.js`.
- Created a reusable `SettingsTab` component for the settings UI.
- Added a theme context (`ThemeContext`) for dark mode support.
- Added a main Tailwind CSS file with custom styles for toasts and base theming.

### Tasks Completed
- Project structure refactor for maintainability and scalability.
- Secure API key handling and user settings UI.
- Modularization of constants, utilities, and hooks.
- Initial setup for Vite, Tailwind, and PostCSS.
- Preparation for further migration of logic and UI from the monolithic HTML file to modular React components.

## 2024-05-11

### Feature: SetupTab React Component (Start of Calculator Migration)
- Created a new `SetupTab` React component as the first step in migrating the core calculator UI from the monolithic HTML file to modular React components.
- The `SetupTab` allows users to:
  - Input water amount (with validation)
  - Select growth phase (from predefined stages)
  - Select water type (from predefined types)
  - See validation feedback for all fields
- Uses Tailwind CSS for styling and constants from `src/constants/index.js`.
- Ready for integration into the main app; calculation logic and further UI migration to follow.

---

For further details, see the PRD in `docs/prd.md` and the main README. 