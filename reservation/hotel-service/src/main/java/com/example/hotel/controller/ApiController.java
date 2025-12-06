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
}
