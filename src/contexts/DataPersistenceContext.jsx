


import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const DataPersistenceContext = createContext();

export const useDataPersistence = () => {
  const context = useContext(DataPersistenceContext);
  if (!context) {
    throw new Error('useDataPersistence must be used within a DataPersistenceProvider');
  }
  return context;
};

export const DataPersistenceProvider = ({ children }) => {
  const [userData, setUserData] = useLocalStorage('nutricalc-user-data', {
    setups: [],
    customFertilizers: [],
    mixingHistory: [],
    settings: {
      theme: 'light',
      language: 'de',
      units: 'metric',
      notifications: true
    }
  });

  const [currentSetup, setCurrentSetup] = useLocalStorage('nutricalc-current-setup', {
    waterAmount: 10,
    waterType: 'tap',
    growthStage: 'seedling',
    selectedFertilizers: [],
    customWaterProfile: {},
    mixedWater: undefined
  });

  const addSetup = (setup) => {
    const newSetup = {
      ...setup,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setUserData(prev => ({
      ...prev,
      setups: [...prev.setups, newSetup]
    }));
    return newSetup.id;
  };

  const updateSetup = (id, updates) => {
    setUserData(prev => ({
      ...prev,
      setups: prev.setups.map(setup =>
        setup.id === id
          ? { ...setup, ...updates, updatedAt: new Date().toISOString() }
          : setup
      )
    }));
  };

  const deleteSetup = (id) => {
    setUserData(prev => ({
      ...prev,
      setups: prev.setups.filter(setup => setup.id !== id)
    }));
  };

  const addCustomFertilizer = (fertilizer) => {
    const newFertilizer = {
      ...fertilizer,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setUserData(prev => ({
      ...prev,
      customFertilizers: [...prev.customFertilizers, newFertilizer]
    }));
    return newFertilizer.id;
  };

  const updateCustomFertilizer = (id, updates) => {
    setUserData(prev => ({
      ...prev,
      customFertilizers: prev.customFertilizers.map(fertilizer =>
        fertilizer.id === id
          ? { ...fertilizer, ...updates, updatedAt: new Date().toISOString() }
          : fertilizer
      )
    }));
  };

  const deleteCustomFertilizer = (id) => {
    setUserData(prev => ({
      ...prev,
      customFertilizers: prev.customFertilizers.filter(fertilizer => fertilizer.id !== id)
    }));
  };

  const addMixingHistory = (mix) => {
    const newMix = {
      ...mix,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setUserData(prev => ({
      ...prev,
      mixingHistory: [newMix, ...prev.mixingHistory].slice(0, 100) // Keep last 100 mixes
    }));
  };

  const updateSettings = (settings) => {
    setUserData(prev => ({
      ...prev,
      settings: { ...prev.settings, ...settings }
    }));
  };

  const exportData = () => {
    const data = {
      ...userData,
      exportDate: new Date().toISOString(),
      version: '1.0.0'
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
    if (window.confirm('Are you sure you want to delete all saved data? This action cannot be undone.')) {
      setUserData({
        setups: [],
        customFertilizers: [],
        mixingHistory: [],
        settings: {
          theme: 'light',
          language: 'de',
          units: 'metric',
          notifications: true
        }
      });
      setCurrentSetup({
        waterAmount: 10,
        waterType: 'tap',
        growthStage: 'seedling',
        selectedFertilizers: [],
        customWaterProfile: {},
        mixedWater: undefined
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
    clearAllData
  };

  return (
    <DataPersistenceContext.Provider value={value}>
      {children}
    </DataPersistenceContext.Provider>
  );
};



