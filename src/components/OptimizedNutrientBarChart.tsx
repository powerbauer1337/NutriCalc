



import React, { memo, useMemo } from 'react';
import { useMemoizedCalculation } from '../utils/memoization';

const OptimizedNutrientBarChart = memo(({ nutrients, stage, fields }) => {
  const processedData = useMemoizedCalculation(() => {
    if (!nutrients || !stage || !fields) return [];

    return fields.map(field => {
      const value = nutrients[field.key] || 0;
      const min = stage[field.key]?.min || 0;
      const max = stage[field.key]?.max || 0;
      const target = (min + max) / 2;
      
      const percentage = max > 0 ? Math.min((value / max) * 100, 100) : 0;
      const isWithinRange = value >= min && value <= max;
      
      return {
        ...field,
        value,
        min,
        max,
        target,
        percentage,
        isWithinRange,
        status: isWithinRange ? 'optimal' : value < min ? 'low' : 'high'
      };
    });
  }, [nutrients, stage, fields]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'optimal': return 'bg-green-500';
      case 'low': return 'bg-yellow-500';
      case 'high': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusTextColor = (status) => {
    switch (status) {
      case 'optimal': return 'text-green-700 dark:text-green-300';
      case 'low': return 'text-yellow-700 dark:text-yellow-300';
      case 'high': return 'text-red-700 dark:text-red-300';
      default: return 'text-gray-700 dark:text-gray-300';
    }
  };

  if (!processedData.length) {
    return <div className="text-center py-8 text-slate-500">No data available</div>;
  }

  return (
    <div className="space-y-4">
      {processedData.map((item) => (
        <div key={item.key} className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {item.label}
            </span>
            <span className={`text-sm font-medium ${getStatusTextColor(item.status)}`}>
              {item.value.toFixed(1)} {item.unit}
              {item.min > 0 && item.max > 0 && (
                <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">
                  ({item.min}-{item.max} {item.unit})
                </span>
              )}
            </span>
          </div>
          
          <div className="relative w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${getStatusColor(item.status)}`}
              style={{ width: `${item.percentage}%` }}
            />
            {item.target > 0 && (
              <div
                className="absolute top-0 h-2 w-0.5 bg-slate-600 dark:bg-slate-400"
                style={{ left: `${(item.target / item.max) * 100}%` }}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
});

OptimizedNutrientBarChart.displayName = 'OptimizedNutrientBarChart';

export default OptimizedNutrientBarChart;



