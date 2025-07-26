import React from 'react';

interface NutrientInfo {
  key: string;
  label: string;
  optimal: [number, number];
}

interface Results {
  nutrients?: {
    [key: string]: number;
  };
}

interface DetailsTabProps {
  results: Results;
}

const micronutrients: NutrientInfo[] = [
  { key: 'fe', label: 'Eisen (Fe)', optimal: [0.5, 2.5] },
  { key: 'mn', label: 'Mangan (Mn)', optimal: [0.2, 1.0] },
  { key: 'zn', label: 'Zink (Zn)', optimal: [0.05, 0.2] },
  { key: 'cu', label: 'Kupfer (Cu)', optimal: [0.01, 0.05] },
  { key: 'b', label: 'Bor (B)', optimal: [0.02, 0.1] },
  { key: 'mo', label: 'Molybdän (Mo)', optimal: [0.005, 0.02] },
];

const secondaryNutrients: NutrientInfo[] = [{ key: 's', label: 'Schwefel (S)', optimal: [30, 70] }];

type NutrientStatus = 'low' | 'high' | 'optimal' | 'moderate' | 'neutral';

function getNutrientStatus(value: number, range: [number, number] | undefined): NutrientStatus {
  if (!range || !Array.isArray(range) || range.length !== 2) return 'neutral';
  const [min, max] = range;
  if (value < min * 0.8) return 'low';
  if (value > max * 1.2) return 'high';
  if (value >= min && value <= max) return 'optimal';
  return 'moderate';
}

function getStatusColor(status: NutrientStatus): string {
  switch (status) {
    case 'low':
      return 'text-blue-700 bg-blue-100 dark:text-blue-300 dark:bg-blue-700/30 border border-blue-200 dark:border-blue-600';
    case 'high':
      return 'text-red-700 bg-red-100 dark:text-red-300 dark:bg-red-700/30 border border-red-200 dark:border-red-600';
    case 'optimal':
      return 'text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-700/30 border border-green-200 dark:border-green-600';
    case 'moderate':
      return 'text-yellow-700 bg-yellow-100 dark:text-yellow-300 dark:bg-yellow-600/30 border border-yellow-200 dark:border-yellow-500';
    default:
      return 'text-slate-600 bg-slate-100 dark:text-slate-400 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600';
  }
}

const DetailsTab: React.FC<DetailsTabProps> = ({ results }) => (
  <div className="grid lg:grid-cols-2 gap-4">
    <div className="space-y-3">
      <h2 className="text-md font-semibold text-slate-700 dark:text-slate-200">
        Mikronährstoffe (ppm)
      </h2>
      <div className="space-y-1.5 bg-slate-100 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
        {micronutrients.map((micro) => {
          const value = results?.nutrients?.[micro.key] ?? 0;
          const status = getNutrientStatus(value, micro.optimal);
          return (
            <div
              key={micro.key}
              className={`flex justify-between items-center p-1.5 rounded-md text-xs ${getStatusColor(status)}`}
            >
              <span>{micro.label}:</span>
              <div className="text-right">
                <span className="font-medium">{value.toFixed(3)} ppm</span>
                <div className="text-[0.65rem] opacity-70">
                  ({micro.optimal[0]}-{micro.optimal[1]})
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    <div className="space-y-3">
      <h2 className="text-md font-semibold text-slate-700 dark:text-slate-200">
        Weitere Makro-/Sekundärnährstoffe (ppm)
      </h2>
      <div className="space-y-1.5 bg-slate-100 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
        {secondaryNutrients.map((sec) => {
          const value = results?.nutrients?.[sec.key] ?? 0;
          const status = getNutrientStatus(value, sec.optimal);
          return (
            <div
              key={sec.key}
              className={`flex justify-between items-center p-1.5 rounded-md text-xs ${getStatusColor(status)}`}
            >
              <span>{sec.label}:</span>
              <div className="text-right">
                <span className="font-medium">{value.toFixed(1)} ppm</span>
                <div className="text-[0.65rem] opacity-70">
                  ({sec.optimal[0]}-{sec.optimal[1]})
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="bg-yellow-100 dark:bg-yellow-700/30 p-3 rounded-lg border border-yellow-300 dark:border-yellow-600 mt-3">
        <h3 className="font-medium text-yellow-800 dark:text-yellow-200 mb-1.5 text-sm">
          Nährstoff-Hinweise
        </h3>
        <ul className="text-xs text-yellow-700 dark:text-yellow-300 space-y-1 list-disc list-inside">
          <li>Weniger ist oft mehr, besonders bei Mikronährstoffen.</li>
          <li>Bei Mangelerscheinungen zuerst pH-Wert und Wurzelgesundheit prüfen.</li>
          <li>Fe-Mangel: junge Blätter hellgrün/gelb, Adern bleiben grün.</li>
          <li>Ca-Mangel: junge Blätter verformt, Blütenendfäule.</li>
        </ul>
      </div>
    </div>
  </div>
);

export default DetailsTab;
