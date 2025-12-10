import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdminNavbar } from "@/components/AdminNavbar/AdminNavbar";
import { roomService } from "@/services/api";
import "./AdminStyles.css";

export const EditRoom: React.FC = () => {
  const navigate = useNavigate();
  const { roomId } = useParams<{ roomId: string }>();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [hotelId, setHotelId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    type: "",
    price: 0,
    capacity: 2,
    size: 25,
    description: "",
    amenities: "",
    available: true,
  });

  useEffect(() => {
    loadRoom();
  }, [roomId]);

  const loadRoom = async () => {
    try {
      const room = await roomService.getRoomById(Number(roomId));
      if (room) {
        setHotelId(room.hotelId);
        setFormData({
          type: room.type || "",
          price: room.price || 0,
          capacity: room.capacity || 2,
          size: room.size || 25,
          description: room.description || "",
          amenities: room.amenities?.join(", ") || "",
          available: room.available !== false,
        });
      }
    } catch (err) {
      setError("Failed to load room");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : type === "number"
          ? parseFloat(value)
          : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const roomData = {
        ...formData,
        hotelId,
        amenities: formData.amenities
          .split(",")
          .map((a) => a.trim())
          .filter((a) => a),
      };

      await roomService.updateRoom(Number(roomId), roomData);
      navigate(`/admin/hotel/${hotelId}/rooms`);
    } catch (err: any) {
      setError(err.message || "Failed to update room");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-page">
        <AdminNavbar />
        <div className="admin-content admin-content--narrow">
          <div className="admin-loading">
            <div className="admin-spinner"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <AdminNavbar />
      
      <div className="admin-content admin-content--narrow">
        <button 
          onClick={() => navigate(hotelId ? `/admin/hotel/${hotelId}/rooms` : "/admin/dashboard")}
          className="admin-back-btn"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          Back to Rooms
        </button>

        <div className="admin-page-header">
          <h1 className="admin-page-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#c9a227" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
            Edit Room
          </h1>
          <p className="admin-page-subtitle">Update room details and availability</p>
        </div>

        <div className="admin-form-card">
          {error && <div className="admin-error">{error}</div>}

          <form onSubmit={handleSubmit} className="admin-form">
            <div className="admin-form-group">
              <label className="admin-form-label">
                Room Type <span>*</span>
              </label>
              <select
                name="type"
                required
                value={formData.type}
                onChange={handleChange}
                className="admin-form-select"
              >
                <option value="">Select room type...</option>
                <option value="Standard">Standard</option>
                <option value="Deluxe">Deluxe</option>
                <option value="Suite">Suite</option>
                <option value="Presidential Suite">Presidential Suite</option>
                <option value="Family Room">Family Room</option>
              </select>
            </div>

            <div className="admin-form-row">
              <div className="admin-form-group">
                <label className="admin-form-label">
                  Price per Night ($) <span>*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  step="0.01"
                  min="0"
                  required
                  value={formData.price}
                  onChange={handleChange}
                  className="admin-form-input"
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">
                  Capacity (guests) <span>*</span>
                </label>
                <input
                  type="number"
                  name="capacity"
                  min="1"
                  required
                  value={formData.capacity}
                  onChange={handleChange}
                  className="admin-form-input"
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">
                Size (m²) <span>*</span>
              </label>
              <input
                type="number"
                name="size"
                step="0.1"
                min="0"
                required
                value={formData.size}
                onChange={handleChange}
                className="admin-form-input"
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="admin-form-textarea"
                placeholder="Describe the room's features..."
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Room Amenities (comma-separated)</label>
              <input
                type="text"
                name="amenities"
                value={formData.amenities}
                onChange={handleChange}
                className="admin-form-input"
                placeholder="e.g. King bed, City view, Mini bar"
              />
            </div>

            <label className="admin-form-checkbox-group">
              <input
                type="checkbox"
                name="available"
                checked={formData.available}
                onChange={handleChange}
                className="admin-form-checkbox"
              />
              <span className="admin-form-checkbox-label">Available for booking</span>
            </label>

            <div className="admin-form-actions">
              <button
                type="submit"
                disabled={saving}
                className="admin-btn-primary"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={() => navigate(hotelId ? `/admin/hotel/${hotelId}/rooms` : "/admin/dashboard")}
                className="admin-btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
