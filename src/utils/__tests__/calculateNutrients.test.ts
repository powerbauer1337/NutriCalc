




import { describe, it, expect } from 'vitest';
import { calculateNutrientResults } from '../calculateNutrients';
import { GROWTH_STAGES } from '../../constants';

// Mock constants for testing
const NUTRIENT_FIELDS = [
  { key: 'n' },
  { key: 'p' },
  { key: 'k' },
  { key: 'ca' },
  { key: 'mg' },
  { key: 's' },
  { key: 'ec' },
  { key: 'ph' }
];

const WATER_TYPES = {
  tap: {
    ca: 50,
    mg: 10,
    s: 5,
    baseEC: 0.5,
    ph: 7.5
  },
  distilled: {
    ca: 0,
    mg: 0,
    s: 0,
    baseEC: 0.05,
    ph: 6.5
  }
};

describe('calculateNutrients', () => {
  it('calculates basic nutrient values correctly', () => {
    const result = calculateNutrientResults({
      waterVolume: 10,
      growthStage: 'seedling',
      waterType: 'tap',
      selectedFertilizers: [],
      fertilizerDatabase: {},
      NUTRIENT_FIELDS,
      GROWTH_STAGES,
      WATER_TYPES
    });
    
    expect(result).toHaveProperty('nutrients');
    expect(result).toHaveProperty('contributions');
    expect(result).toHaveProperty('stage');
    expect(result.stage).toBe(GROWTH_STAGES.seedling);
  });

  it('handles empty inputs gracefully', () => {
    const result = calculateNutrientResults({
      waterVolume: 0,
      growthStage: 'vegetative',
      waterType: 'distilled',
      selectedFertilizers: [],
      fertilizerDatabase: {},
      NUTRIENT_FIELDS,
      GROWTH_STAGES,
      WATER_TYPES
    });
    
    expect(result.nutrients).toEqual({});
  });

  it('calculates with single fertilizer', () => {
    const mockFertilizer = {
      id: 'test-fertilizer',
      name: 'Test Fertilizer',
      type: 'powder' as const,
      composition: {
        n: 10,
        p: 5,
        k: 15
      }
    };
    
    const result = calculateNutrientResults({
      waterVolume: 5,
      growthStage: 'flowering',
      waterType: 'tap',
      selectedFertilizers: [{ id: 'test-fertilizer', amount: 1, active: true }],
      fertilizerDatabase: { 'test-fertilizer': mockFertilizer },
      NUTRIENT_FIELDS,
      GROWTH_STAGES,
      WATER_TYPES
    });
    
    expect(result.nutrients.n).toBeGreaterThan(0);
    expect(result.contributions).toHaveProperty('test-fertilizer');
  });
});




