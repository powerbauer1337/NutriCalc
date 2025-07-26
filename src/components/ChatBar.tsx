import React, { useState, useRef } from 'react';
import Button from './Button';

interface ChatBarProps {
  apiKey: boolean;
  onSend: (message: string) => void;
  isLoading: boolean;
  displayMessage: string;
  suggestions?: string[];
}

const ChatBar: React.FC<ChatBarProps> = React.memo(({ apiKey, onSend, isLoading, displayMessage, suggestions = [] }) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !apiKey) return;
    onSend(inputValue.trim());
    setInputValue('');
  };

  const suggestionClicked = (suggestion: string) => {
    setInputValue(suggestion);
    inputRef.current?.focus();
  };

  return (
    <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-4 shadow-sm border border-stone-200">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 pt-0.5">
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
        </div>
        <div className="flex-grow text-sm text-stone-700 min-h-[36px] leading-relaxed">
          {isLoading && (
            <div className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span className="text-stone-500">AI denkt nach...</span>
            </div>
          )}
          {!isLoading && displayMessage && (
            <div className="prose prose-sm max-w-none">
              {displayMessage}
            </div>
          )}
          {!isLoading && !displayMessage && (
            <div className="text-stone-500 italic">
              Stellen Sie eine Frage zur Nährstoffberechnung...
            </div>
          )}
        </div>
      </div>
      {!isLoading && displayMessage && suggestions.length > 0 && (
        <div className="mt-4 pl-11">
          <div className="text-xs text-stone-500 mb-2">Vorschläge:</div>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => suggestionClicked(s)}
                className="px-3 py-1 text-xs bg-white border border-stone-200 rounded-full hover:bg-stone-50 hover:border-emerald-300 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
                aria-label={`Vorschlag: ${s}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}
      <form onSubmit={handleSend} className="mt-4 flex items-center gap-3 pl-11">
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={!apiKey ? 'API Key fehlt' : 'Stellen Sie eine Frage zur Nährstoffberechnung...'}
            className="w-full px-4 py-2.5 bg-white border border-stone-300 rounded-lg text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            disabled={isLoading || !apiKey}
            aria-label="KI Frage eingeben"
          />
        </div>
        <Button
          type="submit"
          variant="primary"
          size="md"
          loading={isLoading}
          disabled={!inputValue.trim() || !apiKey}
          aria-label="Frage senden"
          rightIcon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          }
        >
          Fragen
        </Button>
      </form>
    </div>
  );
});

ChatBar.displayName = 'ChatBar';

export default ChatBar;
