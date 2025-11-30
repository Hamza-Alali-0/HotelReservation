package com.example.reservation.dto;

import com.example.reservation.entity.PaymentStatus;
import java.time.LocalDate;

public class ReservationResponse {
    public Long id;
    public Long roomId;
    public Long hotelId;
    public String customerName;
    public LocalDate date;
    public PaymentStatus paymentStatus;
}
