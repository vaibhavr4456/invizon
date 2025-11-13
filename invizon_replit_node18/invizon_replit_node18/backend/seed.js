const db = require('./db');
const { nanoid } = require('nanoid');
const bcrypt = require('bcryptjs');

function runAsync(sql, params=[]) { return new Promise((res,rej)=> db.run(sql, params, function(err){ if(err) rej(err); else res(this); })); }
function allAsync(sql, params=[]) { return new Promise((res,rej)=> db.all(sql, params, (err,rows)=> err?rej(err):res(rows))); }
(async ()=>{
  const existing = await allAsync('SELECT id FROM products LIMIT 1');
  if(existing && existing.length>0){ console.log('Seed exists'); process.exit(0); }
  const pass = bcrypt.hashSync('password123',8);
  await runAsync('INSERT INTO users (id,username,email,password_hash) VALUES (?,?,?,?)',[nanoid(),'demo','demo@invizon.test',pass]);
  const products = [
    {title:'iPhone 15 Pro Max', description:'Apple iPhone 15 Pro Max 128GB', price:139999, currency:'INR', images:JSON.stringify(['/assets/images/iphone.jpg']), category:'Mobiles', store:'Amazon', external_url:'https://www.amazon.in/dp/B0CHXSSV31', checkout_url:''},
    {title:'Nike Air Force 1', description:'Nike Air Force 1 Shoes', price:9999, currency:'INR', images:JSON.stringify(['/assets/images/nike.jpg']), category:'Footwear', store:'Flipkart', external_url:'https://www.flipkart.com', checkout_url:''},
    {title:"Levi's Denim Jacket", description:'Levi\'s denim jacket', price:3499, currency:'INR', images:JSON.stringify(['/assets/images/levis.jpg']), category:'Apparel', store:'Myntra', external_url:'https://www.myntra.com', checkout_url:''},
    {title:'Amul Milk 1L', description:'Fresh milk 1L', price:60, currency:'INR', images:JSON.stringify(['/assets/images/amul.jpg']), category:'Grocery', store:'Zepto', external_url:'https://www.zepto.com', checkout_url:''},
    {title:'Dairy Milk Silk', description:'Cadbury Dairy Milk Silk', price:169, currency:'INR', images:JSON.stringify(['/assets/images/dairymilk.jpg']), category:'Grocery', store:'Blinkit', external_url:'https://www.blinkit.com', checkout_url:''}
  ];
  for(const p of products){ await runAsync('INSERT INTO products (id,title,description,price,currency,images,category,store,external_url,checkout_url,rating) VALUES (?,?,?,?,?,?,?,?,?,?,?)', [nanoid(),p.title,p.description,p.price,p.currency,p.images,p.category,p.store,p.external_url,p.checkout_url,4.3]); }
  console.log('Seed complete. demo@invizon.test / password123');
  process.exit(0);
})();
