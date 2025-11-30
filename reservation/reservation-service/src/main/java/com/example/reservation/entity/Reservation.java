package com.example.reservation.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "reservations")
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long roomId;
    private Long hotelId;
    private String customerName;
    private LocalDate checkin;
    private LocalDate checkout;

    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;

    public Reservation() {}

    public Reservation(Long roomId, Long hotelId, String customerName, LocalDate checkin, LocalDate checkout, PaymentStatus paymentStatus) {
        this.roomId = roomId;
        this.hotelId = hotelId;
        this.customerName = customerName;
        this.checkin = checkin;
        this.checkout = checkout;
        this.paymentStatus = paymentStatus;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getRoomId() { return roomId; }
    public void setRoomId(Long roomId) { this.roomId = roomId; }
    public Long getHotelId() { return hotelId; }
    public void setHotelId(Long hotelId) { this.hotelId = hotelId; }
    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }
    public LocalDate getCheckin() { return checkin; }
    public void setCheckin(LocalDate checkin) { this.checkin = checkin; }
    public LocalDate getCheckout() { return checkout; }
    public void setCheckout(LocalDate checkout) { this.checkout = checkout; }
    public PaymentStatus getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(PaymentStatus paymentStatus) { this.paymentStatus = paymentStatus; }
}
