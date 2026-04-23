// check

const mysql = require('mysql2');
const db = mysql.createConnection({host:'localhost',port:3307,user:'root',password:'',database:'kochaeats'});
db.connect(err => {
    if(err){console.error(err.message);process.exit(1);}

    console.log('\n=== DELIVERED ORDERS (can be reviewed) ===');
    db.query('SELECT o.id, o.order_status, u.name, u.email FROM orders o JOIN users u ON u.id=o.user_id WHERE o.order_status="delivered"', (e,r) => {
        if(e){console.log('Error:',e.message);}
        else r.forEach(row => console.log(' Order:', row.id, '| Customer:', row.name, '|', row.email));
    });

    console.log('\n=== EXISTING REVIEWS ===');
    db.query('SELECT rv.id, rv.rating, rv.comment, u.name AS customer, rs.name AS restaurant FROM reviews rv LEFT JOIN users u ON u.id=rv.user_id LEFT JOIN restaurants rs ON rs.id=rv.restaurant_id', (e,r) => {
        if(e){console.log('Error:',e.message);}
        else r.forEach(row => console.log(' Review #'+row.id+' | '+row.customer+' → '+row.restaurant+' | '+row.rating+' stars | '+row.comment));
        db.end();
    });
});

// Also show all orders with their status
const db2 = require('mysql2').createConnection({host:'localhost',port:3307,user:'root',password:'',database:'kochaeats'});
db2.connect(err => {
    if(err) return;
    console.log('\n=== ALL ORDERS STATUS ===');
    db2.query('SELECT id, order_status, user_email FROM orders ORDER BY created_at DESC LIMIT 15', (e,r) => {
        if(e) console.log('Error:',e.message);
        else r.forEach(row => console.log(' ', row.id, '|', row.order_status, '|', row.user_email));
        db2.end();
    });
});
