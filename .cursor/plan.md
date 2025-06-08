# NutriCalc Modernization & Modularization Plan

## Objective
Migrate all features, UI/UX, and design from the legacy single-file React 17 + Babel + Tailwind HTML app (`NutriCalcAI-v0.1.html`) to a modern, modular React 18 + Vite + Tailwind project. Ensure the new app is fully functional, maintainable, and committed to GitHub.

## Key Steps

1. **Analyze Legacy App**
   - Review `NutriCalcAI-v0.1.html` for all features, UI/UX, and design patterns.
   - List all major features and UI components.

2. **Project Setup**
   - Ensure Vite + React 18 + Tailwind project is correctly configured.
   - Set up folder structure for modular components, contexts, hooks, and utilities.

3. **Core Feature Migration**
   - **Tab Navigation & Layout**: Implement modular tab navigation matching the old app.
   - **Dark Mode**: Add theme context/provider and toggle UI.
   - **AI Chat Bar**: Modularize chat bar with suggestions and placeholder logic.
   - **Toast Notifications**: Implement global toast context/provider.
   - **Advanced Calculator**: Modularize calculation logic and UI for water volume, growth stage, water type, and custom water profile.
   - **Fertilizer Management**: Create FertilizerManager component with add/remove/toggle/amount features and real-time calculation updates.
   - **Results Display**: Show main nutrients (N, P, K, EC) in a styled summary.

4. **Remaining Feature Implementation**
   - **Custom Fertilizer Management**: Allow users to define, edit, and save custom fertilizers. **[Done]**
   - **Advanced Analysis**: Add detailed nutrient breakdowns, warnings, and optimization tips. **[Done]**
   - **Export/Import**: Enable saving/loading of user setups and results. **[Done]**
   - **Settings**: Implement a dedicated settings tab allowing users to:
     - Manage API keys (already done in `src/hooks/useApiKey.js` and `src/components/SettingsTab.js`).
     - Adjust units (e.g., volume, weight).
     - Set default values for water amount, growth phase, and water type.
     - Toggle dark/light mode (already done via `ThemeContext`).
   - **References**: Integrate reference materials and citations within a dedicated tab or section, including:
     - Links to scientific studies or reliable sources.
     - Explanations of nutrient roles and deficiencies.
     - FAQ section related to nutrient calculation and plant health.
   - **UI Polish**: Ensure responsive design, accessibility, and visual polish across all components.
     - Review and refine existing Tailwind CSS classes.
     - Implement consistent spacing, typography, and color schemes.
     - Optimize for various screen sizes and devices.

5. **Testing & QA**
   - Test all features for parity with the legacy app.
   - Fix bugs and ensure smooth user experience.

6. **Documentation**
   - Update README and add in-app help/tooltips as needed.

7. **Version Control**
   - Commit and push all changes to GitHub with clear, conventional commit messages.

8. **Final Review**
   - Conduct a final review for completeness, maintainability, and code quality.

## Progress Tracking
- [x] Project setup and initial migration
- [x] Tab navigation, dark mode, AI chat bar, toast notifications
- [x] Advanced calculator and fertilizer management
- [x] Custom fertilizer management
- [x] Advanced analysis
- [x] Export/import
- [x] Settings
- [x] References
- [x] UI polish
- [ ] Testing & QA
- [ ] Documentation
- [ ] Final review & commit

---
**Recent:**
- Major cleanup and refactor: removed duplicate/legacy files, ensured modular structure, and pushed to GitHub.

*This plan will be updated as progress is made and new requirements are discovered.*
