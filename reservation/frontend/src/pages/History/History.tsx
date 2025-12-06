import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { reservationService, hotelService } from "../../services/api";
import { Reservation, Hotel } from "../../types";
import "./History.css";

const History: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [hotels, setHotels] = useState<Record<number, Hotel>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("date-desc");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [reservationsData, hotelsData] = await Promise.all([
        reservationService.getAllReservations(),
        hotelService.getAllHotels(),
      ]);
      setReservations(reservationsData);

      // Create hotels lookup map
      const hotelsMap: Record<number, Hotel> = {};
      hotelsData.forEach((hotel) => {
        hotelsMap[hotel.id] = hotel;
      });
      setHotels(hotelsMap);
    } catch (err) {
      setError("Failed to load reservation history");
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status: string): string => {
    switch (status.toUpperCase()) {
      case "PAID":
        return "status-confirmed";
      case "PENDING":
        return "status-pending";
      default:
        return "";
    }
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const calculateNights = (checkIn: string, checkOut: string): number => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  };

  const getHotelName = (hotelId: number): string => {
    return hotels[hotelId]?.name || `Hotel #${hotelId}`;
  };

  const filteredReservations = reservations
    .filter((r) => {
      if (filter === "all") return true;
      return r.paymentStatus.toLowerCase() === filter;
    })
    .filter((r) => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      const hotelName = getHotelName(r.hotelId).toLowerCase();
      return (
        hotelName.includes(query) ||
        r.customerName?.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "date-desc":
          return new Date(b.checkin).getTime() - new Date(a.checkin).getTime();
        case "date-asc":
          return new Date(a.checkin).getTime() - new Date(b.checkin).getTime();
        case "hotel":
          return getHotelName(a.hotelId).localeCompare(getHotelName(b.hotelId));
        default:
          return 0;
      }
    });

  const stats = {
    total: reservations.length,
    paid: reservations.filter((r) => r.paymentStatus === "PAID").length,
    pending: reservations.filter((r) => r.paymentStatus === "PENDING").length,
  };

  if (loading) {
    return (
      <div className="history-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="history-page">
      {/* Hero Section */}
      <div
        className="history-hero"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1600)`,
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="hero-label">My Bookings</span>
          <h1 className="hero-title">My Bookings</h1>
          <p className="hero-subtitle">
            View and manage all your reservations in one place
          </p>
        </div>
      </div>

      <div className="history-container">
        {/* Analytics Dashboard */}
        <div className="analytics-dashboard">
          <div className="analytics-main">
            <div className="metric-card primary">
              <div className="metric-header">
                <span className="metric-title">Total Bookings</span>
                <div className="metric-badge">All Time</div>
              </div>
              <div className="metric-value-row">
                <span className="metric-number">{stats.total}</span>
                <div className="metric-chart">
                  <svg viewBox="0 0 100 40" className="sparkline">
                    <path
                      d="M0,35 Q25,20 50,25 T100,15"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              </div>
              <div className="metric-footer">
                <span className="metric-label">reservations made</span>
              </div>
            </div>

            <div className="metric-card success">
              <div className="metric-header">
                <span className="metric-title">Confirmed</span>
                <div className="metric-indicator positive">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M6 2L6 10M6 2L3 5M6 2L9 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span>
                    {stats.total > 0
                      ? Math.round((stats.paid / stats.total) * 100)
                      : 0}
                    %
                  </span>
                </div>
              </div>
              <div className="metric-value-row">
                <span className="metric-number">{stats.paid}</span>
              </div>
              <div className="metric-progress">
                <div className="progress-track">
                  <div
                    className="progress-fill success"
                    style={{
                      width: `${
                        stats.total > 0 ? (stats.paid / stats.total) * 100 : 0
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="metric-card warning">
              <div className="metric-header">
                <span className="metric-title">Pending</span>
                <div className="metric-indicator neutral">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <circle
                      cx="6"
                      cy="6"
                      r="4"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                  <span>Awaiting</span>
                </div>
              </div>
              <div className="metric-value-row">
                <span className="metric-number">{stats.pending}</span>
              </div>
              <div className="metric-progress">
                <div className="progress-track">
                  <div
                    className="progress-fill warning"
                    style={{
                      width: `${
                        stats.total > 0
                          ? (stats.pending / stats.total) * 100
                          : 0
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="filters-bar">
          <div className="search-wrapper">
            <svg
              className="search-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Search bookings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="filter-pills">
            <button
              className={`filter-pill ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={`filter-pill ${filter === "paid" ? "active" : ""}`}
              onClick={() => setFilter("paid")}
            >
              Confirmed
            </button>
            <button
              className={`filter-pill ${filter === "pending" ? "active" : ""}`}
              onClick={() => setFilter("pending")}
            >
              Pending
            </button>
          </div>

          <div className="sort-dropdown">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="hotel">By Hotel</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="error-banner">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Reservations List */}
        {filteredReservations.length === 0 ? (
          <div className="empty-state">
            <div className="empty-illustration">
              <img
                src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400"
                alt="No reservations"
              />
            </div>
            <h2>No Reservations Found</h2>
            <p>
              {searchQuery || filter !== "all"
                ? "Try adjusting your search or filter criteria"
                : "You haven't made any bookings yet. Start exploring our hotels!"}
            </p>
            <Link to="/hotels" className="btn-primary">
              Browse Hotels
            </Link>
          </div>
        ) : (
          <div className="reservations-list">
            {filteredReservations.map((reservation) => (
              <div
                key={reservation.id}
                className={`reservation-card ${
                  selectedReservation?.id === reservation.id ? "expanded" : ""
                }`}
              >
                <div
                  className="reservation-main"
                  onClick={() =>
                    setSelectedReservation(
                      selectedReservation?.id === reservation.id
                        ? null
                        : reservation
                    )
                  }
                >
                  <div className="reservation-image">
                    <img
                      src={
                        hotels[reservation.hotelId]?.image ||
                        `https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&sig=${reservation.id}`
                      }
                      alt={getHotelName(reservation.hotelId)}
                    />
                    <span
                      className={`status-badge ${getStatusClass(
                        reservation.paymentStatus
                      )}`}
                    >
                      {reservation.paymentStatus}
                    </span>
                  </div>

                  <div className="reservation-info">
                    <div className="reservation-header">
                      <h3>{getHotelName(reservation.hotelId)}</h3>
                      <span className="booking-id">
                        Booking #{reservation.id}
                      </span>
                    </div>

                    <div className="reservation-details">
                      <div className="detail-item">
                        <span className="detail-label">Check-in</span>
                        <span className="detail-value">
                          {formatDate(reservation.checkin)}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Check-out</span>
                        <span className="detail-value">
                          {formatDate(reservation.checkout)}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Duration</span>
                        <span className="detail-value">
                          {calculateNights(
                            reservation.checkin,
                            reservation.checkout
                          )}{" "}
                          nights
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Room ID</span>
                        <span className="detail-value">
                          #{reservation.roomId}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="reservation-actions">
                    <button className="expand-btn">
                      {selectedReservation?.id === reservation.id ? "−" : "+"}
                    </button>
                  </div>
                </div>

                {selectedReservation?.id === reservation.id && (
                  <div className="reservation-expanded">
                    <div className="expanded-content">
                      <div className="expanded-section">
                        <h4>Guest Information</h4>
                        <div className="info-grid">
                          <div>
                            <span className="label">Name</span>
                            <span className="value">
                              {reservation.customerName}
                            </span>
                          </div>
                          <div>
                            <span className="label">Payment Status</span>
                            <span className="value">
                              {reservation.paymentStatus}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="expanded-actions">
                        <Link
                          to={`/hotels/${reservation.hotelId}`}
                          className="action-btn secondary"
                        >
                          View Hotel
                        </Link>

                        <Link
                          to={`/reserve/${reservation.hotelId}`}
                          className="action-btn primary"
                        >
                          Book Again
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
