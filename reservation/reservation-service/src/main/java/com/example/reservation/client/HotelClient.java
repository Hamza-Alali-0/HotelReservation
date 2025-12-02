package com.example.reservation.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "hotel-service")
public interface HotelClient {
    @GetMapping("/rooms/{id}")
    RoomDto getRoomById(@PathVariable("id") Long id);

    @GetMapping("/hotels")
    java.util.List<HotelDto> getHotels();

    @GetMapping("/rooms")
    java.util.List<RoomDto> getRooms();

    record RoomDto(Long id, Long hotelId, String roomNumber, Integer capacity, Double price, Boolean available) {}

    record HotelDto(Long id, String name, String location) {}
}
