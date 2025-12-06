import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-container">
          <div className="footer-brand">
            <div className="footer-logo">
              <img src="/logo.png" alt="QASRINN" className="footer-logo-img" />
            </div>
            <p className="footer-tagline">
              Experience royal hospitality at QASRINN Style Hotel. Where luxury
              meets tradition since 2024.
            </p>
          </div>

          <div className="footer-links-grid">
            <div className="footer-column">
              <h4 className="footer-heading">Explore</h4>
              <ul className="footer-links">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/hotels">Hotels</Link>
                </li>
                <li>
                  <Link to="/history">Reservations</Link>
                </li>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-heading">Company</h4>
              <ul className="footer-links">
                <li>
                  <a href="#about">About Us</a>
                </li>
                <li>
                  <a href="#careers">Careers</a>
                </li>
                <li>
                  <a href="#press">Press</a>
                </li>
                <li>
                  <a href="#partners">Partners</a>
                </li>
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-heading">Support</h4>
              <ul className="footer-links">
                <li>
                  <a href="#help">Help Center</a>
                </li>
                <li>
                  <a href="#contact">Contact</a>
                </li>
                <li>
                  <a href="#terms">Terms of Service</a>
                </li>
                <li>
                  <a href="#privacy">Privacy Policy</a>
                </li>
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-heading">Contact</h4>
              <ul className="footer-contact">
                <li>reservations@luxuryhotels.com</li>
                <li>+1 (888) 555-0123</li>
                <li>New York, NY 10001</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-container">
          <p className="copyright">
            © {currentYear} Luxury Hotels. All rights reserved.
          </p>
          <div className="footer-social">
            <a href="#facebook" className="social-link">
              Facebook
            </a>
            <a href="#instagram" className="social-link">
              Instagram
            </a>
            <a href="#twitter" className="social-link">
              Twitter
            </a>
            <a href="#linkedin" className="social-link">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
