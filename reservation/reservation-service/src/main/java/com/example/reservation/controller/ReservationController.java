package com.example.reservation.controller;

import com.example.reservation.client.HotelClient;
import com.example.reservation.dto.ReservationRequest;
import com.example.reservation.entity.PaymentStatus;
import com.example.reservation.entity.Reservation;
import com.example.reservation.repository.ReservationRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Random;

@RestController
@RequestMapping("/reservations")
public class ReservationController {
    private final ReservationRepository reservationRepository;
    private final HotelClient hotelClient;
    private final Random random = new Random();

    public ReservationController(ReservationRepository reservationRepository, HotelClient hotelClient) {
        this.reservationRepository = reservationRepository;
        this.hotelClient = hotelClient;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Reservation create(@RequestBody ReservationRequest req) {
        var room = hotelClient.getRoomById(req.roomId);
        if (room == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Room not found");
        }
        if (!Boolean.TRUE.equals(room.available())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Room not available");
        }
        if (!room.hotelId().equals(req.hotelId)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Hotel ID mismatch");
        }

        PaymentStatus status = random.nextBoolean() ? PaymentStatus.PAID : PaymentStatus.PENDING;

        var reservation = new Reservation(req.roomId, req.hotelId, req.customerName, req.checkin, req.checkout, status);
        return reservationRepository.save(reservation);
    }

    @GetMapping("/history")
    public List<Reservation> history() {
        return reservationRepository.findAll();
    }
}
