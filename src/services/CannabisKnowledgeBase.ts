export interface GrowthStageInfo {
  name: string;
  duration: string;
  characteristics: string[];
  optimalNutrients: Record<string, [number, number]>;
  commonIssues: string[];
  tips: string[];
  environmentalNeeds: {
    temperature: [number, number];
    humidity: [number, number];
    lightCycle: string;
    ph: [number, number];
    ec: [number, number];
  };
}

export interface NutrientDeficiency {
  nutrient: string;
  symptoms: string[];
  causes: string[];
  solutions: string[];
  severity: 'mild' | 'moderate' | 'severe';
  affectedStages: string[];
}

export interface CultivationTip {
  category: 'nutrients' | 'environment' | 'training' | 'harvest' | 'general';
  title: string;
  description: string;
  applicableStages: string[];
  difficulty: 'beginner' | 'intermediate' | 'expert';
  language: 'de' | 'en';
}

export class CannabisKnowledgeBase {
  private growthStages: Record<string, GrowthStageInfo>;
  private nutrientDeficiencies: Record<string, NutrientDeficiency>;
  private cultivationTips: CultivationTip[];
  private commonProblems: Record<string, any>;

  constructor() {
    this.initializeGrowthStages();
    this.initializeNutrientDeficiencies();
    this.initializeCultivationTips();
    this.initializeCommonProblems();
  }

  private initializeGrowthStages(): void {
    this.growthStages = {
      seedling: {
        name: 'Seedling',
        duration: '1-3 weeks',
        characteristics: [
          'First true leaves developing',
          'Delicate root system',
          'Low nutrient requirements',
          'High humidity needs'
        ],
        optimalNutrients: {
          n: [50, 100],
          p: [20, 40],
          k: [40, 80],
          ca: [100, 150],
          mg: [30, 50],
          ec: [0.4, 0.8],
          ph: [5.8, 6.2]
        },
        commonIssues: [
          'Overwatering',
          'Nutrient burn',
          'Damping off',
          'Light burn'
        ],
        tips: [
          'Use quarter-strength nutrients',
          'Maintain high humidity (70-80%)',
          'Gentle lighting (18-24 hours)',
          'Keep soil slightly moist'
        ],
        environmentalNeeds: {
          temperature: [20, 25],
          humidity: [70, 80],
          lightCycle: '18/6 or 24/0',
          ph: [5.8, 6.2],
          ec: [0.4, 0.8]
        }
      },
      
      'early-veg': {
        name: 'Early Vegetative',
        duration: '3-6 weeks',
        characteristics: [
          'Rapid leaf development',
          'Strong root growth',
          'Increased nutrient uptake',
          'Node development'
        ],
        optimalNutrients: {
          n: [100, 150],
          p: [40, 60],
          k: [80, 120],
          ca: [150, 200],
          mg: [50, 70],
          ec: [0.8, 1.2],
          ph: [5.8, 6.3]
        },
        commonIssues: [
          'Nitrogen deficiency',
          'Overfeeding',
          'pH fluctuations',
          'Pest emergence'
        ],
        tips: [
          'Increase nitrogen gradually',
          'Monitor pH daily',
          'Begin training techniques',
          'Ensure good air circulation'
        ],
        environmentalNeeds: {
          temperature: [22, 26],
          humidity: [60, 70],
          lightCycle: '18/6',
          ph: [5.8, 6.3],
          ec: [0.8, 1.2]
        }
      },

      'late-veg': {
        name: 'Late Vegetative',
        duration: '4-8 weeks',
        characteristics: [
          'Vigorous growth',
          'Pre-flower development',
          'Maximum nutrient uptake',
          'Training opportunities'
        ],
        optimalNutrients: {
          n: [150, 200],
          p: [60, 80],
          k: [120, 160],
          ca: [200, 250],
          mg: [70, 90],
          ec: [1.2, 1.6],
          ph: [5.9, 6.4]
        },
        commonIssues: [
          'Nutrient lockout',
          'Calcium deficiency',
          'Light stress',
          'Training damage'
        ],
        tips: [
          'Peak feeding time',
          'Implement training methods',
          'Monitor for pre-flowers',
          'Prepare for flower transition'
        ],
        environmentalNeeds: {
          temperature: [22, 27],
          humidity: [55, 65],
          lightCycle: '18/6',
          ph: [5.9, 6.4],
          ec: [1.2, 1.6]
        }
      },

      flowering: {
        name: 'Flowering',
        duration: '8-12 weeks',
        characteristics: [
          'Bud development',
          'Reduced nitrogen needs',
          'Increased P-K requirements',
          'Trichome production'
        ],
        optimalNutrients: {
          n: [80, 120],
          p: [80, 120],
          k: [160, 220],
          ca: [200, 250],
          mg: [70, 90],
          ec: [1.4, 1.8],
          ph: [6.0, 6.5]
        },
        commonIssues: [
          'Bud rot',
          'Phosphorus deficiency',
          'Calcium deficiency',
          'Light burn on buds'
        ],
        tips: [
          'Reduce nitrogen gradually',
          'Increase P-K ratios',
          'Lower humidity',
          'Monitor trichomes for harvest'
        ],
        environmentalNeeds: {
          temperature: [20, 25],
          humidity: [40, 50],
          lightCycle: '12/12',
          ph: [6.0, 6.5],
          ec: [1.4, 1.8]
        }
      }
    };
  }

  private initializeNutrientDeficiencies(): void {
    this.nutrientDeficiencies = {
      nitrogen: {
        nutrient: 'Nitrogen (N)',
        symptoms: [
          'Yellowing of lower leaves',
          'Slow growth',
          'Pale green coloration',
          'Premature leaf drop'
        ],
        causes: [
          'Insufficient nitrogen in nutrient solution',
          'pH lockout (too high or low)',
          'Root problems',
          'Overwatering'
        ],
        solutions: [
          'Increase nitrogen concentration',
          'Check and adjust pH (5.8-6.3)',
          'Improve root health',
          'Reduce watering frequency'
        ],
        severity: 'moderate',
        affectedStages: ['early-veg', 'late-veg']
      },

      phosphorus: {
        nutrient: 'Phosphorus (P)',
        symptoms: [
          'Dark green leaves with purple stems',
          'Purple/red leaf discoloration',
          'Slow flowering',
          'Reduced bud development'
        ],
        causes: [
          'Low phosphorus levels',
          'Cold temperatures',
          'pH too high or low',
          'Nutrient lockout'
        ],
        solutions: [
          'Increase phosphorus levels',
          'Maintain optimal temperature',
          'Adjust pH to 6.0-6.5',
          'Flush and reset nutrients'
        ],
        severity: 'severe',
        affectedStages: ['flowering']
      },

      potassium: {
        nutrient: 'Potassium (K)',
        symptoms: [
          'Brown leaf edges (burn)',
          'Yellow spots on leaves',
          'Weak stems',
          'Poor bud quality'
        ],
        causes: [
          'Insufficient potassium',
          'High sodium levels',
          'pH imbalance',
          'Light burn stress'
        ],
        solutions: [
          'Increase potassium levels',
          'Check water quality',
          'Maintain proper pH',
          'Reduce light intensity'
        ],
        severity: 'moderate',
        affectedStages: ['late-veg', 'flowering']
      },

      calcium: {
        nutrient: 'Calcium (Ca)',
        symptoms: [
          'Brown spots on leaves',
          'Weak cell walls',
          'Bud rot susceptibility',
          'Stunted growth'
        ],
        causes: [
          'Low calcium levels',
          'High humidity',
          'Poor air circulation',
          'Magnesium excess'
        ],
        solutions: [
          'Add calcium supplement',
          'Improve ventilation',
          'Balance Mg:Ca ratio',
          'Monitor humidity levels'
        ],
        severity: 'severe',
        affectedStages: ['late-veg', 'flowering']
      },

      magnesium: {
        nutrient: 'Magnesium (Mg)',
        symptoms: [
          'Yellowing between leaf veins',
          'Leaf curling',
          'Reduced chlorophyll',
          'Poor light absorption'
        ],
        causes: [
          'Low magnesium levels',
          'High potassium levels',
          'pH lockout',
          'Cold temperatures'
        ],
        solutions: [
          'Add Epsom salt (MgSO4)',
          'Balance K:Mg ratio',
          'Adjust pH to optimal range',
          'Maintain proper temperature'
        ],
        severity: 'moderate',
        affectedStages: ['late-veg', 'flowering']
      }
    };
  }

  private initializeCultivationTips(): void {
    this.cultivationTips = [
      {
        category: 'nutrients',
        title: 'Start Low, Go Slow',
        description: 'Begin with 25% of recommended nutrient strength and gradually increase based on plant response.',
        applicableStages: ['seedling', 'early-veg'],
        difficulty: 'beginner',
        language: 'en'
      },
      {
        category: 'nutrients',
        title: 'Niedrig anfangen, langsam steigern',
        description: 'Beginnen Sie mit 25% der empfohlenen Nährstoffstärke und erhöhen Sie diese schrittweise basierend auf der Pflanzenreaktion.',
        applicableStages: ['seedling', 'early-veg'],
        difficulty: 'beginner',
        language: 'de'
      },
      {
        category: 'environment',
        title: 'VPD Management',
        description: 'Maintain optimal Vapor Pressure Deficit (VPD) for maximum growth efficiency.',
        applicableStages: ['late-veg', 'flowering'],
        difficulty: 'expert',
        language: 'en'
      },
      {
        category: 'training',
        title: 'LST Timing',
        description: 'Begin Low Stress Training when plants have 4-6 nodes for optimal results.',
        applicableStages: ['early-veg', 'late-veg'],
        difficulty: 'intermediate',
        language: 'en'
      },
      {
        category: 'harvest',
        title: 'Trichome Inspection',
        description: 'Harvest when trichomes are 70% cloudy, 30% amber for balanced effects.',
        applicableStages: ['flowering'],
        difficulty: 'intermediate',
        language: 'en'
      }
    ];
  }

  private initializeCommonProblems(): void {
    this.commonProblems = {
      'nutrient_burn': {
        symptoms: ['Leaf tip burn', 'Dark green leaves', 'Clawing'],
        causes: ['Overfeeding', 'High EC levels'],
        solutions: ['Reduce nutrient concentration', 'Flush with pH water']
      },
      'ph_lockout': {
        symptoms: ['Multiple deficiency symptoms', 'Stunted growth'],
        causes: ['pH too high/low', 'Nutrient precipitation'],
        solutions: ['Adjust pH to optimal range', 'Flush and reset']
      },
      'light_burn': {
        symptoms: ['Bleached leaves', 'Crispy leaf edges'],
        causes: ['Lights too close', 'Excessive intensity'],
        solutions: ['Increase light distance', 'Reduce intensity']
      }
    };
  }

  // Public methods for knowledge retrieval
  getGrowthStageInfo(stage: string): GrowthStageInfo | null {
    return this.growthStages[stage] || null;
  }

  getNutrientDeficiencyInfo(nutrient: string): NutrientDeficiency | null {
    return this.nutrientDeficiencies[nutrient] || null;
  }

  getCultivationTips(
    stage?: string,
    difficulty?: string,
    language: 'de' | 'en' = 'en'
  ): CultivationTip[] {
    return this.cultivationTips.filter(tip => {
      if (language && tip.language !== language) return false;
      if (stage && !tip.applicableStages.includes(stage)) return false;
      if (difficulty && tip.difficulty !== difficulty) return false;
      return true;
    });
  }

  diagnoseIssue(symptoms: string[]): any[] {
    const matches: any[] = [];
    
    // Check nutrient deficiencies
    Object.values(this.nutrientDeficiencies).forEach(deficiency => {
      const matchCount = symptoms.filter(symptom => 
        deficiency.symptoms.some(defSymptom => 
          defSymptom.toLowerCase().includes(symptom.toLowerCase()) ||
          symptom.toLowerCase().includes(defSymptom.toLowerCase())
        )
      ).length;
      
      if (matchCount > 0) {
        matches.push({
          type: 'nutrient_deficiency',
          issue: deficiency,
          confidence: matchCount / symptoms.length
        });
      }
    });

    // Check common problems
    Object.entries(this.commonProblems).forEach(([key, problem]) => {
      const matchCount = symptoms.filter(symptom => 
        problem.symptoms.some((probSymptom: string) => 
          probSymptom.toLowerCase().includes(symptom.toLowerCase()) ||
          symptom.toLowerCase().includes(probSymptom.toLowerCase())
        )
      ).length;
      
      if (matchCount > 0) {
        matches.push({
          type: 'common_problem',
          issue: { name: key, ...problem },
          confidence: matchCount / symptoms.length
        });
      }
    });

    return matches.sort((a, b) => b.confidence - a.confidence);
  }

  getOptimalNutrients(stage: string): Record<string, [number, number]> | null {
    const stageInfo = this.getGrowthStageInfo(stage);
    return stageInfo?.optimalNutrients || null;
  }

  getEnvironmentalNeeds(stage: string): any | null {
    const stageInfo = this.getGrowthStageInfo(stage);
    return stageInfo?.environmentalNeeds || null;
  }
}
