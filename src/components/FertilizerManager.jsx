import React from 'react';

const FertilizerManager = ({
  selectedFertilizers,
  fertilizerDatabase,
  waterVolume,
  addFertilizer,
  removeFertilizer,
  updateFertilizerAmount,
  toggleFertilizer,
}) => (
  <div className="space-y-2 max-h-[400px] lg:max-h-[calc(100vh-350px)] overflow-y-auto p-0.5">
    {(selectedFertilizers || []).map(fert => {
      const fertData = fertilizerDatabase[fert.id];
      if (!fertData) return null;
      return (
        <div key={fert.id} className={`p-2 border rounded-md ${fert.active ? 'bg-white dark:bg-slate-800 border-blue-300 dark:border-blue-600' : 'bg-slate-100 dark:bg-slate-900/50 border-slate-300 dark:border-slate-700'}`}>
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5">
              <input type="checkbox" id={`fertActive-${fert.id}`} checked={fert.active} onChange={() => toggleFertilizer(fert.id)} className="w-3.5 h-3.5 text-blue-600 dark:text-blue-500 border-slate-300 dark:border-slate-600 rounded focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-slate-700" aria-label={`Aktivieren ${fertData.name}`} />
              <div>
                <label htmlFor={`fertActive-${fert.id}`} className="text-xs font-medium text-slate-700 dark:text-slate-200 cursor-pointer">{fertData.name}
                  {fert.id && fert.id.startsWith('custom_') && (
                    <span className="ml-1 px-1 py-0.5 text-[10px] bg-yellow-200 dark:bg-yellow-700 text-yellow-800 dark:text-yellow-100 rounded align-middle">Custom</span>
                  )}
                </label>
              </div>
            </div>
            <button onClick={() => removeFertilizer(fert.id)} className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-0.5 focus:outline-none focus:ring-2 focus:ring-red-500" title="Entfernen" aria-label={`Entfernen ${fertData.name}`}>×</button>
          </div>
          <div className="flex items-center gap-1.5">
            <input
              type="number"
              value={fert.amount}
              onChange={(e) => updateFertilizerAmount(fert.id, e.target.value)}
              disabled={!fert.active}
              className="flex-1 px-2 py-1 border rounded-md text-xs disabled:opacity-60 dark:bg-slate-700 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              step={fertData.type === 'powder' ? '0.01' : '0.1'}
              aria-label={`Menge für ${fertData.name}`}
            />
            <span className="text-xs text-slate-500 dark:text-slate-400 min-w-fit">{fertData.unit}/{waterVolume > 0 ? waterVolume : 1}L</span>
          </div>
        </div>
      );
    })}
    <div className="border-t border-slate-300 dark:border-slate-700 pt-2 mt-2">
      <select onChange={(e) => addFertilizer(e.target.value)} className="w-full px-2 py-1 border rounded-md text-xs dark:bg-slate-700 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500" value="" aria-label="Dünger hinzufügen">
        <option value="">Dünger hinzufügen...</option>
        {Object.entries(fertilizerDatabase).sort(([, a], [, b]) => a.name.localeCompare(b.name)).map(([key, fert]) => (
          <option key={key} value={key} disabled={(selectedFertilizers || []).some(f => f.id === key)}>
            {fert.name}
            {key.startsWith('custom_') ? ' (Custom)' : ''}
          </option>
        ))}
      </select>
    </div>
  </div>
);

export default FertilizerManager; 