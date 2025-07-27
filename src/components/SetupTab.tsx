import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { calculateNutrientResults } from '../utils/calculateNutrients';
import FertilizerManager from './FertilizerManager';
import WaterInput from './WaterInput';
import BasicSetupControls from './BasicSetupControls';
import NutrientResults from './NutrientResults';
import ImportExportControls from './ImportExportControls';
import { GROWTH_STAGES, WATER_TYPES, NUTRIENT_FIELDS } from '../constants';
import useAppSettings from '../hooks/useAppSettings';
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

const defaultFertilizerSelection = [
  // Example: { id: 'hesi_tnt', amount: 3.0, active: true },
];

// Memoized to prevent unnecessary re-renders
const mainNutrients = [
  { key: 'n', label: 'N (Stickstoff)', unit: 'ppm' },
  { key: 'p', label: 'P (Phosphor)', unit: 'ppm' },
  { key: 'k', label: 'K (Kalium)', unit: 'ppm' },
  { key: 'ec', label: 'EC', unit: 'mS/cm' },
] as const;

interface AnalysisData {
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
    contributions: Record<string, unknown>;
    stage: unknown;
  };
  mixedWater?: Record<string, number>;
}

interface MixedWater {
  totalVolume: number;
  ph: number;
  ec: number;
  ca: number;
  mg: number;
  s: number;
  fe: number;
  mn: number;
  zn: number;
  cu: number;
  b: number;
  mo: number;
}

interface SetupTabProps {
  NUTRIENT_FIELDS: typeof NUTRIENT_FIELDS;
  GROWTH_STAGES: typeof GROWTH_STAGES;
  WATER_TYPES: typeof WATER_TYPES;
  fertilizerDatabase: Record<string, Fertilizer>;
  onAnalysisUpdate?: (data: AnalysisData) => void;
  mixedWater?: MixedWater;
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

  const initialNutrientResults = useMemo(() => {
    const results: Record<string, number> = {};
    mainNutrients.forEach((field) => {
      results[field.key] = 0;
    });
    return results;
  }, []);

  const [results, setResults] = useState({
    nutrients: initialNutrientResults,
    contributions: {},
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
  const addFertilizer = useCallback((id: string) => {
    if (!id || selectedFertilizers.find((f) => f.id === id)) return;
    const fert = fertilizerDatabase[id];
    setSelectedFertilizers((prev) => [
      ...prev,
      { id, amount: fert?.type === 'powder' ? 0.1 : 1.0, active: true },
    ]);
  }, [selectedFertilizers, fertilizerDatabase]);
  const removeFertilizer = useCallback((id: string) => {
    setSelectedFertilizers((prev) => prev.filter((f) => f.id !== id));
  }, []);
  const updateFertilizerAmount = useCallback((id: string, value: string) => {
    const amount = parseFloat(value);
    setSelectedFertilizers((prev) =>
      prev.map((f) =>
        f.id === id ? { ...f, amount: isNaN(amount) || amount < 0 ? 0 : amount } : f
      )
    );
  }, []);
  const toggleFertilizer = useCallback((id: string) => {
    setSelectedFertilizers((prev) =>
      prev.map((f) => (f.id === id ? { ...f, active: !f.active } : f))
    );
  }, []);

  // Import handler for the new component
  const handleImportData = (importedData: {
    waterVolume: number;
    growthStage: string;
    waterType: string;
    selectedFertilizers: Array<{ id: string; amount: number; active: boolean }>;
    customWaterProfile: Record<string, number>;
  }) => {
    setWaterVolume(importedData.waterVolume);
    setGrowthStage(importedData.growthStage);
    setWaterType(importedData.waterType);
    setSelectedFertilizers(importedData.selectedFertilizers);
    setCustomWaterProfile(importedData.customWaterProfile);
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
    <div className="space-y-6 max-w-4xl mx-auto p-4 bg-white dark:bg-slate-800 rounded-lg shadow">
      <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">Setup</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <BasicSetupControls
            waterVolume={waterVolume}
            growthStage={growthStage}
            waterType={waterType}
            customWaterProfile={customWaterProfile}
            GROWTH_STAGES={GROWTH_STAGES}
            WATER_TYPES={WATER_TYPES}
            onWaterVolumeChange={setWaterVolume}
            onGrowthStageChange={setGrowthStage}
            onWaterTypeChange={setWaterType}
            onCustomWaterProfileChange={setCustomWaterProfile}
          />

          <ImportExportControls
            data={{
              waterVolume,
              growthStage,
              waterType,
              selectedFertilizers,
              customWaterProfile,
            }}
            onImport={handleImportData}
          />
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
          <h3 className="text-md font-semibold text-slate-800 dark:text-slate-100 mb-2 mt-4">
            Dünger & Dosierung
          </h3>
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
      <NutrientResults results={results} nutrientFields={mainNutrients} />
      <div className="flex gap-2 mb-4">
        <Button
          onClick={autoOptimize}
          variant="secondary"
          className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-xs"
          aria-label="Auto-Optimieren"
        >
          Auto-Optimieren
        </Button>
        <Button
          onClick={clearAllData}
          variant="danger"
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 text-xs"
          aria-label="Alle Daten löschen"
        >
          Alle Daten löschen
        </Button>
      </div>
    </div>
  );
};

export default SetupTab;
