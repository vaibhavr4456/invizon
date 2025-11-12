const db = require('./db');
const { nanoid } = require('nanoid');
const bcrypt = require('bcryptjs');

const exists = db.prepare('SELECT count(*) as c FROM products').get();
if (exists.c > 0) {
  console.log('DB already seeded');
  process.exit(0);
}

// demo user
const passwordHash = bcrypt.hashSync('password123', 8);
db.prepare('INSERT INTO users (id, username, email, password_hash) VALUES (?,?,?,?)').run(nanoid(), 'demo', 'demo@invizon.test', passwordHash);

const products = [
  { title: 'iPhone 15 Pro Max - Amazon', description: 'Apple iPhone 15 Pro Max (128GB) - Demo listing', price: 139999, currency: 'INR', images: JSON.stringify(['https://m.media-amazon.com/images/I/81fxjeu8fdL._SL1500_.jpg']), category: 'Electronics', store: 'Amazon', external_url: 'https://www.amazon.in/dp/B0CHXSSV31', checkout_url: 'https://amazon.example/checkout?mock=1', rating: 4.7 },
  { title: 'Adidas Running Shoes - Flipkart', description: 'Adidas edge running shoes - Demo', price: 3999, currency: 'INR', images: JSON.stringify(['https://rukminim1.flixcart.com/image/350/350/k9b7jbk0/shoe/g/x/7/100004379-adidas-black-original-imafqyq5fz9xqg9w.jpeg']), category: 'Fashion', store: 'Flipkart', external_url: 'https://www.flipkart.com/item/AD123', checkout_url: 'https://flipkart.example/checkout?mock=1', rating: 4.3 },
  { title: 'Amul Milk 1L - Zepto', description: 'Amul toned milk 1 litre - Demo', price: 60, currency: 'INR', images: JSON.stringify(['https://images.zepto.com/amul-milk.jpg']), category: 'Grocery', store: 'Zepto', external_url: 'https://www.zepto.com/product/amul-milk', checkout_url: 'https://zepto.example/checkout?mock=1', rating: 4.1 },
  { title: 'Ethnic Kurti Set - Meesho', description: 'Women Kurti set - Demo', price: 899, currency: 'INR', images: JSON.stringify(['https://images.meesho.com/kurti.jpg']), category: 'Fashion', store: 'Meesho', external_url: 'https://www.meesho.com/product/kurti', checkout_url: 'https://meesho.example/checkout?mock=1', rating: 4.0 },
  { title: 'Tropicana Juice Pack - Blinkit', description: 'Tropicana juice 1L pack - Demo', price: 220, currency: 'INR', images: JSON.stringify(['https://blinkit.example/tropicana.jpg']), category: 'Grocery', store: 'Blinkit', external_url: 'https://www.blinkit.com/product/tropicana', checkout_url: 'https://blinkit.example/checkout?mock=1', rating: 4.2 },
  { title: 'Levi\'s Slim Fit Jeans - Myntra', description: 'Levi\'s slim fit - Demo', price: 2499, currency: 'INR', images: JSON.stringify(['https://myntra.example/levis.jpg']), category: 'Fashion', store: 'Myntra', external_url: 'https://www.myntra.com/product/levis-jeans', checkout_url: 'https://myntra.example/checkout?mock=1', rating: 4.4 },
  { title: 'Maybelline Lipstick - Nykaa', description: 'Maybelline color show - Demo', price: 799, currency: 'INR', images: JSON.stringify(['https://images.nykaa.com/maybelline.jpg']), category: 'Beauty', store: 'Nykaa', external_url: 'https://www.nykaa.com/product/maybelline', checkout_url: 'https://nykaa.example/checkout?mock=1', rating: 4.5 }
];

const insert = db.prepare('INSERT INTO products (id, title, description, price, currency, images, category, store, external_url, checkout_url, rating) VALUES (@id,@title,@description,@price,@currency,@images,@category,@store,@external_url,@checkout_url,@rating)');
for (const p of products) {
  insert.run({ id: nanoid(), ...p });
}

console.log('Seed completed. Demo user: demo@invizon.test / password: password123');
