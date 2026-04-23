// fix

const mysql = require('mysql2');
const db = mysql.createConnection({ host:'localhost', port:3307, user:'root', password:'', database:'kochaeats' });
db.connect(err => {
    if (err) { console.error(err.message); process.exit(1); }
    console.log('Adding missing columns...\n');
    const alters = [
        // payments
        ['payments.payment_ref',    'ALTER TABLE payments ADD COLUMN IF NOT EXISTS payment_ref VARCHAR(80)'],
        ['payments.currency',       "ALTER TABLE payments ADD COLUMN IF NOT EXISTS currency VARCHAR(10) DEFAULT 'ETB'"],
        ['payments.gateway_tx_id',  'ALTER TABLE payments ADD COLUMN IF NOT EXISTS gateway_tx_id VARCHAR(150)'],
        ['payments.failure_reason', 'ALTER TABLE payments ADD COLUMN IF NOT EXISTS failure_reason TEXT'],
        ['payments.retry_count',    'ALTER TABLE payments ADD COLUMN IF NOT EXISTS retry_count INT DEFAULT 0'],
        ['payments.verified_at',    'ALTER TABLE payments ADD COLUMN IF NOT EXISTS verified_at TIMESTAMP NULL'],
        ['payments.refunded_at',    'ALTER TABLE payments ADD COLUMN IF NOT EXISTS refunded_at TIMESTAMP NULL'],
        ['payments.refund_reason',  'ALTER TABLE payments ADD COLUMN IF NOT EXISTS refund_reason TEXT'],
        ['payments.ip_address',     'ALTER TABLE payments ADD COLUMN IF NOT EXISTS ip_address VARCHAR(45)'],
        // transactions
        ['transactions.payment_id', 'ALTER TABLE transactions ADD COLUMN IF NOT EXISTS payment_id INT'],
        ['transactions.wallet_id',  'ALTER TABLE transactions ADD COLUMN IF NOT EXISTS wallet_id INT'],
        ['transactions.fee',        'ALTER TABLE transactions ADD COLUMN IF NOT EXISTS fee DECIMAL(10,2) DEFAULT 0'],
        ['transactions.net_amount', 'ALTER TABLE transactions ADD COLUMN IF NOT EXISTS net_amount DECIMAL(12,2)'],
        ['transactions.gateway_ref','ALTER TABLE transactions ADD COLUMN IF NOT EXISTS gateway_ref VARCHAR(150)'],
        ['transactions.metadata',   'ALTER TABLE transactions ADD COLUMN IF NOT EXISTS metadata JSON'],
        // refunds
        ['refunds.gateway_ref',     'ALTER TABLE refunds ADD COLUMN IF NOT EXISTS gateway_ref VARCHAR(150)'],
        ['refunds.processed_at',    'ALTER TABLE refunds ADD COLUMN IF NOT EXISTS processed_at TIMESTAMP NULL'],
        // rider_details
        ['rider_details.total_deliveries', 'ALTER TABLE rider_details ADD COLUMN IF NOT EXISTS total_deliveries INT DEFAULT 0'],
        ['rider_details.rating',           'ALTER TABLE rider_details ADD COLUMN IF NOT EXISTS rating DECIMAL(3,2) DEFAULT 5.00'],
        // order_items
        ['order_items.item_name',   'ALTER TABLE order_items ADD COLUMN IF NOT EXISTS item_name VARCHAR(150)'],
        ['order_items.unit_price',  'ALTER TABLE order_items ADD COLUMN IF NOT EXISTS unit_price DECIMAL(10,2)'],
        ['order_items.total_price', 'ALTER TABLE order_items ADD COLUMN IF NOT EXISTS total_price DECIMAL(10,2)'],
        // restaurants
        ['restaurants.description', 'ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS description TEXT'],
        ['restaurants.cuisine_type','ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS cuisine_type VARCHAR(100)'],
        ['restaurants.image',       'ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS image VARCHAR(255)'],
        ['restaurants.rating',      'ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS rating DECIMAL(3,2) DEFAULT 0.00'],
    ];
    let done = 0;
    alters.forEach(([name, sql]) => {
        db.query(sql, err => {
            if (err && !err.message.includes('Duplicate column') && !err.message.includes('already exists'))
                console.error('FAIL ['+name+']:', err.message.substring(0,60));
            else
                console.log('OK   ['+name+']');
            if (++done === alters.length) { console.log('\nAll columns added!'); db.end(); }
        });
    });
});
