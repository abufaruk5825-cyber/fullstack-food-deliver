// ============================================================
//  KochaEats Backend â€” Full Production API
// ============================================================
const express = require('express');
const mysql   = require('mysql2');
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const path    = require('path');
const crypto  = require('crypto');

const app = express();
const JWT_SECRET = 'kochaeats_jwt_secret_2025';
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    if (req.method === 'OPTIONS') return res.sendStatus(200);
    next();
});
app.use(express.static(path.join(__dirname, '..')));

// â”€â”€ Serve pages â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
app.get('/',         (req, res) => res.sendFile(path.join(__dirname, '..', 'kochaEats.html')));
app.get('/admin',    (req, res) => res.sendFile(path.join(__dirname, '..', 'admin-dashboard.html')));
app.get('/rider',    (req, res) => res.sendFile(path.join(__dirname, '..', 'rider-dashboard.html')));
app.get('/customer', (req, res) => res.sendFile(path.join(__dirname, '..', 'customer-dashboard.html')));
app.get('/payment',  (req, res) => res.sendFile(path.join(__dirname, '..', 'payment.html')));
app.get('/api/health-check', (req, res) => res.json({ success: true, message: 'KochaEats API running', timestamp: new Date().toISOString() }));

// â”€â”€ DB Connection â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3307,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    multipleStatements: true,
    connectTimeout: 10000
});

db.connect(err => {
    if (err) { console.error('âŒ MySQL connection failed:', err.message); process.exit(1); }
    console.log('âœ… MySQL connected!');
    db.query('CREATE DATABASE IF NOT EXISTS kochaeats', err => {
        if (err) { console.error('DB create error:', err.message); return; }
        db.query('USE kochaeats', err => {
            if (err) { console.error('USE db error:', err.message); return; }
            console.log('âœ… Using database: kochaeats');
            createTables(() => seedDefaultAdmin());
        });
    });
});

// â”€â”€ Create Tables â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function createTables(callback) {
    let pending = 16, errors = 0;
    function done(err, name) {
        if (err) { console.error(name + ' table error:', err.message); errors++; }
        else console.log('âœ… ' + name + ' table ready');
        if (--pending === 0) callback();
    }

    db.query(`CREATE TABLE IF NOT EXISTS users (
        id         INT AUTO_INCREMENT PRIMARY KEY,
        name       VARCHAR(100) NOT NULL,
        email      VARCHAR(100) UNIQUE NOT NULL,
        password   VARCHAR(255) NOT NULL,
        role       ENUM('customer','rider','admin') DEFAULT 'customer',
        phone      VARCHAR(20),
        address    TEXT,
        status     ENUM('active','suspended','pending') DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`, err => done(err, 'users'));

    db.query(`CREATE TABLE IF NOT EXISTS restaurants (
        id           INT AUTO_INCREMENT PRIMARY KEY,
        name         VARCHAR(150) NOT NULL,
        description  TEXT,
        address      TEXT,
        phone        VARCHAR(20),
        cuisine_type VARCHAR(100),
        image        VARCHAR(255),
        rating       DECIMAL(3,2) DEFAULT 0.00,
        status       ENUM('active','inactive') DEFAULT 'active',
        owner_id     INT,
        created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE SET NULL
    )`, err => done(err, 'restaurants'));

    db.query(`CREATE TABLE IF NOT EXISTS menu_items (
        id            INT AUTO_INCREMENT PRIMARY KEY,
        restaurant_id INT NOT NULL,
        name          VARCHAR(150) NOT NULL,
        description   TEXT,
        price         DECIMAL(10,2) NOT NULL,
        category      VARCHAR(50),
        image         VARCHAR(255),
        available     TINYINT(1) DEFAULT 1,
        created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
    )`, err => done(err, 'menu_items'));

    db.query(`CREATE TABLE IF NOT EXISTS cart (
        id            INT AUTO_INCREMENT PRIMARY KEY,
        user_id       INT NOT NULL,
        menu_item_id  INT,
        item_name     VARCHAR(150) NOT NULL,
        price         DECIMAL(10,2) NOT NULL,
        quantity      INT DEFAULT 1,
        restaurant_id INT,
        created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )`, err => done(err, 'cart'));

    db.query(`CREATE TABLE IF NOT EXISTS orders (
        id               VARCHAR(50) PRIMARY KEY,
        user_id          INT,
        restaurant_id    INT,
        rider_id         INT,
        user_name        VARCHAR(100),
        user_email       VARCHAR(100),
        user_phone       VARCHAR(20),
        delivery_address TEXT,
        delivery_area    VARCHAR(100),
        items            JSON,
        subtotal         DECIMAL(10,2) DEFAULT 0,
        delivery_fee     DECIMAL(10,2) DEFAULT 0,
        discount         DECIMAL(10,2) DEFAULT 0,
        total            DECIMAL(10,2) NOT NULL,
        payment_method   ENUM('cash','telebirr','cbebirr','amole','card','wallet','bank_transfer') DEFAULT 'cash',
        payment_status   ENUM('pending','awaiting_payment','paid','failed','refunded','cancelled') DEFAULT 'pending',
        order_status     ENUM('pending','confirmed','preparing','ready','ready_for_pickup','assigned_to_rider','picked_up','out_for_delivery','delivered','cancelled','rejected','failed','failed_delivery','refunded') DEFAULT 'pending',
        coupon_code      VARCHAR(50),
        notes            TEXT,
        created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id)       REFERENCES users(id) ON DELETE SET NULL,
        FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE SET NULL,
        FOREIGN KEY (rider_id)      REFERENCES users(id) ON DELETE SET NULL
    )`, err => done(err, 'orders'));

    db.query(`CREATE TABLE IF NOT EXISTS order_items (
        id           INT AUTO_INCREMENT PRIMARY KEY,
        order_id     VARCHAR(50) NOT NULL,
        menu_item_id INT,
        item_name    VARCHAR(150),
        quantity     INT DEFAULT 1,
        unit_price   DECIMAL(10,2),
        total_price  DECIMAL(10,2),
        FOREIGN KEY (order_id)     REFERENCES orders(id) ON DELETE CASCADE,
        FOREIGN KEY (menu_item_id) REFERENCES menu_items(id) ON DELETE SET NULL
    )`, err => done(err, 'order_items'));

    db.query(`CREATE TABLE IF NOT EXISTS payments (
        id                  INT AUTO_INCREMENT PRIMARY KEY,
        payment_ref         VARCHAR(80) UNIQUE NOT NULL,
        order_id            VARCHAR(50) NOT NULL,
        user_id             INT,
        amount              DECIMAL(10,2) NOT NULL,
        currency            VARCHAR(10) DEFAULT 'ETB',
        method              ENUM('cash','telebirr','cbebirr','amole','card','wallet','bank_transfer') DEFAULT 'cash',
        status              ENUM('pending','processing','completed','failed','refunded','cancelled') DEFAULT 'pending',
        gateway_tx_id       VARCHAR(150),
        gateway_response    TEXT,
        failure_reason      TEXT,
        retry_count         INT DEFAULT 0,
        verified_at         TIMESTAMP NULL,
        refunded_at         TIMESTAMP NULL,
        refund_reason       TEXT,
        ip_address          VARCHAR(45),
        created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id)  REFERENCES users(id) ON DELETE SET NULL
    )`, err => done(err, 'payments'));

    db.query(`CREATE TABLE IF NOT EXISTS reviews (
        id            INT AUTO_INCREMENT PRIMARY KEY,
        user_id       INT,
        order_id      VARCHAR(50),
        restaurant_id INT,
        rating        TINYINT NOT NULL,
        comment       TEXT,
        created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY one_review_per_order (user_id, order_id),
        FOREIGN KEY (user_id)       REFERENCES users(id) ON DELETE SET NULL,
        FOREIGN KEY (order_id)      REFERENCES orders(id) ON DELETE SET NULL,
        FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE SET NULL
    )`, err => done(err, 'reviews'));

    db.query(`CREATE TABLE IF NOT EXISTS rider_details (
        id               INT AUTO_INCREMENT PRIMARY KEY,
        user_id          INT UNIQUE NOT NULL,
        vehicle_type     VARCHAR(50),
        vehicle_number   VARCHAR(50),
        license_number   VARCHAR(50),
        approval_status  ENUM('pending','approved','rejected') DEFAULT 'pending',
        total_deliveries INT DEFAULT 0,
        rating           DECIMAL(3,2) DEFAULT 5.00,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )`, err => done(err, 'rider_details'));

    // â”€â”€ 10. wallets â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    db.query(`CREATE TABLE IF NOT EXISTS wallets (
        id           INT AUTO_INCREMENT PRIMARY KEY,
        user_id      INT UNIQUE NOT NULL,
        balance      DECIMAL(12,2) DEFAULT 0.00,
        currency     VARCHAR(10) DEFAULT 'ETB',
        status       ENUM('active','frozen','closed') DEFAULT 'active',
        created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )`, err => done(err, 'wallets'));

    // â”€â”€ 11. wallet_transactions â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    db.query(`CREATE TABLE IF NOT EXISTS wallet_transactions (
        id           INT AUTO_INCREMENT PRIMARY KEY,
        wallet_id    INT NOT NULL,
        user_id      INT NOT NULL,
        type         ENUM('credit','debit','refund','cashback') NOT NULL,
        amount       DECIMAL(12,2) NOT NULL,
        balance_after DECIMAL(12,2) NOT NULL,
        reference    VARCHAR(100),
        description  VARCHAR(255),
        order_id     VARCHAR(50),
        created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (wallet_id) REFERENCES wallets(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id)   REFERENCES users(id) ON DELETE CASCADE
    )`, err => done(err, 'wallet_transactions'));

    // â”€â”€ 12. payment_config â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    db.query(`CREATE TABLE IF NOT EXISTS payment_config (
        id           INT AUTO_INCREMENT PRIMARY KEY,
        method       VARCHAR(50) UNIQUE NOT NULL,
        label        VARCHAR(100),
        enabled      TINYINT(1) DEFAULT 1,
        min_amount   DECIMAL(10,2) DEFAULT 0,
        max_amount   DECIMAL(10,2) DEFAULT 999999,
        icon         VARCHAR(50),
        description  VARCHAR(255),
        updated_by   INT,
        updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`, err => done(err, 'payment_config'));

    // â”€â”€ 13. payment_methods â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    // Dedicated table for supported payment methods with full metadata
    db.query(`CREATE TABLE IF NOT EXISTS payment_methods (
        id              INT AUTO_INCREMENT PRIMARY KEY,
        code            VARCHAR(50) UNIQUE NOT NULL,
        name            VARCHAR(100) NOT NULL,
        type            ENUM('online','offline','wallet','hybrid') NOT NULL,
        provider        VARCHAR(100),
        icon            VARCHAR(80),
        enabled         TINYINT(1) DEFAULT 1,
        is_default      TINYINT(1) DEFAULT 0,
        min_amount      DECIMAL(10,2) DEFAULT 0.00,
        max_amount      DECIMAL(10,2) DEFAULT 999999.00,
        processing_fee  DECIMAL(5,2) DEFAULT 0.00,
        fee_type        ENUM('fixed','percent') DEFAULT 'fixed',
        account_number  VARCHAR(100),
        account_name    VARCHAR(100),
        instructions    TEXT,
        sort_order      INT DEFAULT 0,
        created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`, err => done(err, 'payment_methods'));

    // â”€â”€ 14. transactions â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    // Unified financial ledger â€” every money movement recorded here
    db.query(`CREATE TABLE IF NOT EXISTS transactions (
        id              INT AUTO_INCREMENT PRIMARY KEY,
        txn_ref         VARCHAR(80) UNIQUE NOT NULL,
        type            ENUM('payment','refund','topup','withdrawal','cashback','fee') NOT NULL,
        direction       ENUM('inflow','outflow') NOT NULL,
        user_id         INT,
        order_id        VARCHAR(50),
        payment_id      INT,
        wallet_id       INT,
        amount          DECIMAL(12,2) NOT NULL,
        fee             DECIMAL(10,2) DEFAULT 0.00,
        net_amount      DECIMAL(12,2) NOT NULL,
        currency        VARCHAR(10) DEFAULT 'ETB',
        method          VARCHAR(50),
        status          ENUM('pending','completed','failed','reversed') DEFAULT 'pending',
        gateway_ref     VARCHAR(150),
        description     VARCHAR(255),
        metadata        JSON,
        created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id)    REFERENCES users(id) ON DELETE SET NULL,
        FOREIGN KEY (order_id)   REFERENCES orders(id) ON DELETE SET NULL,
        FOREIGN KEY (payment_id) REFERENCES payments(id) ON DELETE SET NULL,
        FOREIGN KEY (wallet_id)  REFERENCES wallets(id) ON DELETE SET NULL
    )`, err => done(err, 'transactions'));

    // â”€â”€ 15. refunds â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    db.query(`CREATE TABLE IF NOT EXISTS refunds (
        id              INT AUTO_INCREMENT PRIMARY KEY,
        refund_ref      VARCHAR(80) UNIQUE NOT NULL,
        payment_id      INT NOT NULL,
        order_id        VARCHAR(50) NOT NULL,
        user_id         INT,
        amount          DECIMAL(10,2) NOT NULL,
        currency        VARCHAR(10) DEFAULT 'ETB',
        method          ENUM('original','wallet','cash') DEFAULT 'original',
        status          ENUM('pending','processing','completed','failed') DEFAULT 'pending',
        reason          ENUM('order_cancelled','payment_error','customer_complaint','duplicate','other') DEFAULT 'other',
        reason_detail   TEXT,
        initiated_by    INT,
        initiated_role  ENUM('admin','system','customer') DEFAULT 'admin',
        gateway_ref     VARCHAR(150),
        processed_at    TIMESTAMP NULL,
        created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (payment_id)   REFERENCES payments(id) ON DELETE CASCADE,
        FOREIGN KEY (order_id)     REFERENCES orders(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id)      REFERENCES users(id) ON DELETE SET NULL,
        FOREIGN KEY (initiated_by) REFERENCES users(id) ON DELETE SET NULL
    )`, err => done(err, 'refunds'));

    // ── 16. password_reset_tokens ─────────────────────────────
    db.query(`CREATE TABLE IF NOT EXISTS password_reset_tokens (
        id         INT AUTO_INCREMENT PRIMARY KEY,
        user_id    INT NOT NULL,
        token      VARCHAR(128) UNIQUE NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        is_used    TINYINT(1) DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )`, err => done(err, 'password_reset_tokens'));
}

function seedDefaultAdmin() {
    // Run DB migrations for existing installations
    const migrations = [
        "ALTER TABLE orders MODIFY payment_method ENUM('cash','telebirr','cbebirr','amole','card','wallet','bank_transfer') DEFAULT 'cash'",
        "ALTER TABLE orders MODIFY payment_status ENUM('pending','awaiting_payment','paid','failed','refunded','cancelled') DEFAULT 'pending'",
        "ALTER TABLE orders MODIFY order_status ENUM('pending','confirmed','preparing','ready','ready_for_pickup','assigned_to_rider','picked_up','out_for_delivery','delivered','cancelled','rejected','failed','failed_delivery','refunded') DEFAULT 'pending'",
        "ALTER TABLE payments MODIFY method ENUM('cash','telebirr','cbebirr','amole','card','wallet','bank_transfer') DEFAULT 'cash'",
        "ALTER TABLE payments MODIFY status ENUM('pending','processing','completed','failed','refunded','cancelled') DEFAULT 'pending'",
        "ALTER TABLE users ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
        "ALTER TABLE orders ADD COLUMN IF NOT EXISTS delivery_address TEXT",
        "ALTER TABLE orders ADD COLUMN IF NOT EXISTS notes TEXT",
        "ALTER TABLE orders ADD COLUMN IF NOT EXISTS coupon_code VARCHAR(50)",
        "ALTER TABLE payments ADD COLUMN IF NOT EXISTS payment_ref VARCHAR(80)",
        "ALTER TABLE payments ADD COLUMN IF NOT EXISTS currency VARCHAR(10) DEFAULT 'ETB'",
        "ALTER TABLE payments ADD COLUMN IF NOT EXISTS gateway_tx_id VARCHAR(150)",
        "ALTER TABLE payments ADD COLUMN IF NOT EXISTS verified_at TIMESTAMP NULL",
        "ALTER TABLE payments ADD COLUMN IF NOT EXISTS refunded_at TIMESTAMP NULL",
        "ALTER TABLE payments ADD COLUMN IF NOT EXISTS refund_reason TEXT",
        "ALTER TABLE payments ADD COLUMN IF NOT EXISTS ip_address VARCHAR(45)",
        "ALTER TABLE transactions ADD COLUMN IF NOT EXISTS payment_id INT",
        "ALTER TABLE transactions ADD COLUMN IF NOT EXISTS wallet_id INT",
        "ALTER TABLE transactions ADD COLUMN IF NOT EXISTS fee DECIMAL(10,2) DEFAULT 0",
        "ALTER TABLE transactions ADD COLUMN IF NOT EXISTS net_amount DECIMAL(12,2)",
        "ALTER TABLE transactions ADD COLUMN IF NOT EXISTS gateway_ref VARCHAR(150)",
        "ALTER TABLE refunds ADD COLUMN IF NOT EXISTS gateway_ref VARCHAR(150)",
        "ALTER TABLE refunds ADD COLUMN IF NOT EXISTS processed_at TIMESTAMP NULL",
        "ALTER TABLE rider_details ADD COLUMN IF NOT EXISTS total_deliveries INT DEFAULT 0",
        "ALTER TABLE rider_details ADD COLUMN IF NOT EXISTS rating DECIMAL(3,2) DEFAULT 5.00",
        "ALTER TABLE order_items ADD COLUMN IF NOT EXISTS item_name VARCHAR(150)",
        "ALTER TABLE order_items ADD COLUMN IF NOT EXISTS unit_price DECIMAL(10,2)",
        "ALTER TABLE order_items ADD COLUMN IF NOT EXISTS total_price DECIMAL(10,2)",
        "ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS description TEXT",
        "ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS cuisine_type VARCHAR(100)",
        "ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS image VARCHAR(255)",
        "ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS rating DECIMAL(3,2) DEFAULT 0.00"
    ];    migrations.forEach(sql => {
        db.query(sql, (err) => {
            if (err && !err.message.includes('Duplicate column') && !err.message.includes('already exists'))
                console.error('Migration warning:', err.message.substring(0, 80));
        });
    });

    const email = 'admin@kochaeats.com';
    db.query('SELECT id FROM users WHERE email = ?', [email], (err, rows) => {
        if (err || rows.length) { seedPaymentConfig(); return; }
        bcrypt.hash('Admin123!', 10, (e, hash) => {
            if (e) return;
            db.query('INSERT INTO users (name,email,phone,password,role) VALUES (?,?,?,?,?)',
                ['Kocha Admin', email, '+251911000000', hash, 'admin'],
                () => { console.log('âœ… Default admin: admin@kochaeats.com / Admin123!'); seedPaymentConfig(); });
        });
    });
}

function seedPaymentConfig() {
    const methods = [
        ['cash',         'Cash on Delivery',  1, 0,   50000, 'fa-money-bill-wave',     'Pay when your order arrives'],
        ['telebirr',     'Telebirr',          1, 10,  50000, 'fa-mobile-alt',          'Pay via Telebirr mobile money'],
        ['cbebirr',      'CBE Birr',          1, 10,  50000, 'fa-university',          'Pay via Commercial Bank of Ethiopia'],
        ['amole',        'Amole',             1, 10,  50000, 'fa-wallet',              'Pay via Dashen Bank Amole'],
        ['card',         'Debit/Credit Card', 1, 50,  50000, 'fa-credit-card',         'Pay with Visa or Mastercard'],
        ['wallet',       'Wallet Balance',    1, 1,   50000, 'fa-coins',               'Pay from your KochaEats wallet'],
        ['bank_transfer','Bank Transfer',     0, 100, 50000, 'fa-building-columns',    'Direct bank transfer'],
    ];
    methods.forEach(([method, label, enabled, min, max, icon, desc]) => {
        db.query('INSERT IGNORE INTO payment_config (method,label,enabled,min_amount,max_amount,icon,description) VALUES (?,?,?,?,?,?,?)',
            [method, label, enabled, min, max, icon, desc], () => {});
    });

    // Seed payment_methods with full metadata
    const pmethods = [
        // code, name, type, provider, icon, enabled, is_default, min, max, fee, fee_type, account_number, account_name, instructions, sort_order
        ['cash',         'Cash on Delivery',   'offline', 'KochaEats',    'fa-money-bill-wave',  1, 1, 0,   50000, 0,    'fixed',   null,            null,           'Pay the rider when your order arrives. Have exact change ready.', 1],
        ['telebirr',     'Telebirr',           'online',  'Ethio Telecom','fa-mobile-alt',        1, 0, 10,  50000, 0,    'fixed',   '0911000000',    'KochaEats',    'Open Telebirr â†’ Send Money â†’ Enter number â†’ Use payment ref as note.', 2],
        ['cbebirr',      'CBE Birr',           'online',  'CBE',          'fa-university',        1, 0, 10,  50000, 0,    'fixed',   '1000123456789', 'KochaEats',    'Open CBE Birr â†’ Transfer â†’ Enter account â†’ Use payment ref.', 3],
        ['amole',        'Amole',              'online',  'Dashen Bank',  'fa-wallet',            1, 0, 10,  50000, 0,    'fixed',   '0922000000',    'KochaEats',    'Open Amole â†’ Pay â†’ Enter number â†’ Use payment ref.', 4],
        ['card',         'Debit / Credit Card','online',  'Stripe/Chapa', 'fa-credit-card',       1, 0, 50,  50000, 2.5,  'percent', null,            null,           'Secure card payment. Visa and Mastercard accepted.', 5],
        ['wallet',       'KochaEats Wallet',   'wallet',  'KochaEats',    'fa-coins',             1, 0, 1,   50000, 0,    'fixed',   null,            null,           'Pay instantly from your KochaEats wallet balance.', 6],
        ['bank_transfer','Bank Transfer',      'online',  'Various',      'fa-building-columns',  0, 0, 100, 50000, 0,    'fixed',   null,            null,           'Direct bank transfer. Contact support for details.', 7],
    ];
    pmethods.forEach(([code, name, type, provider, icon, enabled, is_default, min, max, fee, fee_type, acc_num, acc_name, instructions, sort]) => {
        db.query(`INSERT IGNORE INTO payment_methods
            (code,name,type,provider,icon,enabled,is_default,min_amount,max_amount,processing_fee,fee_type,account_number,account_name,instructions,sort_order)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [code, name, type, provider, icon, enabled, is_default, min, max, fee, fee_type, acc_num, acc_name, instructions, sort], () => {});
    });
    console.log('✅ Payment config & methods seeded');
    seedRestaurants();
}

function seedRestaurants() {
    const restaurants = [
        { id:1, name:'Leul Mekonen Hotel',     cuisine:'Ethiopian, International', address:'Shisha-Ber, Kombolcha',   phone:'+251911000001', image:'kochaEats/images/leul mekonen hotel1.png',   rating:4.7 },
        { id:2, name:'Yegof View Restaurant',  cuisine:'Ethiopian, International', address:'Shewa Ber, Kombolcha',    phone:'+251911000002', image:'kochaEats/images/yegof view hotel.png',       rating:4.5 },
        { id:3, name:'Sunny Said Hotel',        cuisine:'Ethiopian, Fasting',       address:'Shisha-Ber, Kombolcha',   phone:'+251911000003', image:'kochaEats/images/sunny side hotel.png',       rating:4.3 },
        { id:4, name:'Rawdi Mendi Restaurant',  cuisine:'Ethiopian, International', address:'Berbere Wenz, Kombolcha', phone:'+251911000004', image:'kochaEats/images/rawdi mendi restaurant.png', rating:4.6 },
        { id:5, name:'Double Tree Restaurant',  cuisine:'International, Ethiopian', address:'Shisha Ber, Kombolcha',   phone:'+251911000005', image:'kochaEats/images/double tree.png',            rating:4.4 },
        { id:6, name:'Al-Risallah Restaurant',  cuisine:'Ethiopian, Fasting',       address:'Kebele 03, Kombolcha',    phone:'+251911000006', image:'kochaEats/images/al-risallah restaurant.png', rating:4.8 },
    ];
    restaurants.forEach(r => {
        db.query(
            `INSERT INTO restaurants (id,name,cuisine_type,address,phone,image,rating,status)
             VALUES (?,?,?,?,?,?,?,'active')
             ON DUPLICATE KEY UPDATE cuisine_type=VALUES(cuisine_type),image=VALUES(image),rating=VALUES(rating)`,
            [r.id, r.name, r.cuisine, r.address, r.phone, r.image, r.rating], () => {}
        );
    });
    console.log('✅ Restaurants seeded');
}

// â”€â”€ Middleware â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function authenticate(req, res, next) {
    const h = req.headers['authorization'];
    const token = h && h.startsWith('Bearer ') ? h.slice(7) : null;
    if (!token) return res.status(401).json({ success: false, message: 'Authentication required.' });
    try { req.user = jwt.verify(token, JWT_SECRET); next(); }
    catch { return res.status(401).json({ success: false, message: 'Invalid or expired token.' }); }
}
function requireRole(...roles) {
    return (req, res, next) => {
        if (!roles.includes(req.user.role))
            return res.status(403).json({ success: false, message: `Access denied. Required: ${roles.join(' or ')}` });
        next();
    };
}
const hashPw   = pw       => bcrypt.hash(pw, 10);
const checkPw  = (pw, h)  => bcrypt.compare(pw, h);
const signTok  = payload  => jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

// â”€â”€ AUTH ROUTES â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
app.post('/api/register', async (req, res) => {
    const { full_name, name, email, phone, password } = req.body;
    const uname = full_name || name;
    if (!uname || !email || !phone || !password)
        return res.json({ success: false, message: 'All fields are required.' });
    if (password.length < 6)
        return res.json({ success: false, message: 'Password must be at least 6 characters.' });
    try {
        const hash = await hashPw(password);
        db.query('INSERT INTO users (name,email,phone,password,role) VALUES (?,?,?,?,"customer")',
            [uname, email, phone, hash], (err, r) => {
                if (err) return res.json({ success: false, message: 'Email already exists.' });
                const token = signTok({ id: r.insertId, email, role: 'customer', name: uname });
                res.json({ success: true, message: 'Registration successful!', token,
                    data: { user_id: r.insertId, full_name: uname, email, phone, role: 'customer' } });
            });
    } catch { res.json({ success: false, message: 'Server error.' }); }
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.json({ success: false, message: 'Email and password required.' });
    db.query('SELECT * FROM users WHERE email=? AND role="customer"', [email], async (err, rows) => {
        if (err || !rows.length) return res.json({ success: false, message: 'Wrong email or password.' });
        const u = rows[0];
        if (u.status === 'suspended') return res.json({ success: false, message: 'Account suspended.' });
        if (!await checkPw(password, u.password)) return res.json({ success: false, message: 'Wrong email or password.' });
        const token = signTok({ id: u.id, email: u.email, role: u.role, name: u.name });
        res.json({ success: true, message: 'Login successful!', token,
            data: { user_id: u.id, full_name: u.name, email: u.email, phone: u.phone, address: u.address, role: u.role } });
    });
});

app.post('/api/register-rider', async (req, res) => {
    const { full_name, email, phone, password, vehicle_type, vehicle_number, license_number } = req.body;
    if (!full_name || !email || !phone || !password || !vehicle_type || !vehicle_number)
        return res.json({ success: false, message: 'All fields are required.' });
    try {
        const hash = await hashPw(password);
        db.query('INSERT INTO users (name,email,phone,password,role,status) VALUES (?,?,?,?,"rider","pending")',
            [full_name, email, phone, hash], (err, r) => {
                if (err) return res.json({ success: false, message: 'Email already exists.' });
                db.query('INSERT INTO rider_details (user_id,vehicle_type,vehicle_number,license_number) VALUES (?,?,?,?)',
                    [r.insertId, vehicle_type, vehicle_number, license_number || null], () => {});
                res.json({ success: true, message: 'Registration successful! Awaiting admin approval.',
                    data: { rider_id: r.insertId, full_name, email, status: 'pending' } });
            });
    } catch { res.json({ success: false, message: 'Server error.' }); }
});

app.post('/api/login-rider', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.json({ success: false, message: 'Email and password required.' });
    db.query(`SELECT u.*, rd.vehicle_type, rd.vehicle_number, rd.approval_status, rd.total_deliveries, rd.rating AS rider_rating
              FROM users u LEFT JOIN rider_details rd ON rd.user_id=u.id
              WHERE u.email=? AND u.role="rider"`, [email], async (err, rows) => {
        if (err || !rows.length) return res.json({ success: false, message: 'Wrong email or password.' });
        const r = rows[0];
        if (!await checkPw(password, r.password)) return res.json({ success: false, message: 'Wrong email or password.' });
        if (r.approval_status !== 'approved') return res.json({ success: false, message: 'Account pending admin approval.' });
        if (r.status === 'suspended') return res.json({ success: false, message: 'Account suspended.' });
        const token = signTok({ id: r.id, email: r.email, role: 'rider', name: r.name });
        res.json({ success: true, message: 'Login successful!', token,
            data: { rider_id: r.id, full_name: r.name, email: r.email, phone: r.phone,
                    vehicle_type: r.vehicle_type, vehicle_number: r.vehicle_number,
                    total_deliveries: r.total_deliveries, rating: r.rider_rating } });
    });
});

app.post('/api/login-admin', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.json({ success: false, message: 'Email and password required.' });
    db.query('SELECT * FROM users WHERE email=? AND role="admin"', [email], async (err, rows) => {
        if (err || !rows.length) return res.json({ success: false, message: 'Wrong email or password.' });
        const a = rows[0];
        if (!await checkPw(password, a.password)) return res.json({ success: false, message: 'Wrong email or password.' });
        const token = signTok({ id: a.id, email: a.email, role: 'admin', name: a.name });
        res.json({ success: true, message: 'Admin login successful!', token,
            data: { admin_id: a.id, full_name: a.name, email: a.email, phone: a.phone, role: 'admin' } });
    });
});

// â”€â”€ PUBLIC ROUTES â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
app.get('/api/restaurants', (req, res) => {
    db.query('SELECT * FROM restaurants WHERE status="active" ORDER BY name', (err, rows) => {
        if (err) return res.json({ success: false, message: 'DB error.' });
        res.json({ success: true, data: rows });
    });
});
app.get('/api/restaurants/:id', (req, res) => {
    db.query('SELECT * FROM restaurants WHERE id=?', [req.params.id], (err, rows) => {
        if (err || !rows.length) return res.json({ success: false, message: 'Not found.' });
        res.json({ success: true, data: rows[0] });
    });
});
app.get('/api/restaurants/:id/menu', (req, res) => {
    db.query('SELECT * FROM menu_items WHERE restaurant_id=? AND available=1 ORDER BY category,name',
        [req.params.id], (err, rows) => {
            if (err) return res.json({ success: false, message: 'DB error.' });
            res.json({ success: true, data: rows });
        });
});
app.get('/api/reviews/:restaurant_id', (req, res) => {
    db.query(`SELECT r.rating,r.comment,r.created_at,u.name AS customer_name
              FROM reviews r LEFT JOIN users u ON u.id=r.user_id
              WHERE r.restaurant_id=? ORDER BY r.created_at DESC LIMIT 30`,
        [req.params.restaurant_id], (err, rows) => {
            if (err) return res.json({ success: false, message: 'DB error.' });
            res.json({ success: true, data: rows });
        });
});

// â”€â”€ CUSTOMER ROUTES â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
app.get('/api/profile', authenticate, requireRole('customer'), (req, res) => {
    db.query('SELECT id,name,email,phone,address,status,created_at FROM users WHERE id=?',
        [req.user.id], (err, rows) => {
            if (err || !rows.length) return res.json({ success: false, message: 'Not found.' });
            res.json({ success: true, data: rows[0] });
        });
});

app.patch('/api/profile', authenticate, requireRole('customer'), (req, res) => {
    const { name, phone, address } = req.body;
    const fields = [], vals = [];
    if (name)    { fields.push('name=?');    vals.push(name); }
    if (phone)   { fields.push('phone=?');   vals.push(phone); }
    if (address) { fields.push('address=?'); vals.push(address); }
    if (!fields.length) return res.json({ success: false, message: 'Nothing to update.' });
    vals.push(req.user.id);
    db.query(`UPDATE users SET ${fields.join(',')} WHERE id=?`, vals, err => {
        if (err) return res.json({ success: false, message: 'Update failed.' });
        res.json({ success: true, message: 'Profile updated!' });
    });
});

app.post('/api/orders', authenticate, requireRole('customer'), (req, res) => {
    const { id, items, subtotal, delivery_fee, discount, total, payment_method,
            delivery_area, delivery_address, restaurant_id, coupon_code, notes } = req.body;
    if (!id || !items || !total) return res.json({ success: false, message: 'Missing required fields.' });
    const pay_status = payment_method === 'cash' ? 'pending' : 'awaiting_payment';
    const u = req.user;
    db.query(`INSERT INTO orders (id,user_id,restaurant_id,user_name,user_email,user_phone,
              delivery_address,delivery_area,items,subtotal,delivery_fee,discount,total,
              payment_method,payment_status,order_status,coupon_code,notes)
              VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,"pending",?,?)`,
        [id, u.id, restaurant_id||null, u.name, u.email, req.body.user_phone||null,
         delivery_address||null, delivery_area||null, JSON.stringify(items),
         subtotal||0, delivery_fee||0, discount||0, total,
         payment_method||'cash', pay_status, coupon_code||null, notes||null],
        (err) => {
            if (err) {
                console.error('Order INSERT error:', err.message, '| Code:', err.code, '| SQL:', err.sql);
                return res.json({ success: false, message: 'Failed to place order: ' + err.message });
            }
            if (Array.isArray(items)) {
                items.forEach(item => {
                    const qty = item.quantity || 1;
                    const up  = item.price || 0;
                    db.query('INSERT INTO order_items (order_id,item_name,quantity,unit_price,total_price) VALUES (?,?,?,?,?)',
                        [id, item.english||item.name||'Item', qty, up, qty*up], () => {});
                });
            }
            res.json({ success: true, message: 'Order placed!', order_id: id, payment_status: pay_status });
        });
});

app.get('/api/orders', authenticate, requireRole('customer'), (req, res) => {
    const page  = parseInt(req.query.page)  || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    db.query('SELECT * FROM orders WHERE user_id=? ORDER BY created_at DESC LIMIT ? OFFSET ?',
        [req.user.id, limit, offset], (err, rows) => {
            if (err) return res.json({ success: false, message: 'DB error.' });
            db.query('SELECT COUNT(*) AS total FROM orders WHERE user_id=?', [req.user.id], (e, c) => {
                res.json({ success: true, data: rows, total: c?c[0].total:0, page, limit });
            });
        });
});

app.get('/api/orders/:order_id/detail', authenticate, requireRole('customer'), (req, res) => {
    db.query(`SELECT o.*, u2.name AS rider_name, u2.phone AS rider_phone
              FROM orders o LEFT JOIN users u2 ON u2.id=o.rider_id
              WHERE o.id=? AND o.user_id=?`,
        [req.params.order_id, req.user.id], (err, rows) => {
            if (err || !rows.length) return res.json({ success: false, message: 'Order not found.' });
            res.json({ success: true, data: rows[0] });
        });
});

app.post('/api/orders/:order_id/cancel', authenticate, requireRole('customer'), (req, res) => {
    db.query('SELECT id,order_status,user_id FROM orders WHERE id=?', [req.params.order_id], (err, rows) => {
        if (err || !rows.length) return res.json({ success: false, message: 'Order not found.' });
        const o = rows[0];
        if (o.user_id !== req.user.id) return res.status(403).json({ success: false, message: 'Unauthorized.' });
        if (!['pending','confirmed'].includes(o.order_status))
            return res.json({ success: false, message: 'Cannot cancel order at this stage.' });
        db.query('UPDATE orders SET order_status="cancelled",updated_at=NOW() WHERE id=?',
            [req.params.order_id], err2 => {
                if (err2) return res.json({ success: false, message: 'Cancel failed.' });
                res.json({ success: true, message: 'Order cancelled.' });
            });
    });
});

app.post('/api/orders/:order_id/reorder', authenticate, requireRole('customer'), (req, res) => {
    db.query('SELECT * FROM orders WHERE id=? AND user_id=?', [req.params.order_id, req.user.id], (err, rows) => {
        if (err || !rows.length) return res.json({ success: false, message: 'Order not found.' });
        const orig = rows[0];
        const newId = 'ORD-' + Date.now();
        const pay_status = orig.payment_method === 'cash' ? 'pending' : 'awaiting_payment';
        db.query(`INSERT INTO orders (id,user_id,restaurant_id,user_name,user_email,user_phone,
                  delivery_address,delivery_area,items,subtotal,delivery_fee,discount,total,
                  payment_method,payment_status,order_status)
                  VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,"pending")`,
            [newId, req.user.id, orig.restaurant_id, orig.user_name, orig.user_email, orig.user_phone,
             orig.delivery_address, orig.delivery_area, orig.items, orig.subtotal,
             orig.delivery_fee, orig.discount, orig.total, orig.payment_method, pay_status],
            err2 => {
                if (err2) return res.json({ success: false, message: 'Reorder failed.' });
                res.json({ success: true, message: 'Reorder placed!', order_id: newId });
            });
    });
});

app.patch('/api/update-payment-method/:order_id', authenticate, requireRole('customer'), (req, res) => {
    const { payment_method } = req.body;
    const valid = ['cash','telebirr','cbebirr','amole'];
    if (!valid.includes(payment_method)) return res.json({ success: false, message: 'Invalid payment method.' });
    db.query('SELECT user_id,payment_status,order_status FROM orders WHERE id=?', [req.params.order_id], (err, rows) => {
        if (err || !rows.length) return res.json({ success: false, message: 'Order not found.' });
        const o = rows[0];
        if (o.user_id !== req.user.id) return res.status(403).json({ success: false, message: 'Unauthorized.' });
        if (o.payment_status === 'paid') return res.json({ success: false, message: 'Already paid.' });
        const ps = payment_method === 'cash' ? 'pending' : 'awaiting_payment';
        db.query('UPDATE orders SET payment_method=?,payment_status=?,updated_at=NOW() WHERE id=?',
            [payment_method, ps, req.params.order_id], err2 => {
                if (err2) return res.json({ success: false, message: 'Update failed.' });
                res.json({ success: true, message: 'Payment method updated!', payment_status: ps });
            });
    });
});

app.get('/api/cart', authenticate, requireRole('customer'), (req, res) => {
    db.query('SELECT * FROM cart WHERE user_id=? ORDER BY created_at DESC', [req.user.id], (err, rows) => {
        if (err) return res.json({ success: false, message: 'DB error.' });
        res.json({ success: true, data: rows });
    });
});

app.post('/api/cart', authenticate, requireRole('customer'), (req, res) => {
    const { item_name, price, quantity, menu_item_id, restaurant_id } = req.body;
    if (!item_name || !price) return res.json({ success: false, message: 'item_name and price required.' });
    if (menu_item_id) {
        db.query('SELECT id,quantity FROM cart WHERE user_id=? AND menu_item_id=?', [req.user.id, menu_item_id], (err, rows) => {
            if (rows && rows.length) {
                db.query('UPDATE cart SET quantity=quantity+? WHERE id=?', [quantity||1, rows[0].id], () => {});
                return res.json({ success: true, message: 'Cart updated!', cart_id: rows[0].id });
            }
            db.query('INSERT INTO cart (user_id,menu_item_id,item_name,price,quantity,restaurant_id) VALUES (?,?,?,?,?,?)',
                [req.user.id, menu_item_id, item_name, price, quantity||1, restaurant_id||null],
                (e, r) => {
                    if (e) return res.json({ success: false, message: 'Failed to add.' });
                    res.json({ success: true, message: 'Added to cart!', cart_id: r.insertId });
                });
        });
    } else {
        db.query('INSERT INTO cart (user_id,item_name,price,quantity,restaurant_id) VALUES (?,?,?,?,?)',
            [req.user.id, item_name, price, quantity||1, restaurant_id||null],
            (err, r) => {
                if (err) return res.json({ success: false, message: 'Failed to add.' });
                res.json({ success: true, message: 'Added to cart!', cart_id: r.insertId });
            });
    }
});

app.patch('/api/cart/:id', authenticate, requireRole('customer'), (req, res) => {
    const { quantity } = req.body;
    if (!quantity || quantity < 1) return res.json({ success: false, message: 'Invalid quantity.' });
    db.query('UPDATE cart SET quantity=? WHERE id=? AND user_id=?', [quantity, req.params.id, req.user.id], err => {
        if (err) return res.json({ success: false, message: 'Update failed.' });
        res.json({ success: true, message: 'Cart updated.' });
    });
});

app.delete('/api/cart/:id', authenticate, requireRole('customer'), (req, res) => {
    db.query('DELETE FROM cart WHERE id=? AND user_id=?', [req.params.id, req.user.id], err => {
        if (err) return res.json({ success: false, message: 'Delete failed.' });
        res.json({ success: true, message: 'Item removed.' });
    });
});

app.delete('/api/cart', authenticate, requireRole('customer'), (req, res) => {
    db.query('DELETE FROM cart WHERE user_id=?', [req.user.id], err => {
        if (err) return res.json({ success: false, message: 'Clear failed.' });
        res.json({ success: true, message: 'Cart cleared.' });
    });
});

app.post('/api/reviews', authenticate, requireRole('customer'), (req, res) => {
    const { order_id, restaurant_id, rating, comment } = req.body;
    if (!rating || rating < 1 || rating > 5) return res.json({ success: false, message: 'Rating must be 1-5.' });
    if (!order_id) return res.json({ success: false, message: 'order_id required.' });
    db.query('SELECT id FROM orders WHERE id=? AND user_id=? AND order_status="delivered"',
        [order_id, req.user.id], (err, rows) => {
            if (err || !rows.length) return res.json({ success: false, message: 'Order not found or not delivered.' });
            db.query('INSERT INTO reviews (user_id,order_id,restaurant_id,rating,comment) VALUES (?,?,?,?,?)',
                [req.user.id, order_id, restaurant_id||null, rating, comment||null],
                (e, r) => {
                    if (e) return res.json({ success: false, message: 'Already reviewed or DB error.' });
                    if (restaurant_id) {
                        db.query('UPDATE restaurants SET rating=(SELECT AVG(rating) FROM reviews WHERE restaurant_id=?) WHERE id=?',
                            [restaurant_id, restaurant_id], () => {});
                    }
                    res.json({ success: true, message: 'Review submitted!', review_id: r.insertId });
                });
        });
});

app.get('/api/my-reviews', authenticate, requireRole('customer'), (req, res) => {
    db.query(`SELECT rv.*, rs.name AS restaurant_name FROM reviews rv
              LEFT JOIN restaurants rs ON rs.id=rv.restaurant_id
              WHERE rv.user_id=? ORDER BY rv.created_at DESC`, [req.user.id], (err, rows) => {
        if (err) return res.json({ success: false, message: 'DB error.' });
        res.json({ success: true, data: rows });
    });
});



// ============================================================
//  COMPLETE PAYMENT WORKFLOW
//  Data Flow:
//  1. Customer places order  → orders table (status=pending)
//  2. Initiate payment       → payments table (status=processing)
//                            → transactions table (status=pending)  [audit trail starts]
//  3. Gateway processes      → external (Telebirr/Card/etc.)
//  4. Verify / Webhook       → payments.status = completed/failed
//                            → transactions.status = completed/failed
//                            → orders.payment_status = paid/failed
//                            → orders.order_status = confirmed/failed
//  5. COD collection         → rider confirms cash → payments + transactions
//  6. Refund                 → refunds table → payments.status=refunded
//                            → transactions (outflow) → wallet credit if applicable
// ============================================================

function genRef()  { return 'PAY-'+Date.now()+'-'+Math.random().toString(36).slice(2,7).toUpperCase(); }
function txnRef()  { return 'TXN-'+Date.now()+'-'+Math.random().toString(36).slice(2,7).toUpperCase(); }
function rfndRef() { return 'RFD-'+Date.now()+'-'+Math.random().toString(36).slice(2,7).toUpperCase(); }

// Immutable transaction ledger entry — never deleted, append-only
function recordTransaction({ type, direction, user_id, order_id, payment_id, wallet_id,
    amount, fee=0, currency='ETB', method, status='completed', gateway_ref, description, metadata }) {
    const ref = txnRef();
    const net = direction === 'inflow'
        ? parseFloat(amount) - parseFloat(fee)
        : parseFloat(amount) + parseFloat(fee);
    db.query(`INSERT INTO transactions
        (txn_ref,type,direction,user_id,order_id,payment_id,wallet_id,
         amount,fee,net_amount,currency,method,status,gateway_ref,description,metadata)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [ref, type, direction, user_id||null, order_id||null, payment_id||null, wallet_id||null,
         amount, fee, net, currency, method||null, status,
         gateway_ref||null, description||null, metadata ? JSON.stringify(metadata) : null], () => {});
    return ref;
}

// Create refund record
function recordRefund({ payment_id, order_id, user_id, amount, method='original',
    reason='other', reason_detail, initiated_by, initiated_role='admin', gateway_ref }) {
    const ref = rfndRef();
    db.query(`INSERT INTO refunds
        (refund_ref,payment_id,order_id,user_id,amount,method,status,
         reason,reason_detail,initiated_by,initiated_role,gateway_ref)
        VALUES (?,?,?,?,?,?,'pending',?,?,?,?,?)`,
        [ref, payment_id, order_id, user_id||null, amount, method,
         reason, reason_detail||null, initiated_by||null, initiated_role, gateway_ref||null], () => {});
    return ref;
}

// ── STEP 2: Initiate Payment ──────────────────────────────────
app.post('/api/payments/initiate', authenticate, requireRole('customer'), (req, res) => {
    const { order_id, method } = req.body;
    const validMethods = ['cash','telebirr','cbebirr','amole','card','wallet','bank_transfer'];
    if (!order_id || !method)
        return res.json({ success: false, message: 'order_id and method required.' });
    if (!validMethods.includes(method))
        return res.json({ success: false, message: 'Invalid payment method.' });

    db.query('SELECT * FROM orders WHERE id=? AND user_id=?', [order_id, req.user.id], (err, rows) => {
        if (err || !rows.length) return res.json({ success: false, message: 'Order not found.' });
        const order = rows[0];
        if (order.payment_status === 'paid')
            return res.json({ success: false, message: 'Order already paid.' });

        // Idempotency: block duplicate in-progress payments
        db.query('SELECT id,payment_ref FROM payments WHERE order_id=? AND status IN ("pending","processing")',
            [order_id], (e2, existing) => {
                if (existing && existing.length)
                    return res.json({ success: false, message: 'Payment already in progress.', payment_ref: existing[0].payment_ref });

                // Wallet: pre-check balance
                if (method === 'wallet') {
                    return getOrCreateWallet(req.user.id, (ew, wallet) => {
                        if (ew) return res.json({ success: false, message: 'Wallet error.' });
                        if (parseFloat(wallet.balance) < parseFloat(order.total))
                            return res.json({ success: false, message: 'Insufficient wallet balance. Current: ETB '+parseFloat(wallet.balance).toFixed(2) });
                        createPaymentRecord(order, method, req, res);
                    });
                }
                createPaymentRecord(order, method, req, res);
            });
    });
});

function createPaymentRecord(order, method, req, res) {
    const ref        = genRef();
    const ip         = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;
    const initStatus = method === 'cash' ? 'pending' : 'processing';

    // Create payment record (Step 2)
    db.query(`INSERT INTO payments (payment_ref,order_id,user_id,amount,currency,method,status,ip_address)
              VALUES (?,?,?,?,'ETB',?,?,?)`,
        [ref, order.id, req.user.id, order.total, method, initStatus, ip], (e3, r) => {
            if (e3) return res.json({ success: false, message: 'Failed to create payment record.' });
            const paymentId = r.insertId;

            // Update order payment method
            db.query('UPDATE orders SET payment_method=?,payment_status=?,updated_at=NOW() WHERE id=?',
                [method, method==='cash'?'pending':'awaiting_payment', order.id], () => {});

            // Write PENDING transaction to ledger (audit trail)
            recordTransaction({
                type: 'payment', direction: 'inflow',
                user_id: req.user.id, order_id: order.id, payment_id: paymentId,
                amount: order.total, currency: 'ETB', method, status: 'pending',
                description: 'Payment initiated for order #'+order.id
            });

            const base = { success: true, payment_id: paymentId, payment_ref: ref,
                           amount: order.total, currency: 'ETB', method };

            if (method === 'cash') {
                return res.json({ ...base,
                    message: 'Cash on Delivery selected.',
                    instructions: 'Have ETB '+order.total+' ready when the rider arrives.',
                    next_step: 'await_delivery'
                });
            }

            if (method === 'wallet') {
                return processWalletPayment(order, paymentId, ref, req, res, base);
            }

            const accounts = {
                telebirr:     { num:'0911000000',         name:'KochaEats Telebirr' },
                cbebirr:      { num:'1000123456789',      name:'KochaEats CBE' },
                amole:        { num:'0922000000',         name:'KochaEats Amole' },
                bank_transfer:{ num:'1000-0000-0000-0001',name:'KochaEats Bank' }
            };
            if (accounts[method]) {
                const acc = accounts[method];
                return res.json({ ...base,
                    message: method.toUpperCase()+' payment initiated.',
                    account_number: acc.num, account_name: acc.name, reference: ref,
                    steps: [
                        'Open your '+method+' app',
                        'Send ETB '+order.total+' to: '+acc.num+' ('+acc.name+')',
                        'Use reference in note: '+ref,
                        'Submit your Transaction ID below to confirm'
                    ],
                    next_step: 'verify'
                });
            }

            if (method === 'card') {
                const sessionId = 'SIM-CARD-'+Date.now();
                db.query('UPDATE payments SET gateway_tx_id=? WHERE id=?', [sessionId, paymentId], () => {});
                return res.json({ ...base,
                    message: 'Card payment session created.',
                    session_id: sessionId,
                    payment_url: '/payment.html?ref='+ref+'&order='+order.id,
                    next_step: 'redirect'
                });
            }

            res.json({ ...base, message: 'Payment initiated.' });
        });
}

// Wallet: immediate payment, no external gateway
function processWalletPayment(order, paymentId, ref, req, res, base) {
    getOrCreateWallet(req.user.id, (ew, wallet) => {
        if (ew) return res.json({ success: false, message: 'Wallet error.' });
        const newBalance = parseFloat(wallet.balance) - parseFloat(order.total);

        db.query('UPDATE wallets SET balance=?,updated_at=NOW() WHERE id=?', [newBalance, wallet.id], (e4) => {
            if (e4) return res.json({ success: false, message: 'Wallet deduction failed.' });

            // Mark payment completed
            db.query('UPDATE payments SET status="completed",verified_at=NOW(),updated_at=NOW() WHERE id=?', [paymentId], () => {});

            // Update order
            db.query('UPDATE orders SET payment_status="paid",order_status="confirmed",updated_at=NOW() WHERE id=?', [order.id], () => {});

            // Wallet transaction record
            db.query('INSERT INTO wallet_transactions (wallet_id,user_id,type,amount,balance_after,order_id,description) VALUES (?,?,?,?,?,?,?)',
                [wallet.id, req.user.id, 'debit', order.total, newBalance, order.id, 'Payment for order #'+order.id], () => {});

            // Completed transaction in ledger
            recordTransaction({
                type: 'payment', direction: 'inflow',
                user_id: req.user.id, order_id: order.id, payment_id: paymentId, wallet_id: wallet.id,
                amount: order.total, currency: 'ETB', method: 'wallet', status: 'completed',
                description: 'Wallet payment for order #'+order.id
            });

            res.json({ ...base,
                message: 'Wallet payment successful! Order confirmed.',
                new_wallet_balance: newBalance, order_status: 'confirmed'
            });
        });
    });
}

// ── STEP 4a: Verify (Mobile Money) ───────────────────────────
app.post('/api/payments/verify', authenticate, requireRole('customer'), (req, res) => {
    const { payment_ref, gateway_tx_id } = req.body;
    if (!payment_ref || !gateway_tx_id)
        return res.json({ success: false, message: 'payment_ref and gateway_tx_id required.' });

    db.query('SELECT * FROM payments WHERE payment_ref=? AND user_id=?', [payment_ref, req.user.id], (err, rows) => {
        if (err || !rows.length) return res.json({ success: false, message: 'Payment not found.' });
        const pay = rows[0];
        if (pay.status === 'completed') return res.json({ success: false, message: 'Payment already verified.' });
        if (pay.status === 'failed')    return res.json({ success: false, message: 'Payment failed. Please retry.' });

        // Idempotency: prevent duplicate gateway_tx_id
        db.query('SELECT id FROM payments WHERE gateway_tx_id=? AND id!=?', [gateway_tx_id, pay.id], (e2, dup) => {
            if (dup && dup.length)
                return res.json({ success: false, message: 'This transaction ID has already been used.' });

            db.query('UPDATE payments SET status="completed",gateway_tx_id=?,verified_at=NOW(),updated_at=NOW() WHERE id=?',
                [gateway_tx_id, pay.id], (e3) => {
                    if (e3) return res.json({ success: false, message: 'Verification failed.' });

                    db.query('UPDATE orders SET payment_status="paid",order_status="confirmed",updated_at=NOW() WHERE id=?', [pay.order_id], () => {});

                    recordTransaction({
                        type: 'payment', direction: 'inflow',
                        user_id: pay.user_id, order_id: pay.order_id, payment_id: pay.id,
                        amount: pay.amount, currency: pay.currency||'ETB', method: pay.method,
                        status: 'completed', gateway_ref: gateway_tx_id,
                        description: 'Verified payment for order #'+pay.order_id
                    });

                    res.json({ success: true, message: 'Payment verified! Order confirmed.',
                        payment_ref, order_id: pay.order_id, order_status: 'confirmed' });
                });
        });
    });
});

// ── STEP 4b: Webhook (Gateway Callback) ──────────────────────
app.post('/api/payments/webhook', (req, res) => {
    const { payment_ref, status, gateway_tx_id, gateway_secret } = req.body;
    if (gateway_secret !== 'kochaeats_webhook_secret_2025')
        return res.status(403).json({ success: false, message: 'Invalid webhook secret.' });
    if (!payment_ref || !status)
        return res.status(400).json({ success: false, message: 'Missing fields.' });

    const newStatus = status==='success'?'completed': status==='failed'?'failed':'cancelled';

    db.query('SELECT * FROM payments WHERE payment_ref=?', [payment_ref], (err, rows) => {
        if (err || !rows.length) return res.status(404).json({ success: false });
        const pay = rows[0];
        if (pay.status === 'completed') return res.json({ success: true, message: 'Already processed.' });

        const verifiedClause = newStatus==='completed' ? 'verified_at=NOW(),' : '';
        db.query('UPDATE payments SET status=?,gateway_tx_id=?,gateway_response=?,'+verifiedClause+'updated_at=NOW() WHERE payment_ref=?',
            [newStatus, gateway_tx_id||null, JSON.stringify(req.body), payment_ref], (e2) => {
                if (e2) return res.status(500).json({ success: false });

                if (newStatus === 'completed') {
                    db.query('UPDATE orders SET payment_status="paid",order_status="confirmed",updated_at=NOW() WHERE id=?', [pay.order_id], () => {});
                } else {
                    db.query('UPDATE orders SET payment_status="failed",updated_at=NOW() WHERE id=?', [pay.order_id], () => {});
                    db.query('UPDATE payments SET retry_count=retry_count+1 WHERE id=?', [pay.id], () => {});
                }

                recordTransaction({
                    type: 'payment', direction: 'inflow',
                    user_id: pay.user_id, order_id: pay.order_id, payment_id: pay.id,
                    amount: pay.amount, currency: pay.currency||'ETB', method: pay.method,
                    status: newStatus==='completed'?'completed':'failed',
                    gateway_ref: gateway_tx_id,
                    description: 'Webhook '+newStatus+' for order #'+pay.order_id,
                    metadata: req.body
                });

                console.log('Webhook:', payment_ref, '->', newStatus);
                res.json({ success: true });
            });
    });
});

// Payment status polling
app.get('/api/payments/status/:ref', authenticate, requireRole('customer'), (req, res) => {
    db.query(`SELECT p.*,o.order_status,o.total AS order_total FROM payments p
              LEFT JOIN orders o ON o.id=p.order_id WHERE p.payment_ref=? AND p.user_id=?`,
        [req.params.ref, req.user.id], (err, rows) => {
            if (err || !rows.length) return res.json({ success: false, message: 'Payment not found.' });
            res.json({ success: true, data: rows[0] });
        });
});

// Payment page data
app.get('/api/payments/page-data/:order_id', authenticate, requireRole('customer'), (req, res) => {
    db.query('SELECT * FROM orders WHERE id=? AND user_id=?', [req.params.order_id, req.user.id], (err, rows) => {
        if (err || !rows.length) return res.json({ success: false, message: 'Order not found.' });
        const order = rows[0];
        db.query('SELECT * FROM payments WHERE order_id=? ORDER BY created_at DESC LIMIT 1', [order.id], (e2, pays) => {
            db.query('SELECT * FROM payment_methods WHERE enabled=1 ORDER BY sort_order', (e3, methods) => {
                res.json({ success: true, order, existing_payment: pays&&pays.length?pays[0]:null, payment_methods: methods||[] });
            });
        });
    });
});

// Customer payment history
app.get('/api/payments', authenticate, requireRole('customer'), (req, res) => {
    db.query(`SELECT p.*,o.order_status,
              (SELECT COUNT(*) FROM transactions t WHERE t.payment_id=p.id) AS txn_count
              FROM payments p LEFT JOIN orders o ON o.id=p.order_id
              WHERE p.user_id=? ORDER BY p.created_at DESC`,
        [req.user.id], (err, rows) => {
            if (err) return res.json({ success: false, message: 'DB error.' });
            res.json({ success: true, data: rows });
        });
});

// Legacy payment record
app.post('/api/payments', authenticate, requireRole('customer'), (req, res) => {
    const { order_id, amount, method, reference } = req.body;
    if (!order_id || !amount) return res.json({ success: false, message: 'order_id and amount required.' });
    db.query('SELECT id FROM orders WHERE id=? AND user_id=?', [order_id, req.user.id], (err, rows) => {
        if (err || !rows.length) return res.json({ success: false, message: 'Order not found.' });
        const ref = genRef();
        db.query('INSERT INTO payments (payment_ref,order_id,user_id,amount,method,status,gateway_tx_id) VALUES (?,?,?,?,?,"completed",?)',
            [ref, order_id, req.user.id, amount, method||'cash', reference||null], (e, r) => {
                if (e) return res.json({ success: false, message: 'Payment failed.' });
                db.query('UPDATE orders SET payment_status="paid",updated_at=NOW() WHERE id=?', [order_id], () => {});
                recordTransaction({ type:'payment', direction:'inflow', user_id:req.user.id, order_id, payment_id:r.insertId, amount, method:method||'cash', status:'completed', gateway_ref:reference, description:'Manual payment for order #'+order_id });
                res.json({ success: true, message: 'Payment recorded!', payment_id: r.insertId, payment_ref: ref });
            });
    });
});

// Admin refund via payment ID
app.post('/api/payments/:id/refund', authenticate, requireRole('admin'), (req, res) => {
    const { reason, reason_type } = req.body;
    db.query('SELECT * FROM payments WHERE id=?', [req.params.id], (err, rows) => {
        if (err || !rows.length) return res.json({ success: false, message: 'Payment not found.' });
        const pay = rows[0];
        if (pay.status !== 'completed')
            return res.json({ success: false, message: 'Only completed payments can be refunded.' });
        db.query('UPDATE payments SET status="refunded",refunded_at=NOW(),refund_reason=?,updated_at=NOW() WHERE id=?',
            [reason||'Admin refund', pay.id], (e2) => {
                if (e2) return res.json({ success: false, message: 'Refund failed.' });
                db.query('UPDATE orders SET payment_status="refunded",order_status="cancelled",updated_at=NOW() WHERE id=?', [pay.order_id], () => {});
                const rfRef = recordRefund({ payment_id:pay.id, order_id:pay.order_id, user_id:pay.user_id, amount:pay.amount, method:'original', reason:reason_type||'other', reason_detail:reason||'Admin refund', initiated_by:req.user.id, initiated_role:'admin' });
                db.query('UPDATE refunds SET status="completed",processed_at=NOW() WHERE refund_ref=?', [rfRef], () => {});
                recordTransaction({ type:'refund', direction:'outflow', user_id:pay.user_id, order_id:pay.order_id, payment_id:pay.id, amount:pay.amount, currency:pay.currency||'ETB', method:pay.method, status:'completed', description:'Admin refund for order #'+pay.order_id });
                res.json({ success: true, message: 'Refund processed.', payment_ref: pay.payment_ref, refund_ref: rfRef });
            });
    });
});

// Admin payments analytics
app.get('/api/admin/payments/analytics', authenticate, requireRole('admin'), (req, res) => {
    const q = (sql, p=[]) => new Promise(resolve => db.query(sql, p, (e,r) => resolve(r||[])));
    Promise.all([
        q('SELECT COUNT(*) AS v FROM payments'),
        q('SELECT COUNT(*) AS v FROM payments WHERE status="completed"'),
        q('SELECT COUNT(*) AS v FROM payments WHERE status="failed"'),
        q('SELECT COUNT(*) AS v FROM payments WHERE status="refunded"'),
        q('SELECT COALESCE(SUM(amount),0) AS v FROM payments WHERE status="completed"'),
        q('SELECT method, COUNT(*) AS count FROM payments GROUP BY method ORDER BY count DESC'),
        q('SELECT DATE(created_at) AS day, COALESCE(SUM(amount),0) AS revenue, COUNT(*) AS txns FROM payments WHERE status="completed" AND created_at>=DATE_SUB(NOW(),INTERVAL 30 DAY) GROUP BY day ORDER BY day DESC')
    ]).then(([total,success,failed,refunded,revenue,byMethod,daily]) => {
        const t=total[0]?.v||0, s=success[0]?.v||0;
        res.json({ success: true, data: { total_transactions:t, successful:s, failed:failed[0]?.v||0, refunded:refunded[0]?.v||0, total_revenue:revenue[0]?.v||0, success_rate:t>0?((s/t)*100).toFixed(1)+'%':'0%', by_method:byMethod, daily_revenue:daily }});
    });
});


// placeholders


// ============================================================
//  WALLET SYSTEM
// ============================================================
function getOrCreateWallet(userId, cb) {
    db.query('SELECT * FROM wallets WHERE user_id=?', [userId], (err, rows) => {
        if (err) return cb(err);
        if (rows.length) return cb(null, rows[0]);
        db.query('INSERT INTO wallets (user_id,balance) VALUES (?,0)', [userId], (e2, r) => {
            if (e2) return cb(e2);
            cb(null, { id: r.insertId, user_id: userId, balance: 0, currency: 'ETB', status: 'active' });
        });
    });
}

app.get('/api/wallet', authenticate, requireRole('customer'), (req, res) => {
    getOrCreateWallet(req.user.id, (err, wallet) => {
        if (err) return res.json({ success: false, message: 'DB error.' });
        db.query('SELECT * FROM wallet_transactions WHERE user_id=? ORDER BY created_at DESC LIMIT 20', [req.user.id], (e2, txns) => {
            res.json({ success: true, data: { ...wallet, transactions: txns || [] } });
        });
    });
});

app.post('/api/wallet/topup', authenticate, requireRole('customer'), (req, res) => {
    const { amount, method, reference } = req.body;
    if (!amount || amount <= 0) return res.json({ success: false, message: 'Invalid amount.' });
    if (amount > 10000) return res.json({ success: false, message: 'Max top-up is ETB 10,000.' });
    getOrCreateWallet(req.user.id, (err, wallet) => {
        if (err) return res.json({ success: false, message: 'DB error.' });
        const newBalance = parseFloat(wallet.balance) + parseFloat(amount);
        db.query('UPDATE wallets SET balance=?,updated_at=NOW() WHERE id=?', [newBalance, wallet.id], (e2) => {
            if (e2) return res.json({ success: false, message: 'Top-up failed.' });
            db.query('INSERT INTO wallet_transactions (wallet_id,user_id,type,amount,balance_after,reference,description) VALUES (?,?,?,?,?,?,?)',
                [wallet.id, req.user.id, 'credit', amount, newBalance, reference||null, 'Wallet top-up via '+(method||'unknown')], () => {});
            recordTransaction({ type:'topup', direction:'inflow', user_id:req.user.id, wallet_id:wallet.id, amount, currency:'ETB', method:method||'unknown', status:'completed', gateway_ref:reference, description:'Wallet top-up' });
            res.json({ success: true, message: 'Wallet topped up!', new_balance: newBalance });
        });
    });
});

app.post('/api/wallet/pay', authenticate, requireRole('customer'), (req, res) => {
    const { order_id, amount } = req.body;
    if (!order_id || !amount) return res.json({ success: false, message: 'order_id and amount required.' });
    db.query('SELECT * FROM orders WHERE id=? AND user_id=?', [order_id, req.user.id], (err, orders) => {
        if (err || !orders.length) return res.json({ success: false, message: 'Order not found.' });
        const order = orders[0];
        if (order.payment_status === 'paid') return res.json({ success: false, message: 'Already paid.' });
        getOrCreateWallet(req.user.id, (e2, wallet) => {
            if (e2) return res.json({ success: false, message: 'Wallet error.' });
            if (parseFloat(wallet.balance) < parseFloat(amount))
                return res.json({ success: false, message: 'Insufficient wallet balance. Current: ETB '+parseFloat(wallet.balance).toFixed(2) });
            const newBalance = parseFloat(wallet.balance) - parseFloat(amount);
            db.query('UPDATE wallets SET balance=?,updated_at=NOW() WHERE id=?', [newBalance, wallet.id], (e3) => {
                if (e3) return res.json({ success: false, message: 'Payment failed.' });
                const ref = genRef();
                db.query('INSERT INTO payments (payment_ref,order_id,user_id,amount,method,status,verified_at) VALUES (?,?,?,?,"wallet","completed",NOW())',
                    [ref, order_id, req.user.id, amount], (e4, r) => {
                        db.query('INSERT INTO wallet_transactions (wallet_id,user_id,type,amount,balance_after,order_id,description) VALUES (?,?,?,?,?,?,?)',
                            [wallet.id, req.user.id, 'debit', amount, newBalance, order_id, 'Payment for order #'+order_id], () => {});
                        db.query('UPDATE orders SET payment_status="paid",payment_method="wallet",order_status="confirmed",updated_at=NOW() WHERE id=?', [order_id], () => {});
                        recordTransaction({ type:'payment', direction:'inflow', user_id:req.user.id, order_id, payment_id:r?r.insertId:null, wallet_id:wallet.id, amount, currency:'ETB', method:'wallet', status:'completed', description:'Wallet payment for order #'+order_id });
                        res.json({ success: true, message: 'Payment successful!', new_balance: newBalance, payment_ref: ref });
                    });
            });
        });
    });
});

// ============================================================
//  PAYMENT CONFIG
// ============================================================
app.get('/api/payment-methods', (req, res) => {
    db.query('SELECT * FROM payment_config ORDER BY enabled DESC, method', (err, rows) => {
        if (err) return res.json({ success: false, message: 'DB error.' });
        res.json({ success: true, data: rows });
    });
});

app.patch('/api/admin/payment-config/:method/toggle', authenticate, requireRole('admin'), (req, res) => {
    db.query('UPDATE payment_config SET enabled=NOT enabled, updated_by=? WHERE method=?', [req.user.id, req.params.method], (err) => {
        if (err) return res.json({ success: false, message: 'Update failed.' });
        res.json({ success: true, message: 'Payment method toggled.' });
    });
});

app.patch('/api/admin/payment-config/:method', authenticate, requireRole('admin'), (req, res) => {
    const { enabled, min_amount, max_amount, label, description } = req.body;
    const fields = [], vals = [];
    if (enabled !== undefined) { fields.push('enabled=?'); vals.push(enabled ? 1 : 0); }
    if (min_amount !== undefined) { fields.push('min_amount=?'); vals.push(min_amount); }
    if (max_amount !== undefined) { fields.push('max_amount=?'); vals.push(max_amount); }
    if (label) { fields.push('label=?'); vals.push(label); }
    if (description) { fields.push('description=?'); vals.push(description); }
    if (!fields.length) return res.json({ success: false, message: 'Nothing to update.' });
    fields.push('updated_by=?'); vals.push(req.user.id);
    vals.push(req.params.method);
    db.query('UPDATE payment_config SET '+fields.join(',')+' WHERE method=?', vals, (err) => {
        if (err) return res.json({ success: false, message: 'Update failed.' });
        res.json({ success: true, message: 'Payment config updated.' });
    });
});

// ============================================================
//  ORDER STATUS LIFECYCLE
// ============================================================
const STATUS_TRANSITIONS = {
    customer:   { pending: ['cancelled'] },
    restaurant: { pending: ['confirmed','rejected'], confirmed: ['preparing'], preparing: ['ready_for_pickup'] },
    rider:      { ready_for_pickup: ['picked_up'], assigned_to_rider: ['picked_up'], picked_up: ['out_for_delivery'], out_for_delivery: ['delivered','failed_delivery'] },
    admin:      { '*': ['pending','confirmed','preparing','ready_for_pickup','assigned_to_rider','picked_up','out_for_delivery','delivered','cancelled','rejected','failed','failed_delivery','refunded'] }
};

app.patch('/api/orders/:order_id/status', authenticate, (req, res) => {
    const { order_status } = req.body;
    const role = req.user.role;
    if (!order_status) return res.json({ success: false, message: 'order_status required.' });
    db.query('SELECT * FROM orders WHERE id=?', [req.params.order_id], (err, rows) => {
        if (err || !rows.length) return res.json({ success: false, message: 'Order not found.' });
        const order = rows[0];
        if (role === 'customer' && order.user_id !== req.user.id) return res.status(403).json({ success: false, message: 'Not your order.' });
        if (role === 'rider' && order.rider_id !== req.user.id) return res.status(403).json({ success: false, message: 'Not assigned to you.' });
        if (role !== 'admin') {
            const allowed = STATUS_TRANSITIONS[role]?.[order.order_status] || [];
            if (!allowed.includes(order_status))
                return res.json({ success: false, message: 'Invalid transition: '+order.order_status+' -> '+order_status+' for role '+role });
        }
        let extra = '';
        if (order_status === 'delivered') { extra = ', payment_status=IF(payment_method="cash","paid",payment_status)'; if (order.rider_id) db.query('UPDATE rider_details SET total_deliveries=total_deliveries+1 WHERE user_id=?', [order.rider_id], () => {}); }
        if (order_status === 'cancelled' || order_status === 'rejected') extra = ', payment_status=IF(payment_status="paid","refunded",payment_status)';
        if (order_status === 'confirmed') extra = ', payment_status=IF(payment_method!="cash","paid",payment_status)';
        db.query('UPDATE orders SET order_status=?'+extra+',updated_at=NOW() WHERE id=?', [order_status, req.params.order_id], (e2) => {
            if (e2) return res.json({ success: false, message: 'Update failed.' });
            res.json({ success: true, message: 'Order status updated to '+order_status, order_id: req.params.order_id, order_status });
        });
    });
});

// ── RIDER ROUTES ──────────────────────────────────────────────
app.get('/api/rider/stats', authenticate, requireRole('rider'), (req, res) => {
    const id = req.user.id;
    db.query('SELECT COUNT(*) AS total FROM orders WHERE rider_id=? AND order_status="delivered"', [id], (e1, r1) => {
        db.query('SELECT COUNT(*) AS active FROM orders WHERE rider_id=? AND order_status="out_for_delivery"', [id], (e2, r2) => {
            db.query('SELECT COALESCE(SUM(total),0) AS earnings FROM orders WHERE rider_id=? AND order_status="delivered"', [id], (e3, r3) => {
                db.query('SELECT rating FROM rider_details WHERE user_id=?', [id], (e4, r4) => {
                    res.json({ success: true, data: { total_deliveries: r1?r1[0].total:0, active_deliveries: r2?r2[0].active:0, total_earnings: r3?r3[0].earnings:0, rating: r4&&r4.length?r4[0].rating:5.0 }});
                });
            });
        });
    });
});

app.get('/api/rider/orders/available', authenticate, requireRole('rider'), (req, res) => {
    db.query('SELECT o.*,r.name AS restaurant_name FROM orders o LEFT JOIN restaurants r ON r.id=o.restaurant_id WHERE o.order_status="ready_for_pickup" AND o.rider_id IS NULL ORDER BY o.created_at ASC', (err, rows) => {
        if (err) return res.json({ success: false, message: 'DB error.' });
        res.json({ success: true, data: rows });
    });
});

app.get('/api/rider/orders', authenticate, requireRole('rider'), (req, res) => {
    const status = req.query.status;
    let sql = 'SELECT o.*,r.name AS restaurant_name FROM orders o LEFT JOIN restaurants r ON r.id=o.restaurant_id WHERE o.rider_id=?';
    const params = [req.user.id];
    if (status) { sql += ' AND o.order_status=?'; params.push(status); }
    sql += ' ORDER BY o.created_at DESC';
    db.query(sql, params, (err, rows) => {
        if (err) return res.json({ success: false, message: 'DB error.' });
        res.json({ success: true, data: rows });
    });
});

app.patch('/api/rider/orders/:order_id/accept', authenticate, requireRole('rider'), (req, res) => {
    db.query('SELECT id,order_status,rider_id FROM orders WHERE id=?', [req.params.order_id], (err, rows) => {
        if (err || !rows.length) return res.json({ success: false, message: 'Order not found.' });
        const o = rows[0];
        if (o.order_status !== 'ready_for_pickup') return res.json({ success: false, message: 'Order not ready for pickup.' });
        if (o.rider_id) return res.json({ success: false, message: 'Order already assigned.' });
        db.query('UPDATE orders SET rider_id=?,order_status="out_for_delivery",updated_at=NOW() WHERE id=?', [req.user.id, req.params.order_id], err2 => {
            if (err2) return res.json({ success: false, message: 'Accept failed.' });
            res.json({ success: true, message: 'Order accepted! Start delivery.' });
        });
    });
});

app.patch('/api/rider/orders/:order_id/status', authenticate, requireRole('rider'), (req, res) => {
    const { order_status } = req.body;
    const allowed = ['picked_up','out_for_delivery','delivered','failed_delivery'];
    if (!allowed.includes(order_status)) return res.json({ success: false, message: 'Invalid status.' });
    db.query('SELECT * FROM orders WHERE id=?', [req.params.order_id], (err, rows) => {
        if (err || !rows.length) return res.json({ success: false, message: 'Order not found.' });
        const order = rows[0];
        if (order.rider_id !== req.user.id) return res.status(403).json({ success: false, message: 'Not your order.' });
        const riderTransitions = STATUS_TRANSITIONS.rider;
        const allowed2 = riderTransitions[order.order_status] || [];
        if (!allowed2.includes(order_status)) return res.json({ success: false, message: 'Invalid transition: '+order.order_status+' -> '+order_status });
        const extra = order_status === 'delivered' ? ', payment_status=IF(payment_method="cash","paid",payment_status)' : '';
        db.query('UPDATE orders SET order_status=?'+extra+',updated_at=NOW() WHERE id=?', [order_status, req.params.order_id], err2 => {
            if (err2) return res.json({ success: false, message: 'Update failed.' });
            if (order_status === 'delivered') db.query('UPDATE rider_details SET total_deliveries=total_deliveries+1 WHERE user_id=?', [req.user.id], () => {});
            res.json({ success: true, message: 'Order marked '+order_status+'.', order_status });
        });
    });
});

app.get('/api/rider/orders/:order_id/contact', authenticate, requireRole('rider'), (req, res) => {
    db.query('SELECT user_name,user_phone,delivery_area,delivery_address FROM orders WHERE id=? AND rider_id=?', [req.params.order_id, req.user.id], (err, rows) => {
        if (err || !rows.length) return res.json({ success: false, message: 'Not found.' });
        res.json({ success: true, data: rows[0] });
    });
});

app.get('/api/rider/profile', authenticate, requireRole('rider'), (req, res) => {
    db.query('SELECT u.id,u.name,u.email,u.phone,u.status,rd.vehicle_type,rd.vehicle_number,rd.license_number,rd.approval_status,rd.total_deliveries,rd.rating FROM users u LEFT JOIN rider_details rd ON rd.user_id=u.id WHERE u.id=?', [req.user.id], (err, rows) => {
        if (err || !rows.length) return res.json({ success: false, message: 'Not found.' });
        res.json({ success: true, data: rows[0] });
    });
});

app.get('/api/rider/earnings', authenticate, requireRole('rider'), (req, res) => {
    const targetDate = req.query.date || new Date().toISOString().slice(0,10);
    db.query('SELECT COUNT(*) AS deliveries, COALESCE(SUM(total),0) AS total_value, COALESCE(SUM(CASE WHEN payment_method="cash" THEN total ELSE 0 END),0) AS cash_collected, COALESCE(SUM(CASE WHEN payment_method!="cash" THEN total ELSE 0 END),0) AS online_value FROM orders WHERE rider_id=? AND order_status="delivered" AND DATE(updated_at)=?',
        [req.user.id, targetDate], (err, rows) => {
            if (err) return res.json({ success: false, message: 'DB error.' });
            res.json({ success: true, data: { date: targetDate, ...rows[0] } });
        });
});

// ============================================================
//  ADMIN ROUTES
// ============================================================
app.get('/api/admin/stats', authenticate, requireRole('admin'), (req, res) => {
    const today = new Date().toISOString().slice(0,10);
    const s = {};
    db.query('SELECT COUNT(*) AS v FROM orders', (e,r) => { s.total_orders=r?r[0].v:0;
    db.query('SELECT COUNT(*) AS v FROM orders WHERE order_status NOT IN ("delivered","cancelled","failed")', (e,r) => { s.active_orders=r?r[0].v:0;
    db.query('SELECT COUNT(*) AS v FROM orders WHERE DATE(created_at)=?', [today], (e,r) => { s.today_orders=r?r[0].v:0;
    db.query('SELECT COUNT(*) AS v FROM users WHERE role="customer"', (e,r) => { s.total_customers=r?r[0].v:0;
    db.query('SELECT COUNT(*) AS v FROM users WHERE role="rider"', (e,r) => { s.total_riders=r?r[0].v:0;
    db.query('SELECT COUNT(*) AS v FROM restaurants WHERE status="active"', (e,r) => { s.total_restaurants=r?r[0].v:0;
    db.query('SELECT COALESCE(SUM(total),0) AS v FROM orders WHERE payment_status="paid"', (e,r) => { s.total_revenue=r?r[0].v:0;
    db.query('SELECT COALESCE(SUM(total),0) AS v FROM orders WHERE payment_status="paid" AND DATE(created_at)=?', [today], (e,r) => { s.today_revenue=r?r[0].v:0;
    db.query('SELECT COUNT(*) AS v FROM orders WHERE payment_status IN ("pending","awaiting_payment")', (e,r) => { s.pending_payments=r?r[0].v:0;
        res.json({ success: true, data: s });
    }); }); }); }); }); }); }); }); });
});

app.get('/api/admin/revenue', authenticate, requireRole('admin'), (req, res) => {
    const { period, from, to } = req.query;
    let sql = period==='monthly'
        ? 'SELECT DATE_FORMAT(created_at,"%Y-%m") AS period, COUNT(*) AS orders_count, COALESCE(SUM(total),0) AS revenue FROM orders WHERE payment_status="paid"'
        : 'SELECT DATE(created_at) AS period, COUNT(*) AS orders_count, COALESCE(SUM(total),0) AS revenue FROM orders WHERE payment_status="paid"';
    const params = [];
    if (from) { sql += ' AND DATE(created_at)>=?'; params.push(from); }
    if (to)   { sql += ' AND DATE(created_at)<=?'; params.push(to); }
    sql += ' GROUP BY period ORDER BY period DESC LIMIT 60';
    db.query(sql, params, (err, rows) => {
        if (err) return res.json({ success: false, message: 'DB error.' });
        const total_revenue = rows.reduce((s,r)=>s+parseFloat(r.revenue||0),0);
        const total_orders  = rows.reduce((s,r)=>s+parseInt(r.orders_count||0),0);
        res.json({ success: true, data: rows, total_revenue, total_orders });
    });
});

app.get('/api/admin/users', authenticate, requireRole('admin'), (req, res) => {
    const { role, status, search } = req.query;
    let sql = 'SELECT u.id,u.name,u.email,u.phone,u.role,u.status,u.created_at,rd.approval_status,rd.vehicle_type,rd.vehicle_number FROM users u LEFT JOIN rider_details rd ON rd.user_id=u.id WHERE 1=1';
    const p = [];
    if (role)   { sql += ' AND u.role=?';   p.push(role); }
    if (status) { sql += ' AND u.status=?'; p.push(status); }
    if (search) { sql += ' AND (u.name LIKE ? OR u.email LIKE ?)'; p.push('%'+search+'%','%'+search+'%'); }
    sql += ' ORDER BY u.created_at DESC';
    db.query(sql, p, (err, rows) => {
        if (err) return res.json({ success: false, message: 'DB error.' });
        res.json({ success: true, data: rows, count: rows.length });
    });
});

app.patch('/api/admin/users/:id/status', authenticate, requireRole('admin'), (req, res) => {
    const { status } = req.body;
    if (!['active','suspended'].includes(status)) return res.json({ success: false, message: 'Invalid status.' });
    db.query('UPDATE users SET status=? WHERE id=?', [status, req.params.id], err => {
        if (err) return res.json({ success: false, message: 'Update failed.' });
        res.json({ success: true, message: 'User '+status+'.' });
    });
});

app.get('/api/admin/orders', authenticate, requireRole('admin'), (req, res) => {
    const { status, payment_status, from, to, search } = req.query;
    let sql = 'SELECT o.*,u.name AS customer_name,u2.name AS rider_name,r.name AS restaurant_name FROM orders o LEFT JOIN users u ON u.id=o.user_id LEFT JOIN users u2 ON u2.id=o.rider_id LEFT JOIN restaurants r ON r.id=o.restaurant_id WHERE 1=1';
    const p = [];
    if (status)         { sql += ' AND o.order_status=?';   p.push(status); }
    if (payment_status) { sql += ' AND o.payment_status=?'; p.push(payment_status); }
    if (from)           { sql += ' AND DATE(o.created_at)>=?'; p.push(from); }
    if (to)             { sql += ' AND DATE(o.created_at)<=?'; p.push(to); }
    if (search)         { sql += ' AND (o.id LIKE ? OR u.name LIKE ?)'; p.push('%'+search+'%','%'+search+'%'); }
    sql += ' ORDER BY o.created_at DESC LIMIT 200';
    db.query(sql, p, (err, rows) => {
        if (err) return res.json({ success: false, message: 'DB error.' });
        res.json({ success: true, data: rows, count: rows.length });
    });
});

app.patch('/api/admin/orders/:id/status', authenticate, requireRole('admin'), (req, res) => {
    const valid = ['pending','confirmed','preparing','ready','ready_for_pickup','assigned_to_rider','picked_up','out_for_delivery','delivered','cancelled','rejected','failed','failed_delivery','refunded'];
    const { order_status } = req.body;
    if (!valid.includes(order_status)) return res.json({ success: false, message: 'Invalid status.' });
    db.query('UPDATE orders SET order_status=?,updated_at=NOW() WHERE id=?', [order_status, req.params.id], err => {
        if (err) return res.json({ success: false, message: 'Update failed.' });
        res.json({ success: true, message: 'Status updated.' });
    });
});

app.patch('/api/admin/orders/:id/payment', authenticate, requireRole('admin'), (req, res) => {
    const valid = ['pending','awaiting_payment','paid','failed','refunded'];
    const { payment_status } = req.body;
    if (!valid.includes(payment_status)) return res.json({ success: false, message: 'Invalid payment status.' });
    db.query('UPDATE orders SET payment_status=?,updated_at=NOW() WHERE id=?', [payment_status, req.params.id], err => {
        if (err) return res.json({ success: false, message: 'Update failed.' });
        res.json({ success: true, message: 'Payment status updated.' });
    });
});

app.patch('/api/admin/orders/:id/assign-rider', authenticate, requireRole('admin'), (req, res) => {
    const { rider_id } = req.body;
    if (!rider_id) return res.json({ success: false, message: 'rider_id required.' });
    db.query('SELECT id FROM users WHERE id=? AND role="rider" AND status="active"', [rider_id], (err, rows) => {
        if (err || !rows.length) return res.json({ success: false, message: 'Rider not found or not active.' });
        db.query('UPDATE orders SET rider_id=?,order_status="out_for_delivery",updated_at=NOW() WHERE id=?', [rider_id, req.params.id], err2 => {
            if (err2) return res.json({ success: false, message: 'Assign failed.' });
            res.json({ success: true, message: 'Rider assigned.' });
        });
    });
});

app.get('/api/admin/restaurants', authenticate, requireRole('admin'), (req, res) => {
    db.query('SELECT r.*,u.name AS owner_name FROM restaurants r LEFT JOIN users u ON u.id=r.owner_id ORDER BY r.created_at DESC', (err, rows) => {
        if (err) return res.json({ success: false, message: 'DB error.' });
        res.json({ success: true, data: rows });
    });
});

app.post('/api/admin/restaurants', authenticate, requireRole('admin'), (req, res) => {
    const { name, description, address, phone, cuisine_type, image } = req.body;
    if (!name) return res.json({ success: false, message: 'Name required.' });
    db.query('INSERT INTO restaurants (name,description,address,phone,cuisine_type,image) VALUES (?,?,?,?,?,?)',
        [name, description||null, address||null, phone||null, cuisine_type||null, image||null], (err, r) => {
            if (err) return res.json({ success: false, message: 'Create failed.' });
            res.json({ success: true, message: 'Restaurant created!', restaurant_id: r.insertId });
        });
});

app.patch('/api/admin/restaurants/:id', authenticate, requireRole('admin'), (req, res) => {
    const { name, description, address, phone, cuisine_type, image, status } = req.body;
    const fields = [], vals = [];
    if (name)         { fields.push('name=?');         vals.push(name); }
    if (description)  { fields.push('description=?');  vals.push(description); }
    if (address)      { fields.push('address=?');      vals.push(address); }
    if (phone)        { fields.push('phone=?');        vals.push(phone); }
    if (cuisine_type) { fields.push('cuisine_type=?'); vals.push(cuisine_type); }
    if (image)        { fields.push('image=?');        vals.push(image); }
    if (status)       { fields.push('status=?');       vals.push(status); }
    if (!fields.length) return res.json({ success: false, message: 'Nothing to update.' });
    vals.push(req.params.id);
    db.query('UPDATE restaurants SET '+fields.join(',')+'  WHERE id=?', vals, err => {
        if (err) return res.json({ success: false, message: 'Update failed.' });
        res.json({ success: true, message: 'Restaurant updated.' });
    });
});

app.delete('/api/admin/restaurants/:id', authenticate, requireRole('admin'), (req, res) => {
    db.query('DELETE FROM restaurants WHERE id=?', [req.params.id], err => {
        if (err) return res.json({ success: false, message: 'Delete failed.' });
        res.json({ success: true, message: 'Restaurant deleted.' });
    });
});

app.get('/api/admin/menu-items', authenticate, requireRole('admin'), (req, res) => {
    const { restaurant_id } = req.query;
    let sql = 'SELECT m.*,r.name AS restaurant_name FROM menu_items m LEFT JOIN restaurants r ON r.id=m.restaurant_id WHERE 1=1';
    const p = [];
    if (restaurant_id) { sql += ' AND m.restaurant_id=?'; p.push(restaurant_id); }
    sql += ' ORDER BY r.name,m.category,m.name';
    db.query(sql, p, (err, rows) => {
        if (err) return res.json({ success: false, message: 'DB error.' });
        res.json({ success: true, data: rows });
    });
});

app.post('/api/admin/menu-items', authenticate, requireRole('admin'), (req, res) => {
    const { restaurant_id, name, description, price, category, image } = req.body;
    if (!restaurant_id || !name || !price) return res.json({ success: false, message: 'restaurant_id, name, price required.' });
    db.query('INSERT INTO menu_items (restaurant_id,name,description,price,category,image) VALUES (?,?,?,?,?,?)',
        [restaurant_id, name, description||null, price, category||null, image||null], (err, r) => {
            if (err) return res.json({ success: false, message: 'Create failed.' });
            res.json({ success: true, message: 'Menu item added!', item_id: r.insertId });
        });
});

app.patch('/api/admin/menu-items/:id', authenticate, requireRole('admin'), (req, res) => {
    const { name, description, price, category, image, available } = req.body;
    const fields = [], vals = [];
    if (name !== undefined)        { fields.push('name=?');        vals.push(name); }
    if (description !== undefined) { fields.push('description=?'); vals.push(description); }
    if (price !== undefined)       { fields.push('price=?');       vals.push(price); }
    if (category !== undefined)    { fields.push('category=?');    vals.push(category); }
    if (image !== undefined)       { fields.push('image=?');       vals.push(image); }
    if (available !== undefined)   { fields.push('available=?');   vals.push(available); }
    if (!fields.length) return res.json({ success: false, message: 'Nothing to update.' });
    vals.push(req.params.id);
    db.query('UPDATE menu_items SET '+fields.join(',')+'  WHERE id=?', vals, err => {
        if (err) return res.json({ success: false, message: 'Update failed.' });
        res.json({ success: true, message: 'Menu item updated.' });
    });
});

app.delete('/api/admin/menu-items/:id', authenticate, requireRole('admin'), (req, res) => {
    db.query('DELETE FROM menu_items WHERE id=?', [req.params.id], err => {
        if (err) return res.json({ success: false, message: 'Delete failed.' });
        res.json({ success: true, message: 'Menu item deleted.' });
    });
});

app.patch('/api/admin/menu-items/:id/toggle', authenticate, requireRole('admin'), (req, res) => {
    db.query('UPDATE menu_items SET available=NOT available WHERE id=?', [req.params.id], err => {
        if (err) return res.json({ success: false, message: 'Toggle failed.' });
        res.json({ success: true, message: 'Availability toggled.' });
    });
});

app.get('/api/admin/riders', authenticate, requireRole('admin'), (req, res) => {
    db.query('SELECT u.id,u.name,u.email,u.phone,u.status,u.created_at,rd.vehicle_type,rd.vehicle_number,rd.license_number,rd.approval_status,rd.total_deliveries,rd.rating FROM users u LEFT JOIN rider_details rd ON rd.user_id=u.id WHERE u.role="rider" ORDER BY u.created_at DESC', (err, rows) => {
        if (err) return res.json({ success: false, message: 'DB error.' });
        res.json({ success: true, data: rows });
    });
});

app.patch('/api/admin/riders/:id/approve', authenticate, requireRole('admin'), (req, res) => {
    db.query('UPDATE users SET status="active" WHERE id=? AND role="rider"', [req.params.id], err => {
        if (err) return res.json({ success: false, message: 'Update failed.' });
        db.query('UPDATE rider_details SET approval_status="approved" WHERE user_id=?', [req.params.id], () => {});
        res.json({ success: true, message: 'Rider approved!' });
    });
});

app.patch('/api/admin/riders/:id/reject', authenticate, requireRole('admin'), (req, res) => {
    db.query('UPDATE users SET status="suspended" WHERE id=? AND role="rider"', [req.params.id], err => {
        if (err) return res.json({ success: false, message: 'Update failed.' });
        db.query('UPDATE rider_details SET approval_status="rejected" WHERE user_id=?', [req.params.id], () => {});
        res.json({ success: true, message: 'Rider rejected.' });
    });
});

app.get('/api/admin/payments', authenticate, requireRole('admin'), (req, res) => {
    const { status, method, from, to, search } = req.query;
    let sql = 'SELECT p.*,u.name AS customer_name,u.phone AS customer_phone,o.order_status,o.delivery_area FROM payments p LEFT JOIN users u ON u.id=p.user_id LEFT JOIN orders o ON o.id=p.order_id WHERE 1=1';
    const params = [];
    if (status) { sql += ' AND p.status=?';  params.push(status); }
    if (method) { sql += ' AND p.method=?';  params.push(method); }
    if (from)   { sql += ' AND DATE(p.created_at)>=?'; params.push(from); }
    if (to)     { sql += ' AND DATE(p.created_at)<=?'; params.push(to); }
    if (search) { sql += ' AND (p.payment_ref LIKE ? OR u.name LIKE ? OR p.gateway_tx_id LIKE ?)'; params.push('%'+search+'%','%'+search+'%','%'+search+'%'); }
    sql += ' ORDER BY p.created_at DESC LIMIT 300';
    db.query(sql, params, (err, rows) => {
        if (err) return res.json({ success: false, message: 'DB error.' });
        const total_revenue = rows.filter(r=>r.status==='completed').reduce((s,r)=>s+parseFloat(r.amount||0),0);
        const by_method = {};
        rows.forEach(r=>{ by_method[r.method]=(by_method[r.method]||0)+1; });
        res.json({ success: true, data: rows, count: rows.length, total_revenue, by_method });
    });
});

app.get('/api/admin/reviews', authenticate, requireRole('admin'), (req, res) => {
    db.query('SELECT rv.*,u.name AS customer_name,rs.name AS restaurant_name FROM reviews rv LEFT JOIN users u ON u.id=rv.user_id LEFT JOIN restaurants rs ON rs.id=rv.restaurant_id ORDER BY rv.created_at DESC', (err, rows) => {
        if (err) return res.json({ success: false, message: 'DB error.' });
        res.json({ success: true, data: rows });
    });
});

app.delete('/api/admin/reviews/:id', authenticate, requireRole('admin'), (req, res) => {
    db.query('DELETE FROM reviews WHERE id=?', [req.params.id], err => {
        if (err) return res.json({ success: false, message: 'Delete failed.' });
        res.json({ success: true, message: 'Review deleted.' });
    });
});

app.post('/api/admin/create-admin', authenticate, requireRole('admin'), async (req, res) => {
    const { full_name, email, phone, password } = req.body;
    if (!full_name || !email || !password) return res.json({ success: false, message: 'name, email, password required.' });
    try {
        const hash = await hashPw(password);
        db.query('INSERT INTO users (name,email,phone,password,role) VALUES (?,?,?,?,"admin")', [full_name, email, phone||null, hash], (err, r) => {
            if (err) return res.json({ success: false, message: 'Email already exists.' });
            res.json({ success: true, message: 'Admin created!', admin_id: r.insertId });
        });
    } catch { res.json({ success: false, message: 'Server error.' }); }
});

app.get('/api/admin/reports/financial', authenticate, requireRole('admin'), (req, res) => {
    const { period, from, to } = req.query;
    const groupBy = period==='monthly' ? "DATE_FORMAT(created_at,'%Y-%m')" : period==='weekly' ? "YEARWEEK(created_at)" : "DATE(created_at)";
    let where = 'WHERE payment_status="paid"';
    const params = [];
    if (from) { where += ' AND DATE(created_at)>=?'; params.push(from); }
    if (to)   { where += ' AND DATE(created_at)<=?'; params.push(to); }
    const q = (sql, p=[]) => new Promise(resolve => db.query(sql, p, (e,r) => resolve(r||[])));
    Promise.all([
        q('SELECT '+groupBy+' AS period,COUNT(*) AS orders,COALESCE(SUM(total),0) AS revenue,COALESCE(SUM(delivery_fee),0) AS delivery_fees,COALESCE(SUM(discount),0) AS discounts FROM orders '+where+' GROUP BY period ORDER BY period DESC LIMIT 60', params),
        q('SELECT payment_method,COUNT(*) AS count,COALESCE(SUM(total),0) AS revenue FROM orders '+where+' GROUP BY payment_method', params),
        q('SELECT order_status,COUNT(*) AS count FROM orders GROUP BY order_status'),
        q('SELECT COUNT(*) AS failed FROM payments WHERE status="failed"'),
        q('SELECT COUNT(*) AS refunded,COALESCE(SUM(amount),0) AS refund_amount FROM payments WHERE status="refunded"'),
        q('SELECT COALESCE(SUM(total),0) AS total_revenue,COUNT(*) AS total_orders FROM orders '+where, params),
    ]).then(([timeline,byMethod,byStatus,failed,refunds,summary]) => {
        res.json({ success: true, data: { timeline, by_payment_method:byMethod, by_order_status:byStatus, failed_transactions:failed[0]?.failed||0, refunds:refunds[0], summary:summary[0] }});
    });
});

app.get('/api/admin/disputes', authenticate, requireRole('admin'), (req, res) => {
    db.query('SELECT o.*,u.name AS customer_name,u.phone AS customer_phone,u2.name AS rider_name FROM orders o LEFT JOIN users u ON u.id=o.user_id LEFT JOIN users u2 ON u2.id=o.rider_id WHERE o.order_status IN ("failed","failed_delivery","cancelled","rejected") OR o.payment_status IN ("failed","refunded") ORDER BY o.updated_at DESC LIMIT 100', (err, rows) => {
        if (err) return res.json({ success: false, message: 'DB error.' });
        res.json({ success: true, data: rows });
    });
});

app.post('/api/admin/orders/:order_id/force-refund', authenticate, requireRole('admin'), (req, res) => {
    const { reason, reason_type } = req.body;
    db.query('SELECT * FROM orders WHERE id=?', [req.params.order_id], (err, rows) => {
        if (err || !rows.length) return res.json({ success: false, message: 'Order not found.' });
        const order = rows[0];
        db.query('UPDATE orders SET order_status="refunded",payment_status="refunded",updated_at=NOW() WHERE id=?', [order.id], (e2) => {
            if (e2) return res.json({ success: false, message: 'Refund failed.' });
            if (order.payment_method === 'wallet' && order.user_id) {
                getOrCreateWallet(order.user_id, (e3, wallet) => {
                    if (!e3 && wallet) {
                        const newBal = parseFloat(wallet.balance) + parseFloat(order.total);
                        db.query('UPDATE wallets SET balance=?,updated_at=NOW() WHERE id=?', [newBal, wallet.id], () => {});
                        db.query('INSERT INTO wallet_transactions (wallet_id,user_id,type,amount,balance_after,order_id,description) VALUES (?,?,?,?,?,?,?)', [wallet.id, order.user_id, 'refund', order.total, newBal, order.id, 'Refund for order #'+order.id], () => {});
                    }
                });
            }
            db.query('SELECT * FROM payments WHERE order_id=? ORDER BY created_at DESC LIMIT 1', [order.id], (ep, pays) => {
                const pay = pays && pays.length ? pays[0] : null;
                if (pay) db.query('UPDATE payments SET status="refunded",refunded_at=NOW(),refund_reason=? WHERE id=?', [reason||'Admin force refund', pay.id], () => {});
                const rfRef = rfndRef();
                const validReasons = ['order_cancelled','payment_error','customer_complaint','duplicate','other'];
                db.query('INSERT INTO refunds (refund_ref,payment_id,order_id,user_id,amount,method,status,reason,reason_detail,initiated_by,initiated_role,processed_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,NOW())',
                    [rfRef, pay?pay.id:null, order.id, order.user_id, order.total, order.payment_method==='wallet'?'wallet':'original', 'completed', validReasons.includes(reason_type)?reason_type:'other', reason||'Admin force refund', req.user.id, 'admin'], () => {});
                recordTransaction({ type:'refund', direction:'outflow', user_id:order.user_id, order_id:order.id, payment_id:pay?pay.id:null, amount:order.total, currency:'ETB', method:order.payment_method, status:'completed', description:'Force refund for order #'+order.id });
                res.json({ success: true, message: 'Order refunded successfully.', refund_ref: rfRef });
            });
        });
    });
});


// ============================================================
//  REFUNDS ROUTES
// ============================================================
app.get('/api/admin/refunds', authenticate, requireRole('admin'), (req, res) => {
    const { status, reason, from, to } = req.query;
    let sql = `SELECT r.*,u.name AS customer_name,u2.name AS initiated_by_name,
               o.total AS order_total,o.payment_method
               FROM refunds r
               LEFT JOIN users u  ON u.id=r.user_id
               LEFT JOIN users u2 ON u2.id=r.initiated_by
               LEFT JOIN orders o ON o.id=r.order_id WHERE 1=1`;
    const params = [];
    if (status) { sql += ' AND r.status=?'; params.push(status); }
    if (reason) { sql += ' AND r.reason=?'; params.push(reason); }
    if (from)   { sql += ' AND DATE(r.created_at)>=?'; params.push(from); }
    if (to)     { sql += ' AND DATE(r.created_at)<=?'; params.push(to); }
    sql += ' ORDER BY r.created_at DESC LIMIT 200';
    db.query(sql, params, (err, rows) => {
        if (err) return res.json({ success: false, message: 'DB error.' });
        const total_refunded = rows.filter(r=>r.status==='completed').reduce((s,r)=>s+parseFloat(r.amount||0),0);
        res.json({ success: true, data: rows, count: rows.length, total_refunded });
    });
});

app.patch('/api/admin/refunds/:id/status', authenticate, requireRole('admin'), (req, res) => {
    const { status, gateway_ref } = req.body;
    if (!['processing','completed','failed'].includes(status))
        return res.json({ success: false, message: 'Invalid status.' });
    const extra = status === 'completed' ? ',processed_at=NOW()' : '';
    db.query('UPDATE refunds SET status=?,gateway_ref=?,updated_at=NOW()'+extra+' WHERE id=?',
        [status, gateway_ref||null, req.params.id], (err) => {
            if (err) return res.json({ success: false, message: 'Update failed.' });
            if (status === 'completed') {
                db.query('SELECT * FROM refunds WHERE id=?', [req.params.id], (e2, rows) => {
                    if (rows && rows.length)
                        db.query('UPDATE payments SET status="refunded",refunded_at=NOW() WHERE id=?', [rows[0].payment_id], () => {});
                });
            }
            res.json({ success: true, message: 'Refund status updated to '+status+'.' });
        });
});

app.post('/api/admin/refunds', authenticate, requireRole('admin'), (req, res) => {
    const { order_id, reason, reason_type, refund_method } = req.body;
    if (!order_id || !reason) return res.json({ success: false, message: 'order_id and reason required.' });
    db.query('SELECT * FROM orders WHERE id=?', [order_id], (err, orders) => {
        if (err || !orders.length) return res.json({ success: false, message: 'Order not found.' });
        const order = orders[0];
        if (!['paid','awaiting_payment'].includes(order.payment_status))
            return res.json({ success: false, message: 'Order has no completed payment to refund.' });
        db.query('SELECT * FROM payments WHERE order_id=? AND status="completed" ORDER BY created_at DESC LIMIT 1', [order_id], (e2, pays) => {
            const pay = pays && pays.length ? pays[0] : null;
            const validReasons = ['order_cancelled','payment_error','customer_complaint','duplicate','other'];
            const rfRef = rfndRef();
            db.query(`INSERT INTO refunds (refund_ref,payment_id,order_id,user_id,amount,method,status,reason,reason_detail,initiated_by,initiated_role)
                      VALUES (?,?,?,?,?,?,'pending',?,?,?,?)`,
                [rfRef, pay?pay.id:null, order_id, order.user_id, order.total,
                 refund_method||'original', validReasons.includes(reason_type)?reason_type:'other',
                 reason, req.user.id, 'admin'], (e3) => {
                    if (e3) return res.json({ success: false, message: 'Failed to create refund.' });
                    db.query('UPDATE orders SET payment_status="refunded",order_status="refunded",updated_at=NOW() WHERE id=?', [order_id], () => {});
                    if (pay) db.query('UPDATE payments SET status="refunded",refunded_at=NOW(),refund_reason=? WHERE id=?', [reason, pay.id], () => {});
                    recordTransaction({ type:'refund', direction:'outflow', user_id:order.user_id, order_id, payment_id:pay?pay.id:null, amount:order.total, currency:'ETB', method:order.payment_method, status:'completed', description:'Refund for order #'+order_id });
                    res.json({ success: true, message: 'Refund initiated.', refund_ref: rfRef });
                });
        });
    });
});

app.get('/api/refunds', authenticate, requireRole('customer'), (req, res) => {
    db.query(`SELECT r.*,o.total AS order_total FROM refunds r
              LEFT JOIN orders o ON o.id=r.order_id
              WHERE r.user_id=? ORDER BY r.created_at DESC`, [req.user.id], (err, rows) => {
        if (err) return res.json({ success: false, message: 'DB error.' });
        res.json({ success: true, data: rows });
    });
});

// ============================================================
//  INVOICE
// ============================================================
app.get('/api/orders/:order_id/invoice', authenticate, (req, res) => {
    const role = req.user.role;
    let sql = `SELECT o.*,u.name AS customer_name,u.email AS customer_email,u.phone AS customer_phone,
               r.name AS restaurant_name,u2.name AS rider_name
               FROM orders o LEFT JOIN users u ON u.id=o.user_id
               LEFT JOIN restaurants r ON r.id=o.restaurant_id
               LEFT JOIN users u2 ON u2.id=o.rider_id WHERE o.id=?`;
    const params = [req.params.order_id];
    if (role === 'customer') { sql += ' AND o.user_id=?'; params.push(req.user.id); }
    if (role === 'rider')    { sql += ' AND o.rider_id=?'; params.push(req.user.id); }
    db.query(sql, params, (err, rows) => {
        if (err || !rows.length) return res.json({ success: false, message: 'Order not found.' });
        const o = rows[0];
        let items = [];
        try { items = typeof o.items === 'string' ? JSON.parse(o.items) : (o.items||[]); } catch(e) {}
        res.json({ success: true, data: {
            invoice_number: 'INV-'+o.id, issued_at: new Date().toISOString(),
            order: { id: o.id, created_at: o.created_at, status: o.order_status },
            customer: { name: o.customer_name, email: o.customer_email, phone: o.customer_phone },
            restaurant: o.restaurant_name, rider: o.rider_name,
            delivery_address: o.delivery_area||o.delivery_address,
            items: items.map(i=>({ name:i.english||i.name, qty:i.quantity||1, unit_price:i.price, total:(i.price*(i.quantity||1)) })),
            subtotal: o.subtotal, delivery_fee: o.delivery_fee, discount: o.discount, total: o.total,
            payment: { method: o.payment_method, status: o.payment_status, coupon: o.coupon_code }
        }});
    });
});

// ============================================================
//  PASSWORD RESET SYSTEM
// ============================================================

// POST /api/auth/forgot-password
// Step 1: User requests reset — generates token, returns it (in prod: send via email/SMS)
app.post('/api/auth/forgot-password', (req, res) => {
    const { email, phone } = req.body;
    const identifier = email || phone;
    if (!identifier) return res.json({ success: false, message: 'Email or phone number is required.' });

    // Search by email OR phone
    const field = identifier.includes('@') ? 'email' : 'phone';
    db.query('SELECT id,name,email,phone,role FROM users WHERE '+field+'=? AND status="active"', [identifier], (err, rows) => {
        if (err) return res.json({ success: false, message: 'DB error.' });
        // Always return success to prevent enumeration
        if (!rows.length) return res.json({ success: true, message: 'If that account exists, a reset link has been sent.', dev_found: false });

        const user = rows[0];
        // Invalidate any existing unused tokens
        db.query('UPDATE password_reset_tokens SET is_used=1 WHERE user_id=? AND is_used=0', [user.id], () => {});

        const rawToken  = crypto.randomBytes(48).toString('hex');
        const expiresAt = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes

        db.query('INSERT INTO password_reset_tokens (user_id,token,expires_at) VALUES (?,?,?)',
            [user.id, rawToken, expiresAt], (e2) => {
                if (e2) return res.json({ success: false, message: 'Failed to generate reset token.' });

                const resetUrl = 'http://localhost:3000/reset-password.html?token='+rawToken;
                console.log('\n🔑 Password reset for', user.email||user.phone);
                console.log('   Token:', rawToken);
                console.log('   URL:  ', resetUrl, '\n');

                // Always return token in dev mode
                res.json({
                    success: true,
                    message: 'Reset link generated.',
                    dev_token: rawToken,
                    dev_reset_url: resetUrl,
                    user_name: user.name,
                    expires_in: '30 minutes'
                });
            });
    });
});

// POST /api/auth/verify-reset-token
// Step 2: Verify token is valid, not expired, not used
app.post('/api/auth/verify-reset-token', (req, res) => {
    const { token } = req.body;
    if (!token) return res.json({ success: false, message: 'Token is required.' });

    db.query(`SELECT prt.*,u.name,u.email,u.role
              FROM password_reset_tokens prt
              JOIN users u ON u.id=prt.user_id
              WHERE prt.token=? AND prt.is_used=0 AND prt.expires_at > NOW()`,
        [token], (err, rows) => {
            if (err) return res.json({ success: false, message: 'DB error.' });
            if (!rows.length) return res.json({ success: false, message: 'Invalid, expired, or already used token.' });

            const record = rows[0];
            res.json({
                success: true,
                message: 'Token is valid.',
                data: { user_name: record.name, email: record.email, role: record.role,
                        expires_at: record.expires_at }
            });
        });
});

// POST /api/auth/reset-password
// Step 3: Set new password using valid token
app.post('/api/auth/reset-password', async (req, res) => {
    const { token, new_password, confirm_password } = req.body;
    if (!token || !new_password || !confirm_password)
        return res.json({ success: false, message: 'token, new_password, and confirm_password are required.' });
    if (new_password !== confirm_password)
        return res.json({ success: false, message: 'Passwords do not match.' });
    if (new_password.length < 8)
        return res.json({ success: false, message: 'Password must be at least 8 characters.' });
    // Strength check: at least one uppercase, one lowercase, one digit
    if (!/[A-Z]/.test(new_password) || !/[a-z]/.test(new_password) || !/[0-9]/.test(new_password))
        return res.json({ success: false, message: 'Password must contain uppercase, lowercase, and a number.' });

    db.query(`SELECT prt.*,u.id AS uid,u.email
              FROM password_reset_tokens prt
              JOIN users u ON u.id=prt.user_id
              WHERE prt.token=? AND prt.is_used=0 AND prt.expires_at > NOW()`,
        [token], async (err, rows) => {
            if (err) return res.json({ success: false, message: 'DB error.' });
            if (!rows.length) return res.json({ success: false, message: 'Invalid, expired, or already used token.' });

            const record = rows[0];
            try {
                const hashed = await hashPw(new_password);

                // Step 3a: Update password
                db.query('UPDATE users SET password=?,updated_at=NOW() WHERE id=?', [hashed, record.uid], (e2) => {
                    if (e2) {
                        console.error('Password update error:', e2.message);
                        return res.json({ success: false, message: 'Failed to update password: '+e2.message });
                    }

                    // Step 3b: Mark token as used (single-use enforcement)
                    db.query('UPDATE password_reset_tokens SET is_used=1 WHERE id=?', [record.id], () => {});

                    // Step 3c: Invalidate all other tokens for this user
                    db.query('UPDATE password_reset_tokens SET is_used=1 WHERE user_id=? AND id!=?', [record.uid, record.id], () => {});

                    console.log('Password reset successful for:', record.email);
                    res.json({ success: true, message: 'Password reset successful! You can now log in with your new password.' });
                });
            } catch(e) {
                res.json({ success: false, message: 'Server error during password reset.' });
            }
        });
});

// POST /api/auth/change-password (authenticated users — change own password)
app.post('/api/auth/change-password', authenticate, async (req, res) => {
    const { current_password, new_password, confirm_password } = req.body;
    if (!current_password || !new_password || !confirm_password)
        return res.json({ success: false, message: 'All fields are required.' });
    if (new_password !== confirm_password)
        return res.json({ success: false, message: 'New passwords do not match.' });
    if (new_password.length < 8)
        return res.json({ success: false, message: 'Password must be at least 8 characters.' });
    if (!/[A-Z]/.test(new_password) || !/[a-z]/.test(new_password) || !/[0-9]/.test(new_password))
        return res.json({ success: false, message: 'Password must contain uppercase, lowercase, and a number.' });

    db.query('SELECT password FROM users WHERE id=?', [req.user.id], async (err, rows) => {
        if (err || !rows.length) return res.json({ success: false, message: 'User not found.' });
        const valid = await checkPw(current_password, rows[0].password);
        if (!valid) return res.json({ success: false, message: 'Current password is incorrect.' });
        try {
            const hashed = await hashPw(new_password);
            db.query('UPDATE users SET password=?,updated_at=NOW() WHERE id=?', [hashed, req.user.id], (e2) => {
                if (e2) return res.json({ success: false, message: 'Failed to update password.' });
                res.json({ success: true, message: 'Password changed successfully!' });
            });
        } catch(e) { res.json({ success: false, message: 'Server error.' }); }
    });
});

// POST /api/admin/users/:id/reset-password (admin triggers reset for any user)
app.post('/api/admin/users/:id/reset-password', authenticate, requireRole('admin'), (req, res) => {
    db.query('SELECT id,name,email,status FROM users WHERE id=?', [req.params.id], (err, rows) => {
        if (err || !rows.length) return res.json({ success: false, message: 'User not found.' });
        const user = rows[0];
        // Invalidate existing tokens
        db.query('UPDATE password_reset_tokens SET is_used=1 WHERE user_id=? AND is_used=0', [user.id], () => {});
        const rawToken  = crypto.randomBytes(48).toString('hex');
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour for admin-triggered
        db.query('INSERT INTO password_reset_tokens (user_id,token,expires_at) VALUES (?,?,?)',
            [user.id, rawToken, expiresAt], (e2) => {
                if (e2) return res.json({ success: false, message: 'Failed to generate token.' });
                const resetUrl = 'http://localhost:3000/reset-password.html?token='+rawToken;
                console.log('Admin-triggered reset for', user.email, 'by admin:', req.user.email);
                res.json({ success: true, message: 'Reset link generated for '+user.name,
                    dev_token: rawToken, dev_reset_url: resetUrl, expires_in: '1 hour' });
            });
    });
});

// ============================================================
//  SERVE PAGES
// ============================================================
app.get('/',                  (req, res) => res.sendFile(path.join(__dirname, '..', 'kochaEats.html')));
app.get('/admin',             (req, res) => res.sendFile(path.join(__dirname, '..', 'admin-dashboard.html')));
app.get('/rider',             (req, res) => res.sendFile(path.join(__dirname, '..', 'rider-dashboard.html')));
app.get('/customer',          (req, res) => res.sendFile(path.join(__dirname, '..', 'customer-dashboard.html')));
app.get('/payment',           (req, res) => res.sendFile(path.join(__dirname, '..', 'payment.html')));
app.get('/reset-password',    (req, res) => res.sendFile(path.join(__dirname, '..', 'reset-password.html')));
app.get('/admin-dashboard',   (req, res) => res.sendFile(path.join(__dirname, '..', 'admin-dashboard.html')));

// ── START ─────────────────────────────────────────────────────
app.listen(PORT, () => {
    console.log('\n🚀 KochaEats API → http://localhost:'+PORT+'\n');
    console.log('  AUTH:     POST /api/register | /api/login | /api/register-rider | /api/login-rider | /api/login-admin');
    console.log('  RESET:    POST /api/auth/forgot-password | /api/auth/verify-reset-token | /api/auth/reset-password | /api/auth/change-password');
    console.log('  CUSTOMER: GET|POST /api/orders | /api/cart | /api/reviews | /api/payments | /api/wallet | /api/refunds');
    console.log('  RIDER:    GET /api/rider/orders | /api/rider/orders/available | PATCH .../accept | .../status | .../collect-cash');
    console.log('  ADMIN:    /api/admin/stats | /api/admin/orders | /api/admin/users | /api/admin/restaurants | /api/admin/riders');
    console.log('            /api/admin/payments | /api/admin/transactions | /api/admin/refunds | /api/admin/payment-methods\n');
});
