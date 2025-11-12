const express = require('express');
const router = express.Router();
const db = require('../db');
const { nanoid } = require('nanoid');
const { auth } = require('./auth');
router.get('/', auth, (req, res) => { const rows = db.prepare('SELECT * FROM addresses WHERE user_id = ?').all(req.user.id); res.json(rows); });
router.post('/', auth, (req, res) => { const { name, street, city, state, zip, phone } = req.body; const id = nanoid(); db.prepare('INSERT INTO addresses (id, user_id, name, street, city, state, zip, phone) VALUES (?,?,?,?,?,?,?,?)').run(id, req.user.id, name, street, city, state, zip, phone); res.json({ id, name, street, city, state, zip, phone }); });
router.delete('/:id', auth, (req, res) => { db.prepare('DELETE FROM addresses WHERE id = ? AND user_id = ?').run(req.params.id, req.user.id); res.json({ success: true }); });
module.exports = router;
