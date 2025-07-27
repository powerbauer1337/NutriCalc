import { GoogleGenerativeAI } from '@google/generative-ai';
import { CannabisKnowledgeBase } from './CannabisKnowledgeBase';
import { AIContextEngine } from './AIContextEngine';

// AI Provider Types
export type AIProvider = 'gemini' | 'openai' | 'claude';

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  context?: CultivationContext;
  metadata?: Record<string, any>;
}

export interface CultivationContext {
  nutrients: Record<string, number>;
  growthStage: string;
  waterType: string;
  waterVolume: number;
  selectedFertilizers: any[];
  environmentalData?: {
    temperature?: number;
    humidity?: number;
    lightCycle?: string;
    ph?: number;
    ec?: number;
  };
  userLevel: 'beginner' | 'intermediate' | 'expert';
  language: 'de' | 'en';
  growWeek?: number;
  strainType?: 'indica' | 'sativa' | 'hybrid';
}

export interface AIResponse {
  message: string;
  confidence: number;
  suggestions?: string[];
  actions?: AIAction[];
  warnings?: string[];
  followUpQuestions?: string[];
}

export interface AIAction {
  type: 'adjust_nutrients' | 'change_ph' | 'modify_schedule' | 'environmental_change';
  description: string;
  parameters: Record<string, any>;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

class AIAssistantService {
  private geminiAI: GoogleGenerativeAI;
  private conversationHistory: Map<string, AIMessage[]> = new Map();
  private knowledgeBase: CannabisKnowledgeBase;
  private contextEngine: AIContextEngine;

  constructor(apiKey: string) {
    this.geminiAI = new GoogleGenerativeAI(apiKey);
    this.knowledgeBase = new CannabisKnowledgeBase();
    this.contextEngine = new AIContextEngine();
  }

  async sendMessage(
    message: string,
    context: CultivationContext,
    sessionId: string = 'default'
  ): Promise<AIResponse> {
    try {
      // Get conversation history
      const history = this.conversationHistory.get(sessionId) || [];
      
      // Create user message
      const userMessage: AIMessage = {
        id: this.generateId(),
        role: 'user',
        content: message,
        timestamp: Date.now(),
        context
      };

      // Add to history
      history.push(userMessage);

      // Generate AI response
      const aiResponse = await this.generateResponse(message, context, history);

      // Create assistant message
      const assistantMessage: AIMessage = {
        id: this.generateId(),
        role: 'assistant',
        content: aiResponse.message,
        timestamp: Date.now(),
        context,
        metadata: {
          confidence: aiResponse.confidence,
          suggestions: aiResponse.suggestions,
          actions: aiResponse.actions
        }
      };

      // Update history
      history.push(assistantMessage);
      this.conversationHistory.set(sessionId, history.slice(-20)); // Keep last 20 messages

      return aiResponse;
    } catch (error) {
      console.error('AI Assistant Error:', error);
      return this.getFallbackResponse(context);
    }
  }

  private async generateResponse(
    message: string,
    context: CultivationContext,
    history: AIMessage[]
  ): Promise<AIResponse> {
    // Build comprehensive prompt
    const prompt = this.buildPrompt(message, context, history);
    
    // Get AI response
    const model = this.geminiAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const response = result.response.text();

    // Parse and enhance response
    return this.parseAIResponse(response, context);
  }

  private buildPrompt(
    message: string,
    context: CultivationContext,
    history: AIMessage[]
  ): string {
    const systemPrompt = this.getSystemPrompt(context);
    const contextPrompt = this.buildContextPrompt(context);
    const historyPrompt = this.buildHistoryPrompt(history);
    
    return `${systemPrompt}

${contextPrompt}

${historyPrompt}

User Question: ${message}

Please provide a helpful, accurate response in ${context.language === 'de' ? 'German' : 'English'}.`;
  }

  private getSystemPrompt(context: CultivationContext): string {
    const basePrompt = context.language === 'de' ? 
      `Du bist ein erfahrener Cannabis-Anbau-Experte und Nährstoff-Spezialist. Du hilfst Nutzern bei allen Aspekten des Cannabis-Anbaus, von der Keimung bis zur Ernte.` :
      `You are an expert cannabis cultivation specialist and nutrient expert. You help users with all aspects of cannabis growing, from germination to harvest.`;

    const levelPrompt = {
      beginner: context.language === 'de' ? 
        'Erkläre Konzepte einfach und vermeide zu viel Fachjargon.' :
        'Explain concepts simply and avoid too much technical jargon.',
      intermediate: context.language === 'de' ? 
        'Gib detaillierte Erklärungen mit praktischen Tipps.' :
        'Provide detailed explanations with practical tips.',
      expert: context.language === 'de' ? 
        'Verwende Fachterminologie und gib präzise, technische Antworten.' :
        'Use technical terminology and provide precise, technical answers.'
    };

    return `${basePrompt} ${levelPrompt[context.userLevel]}

Your expertise includes:
- Nutrient management and deficiency diagnosis
- Growth stage optimization
- Environmental control
- Pest and disease management
- Harvest timing and techniques
- Strain-specific guidance

Always provide actionable advice and explain the reasoning behind your recommendations.`;
  }

  private buildContextPrompt(context: CultivationContext): string {
    const nutrients = Object.entries(context.nutrients)
      .map(([key, value]) => `${key.toUpperCase()}: ${value}`)
      .join(', ');

    return `Current Cultivation Context:
- Growth Stage: ${context.growthStage}
- Water Volume: ${context.waterVolume}L
- Water Type: ${context.waterType}
- Current Nutrients: ${nutrients}
- User Level: ${context.userLevel}
- Language: ${context.language}
${context.growWeek ? `- Grow Week: ${context.growWeek}` : ''}
${context.strainType ? `- Strain Type: ${context.strainType}` : ''}
${context.environmentalData ? `- Environmental: ${JSON.stringify(context.environmentalData)}` : ''}`;
  }

  private buildHistoryPrompt(history: AIMessage[]): string {
    if (history.length === 0) return '';

    const recentHistory = history.slice(-6); // Last 3 exchanges
    const historyText = recentHistory
      .map(msg => `${msg.role}: ${msg.content}`)
      .join('\n');

    return `Recent Conversation:\n${historyText}\n`;
  }

  private parseAIResponse(response: string, context: CultivationContext): AIResponse {
    // Extract structured information from AI response
    const confidence = this.calculateConfidence(response);
    const suggestions = this.extractSuggestions(response);
    const actions = this.extractActions(response, context);
    const warnings = this.extractWarnings(response);
    const followUpQuestions = this.generateFollowUpQuestions(response, context);

    return {
      message: response,
      confidence,
      suggestions,
      actions,
      warnings,
      followUpQuestions
    };
  }

  private calculateConfidence(response: string): number {
    // Simple confidence calculation based on response characteristics
    let confidence = 0.7; // Base confidence

    // Increase confidence for specific indicators
    if (response.includes('recommend') || response.includes('suggest')) confidence += 0.1;
    if (response.includes('optimal') || response.includes('ideal')) confidence += 0.1;
    if (response.includes('experience') || response.includes('typically')) confidence += 0.05;
    
    // Decrease confidence for uncertainty indicators
    if (response.includes('might') || response.includes('could')) confidence -= 0.1;
    if (response.includes('uncertain') || response.includes('depends')) confidence -= 0.15;

    return Math.max(0.3, Math.min(0.95, confidence));
  }

  private extractSuggestions(response: string): string[] {
    // Extract actionable suggestions from response
    const suggestions: string[] = [];
    
    // Look for numbered lists or bullet points
    const listMatches = response.match(/(?:^\d+\.|^[-*])\s*(.+)$/gm);
    if (listMatches) {
      suggestions.push(...listMatches.map(match => match.replace(/^(?:\d+\.|[-*])\s*/, '')));
    }

    // Look for "I recommend" or "I suggest" patterns
    const recommendMatches = response.match(/(?:I recommend|I suggest|Consider|Try)\s+([^.!?]+)/gi);
    if (recommendMatches) {
      suggestions.push(...recommendMatches.map(match => match.replace(/^(?:I recommend|I suggest|Consider|Try)\s+/i, '')));
    }

    return suggestions.slice(0, 5); // Limit to 5 suggestions
  }

  private extractActions(response: string, context: CultivationContext): AIAction[] {
    const actions: AIAction[] = [];

    // Look for specific action patterns
    if (response.toLowerCase().includes('adjust') && response.toLowerCase().includes('nutrient')) {
      actions.push({
        type: 'adjust_nutrients',
        description: 'Adjust nutrient levels based on recommendation',
        parameters: { context },
        priority: 'medium'
      });
    }

    if (response.toLowerCase().includes('ph') && (response.toLowerCase().includes('lower') || response.toLowerCase().includes('raise'))) {
      actions.push({
        type: 'change_ph',
        description: 'Adjust pH levels',
        parameters: { context },
        priority: 'high'
      });
    }

    return actions;
  }

  private extractWarnings(response: string): string[] {
    const warnings: string[] = [];
    
    // Look for warning indicators
    const warningPatterns = [
      /(?:warning|caution|careful|avoid|dangerous?|critical|urgent)/gi,
      /(?:too high|too low|excessive|deficient|toxic)/gi
    ];

    warningPatterns.forEach(pattern => {
      const matches = response.match(pattern);
      if (matches && matches.length > 0) {
        // Extract sentences containing warnings
        const sentences = response.split(/[.!?]+/);
        sentences.forEach(sentence => {
          if (pattern.test(sentence)) {
            warnings.push(sentence.trim());
          }
        });
      }
    });

    return [...new Set(warnings)].slice(0, 3); // Remove duplicates and limit
  }

  private generateFollowUpQuestions(response: string, context: CultivationContext): string[] {
    const questions: string[] = [];
    
    // Generate contextual follow-up questions
    if (context.growthStage === 'seedling') {
      questions.push(
        context.language === 'de' ? 
          'Wie oft sollte ich in der Keimphase gießen?' :
          'How often should I water during the seedling stage?'
      );
    }

    if (context.nutrients.n > 200) {
      questions.push(
        context.language === 'de' ? 
          'Sind meine Stickstoffwerte zu hoch?' :
          'Are my nitrogen levels too high?'
      );
    }

    if (context.userLevel === 'beginner') {
      questions.push(
        context.language === 'de' ? 
          'Was sind die häufigsten Anfängerfehler?' :
          'What are the most common beginner mistakes?'
      );
    }

    return questions.slice(0, 3);
  }

  private getFallbackResponse(context: CultivationContext): AIResponse {
    const message = context.language === 'de' ? 
      'Entschuldigung, ich konnte Ihre Anfrage nicht verarbeiten. Bitte versuchen Sie es erneut oder stellen Sie eine spezifischere Frage.' :
      'Sorry, I couldn\'t process your request. Please try again or ask a more specific question.';

    return {
      message,
      confidence: 0.1,
      suggestions: [],
      actions: [],
      warnings: [],
      followUpQuestions: []
    };
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  // Public methods for conversation management
  getConversationHistory(sessionId: string): AIMessage[] {
    return this.conversationHistory.get(sessionId) || [];
  }

  clearConversationHistory(sessionId: string): void {
    this.conversationHistory.delete(sessionId);
  }

  exportConversation(sessionId: string): string {
    const history = this.getConversationHistory(sessionId);
    return JSON.stringify(history, null, 2);
  }
}

export default AIAssistantService;
