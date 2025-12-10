-- Auth Service - Initialize Users
-- This file will run on startup to ensure admin and test users exist

-- Insert admin user if not exists (password: admin123)
-- Using BCrypt hash with strength 10: $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy
INSERT INTO users (email, username, password, name, phone, role, created_at, updated_at) 
SELECT 'admin@hotel.com', 
       'admin', 
       '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 
       'Admin User', 
       '1234567890', 
       'ADMIN', 
       NOW(), 
       NOW()
WHERE NOT EXISTS (
    SELECT 1 FROM users WHERE email = 'admin@hotel.com'
);


-- Insert test user if not exists (password: user123)
-- Using BCrypt hash with strength 10: $2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi
INSERT INTO users (email, username, password, name, phone, role, created_at, updated_at) 
SELECT 'user@hotel.com', 
       'testuser', 
       '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi', 
       'Test User', 
       '0987654321', 
       'USER', 
       NOW(), 
       NOW()
WHERE NOT EXISTS (
    SELECT 1 FROM users WHERE email = 'user@hotel.com'
);

