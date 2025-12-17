import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { AdminNavbar } from "@/components/AdminNavbar/AdminNavbar";
import { hotelService } from "@/services/api";
import type { Hotel } from "@/types";
import "./AdminDashboard.css";

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading) {
      if (!user || user.role !== "ADMIN") {
        navigate("/admin/login");
        return;
      }
      loadHotels();
    }
  }, [user, authLoading, navigate]);

  const loadHotels = async () => {
    try {
      const data = await hotelService.getAllHotels();
      // Mock images if missing, just for display consistency like Home page
      const enhancedData = data.map((hotel, index) => ({
        ...hotel,
        image:
          hotel.image ||
          [
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
            "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
            "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
            "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80",
          ][index % 4],
      }));
      setHotels(enhancedData);
    } catch (error) {
      console.error("Error loading hotels:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalRooms = 124; // This would typically come from an API
  const totalBookings = 48; // Mock stat
  const revenue = "$12,450"; // Mock stat

  return (
    <div className="admin-dashboard">
      <AdminNavbar />

      {/* Hero Header Section */}
      <div className="admin-dashboard-header-section">
        <div className="admin-dashboard-container">
          <div className="admin-header-content">
            <span className="admin-label">Admin Control Center</span>
            <h1 className="admin-title">Welcome back, {user?.name}</h1>
            <p className="admin-subtitle">
              Oversee your property portfolio with precision. Manage hotels,
              rooms, and bookings from your centralized command center.
            </p>

            <div className="admin-stats-bar">
              <div className="admin-stat-item">
                <span className="admin-stat-number">{hotels.length}</span>
                <span className="admin-stat-label">Properties</span>
              </div>
              <div className="admin-stat-item">
                <span className="admin-stat-number">{totalRooms}</span>
                <span className="admin-stat-label">Total Rooms</span>
              </div>
              <div className="admin-stat-item">
                <span className="admin-stat-number">{totalBookings}</span>
                <span className="admin-stat-label">Active Bookings</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="admin-dashboard-container admin-content-section">
        <div className="admin-section-header">
          <div className="admin-section-title">
            <h2>Your Properties</h2>
            <p>Manage existing hotels or add new ones to your portfolio</p>
          </div>
          <button
            onClick={() => navigate("/admin/create-hotel")}
            className="admin-create-btn"
          >
            + Add New Hotel
          </button>
        </div>

        {loading || authLoading ? (
          <div className="admin-loading">
            <div className="admin-spinner"></div>
            <p className="admin-loading-text">
              Synchronizing dashboard data...
            </p>
          </div>
        ) : hotels.length === 0 ? (
          <div className="admin-empty-state">
            <div className="admin-empty-icon">🏢</div>
            <h3 className="admin-empty-title">No Properties Found</h3>
            <p className="admin-empty-text">
              Start building your hospitality empire by adding your first hotel.
            </p>
            <button
              onClick={() => navigate("/admin/create-hotel")}
              className="admin-create-btn"
              style={{ marginTop: "20px" }}
            >
              Create First Hotel
            </button>
          </div>
        ) : (
          <div className="admin-hotels-grid">
            {hotels.map((hotel) => (
              <div key={hotel.id} className="admin-hotel-card">
                <div className="admin-card-image">
                  <img src={hotel.image} alt={hotel.name} />
                  <div className="admin-card-overlay"></div>
                </div>
                <div className="admin-card-content">
                  <div className="admin-card-header">
                    <h3 className="admin-hotel-title">{hotel.name}</h3>
                    <div className="admin-hotel-stars">
                      {"★".repeat(hotel.stars || 5)}
                    </div>
                  </div>

                  <div className="admin-hotel-location">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    {hotel.location}
                  </div>

                  <div className="admin-card-footer">
                    <button
                      onClick={() => navigate(`/admin/hotel/${hotel.id}/rooms`)}
                      className="admin-action-btn btn-manage-rooms"
                    >
                      Manage Rooms
                    </button>
                    <button
                      onClick={() => navigate(`/admin/hotel/${hotel.id}/edit`)}
                      className="admin-action-btn btn-edit-hotel"
                    >
                      Edit Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
