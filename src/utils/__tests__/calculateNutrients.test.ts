




import { describe, it, expect } from 'vitest';
import { calculateNutrientResults } from '../calculateNutrients';
import { GROWTH_STAGES } from '../../constants';

describe('calculateNutrients', () => {
  it('calculates basic nutrient values correctly', () => {
    const result = calculateNutrientResults(
      'seedling',
      10,
      'tap',
      {},
      [],
      {}
    );
    
    expect(result).toHaveProperty('nutrients');
    expect(result).toHaveProperty('contributions');
    expect(result).toHaveProperty('stage');
    expect(result.stage).toBe(GROWTH_STAGES.seedling);
  });

  it('handles empty inputs gracefully', () => {
    const result = calculateNutrients(
      'vegetative',
      0,
      'distilled',
      {},
      [],
      {}
    );
    
    expect(result.nutrients).toEqual({
      n: 0,
      p: 0,
      k: 0,
      ec: 0,
      ph: 0
    });
  });

  it('calculates with single fertilizer', () => {
    const mockFertilizer = {
      id: 'test-fertilizer',
      n: 10,
      p: 5,
      k: 15,
      ec: 1.2,
      ph: 6.0,
      name: 'Test Fertilizer',
      type: 'powder' as const
    };
    
    const result = calculateNutrients(
      'flowering',
      5,
      'tap',
      { 'test-fertilizer': mockFertilizer },
      [{ id: 'test-fertilizer', amount: 1, active: true }],
      {}
    );
    
    expect(result.nutrients.n).toBeGreaterThan(0);
    expect(result.contributions).toHaveProperty('test-fertilizer');
  });
});




