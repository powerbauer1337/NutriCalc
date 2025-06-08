import React, { useState, useEffect } from 'react';
import { calculateNutrientResults } from '../utils/calculateNutrients.js';
import { useToasts } from '../contexts/ToastContext.jsx';
import FertilizerManager from './FertilizerManager.jsx';
import { GROWTH_STAGES, WATER_TYPES } from '../constants';

const initialCustomWaterProfile = { ca: 0, mg: 0, s: 0, na: 0, cl: 0, no3: 0, so4: 0, po4: 0, baseEC: 0.0 };

const defaultFertilizerSelection = [
  // Example: { id: 'hesi_tnt', amount: 3.0, active: true },
];

export const SetupTab = ({ NUTRIENT_FIELDS, GROWTH_STAGES, WATER_TYPES, fertilizerDatabase, onAnalysisUpdate, mixedWater }) => {
  const addToast = useToasts();
  const [waterVolume, setWaterVolume] = useState(10);
  const [growthStage, setGrowthStage] = useState(Object.keys(GROWTH_STAGES)[0]);
  const [waterType, setWaterType] = useState(Object.keys(WATER_TYPES)[0]);
  const [customWaterProfile, setCustomWaterProfile] = useState(initialCustomWaterProfile);
  const [selectedFertilizers, setSelectedFertilizers] = useState(defaultFertilizerSelection);
  const [results, setResults] = useState({ nutrients: {}, contributions: {}, stage: GROWTH_STAGES[growthStage] });

  useEffect(() => {
    const newResults = calculateNutrientResults({
      waterVolume,
      growthStage,
      waterType,
      selectedFertilizers,
      fertilizerDatabase: fertilizerDatabase || {},
      customWaterProfile,
      NUTRIENT_FIELDS,
      GROWTH_STAGES,
      WATER_TYPES,
      mixedWater,
    });
    setResults(newResults);
    if (onAnalysisUpdate) {
      onAnalysisUpdate({
        NUTRIENT_FIELDS,
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
  }, [waterVolume, growthStage, waterType, customWaterProfile, selectedFertilizers, fertilizerDatabase, NUTRIENT_FIELDS, GROWTH_STAGES, WATER_TYPES, mixedWater]);

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

  // Main nutrients to display
  const mainNutrients = [
    { key: 'n', label: 'N (Stickstoff)', unit: 'ppm' },
    { key: 'p', label: 'P (Phosphor)', unit: 'ppm' },
    { key: 'k', label: 'K (Kalium)', unit: 'ppm' },
    { key: 'ec', label: 'EC', unit: 'mS/cm' },
  ];

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

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-4 bg-white dark:bg-slate-800 rounded-lg shadow">
      <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">Setup</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="waterVolume">Wassermenge (Liter)</label>
            <input
              id="waterVolume"
              type="number"
              min="0.1"
              step="0.1"
              value={waterVolume}
              onChange={(e) => setWaterVolume(Math.max(0.1, Number(e.target.value)))}
              className="w-full px-2 py-1 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-slate-100"
              placeholder="z.B. 10"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="growthStage">Wachstumsphase</label>
            <select
              id="growthStage"
              value={growthStage}
              onChange={(e) => setGrowthStage(e.target.value)}
              className="w-full px-2 py-1 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-slate-100"
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
              className="w-full px-2 py-1 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-slate-100"
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
                      className="w-full px-2 py-1 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-slate-100 text-xs"
                      min="0"
                      step="0.01"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div>
          <h3 className="text-md font-semibold text-slate-800 dark:text-slate-100 mb-2">Dünger & Dosierung</h3>
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
          {mainNutrients.map(nutrient => (
            <div key={nutrient.key} className="flex flex-col items-center p-2 bg-white dark:bg-slate-800 rounded shadow text-center">
              <span className="text-xs text-slate-500 dark:text-slate-400">{nutrient.label}</span>
              <span className="text-lg font-bold text-blue-700 dark:text-blue-300">{results.nutrients?.[nutrient.key] ?? 0} {nutrient.unit}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-2 mb-4">
        <button onClick={handleExport} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs">Exportieren</button>
        <label className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs cursor-pointer">
          Importieren
          <input type="file" accept="application/json" onChange={handleImport} className="hidden" />
        </label>
      </div>
    </div>
  );
};

export default SetupTab; 