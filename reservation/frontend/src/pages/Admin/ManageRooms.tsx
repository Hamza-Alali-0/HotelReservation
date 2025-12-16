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
    <div className="admin-dashboard">
      <AdminNavbar />

      {/* Hero Header Section */}
      <div className="admin-dashboard-header-section" style={{
        backgroundImage: hotel?.image ? `linear-gradient(135deg, rgba(26, 26, 46, 0.9) 0%, rgba(26, 26, 46, 0.8) 100%), url(${hotel.image})` : undefined
      }}>
        <div className="admin-dashboard-container">
          <div className="admin-header-content">
            <button 
              onClick={() => navigate("/admin/dashboard")}
              className="admin-back-btn"
              style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', marginBottom: '20px' }}
            >
              ← Back to Dashboard
            </button>
            <span className="admin-label">Property Management</span>
            <h1 className="admin-title">{hotel?.name || "Loading..."}</h1>
            <p className="admin-subtitle">{hotel?.location || "Manage your rooms and availability"}</p>
            
            <div className="admin-stats-bar">
              <div className="admin-stat-item">
                <span className="admin-stat-number">{rooms.length}</span>
                <span className="admin-stat-label">Total Rooms</span>
              </div>
              <div className="admin-stat-item">
                <span className="admin-stat-number">{rooms.filter(r => r.available).length}</span>
                <span className="admin-stat-label">Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="admin-dashboard-container admin-content-section">
        <div className="admin-section-header">
          <div className="admin-section-title">
            <h2>Room Inventory</h2>
            <p>Manage room types, pricing, and availability</p>
          </div>
          <button
            onClick={() => navigate(`/admin/hotel/${hotelId}/create-room`)}
            className="admin-create-btn"
          >
            + Add New Room
          </button>
        </div>

        {loading ? (
          <div className="admin-loading">
            <div className="admin-spinner"></div>
            <p className="admin-loading-text">Loading room configurations...</p>
          </div>
        ) : rooms.length === 0 ? (
          <div className="admin-empty-state">
            <div className="admin-empty-icon">🛏️</div>
            <p className="admin-empty-text">No rooms configured for this property yet.</p>
            <button
              onClick={() => navigate(`/admin/hotel/${hotelId}/create-room`)}
              className="admin-create-btn"
              style={{ marginTop: '20px' }}
            >
              Add First Room
            </button>
          </div>
        ) : (
          <div className="admin-hotels-grid">
            {rooms.map((room) => (
              <div key={room.id} className="admin-hotel-card">
                {/* Visual Representation of Room Type - Placeholder or Image mapping */}
                <div className="admin-card-image" style={{ height: '180px', background: 'linear-gradient(45deg, #2c3e50, #34495e)' }}>
                   <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.1)', fontSize: '3rem' }}>
                      🛏️
                   </div>
                   <div className="admin-card-overlay"></div>
                   <div style={{ position: 'absolute', top: '15px', right: '15px' }}>
                      <span className={`admin-card-badge ${room.available ? 'admin-card-badge--available' : 'admin-card-badge--occupied'}`} 
                            style={{ padding: '6px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', background: room.available ? '#10b981' : '#ef4444', color: 'white' }}>
                        {room.available ? "Available" : "Occupied"}
                      </span>
                   </div>
                </div>

                <div className="admin-card-content">
                  <div className="admin-card-header">
                    <h3 className="admin-hotel-title" style={{ fontSize: '1.2rem' }}>{room.type || `Room ${room.roomNumber}`}</h3>
                    <div className="admin-hotel-stars" style={{ color: '#1a1a2e', fontWeight: 'bold' }}>
                      ${room.price}
                    </div>
                  </div>
                  
                  <div className="admin-hotel-location">
                    <span>{room.capacity} Guests</span>
                    <span>•</span>
                    <span>{room.size || "N/A"} m²</span>
                  </div>

                  <div className="admin-card-footer">
                    <button
                      onClick={() => navigate(`/admin/room/${room.id}/edit`)}
                      className="admin-action-btn btn-manage-rooms"
                      style={{ gridColumn: 'span 2' }}
                    >
                      Edit Room Details
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
