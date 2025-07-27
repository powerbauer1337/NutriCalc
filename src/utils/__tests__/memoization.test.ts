import { describe, it, expect, vi } from 'vitest';
import { memoize } from '../memoization';

describe('memoization', () => {
  describe('memoize', () => {
    it('should cache function results', () => {
      const mockFn = vi.fn((x: number) => x * 2);
      const memoizedFn = memoize(mockFn);

      // First call
      expect(memoizedFn(5)).toBe(10);
      expect(mockFn).toHaveBeenCalledTimes(1);

      // Second call with same argument should use cache
      expect(memoizedFn(5)).toBe(10);
      expect(mockFn).toHaveBeenCalledTimes(1);

      // Call with different argument should call function again
      expect(memoizedFn(3)).toBe(6);
      expect(mockFn).toHaveBeenCalledTimes(2);
    });

    it('should handle multiple arguments', () => {
      const mockFn = vi.fn((x: number, y: number) => x + y);
      const memoizedFn = memoize(mockFn);

      expect(memoizedFn(1, 2)).toBe(3);
      expect(memoizedFn(1, 2)).toBe(3);
      expect(mockFn).toHaveBeenCalledTimes(1);

      expect(memoizedFn(2, 3)).toBe(5);
      expect(mockFn).toHaveBeenCalledTimes(2);
    });

    it('should handle complex objects as arguments', () => {
      const mockFn = vi.fn((obj: { a: number; b: number }) => obj.a + obj.b);
      const memoizedFn = memoize(mockFn);

      const obj1 = { a: 1, b: 2 };
      const obj2 = { a: 1, b: 2 };

      expect(memoizedFn(obj1)).toBe(3);
      expect(memoizedFn(obj2)).toBe(3);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });
});
