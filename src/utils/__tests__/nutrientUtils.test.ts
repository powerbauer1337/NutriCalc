import { describe, it, expect } from 'vitest';
import { getNutrientStatus, getStatusColor } from '../nutrientUtils';

describe('nutrientUtils', () => {
  describe('getNutrientStatus', () => {
    it('should return optimal when value is within range', () => {
      expect(getNutrientStatus(50, [40, 60])).toBe('optimal');
      expect(getNutrientStatus(40, [40, 60])).toBe('optimal');
      expect(getNutrientStatus(60, [40, 60])).toBe('optimal');
    });

    it('should return suboptimal when value is outside range', () => {
      expect(getNutrientStatus(30, [40, 60])).toBe('suboptimal');
      expect(getNutrientStatus(70, [40, 60])).toBe('suboptimal');
    });

    it('should return unknown for invalid range', () => {
      expect(getNutrientStatus(50, [])).toBe('unknown');
      expect(getNutrientStatus(50, [40])).toBe('unknown');
      expect(getNutrientStatus(50, null as any)).toBe('unknown');
      expect(getNutrientStatus(50, undefined as any)).toBe('unknown');
    });
  });

  describe('getStatusColor', () => {
    it('should return correct colors for each status', () => {
      expect(getStatusColor('optimal')).toContain('green');
      expect(getStatusColor('suboptimal')).toContain('yellow');
      expect(getStatusColor('unknown')).toContain('slate');
    });

    it('should handle invalid status', () => {
      expect(getStatusColor('invalid')).toContain('slate');
    });
  });
});
