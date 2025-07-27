import React, { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface Setup {
  id: string;
  name: string;
  waterAmount: number;
  waterType: string;
  growthStage: string;
  selectedFertilizers: Array<{ id: string; amount: number; active: boolean }>;
  customWaterProfile: Record<string, number>;
  mixedWater?: Record<string, number>;
  createdAt: string;
  updatedAt: string;
}

interface CustomFertilizer {
  id: string;
  name: string;
  npk: { n: number; p: number; k: number };
  elements: Record<string, number>;
  createdAt: string;
  updatedAt?: string;
}

interface MixingHistory {
  id: string;
  name: string;
  waterAmount: number;
  fertilizers: Array<{ id: string; amount: number; active: boolean }>;
  result: Record<string, unknown>;
  createdAt: string;
}

interface UserData {
  setups: Setup[];
  customFertilizers: CustomFertilizer[];
  mixingHistory: MixingHistory[];
  settings: {
    theme: string;
    language: string;
    units: string;
    notifications: boolean;
  };
}

interface CurrentSetup {
  waterAmount: number;
  waterType: string;
  growthStage: string;
  selectedFertilizers: Array<{ id: string; amount: number; active: boolean }>;
  customWaterProfile: Record<string, number>;
  mixedWater?: Record<string, number>;
}

interface DataPersistenceContextType {
  userData: UserData;
  currentSetup: CurrentSetup;
  setCurrentSetup: (setup: CurrentSetup) => void;
  addSetup: (setup: Omit<Setup, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateSetup: (id: string, updates: Partial<Setup>) => void;
  deleteSetup: (id: string) => void;
  addCustomFertilizer: (fertilizer: Omit<CustomFertilizer, 'id' | 'createdAt'>) => string;
  updateCustomFertilizer: (id: string, updates: Partial<CustomFertilizer>) => void;
  deleteCustomFertilizer: (id: string) => void;
  addMixingHistory: (mix: Omit<MixingHistory, 'id' | 'createdAt'>) => void;
  updateSettings: (settings: Partial<UserData['settings']>) => void;
  exportData: () => void;
  importData: (file: File) => Promise<boolean>;
  clearAllData: () => void;
}

const DataPersistenceContext = createContext<DataPersistenceContextType | undefined>(undefined);

export const useDataPersistence = (): DataPersistenceContextType => {
  const context = useContext(DataPersistenceContext);
  if (!context) {
    throw new Error('useDataPersistence must be used within a DataPersistenceProvider');
  }
  return context;
};

interface DataPersistenceProviderProps {
  children: ReactNode;
}

export const DataPersistenceProvider: React.FC<DataPersistenceProviderProps> = ({ children }) => {
  const [userData, setUserData] = useLocalStorage('nutricalc-user-data', {
    setups: [],
    customFertilizers: [],
    mixingHistory: [],
    settings: {
      theme: 'light',
      language: 'de',
      units: 'metric',
      notifications: true,
    },
  });

  const [currentSetup, setCurrentSetup] = useLocalStorage('nutricalc-current-setup', {
    waterAmount: 10,
    waterType: 'tap',
    growthStage: 'seedling',
    selectedFertilizers: [],
    customWaterProfile: {},
    mixedWater: undefined,
  });

  const addSetup = (setup) => {
    const newSetup = {
      ...setup,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setUserData((prev) => ({
      ...prev,
      setups: [...prev.setups, newSetup],
    }));
    return newSetup.id;
  };

  const updateSetup = (id, updates) => {
    setUserData((prev) => ({
      ...prev,
      setups: prev.setups.map((setup) =>
        setup.id === id ? { ...setup, ...updates, updatedAt: new Date().toISOString() } : setup
      ),
    }));
  };

  const deleteSetup = (id) => {
    setUserData((prev) => ({
      ...prev,
      setups: prev.setups.filter((setup) => setup.id !== id),
    }));
  };

  const addCustomFertilizer = (fertilizer) => {
    const newFertilizer = {
      ...fertilizer,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setUserData((prev) => ({
      ...prev,
      customFertilizers: [...prev.customFertilizers, newFertilizer],
    }));
    return newFertilizer.id;
  };

  const updateCustomFertilizer = (id, updates) => {
    setUserData((prev) => ({
      ...prev,
      customFertilizers: prev.customFertilizers.map((fertilizer) =>
        fertilizer.id === id
          ? { ...fertilizer, ...updates, updatedAt: new Date().toISOString() }
          : fertilizer
      ),
    }));
  };

  const deleteCustomFertilizer = (id) => {
    setUserData((prev) => ({
      ...prev,
      customFertilizers: prev.customFertilizers.filter((fertilizer) => fertilizer.id !== id),
    }));
  };

  const addMixingHistory = (mix) => {
    const newMix = {
      ...mix,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setUserData((prev) => ({
      ...prev,
      mixingHistory: [newMix, ...prev.mixingHistory].slice(0, 100), // Keep last 100 mixes
    }));
  };

  const updateSettings = (settings) => {
    setUserData((prev) => ({
      ...prev,
      settings: { ...prev.settings, ...settings },
    }));
  };

  const exportData = () => {
    const data = {
      ...userData,
      exportDate: new Date().toISOString(),
      version: '1.0.0',
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nutricalc-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importData = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          if (data.setups && data.customFertilizers && data.settings) {
            setUserData(data);
            resolve(true);
          } else {
            reject(new Error('Invalid backup file format'));
          }
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
  };

  const clearAllData = () => {
    if (
      window.confirm(
        'Are you sure you want to delete all saved data? This action cannot be undone.'
      )
    ) {
      setUserData({
        setups: [],
        customFertilizers: [],
        mixingHistory: [],
        settings: {
          theme: 'light',
          language: 'de',
          units: 'metric',
          notifications: true,
        },
      });
      setCurrentSetup({
        waterAmount: 10,
        waterType: 'tap',
        growthStage: 'seedling',
        selectedFertilizers: [],
        customWaterProfile: {},
        mixedWater: undefined,
      });
    }
  };

  const value = {
    userData,
    currentSetup,
    setCurrentSetup,
    addSetup,
    updateSetup,
    deleteSetup,
    addCustomFertilizer,
    updateCustomFertilizer,
    deleteCustomFertilizer,
    addMixingHistory,
    updateSettings,
    exportData,
    importData,
    clearAllData,
  };

  return (
    <DataPersistenceContext.Provider value={value}>{children}</DataPersistenceContext.Provider>
  );
};
