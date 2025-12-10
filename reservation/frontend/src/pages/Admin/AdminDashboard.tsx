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
      setHotels(data);
    } catch (error) {
      console.error("Error loading hotels:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-dashboard">
      <AdminNavbar />
      
      <div className="admin-dashboard-content">
        <div className="admin-dashboard-header">
          <h1 className="admin-dashboard-title">Hotel Management</h1>
          <p className="admin-dashboard-subtitle">
            Manage your hotels and rooms from one central dashboard
          </p>
        </div>

        {loading || authLoading ? (
          <div className="admin-loading">
            <div className="admin-spinner"></div>
            <p className="admin-loading-text">Loading dashboard...</p>
          </div>
        ) : hotels.length === 0 ? (
          <div className="admin-empty-state">
            <div className="admin-empty-icon">🏨</div>
            <p className="admin-empty-text">No hotels found. Create your first hotel to get started!</p>
            <button
              onClick={() => navigate("/admin/create-hotel")}
              className="admin-empty-action"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Create Your First Hotel
            </button>
          </div>
        ) : (
          <div className="admin-hotels-grid">
            {hotels.map((hotel) => (
              <div key={hotel.id} className="admin-hotel-card">
                <div className="admin-hotel-image">
                  {hotel.image ? (
                    <img src={hotel.image} alt={hotel.name} />
                  ) : null}
                </div>
                <div className="admin-hotel-content">
                  <h3 className="admin-hotel-name">{hotel.name}</h3>
                  <div className="admin-hotel-location">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    {hotel.location}
                  </div>
                  <div className="admin-hotel-actions">
                    <button
                      onClick={() => navigate(`/admin/hotel/${hotel.id}/rooms`)}
                      className="admin-btn-rooms"
                    >
                      Manage Rooms
                    </button>
                    <button
                      onClick={() => navigate(`/admin/edit-hotel/${hotel.id}`)}
                      className="admin-btn-edit"
                    >
                      Edit
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
