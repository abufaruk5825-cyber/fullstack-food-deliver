
// Import what we need
const express = require('express');
const mysql = require('mysql2');
const path = require('path');

// Create server
const app = express();

// Settings to handle forms and serve files
app.use(express.json()); // For JSON forms
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..')));

// ==================== SERVE FRONTEND ====================
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'kochaEats.html'));
});

// ==================== HEALTH CHECK ====================
app.get('/api/health-check', (req, res) => {
    res.json({ 
        success: true, 
        message: 'Backend server is running',
        timestamp: new Date().toISOString()
    });
});


// First, connect without database to create it
const setupConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: ''
});

//  AUTOMATIC DATABASE SETUP
function setupDatabase() {
    console.log(' Setting up database automatically...');
    
    // Step 1: Create database if it doesn't exist
    setupConnection.query('CREATE DATABASE IF NOT EXISTS kochaeats', function(err) {
        if (err) {
            console.log(' Error creating database:', err.message);
            return;
        }
        console.log('✅ Database "kochaeats" ready!');
        
        // Step 2: Use the database
        setupConnection.query('USE kochaeats', function(err) {
            if (err) {
                console.log(' Error selecting database:', err.message);
                return;
            }
            
            // Step 3: Create users table
            const createUsersTable = `
                CREATE TABLE IF NOT EXISTS users (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    full_name VARCHAR(100),
                    email VARCHAR(100) UNIQUE,
                    phone VARCHAR(20),
                    password VARCHAR(100),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `;
            
            setupConnection.query(createUsersTable, function(err) {
                if (err) {
                    console.log(' Error creating users table:', err.message);
                    return;
                }
                console.log(' Users table ready!');
                
                // Step 5: Create riders table
                const createRidersTable = `
                    CREATE TABLE IF NOT EXISTS riders (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        full_name VARCHAR(100),
                        email VARCHAR(100) UNIQUE,
                        phone VARCHAR(20),
                        password VARCHAR(100),
                        vehicle_type VARCHAR(50),
                        vehicle_number VARCHAR(50),
                        license_number VARCHAR(50),
                        status VARCHAR(20) DEFAULT 'pending',
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                    )
                `;
                
                setupConnection.query(createRidersTable, function(err) {
                        if (err) {
                            console.log(' Error creating riders table:', err.message);
                            return;
                        }
                        console.log(' Riders table ready!');
                        
                        // Step 6: Create admins table
                        const createAdminsTable = `
                            CREATE TABLE IF NOT EXISTS admins (
                                id INT AUTO_INCREMENT PRIMARY KEY,
                                full_name VARCHAR(100),
                                email VARCHAR(100) UNIQUE,
                                phone VARCHAR(20),
                                password VARCHAR(100),
                                admin_code VARCHAR(50),
                                role VARCHAR(50) DEFAULT 'admin',
                                status VARCHAR(20) DEFAULT 'active',
                                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                            )
                        `;
                        
                        setupConnection.query(createAdminsTable, function(err) {
                            if (err) {
                                console.log(' Error creating admins table:', err.message);
                                return;
                            }
                            console.log(' Admins table ready!');
                            
                            // Database setup complete - no sample data, users will add their own!
                            console.log(' Database setup complete!');
                        });
                    });
                });
            });
        });
}



// Setup database first
setupDatabase();



// ==================== API: REGISTER RIDER ====================
app.post('/api/register-rider', (req, res) => {
    // Get values from frontend form
    // const full_name = req.body.full_name || req.body.name;
    // const email = req.body.riderEmail;
    // const phone = req.body.phone;
    // const password = req.body.password;
    // const vehicle_type = req.body.vehicle_type;
    // const vehicle_number = req.body.vehicle_number;
    // const license_number = req.body.license_number;

    const {full_name,email,phone,password,vehicle_type,vehicle_number,license_number} = req.body;
    
    console.log(' Rider registration form received:');
    console.log('Name:', full_name);
    console.log('Email:', email);
    console.log('Phone:', phone);
    console.log('Vehicle Type:', vehicle_type);
    console.log('Vehicle Number:', vehicle_number);
    
// Simple validation
if (!full_name) {
    console.log('Name is required!');
    return res.json({ success: false, message: 'Name is required!' });
} else if (!/^[a-zA-Z ]+$/.test(full_name)) {
    console.log('Invalid name format!');
    return res.json({
        success: false,
        message: 'Name must contain only letters and spaces'
    });
}

    
    
    if (!email) {
        console.log('Email is required!');
        res.json({ success: false, message: 'Email is required!' });
        return;
    }
    if (!email.includes('@')) {
        console.log('Email must contain @ symbol!')
    return res.json({ success: false, message: 'Email must contain @ symbol!' });
}
    
    if (!phone) {
        console.log('Phone is required!')
        res.json({ success: false, message: 'Phone is required!' });
        return;
    }
    
    if (!password || password.length < 8) {
        console.log('Password must be at least 8 characters!')
        res.json({ success: false, message: 'Password must be at least 8 characters!' });
        return;
    }
    if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
        console.log('Password must contain letters and numbers!')
    return res.json({
        success: false,
        message: 'Password must contain letters and numbers!'
    });
}
    
    if (!vehicle_type) {
        console.log('Vehicle type is required!')
        res.json({ success: false, message: 'Vehicle type is required!' });
        return;
    }
    
    if (!vehicle_number) {
        console.log('Vehicle number is required!')
        res.json({ success: false, message: 'Vehicle number is required!' });
        return;

    }
    
    // Save to database
    setupConnection.query(
        'INSERT INTO riders (full_name, email, phone, password, vehicle_type, vehicle_number, license_number) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [full_name, email, phone, password, vehicle_type, vehicle_number, license_number],
        (err, result) => {
            if (err) {
                console.log('Database error:', err);
                res.json({ success: false, message: 'Rider registration failed! Email might already exist.' });
            } else {
                res.json({ 
                    success: true, 
                    message: 'Rider registration successful! Waiting for approval.',
                    data: {
                        rider_id: result.insertId,
                        full_name: full_name,
                        email: email,
                        status: 'pending'
                    }
                });
            }
        }
    );
});

// ==================== API: REGISTER ADMIN ====================
app.post('/api/register-admin', function(req, res) {
    // Get values from frontend form

    // const full_name = req.body.full_name || req.body.name;
    // const email = req.body.email;
    // const phone = req.body.phone;
    // const password = req.body.password;
    // const admin_code = req.body.admin_code;

    const {full_name,email,phone,password,admin_code} = req.body;
    
    console.log(' Admin registration form received:');
    console.log('Name:', full_name);
    console.log('Email:', email);
    console.log('Phone:', phone);
    console.log('Admin Code received:', admin_code);
    

 // Simple validation
if (!full_name) {
    console.log('Name is required!');
    return res.json({ success: false, message: 'Name is required!' });
} else if (!/^[a-zA-Z ]+$/.test(full_name)) {
    console.log('Invalid name format!');
    return res.json({
        success: false,
        message: 'Name must contain only letters and spaces'
    });
}

    
    if (!email) {
        console.log('Email is required!')
        res.json({ success: false, message: 'Email is required!' });
        return;
    }
    if (!email.includes('@')) {
        console.log('Email must contain @ symbol!')
    return res.json({ success: false, message: 'Email must contain @ symbol!' });
}
    
    if (!phone) {
        console.log('Phone is required!' )
        res.json({ success: false, message: 'Phone is required!' });
        return;
    }
    
    if (!password || password.length < 8) {
        console.log( 'Password must be at least 8 characters!' )
        res.json({ success: false, message: 'Password must be at least 8 characters!' });
        return;
    }
    if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
        console.log('Password must contain letters and numbers!')
    return res.json({
        success: false,
        message: 'Password must contain letters and numbers!'
    });
}
    
    if (!admin_code) {
        console.log('Admin code is required!' )
        res.json({ success: false, message: 'Admin code is required!' });
        return;
    }
    
    // Check admin code - basic validation

    if (admin_code !== 'KOCHA2025') {
        console.log(' Invalid admin code entered:', admin_code);
        console.log(' Expected: KOCHA2025');
        res.json({ success: false, message: 'Invalid admin code!' });
        return;
    }


    console.log(' Admin code validated successfully!');
    
    // Save to database
    setupConnection.query(
        'INSERT INTO admins (full_name, email, phone, password, admin_code) VALUES (?, ?, ?, ?, ?)',
        [full_name, email, phone, password, admin_code],
        function(err, result) {
            if (err) {
                console.log('Database error:', err);
                res.json({ success: false, message: 'Admin registration failed! Email might already exist.' });
            } else {
                res.json({ 
                    success: true, 
                    message: 'Admin registration successful!',
                    data: {
                        admin_id: result.insertId,
                        full_name: full_name,
                        email: email,
                        role: 'admin'
                    }
                });
            }
        }
    );
});

// ==================== API: LOGIN RIDER ====================
app.post('/api/login-rider', function(req, res) {
    // Get values from frontend form
    const {email,password} = req.body;
    
    console.log(' Rider login attempt:');
    console.log('Email:', email);
    
    // Simple validation
    if (!email) {
        console.log( 'Email is required!')
        res.json({ success: false, message: 'Email is required!' });
        return;
    }
    if (!email.includes('@')) {
        console.log('Email must contain @ symbol!')
    return res.json({ success: false, message: 'Email must contain @ symbol!' });
}
    
    if (!password) {
        console.log('Password is required!')
        res.json({ success: false, message: 'Password is required!' });
        return;
    }
    if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
        console.log('Password must contain letters and numbers!')
    return res.json({
        success: false,
        message: 'Password must contain letters and numbers!'
    });
}
    
    // Check in database
    setupConnection.query('SELECT * FROM riders WHERE email = ? AND password = ?', [email, password], (err, results) => {
        if (err) {
            console.log('Database error:', err);
            res.json({ success: false, message: 'Database error!' });
        } else if (results.length === 0) {
            res.json({ success: false, message: 'Wrong email or password!' });
        } else {
            const rider = results[0];
            res.json({ 
                success: true, 
                message: 'Rider login successful!',
                data: {
                    rider_id: rider.id,
                    full_name: rider.full_name,
                    email: rider.email,
                    phone: rider.phone,
                    vehicle_type: rider.vehicle_type,
                    vehicle_number: rider.vehicle_number,
                    status: rider.status
                }
            });
        }
    });
});

// ==================== API: LOGIN ADMIN ====================
app.post('/api/login-admin', function(req, res) {
    // Get values from frontend form
   const{email,password} = req.body;
    
    console.log(' Admin login attempt:');
    console.log('Email:', email);
    
    // Simple validation
    if (!email) {
        console.log('Email is required!')
        res.json({ success: false, message: 'Email is required!' });
        return;
    }
    if (!email.includes('@')) {
        console.log('Email must contain @ symbol!')
    return res.json({ success: false, message: 'Email must contain @ symbol!' });
}
    
    if (!password) {
        console.log('Password is required!')
        res.json({ success: false, message: 'Password is required!' });
        return;
    }
    if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
        console.log('Password must contain letters and numbers!')
    return res.json({
        success: false,
        message: 'Password must contain letters and numbers!'
    });
}
    
    // Check in database
    setupConnection.query('SELECT * FROM admins WHERE email = ? AND password = ?', [email, password], function(err, results) {
        if (err) {
            console.log('Database error:', err);
            res.json({ success: false, message: 'Database error!' });
        } else if (results.length === 0) {
            res.json({ success: false, message: 'Wrong email or password!' });
        } else {
            const admin = results[0];
            res.json({ 
                success: true, 
                message: 'Admin login successful!',
                data: {
                    admin_id: admin.id,
                    full_name: admin.full_name,
                    email: admin.email,
                    phone: admin.phone,
                    role: admin.role,
                    status: admin.status
                }
            });
        }
    });
});

// ==================== API: REGISTER USER ====================
app.post('/api/register', (req, res) => {
    // Get values from frontend form
 
    // const full_name = req.body.full_name || req.body.name;
    // const email = req.body.email;
    // const phone = req.body.phone;
    // const password = req.body.password;

    const {full_name,email,phone,password} = req.body;
    
    console.log(' Registration form received:');
    console.log('Name:', full_name);
    console.log('Email:', email);
    console.log('Phone:', phone);
    
// Simple validation
if (!full_name) {
    console.log('Name is required!');
    return res.json({ success: false, message: 'Name is required!' });
} else if (!/^[a-zA-Z ]+$/.test(full_name)) {
    console.log('Invalid name format!');
    return res.json({
        success: false,
        message: 'Name must contain only letters and spaces'
    });
}

    
    if (!email) {
        console.log('Email is required!')
        res.json({ success: false, message: 'Email is required!' });
        return;
    }
    if (!email.includes('@')) {
        console.log('Email must contain @ symbol!')
    return res.json({ success: false, message: 'Email must contain @ symbol!' });
}
    
    if (!phone) {
        console.log('Phone is required!')
        res.json({ success: false, message: 'Phone is required!' });
        return;
    }
    
    if (!password || password.length < 8) {
        console.log('Password must be at least 8 characters!')
        res.json({ success: false, message: 'Password must be at least 8 characters!' });
        return;
    }
    if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
        console.log('Password must contain letters and numbers!')
    return res.json({
        success: false,
        message: 'Password must contain letters and numbers!'
    });
}
    
    // Save to database
    setupConnection.query(
        'INSERT INTO users (full_name, email, phone, password) VALUES (?, ?, ?, ?)',
        [full_name, email, phone, password],
        (err, result) => {
            if (err) {
                console.log('Database error:', err);
                res.json({ success: false, message: 'Registration failed! Email might already exist.' });
            } else {
                res.json({ 
                    success: true, 
                    message: 'Registration successful!',
                    data: {
                        user_id: result.insertId,
                        full_name: full_name,
                        email: email
                    }
                });
            }
        }
    );
});

// ==================== API: LOGIN USER ====================
app.post('/api/login', (req, res) => {
    // Get values from frontend form

    // const email = req.body.email;
    // const password = req.body.password;
    
    const {email,password} = req.body;

    console.log(' Login attempt from frontend:');
    console.log('Email:', email);
    
    // Simple validation
    if (!email) {
        res.json({ success: false, message: 'Email is required!' });
        return;
    }
    if (!email.includes('@')) {
        console.log('Email must contain @ symbol!')
    return res.json({ success: false, message: 'Email must contain @ symbol!' });
}
    
    if (!password) {
        console.log('Password is required!')
        res.json({ success: false, message: 'Password is required!' });
        return;
    }
    if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
        console.log('Password must contain letters and numbers!')
    return res.json({
        success: false,
        message: 'Password must contain letters and numbers!'
    });
}
    
    // Check in database
    setupConnection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, results) => {
        if (err) {
            console.log('Database error:', err);
            res.json({ success: false, message: 'Database error!' });
        } else if (results.length === 0) {
            res.json({ success: false, message: 'Wrong email or password!' });
        } else {
            const user = results[0];
            res.json({ 
                success: true, 
                message: 'Login successful!',
                data: {
                    user_id: user.id,
                    full_name: user.full_name,
                    email: user.email,
                    phone: user.phone
                }
            });
        }
    });
});

//  GET REGISTRATION DATA FROM DATABASE

// GET 1: Get registered users from database
app.get('/api/register-user', (req, res) => {
    console.log(' GET request: Fetching registered users from database');
     
    setupConnection.query('SELECT id, full_name, email, phone, created_at FROM users ORDER BY created_at DESC LIMIT 10', (err, results) => {
        if (err) {
            console.log('Database error:', err);
            res.json({ success: false, message: 'Database error!' });
        } else {
            res.json({
                success: true,
                message: 'Registered users fetched from database',
                data: results,
                count: results.length,
                table: 'users'
            });
        }
    });
});

// GET 2: Get registered admins from database  
app.get('/api/register-admin', (req, res) => {
    console.log(' GET request: Fetching registered admins from database');
    
    setupConnection.query('SELECT id, full_name, email, phone, role, status, created_at FROM admins ORDER BY created_at DESC LIMIT 10', (err, results) => {
        if (err) {
            console.log('Database error:', err);
            res.json({ success: false, message: 'Database error!' });
        } else {
            res.json({
                success: true,
                message: 'Registered admins fetched from database',
                data: results,
                count: results.length,
                table: 'admins'
            });
        }
    });
});

// GET 3: Get registered riders from database
app.get('/api/register-rider', (req, res) => {
    console.log(' GET request: Fetching registered riders from database');
    
    setupConnection.query('SELECT id, full_name, email, phone, vehicle_type, vehicle_number, license_number, status, created_at FROM riders ORDER BY created_at DESC LIMIT 10', (err, results) => {
        if (err) {
            console.log('Database error:', err);
            res.json({ success: false, message: 'Database error!' });
        } else {
            res.json({
                success: true,
                message: 'Registered riders fetched from database',
                data: results,
                count: results.length,
                table: 'riders'
            });
        }
    });
});


// ==================== START SERVER ====================
app.listen(3000, function() {
    console.log(' Server running on http://localhost:3000');

    console.log('   - GET  /api/register-user ');
    console.log('   - GET  /api/register-admin ');
    console.log('   - GET  /api/register-rider ');

    console.log('   - POST /api/register - Register new user');
    console.log('   - POST /api/login    - Login user');
    console.log('   - POST /api/register-rider ');
    console.log('   - POST /api/login-rider ');
    console.log('   - POST /api/register-admin ');
    console.log('   - POST /api/login-admin ');
});