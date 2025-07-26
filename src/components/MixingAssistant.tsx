import React, { useState, useEffect } from 'react';
import { calculateNutrientResults } from '../utils/calculateNutrients';
import Button from './Button';
import NutrientBarChart from './NutrientBarChart';

const MixingAssistant = ({ fertilizerDatabase, GROWTH_STAGES, WATER_TYPES }) => {
  // Loading state if props are missing
  if (!fertilizerDatabase || !GROWTH_STAGES || !WATER_TYPES) {
    return (
      <div className="max-w-lg mx-auto p-4 bg-white dark:bg-slate-800 rounded-lg shadow">
        Daten werden geladen...
      </div>
    );
  }

  // Stepper state
  const [step, setStep] = useState(1);
  const [waterAmount, setWaterAmount] = useState(10);
  const [waterType, setWaterType] = useState(Object.keys(WATER_TYPES)[0]);
  const [growthStage, setGrowthStage] = useState(Object.keys(GROWTH_STAGES)[0]);
  const [selectedFertilizers, setSelectedFertilizers] = useState([]);
  const [nutrientResults, setNutrientResults] = useState({
    nutrients: {},
    contributions: {},
    stage: GROWTH_STAGES[growthStage],
  });

  useEffect(() => {
    const results = calculateNutrientResults({
      waterVolume: waterAmount,
      growthStage,
      waterType,
      selectedFertilizers,
      fertilizerDatabase,
      NUTRIENT_FIELDS: [{ key: 'n' }, { key: 'p' }, { key: 'k' }, { key: 'ec' }, { key: 'ph' }],
      GROWTH_STAGES,
      WATER_TYPES,
      customWaterProfile: {},
      mixedWater: undefined,
    });
    setNutrientResults(results);
  }, [
    waterAmount,
    growthStage,
    waterType,
    selectedFertilizers,
    fertilizerDatabase,
    GROWTH_STAGES,
    WATER_TYPES,
  ]);

  // Fertilizer selection handlers
  const addFertilizer = (id) => {
    if (!id || selectedFertilizers.find((f) => f.id === id)) return;
    const fert = fertilizerDatabase[id];
    setSelectedFertilizers((prev) => [
      ...prev,
      { id, amount: fert?.type === 'powder' ? 0.1 : 1.0 },
    ]);
  };
  const removeFertilizer = (id) => {
    setSelectedFertilizers((prev) => prev.filter((f) => f.id !== id));
  };
  const updateFertilizerAmount = (id, value) => {
    const amount = parseFloat(value);
    setSelectedFertilizers((prev) =>
      prev.map((f) =>
        f.id === id ? { ...f, amount: isNaN(amount) || amount < 0 ? 0 : amount } : f
      )
    );
  };

  // Calculate mixing instructions (simple summary)
  const mixSummary = selectedFertilizers
    .map((f) => {
      const fert = fertilizerDatabase[f.id];
      return fert
        ? `${fert.name}: ${f.amount} ${fert.unit || (fert.type === 'powder' ? 'g' : 'ml')}`
        : '';
    })
    .filter(Boolean);

  // Export mix as JSON
  const handleExport = () => {
    const data = {
      waterAmount,
      waterType,
      growthStage,
      selectedFertilizers,
      date: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nutricalc-mix.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white dark:bg-slate-800 rounded-lg shadow space-y-6">
      <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
        Misch-Assistent
      </h2>
      {/* Stepper */}
      <div className="flex items-center gap-2 mb-4">
        <div
          className={`w-8 h-8 flex items-center justify-center rounded-full ${step === 1 ? 'bg-blue-600 text-white' : 'bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-200'}`}
        >
          1
        </div>
        <span className="text-sm">Wasser & Phase</span>
        <div className="w-6 h-0.5 bg-slate-300 dark:bg-slate-700 mx-2" />
        <div
          className={`w-8 h-8 flex items-center justify-center rounded-full ${step === 2 ? 'bg-blue-600 text-white' : 'bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-200'}`}
        >
          2
        </div>
        <span className="text-sm">Dünger</span>
        <div className="w-6 h-0.5 bg-slate-300 dark:bg-slate-700 mx-2" />
        <div
          className={`w-8 h-8 flex items-center justify-center rounded-full ${step === 3 ? 'bg-blue-600 text-white' : 'bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-200'}`}
        >
          3
        </div>
        <span className="text-sm">Anleitung</span>
      </div>
      {/* Step 1: Water & Phase */}
      {step === 1 && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="waterAmount">
              Wassermenge (L)
            </label>
            <input
              id="waterAmount"
              type="number"
              min="0.1"
              step="0.1"
              value={waterAmount}
              onChange={(e) => setWaterAmount(Math.max(0.1, Number(e.target.value)))}
              className="w-full px-2 py-1 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-slate-100"
              placeholder="z.B. 10"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="waterType">
              Wassertyp
            </label>
            <select
              id="waterType"
              value={waterType}
              onChange={(e) => setWaterType(e.target.value)}
              className="w-full px-2 py-1 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-slate-100"
            >
              {Object.entries(WATER_TYPES).map(([key, type]) => (
                <option key={key} value={key}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="growthStage">
              Wachstumsphase
            </label>
            <select
              id="growthStage"
              value={growthStage}
              onChange={(e) => setGrowthStage(e.target.value)}
              className="w-full px-2 py-1 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-slate-100"
            >
              {Object.entries(GROWTH_STAGES).map(([key, stage]) => (
                <option key={key} value={key}>
                  {stage.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end">
            <Button onClick={() => setStep(2)} variant="primary">
              Weiter
            </Button>
          </div>
        </div>
      )}
      {/* Step 2: Fertilizers */}
      {step === 2 && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Dünger auswählen</label>
            <div className="flex gap-2 flex-wrap">
              {Object.entries(fertilizerDatabase).map(([id, fert]) => (
                <Button
                  key={id}
                  variant="secondary"
                  onClick={() => addFertilizer(id)}
                  disabled={!!selectedFertilizers.find((f) => f.id === id)}
                  className="text-xs mb-1"
                >
                  {fert.name}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Ausgewählte Dünger & Mengen</label>
            <ul className="space-y-2">
              {selectedFertilizers.length === 0 && (
                <li className="text-slate-500">Noch keine Dünger ausgewählt.</li>
              )}
              {selectedFertilizers.map((f) => {
                const fert = fertilizerDatabase[f.id];
                return (
                  <li key={f.id} className="flex items-center gap-2">
                    <span className="flex-1">{fert?.name || f.id}</span>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={f.amount}
                      onChange={(e) => updateFertilizerAmount(f.id, e.target.value)}
                      className="w-20 px-2 py-1 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-slate-100 text-xs"
                    />
                    <span className="text-xs">
                      {fert?.unit || (fert?.type === 'powder' ? 'g' : 'ml')}
                    </span>
                    <Button
                      onClick={() => removeFertilizer(f.id)}
                      variant="danger"
                      className="text-xs"
                    >
                      Entfernen
                    </Button>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="mt-6">
            <h3 className="text-md font-semibold text-slate-800 dark:text-slate-100 mb-2">
              Nährstoffwerte (Live)
            </h3>
            <NutrientBarChart
              nutrients={nutrientResults.nutrients}
              stage={nutrientResults.stage}
              fields={[
                { key: 'n', label: 'N (Stickstoff)', unit: 'ppm' },
                { key: 'p', label: 'P (Phosphor)', unit: 'ppm' },
                { key: 'k', label: 'K (Kalium)', unit: 'ppm' },
                { key: 'ec', label: 'EC', unit: 'mS/cm' },
                { key: 'ph', label: 'pH', unit: '' },
              ]}
            />
          </div>
          <div className="flex justify-between">
            <Button onClick={() => setStep(1)} variant="secondary">
              Zurück
            </Button>
            <Button
              onClick={() => setStep(3)}
              variant="primary"
              disabled={selectedFertilizers.length === 0}
            >
              Weiter
            </Button>
          </div>
        </div>
      )}
      {/* Step 3: Mixing Instructions */}
      {step === 3 && (
        <div className="space-y-4">
          <div>
            <h3 className="text-md font-semibold mb-2">Mischanleitung</h3>
            <ol className="list-decimal list-inside space-y-1">
              <li>
                Fülle <span className="font-bold">{waterAmount} L</span> Wasser (
                {WATER_TYPES[waterType]?.name || waterType}) in einen sauberen Behälter.
              </li>
              {mixSummary.map((line, idx) => (
                <li key={idx}>
                  Füge <span className="font-bold">{line}</span> hinzu und gut umrühren.
                </li>
              ))}
              <li>Überprüfe den pH- und EC-Wert und passe ggf. an.</li>
            </ol>
            <div className="text-xs text-slate-500 mt-2">
              Hinweis: Reihenfolge kann je nach Dünger variieren. Immer Herstellerhinweise beachten.
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setStep(2)} variant="secondary">
              Zurück
            </Button>
            <Button onClick={handleExport} variant="primary">
              Mix als JSON exportieren
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MixingAssistant;
