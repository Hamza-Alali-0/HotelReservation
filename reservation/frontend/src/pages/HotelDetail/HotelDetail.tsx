import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { hotelService, roomService } from "@/services/api";
import { Loading } from "@/components";
import type { Hotel, Room } from "@/types";
import "./HotelDetail.css";

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
  "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80",
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
];

export const HotelDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const hotelId = parseInt(id);
        const [hotelData, allRooms] = await Promise.all([
          hotelService.getHotelById(hotelId),
          roomService.getAllRooms(),
        ]);

        if (hotelData) {
          const enhancedHotel = {
            ...hotelData,
            stars: 5,
            description: `Welcome to ${hotelData.name}, a sanctuary of refined elegance in ${hotelData.location}. Our property seamlessly blends timeless sophistication with contemporary luxury, offering an unparalleled hospitality experience. Each detail has been meticulously crafted to exceed the expectations of our discerning guests.`,
            amenities: [
              "Spa & Wellness Center",
              "Michelin-Star Restaurant",
              "Infinity Pool",
              "Private Beach Access",
              "24/7 Concierge",
              "Fitness Center",
              "Business Center",
              "Valet Parking",
            ],
            image: GALLERY_IMAGES[0],
          };
          setHotel(enhancedHotel);
        }

        const hotelRooms = allRooms
          .filter((r) => r.hotelId === hotelId)
          .map((room, index) => ({
            ...room,
            type:
              index === 0
                ? "Presidential Suite"
                : index === 1
                ? "Deluxe Room"
                : "Executive Suite",
            description: `Luxuriously appointed ${room.capacity}-guest accommodation featuring premium amenities and stunning views.`,
          }));

        setRooms(hotelRooms);
      } catch (error) {
        console.error("Error fetching hotel:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleBookRoom = () => {
    navigate(`/reserve/${id}`);
  };

  if (loading) {
    return <Loading message="Loading hotel details..." fullScreen />;
  }

  if (!hotel) {
    return (
      <div className="not-found">
        <h2>Hotel Not Found</h2>
        <p>The property you're looking for doesn't exist.</p>
        <button onClick={() => navigate("/hotels")} className="btn-back">
          Browse Properties
        </button>
      </div>
    );
  }

  return (
    <div className="hotel-detail">
      {/* Gallery Section */}
      <section className="gallery-section">
        <div className="gallery-main">
          <img src={GALLERY_IMAGES[selectedImage]} alt={hotel.name} />
          <div className="gallery-overlay"></div>
        </div>
        <div className="gallery-thumbnails">
          {GALLERY_IMAGES.slice(0, 5).map((img, index) => (
            <button
              key={index}
              className={`thumbnail ${selectedImage === index ? "active" : ""}`}
              onClick={() => setSelectedImage(index)}
            >
              <img src={img} alt={`View ${index + 1}`} />
            </button>
          ))}
        </div>
      </section>

      {/* Hotel Info */}
      <section className="hotel-info-section">
        <div className="info-container">
          <div className="info-main">
            <div className="hotel-header">
              <div className="hotel-rating">
                {[...Array(hotel.stars || 5)].map((_, i) => (
                  <span key={i} className="star">
                    ★
                  </span>
                ))}
              </div>
              <h1 className="hotel-name">{hotel.name}</h1>
              <p className="hotel-location">{hotel.location}</p>
            </div>

            <div className="hotel-description">
              <h2>About The Property</h2>
              <p>{hotel.description}</p>
            </div>

            {/* Amenities */}
            <div className="amenities-section">
              <h2>Amenities & Services</h2>
              <div className="amenities-grid">
                {hotel.amenities?.map((amenity, index) => (
                  <div key={index} className="amenity-item">
                    <span className="amenity-dot"></span>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rooms */}
            <div className="rooms-section">
              <h2>Accommodations</h2>
              <p className="rooms-subtitle">
                {rooms.filter((r) => r.available).length} of {rooms.length}{" "}
                rooms available
              </p>

              <div className="rooms-list">
                {rooms.map((room) => (
                  <div
                    key={room.id}
                    className={`room-card ${
                      !room.available ? "unavailable" : ""
                    }`}
                  >
                    <div className="room-image">
                      <img
                        src="https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&q=80"
                        alt={room.type}
                      />
                    </div>
                    <div className="room-content">
                      <div className="room-header">
                        <h3>{room.type || `Room #${room.roomNumber}`}</h3>
                        <span
                          className={`room-status ${
                            room.available ? "available" : ""
                          }`}
                        >
                          {room.available ? "Available" : "Booked"}
                        </span>
                      </div>
                      <p className="room-description">{room.description}</p>
                      <div className="room-details">
                        <span>Sleeps {room.capacity} guests</span>
                        <span>Room #{room.roomNumber}</span>
                      </div>
                    </div>
                    <div className="room-booking">
                      <div className="room-price">
                        <span className="price-amount">${room.price}</span>
                        <span className="price-period">/ night</span>
                      </div>
                      <button
                        className={`btn-book-room ${
                          !room.available ? "disabled" : ""
                        }`}
                        onClick={() => room.available && handleBookRoom()}
                        disabled={!room.available}
                      >
                        {room.available ? "Reserve Now" : "Not Available"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <aside className="booking-sidebar">
            <div className="sidebar-card">
              <h3>Book Your Stay</h3>
              <p className="sidebar-text">
                Experience luxury at {hotel.name}. Our concierge team is ready
                to create your perfect getaway.
              </p>
              <div className="price-starting">
                <span className="label">Starting from</span>
                <span className="price">
                  $
                  {rooms.length > 0
                    ? Math.min(...rooms.map((r) => r.price))
                    : "N/A"}
                </span>
                <span className="period">per night</span>
              </div>
              <button className="btn-book-now" onClick={() => handleBookRoom()}>
                Check Availability
              </button>
              <div className="contact-info">
                <p>Need assistance?</p>
                <a href="tel:+18885550123">+1 (888) 555-0123</a>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default HotelDetail;
