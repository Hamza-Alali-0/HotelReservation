package com.example.reservation.controller;

import com.example.reservation.client.HotelClient;
import com.example.reservation.dto.ReservationRequest;
import com.example.reservation.entity.PaymentStatus;
import com.example.reservation.entity.Reservation;
import com.example.reservation.repository.ReservationRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.time.LocalDate;
import java.util.List;
import java.util.Random;

@Controller
public class UiController {
    private final ReservationRepository reservationRepository;
    private final HotelClient hotelClient;
    private final Random random = new Random();

    public UiController(ReservationRepository reservationRepository, HotelClient hotelClient) {
        this.reservationRepository = reservationRepository;
        this.hotelClient = hotelClient;
    }

    @GetMapping({"/", "/ui"})
    public String index() {
        return "index";
    }

    @GetMapping("/ui/reserve")
    public String reserveForm(Model model) {
        var hotels = hotelClient.getHotels();
        var rooms = hotelClient.getRooms();
        model.addAttribute("hotels", hotels);
        if (!hotels.isEmpty()) {
            Long firstHotelId = hotels.get(0).id();
            var filtered = rooms.stream().filter(r -> r.hotelId().equals(firstHotelId)).toList();
            model.addAttribute("rooms", filtered);
        } else {
            model.addAttribute("rooms", java.util.List.of());
        }
        return "reserve";
    }

    @GetMapping("/ui/rooms")
    @org.springframework.web.bind.annotation.ResponseBody
    public java.util.List<com.example.reservation.client.HotelClient.RoomDto> roomsForHotel(@org.springframework.web.bind.annotation.RequestParam("hotelId") Long hotelId) {
        var rooms = hotelClient.getRooms();
        return rooms.stream().filter(r -> r.hotelId().equals(hotelId)).toList();
    }

    @PostMapping("/ui/reserve")
    public String submitReservation(@RequestParam("roomId") Long roomId,
                                    @RequestParam("hotelId") Long hotelId,
                                    @RequestParam("customerName") String customerName,
                                    @RequestParam("checkin") String checkin,
                                    @RequestParam("checkout") String checkout,
                                    RedirectAttributes redirectAttributes) {
        // Validate via HotelClient
        var room = hotelClient.getRoomById(roomId);
        if (room == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Room not found");
        }
        if (!Boolean.TRUE.equals(room.available())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Room not available");
        }
        if (!room.hotelId().equals(hotelId)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Hotel ID mismatch");
        }

        PaymentStatus status = PaymentStatus.PAID;
        LocalDate ci = LocalDate.parse(checkin);
        LocalDate co = LocalDate.parse(checkout);
        if (co.isBefore(ci)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Checkout must be on or after checkin");
        }
        Reservation r = new Reservation(roomId, hotelId, customerName, ci, co, status);
        reservationRepository.save(r);

        redirectAttributes.addFlashAttribute("message", "Reservation created (status: " + status + ")");
        return "redirect:/ui/history";
    }

    @GetMapping("/ui/history")
    public String history(Model model) {
        List<Reservation> all = reservationRepository.findAll();
        model.addAttribute("reservations", all);
        return "history";
    }
}
