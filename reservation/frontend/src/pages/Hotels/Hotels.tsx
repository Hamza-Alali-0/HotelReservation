import React, { useState, useEffect } from "react";
import { hotelService, roomService } from "@/services/api";
import { HotelCard, Loading } from "@/components";
import type { Hotel, Room, FilterOptions } from "@/types";
import "./Hotels.css";

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

export const Hotels: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: { min: 0, max: 1000 },
    stars: [],
    location: "",
    capacity: 0,
    available: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [hotelsData, roomsData] = await Promise.all([
          hotelService.getAllHotels(),
          roomService.getAllRooms(),
        ]);

        if (hotelsData && hotelsData.length > 0) {
          const enhancedHotels = hotelsData.map((hotel, index) => ({
            ...hotel,
            stars: hotel.stars || 4 + (index % 2),
            description:
              hotel.description ||
              `Experience unparalleled luxury at ${hotel.name}. Our property in ${hotel.location} offers world-class amenities and exceptional service.`,
            amenities: hotel.amenities || [
              "Spa & Wellness",
              "Fine Dining",
              "Pool",
              "Concierge",
              "Gym",
            ],
            image: hotel.image || HOTEL_IMAGES[index % HOTEL_IMAGES.length],
          }));

          setHotels(enhancedHotels);
          setRooms(roomsData || []);
          setFilteredHotels(enhancedHotels);
        } else {
          // Use mock data as fallback
          setHotels(MOCK_HOTELS);
          setRooms(MOCK_ROOMS);
          setFilteredHotels(MOCK_HOTELS);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Use mock data on error
        setHotels(MOCK_HOTELS);
        setRooms(MOCK_ROOMS);
        setFilteredHotels(MOCK_HOTELS);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, hotels, rooms, searchQuery]);

  const applyFilters = () => {
    let filtered = [...hotels];

    if (searchQuery) {
      filtered = filtered.filter(
        (hotel) =>
          hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          hotel.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filters.stars && filters.stars.length > 0) {
      filtered = filtered.filter((hotel) =>
        filters.stars!.includes(hotel.stars || 0)
      );
    }

    if (filters.available) {
      filtered = filtered.filter((hotel) => {
        const hotelRooms = rooms.filter((r) => r.hotelId === hotel.id);
        return hotelRooms.some((r) => r.available);
      });
    }

    setFilteredHotels(filtered);
  };

  const handleStarsFilter = (stars: number) => {
    setFilters((prev) => {
      const newStars = prev.stars?.includes(stars)
        ? prev.stars.filter((s) => s !== stars)
        : [...(prev.stars || []), stars];
      return { ...prev, stars: newStars };
    });
  };

  const clearFilters = () => {
    setFilters({
      priceRange: { min: 0, max: 1000 },
      stars: [],
      location: "",
      capacity: 0,
      available: false,
    });
    setSearchQuery("");
  };

  const getHotelRooms = (hotelId: number): Room[] => {
    return rooms.filter((room) => room.hotelId === hotelId);
  };

  if (loading) {
    return <Loading message="Discovering luxury properties..." fullScreen />;
  }

  return (
    <div className="hotels-page">
      {/* Hero Banner */}
      <section className="hotels-hero">
        <div className="hotels-hero-bg">
          <img
            src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1920&q=80"
            alt="Hotels"
          />
          <div className="hotels-hero-overlay"></div>
        </div>
        <div className="hotels-hero-content">
          <span className="hero-label">DISCOVER</span>
          <h1>Our Collection</h1>
          <p>Explore our handpicked selection of the world's finest hotels</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="hotels-main">
        <div className="hotels-container">
          {/* Sidebar Filters */}
          <aside className="filters-sidebar">
            <div className="filters-header">
              <h3>Filters</h3>
              <button className="clear-btn" onClick={clearFilters}>
                Reset All
              </button>
            </div>

            {/* Search */}
            <div className="filter-section">
              <label className="filter-section-title">Search</label>
              <div className="search-input-wrapper">
                <svg
                  className="search-input-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  className="filter-search"
                  placeholder="Search hotels..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Star Rating */}
            <div className="filter-section">
              <label className="filter-section-title">Star Rating</label>
              <div className="star-rating-options">
                {[5, 4, 3].map((star) => (
                  <label
                    key={star}
                    className={`star-option ${
                      filters.stars?.includes(star) ? "active" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={filters.stars?.includes(star) || false}
                      onChange={() => handleStarsFilter(star)}
                    />
                    <span className="star-option-content">
                      <span className="star-icons">
                        {[...Array(star)].map((_, i) => (
                          <span key={i} className="star-icon">
                            ★
                          </span>
                        ))}
                      </span>
                      <span className="star-text">{star} Stars</span>
                    </span>
                    <span className="star-checkbox"></span>
                  </label>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="filter-section">
              <label className="filter-section-title">Availability</label>
              <label className="toggle-option">
                <span className="toggle-text">Show available only</span>
                <div className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={filters.available}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        available: e.target.checked,
                      }))
                    }
                  />
                  <span className="toggle-slider"></span>
                </div>
              </label>
            </div>
          </aside>

          {/* Hotels Grid */}
          <div className="hotels-content">
            <div className="results-header">
              <p className="results-count">
                <strong>{filteredHotels.length}</strong>{" "}
                {filteredHotels.length === 1 ? "property" : "properties"} found
              </p>
            </div>

            {filteredHotels.length > 0 ? (
              <div className="hotels-grid">
                {filteredHotels.map((hotel, index) => (
                  <HotelCard
                    key={hotel.id}
                    hotel={hotel}
                    rooms={getHotelRooms(hotel.id)}
                    delay={index * 100}
                  />
                ))}
              </div>
            ) : (
              <div className="no-results">
                <h3>No hotels found</h3>
                <p>Try adjusting your filters to find available properties</p>
                <button className="btn-reset" onClick={clearFilters}>
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hotels;
