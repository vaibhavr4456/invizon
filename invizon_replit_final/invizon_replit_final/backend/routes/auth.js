const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { nanoid } = require('nanoid');

const JWT_SECRET = process.env.JWT_SECRET || 'invizon_dev_secret';

router.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'email & password required' });
  const exists = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (exists) return res.status(400).json({ error: 'Email already in use' });
  const hash = bcrypt.hashSync(password, 8);
  const id = nanoid();
  db.prepare('INSERT INTO users (id, username, email, password_hash) VALUES (?,?,?,?)').run(id, username||email.split('@')[0], email, hash);
  const token = jwt.sign({ id, email }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { id, username: username||email.split('@')[0], email } });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'email & password required' });
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (!user) return res.status(400).json({ error: 'Invalid credentials' });
  const ok = bcrypt.compareSync(password, user.password_hash);
  if (!ok) return res.status(400).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
});

function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Missing token' });
  const token = authHeader.split(' ')[1];
  try { const data = jwt.verify(token, JWT_SECRET); req.user = data; next(); } catch (e) { return res.status(401).json({ error: 'Invalid token' }); }
}

router.get('/me', auth, (req, res) => {
  const user = db.prepare('SELECT id, username, email FROM users WHERE id = ?').get(req.user.id);
  res.json(user);
});

module.exports = { router, auth };
