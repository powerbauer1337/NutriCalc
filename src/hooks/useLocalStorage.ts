import { useState } from 'react';

export function useLocalStorage(key: string, initialValue: unknown) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      // Silently fall back to initial value on localStorage error
      return initialValue;
    }
  });

  const setValue = (value: unknown) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch {
      // Silently handle localStorage save errors
    }
  };

  return [storedValue, setValue];
}

export function useSessionStorage(key: string, initialValue: unknown) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      // Silently fall back to initial value on sessionStorage error
      return initialValue;
    }
  });

  const setValue = (value: unknown) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
    } catch {
      // Silently handle sessionStorage save errors
    }
  };

  return [storedValue, setValue];
}
