# NutriCalc User Guide

## Table of Contents
1. [Getting Started](#getting-started)
2. [Setup Tab - Basic Configuration](#setup-tab---basic-configuration)
3. [Fertilizer Management](#fertilizer-management)
4. [Analysis and Results](#analysis-and-results)
5. [Mixing Assistant](#mixing-assistant)
6. [Watering Scheduler](#watering-scheduler)
7. [Settings Configuration](#settings-configuration)
8. [AI Assistant](#ai-assistant)
9. [Data Import/Export](#data-importexport)
10. [Tips and Best Practices](#tips-and-best-practices)

## Getting Started

### System Requirements
NutriCalc runs directly in modern web browsers and requires no installation:
- Google Chrome 88+
- Mozilla Firefox 85+
- Apple Safari 14+
- Microsoft Edge 88+

### Opening the Application
1. Download the latest version of NutriCalc from the official source
2. Locate the downloaded HTML file (e.g., `NutriCalc-v1.0.html`)
3. Double-click the file to open it in your default browser
4. The application will load and be ready to use immediately

### Initial Setup
Upon first launch, you'll see the main interface with several tabs:
- **Setup**: Main configuration panel
- **Details**: Detailed nutrient analysis
- **Analyse**: Visual nutrient analysis
- **Dünger**: Fertilizer management
- **Einstellungen**: Application settings
- **Misch-Assistent**: Step-by-step mixing guide
- **Gießplaner**: Watering schedule manager
- **Referenzen**: Reference information

## Setup Tab - Basic Configuration

### Configuring Basic Settings
The Setup tab is where you'll configure the fundamental parameters for your nutrient solution:

#### 1. Water Volume
- Enter the total volume of water you plan to use
- Units can be set to Liters or Gallons in Settings
- Minimum value is 0.1 to prevent calculation errors
- Example: For a 10-liter batch, enter "10"

#### 2. Growth Stage Selection
Choose the current growth phase of your plants:
- **Frühe Vegetation**: Early vegetative growth
- **Späte Vegetation**: Late vegetative growth
- **Frühe Blüte**: Early flowering stage
- **Mittlere Blüte**: Mid flowering stage
- **Späte Blüte**: Late flowering stage

Each stage has different optimal nutrient requirements.

#### 3. Water Type Selection
Select the type of water you're using:
- **Umkehrosmose**: Reverse osmosis water (pure water)
- **Leitungswasser**: Tap water (contains minerals)
- **Eigenes Profil**: Custom water profile (define your own)

### Custom Water Profile
If you select "Eigenes Profil," you can define your water's exact composition:

1. **Calcium (Ca)**: Enter concentration in ppm
2. **Magnesium (Mg)**: Enter concentration in ppm
3. **Sulfur (S)**: Enter concentration in ppm
4. **Sodium (Na)**: Enter concentration in ppm
5. **Chlorine (Cl)**: Enter concentration in ppm
6. **Nitrate (NO3)**: Enter concentration in ppm
7. **Sulfate (SO4)**: Enter concentration in ppm
8. **Phosphate (PO4)**: Enter concentration in ppm
9. **Base EC**: Starting electrical conductivity in mS/cm
10. **pH**: Water's pH level

### Water Mixing
The Water Mixing feature allows you to combine different water sources:

1. Navigate to the Water Mixing section in Setup
2. Add water sources by specifying:
   - Water type
   - Volume percentage
   - Custom parameters (if applicable)
3. The system automatically calculates the resulting water profile
4. The mixed water profile is used in nutrient calculations

## Fertilizer Management

### Adding Fertilizers
1. Go to the "Dünger" tab
2. Browse the predefined fertilizer database
3. Click on fertilizers to add them to your current setup
4. Adjust amounts using the controls in the Setup tab

### Creating Custom Fertilizers
1. Navigate to the "Dünger" tab
2. Fill in the fertilizer creation form:
   - **Name**: Descriptive name for your fertilizer
   - **Type**: Liquid or Powder
   - **Unit**: ml for liquids, g for powders, % for concentrations
   - **N (Nitrogen)**: Percentage content
   - **P (Phosphorus)**: Percentage content
   - **K (Potassium)**: Percentage content
   - **Concentration**: Strength of the fertilizer
   - **Description**: Optional notes about the fertilizer
3. Click "Hinzufügen" to save your custom fertilizer

### Editing Custom Fertilizers
1. In the "Dünger" tab, locate your custom fertilizer
2. Click the "Bearbeiten" button next to the fertilizer
3. Modify any fields as needed
4. Click "Speichern" to update the fertilizer

### Removing Custom Fertilizers
1. In the "Dünger" tab, locate the fertilizer you want to remove
2. Click the "Löschen" button next to the fertilizer
3. Confirm deletion when prompted

### Using Fertilizers in Calculations
1. Return to the "Setup" tab
2. Your custom fertilizers will appear in the fertilizer selection
3. Add fertilizers by clicking on them
4. Adjust amounts using the numeric input fields
5. Toggle fertilizers on/off using the checkboxes

## Analysis and Results

### Viewing Nutrient Analysis
The "Analyse" tab provides a detailed breakdown of your nutrient solution:

#### Nutrient Table
- Shows current nutrient levels compared to optimal ranges
- Color-coded status indicators (Green=Optimal, Yellow=Suboptimal)
- Detailed breakdown of N, P, K, and micronutrient levels

#### Visual Analysis
- Bar charts showing nutrient levels relative to optimal ranges
- Color-coded bars for quick visual assessment
- Range markers indicating target zones

#### Optimization Tips
- Automatic suggestions for improving your nutrient profile
- Warnings about nutrients outside optimal ranges
- Recommendations based on growth stage

### Detailed Analysis
The "Details" tab provides additional information about micronutrient levels and advanced metrics.

## Mixing Assistant

### Using the Step-by-Step Guide
The Mixing Assistant simplifies the process of creating nutrient solutions:

#### Step 1: Water and Phase Configuration
1. Enter the total water volume
2. Select your water type
3. Choose the appropriate growth stage
4. Click "Weiter" to proceed

#### Step 2: Fertilizer Selection
1. Browse available fertilizers
2. Click to add fertilizers to your mix
3. Adjust amounts for each fertilizer
4. View live nutrient calculations
5. Click "Weiter" when satisfied with your selection

#### Step 3: Mixing Instructions
1. Review the generated mixing instructions
2. Follow the step-by-step guide for preparing your solution
3. Export your mix as a JSON file for future reference

### Benefits of the Mixing Assistant
- Guided process reduces errors
- Live feedback shows results immediately
- Export functionality saves your recipes
- Visual confirmation of nutrient levels

## Watering Scheduler

### Creating Watering Events
1. Navigate to the "Gießplaner" tab
2. Fill in the watering event form:
   - **Date**: Select the date for watering
   - **Time**: Set the time for watering
   - **Amount**: Enter the volume of water to use
   - **Notes**: Add any relevant information
3. Click "Hinzufügen" to save the event

### Managing Scheduled Events
- **View Events**: All scheduled events appear in chronological order
- **Edit Events**: Click "Bearbeiten" to modify event details
- **Delete Events**: Click "Löschen" to remove events
- **Automatic Sorting**: Events are automatically sorted by date and time

### Best Practices for Watering Scheduling
- Schedule events in advance for consistent care
- Add notes about environmental conditions
- Track actual vs. planned watering amounts
- Regularly review and update your schedule

## Settings Configuration

### API Key Management
To use the AI Assistant features:

1. Obtain a Google Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Navigate to the "Einstellungen" tab
3. Paste your API key in the "Gemini API Key" field
4. Click "Speichern" to store your key securely

**Important Security Note**: Your API key is stored only in your browser's LocalStorage and is never transmitted to any server except Google's API.

### Unit Preferences
Customize your measurement preferences:

1. **Water Volume Units**: Choose between Liters and Gallons
2. **Default Water Amount**: Set your preferred default water volume
3. **Default Growth Phase**: Set your most commonly used growth stage
4. **Default Water Type**: Set your most commonly used water type

### Theme Settings
Personalize the application's appearance:

1. Toggle between Light and Dark modes
2. Your preference is saved automatically
3. The application respects your system's theme preference by default

## AI Assistant

### Accessing the AI Assistant
The AI Assistant is available at the top of every tab in the chat bar interface.

### Asking Questions
1. Type your question in the input field at the bottom of the chat
2. Click the "Fragen" button or press Enter to submit
3. The AI will process your question and provide a response
4. Previous conversations remain visible for reference

### Sample Questions
- "Wie erstelle ich einen Dünger?" (How do I create a fertilizer?)
- "Ist mein N-Wert ok?" (Is my N value okay?)
- "Was ist EC?" (What is EC?)
- "Welche Dünger brauche ich in der Blüte?" (Which fertilizers do I need during flowering?)

### Contextual Awareness
The AI Assistant automatically receives information about your current setup, including:
- Selected growth stage
- Water type and volume
- Chosen fertilizers and amounts
- Current nutrient calculations

This allows the AI to provide more relevant and specific advice.

## Data Import/Export

### Exporting Your Setup
1. In the Setup tab, click "Daten exportieren"
2. Your browser will download a JSON file containing:
   - Selected fertilizers and amounts
   - Water volume and type settings
   - Growth stage selection
   - Custom water profile (if applicable)
   - Custom fertilizers you've created
3. Save this file for future use or sharing

### Importing a Setup
1. In the Setup tab, click "Daten importieren"
2. Select a previously exported JSON file
3. The application will load all settings from the file
4. Review and adjust settings as needed

### Recipe Management
- **Backup**: Regularly export your setups to prevent data loss
- **Sharing**: Share your successful recipes with other growers
- **Version Control**: Keep multiple versions of your favorite recipes
- **Organization**: Maintain a library of different nutrient solutions

## Tips and Best Practices

### For Accurate Calculations
1. **Measure Water Volume Precisely**: Use accurate measuring tools
2. **Know Your Water Quality**: Test your water source regularly
3. **Follow Fertilizer Instructions**: Stick to manufacturer guidelines
4. **Monitor pH Levels**: Check and adjust pH after mixing
5. **Track Results**: Keep records of what works best for your plants

### For Optimal Plant Health
1. **Start with Lower Concentrations**: Gradually increase nutrient strength
2. **Adjust Based on Plant Response**: Watch for signs of deficiency or toxicity
3. **Maintain Consistent Watering**: Regular feeding schedules promote healthy growth
4. **Flush Periodically**: Rinse plants with plain water occasionally
5. **Consider Environmental Factors**: Temperature, humidity, and light affect nutrient uptake

### For Using NutriCalc Effectively
1. **Regular Updates**: Keep your custom fertilizer database current
2. **Use the AI Assistant**: Take advantage of contextual help and advice
3. **Schedule Watering**: Use the Gießplaner to maintain consistent care
4. **Save Successful Recipes**: Export and label your best formulations
5. **Experiment Safely**: Make gradual changes and monitor results

### Troubleshooting Common Issues
1. **Unexpected Nutrient Levels**: Double-check water type and fertilizer amounts
2. **AI Not Responding**: Verify your API key is valid and properly entered
3. **Data Not Saving**: Ensure your browser allows LocalStorage
4. **Interface Problems**: Try refreshing the page or clearing browser cache
5. **Calculation Errors**: Verify all input values are valid numbers

### Advanced Features
1. **Custom Water Profiles**: Create precise formulations for unique water sources
2. **Water Mixing**: Combine different water types for optimal composition
3. **Detailed Analysis**: Use the Details tab for comprehensive nutrient breakdown
4. **Mixing Assistant**: Follow guided instructions for complex formulations
5. **Community Sharing**: Export and share successful recipes with others

By following this guide, you'll be able to make the most of NutriCalc's features to optimize your plant nutrition and achieve better growing results.