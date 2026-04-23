// seed

// ============================================================
//  KochaEats — Full Database Seed Script
// ============================================================
const mysql  = require('mysql2');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
    host:'localhost', port:3307, user:'root', password:'', database:'kochaeats'
});

db.connect(err => {
    if (err) { console.error('DB error:', err.message); process.exit(1); }
    console.log('Connected to kochaeats\n');
    runSeeds();
});

async function runSeeds() {
    try {
        await seedMenuItems();
        await seedCustomers();
        await seedRiders();
        await seedOrders();
        await seedReviews();
        await seedWallets();
        console.log('\nAll data seeded successfully!');
        db.end();
    } catch(e) { console.error('Seed error:', e.message); db.end(); }
}

const q = (sql, p=[]) => new Promise((res,rej) => db.query(sql,p,(err,r)=>err?rej(err):res(r)));

async function seedMenuItems() {
    console.log('Seeding menu items...');
    const items = [
        [1,1,'Doro Wot','Traditional Ethiopian chicken stew with boiled eggs in spiced berbere sauce',220,'ethiopian','kochaEats/images/ዶሮ ዋት.png'],
        [2,1,'Kitfo','Minced raw beef seasoned with mitmita and spiced butter, served with ayib',250,'ethiopian','kochaEats/images/tibs with atklt.jpg'],
        [3,1,'Margherita Pizza','Classic pizza with tomato sauce, fresh mozzarella and basil',180,'international','kochaEats/images/Margherita Pizza.png'],
        [4,1,'Beyaynetu','Fasting platter with misir, gomen, tikel gomen, shiro and injera',160,'fasting','kochaEats/images/beyeayinet.jpg'],
        [5,1,'Chechebsa','Shredded flatbread fried with spiced butter and berbere',90,'breakfast','kochaEats/images/chechebsa.jpg'],
        [6,1,'Special Sandwich','Grilled chicken sandwich with fresh vegetables and special sauce',120,'breakfast','kochaEats/images/sandwiches.jpg'],
        [7,2,'Beef Tibs','Sauteed beef cubes with onions, tomatoes and jalapeno in spiced butter',200,'ethiopian','kochaEats/images/tibs with atklt.jpg'],
        [8,2,'Classic Cheeseburger','Beef patty with cheddar, lettuce, tomato and special sauce',150,'international','kochaEats/images/Classic Cheeseburger & Fries.png'],
        [9,2,'Shiro Beselata','Chickpea stew served with fresh salad and injera',110,'fasting','kochaEats/images/shiro beselata.jpg'],
        [10,2,'Firfir Special','Torn injera cooked in spiced berbere sauce with ayib',100,'ethiopian','kochaEats/images/spacial firfir.jpg'],
        [11,2,'Rice with Chicken Noodles','Steamed rice with grilled chicken and noodles',140,'international','kochaEats/images/rise with chiknes nooduls.jpg'],
        [12,2,'Pasta with Sauce','Spaghetti with rich tomato meat sauce',130,'international','kochaEats/images/pasta with souse.jpg'],
        [13,3,'Misir Wot','Red lentil stew cooked in berbere sauce, served with injera',95,'fasting','kochaEats/images/beyaayinet.jpg'],
        [14,3,'Ful','Fava bean stew with olive oil, lemon and spices',80,'breakfast','kochaEats/images/beyeayinet.jpg'],
        [15,3,'Chechebsa Sunny','Sunny Said special chechebsa with extra spiced butter',95,'breakfast','kochaEats/images/chechebsa.jpg'],
        [16,3,'Gomen Besiga','Collard greens cooked with beef and spices',130,'ethiopian','kochaEats/images/tibs with atklt.jpg'],
        [17,3,'Falafel Plate','Crispy falafel with hummus, pita and fresh salad',120,'fasting','kochaEats/images/Falafel Plate.png'],
        [18,3,'Noodles with Vegetables','Stir-fried noodles with mixed vegetables',110,'international','kochaEats/images/nuduls with vegitables.jpg'],
        [19,4,'Gomen Besiga Special','Tender beef with collard greens in spiced sauce',145,'ethiopian','kochaEats/images/tibs with atklt.jpg'],
        [20,4,'Chicken Shawarma Platter','Grilled chicken shawarma with garlic sauce and pickles',175,'international','kochaEats/images/Chicken Shawarma Platter.png'],
        [21,4,'Special Firfir','Rawdi special firfir with extra berbere and ayib',115,'ethiopian','kochaEats/images/spacial firfir.jpg'],
        [22,4,'Beyaynetu Rawdi','Fasting platter with 6 different dishes',175,'fasting','kochaEats/images/beyaayinet.jpg'],
        [23,4,'BBQ Pulled Pork Sandwich','Slow-cooked pulled meat sandwich with coleslaw',160,'international','kochaEats/images/BBQ Pulled Pork Sandwich.jpg'],
        [24,4,'Lemon Herb Roasted Chicken','Half roasted chicken with lemon herb marinade and sides',220,'international','kochaEats/images/Lemon Herb Roasted Chicken.png'],
        [25,5,'Spaghetti Bolognese','Classic spaghetti with rich meat bolognese sauce',155,'international','kochaEats/images/Spaghetti Bolognese.png'],
        [26,5,'Signature Kocha Bowl','Rice bowl with grilled chicken, avocado, and special sauce',160,'international','kochaEats/images/Signature Kocha Bowl.png'],
        [27,5,'Crispy Chicken Sandwich','Crispy fried chicken with lettuce and mayo',140,'international','kochaEats/images/Crispy Chicken Sandwich.png'],
        [28,5,'Burrito','Flour tortilla filled with seasoned beef, rice, beans and salsa',150,'international','kochaEats/images/Burrito.png'],
        [29,5,'Vegetable Pad Thai','Stir-fried rice noodles with vegetables, peanuts and lime',135,'fasting','kochaEats/images/Vegetable Pad Thai.png'],
        [30,5,'Chef Salad','Fresh mixed greens with grilled chicken, eggs and house dressing',120,'international','kochaEats/images/Chher slad.png'],
        [31,6,'Dulet','Minced tripe, liver and lean beef sauteed with spices',180,'ethiopian','kochaEats/images/tibs with atklt.jpg'],
        [32,6,'Yegeb Alicha','Lamb stew in mild turmeric sauce with vegetables',190,'ethiopian','kochaEats/images/beyeayinet.jpg'],
        [33,6,'Falafel Al-Risallah','House special falafel with tahini and fresh herbs',110,'fasting','kochaEats/images/Falafel Plate.png'],
        [34,6,'Tibs with Atkilt','Beef tibs with mixed vegetables in spiced butter',165,'ethiopian','kochaEats/images/tibs with atklt.jpg'],
        [35,6,'Shiro Beselata Special','Thick shiro with fresh salad and special injera',105,'fasting','kochaEats/images/shiro beselata.jpg'],
        [36,6,'Vegetable Pad Thai Al','Stir-fried noodles with local vegetables and spices',125,'fasting','kochaEats/images/Vegetable Pad Thai.png'],
    ];
    for (const [id,rid,name,desc,price,cat,img] of items) {
        await q('INSERT INTO menu_items (id,restaurant_id,name,description,price,category,image,available) VALUES (?,?,?,?,?,?,?,1) ON DUPLICATE KEY UPDATE name=VALUES(name),price=VALUES(price)',
            [id,rid,name,desc,price,cat,img]);
    }
    console.log('  ' + items.length + ' menu items seeded');
}

async function seedCustomers() {
    console.log('Seeding customers...');
    const customers = [
        { name:'Abebe Kebede',    email:'abebe@gmail.com',    phone:'+251911111111' },
        { name:'Mekdes Haile',    email:'mekdes@gmail.com',   phone:'+251922222222' },
        { name:'Solomon Tesfaye', email:'solomon@gmail.com',  phone:'+251933333333' },
        { name:'Tigist Alemu',    email:'tigist@gmail.com',   phone:'+251944444444' },
        { name:'Dawit Bekele',    email:'dawit@gmail.com',    phone:'+251955555555' },
    ];
    const hash = await bcrypt.hash('Customer1!', 10);
    for (const c of customers) {
        await q('INSERT IGNORE INTO users (name,email,phone,password,role,status) VALUES (?,?,?,?,?,?)',
            [c.name, c.email, c.phone, hash, 'customer', 'active']);
    }
    console.log('  ' + customers.length + ' customers seeded  (password: Customer1!)');
}

async function seedRiders() {
    console.log('Seeding riders...');
    const riders = [
        { name:'Yonas Girma',  email:'yonas.rider@gmail.com',  phone:'+251966666666', vehicle:'motorcycle', vnum:'3-12345' },
        { name:'Hana Assefa',  email:'hana.rider@gmail.com',   phone:'+251977777777', vehicle:'bicycle',    vnum:'B-00123' },
        { name:'Kebede Worku', email:'kebede.rider@gmail.com', phone:'+251988888888', vehicle:'motorcycle', vnum:'3-67890' },
    ];
    const hash = await bcrypt.hash('Rider123!', 10);
    for (const r of riders) {
        const res = await q('INSERT IGNORE INTO users (name,email,phone,password,role,status) VALUES (?,?,?,?,?,?)',
            [r.name, r.email, r.phone, hash, 'rider', 'active']);
        const uid = res.insertId || (await q('SELECT id FROM users WHERE email=?',[r.email]))[0]?.id;
        if (uid) {
            await q('INSERT IGNORE INTO rider_details (user_id,vehicle_type,vehicle_number,approval_status,total_deliveries,rating) VALUES (?,?,?,?,?,?)',
                [uid, r.vehicle, r.vnum, 'approved', Math.floor(Math.random()*200)+50, (4.5+Math.random()*0.5).toFixed(2)]);
        }
    }
    console.log('  ' + riders.length + ' riders seeded  (password: Rider123!)');
}

async function seedOrders() {
    console.log('Seeding orders, order_items, payments, transactions, refunds...');
    const customers = await q('SELECT id,name,email,phone FROM users WHERE role="customer" LIMIT 5');
    const riders    = await q('SELECT id FROM users WHERE role="rider" LIMIT 3');
    if (!customers.length) { console.log('  No customers, skipping'); return; }

    const areas = ['Ketema','Shisha-Ber','Berbere Wenz','University Area','Kebele 02'];
    const scenarios = [
        [1, [{id:1,name:'Doro Wot',price:220,qty:1},{id:5,name:'Chechebsa',price:90,qty:2}],    'delivered',       'cash',     'paid',             7],
        [2, [{id:7,name:'Beef Tibs',price:200,qty:2},{id:8,name:'Cheeseburger',price:150,qty:1}],'delivered',       'telebirr', 'paid',             5],
        [3, [{id:13,name:'Misir Wot',price:95,qty:3},{id:17,name:'Falafel',price:120,qty:1}],    'delivered',       'cbebirr',  'paid',             3],
        [4, [{id:20,name:'Shawarma',price:175,qty:2}],                                            'out_for_delivery','cash',    'pending',          1],
        [5, [{id:25,name:'Spaghetti',price:155,qty:1},{id:26,name:'Kocha Bowl',price:160,qty:1}],'preparing',       'amole',    'awaiting_payment', 0],
        [6, [{id:31,name:'Dulet',price:180,qty:1},{id:33,name:'Falafel',price:110,qty:2}],        'confirmed',       'cash',     'pending',          0],
        [1, [{id:2,name:'Kitfo',price:250,qty:1},{id:3,name:'Pizza',price:180,qty:1}],            'cancelled',       'telebirr', 'refunded',         4],
        [2, [{id:9,name:'Shiro',price:110,qty:2},{id:10,name:'Firfir',price:100,qty:1}],          'delivered',       'cash',     'paid',             6],
        [5, [{id:27,name:'Crispy Chicken',price:140,qty:2},{id:30,name:'Salad',price:120,qty:1}], 'delivered',       'cash',     'paid',             2],
        [3, [{id:14,name:'Ful',price:80,qty:2},{id:15,name:'Chechebsa',price:95,qty:1}],          'pending',         'cash',     'pending',          0],
    ];

    let oc=0, pc=0, tc=0, rc=0;
    for (let i=0; i<scenarios.length; i++) {
        const [restId, items, orderStatus, payMethod, payStatus, daysAgo] = scenarios[i];
        const cust   = customers[i % customers.length];
        const rider  = riders[i % riders.length];
        const area   = areas[i % areas.length];
        const sub    = items.reduce((s,it)=>s+it.price*it.qty, 0);
        const fee    = 25 + (i%3)*5;
        const total  = sub + fee;
        const oid    = 'ORD-SEED-' + (1000+i);
        const ts     = new Date(Date.now() - daysAgo*86400000);
        const riderId= ['delivered','out_for_delivery','picked_up'].includes(orderStatus) ? rider.id : null;

        await q('DELETE FROM order_items WHERE order_id=?',[oid]);
        await q('DELETE FROM payments WHERE order_id=?',[oid]);
        await q('DELETE FROM refunds WHERE order_id=?',[oid]);
        await q('DELETE FROM transactions WHERE order_id=?',[oid]);
        await q('DELETE FROM orders WHERE id=?',[oid]);

        await q(`INSERT INTO orders (id,user_id,restaurant_id,rider_id,user_name,user_email,user_phone,delivery_area,delivery_address,items,subtotal,delivery_fee,discount,total,payment_method,payment_status,order_status,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [oid,cust.id,restId,riderId,cust.name,cust.email,cust.phone,area,area+' Kombolcha',
             JSON.stringify(items.map(it=>({english:it.name,price:it.price,quantity:it.qty}))),
             sub,fee,0,total,payMethod,payStatus,orderStatus,ts,ts]);
        oc++;

        for (const it of items) {
            await q('INSERT INTO order_items (order_id,item_name,quantity,unit_price,total_price) VALUES (?,?,?,?,?)',
                [oid,it.name,it.qty,it.price,it.price*it.qty]);
        }

        if (['paid','awaiting_payment','refunded'].includes(payStatus)) {
            const pref = 'PAY-SEED-'+(1000+i);
            const pst  = payStatus==='paid'?'completed':payStatus==='refunded'?'refunded':'processing';
            const gtx  = payStatus==='paid'?'GW-'+Math.random().toString(36).slice(2,10).toUpperCase():null;
            await q('INSERT INTO payments (payment_ref,order_id,user_id,amount,currency,method,status,gateway_tx_id,verified_at,created_at) VALUES (?,?,?,?,?,?,?,?,?,?)',
                [pref,oid,cust.id,total,'ETB',payMethod,pst,gtx,payStatus==='paid'?ts:null,ts]);
            pc++;
            const payRow = await q('SELECT id FROM payments WHERE payment_ref=?',[pref]);
            const payId  = payRow[0]?.id;

            await q('INSERT INTO transactions (txn_ref,type,direction,user_id,order_id,payment_id,amount,fee,net_amount,currency,method,status,description,created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
                ['TXN-SEED-'+(1000+i),'payment','inflow',cust.id,oid,payId,total,0,total,'ETB',payMethod,pst==='completed'?'completed':'pending','Payment for order #'+oid,ts]);
            tc++;

            if (payStatus==='refunded' && payId) {
                await q('INSERT INTO refunds (refund_ref,payment_id,order_id,user_id,amount,method,status,reason,reason_detail,initiated_role,processed_at,created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
                    ['RFD-SEED-'+(1000+i),payId,oid,cust.id,total,'original','completed','order_cancelled','Customer cancelled order','admin',ts,ts]);
                rc++;
                await q('INSERT INTO transactions (txn_ref,type,direction,user_id,order_id,payment_id,amount,fee,net_amount,currency,method,status,description,created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
                    ['TXN-RFD-SEED-'+(1000+i),'refund','outflow',cust.id,oid,payId,total,0,total,'ETB',payMethod,'completed','Refund for order #'+oid,ts]);
                tc++;
            }
        }
    }
    console.log('  '+oc+' orders, '+pc+' payments, '+tc+' transactions, '+rc+' refunds seeded');
}

async function seedReviews() {
    console.log('Seeding reviews...');
    const customers = await q('SELECT id FROM users WHERE role="customer" LIMIT 5');
    if (!customers.length) return;
    const orders = await q('SELECT id,user_id,restaurant_id FROM orders WHERE order_status="delivered" LIMIT 10');
    const reviews = [
        [customers[0]?.id,1,5,'Amazing Doro Wot! Best in Kombolcha. The injera was perfectly fermented.'],
        [customers[1]?.id,2,4,'Great Beef Tibs, very tender. The cheeseburger was also surprisingly good!'],
        [customers[2]?.id,3,5,'Excellent fasting food. The Misir Wot was perfectly spiced.'],
        [customers[3]?.id,4,4,'Chicken Shawarma was delicious. Fast delivery too!'],
        [customers[4]?.id,5,5,'Signature Kocha Bowl is a must-try. Unique and filling.'],
        [customers[0]?.id,6,5,'Al-Risallah never disappoints. The Dulet was outstanding.'],
        [customers[1]?.id,1,4,'Good food, slightly long wait but worth it.'],
        [customers[2]?.id,2,3,'Average experience. Food was okay but delivery was late.'],
    ];
    let count=0;
    for (const [uid,rid,rating,comment] of reviews) {
        if (!uid) continue;
        const ord = orders.find(o=>o.user_id===uid && o.restaurant_id===rid);
        try {
            await q('INSERT IGNORE INTO reviews (user_id,order_id,restaurant_id,rating,comment) VALUES (?,?,?,?,?)',
                [uid, ord?ord.id:null, rid, rating, comment]);
            await q('UPDATE restaurants SET rating=(SELECT AVG(rating) FROM reviews WHERE restaurant_id=?) WHERE id=?',[rid,rid]);
            count++;
        } catch(e) {}
    }
    console.log('  '+count+' reviews seeded');
}

async function seedWallets() {
    console.log('Seeding wallets and wallet transactions...');
    const customers = await q('SELECT id,name FROM users WHERE role="customer" LIMIT 5');
    if (!customers.length) return;
    let wc=0, tc=0;
    for (const c of customers) {
        const balance = (Math.random()*500+50).toFixed(2);
        await q('INSERT INTO wallets (user_id,balance,currency,status) VALUES (?,?,?,?) ON DUPLICATE KEY UPDATE balance=VALUES(balance)',
            [c.id,balance,'ETB','active']);
        const wRow = await q('SELECT id FROM wallets WHERE user_id=?',[c.id]);
        const wid  = wRow[0]?.id;
        if (!wid) continue;
        wc++;
        const topup = (Math.random()*300+100).toFixed(2);
        await q('INSERT INTO wallet_transactions (wallet_id,user_id,type,amount,balance_after,reference,description) VALUES (?,?,?,?,?,?,?)',
            [wid,c.id,'credit',topup,balance,'TOPUP-'+Date.now()+c.id,'Wallet top-up via Telebirr']);
        tc++;
        const spend = (Math.random()*100+20).toFixed(2);
        await q('INSERT INTO wallet_transactions (wallet_id,user_id,type,amount,balance_after,description) VALUES (?,?,?,?,?,?)',
            [wid,c.id,'debit',spend,(parseFloat(balance)-parseFloat(spend)).toFixed(2),'Payment for food order']);
        tc++;
    }
    // Seed cart for first customer
    const first = customers[0];
    if (first) {
        await q('DELETE FROM cart WHERE user_id=?',[first.id]);
        const cartItems = [
            [first.id,1,'Doro Wot',220,1,1],
            [first.id,7,'Beef Tibs',200,2,2],
            [first.id,3,'Margherita Pizza',180,1,1],
            [first.id,5,'Chechebsa',90,2,1],
        ];
        for (const [uid,mid,name,price,qty,rid] of cartItems) {
            await q('INSERT INTO cart (user_id,menu_item_id,item_name,price,quantity,restaurant_id) VALUES (?,?,?,?,?,?)',
                [uid,mid,name,price,qty,rid]);
        }
        console.log('  4 cart items seeded for '+first.name);
    }
    console.log('  '+wc+' wallets, '+tc+' wallet transactions seeded');
}
