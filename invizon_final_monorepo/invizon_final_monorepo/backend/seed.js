const db = require('./db');
const { nanoid } = require('nanoid');
const bcrypt = require('bcryptjs');

const exists = db.prepare('SELECT count(*) as c FROM products').get();
if (exists.c > 0) { console.log('Seed exists'); process.exit(0); }

const passwordHash = bcrypt.hashSync('password123', 8);
db.prepare('INSERT INTO users (id, username, email, password_hash) VALUES (?,?,?,?)').run(nanoid(), 'demo', 'demo@invizon.test', passwordHash);

const products = [
  { title: 'iPhone 15 Pro Max', description: 'Apple iPhone 15 Pro Max 128GB', price: 139999, currency: 'INR', images: JSON.stringify(['https://m.media-amazon.com/images/I/81fxjeu8fdL._SL1500_.jpg']), category: 'Electronics', store: 'Amazon', external_url: 'https://www.amazon.in/dp/B0CHXSSV31', checkout_url: '', rating: 4.7 },
  { title: 'Nike Air Force 1', description: 'Nike Air Force 1 Shoes', price: 9999, currency: 'INR', images: JSON.stringify(['https://rukminim2.flixcart.com/image/832/832/xif0q/shoe.jpg']), category: 'Fashion', store: 'Flipkart', external_url: 'https://www.flipkart.com', checkout_url: '', rating: 4.3 },
  { title: "Levi's Denim Jacket", description: 'Levi\'s denim jacket', price: 3499, currency: 'INR', images: JSON.stringify(['https://myntra.com/media/product.jpg']), category: 'Fashion', store: 'Myntra', external_url: 'https://www.myntra.com', checkout_url: '', rating: 4.4 },
  { title: 'Amul Milk 1L', description: 'Fresh milk 1L', price: 60, currency: 'INR', images: JSON.stringify(['https://images.zepto.com/amul-milk.jpg']), category: 'Grocery', store: 'Zepto', external_url: 'https://www.zepto.com', checkout_url: '', rating: 4.1 },
  { title: 'Dairy Milk Silk', description: 'Cadbury Dairy Milk Silk', price: 169, currency: 'INR', images: JSON.stringify(['https://blinkit.example/dairymilk.jpg']), category: 'Grocery', store: 'Blinkit', external_url: 'https://www.blinkit.com', checkout_url: '', rating: 4.2 }
];

const insert = db.prepare('INSERT INTO products (id, title, description, price, currency, images, category, store, external_url, checkout_url, rating) VALUES (@id,@title,@description,@price,@currency,@images,@category,@store,@external_url,@checkout_url,@rating)');
for (const p of products) { insert.run({ id: nanoid(), ...p }); }
console.log('Seed done. demo@invizon.test / password123');
