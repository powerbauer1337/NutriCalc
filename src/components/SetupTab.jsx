import React, { useState, useEffect } from 'react';
import { calculateNutrientResults } from '../utils/calculateNutrients.js';
import { useToasts } from '../contexts/ToastContext.jsx';
import FertilizerManager from './FertilizerManager.jsx';
import WaterInput from './WaterInput.jsx';
import { GROWTH_STAGES, WATER_TYPES, NUTRIENT_FIELDS } from '../constants';
import useAppSettings from '../hooks/useAppSettings.js';

const initialCustomWaterProfile = { ca: 0, mg: 0, s: 0, na: 0, cl: 0, no3: 0, so4: 0, po4: 0, baseEC: 0.0 };

const defaultFertilizerSelection = [
  // Example: { id: 'hesi_tnt', amount: 3.0, active: true },
];

const mainNutrients = [
  { key: 'n', label: 'N (Stickstoff)', unit: 'ppm' },
  { key: 'p', label: 'P (Phosphor)', unit: 'ppm' },
  { key: 'k', label: 'K (Kalium)', unit: 'ppm' },
  { key: 'ec', label: 'EC', unit: 'mS/cm' },
];

export const SetupTab = ({ NUTRIENT_FIELDS: propNutrientFields, GROWTH_STAGES, WATER_TYPES, fertilizerDatabase, onAnalysisUpdate, mixedWater }) => {
  const addToast = useToasts();
  const { settings } = useAppSettings();

  const [waterVolume, setWaterVolume] = useState(() => {
    const defaultVolume = settings.waterAmount ? Number(settings.waterAmount) : 10;
    return Math.max(0.1, defaultVolume);
  });
  const [growthStage, setGrowthStage] = useState(settings.growthPhase || Object.keys(GROWTH_STAGES)[0]);
  const [waterType, setWaterType] = useState(settings.waterType || Object.keys(WATER_TYPES)[0]);
  const [customWaterProfile, setCustomWaterProfile] = useState(initialCustomWaterProfile);
  const [selectedFertilizers, setSelectedFertilizers] = useState(defaultFertilizerSelection);

  const initialNutrientResults = {};
  mainNutrients.forEach(field => {
    initialNutrientResults[field.key] = 0;
  });

  const [results, setResults] = useState({ nutrients: initialNutrientResults, contributions: {}, stage: GROWTH_STAGES[growthStage] });

  useEffect(() => {
    const newResults = calculateNutrientResults({
      waterVolume,
      growthStage,
      waterType,
      selectedFertilizers,
      fertilizerDatabase: fertilizerDatabase || {},
      customWaterProfile,
      NUTRIENT_FIELDS: propNutrientFields,
      GROWTH_STAGES,
      WATER_TYPES,
      mixedWater,
    });
    const populatedNutrients = {};
    mainNutrients.forEach(nutrient => {
      populatedNutrients[nutrient.key] = newResults.nutrients?.[nutrient.key] ?? 0;
    });

    setResults({ ...newResults, nutrients: populatedNutrients });
    if (onAnalysisUpdate) {
      onAnalysisUpdate({
        NUTRIENT_FIELDS: propNutrientFields,
        GROWTH_STAGES,
        WATER_TYPES,
        fertilizerDatabase,
        selectedFertilizers,
        waterVolume,
        growthStage,
        waterType,
        customWaterProfile,
        results: newResults,
        mixedWater,
      });
    }
  }, [waterVolume, growthStage, waterType, customWaterProfile, selectedFertilizers, fertilizerDatabase, propNutrientFields, GROWTH_STAGES, WATER_TYPES, mixedWater]);

  // Refresh selectedFertilizers if fertilizerDatabase changes (e.g., custom fertilizer added/removed)
  useEffect(() => {
    setSelectedFertilizers(prev => prev.filter(f => fertilizerDatabase[f.id]));
  }, [fertilizerDatabase]);

  // Fertilizer handlers
  const addFertilizer = (id) => {
    if (!id || selectedFertilizers.find(f => f.id === id)) return;
    const fert = fertilizerDatabase[id];
    setSelectedFertilizers(prev => [...prev, { id, amount: fert?.type === 'powder' ? 0.1 : 1.0, active: true }]);
  };
  const removeFertilizer = (id) => {
    setSelectedFertilizers(prev => prev.filter(f => f.id !== id));
  };
  const updateFertilizerAmount = (id, value) => {
    const amount = parseFloat(value);
    setSelectedFertilizers(prev => prev.map(f => f.id === id ? { ...f, amount: isNaN(amount) || amount < 0 ? 0 : amount } : f));
  };
  const toggleFertilizer = (id) => {
    setSelectedFertilizers(prev => prev.map(f => f.id === id ? { ...f, active: !f.active } : f));
  };

  // Export/Import logic
  const handleExport = () => {
    try {
      const customFertilizers = JSON.parse(localStorage.getItem('nutricalc_custom_fertilizers') || '[]');
      const data = {
        selectedFertilizers,
        waterVolume,
        growthStage,
        waterType,
        customWaterProfile,
        customFertilizers,
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'nutricalc-setup.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      addToast('Setup exportiert!', 'success');
    } catch (e) {
      addToast('Fehler beim Export!', 'error');
    }
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = JSON.parse(evt.target.result);
        if (!data || typeof data !== 'object') throw new Error();
        setSelectedFertilizers(Array.isArray(data.selectedFertilizers) ? data.selectedFertilizers : []);
        setWaterVolume(Number(data.waterVolume) || 10);
        setGrowthStage(data.growthStage || Object.keys(GROWTH_STAGES)[0]);
        setWaterType(data.waterType || Object.keys(WATER_TYPES)[0]);
        setCustomWaterProfile(typeof data.customWaterProfile === 'object' ? data.customWaterProfile : initialCustomWaterProfile);
        if (Array.isArray(data.customFertilizers)) {
          localStorage.setItem('nutricalc_custom_fertilizers', JSON.stringify(data.customFertilizers));
          if (window.dispatchEvent) {
            window.dispatchEvent(new StorageEvent('storage', { key: 'nutricalc_custom_fertilizers' }));
          }
        }
        addToast('Setup importiert!', 'success');
      } catch (e) {
        addToast('Ungültige Datei!', 'error');
      }
    };
    reader.readAsText(file);
  };

  // Auto-Optimize logic
  const autoOptimize = () => {
    // Example logic: set recommended amounts for common fertilizers based on growthStage
    let updated = [...selectedFertilizers];
    let changed = false;
    if (growthStage.includes('veg')) {
      updated = updated.map(f =>
        f.id === 'hesi_tnt' ? { ...f, amount: 5.0, active: true } :
        f.id === 'ta_calmg' ? { ...f, amount: 2.5, active: true } : f
      );
      changed = true;
    } else if (growthStage.includes('flower')) {
      updated = updated.map(f =>
        f.id === 'hesi_bloom' ? { ...f, amount: 6.0, active: true } : f
      );
      changed = true;
    }
    if (changed) {
      setSelectedFertilizers(updated);
      addToast('Empfohlene Dosierung geladen!', 'info');
    } else {
      addToast('Keine Empfehlung für diese Phase.', 'warning');
    }
  };

  // Clear All Data logic
  const clearAllData = () => {
    if (window.confirm('Alle Daten (eigene Dünger, Wasserprofil, Auswahl) wirklich löschen?')) {
      setSelectedFertilizers([]);
      setCustomWaterProfile(initialCustomWaterProfile);
      localStorage.removeItem('nutricalc_custom_fertilizers');
      addToast('Alle Daten wurden zurückgesetzt.', 'info');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-4 bg-white dark:bg-slate-800 rounded-lg shadow">
      <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">Setup</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="waterVolume">Wassermenge ({settings.unit === 'liter' ? 'Liter' : 'Gallonen'})</label>
            <input
              id="waterVolume"
              type="number"
              min="0.1"
              step="0.1"
              value={waterVolume}
              onChange={(e) => setWaterVolume(Math.max(0.1, Number(e.target.value)))}
              className="w-full px-2 py-1 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-slate-100 bg-white text-gray-900"
              placeholder="z.B. 10"
              aria-label="Wassermenge"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="growthStage">Wachstumsphase</label>
            <select
              id="growthStage"
              value={growthStage}
              onChange={(e) => setGrowthStage(e.target.value)}
              className="w-full px-2 py-1 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-slate-100 bg-white text-gray-900"
              aria-label="Wachstumsphase"
            >
              {Object.entries(GROWTH_STAGES).map(([key, stage]) => (
                <option key={key} value={key}>{stage.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="waterType">Wassertyp</label>
            <select
              id="waterType"
              value={waterType}
              onChange={(e) => setWaterType(e.target.value)}
              className="w-full px-2 py-1 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-slate-100 bg-white text-gray-900"
              aria-label="Wassertyp"
            >
              {Object.entries(WATER_TYPES).map(([key, type]) => (
                <option key={key} value={key}>{type.name}</option>
              ))}
            </select>
          </div>
          {waterType === 'custom' && (
            <div className="mt-3">
              <h3 className="text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">Eigenes Wasserprofil</h3>
              <div className="grid grid-cols-2 gap-2">
                {Object.keys(initialCustomWaterProfile).map((key) => (
                  <div key={key}>
                    <label className="block text-xs font-medium mb-0.5" htmlFor={key}>{key.toUpperCase()}</label>
                    <input
                      type="number"
                      name={key}
                      value={customWaterProfile[key]}
                      onChange={e => setCustomWaterProfile(prev => ({ ...prev, [key]: parseFloat(e.target.value) || 0 }))}
                      className="w-full px-2 py-1 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-slate-100 bg-white text-gray-900 text-xs"
                      min="0"
                      step="0.01"
                      aria-label={key.toUpperCase()}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div>
          <WaterInput />
          {mixedWater && (
            <div className="mt-6 p-4 bg-gray-700 rounded-md text-white">
              <h3 className="text-lg font-semibold mb-2">Gemischtes Wasser Ergebnis:</h3>
              <p>pH: {mixedWater.ph?.toFixed(2) ?? 'N/A'}</p>
              <p>EC: {mixedWater.ec?.toFixed(2) ?? 'N/A'} mS/cm</p>
              <p>Ca: {mixedWater.ca?.toFixed(1) ?? 'N/A'} mg/L</p>
              <p>Mg: {mixedWater.mg?.toFixed(1) ?? 'N/A'} mg/L</p>
              <p>Na: {mixedWater.na?.toFixed(1) ?? 'N/A'} mg/L</p>
              <p>Gesamtvolumen: {mixedWater.totalVolume?.toFixed(1) ?? 'N/A'} L</p>
            </div>
          )}
          <h3 className="text-md font-semibold text-slate-800 dark:text-slate-100 mb-2 mt-4">Dünger & Dosierung</h3>
          <FertilizerManager
            selectedFertilizers={selectedFertilizers}
            fertilizerDatabase={fertilizerDatabase}
            waterVolume={waterVolume}
            addFertilizer={addFertilizer}
            removeFertilizer={removeFertilizer}
            updateFertilizerAmount={updateFertilizerAmount}
            toggleFertilizer={toggleFertilizer}
          />
        </div>
      </div>
      <div className="mt-6 p-4 bg-slate-100 dark:bg-slate-900 rounded-lg">
        <h3 className="font-semibold mb-2 text-slate-800 dark:text-slate-100">Berechnete Hauptwerte</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {results && results.nutrients && mainNutrients.map(nutrient => (
            <div key={nutrient.key} className="flex flex-col items-center p-2 bg-white dark:bg-slate-800 rounded shadow text-center">
              <span className="text-xs text-slate-500 dark:text-slate-400">{nutrient.label}</span>
              <span className="text-lg font-bold text-blue-700 dark:text-blue-300">
                {results?.nutrients?.[nutrient.key] !== undefined &&
                 results.nutrients?.[nutrient.key] !== null &&
                 !isNaN(results.nutrients?.[nutrient.key])
                  ? results.nutrients[nutrient.key].toFixed(2)
                  : '0.00'}
                {''} {nutrient.unit}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-2 mb-4">
        <button onClick={handleExport} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs" aria-label="Exportieren">Exportieren</button>
        <label className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 focus-within:ring-2 focus-within:ring-green-500 text-xs cursor-pointer" aria-label="Importieren">
          Importieren
          <input type="file" accept="application/json" onChange={handleImport} className="hidden" />
        </label>
        <button onClick={autoOptimize} className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-xs" aria-label="Auto-Optimieren">Auto-Optimieren</button>
        <button onClick={clearAllData} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 text-xs" aria-label="Alle Daten löschen">Alle Daten löschen</button>
      </div>
    </div>
  );
};

export default SetupTab; 