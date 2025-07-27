import React, { useState, useEffect } from 'react';
import { calculateNutrientResults } from '../utils/calculateNutrients';
import { useToasts } from '../contexts/ToastContext';
import FertilizerManager from './FertilizerManager';
import WaterInput from './WaterInput';
import { GROWTH_STAGES, WATER_TYPES, NUTRIENT_FIELDS } from '../constants';
import useAppSettings from '../hooks/useAppSettings';
import Button from './Button';
import { Card, CardHeader, CardTitle, CardContent } from './Card';
import { Fertilizer } from '../types';

const initialCustomWaterProfile = {
  ca: 0,
  mg: 0,
  s: 0,
  na: 0,
  cl: 0,
  no3: 0,
  so4: 0,
  po4: 0,
  baseEC: 0.0,
};

const defaultFertilizerSelection: Array<{ id: string; amount: number; active: boolean }> = [
  // Example: { id: 'hesi_tnt', amount: 3.0, active: true },
];

const mainNutrients = [
  { key: 'n', label: 'N (Stickstoff)', unit: 'ppm' },
  { key: 'p', label: 'P (Phosphor)', unit: 'ppm' },
  { key: 'k', label: 'K (Kalium)', unit: 'ppm' },
  { key: 'ec', label: 'EC', unit: 'mS/cm' },
];

interface SetupTabProps {
  NUTRIENT_FIELDS: typeof NUTRIENT_FIELDS;
  GROWTH_STAGES: typeof GROWTH_STAGES;
  WATER_TYPES: typeof WATER_TYPES;
  fertilizerDatabase: Record<string, Fertilizer>;
  onAnalysisUpdate?: (data: {
    NUTRIENT_FIELDS: typeof NUTRIENT_FIELDS;
    GROWTH_STAGES: typeof GROWTH_STAGES;
    WATER_TYPES: typeof WATER_TYPES;
    fertilizerDatabase: Record<string, Fertilizer>;
    selectedFertilizers: Array<{ id: string; amount: number; active: boolean }>;
    waterVolume: number;
    growthStage: string;
    waterType: string;
    customWaterProfile: Record<string, number>;
    results: {
      nutrients: Record<string, number>;
      contributions: Record<string, Record<string, number>>;
      stage: any;
    };
    mixedWater?: Record<string, number>;
  }) => void;
  mixedWater?: Record<string, number>;
}

export const SetupTab: React.FC<SetupTabProps> = ({
  NUTRIENT_FIELDS: propNutrientFields,
  GROWTH_STAGES,
  WATER_TYPES,
  fertilizerDatabase,
  onAnalysisUpdate,
  mixedWater,
}) => {
  const { addToast } = useToasts();
  const { settings } = useAppSettings();

  const [waterVolume, setWaterVolume] = useState(() => {
    const defaultVolume = settings.waterAmount ? Number(settings.waterAmount) : 10;
    return Math.max(0.1, defaultVolume);
  });
  const [growthStage, setGrowthStage] = useState(
    settings.growthPhase || Object.keys(GROWTH_STAGES)[0]
  );
  const [waterType, setWaterType] = useState(settings.waterType || Object.keys(WATER_TYPES)[0]);
  const [customWaterProfile, setCustomWaterProfile] =
    useState<Record<string, number>>(initialCustomWaterProfile);
  const [selectedFertilizers, setSelectedFertilizers] = useState<
    Array<{ id: string; amount: number; active: boolean }>
  >(defaultFertilizerSelection);

  const initialNutrientResults: Record<string, number> = {};
  mainNutrients.forEach((field) => {
    initialNutrientResults[field.key] = 0;
  });

  const [results, setResults] = useState({
    nutrients: initialNutrientResults,
    contributions: {} as Record<string, Record<string, number>>,
    stage: GROWTH_STAGES[growthStage],
  });

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
    mainNutrients.forEach((nutrient) => {
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
  }, [
    waterVolume,
    growthStage,
    waterType,
    customWaterProfile,
    selectedFertilizers,
    fertilizerDatabase,
    propNutrientFields,
    GROWTH_STAGES,
    WATER_TYPES,
    mixedWater,
  ]);

  // Refresh selectedFertilizers if fertilizerDatabase changes (e.g., custom fertilizer added/removed)
  useEffect(() => {
    setSelectedFertilizers((prev) => prev.filter((f) => fertilizerDatabase[f.id]));
  }, [fertilizerDatabase]);

  // Fertilizer handlers
  const addFertilizer = (id: string) => {
    if (!id || selectedFertilizers.find((f) => f.id === id)) return;
    const fert = fertilizerDatabase[id];
    setSelectedFertilizers((prev) => [
      ...prev,
      { id, amount: fert?.type === 'powder' ? 0.1 : 1.0, active: true },
    ]);
  };
  const removeFertilizer = (id: string) => {
    setSelectedFertilizers((prev) => prev.filter((f) => f.id !== id));
  };
  const updateFertilizerAmount = (id: string, value: string) => {
    const amount = parseFloat(value);
    setSelectedFertilizers((prev) =>
      prev.map((f) =>
        f.id === id ? { ...f, amount: isNaN(amount) || amount < 0 ? 0 : amount } : f
      )
    );
  };
  const toggleFertilizer = (id: string) => {
    setSelectedFertilizers((prev) =>
      prev.map((f) => (f.id === id ? { ...f, active: !f.active } : f))
    );
  };

  // Export/Import logic
  const handleExport = () => {
    try {
      const customFertilizers = JSON.parse(
        localStorage.getItem('nutricalc_custom_fertilizers') || '[]'
      );
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
    } catch {
      addToast('Fehler beim Export!', 'error');
    }
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const result = evt.target?.result;
        if (typeof result !== 'string') throw new Error();
        const data = JSON.parse(result);
        if (!data || typeof data !== 'object') throw new Error();
        setSelectedFertilizers(
          Array.isArray(data.selectedFertilizers) ? data.selectedFertilizers : []
        );
        setWaterVolume(Number(data.waterVolume) || 10);
        setGrowthStage(data.growthStage || Object.keys(GROWTH_STAGES)[0]);
        setWaterType(data.waterType || Object.keys(WATER_TYPES)[0]);
        setCustomWaterProfile(
          typeof data.customWaterProfile === 'object'
            ? data.customWaterProfile
            : initialCustomWaterProfile
        );
        if (Array.isArray(data.customFertilizers)) {
          localStorage.setItem(
            'nutricalc_custom_fertilizers',
            JSON.stringify(data.customFertilizers)
          );
          if (window.dispatchEvent) {
            window.dispatchEvent(
              new StorageEvent('storage', { key: 'nutricalc_custom_fertilizers' })
            );
          }
        }
        addToast('Setup importiert!', 'success');
      } catch {
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
      updated = updated.map((f) =>
        f.id === 'hesi_tnt'
          ? { ...f, amount: 5.0, active: true }
          : f.id === 'ta_calmg'
            ? { ...f, amount: 2.5, active: true }
            : f
      );
      changed = true;
    } else if (growthStage.includes('flower')) {
      updated = updated.map((f) =>
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
    <div className="space-y-8">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Basic Settings Card */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Grundeinstellungen</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2" htmlFor="waterVolume">
                Wassermenge ({settings.unit === 'liter' ? 'Liter' : 'Gallonen'})
              </label>
              <input
                id="waterVolume"
                type="number"
                min="0.1"
                step="0.1"
                value={waterVolume}
                onChange={(e) => setWaterVolume(Math.max(0.1, Number(e.target.value)))}
                className="w-full px-4 py-2.5 bg-white border border-stone-300 rounded-lg text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="z.B. 10"
                aria-label="Wassermenge"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2" htmlFor="growthStage">
                Wachstumsphase
              </label>
              <select
                id="growthStage"
                value={growthStage}
                onChange={(e) => setGrowthStage(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                aria-label="Wachstumsphase"
              >
                {Object.entries(GROWTH_STAGES).map(([key, stage]) => (
                  <option key={key} value={key}>
                    {stage.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2" htmlFor="waterType">
                Wassertyp
              </label>
              <select
                id="waterType"
                value={waterType}
                onChange={(e) => setWaterType(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                aria-label="Wassertyp"
              >
                {Object.entries(WATER_TYPES).map(([key, type]) => (
                  <option key={key} value={key}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
            {waterType === 'custom' && (
              <div className="mt-6 p-4 bg-stone-50 rounded-lg border border-stone-200">
                <h3 className="text-sm font-semibold text-stone-700 mb-3">
                  Eigenes Wasserprofil
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {Object.keys(initialCustomWaterProfile).map((key) => (
                    <div key={key}>
                      <label className="block text-xs font-medium text-stone-600 mb-1" htmlFor={key}>
                        {key.toUpperCase()}
                      </label>
                      <input
                        type="number"
                        name={key}
                        value={customWaterProfile[key]}
                        onChange={(e) =>
                          setCustomWaterProfile((prev) => ({
                            ...prev,
                            [key]: parseFloat(e.target.value) || 0,
                          }))
                        }
                        className="w-full px-3 py-2 bg-white border border-stone-300 rounded-md text-stone-900 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                        min="0"
                        step="0.01"
                        aria-label={key.toUpperCase()}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-stone-200">
              <Button
                variant="secondary"
                size="sm"
                onClick={autoOptimize}
              >
                Empfohlene Dosierung laden
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleExport}
              >
                Daten exportieren
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => document.getElementById('importFile')?.click()}
              >
                Daten importieren
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={clearAllData}
              >
                Alle Daten löschen
              </Button>
            </div>

            <input
              id="importFile"
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
          </CardContent>
        </Card>
        {/* Water Input and Mixed Water Results */}
        <div className="space-y-6">
          <WaterInput />

          {mixedWater && (
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Gemischtes Wasser Ergebnis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-emerald-50 rounded-lg">
                    <div className="text-2xl font-bold text-emerald-700">
                      {mixedWater.ph?.toFixed(2) ?? 'N/A'}
                    </div>
                    <div className="text-sm text-stone-600">pH</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-700">
                      {mixedWater.ec?.toFixed(2) ?? 'N/A'}
                    </div>
                    <div className="text-sm text-stone-600">EC (mS/cm)</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-700">
                      {mixedWater.totalVolume?.toFixed(1) ?? 'N/A'}
                    </div>
                    <div className="text-sm text-stone-600">Volumen (L)</div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
                  <div>Ca: <span className="font-medium">{mixedWater.ca?.toFixed(1) ?? 'N/A'} mg/L</span></div>
                  <div>Mg: <span className="font-medium">{mixedWater.mg?.toFixed(1) ?? 'N/A'} mg/L</span></div>
                  <div>Na: <span className="font-medium">{mixedWater.na?.toFixed(1) ?? 'N/A'} mg/L</span></div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Fertilizer Manager */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Dünger & Dosierung</CardTitle>
            </CardHeader>
            <CardContent>
              <FertilizerManager
                selectedFertilizers={selectedFertilizers}
                fertilizerDatabase={fertilizerDatabase}
                waterVolume={waterVolume}
                addFertilizer={addFertilizer}
                removeFertilizer={removeFertilizer}
                updateFertilizerAmount={updateFertilizerAmount}
                toggleFertilizer={toggleFertilizer}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Results Section */}
      {results && results.nutrients && (
        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Berechnete Hauptwerte</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {mainNutrients.map((nutrient) => (
                <div
                  key={nutrient.key}
                  className="text-center p-4 bg-gradient-to-br from-stone-50 to-stone-100 rounded-lg border border-stone-200"
                >
                  <div className="text-xs font-medium text-stone-600 mb-1">{nutrient.label}</div>
                  <div className="text-2xl font-bold text-emerald-700">
                    {results?.nutrients?.[nutrient.key] !== undefined &&
                    results.nutrients?.[nutrient.key] !== null &&
                    !isNaN(results.nutrients?.[nutrient.key])
                      ? results.nutrients[nutrient.key].toFixed(2)
                      : '0.00'}
                  </div>
                  <div className="text-xs text-stone-500">{nutrient.unit}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SetupTab;
