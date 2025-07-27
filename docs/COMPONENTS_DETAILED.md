
# NutriCalc Component Library - Detailed Documentation

## Overview

This document provides comprehensive documentation for all components in the NutriCalc design system. Each component is built with TypeScript, follows accessibility best practices, and uses the design system tokens.

For a detailed implementation plan and comprehensive component documentation, see [DESIGN_SYSTEM_PLAN.md](./DESIGN_SYSTEM_PLAN.md).

Component Categories:
1. **Foundational Components**
2. **Layout Components**
3. **Input Components**
4. **Data Display Components**
5. **Feedback Components**
6. **Navigation Components**
7. **Form Components**

Component Hierarchy:
1. **Atomic Components** - Basic building blocks
2. **Molecular Components** - Simple combinations
3. **Organismic Components** - Complex components
4. **Template Components** - Page-level compositions
5. **Page Components** - Specific implementations

For a visual representation of the component structure, see [Component Structure Diagram](./component-structure-diagram.md).
For a visual representation of the component hierarchy, see [Component Hierarchy Diagram](./component-hierarchy-diagram.md).

## 1. Button Component

### Purpose
The Button component is a versatile, accessible button element with multiple variants and sizes for different use cases.

### Implementation Details
- **Location**: `src/components/Button.tsx`
- **Dependencies**: `class-variance-authority`, `clsx`, `tailwind-merge`
- **Accessibility**: Full keyboard navigation, proper focus indicators, ARIA attributes

### Props
```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}
```

### Variants
1. **primary**: Main action button with emerald background
2. **secondary**: Secondary action with white background and border
3. **success**: Positive actions with green background
4. **danger**: Destructive actions with red background
5. **warning**: Caution actions with orange background
6. **ghost**: Minimal styling with transparent background
7. **outline**: Outlined button with transparent background and border

### Sizes
1. **sm**: Small button (32px height)
2. **md**: Medium button (40px height) - default
3. **lg**: Large button (48px height)
4. **xl**: Extra large button (56px height)

### Features
- **Loading State**: Animated spinner with disabled interaction
- **Icon Support**: Left and right icon placement
- **Disabled State**: Visual indication and interaction prevention
- **Focus Ring**: Visible focus indicator for keyboard navigation
- **Type Safety**: Full TypeScript support with variant validation

### Usage Examples
```tsx
// Basic usage
<Button>Click me</Button>

// With variants
<Button variant="primary">Primary Action</Button>
<Button variant="secondary">Secondary Action</Button>
<Button variant="danger">Delete Item</Button>

// With sizes
<Button size="sm">Small Button</Button>
<Button size="lg">Large Button</Button>

// With icons
<Button leftIcon={<PlusIcon />}>Add Item</Button>
<Button rightIcon={<ArrowIcon />}>Next</Button>

// Loading state
<Button loading>Loading...</Button>

// Disabled state
<Button disabled>Disabled</Button>
```

## 2. Card Component System

### Purpose
The Card component system provides a flexible container for grouping related content with consistent styling and spacing.

### Implementation Details
- **Location**: `src/components/Card.tsx`
- **Exports**: `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`
- **Dependencies**: `class-variance-authority`, `clsx`, `tailwind-merge`

### Card Props
```typescript
interface CardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {}
```

### Card Variants
1. **default**: Standard card with subtle shadow
2. **elevated**: Enhanced shadow for prominence
3. **outlined**: Border-only styling
4. **ghost**: No background or border

### Padding Options
1. **none**: No padding
2. **sm**: Small padding (16px)
3. **md**: Medium padding (24px) - default
4. **lg**: Large padding (32px)

### Sub-components
#### CardHeader
- Top section with background
- Typically contains `CardTitle` and `CardDescription`
- Consistent styling with bottom border

#### CardTitle
- Main heading element (h3)
- Semibold font weight
- Proper text color and sizing

#### CardDescription
- Subtitle text element
- Smaller font size with muted color
- Optional descriptive text below title

#### CardContent
- Main content area
- Flexible container for any content
- Consistent padding and spacing

#### CardFooter
- Bottom section with background
- Typically contains action buttons
- Consistent styling with top border

### Usage Examples
```tsx
// Basic card
<Card>
  <CardContent>
    <p>Card content</p>
  </CardContent>
</Card>

// Card with header and footer
<Card variant="elevated">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Optional description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Main content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>

// Ghost card with no padding
<Card variant="ghost" padding="none">
  <CardContent>
    <p>Content with no padding</p>
  </CardContent>
</Card>
```

## 3. Navigation Component

### Purpose
Responsive navigation system that adapts to different screen sizes with sidebar on desktop and bottom navigation on mobile.

### Implementation Details
- **Location**: `src/components/Navigation.tsx`
- **Dependencies**: React, `TABS_CONFIG` constant
- **Accessibility**: Keyboard navigation, ARIA roles, proper focus management

### Features
- **Responsive Design**: Automatically switches between sidebar and bottom navigation
- **Keyboard Navigation**: Arrow keys, Home, End support for tab navigation
- **Active State Management**: Visual indication of current tab
- **Accessibility**: Proper ARIA roles and labels for screen readers
- **Smooth Transitions**: CSS transitions for hover and focus states

### Props
```typescript
interface NavigationProps {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
}
```

### Desktop Implementation (Sidebar)
- Fixed position on left side of screen
- Width of 256px (w-64)
- Background with backdrop blur effect
- Vertical tab list with icons and labels
- Active state highlighting with emerald accent

### Mobile Implementation (Bottom Nav)
- Fixed position at bottom of screen
- Full-width container with max-width constraint
- Horizontal tab list with icons and labels
- Active state highlighting with emerald accent
- Thumb-friendly touch targets

### Keyboard Navigation
- **ArrowRight/ArrowDown**: Move to next tab
- **ArrowLeft/ArrowUp**: Move to previous tab
- **Home**: Jump to first tab
- **End**: Jump to last tab

### Usage Example
```tsx
<Navigation 
  activeTab={activeTab} 
  setActiveTab={setActiveTab} 
/>
```

## 4. ChatBar Component

### Purpose
AI-powered chat interface that integrates with Google's Gemini API to provide contextual assistance.

### Implementation Details
- **Location**: `src/components/ChatBar.tsx`
- **Dependencies**: React, Button component
- **Accessibility**: Proper labeling, focus management, keyboard support

### Props
```typescript
interface ChatBarProps {
  apiKey: boolean;
  onSend: (message: string) => void;
  isLoading: boolean;
  displayMessage: string;
  suggestions?: string[];
}
```

### Features
- **AI Avatar**: Visual representation of the AI assistant
- **Loading States**: Animated spinner during processing
- **Suggestion Chips**: Interactive suggestion buttons for common questions
- **Message Display**: Styled container for AI responses
- **Input Field**: Text input with proper validation and disabled states
- **Send Button**: Action button with icon

### States
1. **Empty State**: Prompt for user to ask a question
2. **Loading State**: Processing indicator with status message
3. **Response State**: Display of AI-generated response
4. **Error State**: Display of error messages

### Suggestion System
- Configurable array of suggestion strings
- Click-to-fill functionality for input field
- Visual styling to distinguish from regular buttons

### Usage Example
```tsx
<ChatBar
  apiKey={!!apiKey}
  onSend={handleSendAI}
  isLoading={aiLoading}
  displayMessage={aiMessage}
  suggestions={chatSuggestions}
/>
```

## 5. SetupTab Component

### Purpose
Main configuration interface for setting up nutrient calculations with water, growth stage, and fertilizer selections.

### Implementation Details
- **Location**: `src/components/SetupTab.tsx`
- **Dependencies**: React, Card components, Button component, FertilizerManager, WaterInput
- **Hooks**: useState, useEffect, useToasts, useAppSettings

### Features
- **Basic Settings Panel**: Water volume, growth stage, water type selection
- **Custom Water Profile**: Detailed input for user-defined water composition
- **Fertilizer Management**: Interface for selecting and configuring fertilizers
- **Results Display**: Visual presentation of calculated nutrient values
- **Action Buttons**: Export, import, auto-optimize, and clear data functions

### Sections
1. **Grundeinstellungen (Basic Settings)**
   - Water volume input with unit conversion
   - Growth stage selection dropdown
   - Water type selection with custom option

2. **Eigenes Wasserprofil (Custom Water Profile)**
   - Detailed input fields for mineral content
   - Real-time validation and feedback

3. **Dünger & Dosierung (Fertilizer & Dosage)**
   - Fertilizer selection interface
   - Amount adjustment controls
   - Activation toggles

4. **Berechnete Hauptwerte (Calculated Main Values)**
   - Visual display of key nutrient values
   - Color-coded status indicators

### Data Management Features
- **Export Functionality**: Save current setup as JSON file
- **Import Functionality**: Load setup from JSON file
- **Auto-Optimize**: Load recommended fertilizer amounts based on growth stage
- **Clear All Data**: Reset all user inputs and selections

### Usage Example
```tsx
<SetupTab
  NUTRIENT_FIELDS={NUTRIENT_FIELDS}
  GROWTH_STAGES={GROWTH_STAGES}
  WATER_TYPES={WATER_TYPES}
  fertilizerDatabase={fertilizerDatabase}
  onAnalysisUpdate={handleAnalysisUpdate}
  mixedWater={mixedWater}
/>
```

## 6. FertilizerTab Component

### Purpose
Interface for managing custom fertilizer definitions with detailed composition data.

### Implementation Details
- **Location**: `src/components/FertilizerTab.tsx`
- **Dependencies**: React, Button component, useToasts hook
- **Storage**: LocalStorage persistence for custom fertilizers

### Features
- **Fertilizer Creation Form**: Input fields for all fertilizer properties
- **Composition Editor**: Detailed nutrient composition inputs
- **Custom Fertilizer List**: Display of user-created fertilizers
- **Edit/Delete Functionality**: Modify or remove existing fertilizers
- **Validation**: Input validation and error handling

### Form Fields
1. **Name**: Descriptive name for the fertilizer
2. **Type**: Liquid or powder selection
3. **Unit**: Measurement unit (ml, g, %)
4. **Composition**: N, P, K percentage values
5. **Concentration**: Strength of the fertilizer solution
6. **Description**: Optional descriptive text

### Data Management
- **LocalStorage Integration**: Automatic saving and loading
- **ID Generation**: Unique identifiers for each custom fertilizer
- **Refresh Mechanism**: Update main fertilizer database when changes occur

### Usage Example
```tsx
<FertilizerTab refreshFertilizerDatabase={refreshFertilizerDatabase} />
```

## 7. AnalysisTab Component

### Purpose
Detailed analysis of nutrient calculations with status indicators and optimization suggestions.

### Implementation Details
- **Location**: `src/components/AnalysisTab.tsx`
- **Dependencies**: React, nutrientUtils
- **Utilities**: getNutrientStatus, getStatusColor functions

### Features
- **Nutrient Table**: Detailed breakdown of all calculated nutrients
- **Status Indicators**: Color-coded status for each nutrient
- **Optimal Range Display**: Target ranges for current growth stage
- **Warning System**: Highlighting of suboptimal nutrients
- **Optimization Tips**: Suggestions for improving nutrient profiles

### Data Presentation
- **Tabular Format**: Structured display of nutrient data
- **Color Coding**: Visual feedback for nutrient status
- **Range Comparison**: Current values vs. optimal ranges
- **Status Labels**: Clear textual indicators (Optimal, Achtung, Unbekannt)

### Analysis Logic
- **Range Checking**: Comparison against growth stage targets
- **Status Determination**: Optimal vs. suboptimal classification
- **Warning Generation**: Identification of nutrients outside ranges
- **Tip Generation**: Contextual suggestions for improvement

### Usage Example
```tsx
<AnalysisTab {...analysisInputs} />
```

## 8. MixingAssistant Component

### Purpose
Step-by-step wizard for creating nutrient solutions with guided process and live feedback.

### Implementation Details
- **Location**: `src/components/MixingAssistant.tsx`
- **Dependencies**: React, Button component, NutrientBarChart, calculateNutrients utility
- **State Management**: Multi-step process with useState hooks

### Features
- **Stepper Interface**: Three-step process (Water/Phase, Fertilizers, Instructions)
- **Live Calculation**: Real-time nutrient value updates
- **Visual Feedback**: NutrientBarChart for immediate results
- **Mixing Instructions**: Generated step-by-step guide
- **Export Functionality**: Save mix as JSON file

### Steps
1. **Water & Phase Configuration**
   - Water volume input
   - Water type selection
   - Growth stage selection

2. **Fertilizer Selection**
   - Fertilizer database browsing
   - Amount adjustment controls
   - Live nutrient visualization

3. **Mixing Instructions**
   - Generated step-by-step guide
   - Summary of all ingredients
   - Export option for future reference

### Visualization
- **NutrientBarChart Integration**: Real-time chart updates
- **Progress Indicators**: Visual stepper showing current step
- **Summary Display**: Clear presentation of all selected inputs

### Usage Example
```tsx
<MixingAssistant
  fertilizerDatabase={fertilizerDatabase}
  GROWTH_STAGES={GROWTH_STAGES}
  WATER_TYPES={WATER_TYPES}
/>
```

## 9. WateringScheduler Component

### Purpose
Calendar-based system for planning and tracking watering activities.

### Implementation Details
- **Location**: `src/components/WateringScheduler.tsx`
- **Dependencies**: React, Button component
- **Storage**: LocalStorage persistence for watering events

### Features
- **Event Creation Form**: Date, time, amount, and notes inputs
- **Event List Display**: Sorted list of upcoming watering events
- **Edit/Delete Functionality**: Modify or remove existing events
- **Date Validation**: Minimum date restriction to prevent past scheduling
- **Persistent Storage**: Automatic saving and loading of events

### Form Fields
1. **Date**: Calendar date picker with future-only restriction
2. **Time**: Time selector for precise scheduling
3. **Amount**: Water volume in liters
4. **Notes**: Optional descriptive text for context

### Event Management
- **Sorting**: Chronological ordering of events
- **Editing**: Inline editing of existing events
- **Deletion**: Removal of cancelled or completed events
- **Validation**: Required field checking and error prevention

### Usage Example
```tsx
<WateringScheduler />
```

## 10. SettingsPage Component

### Purpose
Centralized configuration interface for user preferences and API settings.

### Implementation Details
- **Location**: `src/components/SettingsPage.tsx`
- **Dependencies**: React, Button component, useApiKey hook, useAppSettings hook
- **Hooks**: Custom hooks for API key and app settings management

### Features
- **API Key Management**: Secure storage of Gemini API key
- **Unit Preferences**: Selection between metric and imperial units
- **Default Values**: Configuration of preferred defaults for common inputs
- **Theme Toggle**: Switch between light and dark modes
- **Validation**: Input validation and error handling

### Settings Categories
1. **Gemini API Key**
   - Text input for API key
   - Save and remove functionality
   - Security note about local storage

2. **Unit Preferences**
   - Water volume unit selection (Liters/Gallons)

3. **Default Values**
   - Water amount default
   - Growth phase default
   - Water type default

4. **Theme Settings**
   - Dark/light mode toggle
   - Current theme status display

### Data Management
- **LocalStorage Integration**: Automatic saving and loading
- **Validation**: Input sanitization and error prevention
- **Security**: Client-side only storage of sensitive data

### Usage Example
```tsx
<SettingsPage />
```

## 11. NutrientBarChart Component

### Purpose
Visual representation of nutrient values with comparison to optimal ranges.

### Implementation Details
- **Location**: `src/components/NutrientBarChart.tsx`
- **Dependencies**: React, nutrientUtils
- **Utilities**: getNutrientStatus, getProgressBarWidth functions

### Features
- **Horizontal Progress Bars**: Visual representation of nutrient levels
- **Color Coding**: Status-based coloring (green/yellow/red)
- **Range Indicators**: Markers for optimal range boundaries
- **Value Display**: Current values with units and ranges
- **Accessibility**: Proper ARIA attributes for screen readers

### Data Visualization
- **Progress Calculation**: Width based on value vs. maximum target
- **Status Determination**: Color based on value vs. optimal range
- **Range Markers**: Visual indicators for minimum and maximum targets
- **Label Information**: Clear identification of nutrients and units

### Props
```typescript
interface NutrientBarChartProps {
  nutrients?: Record<string, number>;
  stage?: Record<string, [number, number]>;
  fields?: Array<{ key: string; label: string; unit: string }>;
}
```

### Usage Example
```tsx
<NutrientBarChart
  nutrients={nutrientResults.nutrients}
  stage={nutrientResults.stage}
  fields={[
    { key: 'n', label: 'N (Stickstoff)', unit: 'ppm' },
    { key: 'p', label: 'P (Phosphor)', unit: 'ppm' },
    { key: 'k', label: 'K (Kalium)', unit: 'ppm' },
    { key: 'ec', label: 'EC', unit: 'mS/cm' },
    { key: 'ph', label: 'pH', unit: '' },
  ]}
/>
```

## 12. Context Providers

### ThemeContext
- **Purpose**: Global theme management (light/dark mode)
- **Location**: `src/contexts/ThemeContext.tsx`
- **Features**: System preference detection, localStorage persistence

### ToastContext
- **Purpose**: Notification system for user feedback
- **Location**: `src/contexts/ToastContext.tsx`
- **Features**: Multiple notification types, auto-dismissal, manual removal

### WaterContext
- **Purpose**: Global water data management
- **Location**: `src/contexts/WaterContext.tsx`
- **Features**: Water mixing calculations, data sharing across components

### DataPersistenceContext
- **Purpose**: Centralized data persistence management
- **Location**: `src/contexts/DataPersistenceContext.tsx`
- **Features**: Cross-tab synchronization, localStorage management

## 13. Custom Hooks

### useApiKey
- **Purpose**: Secure API key management
- **Location**: `src/hooks/useApiKey.ts`
- **Features**: Encryption, localStorage storage, validation

### useAppSettings
- **Purpose**: Application settings management
- **Location**: `src/hooks/useAppSettings.ts`
- **Features**: Default value management, localStorage persistence

### useLocalStorage
- **Purpose**: Generic localStorage hook
- **Location**: `src/hooks/useLocalStorage.ts`
- **Features**: Type-safe storage, automatic serialization

### useDebounce
- **Purpose**: Debounced value updates
- **Location**: `src/hooks/useDebounce.ts`
- **Features**: Performance optimization, delayed updates

## Component Development Guidelines

### Best Practices
1. **TypeScript First**: All components should have proper TypeScript interfaces
2. **Accessibility**: Include proper ARIA attributes and keyboard support
3. **Design System**: Use design tokens instead of arbitrary values
4. **Reusability**: Create flexible, configurable components
5. **Performance**: Implement React.memo for expensive components

### Styling Guidelines
1. **Utility Classes**: Prefer Tailwind CSS utility classes over custom CSS
2. **CVA Integration**: Use class-variance-authority for variant management
3. **Responsive Design**: Mobile-first approach with responsive utilities
4. **State Management**: Proper hover, focus, and disabled states

### Testing Requirements
1. **Unit Tests**: Test component behavior and props
2. **Accessibility Tests**: Verify keyboard navigation and screen reader support
3. **Visual Regression**: Ensure consistent appearance across updates
4. **Integration Tests**: Test component interactions with context/providers