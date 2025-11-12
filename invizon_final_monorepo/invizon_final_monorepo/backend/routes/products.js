const express = require('express');
const router = express.Router();
const db = require('../db');
router.get('/', (req, res) => {
  const { search = '' } = req.query;
  const where = search ? "WHERE title LIKE @search OR description LIKE @search" : '';
  const stmt = db.prepare(`SELECT * FROM products ${where} LIMIT 100`);
  const rows = stmt.all({ search: `%${search}%` });
  rows.forEach(r => r.images = JSON.parse(r.images || '[]'));
  res.json(rows);
});
router.get('/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Not found' });
  row.images = JSON.parse(row.images || '[]');
  res.json(row);
});
module.exports = router;
