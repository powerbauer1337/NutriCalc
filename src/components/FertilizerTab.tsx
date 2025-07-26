









import React, { useState, useEffect } from 'react';
import { LOCAL_STORAGE_KEY_CUSTOM_FERTILIZERS } from '../constants';
import { useToasts } from '../contexts/ToastContext';
import Button from './Button';

interface FertilizerComposition {
  n: string;
  p: string;
  k: string;
}

interface FertilizerForm {
  name: string;
  type: 'liquid' | 'powder';
  unit: 'ml' | 'g' | '%';
  composition: FertilizerComposition;
  concentration: string;
  description: string;
}

interface CustomFertilizer extends FertilizerForm {
  id: string;
  composition: {
    n: string;
    p: string;
    k: string;
  };
}

interface FertilizerTabProps {
  refreshFertilizerDatabase?: () => void;
}

const defaultFertilizer: FertilizerForm = {
  name: '',
  type: 'liquid',
  unit: 'ml',
  composition: { n: '', p: '', k: '' },
  concentration: '',
  description: '',
};

const generateCustomFertilizerId = (name: string): string => 
  `custom_${name.replace(/\s+/g, '_').toLowerCase()}_${Date.now()}`;

const FertilizerTab: React.FC<FertilizerTabProps> = ({ refreshFertilizerDatabase }) => {
  const [fertilizers, setFertilizers] = useState<CustomFertilizer[]>([]);
  const [form, setForm] = useState<FertilizerForm>(defaultFertilizer);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { addToast } = useToasts();

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY_CUSTOM_FERTILIZERS);
    if (stored) setFertilizers(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_CUSTOM_FERTILIZERS, JSON.stringify(fertilizers));
    if (refreshFertilizerDatabase) refreshFertilizerDatabase();
  }, [fertilizers, refreshFertilizerDatabase]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (['n', 'p', 'k'].includes(name)) {
      setForm({ ...form, composition: { ...form.composition, [name]: value } });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedForm = {
      ...form,
      composition: Object.fromEntries(
        Object.entries(form.composition).map(([k, v]) => [k.toLowerCase(), v])
      ),
    };
    if (editingId !== null) {
      setFertilizers(fertilizers.map(f => 
        f.id === editingId ? { ...normalizedForm, id: editingId } as CustomFertilizer : f
      ));
      setEditingId(null);
      addToast('Dünger erfolgreich bearbeitet!', 'success');
    } else {
      const id = generateCustomFertilizerId(form.name);
      setFertilizers([...fertilizers, { ...normalizedForm, id } as CustomFertilizer]);
      addToast('Dünger hinzugefügt!', 'success');
    }
    setForm(defaultFertilizer);
  };

  const handleEdit = (id: string) => {
    const fert = fertilizers.find(f => f.id === id);
    if (fert) {
      setForm({
        name: fert.name,
        type: fert.type,
        unit: fert.unit,
        composition: {
          n: fert.composition.n || '',
          p: fert.composition.p || '',
          k: fert.composition.k || '',
        },
        concentration: fert.concentration || '',
        description: fert.description || '',
      });
      setEditingId(id);
    }
  };

  const handleDelete = (id: string) => {
    setFertilizers(fertilizers.filter(f => f.id !== id));
    if (editingId === id) {
      setForm(defaultFertilizer);
      setEditingId(null);
    }
    addToast('Dünger gelöscht!', 'info');
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white dark:bg-slate-800 rounded-lg shadow space-y-6">
      <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">Dünger verwalten</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            className="flex-1 px-2 py-1 border rounded-md dark:bg-slate-700 dark:text-slate-100"
            required
          />
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="px-2 py-1 border rounded-md dark:bg-slate-700 dark:text-slate-100"
          >
            <option value="liquid">Flüssig</option>
            <option value="powder">Pulver</option>
          </select>
          <select
            name="unit"
            value={form.unit}
            onChange={handleChange}
            className="px-2 py-1 border rounded-md dark:bg-slate-700 dark:text-slate-100"
          >
            <option value="ml">ml</option>
            <option value="g">g</option>
            <option value="%">%</option>
          </select>
        </div>
        <div className="flex gap-2">
          <input
            name="n"
            value={form.composition.n}
            onChange={handleChange}
            placeholder="N (%)"
            type="number"
            min="0"
            step="0.01"
            className="w-1/3 px-2 py-1 border rounded-md dark:bg-slate-700 dark:text-slate-100"
            required
          />
          <input
            name="p"
            value={form.composition.p}
            onChange={handleChange}
            placeholder="P (%)"
            type="number"
            min="0"
            step="0.01"
            className="w-1/3 px-2 py-1 border rounded-md dark:bg-slate-700 dark:text-slate-100"
            required
          />
          <input
            name="k"
            value={form.composition.k}
            onChange={handleChange}
            placeholder="K (%)"
            type="number"
            min="0"
            step="0.01"
            className="w-1/3 px-2 py-1 border rounded-md dark:bg-slate-700 dark:text-slate-100"
            required
          />
        </div>
        <input
          name="concentration"
          value={form.concentration}
          onChange={handleChange}
          placeholder="Konzentration (g/L oder %)"
          type="number"
          min="0"
          step="0.01"
          className="w-full px-2 py-1 border rounded-md dark:bg-slate-700 dark:text-slate-100"
          required
        />
        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Beschreibung (optional)"
          className="w-full px-2 py-1 border rounded-md dark:bg-slate-700 dark:text-slate-100"
        />
        <Button type="submit" variant="primary" aria-label={editingId !== null ? 'Dünger speichern' : 'Dünger hinzufügen'} title={editingId !== null ? 'Dünger speichern' : 'Dünger hinzufügen'}>
          {editingId !== null ? 'Speichern' : 'Hinzufügen'}
        </Button>
        {editingId !== null && (
          <Button type="button" onClick={() => { setForm(defaultFertilizer); setEditingId(null); }} variant="secondary" className="ml-2" aria-label="Bearbeitung abbrechen" title="Bearbeitung abbrechen">
            Abbrechen
          </Button>
        )}
      </form>
      <div>
        <h3 className="font-semibold mb-2">Eigene Dünger</h3>
        <ul className="space-y-2">
          {fertilizers.length === 0 && <li className="text-slate-500">Noch keine Dünger hinzugefügt.</li>}
          {fertilizers.map((fert) => (
            <li key={fert.id} className="flex items-center gap-2 p-2 bg-slate-100 dark:bg-slate-700 rounded">
              <div className="flex-1">
                <div className="font-medium">{fert.name} <span className="text-xs text-slate-500">({fert.type})</span></div>
                <div className="text-xs">N: {fert.composition.n}% , P: {fert.composition.p}% , K: {fert.composition.k}% | Konzentration: {fert.concentration}</div>
              </div>
              <Button onClick={() => handleEdit(fert.id)} variant="secondary" aria-label={`Dünger ${fert.name} bearbeiten`} title={`Dünger ${fert.name} bearbeiten`} className="text-xs">Bearbeiten</Button>
              <Button onClick={() => handleDelete(fert.id)} variant="danger" aria-label={`Dünger ${fert.name} löschen`} title={`Dünger ${fert.name} löschen`} className="text-xs">Löschen</Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FertilizerTab;








