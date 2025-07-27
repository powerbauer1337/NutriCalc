import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFertilizerDatabase } from '../useFertilizerDatabase';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock constants
vi.mock('../../constants', () => ({
  BASE_FERTILIZER_DATABASE: {
    'test_fert_1': {
      id: 'test_fert_1',
      name: 'Test Fertilizer 1',
      type: 'liquid',
      unit: 'ml',
      composition: { n: 10, p: 5, k: 8 },
      description: 'Test fertilizer'
    }
  },
  LOCAL_STORAGE_KEY_CUSTOM_FERTILIZERS: 'test_custom_fertilizers'
}));

describe('useFertilizerDatabase', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    // Clean up event listeners
    window.removeEventListener('storage', expect.any(Function));
  });

  it('should initialize with base fertilizer database', () => {
    localStorageMock.getItem.mockReturnValue(null);
    
    const { result } = renderHook(() => useFertilizerDatabase());
    
    expect(result.current.fertilizerDatabase).toHaveProperty('test_fert_1');
    expect(result.current.fertilizerDatabase.test_fert_1.name).toBe('Test Fertilizer 1');
  });

  it('should merge custom fertilizers from localStorage', () => {
    const customFertilizers = [
      {
        id: 'custom_1',
        name: 'Custom Fertilizer',
        type: 'powder',
        unit: 'g',
        composition: { n: 15, p: 10, k: 12 },
        description: 'Custom test fertilizer'
      }
    ];
    
    localStorageMock.getItem.mockReturnValue(JSON.stringify(customFertilizers));
    
    const { result } = renderHook(() => useFertilizerDatabase());
    
    expect(result.current.fertilizerDatabase).toHaveProperty('test_fert_1');
    expect(result.current.fertilizerDatabase).toHaveProperty('custom_1');
    expect(result.current.fertilizerDatabase.custom_1.name).toBe('Custom Fertilizer');
  });

  it('should handle invalid JSON in localStorage', () => {
    localStorageMock.getItem.mockReturnValue('invalid json');
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    
    const { result } = renderHook(() => useFertilizerDatabase());
    
    expect(result.current.fertilizerDatabase).toHaveProperty('test_fert_1');
    expect(consoleSpy).toHaveBeenCalledWith(
      'Failed to parse custom fertilizers from localStorage:',
      expect.any(Error)
    );
    
    consoleSpy.mockRestore();
  });

  it('should refresh database when called', () => {
    localStorageMock.getItem.mockReturnValue(null);
    
    const { result } = renderHook(() => useFertilizerDatabase());
    
    // Initially no custom fertilizers
    expect(Object.keys(result.current.fertilizerDatabase)).toHaveLength(1);
    
    // Mock new custom fertilizers
    const customFertilizers = [
      {
        id: 'new_custom',
        name: 'New Custom',
        type: 'liquid',
        unit: 'ml',
        composition: { n: 20, p: 15, k: 10 }
      }
    ];
    localStorageMock.getItem.mockReturnValue(JSON.stringify(customFertilizers));
    
    act(() => {
      result.current.refreshFertilizerDatabase();
    });
    
    expect(result.current.fertilizerDatabase).toHaveProperty('new_custom');
  });

  it('should listen for storage events', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    
    renderHook(() => useFertilizerDatabase());
    
    expect(addEventListenerSpy).toHaveBeenCalledWith('storage', expect.any(Function));
  });

  it('should generate ID for fertilizers without ID', () => {
    const customFertilizers = [
      {
        name: 'No ID Fertilizer',
        type: 'liquid',
        unit: 'ml',
        composition: { n: 5, p: 3, k: 7 }
      }
    ];
    
    localStorageMock.getItem.mockReturnValue(JSON.stringify(customFertilizers));
    
    const { result } = renderHook(() => useFertilizerDatabase());
    
    const customKeys = Object.keys(result.current.fertilizerDatabase).filter(key => 
      key.startsWith('custom_no_id_fertilizer')
    );
    
    expect(customKeys).toHaveLength(1);
    expect(result.current.fertilizerDatabase[customKeys[0]].name).toBe('No ID Fertilizer');
  });
});
