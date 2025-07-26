


import React from 'react';
import { getNutrientStatus, getStatusColor } from '../utils/nutrientUtils';

interface NutrientField {
  key: string;
  label: string;
}

interface GrowthStage {
  name: string;
  [key: string]: any;
}

interface WaterType {
  name: string;
}

interface FertilizerDatabase {
  [key: string]: any;
}

interface SelectedFertilizer {
  [key: string]: any;
}

interface CustomWaterProfile {
  [key: string]: any;
}

interface Results {
  nutrients?: {
    [key: string]: number;
  };
}

interface AnalysisTabProps {
  NUTRIENT_FIELDS: NutrientField[];
  GROWTH_STAGES: { [key: string]: GrowthStage };
  WATER_TYPES: { [key: string]: WaterType };
  fertilizerDatabase: FertilizerDatabase;
  selectedFertilizers: SelectedFertilizer[];
  waterVolume: number;
  growthStage: string;
  waterType: string;
  customWaterProfile: CustomWaterProfile;
  results: Results;
}

const AnalysisTab: React.FC<AnalysisTabProps> = ({
  NUTRIENT_FIELDS,
  GROWTH_STAGES,
  WATER_TYPES,
  fertilizerDatabase,
  selectedFertilizers,
  waterVolume,
  growthStage,
  waterType,
  customWaterProfile,
  results
}) => {
  // Determine optimal ranges for the current growth stage
  const stage = GROWTH_STAGES[growthStage] || {};

  // Warnings for suboptimal nutrients
  const warnings = NUTRIENT_FIELDS.filter(field => {
    const value = results.nutrients?.[field.key];
    const range = stage[field.key];
    return value !== undefined && range && (value < range[0] || value > range[1]);
  });

  // Optimization tips (simple version)
  const tips: string[] = [];
  if (warnings.length > 0) {
    tips.push('Passe die Dosierung deiner Dünger an, um die Nährstoffe in den optimalen Bereich zu bringen.');
  } else {
    tips.push('Alle Hauptnährstoffe sind im optimalen Bereich!');
  }

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white dark:bg-slate-800 rounded-lg shadow space-y-6">
      <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">Nährstoff-Analyse</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left">Nährstoff</th>
              <th className="px-2 py-1 text-left">Wert</th>
              <th className="px-2 py-1 text-left">Optimalbereich</th>
              <th className="px-2 py-1 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {NUTRIENT_FIELDS.map(field => {
              const value = results.nutrients?.[field.key];
              const range = stage[field.key];
              const status = getNutrientStatus(value, range);
              return (
                <tr key={field.key} className={getStatusColor(status)}>
                  <td className="px-2 py-1 font-medium">{field.label}</td>
                  <td className="px-2 py-1">{value !== undefined ? value : '-'}</td>
                  <td className="px-2 py-1">{range ? `${range[0]} - ${range[1]}` : '-'}</td>
                  <td className="px-2 py-1">{status === 'optimal' ? 'Optimal' : status === 'suboptimal' ? 'Achtung' : 'Unbekannt'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <h3 className="font-semibold mb-1">Warnungen</h3>
        {warnings.length === 0 ? (
          <div className="text-green-700 dark:text-green-300">Keine Warnungen. Alle Werte sind im optimalen Bereich.</div>
        ) : (
          <ul className="list-disc pl-5 text-yellow-700 dark:text-yellow-300">
            {warnings.map(field => (
              <li key={field.key}>{field.label}: Wert außerhalb des Optimalbereichs!</li>
            ))}
          </ul>
        )}
      </div>
      <div className="mt-4">
        <h3 className="font-semibold mb-1">Optimierungstipps</h3>
        <ul className="list-disc pl-5 text-blue-700 dark:text-blue-300">
          {tips.map((tip, idx) => <li key={idx}>{tip}</li>)}
        </ul>
      </div>
    </div>
  );
};

export default AnalysisTab;

