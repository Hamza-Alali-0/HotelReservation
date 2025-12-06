import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { hotelService, roomService } from "@/services/api";
import { HotelCard, Loading } from "@/components";
import type { Hotel, Room } from "@/types";
import "./Home.css";

// Premium hotel images from Unsplash
const HOTEL_IMAGES = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
  "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80",
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
];

// Fallback mock hotels when backend is unavailable
const MOCK_HOTELS: Hotel[] = [
  {
    id: 1,
    name: "The Grand Palace",
    location: "Paris, France",
    stars: 5,
    image: HOTEL_IMAGES[0],
    description: "Experience unparalleled luxury in the heart of Paris",
    amenities: ["Spa", "Pool", "Restaurant"],
  },
  {
    id: 2,
    name: "Azure Beach Resort",
    location: "Maldives",
    stars: 5,
    image: HOTEL_IMAGES[1],
    description: "Private villas over crystal clear waters",
    amenities: ["Beach", "Diving", "Spa"],
  },
  {
    id: 3,
    name: "Mountain Lodge",
    location: "Swiss Alps",
    stars: 4,
    image: HOTEL_IMAGES[2],
    description: "Breathtaking alpine views and world-class skiing",
    amenities: ["Ski", "Fireplace", "Restaurant"],
  },
  {
    id: 4,
    name: "The Ritz Continental",
    location: "London, UK",
    stars: 5,
    image: HOTEL_IMAGES[3],
    description: "Classic elegance in the heart of London",
    amenities: ["Butler", "Tea Room", "Spa"],
  },
  {
    id: 5,
    name: "Sunset Villa Resort",
    location: "Santorini, Greece",
    stars: 5,
    image: HOTEL_IMAGES[4],
    description: "Stunning sunset views over the Aegean Sea",
    amenities: ["Pool", "Wine Bar", "Terrace"],
  },
  {
    id: 6,
    name: "Royal Marina Hotel",
    location: "Dubai, UAE",
    stars: 5,
    image: HOTEL_IMAGES[5],
    description: "Luxury waterfront living with stunning views",
    amenities: ["Yacht", "Beach", "Rooftop Bar"],
  },
];

const MOCK_ROOMS: Room[] = [
  {
    id: 1,
    hotelId: 1,
    roomNumber: "101",
    type: "Deluxe Suite",
    price: 450,
    capacity: 2,
    available: true,
  },
  {
    id: 2,
    hotelId: 1,
    roomNumber: "201",
    type: "Royal Suite",
    price: 850,
    capacity: 4,
    available: true,
  },
  {
    id: 3,
    hotelId: 2,
    roomNumber: "101",
    type: "Water Villa",
    price: 1200,
    capacity: 2,
    available: true,
  },
  {
    id: 4,
    hotelId: 2,
    roomNumber: "102",
    type: "Beach Bungalow",
    price: 750,
    capacity: 3,
    available: true,
  },
  {
    id: 5,
    hotelId: 3,
    roomNumber: "301",
    type: "Mountain View",
    price: 380,
    capacity: 2,
    available: true,
  },
  {
    id: 6,
    hotelId: 3,
    roomNumber: "302",
    type: "Chalet Suite",
    price: 550,
    capacity: 4,
    available: true,
  },
  {
    id: 7,
    hotelId: 4,
    roomNumber: "401",
    type: "Classic Room",
    price: 520,
    capacity: 2,
    available: true,
  },
  {
    id: 8,
    hotelId: 4,
    roomNumber: "501",
    type: "Luxury Suite",
    price: 980,
    capacity: 3,
    available: true,
  },
  {
    id: 9,
    hotelId: 5,
    roomNumber: "101",
    type: "Sea View Suite",
    price: 620,
    capacity: 2,
    available: true,
  },
  {
    id: 10,
    hotelId: 5,
    roomNumber: "102",
    type: "Honeymoon Villa",
    price: 890,
    capacity: 2,
    available: true,
  },
  {
    id: 11,
    hotelId: 6,
    roomNumber: "601",
    type: "Marina Room",
    price: 480,
    capacity: 2,
    available: true,
  },
  {
    id: 12,
    hotelId: 6,
    roomNumber: "701",
    type: "Penthouse",
    price: 1500,
    capacity: 6,
    available: true,
  },
];

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [hotelsData, roomsData] = await Promise.all([
          hotelService.getAllHotels(),
          roomService.getAllRooms(),
        ]);

        // If API returns data, enhance it
        if (hotelsData && hotelsData.length > 0) {
          const enhancedHotels = hotelsData.map((hotel, index) => ({
            ...hotel,
            stars: hotel.stars || 4 + (index % 2),
            description:
              hotel.description ||
              `Experience unparalleled luxury and world-class service at ${hotel.name}. Nestled in the heart of ${hotel.location}, our hotel offers an exquisite blend of comfort and elegance.`,
            amenities: hotel.amenities || [
              "Spa & Wellness",
              "Fine Dining",
              "Infinity Pool",
              "Concierge",
              "Fitness Center",
              "Room Service",
            ],
            image: hotel.image || HOTEL_IMAGES[index % HOTEL_IMAGES.length],
          }));
          setHotels(enhancedHotels);
          setRooms(roomsData || []);
        } else {
          // Use mock data as fallback
          setHotels(MOCK_HOTELS);
          setRooms(MOCK_ROOMS);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        // Use mock data on error
        setHotels(MOCK_HOTELS);
        setRooms(MOCK_ROOMS);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getHotelRooms = (hotelId: number): Room[] => {
    return rooms.filter((room) => room.hotelId === hotelId);
  };

  if (loading) {
    return <Loading message="Curating luxury experiences..." fullScreen />;
  }

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920&q=80"
            alt="Luxury Hotel"
            className="hero-image"
          />
          <div className="hero-overlay"></div>
        </div>

        <div className="hero-content">
          <span className="hero-label">EXTRAORDINARY EXPERIENCES</span>
          <h1 className="hero-title">
            Discover The Art Of
            <br />
            <span className="hero-highlight">Luxury Hospitality</span>
          </h1>
          <p className="hero-subtitle">
            Immerse yourself in unparalleled elegance. From stunning suites to
            world-class amenities, every moment is crafted for perfection.
          </p>

          <div className="hero-cta">
            <button
              className="btn-primary-lg"
              onClick={() => navigate("/hotels")}
            >
              Explore Hotels
            </button>
            <button
              className="btn-outline-lg"
              onClick={() => navigate("/hotels")}
            >
              Book Your Stay
            </button>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">{hotels.length}+</span>
              <span className="stat-label">Luxury Hotels</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">
                {rooms.filter((r) => r.available).length}+
              </span>
              <span className="stat-label">Available Suites</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Concierge Service</span>
            </div>
          </div>
        </div>

        <div className="scroll-indicator">
          <span>Scroll to explore</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      {/* Popular Destinations - New Section */}
      <section className="destinations-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-label">TOP DESTINATIONS</span>
            <h2 className="section-title">Popular Hotels This Season</h2>
            <p className="section-subtitle">
              Handpicked luxury properties loved by our guests
            </p>
          </div>

          <div className="destinations-grid">
            {hotels.slice(0, 4).map((hotel, index) => (
              <div
                key={hotel.id}
                className={`destination-card ${index === 0 ? "large" : ""}`}
                onClick={() => navigate(`/hotels/${hotel.id}`)}
              >
                <div className="destination-image">
                  <img
                    src={
                      hotel.image || HOTEL_IMAGES[index % HOTEL_IMAGES.length]
                    }
                    alt={hotel.name}
                  />
                  <div className="destination-overlay"></div>
                </div>
                <div className="destination-content">
                  <div className="destination-rating">
                    {[...Array(hotel.stars || 5)].map((_, i) => (
                      <span key={i} className="star">
                        ★
                      </span>
                    ))}
                  </div>
                  <h3 className="destination-name">{hotel.name}</h3>
                  <p className="destination-location">{hotel.location}</p>
                  <div className="destination-info">
                    <span className="destination-rooms">
                      {
                        getHotelRooms(hotel.id).filter((r) => r.available)
                          .length
                      }{" "}
                      rooms available
                    </span>
                    <span className="destination-price">
                      From $
                      {Math.min(
                        ...getHotelRooms(hotel.id).map((r) => r.price)
                      ) || 299}
                      /night
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="featured-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-label">HANDPICKED SELECTION</span>
            <h2 className="section-title">Featured Properties</h2>
            <p className="section-subtitle">
              Discover our most exclusive destinations, where luxury meets
              extraordinary service
            </p>
          </div>

          <div className="hotels-grid">
            {hotels.slice(0, 3).map((hotel, index) => (
              <HotelCard
                key={hotel.id}
                hotel={hotel}
                rooms={getHotelRooms(hotel.id)}
                featured={true}
                delay={index * 100}
              />
            ))}
          </div>

          <div className="section-cta">
            <button
              className="btn-view-all"
              onClick={() => navigate("/hotels")}
            >
              View All Properties
              <span className="arrow">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="experience-section">
        <div className="experience-container">
          <div className="experience-image">
            <img
              src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80"
              alt="Luxury Experience"
            />
          </div>
          <div className="experience-content">
            <span className="section-label">THE EXPERIENCE</span>
            <h2 className="section-title">Redefining Luxury Travel</h2>
            <p className="experience-text">
              Every stay with us is a journey into refined elegance. Our
              properties are carefully curated to offer not just accommodation,
              but a transformative experience that lingers long after your
              departure.
            </p>

            <div className="experience-features">
              <div className="feature-item">
                <div className="feature-number">01</div>
                <div className="feature-info">
                  <h4>Bespoke Service</h4>
                  <p>
                    Personalized attention from our dedicated concierge team
                  </p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-number">02</div>
                <div className="feature-info">
                  <h4>Exquisite Dining</h4>
                  <p>World-class cuisine crafted by renowned chefs</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-number">03</div>
                <div className="feature-info">
                  <h4>Wellness Sanctuary</h4>
                  <p>Rejuvenating spa treatments and wellness programs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Hotels */}
      {hotels.length > 3 && (
        <section className="all-hotels-section">
          <div className="section-container">
            <div className="section-header">
              <span className="section-label">COMPLETE COLLECTION</span>
              <h2 className="section-title">Explore All Properties</h2>
            </div>

            <div className="hotels-grid hotels-grid-4">
              {hotels.slice(3).map((hotel, index) => (
                <HotelCard
                  key={hotel.id}
                  hotel={hotel}
                  rooms={getHotelRooms(hotel.id)}
                  delay={index * 100}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-background">
          <img
            src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1920&q=80"
            alt="Luxury Resort"
          />
          <div className="cta-overlay"></div>
        </div>
        <div className="cta-content">
          <span className="cta-label">BEGIN YOUR JOURNEY</span>
          <h2 className="cta-title">Ready for an Unforgettable Stay?</h2>
          <p className="cta-text">
            Join our exclusive community of discerning travelers and unlock
            access to exceptional rates, member-only privileges, and bespoke
            experiences.
          </p>
          <button className="btn-cta" onClick={() => navigate("/signup")}>
            Become a Member
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
