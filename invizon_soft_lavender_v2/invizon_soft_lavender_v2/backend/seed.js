const db = require('./db');
const { nanoid } = require('nanoid');
const bcrypt = require('bcryptjs');

// Demo user
const hash = bcrypt.hashSync('password123',8);
db.prepare('INSERT INTO users (id,username,email,password_hash) VALUES (?,?,?,?)').run(nanoid(),'demo','demo@invizon.test',hash);

const products=[
  {title:'iPhone 15 Pro Max',description:'Apple iPhone 15 Pro Max 128GB','price':139999,'currency':'INR',images:JSON.stringify(['https://m.media-amazon.com/images/I/81fxjeu8fdL._SL1500_.jpg']),'category':'Electronics','store':'Amazon','external_url':'https://www.amazon.in/dp/B0CHXSSV31','checkout_url':'https://www.amazon.in/gp/buy/checkout','rating':4.7},
  {title:'Nike Air Force 1',description:'Nike AF1 Shoes','price':9999,'currency':'INR',images:JSON.stringify(['https://rukminim2.flixcart.com/image/832/832/xif0q/shoe/g/x/7/nike-af1-original-imaghfqagwrtzdr9.jpeg']),'category':'Fashion','store':'Flipkart','external_url':'https://www.flipkart.com/item/NI123','checkout_url':'https://flipkart.com/item/NI123','rating':4.5},
  {title:'Levi\'s Denim Jacket',description:'Levi\'s Denim Jacket','price':3499,'currency':'INR',images:JSON.stringify(['https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/16620154/2022/10/6/861d452f-1cb2-439c-b73b-5e5b1a6a1b7b1665062786960-Levis-Men-Jackets-5791665062785458-1.jpg']),'category':'Fashion','store':'Myntra','external_url':'https://www.myntra.com/product/LE123','checkout_url':'https://www.myntra.com/product/LE123','rating':4.4},
  {title:'Fresh Bananas',description:'1kg Fresh Bananas','price':89,'currency':'INR',images:JSON.stringify(['https://cdn.zepto.com/images/banana.jpg']),'category':'Grocery','store':'Zepto','external_url':'https://www.zepto.com/product/banana','checkout_url':'https://www.zepto.com/product/banana','rating':4.2},
  {title:'Ethnic Kurti',description:'Women Ethnic Kurti','price':499,'currency':'INR',images:JSON.stringify(['https://images.meesho.com/images/kurti.jpg']),'category':'Fashion','store':'Meesho','external_url':'https://www.meesho.com/product/kurti','checkout_url':'https://www.meesho.com/product/kurti','rating':4.0},
  {title:'Dairy Milk Silk',description:'Cadbury Dairy Milk Silk 120g','price':169,'currency':'INR',images:JSON.stringify(['https://blinkit.com/images/dairymilk.jpg']),'category':'Grocery','store':'Blinkit','external_url':'https://www.blinkit.com/product/dairymilk','checkout_url':'https://www.blinkit.com/product/dairymilk','rating':4.3}
];

const insert = db.prepare('INSERT INTO products (id,title,description,price,currency,images,category,store,external_url,checkout_url,rating) VALUES (@id,@title,@description,@price,@currency,@images,@category,@store,@external_url,@checkout_url,@rating)');
for(const p of products){insert.run({...p,id:nanoid()})}
console.log('Seed complete. Demo user: demo@invizon.test / password123');
