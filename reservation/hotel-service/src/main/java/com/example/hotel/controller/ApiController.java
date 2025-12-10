package com.example.hotel.controller;

import com.example.hotel.entity.Hotel;
import com.example.hotel.entity.Room;
import com.example.hotel.repository.HotelRepository;
import com.example.hotel.repository.RoomRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class ApiController {
    private final HotelRepository hotelRepository;
    private final RoomRepository roomRepository;

    public ApiController(HotelRepository hotelRepository, RoomRepository roomRepository) {
        this.hotelRepository = hotelRepository;
        this.roomRepository = roomRepository;
    }

    /**
     * Get all hotels
     * GET /api/hotels
     */
    @GetMapping("/hotels")
    public List<Hotel> getAllHotels() {
        return hotelRepository.findAll();
    }

    /**
     * Get hotel by ID
     * GET /api/hotels/{id}
     */
    @GetMapping("/hotels/{id}")
    public Hotel getHotelById(@PathVariable Long id) {
        return hotelRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Hotel not found with id: " + id));
    }

    /**
     * Get all rooms
     * GET /api/rooms
     */
    @GetMapping("/rooms")
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    /**
     * Get room by ID
     * GET /api/rooms/{id}
     */
    @GetMapping("/rooms/{id}")
    public Room getRoomById(@PathVariable Long id) {
        return roomRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Room not found with id: " + id));
    }

    /**
     * Get rooms by hotel ID
     * GET /api/hotels/{hotelId}/rooms
     */
    @GetMapping("/hotels/{hotelId}/rooms")
    public List<Room> getRoomsByHotelId(@PathVariable Long hotelId) {
        // Verify hotel exists
        if (!hotelRepository.existsById(hotelId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Hotel not found with id: " + hotelId);
        }
        return roomRepository.findAll().stream()
                .filter(room -> room.getHotelId().equals(hotelId))
                .collect(Collectors.toList());
    }

    /**
     * Create a new hotel (Admin only)
     * POST /api/hotels
     */
    @PostMapping("/hotels")
    public Hotel createHotel(@RequestBody Hotel hotel) {
        return hotelRepository.save(hotel);
    }

    /**
     * Update a hotel (Admin only)
     * PUT /api/hotels/{id}
     */
    @PutMapping("/hotels/{id}")
    public Hotel updateHotel(@PathVariable Long id, @RequestBody Hotel hotelDetails) {
        Hotel hotel = hotelRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Hotel not found with id: " + id));
        
        hotel.setName(hotelDetails.getName());
        hotel.setLocation(hotelDetails.getLocation());
        hotel.setDescription(hotelDetails.getDescription());
        hotel.setStars(hotelDetails.getStars());
        hotel.setImage(hotelDetails.getImage());
        hotel.setAmenities(hotelDetails.getAmenities());
        
        return hotelRepository.save(hotel);
    }

    /**
     * Delete a hotel (Admin only)
     * DELETE /api/hotels/{id}
     */
    @DeleteMapping("/hotels/{id}")
    public void deleteHotel(@PathVariable Long id) {
        if (!hotelRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Hotel not found with id: " + id);
        }
        hotelRepository.deleteById(id);
    }

    /**
     * Create a new room (Admin only)
     * POST /api/rooms
     */
    @PostMapping("/rooms")
    public Room createRoom(@RequestBody Room room) {
        // Verify hotel exists
        if (!hotelRepository.existsById(room.getHotelId())) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Hotel not found with id: " + room.getHotelId());
        }
        return roomRepository.save(room);
    }

    /**
     * Update a room (Admin only)
     * PUT /api/rooms/{id}
     */
    @PutMapping("/rooms/{id}")
    public Room updateRoom(@PathVariable Long id, @RequestBody Room roomDetails) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Room not found with id: " + id));
        
        room.setHotelId(roomDetails.getHotelId());
        room.setRoomNumber(roomDetails.getRoomNumber());
        room.setType(roomDetails.getType());
        room.setPrice(roomDetails.getPrice());
        room.setCapacity(roomDetails.getCapacity());
        room.setAvailable(roomDetails.isAvailable());
        room.setSize(roomDetails.getSize());
        room.setDescription(roomDetails.getDescription());
        room.setAmenities(roomDetails.getAmenities());
        
        return roomRepository.save(room);
    }

    /**
     * Delete a room (Admin only)
     * DELETE /api/rooms/{id}
     */
    @DeleteMapping("/rooms/{id}")
    public void deleteRoom(@PathVariable Long id) {
        if (!roomRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Room not found with id: " + id);
        }
        roomRepository.deleteById(id);
    }
}
