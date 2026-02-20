const express = require('express');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

app.get('/guestbook', async (req, res) => {
  const { data, error } = await supabase.from('guestbook').select('*').order('created_at', { ascending: false });
  if (error) return res.status(500).json(error);
  res.json(data);
});

app.post('/guestbook', async (req, res) => {
  const { name, message } = req.body;
  const { data, error } = await supabase.from('guestbook').insert([{ name, message }]).select();
  if (error) return res.status(500).json(error);
  res.json(data);
});

app.put('/guestbook/:id', async (req, res) => {
  const { id } = req.params;
  const { name, message } = req.body;
  const { data, error } = await supabase.from('guestbook').update({ name, message }).eq('id', id).select();
  if (error) return res.status(500).json(error);
  res.json(data);
});

app.delete('/guestbook/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('guestbook').delete().eq('id', id);
  if (error) return res.status(500).json(error);
  res.json({ success: true });
});

module.exports = app;