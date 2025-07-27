import React, { useState, useEffect } from 'react';
import { cn } from '../../utils/cn';
import { Card, CardHeader, CardTitle, CardContent } from '../Card';
import Button from '../Button';
import ChatInterface from './ChatInterface';
import { useAIAssistant } from '../../hooks/useAIAssistant';
import { CultivationContext } from '../../services/AIAssistantService';

interface AIAssistantTabProps {
  context: CultivationContext;
  className?: string;
}

const AIAssistantTab: React.FC<AIAssistantTabProps> = ({ context, className }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('overview');
  
  const {
    messages,
    isLoading,
    sendMessage,
    contextAnalysis,
    analyzeContext,
    hasActiveAlerts,
    activeRecommendations,
    isEnabled,
    setEnabled,
    error,
    clearError
  } = useAIAssistant({
    autoAnalyze: true,
    enableProactiveAlerts: true
  });

  // Analyze context on mount and when context changes
  useEffect(() => {
    if (isEnabled) {
      analyzeContext(context).catch(console.warn);
    }
  }, [context, isEnabled, analyzeContext]);

  const categories = [
    {
      id: 'overview',
      title: context.language === 'de' ? 'Übersicht' : 'Overview',
      icon: '📊',
      description: context.language === 'de' ? 'Aktuelle Analyse und Empfehlungen' : 'Current analysis and recommendations'
    },
    {
      id: 'nutrients',
      title: context.language === 'de' ? 'Nährstoffe' : 'Nutrients',
      icon: '🧪',
      description: context.language === 'de' ? 'Nährstoff-Management und Optimierung' : 'Nutrient management and optimization'
    },
    {
      id: 'growth',
      title: context.language === 'de' ? 'Wachstum' : 'Growth',
      icon: '🌱',
      description: context.language === 'de' ? 'Wachstumsphasen und Entwicklung' : 'Growth stages and development'
    },
    {
      id: 'environment',
      title: context.language === 'de' ? 'Umgebung' : 'Environment',
      icon: '🌡️',
      description: context.language === 'de' ? 'Umgebungsbedingungen und Kontrolle' : 'Environmental conditions and control'
    },
    {
      id: 'problems',
      title: context.language === 'de' ? 'Probleme' : 'Problems',
      icon: '🔧',
      description: context.language === 'de' ? 'Problemdiagnose und Lösungen' : 'Problem diagnosis and solutions'
    }
  ];

  const getQuickQuestions = (category: string) => {
    const questions = {
      overview: [
        context.language === 'de' ? 'Wie ist der aktuelle Zustand meiner Pflanzen?' : 'What\'s the current state of my plants?',
        context.language === 'de' ? 'Gibt es wichtige Probleme zu beachten?' : 'Are there any important issues to address?',
        context.language === 'de' ? 'Was sollte ich als nächstes tun?' : 'What should I do next?'
      ],
      nutrients: [
        context.language === 'de' ? 'Sind meine Nährstoffwerte optimal?' : 'Are my nutrient levels optimal?',
        context.language === 'de' ? 'Wie kann ich meine Nährstofflösung verbessern?' : 'How can I improve my nutrient solution?',
        context.language === 'de' ? 'Welche Dünger sollte ich verwenden?' : 'What fertilizers should I use?'
      ],
      growth: [
        context.language === 'de' ? 'Wann sollte ich zur nächsten Wachstumsphase wechseln?' : 'When should I transition to the next growth stage?',
        context.language === 'de' ? 'Was ist typisch für diese Wachstumsphase?' : 'What\'s typical for this growth stage?',
        context.language === 'de' ? 'Wie kann ich das Wachstum optimieren?' : 'How can I optimize growth?'
      ],
      environment: [
        context.language === 'de' ? 'Sind meine Umgebungsbedingungen richtig?' : 'Are my environmental conditions correct?',
        context.language === 'de' ? 'Wie sollte ich Temperatur und Luftfeuchtigkeit einstellen?' : 'How should I set temperature and humidity?',
        context.language === 'de' ? 'Was ist der optimale Lichtzyklus?' : 'What\'s the optimal light cycle?'
      ],
      problems: [
        context.language === 'de' ? 'Meine Blätter werden gelb, was ist das Problem?' : 'My leaves are turning yellow, what\'s the problem?',
        context.language === 'de' ? 'Wie erkenne ich Nährstoffmängel?' : 'How do I identify nutrient deficiencies?',
        context.language === 'de' ? 'Was kann ich gegen Schädlinge tun?' : 'What can I do about pests?'
      ]
    };
    
    return questions[category as keyof typeof questions] || [];
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Context Analysis Summary */}
      {contextAnalysis && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>📊</span>
              <span>{context.language === 'de' ? 'Aktuelle Analyse' : 'Current Analysis'}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Nutrient Status */}
              <div className={cn(
                'p-4 rounded-lg border-2',
                contextAnalysis.nutrientStatus.overall === 'optimal' ? 'border-green-200 bg-green-50' :
                contextAnalysis.nutrientStatus.overall === 'suboptimal' ? 'border-yellow-200 bg-yellow-50' :
                'border-red-200 bg-red-50'
              )}>
                <h4 className="font-medium mb-2">
                  {context.language === 'de' ? 'Nährstoffe' : 'Nutrients'}
                </h4>
                <p className="text-sm capitalize">
                  {contextAnalysis.nutrientStatus.overall}
                </p>
              </div>

              {/* Growth Stage */}
              <div className="p-4 rounded-lg border-2 border-blue-200 bg-blue-50">
                <h4 className="font-medium mb-2">
                  {context.language === 'de' ? 'Wachstumsphase' : 'Growth Stage'}
                </h4>
                <p className="text-sm">
                  {contextAnalysis.growthStageAnalysis.currentStage}
                </p>
                <p className="text-xs text-stone-600 mt-1">
                  {Math.round(contextAnalysis.growthStageAnalysis.stageProgress * 100)}% {context.language === 'de' ? 'abgeschlossen' : 'complete'}
                </p>
              </div>

              {/* Environment */}
              <div className={cn(
                'p-4 rounded-lg border-2',
                contextAnalysis.environmentalAssessment.overallScore > 0.7 ? 'border-green-200 bg-green-50' :
                contextAnalysis.environmentalAssessment.overallScore > 0.4 ? 'border-yellow-200 bg-yellow-50' :
                'border-red-200 bg-red-50'
              )}>
                <h4 className="font-medium mb-2">
                  {context.language === 'de' ? 'Umgebung' : 'Environment'}
                </h4>
                <p className="text-sm">
                  {Math.round(contextAnalysis.environmentalAssessment.overallScore * 100)}% {context.language === 'de' ? 'optimal' : 'optimal'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Alerts */}
      {hasActiveAlerts && contextAnalysis?.alerts && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-red-700">
              <span>⚠️</span>
              <span>{context.language === 'de' ? 'Aktive Warnungen' : 'Active Alerts'}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {contextAnalysis.alerts
                .filter(alert => alert.severity === 'high' || alert.severity === 'critical')
                .map((alert, index) => (
                  <div key={index} className={cn(
                    'p-3 rounded-lg border-l-4',
                    alert.severity === 'critical' ? 'border-red-500 bg-red-50' : 'border-orange-500 bg-orange-50'
                  )}>
                    <h5 className="font-medium text-sm">{alert.title}</h5>
                    <p className="text-sm text-stone-600 mt-1">{alert.message}</p>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Top Recommendations */}
      {activeRecommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>💡</span>
              <span>{context.language === 'de' ? 'Empfehlungen' : 'Recommendations'}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activeRecommendations.slice(0, 3).map((rec, index) => (
                <div key={index} className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                  <h5 className="font-medium text-sm text-emerald-900">{rec.title}</h5>
                  <p className="text-sm text-emerald-700 mt-1">{rec.description}</p>
                  <p className="text-xs text-emerald-600 mt-2">{rec.reasoning}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderQuickQuestions = () => {
    const questions = getQuickQuestions(selectedCategory);
    
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            {context.language === 'de' ? 'Häufige Fragen' : 'Quick Questions'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-2">
            {questions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => {
                  setIsChatOpen(true);
                  // Auto-fill the question in chat
                }}
                className="text-left justify-start h-auto py-3 px-4"
              >
                <span className="text-sm">{question}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  if (!isEnabled) {
    return (
      <div className={cn('p-6', className)}>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🤖</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">
              {context.language === 'de' ? 'AI-Assistent deaktiviert' : 'AI Assistant Disabled'}
            </h3>
            <p className="text-stone-600 mb-4">
              {context.language === 'de' 
                ? 'Aktivieren Sie den AI-Assistenten für intelligente Anbau-Beratung.'
                : 'Enable the AI Assistant for intelligent cultivation guidance.'
              }
            </p>
            <Button onClick={() => setEnabled(true)}>
              {context.language === 'de' ? 'Aktivieren' : 'Enable'}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn('p-6', className)}>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚠️</span>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-red-700">
              {context.language === 'de' ? 'AI-Assistent Fehler' : 'AI Assistant Error'}
            </h3>
            <p className="text-stone-600 mb-4">{error}</p>
            <div className="space-x-2">
              <Button onClick={clearError} variant="outline">
                {context.language === 'de' ? 'Erneut versuchen' : 'Try Again'}
              </Button>
              <Button onClick={() => setEnabled(false)} variant="secondary">
                {context.language === 'de' ? 'Deaktivieren' : 'Disable'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={cn('p-6 space-y-6', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-stone-900">
            {context.language === 'de' ? 'AI Anbau-Assistent' : 'AI Grow Assistant'}
          </h2>
          <p className="text-stone-600">
            {context.language === 'de' 
              ? 'Intelligente Beratung für optimalen Cannabis-Anbau'
              : 'Intelligent guidance for optimal cannabis cultivation'
            }
          </p>
        </div>
        
        <Button onClick={() => setIsChatOpen(true)} className="flex items-center space-x-2">
          <span>💬</span>
          <span>{context.language === 'de' ? 'Chat öffnen' : 'Open Chat'}</span>
        </Button>
      </div>

      {/* Category Navigation */}
      <div className="flex space-x-1 bg-stone-100 rounded-lg p-1">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={cn(
              'flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all',
              selectedCategory === category.id
                ? 'bg-white text-emerald-700 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            )}
          >
            <span className="mr-2">{category.icon}</span>
            {category.title}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {selectedCategory === 'overview' ? renderOverview() : renderQuickQuestions()}
        </div>
        
        <div>
          {renderQuickQuestions()}
        </div>
      </div>

      {/* Chat Interface */}
      <ChatInterface
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onSendMessage={sendMessage}
        context={context}
        messages={messages}
        isLoading={isLoading}
      />
    </div>
  );
};

export default AIAssistantTab;
