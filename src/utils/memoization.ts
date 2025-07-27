import { useMemo, useCallback } from 'react';

type GenericFunction<Args extends unknown[], Return> = (...args: Args) => Return;

export const memoize = <Args extends unknown[], Return>(fn: GenericFunction<Args, Return>): GenericFunction<Args, Return> => {
  const cache = new Map<string, Return>();
  return ((...args: Args): Return => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key)!;
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  });
};

export const useMemoizedCalculation = <T>(
  calculationFunction: () => T,
  dependencies: React.DependencyList
): T => {
  return useMemo(() => calculationFunction(), dependencies);
};

export const useMemoizedCallback = <Args extends unknown[], Return>(
  callback: GenericFunction<Args, Return>,
  dependencies: React.DependencyList
): GenericFunction<Args, Return> => {
  return useCallback(callback, dependencies);
};

export const createMemoizedSelector = <T extends unknown[], U, V>(
  selectors: GenericFunction<T, U>[],
  compute: GenericFunction<U[], V>
): GenericFunction<T, V> => {
  let lastArgs: U[] = [];
  let lastResult: V | null = null;

  return (...args: T): V => {
    const currentArgs = selectors.map((selector) => selector(...args));

    if (lastArgs !== null && currentArgs.every((arg, index) => arg === lastArgs[index])) {
      return lastResult!;
    }

    lastArgs = currentArgs;
    lastResult = compute(...currentArgs);
    return lastResult;
  };
};
