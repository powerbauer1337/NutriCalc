import { useState, useCallback } from 'react';
import { Fertilizer } from '../types';
import { NUTRIENT_FIELDS, GROWTH_STAGES, WATER_TYPES } from '../constants';

interface AnalysisInputs {
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

interface UseAnalysisDataReturn {
  analysisInputs: AnalysisInputs;
  updateAnalysisInputs: (data: AnalysisInputs) => void;
}

export const useAnalysisData = (
  fertilizerDatabase: Record<string, Fertilizer>
): UseAnalysisDataReturn => {
  const [analysisInputs, setAnalysisInputs] = useState<AnalysisInputs>({
    NUTRIENT_FIELDS,
    GROWTH_STAGES,
    WATER_TYPES,
    fertilizerDatabase,
    selectedFertilizers: [],
    waterVolume: 10,
    growthStage: Object.keys(GROWTH_STAGES)[0],
    waterType: Object.keys(WATER_TYPES)[0],
    customWaterProfile: {},
    results: {
      nutrients: {},
      contributions: {},
      stage: GROWTH_STAGES[Object.keys(GROWTH_STAGES)[0]],
    },
  });

  // Stabilize the update callback to prevent hot reload loops
  const updateAnalysisInputs = useCallback((data: AnalysisInputs) => {
    setAnalysisInputs(data);
  }, []);

  return {
    analysisInputs,
    updateAnalysisInputs,
  };
};
