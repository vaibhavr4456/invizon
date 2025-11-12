const express = require('express');
const router = express.Router();
const db = require('../db');
const { nanoid } = require('nanoid');
const { auth } = require('./auth');

router.get('/', auth, (req, res) => {
  const rows = db.prepare('SELECT c.id, c.product_id, c.qty, p.title, p.price, p.currency, p.store, p.images, p.external_url, p.checkout_url FROM cart c LEFT JOIN products p ON p.id = c.product_id WHERE c.user_id = ?').all(req.user.id);
  rows.forEach(r => r.images = JSON.parse(r.images || '[]'));
  res.json(rows);
});

router.post('/', auth, (req, res) => {
  const { product_id, qty = 1 } = req.body;
  if (!product_id) return res.status(400).json({ error: 'product_id required' });
  const existing = db.prepare('SELECT * FROM cart WHERE user_id = ? AND product_id = ?').get(req.user.id, product_id);
  if (existing) {
    db.prepare('UPDATE cart SET qty = qty + ? WHERE id = ?').run(qty, existing.id);
  } else {
    db.prepare('INSERT INTO cart (id, user_id, product_id, qty) VALUES (?,?,?,?)').run(nanoid(), req.user.id, product_id, qty);
  }
  const rows = db.prepare('SELECT c.id, c.product_id, c.qty, p.title, p.price, p.currency, p.store, p.images, p.external_url, p.checkout_url FROM cart c LEFT JOIN products p ON p.id = c.product_id WHERE c.user_id = ?').all(req.user.id);
  rows.forEach(r => r.images = JSON.parse(r.images || '[]'));
  res.json(rows);
});

router.delete('/:id', auth, (req, res) => {
  db.prepare('DELETE FROM cart WHERE id = ? AND user_id = ?').run(req.params.id, req.user.id);
  res.json({ success: true });
});

router.delete('/', auth, (req, res) => {
  db.prepare('DELETE FROM cart WHERE user_id = ?').run(req.user.id);
  res.json({ success: true });
});

module.exports = router;
