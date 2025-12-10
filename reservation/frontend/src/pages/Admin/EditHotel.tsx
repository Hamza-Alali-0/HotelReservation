import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdminNavbar } from "@/components/AdminNavbar/AdminNavbar";
import { hotelService } from "@/services/api";
import "./AdminStyles.css";

export const EditHotel: React.FC = () => {
  const navigate = useNavigate();
  const { hotelId } = useParams<{ hotelId: string }>();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    amenities: "",
    stars: 4,
    image: "",
  });

  useEffect(() => {
    loadHotel();
  }, [hotelId]);

  const loadHotel = async () => {
    try {
      const hotel = await hotelService.getHotelById(Number(hotelId));
      if (hotel) {
        setFormData({
          name: hotel.name || "",
          location: hotel.location || "",
          description: hotel.description || "",
          amenities: hotel.amenities?.join(", ") || "",
          stars: hotel.stars || 4,
          image: hotel.image || "",
        });
      }
    } catch (err) {
      setError("Failed to load hotel");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "stars" ? parseInt(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const hotelData = {
        ...formData,
        amenities: formData.amenities
          .split(",")
          .map((a) => a.trim())
          .filter((a) => a),
      };

      await hotelService.updateHotel(Number(hotelId), hotelData);
      navigate("/admin/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to update hotel");
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
          onClick={() => navigate("/admin/dashboard")}
          className="admin-back-btn"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          Back to Dashboard
        </button>

        <div className="admin-page-header">
          <h1 className="admin-page-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#c9a227" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
            Edit Hotel
          </h1>
          <p className="admin-page-subtitle">Update hotel information and images</p>
        </div>

        <div className="admin-form-card">
          {error && <div className="admin-error">{error}</div>}

          <form onSubmit={handleSubmit} className="admin-form">
            <div className="admin-form-group">
              <label className="admin-form-label">
                Hotel Name <span>*</span>
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="admin-form-input"
                placeholder="e.g. Grand Palace Hotel"
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">
                Location <span>*</span>
              </label>
              <input
                type="text"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                className="admin-form-input"
                placeholder="e.g. Paris, France"
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">
                Image URL
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="admin-form-input"
                placeholder="https://example.com/hotel-image.jpg"
              />
              {formData.image && (
                <div className="admin-image-preview">
                  <img src={formData.image} alt="Hotel preview" />
                </div>
              )}
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="admin-form-textarea"
                placeholder="Describe the hotel's unique features and atmosphere..."
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Amenities (comma-separated)</label>
              <input
                type="text"
                name="amenities"
                value={formData.amenities}
                onChange={handleChange}
                className="admin-form-input"
                placeholder="e.g. WiFi, Pool, Spa, Gym, Restaurant, Bar"
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Stars (1-5)</label>
              <input
                type="number"
                name="stars"
                min="1"
                max="5"
                value={formData.stars}
                onChange={handleChange}
                className="admin-form-input"
              />
            </div>

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
                onClick={() => navigate("/admin/dashboard")}
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
