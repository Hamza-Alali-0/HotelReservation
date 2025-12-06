import React from "react";
import "./Loading.css";

/**
 * Loading Spinner Component
 * Displays a loading indicator with optional message
 */
interface LoadingProps {
  message?: string;
  fullScreen?: boolean;
  size?: "small" | "medium" | "large";
}

export const Loading: React.FC<LoadingProps> = ({
  message = "Loading...",
  fullScreen = false,
  size = "medium",
}) => {
  const sizeClass = `spinner-${size}`;

  if (fullScreen) {
    return (
      <div className="loading-container-fullscreen">
        <div className={`spinner ${sizeClass}`}></div>
        {message && <p className="loading-message">{message}</p>}
      </div>
    );
  }

  return (
    <div className="loading-container">
      <div className={`spinner ${sizeClass}`}></div>
      {message && <p className="loading-message">{message}</p>}
    </div>
  );
};

export default Loading;
