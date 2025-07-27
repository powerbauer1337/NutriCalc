import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../utils/cn';
import { AIMessage, AIResponse, CultivationContext } from '../../services/AIAssistantService';
import Button from '../Button';
import { Card } from '../Card';

interface ChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
  onSendMessage: (message: string, context: CultivationContext) => Promise<AIResponse>;
  context: CultivationContext;
  messages: AIMessage[];
  isLoading: boolean;
  className?: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  isOpen,
  onClose,
  onSendMessage,
  context,
  messages,
  isLoading,
  className
}) => {
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const message = inputMessage.trim();
    setInputMessage('');
    setIsTyping(true);

    try {
      await onSendMessage(message, context);
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatMessage = (content: string) => {
    // Simple markdown-like formatting
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-stone-100 px-1 rounded text-sm">$1</code>')
      .replace(/\n/g, '<br>');
  };

  const getSuggestionButtons = () => {
    const suggestions = [
      context.language === 'de' ? 'Wie sind meine aktuellen Nährstoffwerte?' : 'How are my current nutrient levels?',
      context.language === 'de' ? 'Was sollte ich in dieser Wachstumsphase beachten?' : 'What should I focus on in this growth stage?',
      context.language === 'de' ? 'Gibt es Probleme mit meiner Konfiguration?' : 'Are there any issues with my setup?',
      context.language === 'de' ? 'Wann sollte ich zur nächsten Phase wechseln?' : 'When should I transition to the next stage?'
    ];

    return suggestions.slice(0, 2); // Show only 2 suggestions to save space
  };

  if (!isOpen) return null;

  return (
    <div className={cn(
      'fixed inset-0 z-50 flex items-end justify-end p-4',
      'md:inset-auto md:bottom-4 md:right-4 md:w-96 md:h-[600px]',
      className
    )}>
      {/* Mobile backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
        onClick={onClose}
      />
      
      {/* Chat container */}
      <Card className={cn(
        'w-full h-full max-h-[80vh] flex flex-col',
        'md:w-96 md:h-[600px] md:max-h-none',
        'bg-white dark:bg-slate-800 shadow-xl border-0 md:border'
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-stone-200 dark:border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">🤖</span>
            </div>
            <div>
              <h3 className="font-semibold text-stone-900 dark:text-slate-100">
                {context.language === 'de' ? 'Anbau-Assistent' : 'Grow Assistant'}
              </h3>
              <p className="text-xs text-stone-600 dark:text-slate-400">
                {context.language === 'de' ? 'Cannabis Experte' : 'Cannabis Expert'}
              </p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-2"
            aria-label={context.language === 'de' ? 'Chat schließen' : 'Close chat'}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌱</span>
              </div>
              <h4 className="font-medium text-stone-900 dark:text-slate-100 mb-2">
                {context.language === 'de' ? 'Willkommen!' : 'Welcome!'}
              </h4>
              <p className="text-sm text-stone-600 dark:text-slate-400 mb-4">
                {context.language === 'de' 
                  ? 'Ich bin Ihr persönlicher Cannabis-Anbau-Experte. Fragen Sie mich alles über Nährstoffe, Wachstumsphasen und Anbautechniken.'
                  : 'I\'m your personal cannabis cultivation expert. Ask me anything about nutrients, growth stages, and growing techniques.'
                }
              </p>
              
              {/* Suggestion buttons */}
              <div className="space-y-2">
                {getSuggestionButtons().map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setInputMessage(suggestion)}
                    className="w-full text-left justify-start text-xs"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex',
                message.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              <div
                className={cn(
                  'max-w-[80%] rounded-lg px-3 py-2 text-sm',
                  message.role === 'user'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-stone-100 dark:bg-slate-700 text-stone-900 dark:text-slate-100'
                )}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: formatMessage(message.content)
                  }}
                />
                
                {/* Show suggestions for assistant messages */}
                {message.role === 'assistant' && message.metadata?.suggestions && (
                  <div className="mt-2 space-y-1">
                    {message.metadata.suggestions.slice(0, 2).map((suggestion: string, index: number) => (
                      <Button
                        key={index}
                        variant="ghost"
                        size="sm"
                        onClick={() => setInputMessage(suggestion)}
                        className="w-full text-left justify-start text-xs p-1 h-auto"
                      >
                        💡 {suggestion}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {(isLoading || isTyping) && (
            <div className="flex justify-start">
              <div className="bg-stone-100 dark:bg-slate-700 rounded-lg px-3 py-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-stone-200 dark:border-slate-700">
          <div className="flex space-x-2">
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                context.language === 'de' 
                  ? 'Stellen Sie eine Frage über Cannabis-Anbau...'
                  : 'Ask a question about cannabis cultivation...'
              }
              className={cn(
                'flex-1 px-3 py-2 text-sm border border-stone-300 dark:border-slate-600',
                'rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500',
                'bg-white dark:bg-slate-700 text-stone-900 dark:text-slate-100',
                'placeholder-stone-500 dark:placeholder-slate-400'
              )}
              disabled={isLoading}
            />
            
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              size="sm"
              className="px-3"
              aria-label={context.language === 'de' ? 'Nachricht senden' : 'Send message'}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </Button>
          </div>
          
          {/* Context indicator */}
          <div className="mt-2 text-xs text-stone-500 dark:text-slate-400">
            {context.language === 'de' ? 'Kontext:' : 'Context:'} {context.growthStage} • {context.waterVolume}L • {context.userLevel}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ChatInterface;
