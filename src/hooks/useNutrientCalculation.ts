import { useMemo } from 'react';
import { calculateNutrientResults } from '../utils/calculateNutrients';
import { Fertilizer } from '../types';

interface UseNutrientCalculationProps {
  waterVolume: number;
  growthStage: string;
  waterType: string;
  selectedFertilizers: Array<{ id: string; amount: number; active: boolean }>;
  fertilizerDatabase: Record<string, Fertilizer>;
  customWaterProfile: Record<string, number>;
  NUTRIENT_FIELDS: Array<{ key: string }>;
  GROWTH_STAGES: Record<string, unknown>;
  WATER_TYPES: Record<string, unknown>;
  mixedWater?: Record<string, number>;
}

interface NutrientCalculationResult {
  nutrients: Record<string, number>;
  contributions: Record<string, Record<string, number>>;
  stage: unknown;
}

export const useNutrientCalculation = ({
  waterVolume,
  growthStage,
  waterType,
  selectedFertilizers,
  fertilizerDatabase,
  customWaterProfile,
  NUTRIENT_FIELDS,
  GROWTH_STAGES,
  WATER_TYPES,
  mixedWater,
}: UseNutrientCalculationProps): NutrientCalculationResult => {
  return useMemo(() => {
    return calculateNutrientResults({
      waterVolume,
      growthStage,
      waterType,
      selectedFertilizers,
      fertilizerDatabase,
      customWaterProfile,
      NUTRIENT_FIELDS,
      GROWTH_STAGES,
      WATER_TYPES,
      mixedWater,
    });
  }, [
    waterVolume,
    growthStage,
    waterType,
    selectedFertilizers,
    fertilizerDatabase,
    customWaterProfile,
    NUTRIENT_FIELDS,
    GROWTH_STAGES,
    WATER_TYPES,
    mixedWater,
  ]);
};
