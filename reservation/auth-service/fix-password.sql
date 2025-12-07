-- Fix Admin Password
-- Run this in your MySQL database to update the admin password

-- Option 1: Delete and let data.sql recreate (recommended)
DELETE FROM users WHERE email = 'admin@hotel.com';
DELETE FROM users WHERE email = 'user@hotel.com';

-- After running this, restart the auth-service and it will recreate the users with correct passwords

-- OR Option 2: Update the password directly (if you don't want to restart)
-- UPDATE users SET password = '$2a$10$fPQkB7Y3ZpWjZ3aB.MCwI.ew.zS7/iNxN0oMmP1oI6PGhB3h3V8Ky' WHERE email = 'admin@hotel.com';
-- UPDATE users SET password = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi' WHERE email = 'user@hotel.com';
