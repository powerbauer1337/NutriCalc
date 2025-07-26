import React from 'react';
import { getNutrientStatus, getStatusColor, getProgressBarWidth } from '../utils/nutrientUtils';

/**
 * NutrientBarChart - Visualizes nutrient values as horizontal bars with color coding.
 * @param {Object} props
 * @param {Object} props.nutrients - Nutrient values, e.g. { n: 120, p: 40, k: 180, ec: 1.8, ph: 6.2 }
 * @param {Object} props.stage - Growth stage object with optimal ranges, e.g. { n: [100, 150], ... }
 * @param {Array} props.fields - Array of { key, label, unit }
 */
const NutrientBarChart = ({ nutrients = {}, stage = {}, fields = [] }) => {
  return (
    <div className="space-y-3">
      {fields.map((field) => {
        const value = nutrients[field.key] ?? 0;
        const range = stage[field.key];
        const status = getNutrientStatus(value, range);
        const colorClass =
          status === 'optimal'
            ? 'bg-green-500'
            : status === 'suboptimal'
              ? 'bg-yellow-500'
              : 'bg-red-500';
        const barBg = 'bg-slate-200 dark:bg-slate-700';
        const width = getProgressBarWidth(value, range);
        return (
          <div key={field.key} className="flex flex-col gap-1">
            <div className="flex justify-between items-center text-xs font-medium">
              <span>{field.label}</span>
              <span>
                {value}
                {field.unit ? ` ${field.unit}` : ''}
                {range ? (
                  <span className="ml-2 text-slate-500 dark:text-slate-400 text-xs">
                    ({range[0]}–{range[1]})
                  </span>
                ) : null}
              </span>
            </div>
            <div
              className={`relative w-full h-4 rounded ${barBg}`}
              aria-label={`${field.label} Wert: ${value}`}
            >
              <div
                className={`absolute left-0 top-0 h-4 rounded ${colorClass}`}
                style={{
                  width: `${width}%`,
                  minWidth: width > 0 ? '0.5rem' : 0,
                  transition: 'width 0.3s',
                }}
                aria-valuenow={value}
                aria-valuemin={range ? range[0] : 0}
                aria-valuemax={range ? range[1] * 1.2 : 100}
                role="progressbar"
              />
              {/* Range marker */}
              {range && (
                <div
                  className="absolute top-0 h-4 border-l-2 border-blue-500 opacity-60"
                  style={{ left: `${getProgressBarWidth(range[0], range)}%` }}
                  aria-hidden="true"
                />
              )}
              {range && (
                <div
                  className="absolute top-0 h-4 border-l-2 border-blue-500 opacity-60"
                  style={{ left: `${getProgressBarWidth(range[1], range)}%` }}
                  aria-hidden="true"
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NutrientBarChart;
