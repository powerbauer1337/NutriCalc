# NutriCalc Core Features and Functionality

## 1. Nutrient Calculation Engine

### Overview
The nutrient calculation engine is the core functionality of NutriCalc, responsible for calculating precise nutrient concentrations based on user inputs. It takes into account water volume, growth phase, water type, and selected fertilizers to produce accurate nutrient profiles.

### Inputs
- **Water Volume**: Amount of water in liters or gallons
- **Growth Phase**: Current plant growth stage (early vegetative, late vegetative, early flowering, mid flowering, late flowering)
- **Water Type**: Type of water used (reverse osmosis, tap water, custom profile)
- **Selected Fertilizers**: List of fertilizers with their respective amounts
- **Custom Water Profile**: Optional user-defined water composition (Ca, Mg, S, etc.)

### Outputs
- **Macro Nutrients**: Nitrogen (N), Phosphorus (P), Potassium (K) concentrations in ppm
- **Micro Nutrients**: Calcium (Ca), Magnesium (Mg), Sulfur (S), Iron (Fe), Manganese (Mn), Zinc (Zn), Copper (Cu), Boron (B), Molybdenum (Mo) concentrations in ppm
- **Electrical Conductivity (EC)**: Measured in mS/cm
- **pH Value**: Acidity/alkalinity level
- **Nutrient Contributions**: Breakdown of how each fertilizer contributes to the final nutrient profile

### Calculation Methodology
1. **Base Water Composition**: Determines initial nutrient levels based on water type or custom profile
2. **Fertilizer Addition**: Calculates nutrient contribution from each selected fertilizer based on:
   - Fertilizer type (liquid/powder)
   - Amount used
   - Concentration values
3. **EC Calculation**: Computes electrical conductivity based on total dissolved solids
4. **Final Adjustment**: Applies any necessary adjustments for optimal nutrient uptake

## 2. Fertilizer Management System

### Overview
The fertilizer management system allows users to create, edit, and manage both predefined and custom fertilizers with detailed composition data.

### Predefined Fertilizers
- Extensive database of commercial fertilizers from brands like Atami, Athena, BioBizz
- Includes complete nutrient composition data for each product
- Ready-to-use formulations for common growing scenarios

### Custom Fertilizer Creation
#### Required Fields
- **Name**: Descriptive name for the fertilizer
- **Type**: Liquid or powder formulation
- **Unit**: Measurement unit (ml for liquids, g for powders, % for concentrations)
- **Composition**: Detailed nutrient breakdown including:
  - Macro nutrients: N, P, K
  - Secondary nutrients: Ca, Mg, S
  - Micro nutrients: Fe, Mn, Zn, Cu, B, Mo
- **Concentration**: Strength of the fertilizer solution

#### Management Features
- **Add New**: Create custom fertilizers with complete composition data
- **Edit Existing**: Modify previously created fertilizers
- **Delete**: Remove custom fertilizers from the database
- **Persistent Storage**: All custom fertilizers saved in browser LocalStorage

### Fertilizer Selection Interface
- Searchable list of available fertilizers
- Quick-add functionality for common products
- Amount adjustment controls with proper units
- Activation/deactivation toggles for selective use

## 3. Growth Stage Optimization

### Overview
NutriCalc provides tailored nutrient profiles for different plant growth phases, ensuring optimal nutrition throughout the plant lifecycle.

### Available Growth Stages
1. **Early Vegetative**
   - Target N: 100-150 ppm
   - Target P: 30-50 ppm
   - Target K: 100-150 ppm
   - Target EC: 0.8-1.2 mS/cm

2. **Late Vegetative**
   - Target N: 150-200 ppm
   - Target P: 50-70 ppm
   - Target K: 150-200 ppm
   - Target EC: 1.2-1.6 mS/cm

3. **Early Flowering**
   - Target N: 100-150 ppm
   - Target P: 70-90 ppm
   - Target K: 200-250 ppm
   - Target EC: 1.4-1.8 mS/cm

4. **Mid Flowering**
   - Target N: 80-120 ppm
   - Target P: 90-110 ppm
   - Target K: 250-300 ppm
   - Target EC: 1.6-2.0 mS/cm

5. **Late Flowering**
   - Target N: 50-80 ppm
   - Target P: 110-130 ppm
   - Target K: 300-350 ppm
   - Target EC: 1.8-2.2 mS/cm

### Optimization Features
- Automatic comparison of calculated values against target ranges
- Visual indicators for nutrients within/outside optimal ranges
- Smart recommendations for adjusting fertilizer amounts
- Growth stage-specific fertilizer suggestions

## 4. Water Mixing System

### Overview
The water mixing system allows users to combine different water sources to create custom water profiles with precise control over pH, EC, and mineral content.

### Supported Water Sources
- **Reverse Osmosis (RO)**: Pure water with minimal minerals
- **Tap Water**: Municipal water with varying mineral content
- **Custom Profiles**: User-defined water compositions

### Custom Water Profile Parameters
- **Calcium (Ca)**: Essential for cell wall structure
- **Magnesium (Mg)**: Central component of chlorophyll
- **Sulfur (S)**: Important for protein synthesis
- **Sodium (Na)**: Should be minimized in most applications
- **Chlorine (Cl)**: Can be harmful in high concentrations
- **Nitrate (NO3)**: Alternative nitrogen source
- **Sulfate (SO4)**: Sulfur delivery mechanism
- **Phosphate (PO4)**: Phosphorus delivery mechanism
- **Base EC**: Starting electrical conductivity
- **pH**: Acidity/alkalinity level

### Mixing Process
1. **Source Selection**: Choose water sources to mix
2. **Proportion Setting**: Define ratio of each water source
3. **Automatic Calculation**: System computes resulting water profile
4. **Result Display**: Show final pH, EC, and mineral content
5. **Integration**: Mixed water profile used in nutrient calculations

## 5. Visual Analysis and Reporting

### Overview
NutriCalc provides comprehensive visual analysis tools to help users understand and optimize their nutrient solutions.

### Data Visualization Components
- **Nutrient Bar Charts**: Horizontal progress bars showing current values against optimal ranges
- **Nutrient Tables**: Detailed tabular data with status indicators
- **Contribution Analysis**: Breakdown of how each fertilizer contributes to the final mix
- **Comparison Charts**: Visual comparison of current vs. target nutrient levels

### Status Indicators
- **Optimal**: Nutrient levels within target range (green)
- **Suboptimal**: Nutrient levels outside target range (yellow/red)
- **Deficient**: Nutrient levels below minimum requirements (red)
- **Excessive**: Nutrient levels above maximum safe limits (red)

### Analysis Features
- Real-time updates as inputs change
- Color-coded visual feedback for quick assessment
- Detailed tooltips with additional information
- Export functionality for sharing results

## 6. AI-Powered Assistant

### Overview
The integrated AI assistant provides intelligent recommendations and contextual help using Google's Gemini AI technology.

### Core Capabilities
- **Contextual Understanding**: Receives current calculator data for relevant responses
- **Nutrient Expertise**: Knowledge of plant nutrition and fertilizer science
- **Troubleshooting Assistance**: Help with common growing problems
- **Recommendation Engine**: Suggestions for optimizing nutrient solutions

### Interaction Features
- **Natural Language Processing**: Understands questions in plain language
- **Smart Suggestions**: Predefined question prompts for common inquiries
- **Real-time Responses**: Instant feedback on user queries
- **Educational Content**: Explanations of nutrient functions and interactions

### Supported Query Types
- Nutrient calculation questions
- Fertilizer selection guidance
- Problem diagnosis (deficiencies, toxicities)
- Growing technique recommendations
- General plant care advice

## 7. Recipe Management

### Overview
The recipe management system allows users to save, load, and share complete nutrient solution configurations.

### Recipe Components
- Water volume and type settings
- Selected growth phase
- Custom water profile (if applicable)
- List of fertilizers with amounts
- Additional notes and metadata

### Export Features
- **JSON Format**: Structured data export for easy sharing
- **Complete Data**: All settings and customizations included
- **Version Tracking**: Recipe version information for compatibility
- **Cross-Platform**: Compatible with different installations

### Import Features
- **File Validation**: Checks for proper format and data integrity
- **Conflict Resolution**: Handles duplicate or conflicting data
- **Automatic Updates**: Refreshes UI with imported settings
- **Error Handling**: Graceful handling of corrupted or invalid files

## 8. Watering Scheduler

### Overview
The watering scheduler helps users plan and track watering activities for their plants.

### Scheduling Features
- **Date and Time Setting**: Precise scheduling of watering events
- **Volume Tracking**: Record amount of water used per session
- **Note Taking**: Add contextual information about each watering
- **Reminder System**: Visual indicators for upcoming scheduled events

### Management Capabilities
- **Add New Events**: Create future watering schedules
- **Edit Existing**: Modify planned watering sessions
- **Delete Events**: Remove cancelled or completed sessions
- **Sort and Filter**: Organize events by date or other criteria

### Data Persistence
- **Local Storage**: All schedule data saved in browser
- **Automatic Sync**: Updates across browser tabs in real-time
- **Export Options**: Backup schedules as JSON files
- **Import Functionality**: Restore schedules from backup files

## 9. User Preferences and Settings

### Overview
Comprehensive settings system allowing users to customize their NutriCalc experience.

### Personalization Options
- **Unit Preferences**: Choose between metric (liters) and imperial (gallons) units
- **Theme Selection**: Light or dark mode interface
- **Default Values**: Set preferred defaults for common inputs
- **Notification Controls**: Manage toast message preferences

### API Integration Settings
- **Gemini API Key Management**: Secure storage of user API keys
- **Key Validation**: Verification of API key validity
- **Error Handling**: Proper handling of API-related issues
- **Privacy Protection**: Local-only storage of sensitive credentials

### Data Management
- **Local Storage Controls**: View and manage stored data
- **Backup and Restore**: Export/import all user data
- **Reset Options**: Clear specific or all user data
- **Privacy Compliance**: No server-side data storage

## 10. Responsive Design and Accessibility

### Overview
NutriCalc is designed to work seamlessly across all device types and provide an inclusive experience for all users.

### Device Compatibility
- **Desktop**: Full-featured interface with sidebar navigation
- **Tablet**: Optimized touch interface with adaptive layouts
- **Mobile**: Streamlined interface with bottom navigation
- **Cross-Browser**: Consistent experience across modern browsers

### Accessibility Features
- **WCAG 2.1 AA Compliance**: Meets international accessibility standards
- **Keyboard Navigation**: Full functionality without mouse input
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **High Contrast Mode**: Enhanced visibility options
- **Focus Management**: Clear visual indicators for interactive elements
- **Reduced Motion**: Respect for user motion preferences

### Internationalization
- **Multi-Language Support**: Currently available in German and English
- **RTL Support**: Right-to-left language compatibility
- **Cultural Adaptation**: Locale-appropriate formatting and conventions
- **Translation Framework**: Easy addition of new languages