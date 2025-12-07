-- Auth Service - Initialize Users
-- This file will run on startup to ensure admin and test users exist

-- Insert admin user if not exists (password: admin123)
-- Using BCrypt hash with strength 10
INSERT INTO users (email, username, password, name, phone, role, created_at, updated_at) 
SELECT 'admin@hotel.com', 
       'admin', 
       '$2a$10$fPQkB7Y3ZpWjZ3aB.MCwI.ew.zS7/iNxN0oMmP1oI6PGhB3h3V8Ky', 
       'Admin User', 
       '1234567890', 
       'ADMIN', 
       NOW(), 
       NOW()
WHERE NOT EXISTS (
    SELECT 1 FROM users WHERE email = 'admin@hotel.com'
);

-- Insert test user if not exists (password: user123)
-- BCrypt hash for 'user123': $2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi
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
