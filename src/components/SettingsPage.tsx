import React from 'react';
import { useApiKey } from '../hooks/useApiKey.js';
import useAppSettings from '../hooks/useAppSettings';
import { GROWTH_STAGES, WATER_TYPES } from '../constants/index.js';
import { useTheme } from '../contexts/ThemeContext';
import Button from './Button';
import AISettings from './AIAssistant/AISettings';

const SettingsPage = () => {
  const { apiKey, updateApiKey, removeApiKey } = useApiKey();
  const [inputValue, setInputValue] = React.useState(apiKey || '');
  const { settings, updateSetting } = useAppSettings();
  const { theme, toggleTheme } = useTheme();

  const handleSaveApiKey = () => {
    updateApiKey(inputValue.trim());
  };

  const handleRemoveApiKey = () => {
    removeApiKey();
    setInputValue('');
  };

  const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateSetting('unit', e.target.value);
  };

  const handleDefaultWaterAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSetting('waterAmount', e.target.value);
  };

  const handleDefaultGrowthPhaseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateSetting('growthPhase', e.target.value);
  };

  const handleDefaultWaterTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateSetting('waterType', e.target.value);
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white dark:bg-slate-800 rounded-lg shadow space-y-6">
      <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
        Einstellungen
      </h2>
      {/* Gemini API Key Setting */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="apiKey">
          Gemini API Key
        </label>
        <input
          id="apiKey"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full px-2 py-1 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-slate-100"
          placeholder="API Key eingeben..."
        />
        <div className="flex gap-2 mt-2">
          <Button
            onClick={handleSaveApiKey}
            variant="primary"
            aria-label="API Key speichern"
            title="API Key speichern"
          >
            Speichern
          </Button>
          <Button
            onClick={handleRemoveApiKey}
            variant="danger"
            aria-label="API Key entfernen"
            title="API Key entfernen"
          >
            Entfernen
          </Button>
        </div>
        <div className="text-xs text-slate-500 mt-2">
          Dein API Key wird lokal im Browser gespeichert.
        </div>
      </div>
      {/* Unit Setting */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="unit">
          Einheit für Wassermenge
        </label>
        <select
          id="unit"
          value={settings.unit}
          onChange={handleUnitChange}
          className="w-full px-2 py-1 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-slate-100"
        >
          <option value="liter">Liter</option>
          <option value="gallon">Gallonen</option>
        </select>
      </div>
      {/* Default Water Amount */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="defaultWaterAmount">
          Standard-Wassermenge (ml/oz)
        </label>
        <input
          id="defaultWaterAmount"
          type="number"
          value={settings.waterAmount}
          onChange={handleDefaultWaterAmountChange}
          className="w-full px-2 py-1 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-slate-100"
          placeholder="Standard-Wassermenge eingeben..."
        />
      </div>
      {/* Default Growth Phase */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="defaultGrowthPhase">
          Standard-Wachstumsphase
        </label>
        <select
          id="defaultGrowthPhase"
          value={settings.growthPhase}
          onChange={handleDefaultGrowthPhaseChange}
          className="w-full px-2 py-1 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-slate-100"
        >
          <option value="">Auswählen...</option>
          {Object.entries(GROWTH_STAGES).map(([key, stage]) => (
            <option key={key} value={key}>
              {stage.name}
            </option>
          ))}
        </select>
      </div>
      {/* Default Water Type */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="defaultWaterType">
          Standard-Wassertyp
        </label>
        <select
          id="defaultWaterType"
          value={settings.waterType}
          onChange={handleDefaultWaterTypeChange}
          className="w-full px-2 py-1 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-slate-100"
        >
          <option value="">Auswählen...</option>
          {Object.entries(WATER_TYPES).map(([key, type]) => (
            <option key={key} value={key}>
              {type.name}
            </option>
          ))}
        </select>
      </div>
      {/* Dark Mode Toggle */}
      <div className="flex items-center gap-3 pt-2">
        <span className="text-sm font-medium">Dark Mode</span>
        <Button
          onClick={toggleTheme}
          variant="secondary"
          aria-label="Dark Mode umschalten"
          title="Dark Mode umschalten"
        >
          {theme === 'dark' ? 'Deaktivieren' : 'Aktivieren'}
        </Button>
        <span className="text-xs text-slate-500">
          Aktuell: {theme === 'dark' ? 'Dunkel' : 'Hell'}
        </span>
      </div>

      {/* AI Assistant Settings */}
      <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
          AI-Assistent
        </h3>
        <AISettings
          language="de"
          onSettingsChange={(_settings) => {
            // AI settings updated - could be used for analytics
          }}
        />
      </div>
    </div>
  );
};

export default SettingsPage;
