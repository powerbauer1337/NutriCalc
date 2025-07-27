import React, { memo } from 'react';
import { getNutrientStatus, getStatusColor } from '../utils/nutrientUtils';

interface NutrientField {
  key: string;
  label: string;
  unit: string;
}

interface NutrientResultsProps {
  results: {
    nutrients: Record<string, number>;
    stage: {
      [key: string]: { min: number; max: number };
    };
  };
  nutrientFields: NutrientField[];
}

const NutrientResults: React.FC<NutrientResultsProps> = memo(({ results, nutrientFields }) => {
  if (!results || !results.nutrients || !results.stage) {
    return (
      <div className="mt-6 p-4 bg-slate-100 dark:bg-slate-900 rounded-lg">
        <h3 className="font-semibold mb-2 text-slate-800 dark:text-slate-100">
          Berechnete Hauptwerte
        </h3>
        <p className="text-slate-600 dark:text-slate-400">Keine Daten verfügbar</p>
      </div>
    );
  }

  return (
    <div className="mt-6 p-4 bg-slate-100 dark:bg-slate-900 rounded-lg">
      <h3 className="font-semibold mb-2 text-slate-800 dark:text-slate-100">
        Berechnete Hauptwerte
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {nutrientFields.map((nutrient) => {
          const value = results.nutrients[nutrient.key] || 0;
          const range = results.stage[nutrient.key];
          const status = range ? getNutrientStatus(value, [range.min, range.max]) : 'unknown';
          const statusColor = getStatusColor(status);

          return (
            <div
              key={nutrient.key}
              className={`p-3 rounded-md border ${statusColor}`}
            >
              <div className="text-xs font-medium opacity-75">
                {nutrient.label}
              </div>
              <div className="text-lg font-bold">
                {value.toFixed(1)} {nutrient.unit}
              </div>
              <div className="text-xs mt-1">
                {range ? (
                  <>
                    Ziel: {range.min}-{range.max} {nutrient.unit}
                    <br />
                    <span className="font-medium">
                      {status === 'optimal' ? '✓ Optimal' : 
                       status === 'suboptimal' ? '⚠ Anpassen' : '? Unbekannt'}
                    </span>
                  </>
                ) : (
                  'Kein Zielbereich definiert'
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default NutrientResults;
