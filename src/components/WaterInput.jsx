import React from 'react';
import { useWater } from '../contexts/WaterContext';

const WaterInput = () => {
  const { waterSources, mixedWater, addWaterSource, removeWaterSource, updateWaterSource } = useWater();

  const handleChange = (id, field, value) => {
    updateWaterSource(id, field, parseFloat(value));
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-white">Wasserqualität & Mischung</h2>

      {waterSources.map(source => (
        <div key={source.id} className="mb-4 p-3 border border-gray-700 rounded-md bg-gray-750">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-white">{source.name}</h3>
            {waterSources.length > 1 && (
              <button
                onClick={() => removeWaterSource(source.id)}
                className="text-red-400 hover:text-red-500 font-bold"
              >
                Entfernen
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <label className="block">
              <span className="text-gray-300">pH-Wert:</span>
              <input
                type="number"
                step="0.01"
                value={source.ph}
                onChange={(e) => handleChange(source.id, 'ph', e.target.value)}
                className="mt-1 block w-full rounded-md bg-gray-900 border-transparent focus:border-gray-500 focus:bg-gray-800 focus:ring-0 text-white"
              />
            </label>
            <label className="block">
              <span className="text-gray-300">EC (mS/cm):</span>
              <input
                type="number"
                step="0.01"
                value={source.ec}
                onChange={(e) => handleChange(source.id, 'ec', e.target.value)}
                className="mt-1 block w-full rounded-md bg-gray-900 border-transparent focus:border-gray-500 focus:bg-gray-800 focus:ring-0 text-white"
              />
            </label>
            <label className="block">
              <span className="text-gray-300">Ca (mg/L):</span>
              <input
                type="number"
                step="1"
                value={source.ca}
                onChange={(e) => handleChange(source.id, 'ca', e.target.value)}
                className="mt-1 block w-full rounded-md bg-gray-900 border-transparent focus:border-gray-500 focus:bg-gray-800 focus:ring-0 text-white"
              />
            </label>
            <label className="block">
              <span className="text-gray-300">Mg (mg/L):</span>
              <input
                type="number"
                step="1"
                value={source.mg}
                onChange={(e) => handleChange(source.id, 'mg', e.target.value)}
                className="mt-1 block w-full rounded-md bg-gray-900 border-transparent focus:border-gray-500 focus:bg-gray-800 focus:ring-0 text-white"
              />
            </label>
            <label className="block">
              <span className="text-gray-300">Na (mg/L):</span>
              <input
                type="number"
                step="1"
                value={source.na}
                onChange={(e) => handleChange(source.id, 'na', e.target.value)}
                className="mt-1 block w-full rounded-md bg-gray-900 border-transparent focus:border-gray-500 focus:bg-gray-800 focus:ring-0 text-white"
              />
            </label>
            <label className="block">
              <span className="text-gray-300">Volumen (L):</span>
              <input
                type="number"
                step="1"
                value={source.volume}
                onChange={(e) => handleChange(source.id, 'volume', e.target.value)}
                className="mt-1 block w-full rounded-md bg-gray-900 border-transparent focus:border-gray-500 focus:bg-gray-800 focus:ring-0 text-white"
              />
            </label>
          </div>
        </div>
      ))}

      <div className="flex justify-center space-x-2 mt-4">
        <button
          onClick={() => addWaterSource('tapWater')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
        >
          Leitungswasser hinzufügen
        </button>
        <button
          onClick={() => addWaterSource('roWater')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
        >
          Osmosewasser hinzufügen
        </button>
        <button
          onClick={() => addWaterSource('custom')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
        >
          Eigene Quelle hinzufügen
        </button>
      </div>

      {mixedWater && ()
        <div className="mt-6 p-4 bg-gray-700 rounded-md text-white">
          <h3 className="text-lg font-semibold mb-2">Gemischtes Wasser Ergebnis:</h3>
          <p>pH: {mixedWater.ph.toFixed(2)}</p>
          <p>EC: {mixedWater.ec.toFixed(2)} mS/cm</p>
          <p>Ca: {mixedWater.ca.toFixed(1)} mg/L</p>
          <p>Mg: {mixedWater.mg.toFixed(1)} mg/L</p>
          <p>Na: {mixedWater.na.toFixed(1)} mg/L</p>
          <p>Gesamtvolumen: {mixedWater.totalVolume.toFixed(1)} L</p>
        </div>
      )}
    </div>
  );
};

export default WaterInput; 