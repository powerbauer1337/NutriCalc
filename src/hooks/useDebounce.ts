import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function useThrottle<T>(value: T, delay: number): T {
  const [throttledValue, setThrottledValue] = useState(value);
  const [lastExecuted, setLastExecuted] = useState(0);

  useEffect(() => {
    const now = Date.now();
    if (now - lastExecuted >= delay) {
      setThrottledValue(value);
      setLastExecuted(now);
    } else {
      const timer = setTimeout(
        () => {
          setThrottledValue(value);
          setLastExecuted(Date.now());
        },
        delay - (now - lastExecuted)
      );
      return () => clearTimeout(timer);
    }
  }, [value, delay, lastExecuted]);

  return throttledValue;
}
