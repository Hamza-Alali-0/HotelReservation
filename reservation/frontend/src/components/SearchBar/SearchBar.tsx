import React from "react";
import "./SearchBar.css";

/**
 * Search Bar Component
 * Hotel search interface with destination, dates, and guests
 */
interface SearchBarProps {
  onSearch: (params: {
    destination: string;
    checkin: string;
    checkout: string;
    guests: number;
  }) => void;
  initialValues?: {
    destination?: string;
    checkin?: string;
    checkout?: string;
    guests?: number;
  };
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  initialValues = {},
}) => {
  const [destination, setDestination] = React.useState(
    initialValues.destination || ""
  );
  const [checkin, setCheckin] = React.useState(initialValues.checkin || "");
  const [checkout, setCheckout] = React.useState(initialValues.checkout || "");
  const [guests, setGuests] = React.useState(initialValues.guests || 2);

  // Set minimum dates (today for check-in, tomorrow for check-out)
  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ destination, checkin, checkout, guests });
  };

  // Auto-update checkout date if it's before checkin
  React.useEffect(() => {
    if (checkin && checkout && new Date(checkout) <= new Date(checkin)) {
      const nextDay = new Date(checkin);
      nextDay.setDate(nextDay.getDate() + 1);
      setCheckout(nextDay.toISOString().split("T")[0]);
    }
  }, [checkin, checkout]);

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-bar-fields">
        {/* Destination Input */}
        <div className="search-field">
          <label htmlFor="destination">
            <span className="field-icon">📍</span>
            <span className="field-label">Destination</span>
          </label>
          <input
            type="text"
            id="destination"
            placeholder="Where are you going?"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Check-in Date */}
        <div className="search-field">
          <label htmlFor="checkin">
            <span className="field-icon">📅</span>
            <span className="field-label">Check-in</span>
          </label>
          <input
            type="date"
            id="checkin"
            value={checkin}
            min={today}
            onChange={(e) => setCheckin(e.target.value)}
            className="search-input"
            required
          />
        </div>

        {/* Check-out Date */}
        <div className="search-field">
          <label htmlFor="checkout">
            <span className="field-icon">📅</span>
            <span className="field-label">Check-out</span>
          </label>
          <input
            type="date"
            id="checkout"
            value={checkout}
            min={checkin || tomorrow}
            onChange={(e) => setCheckout(e.target.value)}
            className="search-input"
            required
          />
        </div>

        {/* Guests */}
        <div className="search-field">
          <label htmlFor="guests">
            <span className="field-icon">👥</span>
            <span className="field-label">Guests</span>
          </label>
          <input
            type="number"
            id="guests"
            min="1"
            max="10"
            value={guests}
            onChange={(e) => setGuests(parseInt(e.target.value))}
            className="search-input"
            required
          />
        </div>
      </div>

      {/* Search Button */}
      <button type="submit" className="search-button">
        🔍 Search
      </button>
    </form>
  );
};

export default SearchBar;
