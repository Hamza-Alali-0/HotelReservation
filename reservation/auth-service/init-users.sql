-- Auth Service - Initialize Admin User
-- Run this script in your MySQL reservationdb database

-- Create admin user if not exists (password: admin123)
INSERT INTO users (email, password, name, phone, role, created_at, updated_at) 
SELECT 'admin@hotel.com', 
       '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 
       'Admin User', 
       '1234567890', 
       'ADMIN', 
       NOW(), 
       NOW()
WHERE NOT EXISTS (
    SELECT 1 FROM users WHERE email = 'admin@hotel.com'
);

-- Create test user if not exists (password: user123)
INSERT INTO users (email, password, name, phone, role, created_at, updated_at) 
SELECT 'user@hotel.com', 
       '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi', 
       'Test User', 
       '0987654321', 
       'USER', 
       NOW(), 
       NOW()
WHERE NOT EXISTS (
    SELECT 1 FROM users WHERE email = 'user@hotel.com'
);
