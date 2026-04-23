
const mysql  = require('mysql2');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
    host: 'localhost', port: 3307,
    user: 'root', password: '',
    database: 'kochaeats'
});

db.connect(err => {
    if (err) { console.error('DB error:', err.message); process.exit(1); }
    console.log('Connected to kochaeats DB');

    // Check existing admins 
    db.query('SELECT id, name, email, role, status FROM users WHERE role = "admin"', (e, rows) => {
        if (e) { console.error('Query error:', e.message); db.end(); return; }
        console.log('Existing admins:', rows.length);
        rows.forEach(r => console.log(' -', r.id, r.name, r.email, r.status));

        // Force-create/update admins
        const email = 'admin@kochaeats.com';
        const password = 'Admin123!';
        bcrypt.hash(password, 10, (he, hash) => {
            if (he) { console.error('Hash error:', he.message); db.end(); return; }
            db.query('SELECT id FROM users WHERE email = ?', [email], (e2, existing) => {
                if (existing && existing.length) {
                    // Update password
                    db.query('UPDATE users SET password = ?, role = "admin", status = "active" WHERE email = ?',
                        [hash, email], (e3) => {
                            if (e3) console.error('Update error:', e3.message);
                            else console.log('Admin password RESET successfully!');
                            console.log('Email:', email);
                            console.log('Password:', password);
                            db.end();
                        });
                } else {
                    // Insert new admin
                    db.query('INSERT INTO users (name, email, phone, password, role, status) VALUES (?, ?, ?, ?, "admin", "active")',
                        ['Kocha Admin', email, '+251911000000', hash], (e3) => {
                            if (e3) console.error('Insert error:', e3.message);
                            else console.log('Admin created successfully!');
                            console.log('Email:', email);
                            console.log('Password:', password);
                            db.end();
                        });
                }
            });
        });
    });
});
