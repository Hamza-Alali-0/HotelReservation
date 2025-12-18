import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  hotelService,
  roomService,
  reservationService,
} from "../../services/api";
import { Hotel, Room, ReservationCreate } from "../../types";
import "./Reservation.css";

const Reservation: React.FC = () => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    customerName: "",
    checkin: "",
    checkout: "",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (hotelId) {
      fetchHotelAndRooms();
    }
  }, [hotelId]);

  const fetchHotelAndRooms = async () => {
    try {
      setLoading(true);
      setError(null);
      const [hotelData, roomsData] = await Promise.all([
        hotelService.getHotelById(parseInt(hotelId!)),
        roomService.getAvailableRooms(parseInt(hotelId!)),
      ]);

      if (!hotelData) {
        setError("Hotel not found. Please try another property.");
        return;
      }

      setHotel(hotelData);
      setRooms(roomsData || []);
      if (roomsData && roomsData.length > 0) {
        setSelectedRoom(roomsData[0]);
      }
    } catch (err: any) {
      console.error("Error loading hotel:", err);
      const errorMessage =
        err.response?.status === 404
          ? "Hotel not found. Please check the hotel ID."
          : err.response?.status === 500
          ? "Server error. Please try again later or contact support."
          : "Failed to load hotel details. Please refresh the page.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.customerName.trim()) {
      errors.customerName = "Full name is required";
    }

    if (!formData.checkin) {
      errors.checkin = "Check-in date is required";
    }

    if (!formData.checkout) {
      errors.checkout = "Check-out date is required";
    }

    if (!selectedRoom) {
      errors.room = "Please select a room";
    }

    if (formData.checkin && formData.checkout) {
      const checkIn = new Date(formData.checkin);
      const checkOut = new Date(formData.checkout);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (checkIn < today) {
        errors.checkin = "Check-in date cannot be in the past";
      }

      if (checkOut <= checkIn) {
        errors.checkout = "Check-out must be after check-in";
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleRoomSelect = (room: Room) => {
    setSelectedRoom(room);
    if (formErrors.room) {
      setFormErrors((prev) => ({ ...prev, room: "" }));
    }
  };

  const calculateNights = (): number => {
    if (!formData.checkin || !formData.checkout) return 0;
    const checkIn = new Date(formData.checkin);
    const checkOut = new Date(formData.checkout);
    const diffTime = checkOut.getTime() - checkIn.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const calculateTotal = (): number => {
    if (!selectedRoom) return 0;
    const nights = calculateNights();
    return selectedRoom.price * nights;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      setError("Please sign in to make a reservation. Redirecting to login...");
      setTimeout(() => {
        navigate("/login", { state: { from: `/reserve/${hotelId}` } });
      }, 2000);
      return;
    }

    if (!validateForm() || !selectedRoom) return;

    setSubmitting(true);
    setError(null);

    try {
      const reservationData: ReservationCreate = {
        customerName: formData.customerName,
        hotelId: parseInt(hotelId!),
        roomId: selectedRoom.id,
        checkin: formData.checkin,
        checkout: formData.checkout,
      };

      await reservationService.createReservation(reservationData);
      setSuccess(true);

      setTimeout(() => {
        navigate("/history");
      }, 3000);
    } catch (err: any) {
      console.error("Reservation error:", err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        setError("Your session has expired. Please sign in again to continue.");
        setTimeout(() => {
          navigate("/login", { state: { from: `/reserve/${hotelId}` } });
        }, 2000);
      } else {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to create reservation. Please try again."
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const getMinCheckoutDate = () => {
    if (!formData.checkin) return getMinDate();
    const checkIn = new Date(formData.checkin);
    checkIn.setDate(checkIn.getDate() + 1);
    return checkIn.toISOString().split("T")[0];
  };

  if (loading) {
    return (
      <div className="reservation-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading hotel details...</p>
        </div>
      </div>
    );
  }

  if (error && !hotel) {
    return (
      <div className="reservation-page">
        <div className="error-container">
          <div className="error-icon">!</div>
          <h2>Error Loading Hotel</h2>
          <p>{error}</p>
          <button className="btn-primary" onClick={() => navigate("/hotels")}>
            Browse Hotels
          </button>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="reservation-page">
        <div className="success-container">
          <div className="success-icon">✓</div>
          <h2>Reservation Confirmed!</h2>
          <p>Your booking at {hotel?.name} has been successfully made.</p>
          <div className="success-summary">
            <div className="summary-item">
              <span>Check-in</span>
              <strong>
                {new Date(formData.checkin).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </strong>
            </div>
            <div className="summary-item">
              <span>Check-out</span>
              <strong>
                {new Date(formData.checkout).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </strong>
            </div>
          </div>
          <p className="redirect-text">Redirecting to reservation history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="reservation-page">
      {/* Hero Section */}
      <div
        className="reservation-hero"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600)`,
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="hero-badge">Complete Your Booking</span>
          <h1>Reserve Your Stay</h1>
          <p>Just a few steps away from your perfect getaway</p>
        </div>
      </div>

      <div className="reservation-container">
        {/* Login Warning Banner */}
        {!isAuthenticated && (
          <div
            className="auth-warning-banner"
            style={{
              background: "linear-gradient(135deg, #f59e0b, #d97706)",
              color: "white",
              padding: "1.25rem 2rem",
              borderRadius: "12px",
              marginBottom: "2rem",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              boxShadow: "0 4px 20px rgba(245, 158, 11, 0.3)",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            <div>
              <strong style={{ display: "block", marginBottom: "0.25rem" }}>
                Sign In Required
              </strong>
              <span>
                You must be logged in to make a reservation. Please{" "}
                <a
                  href="/login"
                  style={{
                    color: "white",
                    textDecoration: "underline",
                    fontWeight: "bold",
                  }}
                >
                  sign in
                </a>{" "}
                or{" "}
                <a
                  href="/signup"
                  style={{
                    color: "white",
                    textDecoration: "underline",
                    fontWeight: "bold",
                  }}
                >
                  create an account
                </a>{" "}
                to continue.
              </span>
            </div>
          </div>
        )}

        {/* Hotel Summary Card */}
        <div className="hotel-summary-card">
          <div
            className="hotel-summary-image"
            style={{
              backgroundImage: `url(${
                hotel?.image ||
                "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600"
              })`,
            }}
          >
            <div className="hotel-rating">
              <span className="star">★</span>
              <span>{hotel?.stars || 5}</span>
            </div>
          </div>
          <div className="hotel-summary-info">
            <h2>{hotel?.name}</h2>
            <p className="hotel-location">{hotel?.location}</p>
            <div className="hotel-amenities">
              {hotel?.amenities
                ?.slice(0, 3)
                .map((amenity, idx) => <span key={idx}>{amenity}</span>) || (
                <>
                  <span>Free WiFi</span>
                  <span>Pool</span>
                  <span>Spa</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="reservation-layout">
          {/* Booking Form */}
          <div className="booking-form-section">
            <form onSubmit={handleSubmit} className="booking-form">
              {/* Guest Information */}
              <div className="form-section">
                <h3 className="section-title">
                  <span className="section-number">1</span>
                  Guest Information
                </h3>

                <div className="form-group">
                  <label htmlFor="customerName">Full Name</label>
                  <input
                    type="text"
                    id="customerName"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={formErrors.customerName ? "error" : ""}
                  />
                  {formErrors.customerName && (
                    <span className="error-message">
                      {formErrors.customerName}
                    </span>
                  )}
                </div>
              </div>

              {/* Stay Details */}
              <div className="form-section">
                <h3 className="section-title">
                  <span className="section-number">2</span>
                  Stay Details
                </h3>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="checkin">Check-in Date</label>
                    <input
                      type="date"
                      id="checkin"
                      name="checkin"
                      value={formData.checkin}
                      onChange={handleChange}
                      min={getMinDate()}
                      className={formErrors.checkin ? "error" : ""}
                    />
                    {formErrors.checkin && (
                      <span className="error-message">
                        {formErrors.checkin}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="checkout">Check-out Date</label>
                    <input
                      type="date"
                      id="checkout"
                      name="checkout"
                      value={formData.checkout}
                      onChange={handleChange}
                      min={getMinCheckoutDate()}
                      className={formErrors.checkout ? "error" : ""}
                    />
                    {formErrors.checkout && (
                      <span className="error-message">
                        {formErrors.checkout}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Room Selection */}
              <div className="form-section">
                <h3 className="section-title">
                  <span className="section-number">3</span>
                  Select Room
                </h3>

                {rooms.length === 0 ? (
                  <div className="no-rooms">
                    <p>No rooms available for this hotel at the moment.</p>
                  </div>
                ) : (
                  <div className="room-options">
                    {rooms.map((room) => (
                      <div
                        key={room.id}
                        className={`room-option ${
                          selectedRoom?.id === room.id ? "selected" : ""
                        }`}
                        onClick={() => handleRoomSelect(room)}
                      >
                        <div
                          className="room-image"
                          style={{
                            backgroundImage: `url(https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&sig=${room.id})`,
                          }}
                        ></div>
                        <div className="room-info">
                          <h4>Room {room.roomNumber}</h4>
                          <p>
                            {room.type || "Standard Room"} • Sleeps{" "}
                            {room.capacity}
                          </p>
                          <div className="room-price">
                            ${room.price}
                            <span>/night</span>
                          </div>
                        </div>
                        <div className="room-select-indicator"></div>
                      </div>
                    ))}
                  </div>
                )}
                {formErrors.room && (
                  <span className="error-message">{formErrors.room}</span>
                )}
              </div>

              {error && (
                <div className="form-error-banner">
                  <span className="error-icon">!</span>
                  {error}
                </div>
              )}
            </form>
          </div>

          {/* Booking Summary */}
          <div className="booking-summary-section">
            <div className="booking-summary">
              <h3>Booking Summary</h3>

              <div className="summary-hotel">
                <img
                  src={
                    hotel?.image ||
                    "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=200"
                  }
                  alt={hotel?.name}
                />
                <div>
                  <h4>{hotel?.name}</h4>
                  <p>{hotel?.location}</p>
                </div>
              </div>

              <div className="summary-details">
                {formData.checkin && formData.checkout && (
                  <>
                    <div className="summary-row">
                      <span>Check-in</span>
                      <span>
                        {new Date(formData.checkin).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="summary-row">
                      <span>Check-out</span>
                      <span>
                        {new Date(formData.checkout).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="summary-row">
                      <span>Duration</span>
                      <span>
                        {calculateNights()} night
                        {calculateNights() !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </>
                )}
                {selectedRoom && (
                  <div className="summary-row">
                    <span>Room</span>
                    <span>Room {selectedRoom.roomNumber}</span>
                  </div>
                )}
              </div>

              <div className="price-breakdown">
                <div className="price-row">
                  <span>
                    ${selectedRoom?.price || 0} × {calculateNights()} nights
                  </span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
                <div className="price-row">
                  <span>Taxes & Fees</span>
                  <span>${(calculateTotal() * 0.12).toFixed(2)}</span>
                </div>
                <div className="price-row total">
                  <span>Total</span>
                  <span>${(calculateTotal() * 1.12).toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                className="confirm-booking-btn"
                disabled={
                  submitting || calculateNights() === 0 || !selectedRoom
                }
                onClick={handleSubmit}
              >
                {submitting ? (
                  <>
                    <span className="btn-spinner"></span>
                    Processing...
                  </>
                ) : (
                  "Confirm Booking"
                )}
              </button>

              <div className="booking-guarantees">
                <div className="guarantee">
                  <span className="guarantee-icon">✓</span>
                  Free cancellation within 24 hours
                </div>
                <div className="guarantee">
                  <span className="guarantee-icon">✓</span>
                  Best price guarantee
                </div>
                <div className="guarantee">
                  <span className="guarantee-icon">✓</span>
                  Secure payment
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
