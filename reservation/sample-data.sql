-- =====================================================
-- Sample Hotels Data for Hotel Reservation System
-- =====================================================
-- Run this script to populate the database with sample hotels
-- Execute in MySQL after the hotel-service has created the tables

USE hoteldb;

-- Clear existing data (optional - comment out if you want to keep existing data)
-- DELETE FROM rooms;
-- DELETE FROM hotels;

-- Insert Sample Hotels
INSERT INTO hotels (name, location) VALUES 
('Grand Plaza Hotel', 'Downtown'),
('Ocean View Resort', 'Beach Boulevard'),
('Mountain Peak Lodge', 'Mountain Valley'),
('City Center Inn', 'Main Street'),
('Sunset Paradise', 'Coastal Highway'),
('Royal Gardens Hotel', 'Garden District'),
('Metro Business Hotel', 'Financial District'),
('Lakeside Retreat', 'Lake Shore Drive');

-- Get the hotel IDs (assuming auto-increment starts at 1)
-- Insert additional rooms for each hotel

-- Grand Plaza Hotel (ID: 1) - Already has rooms from data.sql
-- Insert more rooms
INSERT INTO rooms (hotel_id, room_number, capacity, price, available) VALUES 
(1, '103', 2, 89.99, TRUE),
(1, '104', 4, 159.99, TRUE),
(1, '201', 2, 119.99, TRUE),
(1, '202', 3, 139.99, FALSE);

-- Ocean View Resort (ID: 2)
INSERT INTO rooms (hotel_id, room_number, capacity, price, available) VALUES 
(2, '101', 2, 129.99, TRUE),
(2, '102', 2, 129.99, TRUE),
(2, '103', 4, 189.99, TRUE),
(2, '201', 2, 149.99, FALSE),
(2, '202', 4, 209.99, TRUE);

-- Mountain Peak Lodge (ID: 3)
INSERT INTO rooms (hotel_id, room_number, capacity, price, available) VALUES 
(3, '101', 2, 99.99, TRUE),
(3, '102', 4, 169.99, TRUE),
(3, '103', 2, 99.99, FALSE),
(3, '201', 3, 139.99, TRUE);

-- City Center Inn (ID: 4)
INSERT INTO rooms (hotel_id, room_number, capacity, price, available) VALUES 
(4, '101', 2, 79.99, TRUE),
(4, '102', 2, 79.99, TRUE),
(4, '103', 3, 119.99, TRUE),
(4, '201', 4, 149.99, FALSE);

-- Sunset Paradise (ID: 5)
INSERT INTO rooms (hotel_id, room_number, capacity, price, available) VALUES 
(5, '101', 2, 159.99, TRUE),
(5, '102', 4, 229.99, TRUE),
(5, '103', 2, 159.99, TRUE),
(5, '201', 3, 189.99, TRUE);

-- Royal Gardens Hotel (ID: 6)
INSERT INTO rooms (hotel_id, room_number, capacity, price, available) VALUES 
(6, '101', 2, 109.99, TRUE),
(6, '102', 2, 109.99, FALSE),
(6, '103', 4, 179.99, TRUE),
(6, '201', 3, 149.99, TRUE);

-- Metro Business Hotel (ID: 7)
INSERT INTO rooms (hotel_id, room_number, capacity, price, available) VALUES 
(7, '101', 2, 89.99, TRUE),
(7, '102', 2, 89.99, TRUE),
(7, '103', 3, 129.99, TRUE),
(7, '201', 2, 99.99, FALSE);

-- Lakeside Retreat (ID: 8)
INSERT INTO rooms (hotel_id, room_number, capacity, price, available) VALUES 
(8, '101', 2, 119.99, TRUE),
(8, '102', 4, 189.99, TRUE),
(8, '103', 2, 119.99, TRUE),
(8, '201', 3, 159.99, TRUE);

-- Verify data
SELECT 
    h.id as hotel_id,
    h.name as hotel_name,
    h.location,
    COUNT(r.id) as total_rooms,
    SUM(CASE WHEN r.available = TRUE THEN 1 ELSE 0 END) as available_rooms,
    MIN(r.price) as min_price,
    MAX(r.price) as max_price
FROM hotels h
LEFT JOIN rooms r ON h.id = r.hotel_id
GROUP BY h.id, h.name, h.location
ORDER BY h.id;

-- Sample reservation data (optional)
-- Note: Make sure the customer name matches a user from your auth system
USE reservationdb;

INSERT INTO reservations (room_id, hotel_id, customer_name, checkin, checkout, payment_status) VALUES 
(1, 1, 'John Doe', '2024-12-10', '2024-12-15', 'PAID'),
(2, 1, 'Jane Smith', '2024-12-12', '2024-12-14', 'PENDING'),
(5, 2, 'Bob Wilson', '2024-12-15', '2024-12-20', 'PAID');

-- Verify reservations
SELECT * FROM reservations ORDER BY id DESC LIMIT 10;

-- Summary
SELECT 
    'Hotels' as Entity,
    COUNT(*) as Total
FROM hotels
UNION ALL
SELECT 
    'Rooms' as Entity,
    COUNT(*) as Total
FROM hoteldb.rooms
UNION ALL
SELECT 
    'Reservations' as Entity,
    COUNT(*) as Total
FROM reservationdb.reservations;
