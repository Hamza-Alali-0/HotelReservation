package com.example.hotel.controller;

import com.example.hotel.entity.Hotel;
import com.example.hotel.entity.Room;
import com.example.hotel.repository.HotelRepository;
import com.example.hotel.repository.RoomRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ApiController {
    private final HotelRepository hotelRepository;
    private final RoomRepository roomRepository;

    public ApiController(HotelRepository hotelRepository, RoomRepository roomRepository) {
        this.hotelRepository = hotelRepository;
        this.roomRepository = roomRepository;
    }

    @GetMapping("/hotels")
    public List<Hotel> hotels() {
        return hotelRepository.findAll();
    }

    @GetMapping("/rooms")
    public List<Room> rooms() {
        return roomRepository.findAll();
    }
}
