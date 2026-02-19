import { useEffect, useState } from 'react';

const API_URL = 'http://localhost:3001/guestbook';

export default function App() {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ name: '', message: '' });
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', message: '' });

  const load = async () => {
    const res = await fetch(API_URL);
    setEntries(await res.json());
  };

  useEffect(() => { load(); }, []);

  const save = async (e) => {
    e.preventDefault();
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setForm({ name: '', message: '' });
    load();
  };

  const remove = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    load();
  };

  const startEdit = (entry) => {
    setEditId(entry.id);
    setEditForm({ name: entry.name, message: entry.message });
  };

  const saveEdit = async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm),
    });
    setEditId(null);
    load();
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '2rem' }}>
      <h1>My Profile & Guestbook</h1>
      <p>Welcome to my personal profile! Feel free to sign my guestbook below.</p>
      <hr />
      <h2>Sign the Guestbook</h2>
      <form onSubmit={save}>
        <div>
          <input
            placeholder="Your Name"
            value={form.name}
            onChange={e => setForm({...form, name: e.target.value})}
            required
            style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
          />
        </div>
        <div>
          <textarea
            placeholder="Your Message"
            value={form.message}
            onChange={e => setForm({...form, message: e.target.value})}
            required
            style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
          />
        </div>
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>Sign Guestbook</button>
      </form>
      <hr />
      <h2>Guestbook Entries</h2>
      {entries.length === 0 && <p>No entries yet. Be the first to sign!</p>}
      {entries.map(entry => (
        <div key={entry.id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem', borderRadius: '8px' }}>
          {editId === entry.id ? (
            <div>
              <input
                value={editForm.name}
                onChange={e => setEditForm({...editForm, name: e.target.value})}
                style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
              />
              <textarea
                value={editForm.message}
                onChange={e => setEditForm({...editForm, message: e.target.value})}
                style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
              />
              <button onClick={() => saveEdit(entry.id)} style={{ marginRight: '0.5rem' }}>Save</button>
              <button onClick={() => setEditId(null)}>Cancel</button>
            </div>
          ) : (
            <div>
              <p><strong>{entry.name}</strong>: {entry.message}</p>
              <button onClick={() => startEdit(entry)} style={{ marginRight: '0.5rem' }}>Edit</button>
              <button onClick={() => remove(entry.id)}>Delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}