import React, { useState, useEffect } from 'react';
import Button from './Button.jsx';

const STORAGE_KEY = 'nutricalc_watering_events';

const defaultForm = {
  id: null,
  date: '',
  time: '',
  amount: '',
  notes: '',
};

const WateringScheduler = () => {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState(defaultForm);
  const [editingId, setEditingId] = useState(null);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setEvents(JSON.parse(stored));
      } catch {}
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }, [events]);

  // Handle form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  // Add or update event
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.date || !form.time || !form.amount) return;
    const newEvent = {
      ...form,
      id: editingId || Date.now(),
    };
    if (editingId) {
      setEvents(evts => evts.map(ev => ev.id === editingId ? newEvent : ev));
    } else {
      setEvents(evts => [...evts, newEvent]);
    }
    setForm(defaultForm);
    setEditingId(null);
  };

  // Edit event
  const handleEdit = (id) => {
    const ev = events.find(e => e.id === id);
    if (ev) {
      setForm(ev);
      setEditingId(id);
    }
  };

  // Delete event
  const handleDelete = (id) => {
    setEvents(evts => evts.filter(ev => ev.id !== id));
    if (editingId === id) {
      setForm(defaultForm);
      setEditingId(null);
    }
  };

  // Sort events by date/time
  const sortedEvents = [...events].sort((a, b) => {
    const da = new Date(`${a.date}T${a.time}`);
    const db = new Date(`${b.date}T${b.time}`);
    return da - db;
  });

  // Today for min date
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="max-w-lg mx-auto p-4 bg-white dark:bg-slate-800 rounded-lg shadow space-y-6">
      <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">Gießplaner</h2>
      {/* Add/Edit Form */}
      <form onSubmit={handleSubmit} className="space-y-3 bg-slate-100 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block text-xs font-medium mb-0.5" htmlFor="date">Datum</label>
            <input type="date" id="date" name="date" min={today} value={form.date} onChange={handleChange} className="w-full px-2 py-1 border rounded-md dark:bg-slate-700 dark:text-slate-100 text-xs" required />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-medium mb-0.5" htmlFor="time">Uhrzeit</label>
            <input type="time" id="time" name="time" value={form.time} onChange={handleChange} className="w-full px-2 py-1 border rounded-md dark:bg-slate-700 dark:text-slate-100 text-xs" required />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium mb-0.5" htmlFor="amount">Menge (L)</label>
          <input type="number" id="amount" name="amount" min="0.1" step="0.1" value={form.amount} onChange={handleChange} className="w-full px-2 py-1 border rounded-md dark:bg-slate-700 dark:text-slate-100 text-xs" required />
        </div>
        <div>
          <label className="block text-xs font-medium mb-0.5" htmlFor="notes">Notizen</label>
          <input type="text" id="notes" name="notes" value={form.notes} onChange={handleChange} className="w-full px-2 py-1 border rounded-md dark:bg-slate-700 dark:text-slate-100 text-xs" />
        </div>
        <div className="flex gap-2 justify-end">
          {editingId && <Button type="button" onClick={() => { setForm(defaultForm); setEditingId(null); }} variant="secondary">Abbrechen</Button>}
          <Button type="submit" variant="primary">{editingId ? 'Speichern' : 'Hinzufügen'}</Button>
        </div>
      </form>
      {/* Event List */}
      <div>
        <h3 className="font-semibold mb-2">Geplante Gießtermine</h3>
        {sortedEvents.length === 0 && <div className="text-slate-500">Noch keine Gießtermine.</div>}
        <ul className="space-y-2">
          {sortedEvents.map(ev => (
            <li key={ev.id} className="flex items-center gap-2 p-2 bg-slate-100 dark:bg-slate-700 rounded">
              <div className="flex-1">
                <div className="font-medium text-sm">{ev.date} {ev.time} - {ev.amount} L</div>
                {ev.notes && <div className="text-xs text-slate-500">{ev.notes}</div>}
              </div>
              <Button onClick={() => handleEdit(ev.id)} variant="secondary" className="text-xs">Bearbeiten</Button>
              <Button onClick={() => handleDelete(ev.id)} variant="danger" className="text-xs">Löschen</Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WateringScheduler; 