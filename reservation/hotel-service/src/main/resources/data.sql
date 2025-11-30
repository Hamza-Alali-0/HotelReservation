-- Seed one hotel and two rooms
-- INSERT INTO hotels (name, location) VALUES ('Grand Plaza', 'Downtown');
-- Seed disabled: removed automatic insertion of the 'Grand Plaza' hotel on startup.

-- Assuming the hotel receives id=1; create two rooms
INSERT INTO rooms (hotel_id, room_number, capacity, price, available) VALUES (1, '101', 2, 99.99, TRUE);
INSERT INTO rooms (hotel_id, room_number, capacity, price, available) VALUES (1, '102', 4, 149.99, FALSE);
