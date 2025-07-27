import React, { memo, useCallback } from 'react';

interface BasicSetupControlsProps {
  waterVolume: number;
  growthStage: string;
  waterType: string;
  customWaterProfile: Record<string, number>;
  GROWTH_STAGES: Record<string, unknown>;
  WATER_TYPES: Record<string, unknown>;
  onWaterVolumeChange: (volume: number) => void;
  onGrowthStageChange: (stage: string) => void;
  onWaterTypeChange: (type: string) => void;
  onCustomWaterProfileChange: (profile: Record<string, number>) => void;
}

const BasicSetupControls: React.FC<BasicSetupControlsProps> = memo(({
  waterVolume,
  growthStage,
  waterType,
  customWaterProfile,
  GROWTH_STAGES,
  WATER_TYPES,
  onWaterVolumeChange,
  onGrowthStageChange,
  onWaterTypeChange,
  onCustomWaterProfileChange,
}) => {
  const handleWaterVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value > 0) {
      onWaterVolumeChange(value);
    }
  }, [onWaterVolumeChange]);

  const handleCustomWaterChange = useCallback((field: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    onCustomWaterProfileChange({
      ...customWaterProfile,
      [field]: Math.max(0, numValue),
    });
  }, [customWaterProfile, onCustomWaterProfileChange]);

  return (
    <div className="space-y-4">
      {/* Water Volume */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Wassermenge (Liter)
        </label>
        <input
          type="number"
          min="0.1"
          step="0.1"
          value={waterVolume}
          onChange={handleWaterVolumeChange}
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-slate-100"
          aria-label="Wassermenge in Litern"
        />
      </div>

      {/* Growth Stage */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Wachstumsphase
        </label>
        <select
          value={growthStage}
          onChange={(e) => onGrowthStageChange(e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-slate-100"
          aria-label="Wachstumsphase auswählen"
        >
          {Object.entries(GROWTH_STAGES).map(([key, stage]) => (
            <option key={key} value={key}>
              {(stage as { name: string }).name}
            </option>
          ))}
        </select>
      </div>

      {/* Water Type */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Wassertyp
        </label>
        <select
          value={waterType}
          onChange={(e) => onWaterTypeChange(e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-slate-100"
          aria-label="Wassertyp auswählen"
        >
          {Object.entries(WATER_TYPES).map(([key, water]) => (
            <option key={key} value={key}>
              {(water as { name: string }).name}
            </option>
          ))}
        </select>
      </div>

      {/* Custom Water Profile */}
      {waterType === 'custom' && (
        <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-md">
          <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
            Benutzerdefiniertes Wasserprofil
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {[
              { key: 'ca', label: 'Ca (ppm)', step: '0.1' },
              { key: 'mg', label: 'Mg (ppm)', step: '0.1' },
              { key: 's', label: 'S (ppm)', step: '0.1' },
              { key: 'baseEC', label: 'Basis-EC (mS/cm)', step: '0.01' },
            ].map((field) => (
              <div key={field.key}>
                <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">
                  {field.label}
                </label>
                <input
                  type="number"
                  min="0"
                  step={field.step}
                  value={customWaterProfile[field.key] || 0}
                  onChange={(e) => handleCustomWaterChange(field.key, e.target.value)}
                  className="w-full px-2 py-1 text-sm border border-slate-300 dark:border-slate-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-slate-700 dark:text-slate-100"
                  aria-label={field.label}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

export default BasicSetupControls;
