import { CultivationContext, AIAction } from './AIAssistantService';
import { CannabisKnowledgeBase } from './CannabisKnowledgeBase';

export interface ContextAnalysis {
  nutrientStatus: NutrientStatus;
  growthStageAnalysis: GrowthStageAnalysis;
  environmentalAssessment: EnvironmentalAssessment;
  recommendations: Recommendation[];
  alerts: Alert[];
  confidence: number;
}

export interface NutrientStatus {
  overall: 'optimal' | 'suboptimal' | 'deficient' | 'excessive';
  individual: Record<string, {
    status: 'low' | 'optimal' | 'high';
    current: number;
    optimal: [number, number];
    deviation: number;
  }>;
  ecStatus: 'low' | 'optimal' | 'high';
  phStatus: 'low' | 'optimal' | 'high';
}

export interface GrowthStageAnalysis {
  currentStage: string;
  weekInStage: number;
  nextStage?: string;
  stageProgress: number; // 0-1
  stageOptimal: boolean;
  transitionRecommendations?: string[];
}

export interface EnvironmentalAssessment {
  temperature: 'low' | 'optimal' | 'high' | 'unknown';
  humidity: 'low' | 'optimal' | 'high' | 'unknown';
  lightCycle: 'correct' | 'incorrect' | 'unknown';
  overallScore: number; // 0-1
}

export interface Recommendation {
  type: 'nutrient' | 'environmental' | 'training' | 'harvest' | 'general';
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  action?: AIAction;
  reasoning: string;
  timeframe: 'immediate' | 'within_day' | 'within_week' | 'next_stage';
}

export interface Alert {
  type: 'warning' | 'error' | 'info';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  action?: AIAction;
  dismissible: boolean;
}

export class AIContextEngine {
  private knowledgeBase: CannabisKnowledgeBase;

  constructor() {
    this.knowledgeBase = new CannabisKnowledgeBase();
  }

  analyzeContext(context: CultivationContext): ContextAnalysis {
    const nutrientStatus = this.analyzeNutrients(context);
    const growthStageAnalysis = this.analyzeGrowthStage(context);
    const environmentalAssessment = this.analyzeEnvironment(context);
    const recommendations = this.generateRecommendations(context, nutrientStatus, growthStageAnalysis);
    const alerts = this.generateAlerts(context, nutrientStatus, environmentalAssessment);
    
    const confidence = this.calculateOverallConfidence(
      nutrientStatus,
      growthStageAnalysis,
      environmentalAssessment
    );

    return {
      nutrientStatus,
      growthStageAnalysis,
      environmentalAssessment,
      recommendations,
      alerts,
      confidence
    };
  }

  private analyzeNutrients(context: CultivationContext): NutrientStatus {
    const optimalRanges = this.knowledgeBase.getOptimalNutrients(context.growthStage);
    if (!optimalRanges) {
      return this.getDefaultNutrientStatus();
    }

    const individual: Record<string, any> = {};
    let optimalCount = 0;
    let totalNutrients = 0;

    Object.entries(context.nutrients).forEach(([nutrient, value]) => {
      const optimal = optimalRanges[nutrient];
      if (optimal) {
        totalNutrients++;
        const [min, max] = optimal;
        const deviation = this.calculateDeviation(value, min, max);
        
        let status: 'low' | 'optimal' | 'high';
        if (value < min) status = 'low';
        else if (value > max) status = 'high';
        else {
          status = 'optimal';
          optimalCount++;
        }

        individual[nutrient] = {
          status,
          current: value,
          optimal,
          deviation
        };
      }
    });

    // Determine overall status
    const optimalPercentage = optimalCount / totalNutrients;
    let overall: 'optimal' | 'suboptimal' | 'deficient' | 'excessive';
    
    if (optimalPercentage >= 0.8) overall = 'optimal';
    else if (optimalPercentage >= 0.6) overall = 'suboptimal';
    else {
      // Check if more nutrients are low or high
      const lowCount = Object.values(individual).filter((n: any) => n.status === 'low').length;
      const highCount = Object.values(individual).filter((n: any) => n.status === 'high').length;
      overall = lowCount > highCount ? 'deficient' : 'excessive';
    }

    // Analyze EC and pH
    const ecOptimal = optimalRanges.ec || [0.8, 1.6];
    const phOptimal = optimalRanges.ph || [5.8, 6.3];
    
    const ecStatus = this.getStatus(context.nutrients.ec, ecOptimal[0], ecOptimal[1]);
    const phStatus = this.getStatus(context.nutrients.ph, phOptimal[0], phOptimal[1]);

    return {
      overall,
      individual,
      ecStatus,
      phStatus
    };
  }

  private analyzeGrowthStage(context: CultivationContext): GrowthStageAnalysis {
    const stageInfo = this.knowledgeBase.getGrowthStageInfo(context.growthStage);
    if (!stageInfo) {
      return this.getDefaultGrowthStageAnalysis(context.growthStage);
    }

    // Estimate week in stage based on grow week
    const weekInStage = context.growWeek || 1;
    
    // Calculate stage progress (simplified)
    const stageDurations = {
      'seedling': 2,
      'early-veg': 4,
      'late-veg': 6,
      'flowering': 10
    };
    
    const expectedDuration = stageDurations[context.growthStage as keyof typeof stageDurations] || 4;
    const stageProgress = Math.min(weekInStage / expectedDuration, 1);

    // Determine next stage
    const stageOrder = ['seedling', 'early-veg', 'late-veg', 'flowering'];
    const currentIndex = stageOrder.indexOf(context.growthStage);
    const nextStage = currentIndex < stageOrder.length - 1 ? stageOrder[currentIndex + 1] : undefined;

    // Check if stage is optimal based on nutrients and environment
    const nutrientStatus = this.analyzeNutrients(context);
    const stageOptimal = nutrientStatus.overall === 'optimal';

    // Generate transition recommendations
    const transitionRecommendations = this.getTransitionRecommendations(
      context.growthStage,
      stageProgress,
      nextStage
    );

    return {
      currentStage: context.growthStage,
      weekInStage,
      nextStage,
      stageProgress,
      stageOptimal,
      transitionRecommendations
    };
  }

  private analyzeEnvironment(context: CultivationContext): EnvironmentalAssessment {
    const environmentalNeeds = this.knowledgeBase.getEnvironmentalNeeds(context.growthStage);
    if (!environmentalNeeds || !context.environmentalData) {
      return {
        temperature: 'unknown',
        humidity: 'unknown',
        lightCycle: 'unknown',
        overallScore: 0.5
      };
    }

    const { environmentalData } = context;
    const { temperature: tempRange, humidity: humRange } = environmentalNeeds;

    const temperature = environmentalData.temperature 
      ? this.getStatus(environmentalData.temperature, tempRange[0], tempRange[1])
      : 'unknown';
    
    const humidity = environmentalData.humidity
      ? this.getStatus(environmentalData.humidity, humRange[0], humRange[1])
      : 'unknown';

    const lightCycle = environmentalData.lightCycle === environmentalNeeds.lightCycle
      ? 'correct'
      : environmentalData.lightCycle
        ? 'incorrect'
        : 'unknown';

    // Calculate overall score
    const scores = [temperature, humidity, lightCycle].map(status => {
      switch (status) {
        case 'optimal':
        case 'correct': return 1;
        case 'low':
        case 'high':
        case 'incorrect': return 0.3;
        default: return 0.5;
      }
    });

    const overallScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;

    return {
      temperature,
      humidity,
      lightCycle,
      overallScore
    };
  }

  private generateRecommendations(
    context: CultivationContext,
    nutrientStatus: NutrientStatus,
    growthStageAnalysis: GrowthStageAnalysis
  ): Recommendation[] {
    const recommendations: Recommendation[] = [];

    // Nutrient recommendations
    Object.entries(nutrientStatus.individual).forEach(([nutrient, status]) => {
      if (status.status !== 'optimal') {
        const priority = Math.abs(status.deviation) > 0.5 ? 'high' : 'medium';
        const action = status.status === 'low' ? 'increase' : 'decrease';
        
        recommendations.push({
          type: 'nutrient',
          priority,
          title: `${action.charAt(0).toUpperCase() + action.slice(1)} ${nutrient.toUpperCase()}`,
          description: `Current ${nutrient.toUpperCase()}: ${status.current}, Optimal: ${status.optimal[0]}-${status.optimal[1]}`,
          reasoning: `${nutrient.toUpperCase()} levels are ${status.status} for ${context.growthStage} stage`,
          timeframe: priority === 'high' ? 'immediate' : 'within_day'
        });
      }
    });

    // Growth stage recommendations
    if (growthStageAnalysis.stageProgress > 0.8 && growthStageAnalysis.nextStage) {
      recommendations.push({
        type: 'general',
        priority: 'medium',
        title: `Prepare for ${growthStageAnalysis.nextStage}`,
        description: `Consider transitioning to ${growthStageAnalysis.nextStage} stage`,
        reasoning: `Current stage is ${Math.round(growthStageAnalysis.stageProgress * 100)}% complete`,
        timeframe: 'within_week'
      });
    }

    // Environmental recommendations
    if (context.environmentalData) {
      const envNeeds = this.knowledgeBase.getEnvironmentalNeeds(context.growthStage);
      if (envNeeds) {
        if (context.environmentalData.temperature && 
            (context.environmentalData.temperature < envNeeds.temperature[0] || 
             context.environmentalData.temperature > envNeeds.temperature[1])) {
          recommendations.push({
            type: 'environmental',
            priority: 'medium',
            title: 'Adjust Temperature',
            description: `Optimal temperature for ${context.growthStage}: ${envNeeds.temperature[0]}-${envNeeds.temperature[1]}°C`,
            reasoning: `Current temperature (${context.environmentalData.temperature}°C) is outside optimal range`,
            timeframe: 'immediate'
          });
        }
      }
    }

    return recommendations.sort((a, b) => {
      const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }

  private generateAlerts(
    context: CultivationContext,
    nutrientStatus: NutrientStatus,
    environmentalAssessment: EnvironmentalAssessment
  ): Alert[] {
    const alerts: Alert[] = [];

    // Critical nutrient alerts
    Object.entries(nutrientStatus.individual).forEach(([nutrient, status]) => {
      if (Math.abs(status.deviation) > 0.7) {
        alerts.push({
          type: 'warning',
          severity: 'high',
          title: `Critical ${nutrient.toUpperCase()} ${status.status === 'low' ? 'Deficiency' : 'Excess'}`,
          message: `${nutrient.toUpperCase()} levels are critically ${status.status}. Immediate action required.`,
          dismissible: false
        });
      }
    });

    // pH alerts
    if (nutrientStatus.phStatus !== 'optimal') {
      const severity = Math.abs(context.nutrients.ph - 6.0) > 1.0 ? 'critical' : 'medium';
      alerts.push({
        type: 'warning',
        severity,
        title: 'pH Out of Range',
        message: `pH (${context.nutrients.ph}) is ${nutrientStatus.phStatus}. This can cause nutrient lockout.`,
        dismissible: severity !== 'critical'
      });
    }

    // Environmental alerts
    if (environmentalAssessment.overallScore < 0.4) {
      alerts.push({
        type: 'warning',
        severity: 'medium',
        title: 'Environmental Conditions Suboptimal',
        message: 'Multiple environmental parameters are outside optimal ranges.',
        dismissible: true
      });
    }

    return alerts.sort((a, b) => {
      const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
      return severityOrder[b.severity] - severityOrder[a.severity];
    });
  }

  private calculateOverallConfidence(
    nutrientStatus: NutrientStatus,
    growthStageAnalysis: GrowthStageAnalysis,
    environmentalAssessment: EnvironmentalAssessment
  ): number {
    let confidence = 0.7; // Base confidence

    // Adjust based on data completeness
    const nutrientCount = Object.keys(nutrientStatus.individual).length;
    if (nutrientCount >= 5) confidence += 0.1;
    if (nutrientCount >= 7) confidence += 0.1;

    // Adjust based on environmental data availability
    if (environmentalAssessment.overallScore > 0.5) confidence += 0.05;
    if (environmentalAssessment.overallScore === 0.5) confidence -= 0.05; // Unknown data

    // Adjust based on growth stage certainty
    if (growthStageAnalysis.stageOptimal) confidence += 0.05;

    return Math.max(0.3, Math.min(0.95, confidence));
  }

  // Helper methods
  private calculateDeviation(value: number, min: number, max: number): number {
    if (value < min) return (min - value) / min;
    if (value > max) return (value - max) / max;
    return 0;
  }

  private getStatus(value: number, min: number, max: number): 'low' | 'optimal' | 'high' {
    if (value < min) return 'low';
    if (value > max) return 'high';
    return 'optimal';
  }

  private getDefaultNutrientStatus(): NutrientStatus {
    return {
      overall: 'suboptimal',
      individual: {},
      ecStatus: 'optimal',
      phStatus: 'optimal'
    };
  }

  private getDefaultGrowthStageAnalysis(stage: string): GrowthStageAnalysis {
    return {
      currentStage: stage,
      weekInStage: 1,
      stageProgress: 0.1,
      stageOptimal: false
    };
  }

  private getTransitionRecommendations(
    currentStage: string,
    progress: number,
    nextStage?: string
  ): string[] {
    if (progress < 0.7 || !nextStage) return [];

    const transitions = {
      'seedling-early-veg': [
        'Gradually increase nutrient strength',
        'Begin monitoring for pest emergence',
        'Prepare for increased water uptake'
      ],
      'early-veg-late-veg': [
        'Increase nitrogen levels',
        'Consider training techniques',
        'Monitor for pre-flower signs'
      ],
      'late-veg-flowering': [
        'Switch to 12/12 light cycle',
        'Reduce nitrogen, increase P-K',
        'Lower humidity to prevent mold'
      ]
    };

    const transitionKey = `${currentStage}-${nextStage}` as keyof typeof transitions;
    return transitions[transitionKey] || [];
  }
}
