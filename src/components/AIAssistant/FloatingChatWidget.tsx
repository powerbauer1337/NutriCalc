import React, { useState, useEffect } from 'react';
import { cn } from '../../utils/cn';
import { CultivationContext } from '../../services/AIAssistantService';
import Button from '../Button';

interface FloatingChatWidgetProps {
  onClick: () => void;
  context: CultivationContext;
  hasUnreadMessages?: boolean;
  hasActiveAlerts?: boolean;
  className?: string;
}

const FloatingChatWidget: React.FC<FloatingChatWidgetProps> = ({
  onClick,
  context,
  hasUnreadMessages = false,
  hasActiveAlerts = false,
  className
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isPulsing, setIsPulsing] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Auto-hide on mobile when scrolling
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      
      if (Math.abs(scrollY - lastScrollY) < 10) {
        ticking = false;
        return;
      }
      
      setIsVisible(scrollY <= lastScrollY || scrollY < 100);
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    };

    const handleScroll = () => requestTick();

    // Only add scroll listener on mobile
    if (window.innerWidth < 768) {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (window.innerWidth < 768) {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  // Pulse animation for alerts
  useEffect(() => {
    if (hasActiveAlerts) {
      setIsPulsing(true);
      const timer = setTimeout(() => setIsPulsing(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [hasActiveAlerts]);

  // Show tooltip on first visit
  useEffect(() => {
    const hasSeenTooltip = localStorage.getItem('ai-assistant-tooltip-seen');
    if (!hasSeenTooltip) {
      setShowTooltip(true);
      const timer = setTimeout(() => {
        setShowTooltip(false);
        localStorage.setItem('ai-assistant-tooltip-seen', 'true');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const getStatusColor = () => {
    if (hasActiveAlerts) return 'bg-red-500';
    if (hasUnreadMessages) return 'bg-orange-500';
    return 'bg-emerald-500';
  };

  const getStatusIcon = () => {
    if (hasActiveAlerts) return '⚠️';
    if (hasUnreadMessages) return '💬';
    return '🤖';
  };

  const getTooltipText = () => {
    if (hasActiveAlerts) {
      return context.language === 'de' 
        ? 'Wichtige Warnungen verfügbar!'
        : 'Important alerts available!';
    }
    if (hasUnreadMessages) {
      return context.language === 'de'
        ? 'Neue Nachrichten vom Assistenten'
        : 'New messages from assistant';
    }
    return context.language === 'de'
      ? 'Fragen Sie den Anbau-Experten'
      : 'Ask the grow expert';
  };

  return (
    <>
      {/* Floating button */}
      <div
        className={cn(
          'fixed bottom-4 right-4 z-40 transition-all duration-300',
          'md:bottom-6 md:right-6',
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0',
          className
        )}
      >
        <div className="relative">
          {/* Tooltip */}
          {showTooltip && (
            <div className={cn(
              'absolute bottom-full right-0 mb-2 px-3 py-2',
              'bg-stone-900 text-white text-sm rounded-lg shadow-lg',
              'whitespace-nowrap max-w-xs',
              'animate-in slide-in-from-bottom-2 fade-in duration-300'
            )}>
              {getTooltipText()}
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-stone-900" />
            </div>
          )}

          {/* Main button */}
          <Button
            onClick={onClick}
            className={cn(
              'w-14 h-14 rounded-full shadow-lg hover:shadow-xl',
              'transition-all duration-200 hover:scale-105',
              'focus:outline-none focus:ring-4 focus:ring-emerald-500/20',
              getStatusColor(),
              isPulsing && 'animate-pulse'
            )}
            aria-label={
              context.language === 'de' 
                ? 'AI-Anbau-Assistenten öffnen'
                : 'Open AI grow assistant'
            }
          >
            <span className="text-xl">{getStatusIcon()}</span>
          </Button>

          {/* Notification badges */}
          {(hasUnreadMessages || hasActiveAlerts) && (
            <div className={cn(
              'absolute -top-1 -right-1 w-5 h-5 rounded-full',
              'flex items-center justify-center text-xs font-bold text-white',
              hasActiveAlerts ? 'bg-red-600' : 'bg-orange-600',
              'animate-in zoom-in duration-200'
            )}>
              {hasActiveAlerts ? '!' : '●'}
            </div>
          )}

          {/* Pulse ring for alerts */}
          {hasActiveAlerts && (
            <div className={cn(
              'absolute inset-0 rounded-full',
              'bg-red-500 opacity-20 animate-ping'
            )} />
          )}
        </div>
      </div>

      {/* Quick action hints (mobile only) */}
      {isVisible && (hasActiveAlerts || hasUnreadMessages) && (
        <div className={cn(
          'fixed bottom-20 right-4 z-30',
          'md:hidden', // Only show on mobile
          'animate-in slide-in-from-bottom-2 fade-in duration-500'
        )}>
          <div className={cn(
            'bg-white dark:bg-slate-800 rounded-lg shadow-lg border',
            'px-3 py-2 text-sm max-w-xs'
          )}>
            <div className="flex items-center space-x-2">
              <span className="text-lg">{getStatusIcon()}</span>
              <span className="text-stone-700 dark:text-slate-300">
                {hasActiveAlerts 
                  ? (context.language === 'de' ? 'Warnungen prüfen' : 'Check alerts')
                  : (context.language === 'de' ? 'Neue Tipps verfügbar' : 'New tips available')
                }
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingChatWidget;
