package com.example.reservation.dto;

import java.time.LocalDate;
// transporeter les donnes
public class ReservationRequest {
    public Long roomId;
    public Long hotelId;
    public String customerName;
    public LocalDate checkin;
    public LocalDate checkout;

    public ReservationRequest() {}
}