import React, { useState, useRef } from 'react';

const ChatBar = ({ apiKey, onSend, isLoading, displayMessage, suggestions = [] }) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim() || !apiKey) return;
    onSend(inputValue.trim());
    setInputValue('');
  };

  const suggestionClicked = (suggestion) => {
    setInputValue(suggestion);
    inputRef.current?.focus();
  };

  return (
    <div className="mb-4 p-3 bg-slate-200 dark:bg-slate-700 rounded-lg shadow">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 text-blue-600 dark:text-blue-400 pt-0.5">
          {/* Icon placeholder */}
          <span className="icon-placeholder">AI</span>
        </div>
        <div className="flex-grow text-sm text-slate-700 dark:text-slate-200 min-h-[36px]">
          {isLoading ? <span className="loader loader-gray !w-4 !h-4 !mr-2"></span> : ''} {displayMessage}
        </div>
      </div>
      {!isLoading && displayMessage && suggestions.length > 0 && (
        <div className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 pl-8">
          <span>Vorschläge: </span>
          {suggestions.map((s, i) => (
            <button key={i} onClick={() => suggestionClicked(s)} className="underline hover:text-blue-500 dark:hover:text-blue-400 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500" aria-label={`Vorschlag: ${s}`}>{s}</button>
          ))}
        </div>
      )}
      <form onSubmit={handleSend} className="mt-2 flex items-center gap-2 pl-8">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={!apiKey ? "API Key fehlt" : "Stell deine Frage an die KI..."}
          className="flex-1 px-3 py-1.5 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          disabled={isLoading || !apiKey}
          aria-label="KI Frage eingeben"
        />
        <button
          type="submit"
          className="px-3 py-1.5 bg-blue-600 dark:bg-blue-700 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center gap-1 text-sm disabled:bg-slate-400 dark:disabled:bg-slate-500"
          aria-label="Frage senden"
          disabled={isLoading || !inputValue.trim() || !apiKey}
        >
          {isLoading ? <span className="loader !w-4 !h-4"></span> : "Fragen"}
        </button>
      </form>
    </div>
  );
};

export default ChatBar; 