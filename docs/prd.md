# 1. Title: PRD for NutriCalc (Cannabis Düngerrechner Pro)

<version>1.0.0</version>

## Status: Draft

## Intro

NutriCalc is an advanced nutrient calculator for plants (especially cannabis), designed as a single-page application (SPA) with React and Tailwind CSS. It enables precise calculation of nutrient solutions, management of custom fertilizers, and features an AI-powered assistant for user support. This PRD defines the goals, requirements, and development plan for the project.

## Goals

- Provide accurate nutrient solution calculations for various plant growth phases and water types
- Allow users to manage and customize fertilizer data
- Offer visual analysis and optimization recommendations
- Integrate an AI assistant for contextual help and guidance
- Ensure a responsive, user-friendly, and secure application

## Features and Requirements

- Functional requirements:
  - Nutrient calculation based on water amount, phase, and water type
  - Fertilizer database with add/edit/delete for custom fertilizers
  - Growth phase profiles with NPK/EC targets
  - Visual analysis (charts, tables, recommendations)
  - Import/export of recipes (JSON)
  - Dark mode and responsive design
  - AI chat assistant (Google Gemini API)
- Non-functional requirements:
  - SPA, fast load, no build step required
  - Secure API key management for AI
  - Open source (MIT License)
- User experience requirements:
  - Intuitive UI, clear feedback, error handling
  - Mobile and desktop usability
- Integration requirements:
  - Google Gemini API for AI chat
- Compliance requirements:
  - No sensitive data stored client-side

## Epic List

### Epic-1: Core Nutrient Calculator
### Epic-2: Fertilizer Management
### Epic-3: Visual Analysis & Recommendations
### Epic-4: AI Assistant Integration
### Epic-5: Import/Export & User Experience
### Epic-6: Future Enhancements

## Epic 1: Story List

- Story 1: Water, Phase, and Water Type Input UI
  Status: 
  Requirements:
  - UI for entering water amount, selecting growth phase, and water type
  - Validation and feedback for user input

- Story 2: Nutrient Calculation Engine
  Status: 
  Requirements:
  - Calculate macro/micronutrient concentrations and EC
  - Support for different water types and custom profiles

- Story 3: Fertilizer Database CRUD
  Status: 
  Requirements:
  - Add, edit, delete fertilizers (liquid/powder)
  - Store user-defined fertilizers in local storage

- Story 4: Growth Phase Profiles
  Status: 
  Requirements:
  - Predefined NPK/EC targets for each phase
  - UI for selecting and displaying phase info

- Story 5: Visual Analysis & Recommendations
  Status: 
  Requirements:
  - NPK bar charts, tables, and optimization tips
  - Status indicators (optimal, low, high)

- Story 6: Import/Export Recipes
  Status: 
  Requirements:
  - Export/import all settings and recipes as JSON

- Story 7: AI Chat Assistant
  Status: 
  Requirements:
  - Integrate Gemini API for contextual chat
  - Pass current calculator state to AI

- Story 8: Responsive & Dark Mode UI
  Status: 
  Requirements:
  - Tailwind CSS for responsive and dark mode support

## Technology Stack

| Technology     | Description                                      |
|---------------|--------------------------------------------------|
| React         | UI framework for SPA                              |
| Tailwind CSS  | Utility-first CSS framework                       |
| Babel         | In-browser JSX transpilation                      |
| Google Gemini | AI chat assistant API                             |
| LocalStorage  | Store user data and custom fertilizers            |

## Reference

- [Google AI Studio](https://aistudio.google.com/app/apikey)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## Data Models, API Specs, Schemas, etc...

### Fertilizer Model
```json
{
  "name": "string",
  "type": "liquid" | "powder",
  "composition": { "N": "number", "P": "number", "K": "number", ... },
  "concentration": "number" // g/L or %
}
```

### Recipe Model
```json
{
  "waterAmount": "number",
  "phase": "string",
  "waterType": "string",
  "fertilizers": [Fertilizer],
  "results": { "N": "number", "P": "number", ... }
}
```

## Project Structure

```text
NutriCalcAI-v0.1.html   # Main SPA file
.cursor/                # Workflow rules, templates
  templates/
  rules/
docs/
  prd.md                # This PRD
  workflow-rules.md     # Workflow documentation
xnotes/                 # Notes, stories, planning
```

## Change Log

| Change        | Story ID | Description                |
|---------------|----------|----------------------------|
| Initial draft | N/A      | Initial PRD for NutriCalc  | 