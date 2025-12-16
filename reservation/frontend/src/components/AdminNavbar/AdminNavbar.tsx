import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import "./AdminNavbar.css";

export const AdminNavbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={`admin-navbar ${scrolled ? "admin-navbar-scrolled" : ""}`}>
      <div className="admin-navbar-container">
        <div className="admin-navbar-left">
          <Link to="/admin/dashboard" className="admin-brand">
            <img src="/logo.png" alt="QASRINN Admin" className="brand-logo" style={{ height: '40px' }} />
            <span>Admin</span>
          </Link>
          <nav className="admin-nav-links">
            <Link 
              to="/admin/dashboard" 
              className={`admin-nav-link ${isActive("/admin/dashboard") ? "active" : ""}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
              Dashboard
            </Link>
            <Link 
              to="/admin/create-hotel" 
              className={`admin-nav-link ${isActive("/admin/create-hotel") ? "active" : ""}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Add Hotel
            </Link>
            {/* Logic to link 'Add Room' can be improved but static link to dashboard/prompt is safe for now */}
            <Link 
              to="/admin/dashboard" 
              onClick={(e) => {
                 // Optional: alert user or scroll to hotel list
                 if (!location.pathname.includes('/hotel/')) {
                    // e.preventDefault(); 
                    // alert("Please select a hotel from the dashboard to add a room.");
                 }
              }}
              className={`admin-nav-link ${location.pathname.includes('create-room') ? "active" : ""}`}
            >
               <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
                <line x1="12" y1="9" x2="12" y2="15"></line>
                <line x1="9" y1="12" x2="15" y2="12"></line>
              </svg>
              Add Room
            </Link>
          </nav>
        </div>
        
        <div className="admin-navbar-right">
          <div className="admin-user-info">
            <div className="admin-user-avatar">
              {user?.name?.charAt(0).toUpperCase() || "A"}
            </div>
            <span className="admin-user-name">{user?.name || "Administrator"}</span>
          </div>
          <button onClick={handleLogout} className="admin-logout-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};
