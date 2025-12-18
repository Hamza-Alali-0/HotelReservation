import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { reservationService, hotelService, roomService } from "@/services/api";
import { Loading } from "@/components";
import type { Reservation, Hotel, Room } from "@/types";
import "./Dashboard.css";

interface EnrichedReservation extends Reservation {
  hotel?: Hotel;
  room?: Room;
}

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [reservations, setReservations] = useState<EnrichedReservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const fetchReservations = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all reservations
        const allReservations = await reservationService.getAllReservations();

        // Enrich reservations with hotel and room details
        const enrichedReservations = await Promise.all(
          allReservations.map(async (reservation) => {
            try {
              const [hotel, room] = await Promise.all([
                hotelService.getHotelById(reservation.hotelId),
                roomService.getRoomById(reservation.roomId),
              ]);
              return {
                ...reservation,
                hotel: hotel || undefined,
                room: room || undefined,
              };
            } catch (err) {
              console.error(
                `Error fetching details for reservation ${reservation.id}:`,
                err
              );
              return reservation;
            }
          })
        );

        setReservations(enrichedReservations);
      } catch (error) {
        console.error("Error fetching reservations:", error);
        setError("Failed to load reservations. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [isAuthenticated, navigate, user]);

  if (loading) {
    return <Loading message="Loading your dashboard..." fullScreen />;
  }

  if (error) {
    return (
      <div className="dashboard">
        <div className="dashboard-container">
          <div className="error-state">
            <h2>Error Loading Dashboard</h2>
            <p>{error}</p>
            <button
              className="btn-retry"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const confirmedCount = reservations.filter(
    (r) => r.paymentStatus === "PAID"
  ).length;
  const pendingCount = reservations.filter(
    (r) => r.paymentStatus === "PENDING"
  ).length;

  return (
    <div className="dashboard">
      {/* Header */}
      <section className="dashboard-header">
        <div className="header-bg">
          <img
            src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1920&q=80"
            alt="Dashboard"
          />
          <div className="header-overlay"></div>
        </div>
        <div className="header-content">
          <span className="welcome-label">Welcome Back</span>
          <h1>{user?.name}</h1>
          <p>Manage your reservations and explore new destinations</p>
        </div>
      </section>

      <div className="dashboard-container">
        {/* Analytics Dashboard */}
        <div className="analytics-dashboard">
          <div className="analytics-main">
            <div className="metric-card primary">
              <div className="metric-header">
                <span className="metric-title">Total Bookings</span>
                <div className="metric-badge">All Time</div>
              </div>
              <div className="metric-value-row">
                <span className="metric-number">{reservations.length}</span>
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
                    {reservations.length > 0
                      ? Math.round((confirmedCount / reservations.length) * 100)
                      : 0}
                    %
                  </span>
                </div>
              </div>
              <div className="metric-value-row">
                <span className="metric-number">{confirmedCount}</span>
              </div>
              <div className="metric-progress">
                <div className="progress-track">
                  <div
                    className="progress-fill success"
                    style={{
                      width: `${
                        reservations.length > 0
                          ? (confirmedCount / reservations.length) * 100
                          : 0
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
                <span className="metric-number">{pendingCount}</span>
              </div>
              <div className="metric-progress">
                <div className="progress-track">
                  <div
                    className="progress-fill warning"
                    style={{
                      width: `${
                        reservations.length > 0
                          ? (pendingCount / reservations.length) * 100
                          : 0
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <button className="action-card" onClick={() => navigate("/hotels")}>
              <div className="action-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  <polyline points="9,22 9,12 15,12 15,22" />
                </svg>
              </div>
              <span className="action-title">Find Hotels</span>
              <span className="action-desc">Explore our collection</span>
            </button>
            <button className="action-card" onClick={() => navigate("/hotels")}>
              <div className="action-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                  <line x1="12" y1="14" x2="12" y2="18" />
                  <line x1="10" y1="16" x2="14" y2="16" />
                </svg>
              </div>
              <span className="action-title">New Booking</span>
              <span className="action-desc">Make a reservation</span>
            </button>
            <button
              className="action-card"
              onClick={() => navigate("/history")}
            >
              <div className="action-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <span className="action-title">View History</span>
              <span className="action-desc">All your bookings</span>
            </button>
          </div>
        </div>

        {/* Recent Reservations */}
        <div className="reservations-section">
          <div className="section-header">
            <h2>Recent Reservations</h2>
            {reservations.length > 0 && (
              <button
                className="btn-view-all"
                onClick={() => navigate("/history")}
              >
                View All
              </button>
            )}
          </div>

          {reservations.length > 0 ? (
            <div className="reservations-list">
              {reservations.slice(0, 5).map((reservation) => (
                <div key={reservation.id} className="reservation-item">
                  <div className="reservation-image">
                    <img
                      src={
                        reservation.hotel?.image ||
                        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&q=80"
                      }
                      alt={reservation.hotel?.name || "Hotel"}
                    />
                  </div>
                  <div className="reservation-info">
                    <h3>
                      {reservation.hotel?.name ||
                        `Reservation #${reservation.id}`}
                    </h3>
                    <p className="reservation-dates">
                      {new Date(reservation.checkin).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                        }
                      )}{" "}
                      -{" "}
                      {new Date(reservation.checkout).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </p>
                    <p className="reservation-details">
                      {reservation.hotel?.location || "Location unavailable"} ·{" "}
                      {reservation.room?.type || "Room"} · $
                      {reservation.room?.price || "N/A"}/night
                    </p>
                  </div>
                  <div className="reservation-status">
                    <span
                      className={`status-badge ${reservation.paymentStatus.toLowerCase()}`}
                    >
                      {reservation.paymentStatus}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-content">
                <h3>No Reservations Yet</h3>
                <p>
                  Start exploring our luxury properties and book your first stay
                </p>
                <button
                  className="btn-explore"
                  onClick={() => navigate("/hotels")}
                >
                  Explore Hotels
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
