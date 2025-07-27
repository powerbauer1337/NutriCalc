import { useState, useEffect, useCallback } from 'react';
import { Fertilizer } from '../types';
import { BASE_FERTILIZER_DATABASE, LOCAL_STORAGE_KEY_CUSTOM_FERTILIZERS } from '../constants';

interface UseFertilizerDatabaseReturn {
  fertilizerDatabase: Record<string, Fertilizer>;
  refreshFertilizerDatabase: () => void;
}

function mergeFertilizerDatabases(
  baseDb: Record<string, Fertilizer>,
  customList: Fertilizer[]
): Record<string, Fertilizer> {
  const customDb: Record<string, Fertilizer> = {};
  (customList || []).forEach((fert) => {
    const id = fert.id || `custom_${fert.name.replace(/\s+/g, '_').toLowerCase()}_${Date.now()}`;
    const composition: Record<string, number> = {};
    Object.entries(fert.composition || {}).forEach(([k, v]) => {
      composition[k.toLowerCase()] = Number(v) || 0;
    });
    customDb[id] = {
      ...fert,
      id,
      name: fert.name,
      type: fert.type || 'liquid',
      unit: fert.unit || 'ml',
      composition,
      description: fert.description || 'Benutzerdefinierter Dünger',
    };
  });
  return { ...baseDb, ...customDb };
}

export const useFertilizerDatabase = (): UseFertilizerDatabaseReturn => {
  const [fertilizerDatabase, setFertilizerDatabase] = useState(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY_CUSTOM_FERTILIZERS);
    let customList = [];
    try {
      if (stored) customList = JSON.parse(stored);
    } catch (error) {
      console.warn('Failed to parse custom fertilizers from localStorage:', error);
    }
    return mergeFertilizerDatabases(BASE_FERTILIZER_DATABASE, customList);
  });

  // Refresh fertilizer database when custom fertilizers change
  const refreshFertilizerDatabase = useCallback(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY_CUSTOM_FERTILIZERS);
    let customList = [];
    try {
      if (stored) customList = JSON.parse(stored);
    } catch (error) {
      console.warn('Failed to parse custom fertilizers from localStorage:', error);
    }
    setFertilizerDatabase(mergeFertilizerDatabases(BASE_FERTILIZER_DATABASE, customList));
  }, []);

  // Listen for storage changes (in case another tab updates custom fertilizers)
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === LOCAL_STORAGE_KEY_CUSTOM_FERTILIZERS) {
        refreshFertilizerDatabase();
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, [refreshFertilizerDatabase]);

  return {
    fertilizerDatabase,
    refreshFertilizerDatabase,
  };
};
