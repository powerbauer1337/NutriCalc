



import { useMemo, useCallback } from 'react';

export const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

export const useMemoizedCalculation = (calculationFunction, dependencies) => {
  return useMemo(() => calculationFunction(), dependencies);
};

export const useMemoizedCallback = (callback, dependencies) => {
  return useCallback(callback, dependencies);
};

export const createMemoizedSelector = (selectors, compute) => {
  let lastArgs = null;
  let lastResult = null;

  return (...args) => {
    const currentArgs = selectors.map(selector => selector(...args));
    
    if (lastArgs && currentArgs.every((arg, index) => arg === lastArgs[index])) {
      return lastResult;
    }
    
    lastArgs = currentArgs;
    lastResult = compute(...currentArgs);
    return lastResult;
  };
};



