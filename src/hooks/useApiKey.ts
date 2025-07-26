import { useState, useEffect } from 'react';
import {
  storeApiKey,
  retrieveApiKey,
  removeApiKey as removeStoredApiKey,
  validateApiKey,
  sanitizeApiKeyForLogging
} from '../utils/secureStorage';

export const useApiKey = () => {
  const [apiKey, setApiKey] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    const storedKey = retrieveApiKey();
    if (storedKey) {
      setApiKey(storedKey);
      setIsValid(validateApiKey(storedKey));
    }
  }, []);

  const updateApiKey = (newKey: string) => {
    const trimmedKey = newKey.trim();
    const valid = validateApiKey(trimmedKey);
    
    setApiKey(trimmedKey);
    setIsValid(valid);
    
    if (trimmedKey) {
      storeApiKey(trimmedKey);
      console.log('API key updated:', sanitizeApiKeyForLogging(trimmedKey));
    } else {
      removeStoredApiKey();
    }
  };

  const removeApiKey = () => {
    setApiKey('');
    setIsValid(false);
    removeStoredApiKey();
    console.log('API key removed');
  };

  return {
    apiKey,
    isValid,
    updateApiKey,
    removeApiKey,
  };
};
