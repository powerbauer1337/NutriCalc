import { useMemo, useCallback } from 'react';

type AnyFunction = (...args: unknown[]) => unknown;

export const memoize = <T extends AnyFunction>(fn: T): T => {
  const cache = new Map<string, ReturnType<T>>();
  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key)!;
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
};

export const useMemoizedCalculation = <T>(
  calculationFunction: () => T,
  dependencies: React.DependencyList
): T => {
  return useMemo(() => calculationFunction(), dependencies);
};

export const useMemoizedCallback = <T extends AnyFunction>(
  callback: T,
  dependencies: React.DependencyList
): T => {
  return useCallback(callback, dependencies) as T;
};

export const createMemoizedSelector = <T extends AnyFunction, U extends AnyFunction>(
  selectors: T[],
  compute: U
): ((...args: Parameters<T>) => ReturnType<U>) => {
  let lastArgs: ReturnType<T>[] | null = null;
  let lastResult: ReturnType<U> | null = null;

  return (...args: Parameters<T>): ReturnType<U> => {
    const currentArgs = selectors.map((selector) => selector(...args));

    if (lastArgs && currentArgs.every((arg, index) => arg === lastArgs[index])) {
      return lastResult!;
    }

    lastArgs = currentArgs;
    lastResult = compute(...currentArgs);
    return lastResult;
  };
};
