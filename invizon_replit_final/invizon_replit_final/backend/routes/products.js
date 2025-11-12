const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  const { search = '', category, store, limit = 24, offset = 0 } = req.query;
  const where = [];
  const params = {};
  if (search) { where.push("(title LIKE @search OR description LIKE @search)"); params.search = `%${search}%`; }
  if (category) { where.push('category = @category'); params.category = category; }
  if (store) { where.push('store = @store'); params.store = store; }
  const whereSQL = where.length ? 'WHERE ' + where.join(' AND ') : '';
  const stmt = db.prepare(`SELECT * FROM products ${whereSQL} LIMIT @limit OFFSET @offset`);
  const rows = stmt.all({ ...params, limit: Number(limit), offset: Number(offset) });
  rows.forEach(r => { r.images = JSON.parse(r.images || '[]'); });
  res.json(rows);
});

router.get('/:id', (req, res) => {
  const stmt = db.prepare('SELECT * FROM products WHERE id = ?');
  const row = stmt.get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Not found' });
  row.images = JSON.parse(row.images || '[]');
  res.json(row);
});

module.exports = router;
