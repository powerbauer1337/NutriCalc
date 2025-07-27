// Core types for the NutriCalc application

export interface Fertilizer {
  id: string;
  name: string;
  type: 'powder' | 'liquid';
  unit: string;
  n: number;
  p: number;
  k: number;
  ec: number;
  ph: number;
  description?: string;
  category?: string;
  composition?: Record<string, number>;
}

// Updated FertilizerData to be compatible with Fertilizer
export interface FertilizerData {
  id?: string; // Optional id to make it compatible with Fertilizer
  name: string;
  type: 'powder' | 'liquid';
  unit: string;
  n: number; // Explicit NPK values for compatibility
  p: number;
  k: number;
  ec: number;
  ph: number;
  description?: string;
  category?: string;
  composition?: Record<string, number>;
}

// Keep existing FertilizerDatabase interface
export interface FertilizerDatabase {
  [key: string]: FertilizerData;
}

export interface WaterType {
  name: string;
  ec: number;
  ph: number;
  n: number;
  p: number;
  k: number;
}

export interface GrowthStage {
  name: string;
  n: { min: number; max: number };
  p: { min: number; max: number };
  k: { min: number; max: number };
  ec: { min: number; max: number };
  ph: { min: number; max: number };
}

export interface NutrientValues {
  n: number;
  p: number;
  k: number;
  ec: number;
  ph: number;
}

export interface NutrientCalculation {
  nutrients: NutrientValues;
  contributions: Record<string, NutrientContribution>;
  stage: GrowthStage;
}

export interface NutrientContribution {
  [fertilizerName: string]: NutrientValues;
}

export interface SelectedFertilizer {
  id: string;
  amount: number;
  active?: boolean;
}

export interface MixedWater {
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

export interface MixingSetup {
  waterAmount: number;
  waterType: string;
  growthStage: string;
  selectedFertilizers: SelectedFertilizer[];
  customWaterProfile?: Record<string, number>;
  mixedWater?: MixedWater;
}

export interface UserSettings {
  theme: 'light' | 'dark';
  language: string;
  units: 'metric' | 'imperial';
  notifications: boolean;
}

export interface UserData {
  setups: Array<{
    id: string;
    name: string;
    setup: MixingSetup;
    createdAt: string;
    updatedAt: string;
  }>;
  customFertilizers: Array<Fertilizer & { id: string; createdAt: string; updatedAt?: string }>;
  mixingHistory: Array<{
    id: string;
    setup: MixingSetup;
    results: NutrientCalculation;
    createdAt: string;
  }>;
  settings: UserSettings;
}

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

export interface ApiKey {
  key: string;
  provider: string;
  isValid: boolean;
}

export type AppTheme = 'light' | 'dark' | 'system';

// Component prop types
export interface ChatBarProps {
  apiKey: boolean;
  onSend: (message: string) => void;
  isLoading: boolean;
  displayMessage: string;
  suggestions?: string[];
}

export interface AnalysisTabProps {
  NUTRIENT_FIELDS: NutrientField[];
  GROWTH_STAGES: Record<string, GrowthStageConfig>;
  WATER_TYPES: Record<string, WaterTypeConfig>;
  fertilizerDatabase: Record<string, Fertilizer>;
  selectedFertilizers: SelectedFertilizer[];
  waterVolume: number;
  growthStage: string;
  waterType: string;
  customWaterProfile?: Record<string, number>;
  results?: NutrientCalculation;
}

export interface NutrientField {
  key: string;
  label: string;
  unit: string;
  min: number;
  max: number;
  optimal: number;
}

// Updated GrowthStageConfig to include all properties from GrowthStage
export interface GrowthStageConfig extends GrowthStage {
  value: string;
  label: string;
}

// Updated WaterTypeConfig to include all properties from WaterType
export interface WaterTypeConfig extends WaterType {
  value: string;
  label: string;
}

export interface ToastContextType {
  addToast: (message: string, type?: ToastMessage['type'], duration?: number) => void;
  removeToast: (id: string) => void;
}

export interface Toast {
  id: string; // Changed from number to string for consistency
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

// Water defaults type
export interface WaterDefaults {
  [key: string]: {
    ca: number;
    mg: number;
    s: number;
    ec: number;
    ph: number;
  };
}
