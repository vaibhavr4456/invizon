const path = require('path');
const Database = require('better-sqlite3');
const dbPath = path.join(__dirname, 'invizon.db');
const db = new Database(dbPath);

db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  username TEXT,
  email TEXT UNIQUE,
  password_hash TEXT
);

CREATE TABLE IF NOT EXISTS addresses (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  name TEXT,
  street TEXT,
  city TEXT,
  state TEXT,
  zip TEXT,
  phone TEXT
);

CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  title TEXT,
  description TEXT,
  price REAL,
  currency TEXT,
  images TEXT,
  category TEXT,
  store TEXT,
  external_url TEXT,
  checkout_url TEXT,
  rating REAL
);

CREATE TABLE IF NOT EXISTS cart (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  product_id TEXT,
  qty INTEGER
);
`);

module.exports = db;
