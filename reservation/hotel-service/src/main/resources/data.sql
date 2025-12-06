-- Sample Hotels Data
INSERT INTO hotels (name, location) VALUES ('The Grand Palace', 'Paris, France');
INSERT INTO hotels (name, location) VALUES ('Azure Beach Resort', 'Maldives');
INSERT INTO hotels (name, location) VALUES ('Mountain Lodge', 'Swiss Alps');
INSERT INTO hotels (name, location) VALUES ('The Ritz Continental', 'London, UK');
INSERT INTO hotels (name, location) VALUES ('Sunset Villa Resort', 'Santorini, Greece');
INSERT INTO hotels (name, location) VALUES ('Royal Marina Hotel', 'Dubai, UAE');

-- Sample Rooms Data for Hotel 1 (The Grand Palace)
INSERT INTO rooms (hotel_id, room_number, capacity, price, available) VALUES (1, '101', 2, 450.00, TRUE);
INSERT INTO rooms (hotel_id, room_number, capacity, price, available) VALUES (1, '201', 4, 850.00, TRUE);
INSERT INTO rooms (hotel_id, room_number, capacity, price, available) VALUES (1, '301', 2, 550.00, FALSE);

-- Sample Rooms Data for Hotel 2 (Azure Beach Resort)
INSERT INTO rooms (hotel_id, room_number, capacity, price, available) VALUES (2, '101', 2, 1200.00, TRUE);
INSERT INTO rooms (hotel_id, room_number, capacity, price, available) VALUES (2, '102', 3, 750.00, TRUE);

-- Sample Rooms Data for Hotel 3 (Mountain Lodge)
INSERT INTO rooms (hotel_id, room_number, capacity, price, available) VALUES (3, '301', 2, 380.00, TRUE);
INSERT INTO rooms (hotel_id, room_number, capacity, price, available) VALUES (3, '302', 4, 550.00, TRUE);

-- Sample Rooms Data for Hotel 4 (The Ritz Continental)
INSERT INTO rooms (hotel_id, room_number, capacity, price, available) VALUES (4, '401', 2, 520.00, TRUE);
INSERT INTO rooms (hotel_id, room_number, capacity, price, available) VALUES (4, '501', 3, 980.00, TRUE);

-- Sample Rooms Data for Hotel 5 (Sunset Villa Resort)
INSERT INTO rooms (hotel_id, room_number, capacity, price, available) VALUES (5, '101', 2, 620.00, TRUE);
INSERT INTO rooms (hotel_id, room_number, capacity, price, available) VALUES (5, '102', 2, 890.00, TRUE);

-- Sample Rooms Data for Hotel 6 (Royal Marina Hotel)
INSERT INTO rooms (hotel_id, room_number, capacity, price, available) VALUES (6, '601', 2, 480.00, TRUE);
INSERT INTO rooms (hotel_id, room_number, capacity, price, available) VALUES (6, '701', 6, 1500.00, TRUE);

