
const mysql = require('mysql2');
const db = mysql.createConnection({ host:'localhost', port:3307, user:'root', password:'', database:'kochaeats' });

db.connect(err => {
    if (err) { console.error('DB error:', err.message); process.exit(1); }
    console.log('Connected. Running migrations...\n');

    const migrations = [
        // Fix orders table ENUMs
        ["orders.payment_method", "ALTER TABLE orders MODIFY payment_method ENUM('cash','telebirr','cbebirr','amole','card','wallet','bank_transfer') DEFAULT 'cash'"],
        ["orders.payment_status", "ALTER TABLE orders MODIFY payment_status ENUM('pending','awaiting_payment','paid','failed','refunded','cancelled') DEFAULT 'pending'"],
        ["orders.order_status",   "ALTER TABLE orders MODIFY order_status ENUM('pending','confirmed','preparing','ready','ready_for_pickup','assigned_to_rider','picked_up','out_for_delivery','delivered','cancelled','rejected','failed','failed_delivery','refunded') DEFAULT 'pending'"],
        // Fix payments table ENUM
        ["payments.method",  "ALTER TABLE payments MODIFY method ENUM('cash','telebirr','cbebirr','amole','card','wallet','bank_transfer') DEFAULT 'cash'"],
        ["payments.status",  "ALTER TABLE payments MODIFY status ENUM('pending','processing','completed','failed','refunded','cancelled') DEFAULT 'pending'"],
        // Add updated_at to users if missing
        ["users.updated_at", "ALTER TABLE users ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"],
        // Add missing columns to orders if needed
        ["orders.delivery_address", "ALTER TABLE orders ADD COLUMN IF NOT EXISTS delivery_address TEXT"],
        ["orders.notes",            "ALTER TABLE orders ADD COLUMN IF NOT EXISTS notes TEXT"],
        ["orders.coupon_code",      "ALTER TABLE orders ADD COLUMN IF NOT EXISTS coupon_code VARCHAR(50)"],
    ];

    let pending = migrations.length;
    migrations.forEach(([name, sql]) => {
        db.query(sql, (err) => {
            if (err && !err.message.includes('Duplicate column') && !err.message.includes('already exists')) {
                console.error('FAIL [' + name + ']:', err.message);
            } else {
                console.log('OK   [' + name + ']');
            }
            if (--pending === 0) {
                console.log('\nAll migrations done!');
                db.end();
            }
        });
    });
});

// Also seed restaurants
const mysql2 = require('mysql2');
const db2 = mysql2.createConnection({ host:'localhost', port:3307, user:'root', password:'', database:'kochaeats' });
db2.connect(err => {
    if (err) { console.error(err.message); return; }
    const restaurants = [
        [1, 'Leul Mekonen Hotel',    'ልዑል መኮንን ሆቴል',   'Ethiopian, International', 'Shisha-Ber, Kombolcha',    '+251911000001', 'kochaEats/images/leul mekonen hotel1.png'],
        [2, 'Yegof View Restaurant', 'የጎፍ ቪው ምግብ ቤት',  'Ethiopian, International', 'Shewa Ber, Kombolcha',     '+251911000002', 'kochaEats/images/yegof view hotel.png'],
        [3, 'Sunny Said Hotel',      'ሳኒ ሰይድ ሆቴል',     'Ethiopian, Fasting',       'Shisha-Ber, Kombolcha',    '+251911000003', 'kochaEats/images/sunny side hotel.png'],
        [4, 'Rawdi Mendi Restaurant','ራውዲ መንዲ ምግብ ቤት', 'Ethiopian, International', 'Berbere Wenz, Kombolcha',  '+251911000004', 'kochaEats/images/rawdi mendi restaurant.png'],
        [5, 'Double Tree Restaurant','ደብል ትሪ ምግብ ቤት',  'International, Ethiopian', 'Shisha Ber, Kombolcha',    '+251911000005', 'kochaEats/images/double tree.png'],
        [6, 'Al-Risallah Restaurant','አል-ርሳላህ ምግብ ቤት', 'Ethiopian, Fasting',       'Kebele 03, Kombolcha',     '+251911000006', 'kochaEats/images/al-risallah restaurant.png'],
    ];
    let done = 0;
    restaurants.forEach(([id, name, amharic, cuisine, address, phone, image]) => {
        db2.query(
            'INSERT INTO restaurants (id,name,description,cuisine_type,address,phone,image,status) VALUES (?,?,?,?,?,?,?,"active") ON DUPLICATE KEY UPDATE name=VALUES(name)',
            [id, name, amharic, cuisine, address, phone, image],
            (err) => {
                if (err) console.error('Restaurant insert error:', err.message);
                else console.log('Seeded restaurant:', name);
                if (++done === restaurants.length) { console.log('All restaurants seeded!'); db2.end(); }
            }
        );
    });
});
