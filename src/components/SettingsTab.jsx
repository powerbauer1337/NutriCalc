import React from 'react';
import { useApiKey } from '../hooks/useApiKey.js';

const SettingsTab = () => {
  const { apiKey, updateApiKey, removeApiKey } = useApiKey();
  const [inputValue, setInputValue] = React.useState(apiKey || '');

  const handleSave = () => {
    updateApiKey(inputValue.trim());
  };

  const handleRemove = () => {
    removeApiKey();
    setInputValue('');
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white dark:bg-slate-800 rounded-lg shadow space-y-6">
      <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">Einstellungen</h2>
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="apiKey">Gemini API Key</label>
        <input
          id="apiKey"
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          className="w-full px-2 py-1 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-slate-100"
          placeholder="API Key eingeben..."
        />
        <div className="flex gap-2 mt-2">
          <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Speichern</button>
          <button onClick={handleRemove} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Entfernen</button>
        </div>
        <div className="text-xs text-slate-500 mt-2">Dein API Key wird lokal im Browser gespeichert.</div>
      </div>
      {/* Add more settings here as needed */}
    </div>
  );
};

export default SettingsTab; 