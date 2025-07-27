import React from 'react';
import { useWater } from '../contexts/WaterContext';
import { NUTRIENT_FIELDS } from '../constants';
import useAppSettings from '../hooks/useAppSettings';
import Button from './Button';

// Interfaces moved to types/index.ts for better organization

const WaterInput: React.FC = React.memo(() => {
  const { waterSources, mixedWater, addWaterSource, removeWaterSource, updateWaterSource } =
    useWater();
  const { settings } = useAppSettings();

  const handleChange = (id: string, field: string, value: string) => {
    const numericValue = parseFloat(value);
    const safeValue = isNaN(numericValue) ? 0 : Math.max(0, numericValue);
    updateWaterSource(id, field, safeValue);
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-white">Wasserqualität & Mischung</h2>

      {waterSources.map((source) => (
        <div key={source.id} className="mb-4 p-3 border border-gray-700 rounded-md bg-gray-750">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-white">{source.name}</h3>
            {waterSources.length > 1 && (
              <Button
                onClick={() => removeWaterSource(source.id)}
                variant="danger"
                className="text-red-400 hover:text-red-500 font-bold py-1 px-2 text-xs"
                aria-label={`Wasserquelle ${source.name} entfernen`}
                title={`Wasserquelle ${source.name} entfernen`}
              >
                Entfernen
              </Button>
            )}
          </div>
          <h4 className="text-md font-semibold text-gray-200 mb-2">Basische Parameter</h4>
          <div className="grid grid-cols-2 gap-2 text-sm mb-4">
            <label className="block">
              <span className="text-gray-300">pH-Wert:</span>
              <input
                type="number"
                step="0.01"
                value={source.ph}
                onChange={(e) => handleChange(source.id, 'ph', e.target.value)}
                className="w-full px-2 py-1 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-slate-100 bg-white text-gray-900 mt-1 block"
              />
            </label>
            <label className="block">
              <span className="text-gray-300">EC (mS/cm):</span>
              <input
                type="number"
                step="0.01"
                value={source.ec}
                onChange={(e) => handleChange(source.id, 'ec', e.target.value)}
                className="w-full px-2 py-1 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-slate-100 bg-white text-gray-900 mt-1 block"
              />
            </label>
          </div>
          <h4 className="text-md font-semibold text-gray-200 mb-2">Mineralgehalt (mg/L)</h4>
          <div className="grid grid-cols-2 gap-2 text-sm mb-4">
            <label className="block">
              <span className="text-gray-300">Ca:</span>
              <input
                type="number"
                step="1"
                value={source.ca}
                onChange={(e) => handleChange(source.id, 'ca', e.target.value)}
                className="w-full px-2 py-1 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-slate-100 bg-white text-gray-900 mt-1 block"
              />
            </label>
            <label className="block">
              <span className="text-gray-300">Mg:</span>
              <input
                type="number"
                step="1"
                value={source.mg}
                onChange={(e) => handleChange(source.id, 'mg', e.target.value)}
                className="w-full px-2 py-1 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-slate-100 bg-white text-gray-900 mt-1 block"
              />
            </label>
            <label className="block">
              <span className="text-gray-300">Na:</span>
              <input
                type="number"
                step="1"
                value={source.na}
                onChange={(e) => handleChange(source.id, 'na', e.target.value)}
                className="w-full px-2 py-1 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-slate-100 bg-white text-gray-900 mt-1 block"
              />
            </label>
            {NUTRIENT_FIELDS.filter(
              (field) => !['n', 'p', 'k', 'ca', 'mg', 'na'].includes(field.key)
            ).map((field) => (
              <label key={field.key} className="block">
                <span className="text-gray-300">{field.label ? field.label.split(' ')[0] : field.key.toUpperCase()}:</span>
                <input
                  type="number"
                  step="0.001"
                  value={source[field.key as keyof typeof source] as number}
                  onChange={(e) => handleChange(source.id, field.key, e.target.value)}
                  className="w-full px-2 py-1 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-slate-100 bg-white text-gray-900 mt-1 block"
                />
              </label>
            ))}
            <label className="block">
              <span className="text-gray-300">
                Volumen ({settings.unit === 'liter' ? 'L' : 'Gal'}):
              </span>
              <input
                type="number"
                step="1"
                value={source.volume}
                onChange={(e) => handleChange(source.id, 'volume', e.target.value)}
                className="w-full px-2 py-1 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-slate-100 bg-white text-gray-900 mt-1 block"
              />
            </label>
          </div>
        </div>
      ))}

      <div className="flex justify-center space-x-2 mt-4">
        <Button
          onClick={() => addWaterSource('tapWater')}
          variant="primary"
          aria-label="Leitungswasser hinzufügen"
          title="Leitungswasser hinzufügen"
        >
          Leitungswasser hinzufügen
        </Button>
        <Button
          onClick={() => addWaterSource('roWater')}
          variant="primary"
          aria-label="Osmosewasser hinzufügen"
          title="Osmosewasser hinzufügen"
        >
          Osmosewasser hinzufügen
        </Button>
        <Button
          onClick={() => addWaterSource('custom')}
          variant="primary"
          aria-label="Eigene Quelle hinzufügen"
          title="Eigene Quelle hinzufügen"
        >
          Eigene Quelle hinzufügen
        </Button>
      </div>

      {mixedWater && (
        <div className="mt-6 p-4 bg-gray-700 rounded-md text-white">
          <h3 className="text-lg font-semibold mb-2">Zusammenfassung der Wasserwerte</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-600">
              <thead className="bg-gray-700">
                <tr>
                  <th className="py-2 px-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Quelle
                  </th>
                  <th className="py-2 px-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Volumen (L)
                  </th>
                  <th className="py-2 px-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    pH
                  </th>
                  <th className="py-2 px-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    EC (mS/cm)
                  </th>
                  {NUTRIENT_FIELDS.map((field) => (
                    <th
                      key={field.key}
                      className="py-2 px-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                    >
                      {field.label ? field.label.split(' ')[0] : field.key.toUpperCase()} ({field.key.toUpperCase()})
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {waterSources.map((source) => (
                  <tr key={source.id}>
                    <td className="py-2 px-4 whitespace-nowrap text-sm text-gray-200">
                      {source.name}
                    </td>
                    <td className="py-2 px-4 whitespace-nowrap text-sm text-gray-200">
                      {source.volume.toFixed(1)}
                    </td>
                    <td className="py-2 px-4 whitespace-nowrap text-sm text-gray-200">
                      {source.ph.toFixed(2)}
                    </td>
                    <td className="py-2 px-4 whitespace-nowrap text-sm text-gray-200">
                      {source.ec.toFixed(2)}
                    </td>
                    {NUTRIENT_FIELDS.map((field) => (
                      <td
                        key={field.key}
                        className="py-2 px-4 whitespace-nowrap text-sm text-gray-200"
                      >
                        {(source[field.key as keyof typeof source] as number || 0).toFixed(1)}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="bg-gray-600 font-bold">
                  <td className="py-2 px-4 whitespace-nowrap text-sm text-white">Gemischt</td>
                  <td className="py-2 px-4 whitespace-nowrap text-sm text-white">
                    {mixedWater.totalVolume.toFixed(1)} {settings.unit === 'liter' ? 'L' : 'Gal'}
                  </td>
                  <td className="py-2 px-4 whitespace-nowrap text-sm text-white">
                    {mixedWater.ph.toFixed(2)}
                  </td>
                  <td className="py-2 px-4 whitespace-nowrap text-sm text-white">
                    {mixedWater.ec.toFixed(2)}
                  </td>
                  {NUTRIENT_FIELDS.map((field) => (
                    <td key={field.key} className="py-2 px-4 whitespace-nowrap text-sm text-white">
                      {(mixedWater[field.key as keyof typeof mixedWater] as number || 0).toFixed(1)}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
});

WaterInput.displayName = 'WaterInput';

export default WaterInput;
