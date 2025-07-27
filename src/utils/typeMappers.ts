// Utility functions to map between similar types
import { Fertilizer, FertilizerData, GrowthStage, GrowthStageConfig } from '../types';

export function mapFertilizerDataToFertilizer(
  data: FertilizerData,
  id: string
): Fertilizer {
  return {
    id,
    name: data.name,
    type: data.type,
    unit: data.unit,
    n: data.composition.n ?? 0,
    p: data.composition.p ?? 0,
    k: data.composition.k ?? 0,
    ec: data.composition.ec ?? 0,
    ph: data.composition.ph ?? 0,
    description: data.description,
    category: data.category,
    composition: data.composition,
  };
}

export function mapFertilizerDatabaseToRecord(db: Record<string, FertilizerData>): Record<string, Fertilizer> {
  const result: Record<string, Fertilizer> = {};
  for (const key in db) {
    result[key] = mapFertilizerDataToFertilizer(db[key], key);
  }
  return result;
}

export function mapGrowthStageConfigToGrowthStage(config: GrowthStageConfig): GrowthStage {
  return {
    name: config.label || config.value,
    n: config.n,
    p: config.p,
    k: config.k,
    ec: config.ec,
    ph: config.ph,
  };
}

export function mapGrowthStagesConfigToRecord(configs: Record<string, GrowthStageConfig>): Record<string, GrowthStage> {
  const result: Record<string, GrowthStage> = {};
  for (const key in configs) {
    result[key] = mapGrowthStageConfigToGrowthStage(configs[key]);
  }
  return result;
}
