import { useState, useEffect } from 'react';

interface AppSettings {
  unit: 'liter' | 'gallon';
  waterAmount: string;
  growthPhase: string;
  waterType: string;
}

const useAppSettings = () => {
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const storedSettings = localStorage.getItem('appSettings');
      return storedSettings
        ? JSON.parse(storedSettings)
        : {
            unit: 'liter', // 'liter' or 'gallon'
            waterAmount: '',
            growthPhase: '',
            waterType: '',
          };
    } catch {
      // Silently fall back to defaults if localStorage parsing fails
      return {
        unit: 'liter',
        waterAmount: '',
        growthPhase: '',
        waterType: '',
      };
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('appSettings', JSON.stringify(settings));
    } catch {
      // Silently handle localStorage save errors
    }
  }, [settings]);

  const updateSetting = (key: string, value: string) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [key]: value,
    }));
  };

  return { settings, updateSetting };
};

export default useAppSettings;
