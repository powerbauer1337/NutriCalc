import React, { useState, useEffect } from 'react';
import { CultivationContext } from '../../services/AIAssistantService';
import { useAIAssistant } from '../../hooks/useAIAssistant';
import FloatingChatWidget from './FloatingChatWidget';
import ChatInterface from './ChatInterface';
import AIAssistantTab from './AIAssistantTab';

interface AIAssistantIntegrationProps {
  // Current nutrient calculation context
  nutrients: Record<string, number>;
  growthStage: string;
  waterType: string;
  waterVolume: number;
  selectedFertilizers: Array<{
    id: string;
    name: string;
    amount?: number;
    unit?: string;
  }>;
  userLevel: 'beginner' | 'intermediate' | 'expert';
  language: 'de' | 'en';

  // Optional environmental data
  environmentalData?: {
    temperature?: number;
    humidity?: number;
    lightCycle?: string;
    ph?: number;
    ec?: number;
  };

  // Optional grow tracking data
  growWeek?: number;
  strainType?: 'indica' | 'sativa' | 'hybrid';

  // UI preferences
  showFloatingWidget?: boolean;
  enableProactiveAlerts?: boolean;

  // Callbacks
  onNutrientAdjustment?: (adjustments: Record<string, number>) => void;
  onRecommendationApplied?: (recommendation: {
    type: string;
    priority: string;
    description: string;
  }) => void;
}

const AIAssistantIntegration: React.FC<AIAssistantIntegrationProps> = ({
  nutrients,
  growthStage,
  waterType,
  waterVolume,
  selectedFertilizers,
  userLevel,
  language,
  environmentalData,
  growWeek,
  strainType,
  showFloatingWidget = true,
  enableProactiveAlerts = true,
  onNutrientAdjustment,
  onRecommendationApplied
}) => {
  const [isFloatingChatOpen, setIsFloatingChatOpen] = useState(false);
  
  // Build cultivation context
  const context: CultivationContext = {
    nutrients,
    growthStage,
    waterType,
    waterVolume,
    selectedFertilizers,
    userLevel,
    language,
    environmentalData,
    growWeek,
    strainType
  };

  // Initialize AI Assistant
  const {
    messages,
    isLoading,
    sendMessage,
    hasActiveAlerts,
    hasUnreadMessages,
    activeRecommendations,
    isEnabled
  } = useAIAssistant({
    autoAnalyze: true,
    enableProactiveAlerts
  });

  // Handle recommendation applications
  useEffect(() => {
    if (activeRecommendations.length > 0 && onRecommendationApplied) {
      activeRecommendations.forEach(rec => {
        if (rec.action?.type === 'adjust_nutrients' && onNutrientAdjustment) {
          // Extract nutrient adjustments from recommendation
          const adjustments = extractNutrientAdjustments(rec);
          if (Object.keys(adjustments).length > 0) {
            onNutrientAdjustment(adjustments);
          }
        }
      });
    }
  }, [activeRecommendations, onNutrientAdjustment, onRecommendationApplied]);

  const extractNutrientAdjustments = (recommendation: {
    description: string;
    type: string;
  }): Record<string, number> => {
    // Simple extraction logic - in a real implementation, this would be more sophisticated
    const adjustments: Record<string, number> = {};
    
    if (recommendation.description.includes('increase nitrogen')) {
      adjustments.n = nutrients.n * 1.1; // 10% increase
    }
    if (recommendation.description.includes('decrease nitrogen')) {
      adjustments.n = nutrients.n * 0.9; // 10% decrease
    }
    if (recommendation.description.includes('increase phosphorus')) {
      adjustments.p = nutrients.p * 1.1;
    }
    if (recommendation.description.includes('decrease phosphorus')) {
      adjustments.p = nutrients.p * 0.9;
    }
    if (recommendation.description.includes('increase potassium')) {
      adjustments.k = nutrients.k * 1.1;
    }
    if (recommendation.description.includes('decrease potassium')) {
      adjustments.k = nutrients.k * 0.9;
    }
    
    return adjustments;
  };

  return (
    <>
      {/* Floating Chat Widget */}
      {showFloatingWidget && isEnabled && (
        <FloatingChatWidget
          onClick={() => setIsFloatingChatOpen(true)}
          context={context}
          hasUnreadMessages={hasUnreadMessages}
          hasActiveAlerts={hasActiveAlerts}
        />
      )}

      {/* Floating Chat Interface */}
      <ChatInterface
        isOpen={isFloatingChatOpen}
        onClose={() => setIsFloatingChatOpen(false)}
        onSendMessage={sendMessage}
        context={context}
        messages={messages}
        isLoading={isLoading}
      />
    </>
  );
};

// Export individual components for flexible usage
export { 
  AIAssistantIntegration as default,
  AIAssistantTab,
  ChatInterface,
  FloatingChatWidget
};

// Export types for external usage
export type { CultivationContext } from '../../services/AIAssistantService';
