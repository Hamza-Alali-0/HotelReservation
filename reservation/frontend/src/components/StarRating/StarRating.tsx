import React from "react";
import "./StarRating.css";

/**
 * Star Rating Component
 * Displays hotel rating as stars (1-5 stars)
 */
interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "small" | "medium" | "large";
  showNumber?: boolean;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  size = "medium",
  showNumber = false,
}) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  // Generate full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <span key={`full-${i}`} className={`star star-full star-${size}`}>
        ★
      </span>
    );
  }

  // Add half star if needed
  if (hasHalfStar && fullStars < maxRating) {
    stars.push(
      <span key="half" className={`star star-half star-${size}`}>
        ★
      </span>
    );
  }

  // Generate empty stars
  const emptyStars = maxRating - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <span key={`empty-${i}`} className={`star star-empty star-${size}`}>
        ★
      </span>
    );
  }

  return (
    <div className="star-rating">
      {stars}
      {showNumber && (
        <span className="rating-number">({rating.toFixed(1)})</span>
      )}
    </div>
  );
};

export default StarRating;
