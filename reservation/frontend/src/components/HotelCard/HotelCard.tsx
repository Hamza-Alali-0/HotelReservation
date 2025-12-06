import React from "react";
import { useNavigate } from "react-router-dom";
import type { Hotel, Room } from "@/types";
import "./HotelCard.css";

interface HotelCardProps {
  hotel: Hotel;
  rooms?: Room[];
  featured?: boolean;
  delay?: number;
}

export const HotelCard: React.FC<HotelCardProps> = ({
  hotel,
  rooms = [],
  featured = false,
  delay = 0,
}) => {
  const navigate = useNavigate();

  const getMinPrice = () => {
    if (rooms.length === 0) return null;
    const prices = rooms.filter((r) => r.available).map((r) => r.price);
    return prices.length > 0 ? Math.min(...prices) : null;
  };

  const minPrice = getMinPrice();
  const stars = hotel.stars || 4;

  const handleClick = () => {
    navigate(`/hotels/${hotel.id}`);
  };

  return (
    <article
      className={`hotel-card ${featured ? "hotel-card-featured" : ""}`}
      onClick={handleClick}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="hotel-card-image-wrapper">
        <img
          src={
            hotel.image ||
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80"
          }
          alt={hotel.name}
          className="hotel-card-image"
          onError={(e) => {
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80";
          }}
        />
        <div className="hotel-card-overlay"></div>

        {featured && <span className="hotel-badge">Featured</span>}

        <div className="hotel-rating">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={`star ${i < stars ? "filled" : ""}`}>
              ★
            </span>
          ))}
        </div>
      </div>

      <div className="hotel-card-content">
        <div className="hotel-card-header">
          <h3 className="hotel-card-title">{hotel.name}</h3>
          <p className="hotel-card-location">{hotel.location}</p>
        </div>

        {hotel.description && (
          <p className="hotel-card-description">
            {hotel.description.substring(0, 120)}
            {hotel.description.length > 120 ? "..." : ""}
          </p>
        )}

        {hotel.amenities && hotel.amenities.length > 0 && (
          <div className="hotel-card-amenities">
            {hotel.amenities.slice(0, 3).map((amenity, index) => (
              <span key={index} className="amenity-pill">
                {amenity}
              </span>
            ))}
          </div>
        )}

        <div className="hotel-card-footer">
          {minPrice !== null ? (
            <div className="hotel-card-price">
              <span className="price-from">From</span>
              <span className="price-amount">${minPrice}</span>
              <span className="price-period">/ night</span>
            </div>
          ) : (
            <div className="hotel-card-price">
              <span className="price-contact">Contact for rates</span>
            </div>
          )}

          <button className="btn-book">View Details</button>
        </div>
      </div>
    </article>
  );
};

export default HotelCard;
