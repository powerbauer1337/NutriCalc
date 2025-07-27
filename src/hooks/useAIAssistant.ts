import { useState, useEffect, useCallback, useRef } from 'react';
import AIAssistantService, { 
  AIMessage, 
  AIResponse, 
  CultivationContext,
  AIAction 
} from '../services/AIAssistantService';
import { AIContextEngine, ContextAnalysis } from '../services/AIContextEngine';
import { useToasts } from '../contexts/ToastContext';

interface UseAIAssistantOptions {
  apiKey?: string;
  sessionId?: string;
  autoAnalyze?: boolean;
  enableProactiveAlerts?: boolean;
}

interface UseAIAssistantReturn {
  // Chat functionality
  messages: AIMessage[];
  isLoading: boolean;
  sendMessage: (message: string, context: CultivationContext) => Promise<AIResponse>;
  clearHistory: () => void;
  exportConversation: () => string;
  
  // Context analysis
  contextAnalysis: ContextAnalysis | null;
  analyzeContext: (context: CultivationContext) => Promise<ContextAnalysis>;
  
  // Proactive features
  hasActiveAlerts: boolean;
  hasUnreadMessages: boolean;
  activeRecommendations: Array<{
    type: string;
    priority: string;
    description: string;
  }>;

  // Assistant state
  isEnabled: boolean;
  setEnabled: (enabled: boolean) => void;
  
  // Error handling
  error: string | null;
  clearError: () => void;
}

export const useAIAssistant = (options: UseAIAssistantOptions = {}): UseAIAssistantReturn => {
  const {
    apiKey,
    sessionId = 'default',
    autoAnalyze = true,
    enableProactiveAlerts = true
  } = options;

  // State
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [contextAnalysis, setContextAnalysis] = useState<ContextAnalysis | null>(null);
  const [hasActiveAlerts, setHasActiveAlerts] = useState(false);
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);
  const [activeRecommendations, setActiveRecommendations] = useState<any[]>([]);
  const [isEnabled, setEnabled] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Services
  const aiServiceRef = useRef<AIAssistantService | null>(null);
  const contextEngineRef = useRef<AIContextEngine | null>(null);
  const lastContextRef = useRef<CultivationContext | null>(null);
  const { addToast } = useToasts();

  // Initialize services
  useEffect(() => {
    if (!isEnabled) return;

    try {
      const storedApiKey = apiKey || localStorage.getItem('gemini-api-key');
      if (!storedApiKey) {
        setError('AI Assistant requires an API key. Please configure it in settings.');
        return;
      }

      aiServiceRef.current = new AIAssistantService(storedApiKey);
      contextEngineRef.current = new AIContextEngine();
      
      // Load existing conversation
      const existingMessages = aiServiceRef.current.getConversationHistory(sessionId);
      setMessages(existingMessages);
      
      setError(null);
    } catch (err) {
      setError('Failed to initialize AI Assistant');
      console.error('AI Assistant initialization error:', err);
    }
  }, [apiKey, sessionId, isEnabled]);

  // Send message function
  const sendMessage = useCallback(async (
    message: string, 
    context: CultivationContext
  ): Promise<AIResponse> => {
    if (!aiServiceRef.current || !isEnabled) {
      throw new Error('AI Assistant not available');
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await aiServiceRef.current.sendMessage(message, context, sessionId);
      
      // Update messages from service
      const updatedMessages = aiServiceRef.current.getConversationHistory(sessionId);
      setMessages(updatedMessages);
      
      // Handle AI actions
      if (response.actions && response.actions.length > 0) {
        handleAIActions(response.actions, context);
      }
      
      // Show warnings as toasts
      if (response.warnings && response.warnings.length > 0) {
        response.warnings.forEach(warning => {
          addToast(warning, 'warning');
        });
      }

      setHasUnreadMessages(false); // Mark as read when user sends message
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send message';
      setError(errorMessage);
      addToast(errorMessage, 'error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [sessionId, isEnabled, addToast]);

  // Analyze context function
  const analyzeContext = useCallback(async (
    context: CultivationContext
  ): Promise<ContextAnalysis> => {
    if (!contextEngineRef.current || !isEnabled) {
      throw new Error('Context engine not available');
    }

    try {
      const analysis = contextEngineRef.current.analyzeContext(context);
      setContextAnalysis(analysis);
      
      // Update alerts and recommendations
      setHasActiveAlerts(analysis.alerts.some(alert => alert.severity === 'high' || alert.severity === 'critical'));
      setActiveRecommendations(analysis.recommendations.filter(rec => rec.priority === 'high' || rec.priority === 'critical'));
      
      // Store context for proactive monitoring
      lastContextRef.current = context;
      
      return analysis;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to analyze context';
      setError(errorMessage);
      throw err;
    }
  }, [isEnabled]);

  // Handle AI actions
  const handleAIActions = useCallback((actions: AIAction[], context: CultivationContext) => {
    actions.forEach(action => {
      switch (action.type) {
        case 'adjust_nutrients':
          addToast(
            context.language === 'de'
              ? 'AI empfiehlt Nährstoff-Anpassungen'
              : 'AI recommends nutrient adjustments',
            'info'
          );
          break;
        case 'change_ph':
          addToast(
            context.language === 'de'
              ? 'pH-Anpassung empfohlen'
              : 'pH adjustment recommended',
            action.priority === 'critical' ? 'warning' : 'info'
          );
          break;
        case 'environmental_change':
          addToast(
            context.language === 'de'
              ? 'Umgebungsanpassung empfohlen'
              : 'Environmental adjustment recommended',
            'info'
          );
          break;
        default:
          // Handle other action types
          break;
      }
    });
  }, [addToast]);

  // Proactive monitoring
  useEffect(() => {
    if (!enableProactiveAlerts || !isEnabled || !lastContextRef.current) return;

    const checkForProactiveAlerts = async () => {
      try {
        const analysis = await analyzeContext(lastContextRef.current!);
        
        // Check for critical issues that warrant proactive messages
        const criticalAlerts = analysis.alerts.filter(alert => 
          alert.severity === 'critical' && !alert.dismissible
        );
        
        if (criticalAlerts.length > 0 && aiServiceRef.current) {
          // Generate proactive message
          const proactiveMessage = criticalAlerts.length === 1
            ? `Critical issue detected: ${criticalAlerts[0].message}`
            : `${criticalAlerts.length} critical issues detected. Please check your setup.`;
          
          // Add system message
          const systemMessage: AIMessage = {
            id: `system-${Date.now()}`,
            role: 'assistant',
            content: proactiveMessage,
            timestamp: Date.now(),
            context: lastContextRef.current,
            metadata: {
              isProactive: true,
              alerts: criticalAlerts
            }
          };
          
          setMessages(prev => [...prev, systemMessage]);
          setHasUnreadMessages(true);
        }
      } catch (err) {
        console.warn('Proactive monitoring error:', err);
      }
    };

    // Check every 5 minutes
    const interval = window.setInterval(checkForProactiveAlerts, 5 * 60 * 1000);
    return () => window.clearInterval(interval);
  }, [enableProactiveAlerts, isEnabled, analyzeContext]);

  // Auto-analyze context when it changes
  useEffect(() => {
    if (autoAnalyze && lastContextRef.current && contextEngineRef.current && isEnabled) {
      analyzeContext(lastContextRef.current).catch(console.warn);
    }
  }, [autoAnalyze, isEnabled, analyzeContext]);

  // Clear functions
  const clearHistory = useCallback(() => {
    if (aiServiceRef.current) {
      aiServiceRef.current.clearConversationHistory(sessionId);
      setMessages([]);
      setHasUnreadMessages(false);
    }
  }, [sessionId]);

  const exportConversation = useCallback((): string => {
    if (!aiServiceRef.current) return '';
    return aiServiceRef.current.exportConversation(sessionId);
  }, [sessionId]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Cleanup
  useEffect(() => {
    return () => {
      // Cleanup if needed
    };
  }, []);

  return {
    // Chat functionality
    messages,
    isLoading,
    sendMessage,
    clearHistory,
    exportConversation,
    
    // Context analysis
    contextAnalysis,
    analyzeContext,
    
    // Proactive features
    hasActiveAlerts,
    hasUnreadMessages,
    activeRecommendations,
    
    // Assistant state
    isEnabled,
    setEnabled,
    
    // Error handling
    error,
    clearError
  };
};
