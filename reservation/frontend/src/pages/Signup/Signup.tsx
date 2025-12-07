import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Loading } from "@/components";
import "./Signup.css";

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const user = await signup({ name, email, password, isAdmin });
      // Redirect based on role
      if (user.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading message="Creating your account..." fullScreen />;
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Left Side - Form */}
        <div className="auth-form-section">
          <div className="auth-form-container">
            <div className="auth-header">
              <br />
              <br />
              <h1>Create Account</h1>
              <p>Join our exclusive community of travelers</p>
            </div>

            {error && <div className="auth-error">{error}</div>}

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Create password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="admin-checkbox">
                  <input 
                    type="checkbox" 
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                  />
                  <span style={{ marginLeft: '8px' }}>Create as Admin account</span>
                </label>
              </div>

              <div className="form-terms">
                <label className="terms-checkbox">
                  <input type="checkbox" required />
                  <span>
                    I agree to the <a href="#terms">Terms of Service</a> and{" "}
                    <a href="#privacy">Privacy Policy</a>
                  </span>
                </label>
              </div>

              <button type="submit" className="btn-submit">
                Create Account
              </button>
            </form>

            <div className="auth-footer">
              <p>
                Already have an account? <Link to="/login">Sign In</Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="auth-image">
          <img
            src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80"
            alt="Luxury Suite"
          />
          <div className="auth-image-overlay"></div>
          <div className="auth-image-content">
            <span className="auth-tagline">Member Benefits</span>
            <h2>Unlock Exclusive Privileges</h2>
            <ul className="benefits-list">
              <li>Access to member-only rates</li>
              <li>Complimentary room upgrades</li>
              <li>Priority reservations</li>
              <li>Personalized concierge service</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
