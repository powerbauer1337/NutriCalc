




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

export interface NutrientCalculation {
  nutrients: {
    n: number;
    p: number;
    k: number;
    ec: number;
    ph: number;
  };
  contributions: Record<string, any>;
  stage: GrowthStage;
}

export interface SelectedFertilizer {
  id: string;
  amount: number;
}

export interface MixingSetup {
  waterAmount: number;
  waterType: string;
  growthStage: string;
  selectedFertilizers: SelectedFertilizer[];
  customWaterProfile?: Record<string, any>;
  mixedWater?: any;
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




