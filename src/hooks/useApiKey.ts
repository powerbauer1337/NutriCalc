import { useState, useEffect } from 'react';
import { LOCAL_STORAGE_KEY_GEMINI_API_KEY } from '../constants';

export const useApiKey = () => {
  const [apiKey, setApiKey] = useState<string>('');

  useEffect(() => {
    const storedKey = localStorage.getItem(LOCAL_STORAGE_KEY_GEMINI_API_KEY);
    if (storedKey) {
      setApiKey(storedKey);
    }
  }, []);

  const updateApiKey = (newKey: string) => {
    setApiKey(newKey);
    localStorage.setItem(LOCAL_STORAGE_KEY_GEMINI_API_KEY, newKey);
  };

  const removeApiKey = () => {
    setApiKey('');
    localStorage.removeItem(LOCAL_STORAGE_KEY_GEMINI_API_KEY);
  };

  return {
    apiKey,
    updateApiKey,
    removeApiKey
  };
}; 