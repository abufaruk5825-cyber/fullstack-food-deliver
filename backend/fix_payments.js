// fix

const mysql  = require('mysql2');
const db = mysql.createConnection({ host:'localhost', port:3307, user:'root', password:'', database:'kochaeats' });

db.connect(err => {
    if (err) { console.error(err.message); process.exit(1); }
    console.log('Connected. Finding paid orders with no payment record...\n');

    db.query(
        "SELECT o.id, o.total, o.payment_method, o.user_id, o.created_at FROM orders o LEFT JOIN payments p ON p.order_id=o.id WHERE o.payment_status='paid' AND p.id IS NULL",
        (err, orders) => {
            if (err) { console.error(err.message); db.end(); return; }
            console.log('Found', orders.length, 'paid orders with no payment record');
            if (!orders.length) { console.log('Nothing to fix!'); db.end(); return; }

            let done = 0;
            orders.forEach(o => {
                const ref = 'PAY-FIX-' + Date.now() + '-' + Math.random().toString(36).slice(2,6).toUpperCase();
                db.query(
                    "INSERT INTO payments (payment_ref,order_id,user_id,amount,currency,method,status,verified_at,created_at,updated_at) VALUES (?,?,?,?,'ETB',?,'completed',?,?,?)",
                    [ref, o.id, o.user_id, o.total, o.payment_method||'cash', o.created_at, o.created_at, o.created_at],
                    (e) => {
                        if (e) console.error('Error for order', o.id, ':', e.message);
                        else console.log('Created payment for order', o.id, '- ETB', o.total, '|', o.payment_method);
                        if (++done === orders.length) {
                            console.log('\nDone! Created', done, 'payment records.');
                            db.end();
                        }
                    }
                );
            });
        }
    );
});
