
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { WATER_DEFAULTS } from '../constants/waterDefaults';
import { NUTRIENT_FIELDS } from '../constants';

interface WaterSource {
  id: string;
  name: string;
  ph: number;
  ec: number;
  ca: number;
  mg: number;
  na: number;
  s: number;
  fe: number;
  mn: number;
  zn: number;
  cu: number;
  b: number;
  mo: number;
  volume: number;
}

interface MixedWater extends Omit<WaterSource, 'id' | 'name' | 'volume'> {
  totalVolume: number;
}

interface WaterContextType {
  waterSources: WaterSource[];
  mixedWater: MixedWater | null;
  addWaterSource: (type: string) => void;
  removeWaterSource: (id: string) => void;
  updateWaterSource: (id: string, field: keyof WaterSource, value: number | string) => void;
}

const WaterContext = createContext<WaterContextType | undefined>(undefined);

interface WaterProviderProps {
  children: ReactNode;
}

export const WaterProvider: React.FC<WaterProviderProps> = ({ children }) => {
  const [waterSources, setWaterSources] = useState<WaterSource[]>([
    { id: 'tapWater', ...WATER_DEFAULTS.tapWater, volume: 100 },
    { id: 'roWater', ...WATER_DEFAULTS.roWater, volume: 0 },
  ]);
  const [mixedWater, setMixedWater] = useState<MixedWater | null>(null);

  useEffect(() => {
    calculateMixedWater();
  }, [waterSources]);

  const calculateMixedWater = () => {
    if (waterSources.length === 0) {
      setMixedWater(null);
      return;
    }

    let sum_H_plus_volume = 0;
    let sum_volume = 0;
    
    const paramSums: Record<string, number> = {};
    NUTRIENT_FIELDS.forEach(field => {
        paramSums[field.key] = 0;
    });
    paramSums.ec = 0; // EC is a separate calculated value

    waterSources.forEach(source => {
      const { ph, ec, volume } = source;
      if (volume > 0) {
        // pH calculation (logarithmic)
        const H_i = Math.pow(10, -ph);
        sum_H_plus_volume += H_i * volume;
        sum_volume += volume;

        // Other parameters (linear average)
        NUTRIENT_FIELDS.forEach(field => {
            paramSums[field.key] += (source[field.key as keyof WaterSource] as number || 0) * volume;
        });
        paramSums.ec += ec * volume;
      }
    });

    if (sum_volume === 0) {
      setMixedWater(null);
      return;
    }

    // Calculate mixed pH
    const H_plus_mix = sum_H_plus_volume / sum_volume;
    const ph_mix = -Math.log10(H_plus_mix);

    // Calculate mixed values for other parameters
    const mixedNutrients: Record<string, number> = {};
    NUTRIENT_FIELDS.forEach(field => {
        mixedNutrients[field.key] = paramSums[field.key] / sum_volume;
    });
    const mixedEC = paramSums.ec / sum_volume;

    setMixedWater({
      ph: ph_mix,
      ec: mixedEC,
      ...mixedNutrients,
      totalVolume: sum_volume,
    });
  };

  const addWaterSource = (type: string) => {
    const newSource: WaterSource = {
      id: `${type}-${Date.now()}`, // Unique ID
      ...(WATER_DEFAULTS[type] || {
        name: 'Neue Quelle',
        ph: 7.0,
        ec: 0.2,
        ca: 0,
        mg: 0,
        na: 0,
        s: 0,
        fe: 0,
        mn: 0,
        zn: 0,
        cu: 0,
        b: 0,
        mo: 0,
      }),
      volume: 0,
    };
    setWaterSources(prevSources => [...prevSources, newSource]);
  };

  const removeWaterSource = (id: string) => {
    setWaterSources(prevSources => prevSources.filter(source => source.id !== id));
  };

  const updateWaterSource = (id: string, field: keyof WaterSource, value: number | string) => {
    setWaterSources(prevSources =>
      prevSources.map(source =>
        source.id === id ? { ...source, [field]: value } : source
      )
    );
  };

  return (
    <WaterContext.Provider
      value={{
        waterSources,
        mixedWater,
        addWaterSource,
        removeWaterSource,
        updateWaterSource,
      }}
    >
      {children}
    </WaterContext.Provider>
  );
};

export const useWater = (): WaterContextType => {
  const context = useContext(WaterContext);
  if (!context) {
    throw new Error('useWater must be used within a WaterProvider');
  }
  return context;
};
