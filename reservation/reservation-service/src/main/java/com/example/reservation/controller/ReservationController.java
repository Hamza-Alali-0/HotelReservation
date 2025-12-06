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
@RequestMapping("/api/reservations")
public class ReservationController {
    private final ReservationRepository reservationRepository;
    private final HotelClient hotelClient;
    private final Random random = new Random();

    public ReservationController(ReservationRepository reservationRepository, HotelClient hotelClient) {
        this.reservationRepository = reservationRepository;
        this.hotelClient = hotelClient;
    }

    /**
     * Create a new reservation
     * POST /api/reservations
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Reservation createReservation(@RequestBody ReservationRequest req) {
        // Validate room exists and is available via Feign client
        var room = hotelClient.getRoomById(req.roomId);
        if (room == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Room not found with id: " + req.roomId);
        }
        if (!Boolean.TRUE.equals(room.available())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Room is not available");
        }
        if (!room.hotelId().equals(req.hotelId)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Room does not belong to the specified hotel");
        }

        // Randomly assign payment status (simulating payment processing)
        PaymentStatus status = random.nextBoolean() ? PaymentStatus.PAID : PaymentStatus.PENDING;

        var reservation = new Reservation(
            req.roomId,
            req.hotelId,
            req.customerName,
            req.checkin,
            req.checkout,
            status
        );
        
        return reservationRepository.save(reservation);
    }

    /**
     * Get all reservations (history)
     * GET /api/reservations/history
     */
    @GetMapping("/history")
    public List<Reservation> getReservationHistory() {
        return reservationRepository.findAll();
    }

    /**
     * Get reservation by ID
     * GET /api/reservations/{id}
     */
    @GetMapping("/{id}")
    public Reservation getReservationById(@PathVariable Long id) {
        return reservationRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Reservation not found with id: " + id));
    }
}
