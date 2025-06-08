import { useState, useEffect } from 'react';

const useAppSettings = () => {
  const [settings, setSettings] = useState(() => {
    try {
      const storedSettings = localStorage.getItem('appSettings');
      return storedSettings ? JSON.parse(storedSettings) : {
        unit: 'liter', // 'liter' or 'gallon'
        waterAmount: '',
        growthPhase: '',
        waterType: '',
      };
    } catch (error) {
      console.error("Error parsing app settings from localStorage:", error);
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
    } catch (error) {
      console.error("Error saving app settings to localStorage:", error);
    }
  }, [settings]);

  const updateSetting = (key, value) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      [key]: value,
    }));
  };

  return { settings, updateSetting };
};

export default useAppSettings; 