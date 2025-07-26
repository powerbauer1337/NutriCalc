// Helper function to get nutrient status
export const getNutrientStatus = (
  value: number,
  range: [number, number]
): 'optimal' | 'suboptimal' | 'unknown' => {
  if (!range || !Array.isArray(range) || range.length !== 2) return 'unknown';
  if (value >= range[0] && value <= range[1]) return 'optimal';
  return 'suboptimal';
};

// Helper function to get status color
export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'optimal':
      return 'bg-green-100 dark:bg-green-800/30 text-green-800 dark:text-green-200';
    case 'suboptimal':
      return 'bg-yellow-100 dark:bg-yellow-800/30 text-yellow-800 dark:text-yellow-200';
    default:
      return 'bg-slate-100 dark:bg-slate-800/30 text-slate-800 dark:text-slate-200';
  }
};

// Helper function to get progress bar width
export const getProgressBarWidth = (value: number, range: [number, number]): number => {
  if (!range || !Array.isArray(range) || range.length !== 2 || range[1] === 0) return 0;
  const maxTarget = range[1] * 1.2;
  return Math.min((value / maxTarget) * 100, 100);
};

interface Fertilizer {
  id: string;
  active: boolean;
  amount: string | number;
}

interface FertilizerData {
  composition: Record<string, number>;
}

interface FertilizerDatabase {
  [key: string]: FertilizerData;
}

interface NutrientContributions {
  contributions: Record<string, Record<string, number>>;
  nutrients: Record<string, number>;
}

// Helper function to calculate nutrient contributions
export const calculateNutrientContributions = (
  fertilizers: Fertilizer[],
  waterVolume: number,
  fertilizerDatabase: FertilizerDatabase
): NutrientContributions => {
  const contributions: Record<string, Record<string, number>> = {};
  const nutrients: Record<string, number> = {};

  fertilizers.forEach((fert) => {
    if (!fert.active || Number(fert.amount) <= 0) return;

    const fertData = fertilizerDatabase[fert.id];
    if (!fertData) return;

    contributions[fert.id] = {};
    Object.entries(fertData.composition).forEach(([key, value]) => {
      const contribution = (Number(value) * Number(fert.amount)) / waterVolume;
      contributions[fert.id][key] = contribution;
      nutrients[key] = (nutrients[key] || 0) + contribution;
    });
  });

  return { contributions, nutrients };
};

// Helper function to get recommended fertilizers
export const getRecommendedFertilizers = (growthStage: string): string[] => {
  if (growthStage.includes('veg')) return ['hesi_tnt', 'ta_calmg'];
  if (growthStage.includes('flower')) return ['hesi_bloom'];
  return ['hesi_tnt', 'ta_calmg'];
};

// Helper function to optimize nutrients
export const optimizeNutrients = (
  growthStage: string,
  fertilizerDatabase: FertilizerDatabase,
  updateFertilizerAmount: (id: string, amount: string) => void
): void => {
  if (growthStage.includes('veg')) {
    if (fertilizerDatabase['hesi_tnt']) updateFertilizerAmount('hesi_tnt', '5.0');
    if (fertilizerDatabase['ta_calmg']) updateFertilizerAmount('ta_calmg', '2.5');
  } else if (growthStage.includes('flower')) {
    if (fertilizerDatabase['hesi_bloom']) updateFertilizerAmount('hesi_bloom', '6.0');
  }
};
