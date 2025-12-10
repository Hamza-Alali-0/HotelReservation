-- Hotel Service - Initialize Hotels and Rooms
-- This file will run on startup to populate the database with sample data

-- Insert hotels if they don't exist (include default stars value)
INSERT INTO hotels (name, location, stars) 
SELECT 'The Grand Palace', 'Paris, France', 5
WHERE NOT EXISTS (SELECT 1 FROM hotels WHERE name = 'The Grand Palace');

INSERT INTO hotels (name, location, stars) 
SELECT 'Azure Beach Resort', 'Maldives', 5
WHERE NOT EXISTS (SELECT 1 FROM hotels WHERE name = 'Azure Beach Resort');

INSERT INTO hotels (name, location, stars) 
SELECT 'Mountain Lodge', 'Swiss Alps', 4
WHERE NOT EXISTS (SELECT 1 FROM hotels WHERE name = 'Mountain Lodge');

INSERT INTO hotels (name, location, stars) 
SELECT 'The Ritz Continental', 'London, UK', 5
WHERE NOT EXISTS (SELECT 1 FROM hotels WHERE name = 'The Ritz Continental');

INSERT INTO hotels (name, location, stars) 
SELECT 'Sunset Villa Resort', 'Santorini, Greece', 4
WHERE NOT EXISTS (SELECT 1 FROM hotels WHERE name = 'Sunset Villa Resort');

INSERT INTO hotels (name, location, stars) 
SELECT 'Royal Marina Hotel', 'Dubai, UAE', 5
WHERE NOT EXISTS (SELECT 1 FROM hotels WHERE name = 'Royal Marina Hotel');

-- Insert rooms for each hotel
-- The Grand Palace (Hotel ID will be 1)
INSERT INTO rooms (hotel_id, room_number, type, price, capacity, available, size)
SELECT 1, '101', 'Deluxe Suite', 450.00, 2, true, 55.0
WHERE NOT EXISTS (SELECT 1 FROM rooms WHERE hotel_id = 1 AND room_number = '101');

INSERT INTO rooms (hotel_id, room_number, type, price, capacity, available, size)
SELECT 1, '201', 'Royal Suite', 850.00, 4, true, 85.0
WHERE NOT EXISTS (SELECT 1 FROM rooms WHERE hotel_id = 1 AND room_number = '201');

-- Azure Beach Resort (Hotel ID will be 2)
INSERT INTO rooms (hotel_id, room_number, type, price, capacity, available, size)
SELECT 2, '101', 'Water Villa', 1200.00, 2, true, 70.0
WHERE NOT EXISTS (SELECT 1 FROM rooms WHERE hotel_id = 2 AND room_number = '101');

INSERT INTO rooms (hotel_id, room_number, type, price, capacity, available, size)
SELECT 2, '102', 'Beach Bungalow', 750.00, 3, true, 50.0
WHERE NOT EXISTS (SELECT 1 FROM rooms WHERE hotel_id = 2 AND room_number = '102');

-- Mountain Lodge (Hotel ID will be 3)
INSERT INTO rooms (hotel_id, room_number, type, price, capacity, available, size)
SELECT 3, '301', 'Mountain View', 380.00, 2, true, 35.0
WHERE NOT EXISTS (SELECT 1 FROM rooms WHERE hotel_id = 3 AND room_number = '301');

INSERT INTO rooms (hotel_id, room_number, type, price, capacity, available, size)
SELECT 3, '302', 'Chalet Suite', 550.00, 4, true, 60.0
WHERE NOT EXISTS (SELECT 1 FROM rooms WHERE hotel_id = 3 AND room_number = '302');

-- The Ritz Continental (Hotel ID will be 4)
INSERT INTO rooms (hotel_id, room_number, type, price, capacity, available, size)
SELECT 4, '401', 'Classic Room', 520.00, 2, true, 40.0
WHERE NOT EXISTS (SELECT 1 FROM rooms WHERE hotel_id = 4 AND room_number = '401');

INSERT INTO rooms (hotel_id, room_number, type, price, capacity, available, size)
SELECT 4, '501', 'Luxury Suite', 980.00, 3, true, 75.0
WHERE NOT EXISTS (SELECT 1 FROM rooms WHERE hotel_id = 4 AND room_number = '501');

-- Sunset Villa Resort (Hotel ID will be 5)
INSERT INTO rooms (hotel_id, room_number, type, price, capacity, available, size)
SELECT 5, '101', 'Sea View Suite', 620.00, 2, true, 48.0
WHERE NOT EXISTS (SELECT 1 FROM rooms WHERE hotel_id = 5 AND room_number = '101');

INSERT INTO rooms (hotel_id, room_number, type, price, capacity, available, size)
SELECT 5, '102', 'Honeymoon Villa', 890.00, 2, true, 65.0
WHERE NOT EXISTS (SELECT 1 FROM rooms WHERE hotel_id = 5 AND room_number = '102');

-- Royal Marina Hotel (Hotel ID will be 6)
INSERT INTO rooms (hotel_id, room_number, type, price, capacity, available, size)
SELECT 6, '601', 'Marina Room', 480.00, 2, true, 38.0
WHERE NOT EXISTS (SELECT 1 FROM rooms WHERE hotel_id = 6 AND room_number = '601');

INSERT INTO rooms (hotel_id, room_number, type, price, capacity, available, size)
SELECT 6, '701', 'Penthouse', 1500.00, 6, true, 220.0
WHERE NOT EXISTS (SELECT 1 FROM rooms WHERE hotel_id = 6 AND room_number = '701');
