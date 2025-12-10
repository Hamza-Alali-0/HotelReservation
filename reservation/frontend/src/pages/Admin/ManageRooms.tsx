import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdminNavbar } from "@/components/AdminNavbar/AdminNavbar";
import { hotelService, roomService } from "@/services/api";
import type { Hotel, Room } from "@/types";
import "./AdminStyles.css";

export const ManageRooms: React.FC = () => {
  const navigate = useNavigate();
  const { hotelId } = useParams<{ hotelId: string }>();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [hotelId]);

  const loadData = async () => {
    try {
      const hotelData = await hotelService.getHotelById(Number(hotelId));
      const roomsData = await roomService.getRoomsByHotel(Number(hotelId));
      setHotel(hotelData);
      setRooms(roomsData);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-page">
      <AdminNavbar />
      
      <div className="admin-content">
        <button 
          onClick={() => navigate("/admin/dashboard")}
          className="admin-back-btn"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          Back to Dashboard
        </button>

        <div className="admin-header-actions">
          <div className="admin-page-header" style={{ marginBottom: 0 }}>
            <h1 className="admin-page-title">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#c9a227" strokeWidth="2">
                <rect x="3" y="3" width="7" height="9"></rect>
                <rect x="14" y="3" width="7" height="5"></rect>
                <rect x="14" y="12" width="7" height="9"></rect>
                <rect x="3" y="16" width="7" height="5"></rect>
              </svg>
              {hotel?.name || "Loading..."} - Rooms
            </h1>
            <p className="admin-page-subtitle">Manage rooms for this property</p>
          </div>
          <button
            onClick={() => navigate(`/admin/hotel/${hotelId}/create-room`)}
            className="admin-add-btn"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add Room
          </button>
        </div>

        {loading ? (
          <div className="admin-loading">
            <div className="admin-spinner"></div>
          </div>
        ) : rooms.length === 0 ? (
          <div className="admin-empty-state">
            <div className="admin-empty-icon">🛏️</div>
            <p className="admin-empty-text">No rooms found for this hotel yet.</p>
            <button
              onClick={() => navigate(`/admin/hotel/${hotelId}/create-room`)}
              className="admin-empty-action"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Add Your First Room
            </button>
          </div>
        ) : (
          <div className="admin-cards-grid">
            {rooms.map((room) => (
              <div key={room.id} className="admin-card">
                <div className="admin-card-body">
                  <div className="admin-card-header">
                    <h3 className="admin-card-title">{room.type || `Room ${room.roomNumber}`}</h3>
                    <span className={`admin-card-badge ${room.available ? 'admin-card-badge--available' : 'admin-card-badge--occupied'}`}>
                      {room.available ? "Available" : "Occupied"}
                    </span>
                  </div>
                  <div className="admin-card-price">
                    ${room.price}<span>/night</span>
                  </div>
                  <div className="admin-card-meta">
                    <div className="admin-card-meta-item">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                      {room.capacity} guests
                    </div>
                    <div className="admin-card-meta-item">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      </svg>
                      {room.size || "N/A"} m²
                    </div>
                  </div>
                  <div className="admin-card-actions">
                    <button
                      onClick={() => navigate(`/admin/room/${room.id}/edit`)}
                      className="admin-card-btn admin-card-btn--secondary"
                    >
                      Edit Room
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
