# AI-Powered Cultivation Assistant Integration Guide

## Overview

The AI-Powered Cultivation Assistant provides intelligent cannabis growing guidance integrated seamlessly with NutriCalc's nutrient calculation system. It offers real-time advice, problem diagnosis, and cultivation planning through multiple AI providers.

## Features

### 🤖 **Core AI Capabilities**
- **Conversational Interface**: Natural language chat with cannabis cultivation expertise
- **Context-Aware Guidance**: Recommendations based on current nutrient calculations
- **Multi-Language Support**: German and English language support
- **Problem Diagnosis**: AI-powered troubleshooting for cultivation issues
- **Proactive Alerts**: Automatic notifications for critical issues

### 🧠 **AI Providers Supported**
- **Google Gemini**: Advanced reasoning and cannabis knowledge
- **OpenAI GPT-4**: Comprehensive language understanding
- **Anthropic Claude**: Safe and helpful AI assistance

### 📱 **User Interface Components**
- **Floating Chat Widget**: Always-accessible chat button
- **Dedicated AI Tab**: Full-featured AI assistant interface
- **Settings Panel**: AI configuration and privacy controls
- **Mobile-Optimized**: Responsive design for all devices

## Quick Start

### 1. Basic Integration

```tsx
import AIAssistantIntegration from './components/AIAssistant';

function MyApp() {
  const [nutrients, setNutrients] = useState({
    n: 150, p: 50, k: 200, ca: 180, mg: 60, ec: 1.2, ph: 6.1
  });

  return (
    <div>
      {/* Your existing app */}
      
      <AIAssistantIntegration
        nutrients={nutrients}
        growthStage="late-veg"
        waterType="tap"
        waterVolume={20}
        selectedFertilizers={fertilizers}
        userLevel="intermediate"
        language="en"
        onNutrientAdjustment={(adjustments) => {
          setNutrients(prev => ({ ...prev, ...adjustments }));
        }}
      />
    </div>
  );
}
```

### 2. AI Assistant Tab

```tsx
import { AIAssistantTab } from './components/AIAssistant';

function SettingsPage() {
  return (
    <AIAssistantTab
      context={{
        nutrients,
        growthStage,
        waterType,
        waterVolume,
        selectedFertilizers,
        userLevel,
        language,
        environmentalData: {
          temperature: 24,
          humidity: 65,
          lightCycle: '18/6'
        }
      }}
    />
  );
}
```

### 3. Settings Configuration

```tsx
import AISettings from './components/AIAssistant/AISettings';

function SettingsPage() {
  return (
    <AISettings
      language="en"
      onSettingsChange={(settings) => {
        console.log('AI settings updated:', settings);
      }}
    />
  );
}
```

## API Configuration

### Setting Up AI Providers

#### Google Gemini (Recommended)
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add the key to AI Settings in NutriCalc

#### OpenAI GPT-4
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a new API key
3. Ensure you have GPT-4 access
4. Add the key to AI Settings

#### Anthropic Claude
1. Visit [Anthropic Console](https://console.anthropic.com/)
2. Create a new API key
3. Add the key to AI Settings

### Environment Variables (Optional)

```env
# Default AI provider
VITE_DEFAULT_AI_PROVIDER=gemini

# API keys (for development)
VITE_GEMINI_API_KEY=your_gemini_key
VITE_OPENAI_API_KEY=your_openai_key
VITE_CLAUDE_API_KEY=your_claude_key
```

## Advanced Usage

### Custom Context Data

```tsx
const advancedContext = {
  nutrients: currentNutrients,
  growthStage: 'flowering',
  waterType: 'ro',
  waterVolume: 50,
  selectedFertilizers: fertilizers,
  userLevel: 'expert',
  language: 'de',
  
  // Advanced environmental data
  environmentalData: {
    temperature: 22,
    humidity: 45,
    lightCycle: '12/12',
    ph: 6.2,
    ec: 1.6,
    co2: 1200,
    vpd: 1.2
  },
  
  // Grow tracking
  growWeek: 8,
  strainType: 'indica',
  plantCount: 4,
  
  // Custom metadata
  metadata: {
    growMethod: 'hydroponic',
    medium: 'rockwool',
    lightType: 'led'
  }
};
```

### Handling AI Recommendations

```tsx
const handleNutrientAdjustment = (adjustments: Record<string, number>) => {
  // Validate adjustments
  const validatedAdjustments = validateNutrientAdjustments(adjustments);
  
  // Apply with confirmation
  if (confirm('Apply AI-recommended nutrient adjustments?')) {
    setNutrients(prev => ({ ...prev, ...validatedAdjustments }));
    
    // Track for analytics
    trackEvent('ai_recommendation_applied', {
      type: 'nutrient_adjustment',
      adjustments: validatedAdjustments
    });
  }
};

const handleRecommendationApplied = (recommendation: any) => {
  switch (recommendation.type) {
    case 'environmental':
      // Handle environmental recommendations
      updateEnvironmentalSettings(recommendation.parameters);
      break;
      
    case 'training':
      // Handle plant training recommendations
      showTrainingGuidance(recommendation);
      break;
      
    case 'harvest':
      // Handle harvest timing recommendations
      scheduleHarvestReminder(recommendation);
      break;
  }
};
```

### Custom AI Prompts

```tsx
import { useAIAssistant } from './hooks/useAIAssistant';

function CustomAIInterface() {
  const { sendMessage, contextAnalysis } = useAIAssistant();
  
  const askSpecificQuestion = async () => {
    const response = await sendMessage(
      "Based on my current nutrient levels, what's the optimal feeding schedule for the next week?",
      context
    );
    
    console.log('AI Response:', response);
  };
  
  return (
    <button onClick={askSpecificQuestion}>
      Get Weekly Feeding Schedule
    </button>
  );
}
```

## Data Privacy & Security

### Local Data Storage
- All conversation history stored locally in browser
- No data sent to third parties except chosen AI provider
- User can clear all data at any time

### API Communication
- Secure HTTPS communication with AI providers
- No persistent storage of conversations on AI provider servers
- API keys stored securely in browser local storage

### GDPR Compliance
- Users can export conversation data
- Complete data deletion available
- Transparent data usage policies

## Troubleshooting

### Common Issues

#### API Key Not Working
```tsx
// Test API connection
const testConnection = async () => {
  try {
    const result = await aiService.testConnection();
    console.log('Connection test:', result);
  } catch (error) {
    console.error('Connection failed:', error);
  }
};
```

#### Context Not Updating
```tsx
// Force context analysis
const { analyzeContext } = useAIAssistant();

useEffect(() => {
  analyzeContext(currentContext);
}, [currentContext]);
```

#### Performance Issues
```tsx
// Optimize with debouncing
const debouncedContext = useDebounce(context, 500);

useEffect(() => {
  if (debouncedContext) {
    analyzeContext(debouncedContext);
  }
}, [debouncedContext]);
```

### Error Handling

```tsx
const { error, clearError } = useAIAssistant();

if (error) {
  return (
    <div className="error-container">
      <p>AI Assistant Error: {error}</p>
      <button onClick={clearError}>Retry</button>
    </div>
  );
}
```

## Performance Optimization

### Lazy Loading
```tsx
const AIAssistantTab = lazy(() => import('./components/AIAssistant/AIAssistantTab'));

function App() {
  return (
    <Suspense fallback={<div>Loading AI Assistant...</div>}>
      <AIAssistantTab context={context} />
    </Suspense>
  );
}
```

### Caching
```tsx
// Enable intelligent caching
const { sendMessage } = useAIAssistant({
  enableCaching: true,
  cacheTimeout: 300000 // 5 minutes
});
```

### Bundle Optimization
```javascript
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'ai-assistant': ['./src/components/AIAssistant'],
          'ai-services': ['./src/services/AIAssistantService']
        }
      }
    }
  }
});
```

## Analytics & Monitoring

### Usage Tracking
```tsx
const trackAIUsage = (event: string, data: any) => {
  // Track AI assistant usage
  analytics.track('ai_assistant_' + event, {
    ...data,
    timestamp: Date.now(),
    userLevel: context.userLevel,
    language: context.language
  });
};
```

### Performance Monitoring
```tsx
const { contextAnalysis } = useAIAssistant();

useEffect(() => {
  if (contextAnalysis) {
    // Monitor AI response quality
    trackAIUsage('context_analyzed', {
      confidence: contextAnalysis.confidence,
      alertCount: contextAnalysis.alerts.length,
      recommendationCount: contextAnalysis.recommendations.length
    });
  }
}, [contextAnalysis]);
```

## Contributing

### Adding New AI Providers
1. Extend `AIProvider` type in `AIAssistantService.ts`
2. Implement provider-specific connection logic
3. Add provider configuration to `AISettings.tsx`
4. Update documentation

### Extending Knowledge Base
1. Add new cultivation data to `CannabisKnowledgeBase.ts`
2. Update context analysis logic in `AIContextEngine.ts`
3. Test with various scenarios
4. Update documentation

### Custom Components
```tsx
// Create custom AI components
import { useAIAssistant } from './hooks/useAIAssistant';

function CustomAIWidget() {
  const { hasActiveAlerts, activeRecommendations } = useAIAssistant();
  
  return (
    <div className="custom-ai-widget">
      {hasActiveAlerts && <AlertIndicator />}
      {activeRecommendations.map(rec => (
        <RecommendationCard key={rec.id} recommendation={rec} />
      ))}
    </div>
  );
}
```

## Support

For issues, questions, or contributions:
- GitHub Issues: [NutriCalc Issues](https://github.com/powerbauer1337/NutriCalc/issues)
- Documentation: [Full Documentation](https://github.com/powerbauer1337/NutriCalc/docs)
- Community: [Discord Server](https://discord.gg/nutriCalc)

## License

This AI Assistant integration is part of NutriCalc and follows the same licensing terms.
