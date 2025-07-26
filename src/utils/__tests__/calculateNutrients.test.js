



import { calculateNutrients } from '../calculateNutrients.js';
import { NUTRIENT_FIELDS } from '../../constants/index.js';
import { GROWTH_STAGES } from '../../constants/index.js';
import { WATER_TYPES } from '../../constants/index.js';

describe('calculateNutrients', () => {
  const mockFertilizer = {
    id: 'test_fertilizer',
    name: 'Test Fertilizer',
    type: 'liquid',
    unit: 'ml',
    composition: {
      n: 100,
      p: 50,
      k: 75,
      ca: 25,
      mg: 10,
      s: 5,
      fe: 0.5,
      mn: 0.2,
      zn: 0.1,
      cu: 0.05,
      b: 0.02,
      mo: 0.01,
    },
  };

  const mockGrowthStage = {
    name: 'Test Stage',
    n: [100, 150],
    p: [30, 50],
    k: [100, 150],
    ec: [0.8, 1.2],
  };

  test('calculates basic nutrient concentrations correctly', () => {
    const result = calculateNutrients({
      waterVolume: 10,
      selectedFertilizers: [
        { id: 'test_fertilizer', amount: 5, active: true },
      ],
      fertilizerDatabase: { test_fertilizer: mockFertilizer },
      growthStage: 'test_stage',
      waterType: 'ro',
      customWaterProfile: {},
      NUTRIENT_FIELDS,
      GROWTH_STAGES: { test_stage: mockGrowthStage },
      WATER_TYPES,
    });

    expect(result.nutrients.n).toBeCloseTo(50, 1); // 100 * 5 / 10
    expect(result.nutrients.p).toBeCloseTo(25, 1); // 50 * 5 / 10
    expect(result.nutrients.k).toBeCloseTo(37.5, 1); // 75 * 5 / 10
  });

  test('handles multiple fertilizers correctly', () => {
    const fertilizer2 = {
      ...mockFertilizer,
      id: 'test_fertilizer_2',
      composition: { ...mockFertilizer.composition, n: 200, p: 100 },
    };

    const result = calculateNutrients({
      waterVolume: 10,
      selectedFertilizers: [
        { id: 'test_fertilizer', amount: 5, active: true },
        { id: 'test_fertilizer_2', amount: 3, active: true },
      ],
      fertilizerDatabase: {
        test_fertilizer: mockFertilizer,
        test_fertilizer_2: fertilizer2,
      },
      growthStage: 'test_stage',
      waterType: 'ro',
      customWaterProfile: {},
      NUTRIENT_FIELDS,
      GROWTH_STAGES: { test_stage: mockGrowthStage },
      WATER_TYPES,
    });

    expect(result.nutrients.n).toBeCloseTo(110, 1); // (100*5 + 200*3) / 10
    expect(result.nutrients.p).toBeCloseTo(55, 1); // (50*5 + 100*3) / 10
  });

  test('handles disabled fertilizers correctly', () => {
    const result = calculateNutrients({
      waterVolume: 10,
      selectedFertilizers: [
        { id: 'test_fertilizer', amount: 5, active: false },
      ],
      fertilizerDatabase: { test_fertilizer: mockFertilizer },
      growthStage: 'test_stage',
      waterType: 'ro',
      customWaterProfile: {},
      NUTRIENT_FIELDS,
      GROWTH_STAGES: { test_stage: mockGrowthStage },
      WATER_TYPES,
    });

    expect(result.nutrients.n).toBe(0);
    expect(result.nutrients.p).toBe(0);
  });

  test('calculates EC correctly', () => {
    const result = calculateNutrients({
      waterVolume: 10,
      selectedFertilizers: [
        { id: 'test_fertilizer', amount: 10, active: true },
      ],
      fertilizerDatabase: { test_fertilizer: mockFertilizer },
      growthStage: 'test_stage',
      waterType: 'ro',
      customWaterProfile: {},
      NUTRIENT_FIELDS,
      GROWTH_STAGES: { test_stage: mockGrowthStage },
      WATER_TYPES,
    });

    expect(result.nutrients.ec).toBeGreaterThan(0);
  });
});




