
const mysql = require('mysql2');
const db = mysql.createConnection({ host:'localhost', port:3307, user:'root', password:'', database:'kochaeats' });

db.connect(err => {
    if (err) { console.error('DB error:', err.message); process.exit(1); }
    console.log('Connected. Fixing restaurants table...\n');

    // Step 1: Add missing columns
    const alters = [
        "ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS description TEXT",
        "ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS cuisine_type VARCHAR(100)",
        "ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS image VARCHAR(255)",
        "ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS rating DECIMAL(3,2) DEFAULT 0.00"
    ];

    let alterDone = 0;
    alters.forEach(sql => {
        db.query(sql, err => {
            if (err && !err.message.includes('Duplicate column')) console.error('Alter error:', err.message);
            else console.log('Column OK:', sql.substring(35, 65));
            if (++alterDone === alters.length) seedRestaurants();
        });
    });
});

function seedRestaurants() {
    console.log('\nSeeding restaurants...');
    const restaurants = [
        { id:1, name:'Leul Mekonen Hotel',     cuisine:'Ethiopian, International', address:'Shisha-Ber, Kombolcha',    phone:'+251911000001', image:'kochaEats/images/leul mekonen hotel1.png',          rating:4.7 },
        { id:2, name:'Yegof View Restaurant',  cuisine:'Ethiopian, International', address:'Shewa Ber, Kombolcha',     phone:'+251911000002', image:'kochaEats/images/yegof view hotel.png',              rating:4.5 },
        { id:3, name:'Sunny Said Hotel',        cuisine:'Ethiopian, Fasting',       address:'Shisha-Ber, Kombolcha',    phone:'+251911000003', image:'kochaEats/images/sunny side hotel.png',              rating:4.3 },
        { id:4, name:'Rawdi Mendi Restaurant',  cuisine:'Ethiopian, International', address:'Berbere Wenz, Kombolcha',  phone:'+251911000004', image:'kochaEats/images/rawdi mendi restaurant.png',        rating:4.6 },
        { id:5, name:'Double Tree Restaurant',  cuisine:'International, Ethiopian', address:'Shisha Ber, Kombolcha',    phone:'+251911000005', image:'kochaEats/images/double tree.png',                   rating:4.4 },
        { id:6, name:'Al-Risallah Restaurant',  cuisine:'Ethiopian, Fasting',       address:'Kebele 03, Kombolcha',     phone:'+251911000006', image:'kochaEats/images/al-risallah restaurant.png',        rating:4.8 },
    ];

    let done = 0;
    restaurants.forEach(r => {
        db.query(
            `INSERT INTO restaurants (id,name,cuisine_type,address,phone,image,rating,status)
             VALUES (?,?,?,?,?,?,?,'active')
             ON DUPLICATE KEY UPDATE cuisine_type=VALUES(cuisine_type), image=VALUES(image), rating=VALUES(rating), address=VALUES(address)`,
            [r.id, r.name, r.cuisine, r.address, r.phone, r.image, r.rating],
            err => {
                if (err) console.error('Seed error [' + r.name + ']:', err.message);
                else console.log('OK:', r.name);
                if (++done === restaurants.length) {
                    console.log('\nAll restaurants seeded!');
                    db.query('SELECT id, name, cuisine_type FROM restaurants', (e, rows) => {
                        console.log('\nRestaurants in DB:');
                        rows.forEach(row => console.log(' -', row.id, row.name, '|', row.cuisine_type));
                        db.end();
                    });
                }
            }
        );
    });
}
