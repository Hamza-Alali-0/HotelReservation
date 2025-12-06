import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import "./Navbar.css";

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
    setMobileMenuOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="navbar-container">
        <Link
          to="/"
          className="navbar-brand"
          onClick={() => setMobileMenuOpen(false)}
        >
          <img src="/logo.png" alt="QASRINN" className="brand-logo" />
        </Link>

        <button
          className="mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span
            className={`hamburger ${mobileMenuOpen ? "active" : ""}`}
          ></span>
        </button>

        <nav className={`navbar-nav ${mobileMenuOpen ? "nav-open" : ""}`}>
          <div className="nav-links">
            <Link
              to="/"
              className={`nav-link ${isActive("/") ? "active" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/hotels"
              className={`nav-link ${isActive("/hotels") ? "active" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Hotels
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  to="/dashboard"
                  className={`nav-link ${
                    isActive("/dashboard") ? "active" : ""
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/history"
                  className={`nav-link ${isActive("/history") ? "active" : ""}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Bookings
                </Link>
              </>
            )}
          </div>

          <div className="nav-auth">
            {isAuthenticated ? (
              <div className="user-section">
                <span className="user-greeting">Welcome, {user?.name}</span>
                <button className="btn-logout" onClick={handleLogout}>
                  Sign Out
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="btn-login"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="btn-signup"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Join Now
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};
