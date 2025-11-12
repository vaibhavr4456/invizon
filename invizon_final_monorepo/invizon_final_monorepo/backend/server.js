const express = require('express');
const cors = require('cors');
const path = require('path');
const { router: authRouter } = require('./routes/auth');
const productsRouter = require('./routes/products');
const addressesRouter = require('./routes/addresses');
const cartRouter = require('./routes/cart');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/products', productsRouter);
app.use('/api/addresses', addressesRouter);
app.use('/api/cart', cartRouter);

// static serve frontend build if present
app.use('/assets', express.static(path.join(__dirname, '..', 'frontend', 'public', 'assets')));
app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log('Invizon backend running on', PORT));
