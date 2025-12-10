import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { SearchProvider } from "@/context/SearchContext";
import { Navbar, Footer } from "@/components";
import { Home } from "@/pages/Home";
import { Hotels } from "@/pages/Hotels";
import { HotelDetail } from "@/pages/HotelDetail";
import { Reservation } from "@/pages/Reservation";
import { History } from "@/pages/History";
import { Login } from "@/pages/Login";
import { Signup } from "@/pages/Signup";
import { Dashboard } from "@/pages/Dashboard";
import {
  AdminLogin,
  AdminDashboard,
  CreateHotel,
  ManageRooms,
  CreateRoom,
  EditHotel,
  EditRoom,
} from "@/pages/Admin";
import "./styles/globals.css";

/**
 * Main Application Component
 * Configures routing and global providers
 */
function AppContent() {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/signup", "/admin/login"];
  const shouldShowNavbar = 
    !hideNavbarRoutes.includes(location.pathname) && 
    !location.pathname.startsWith("/admin");

  return (
    <div className="app">
      {shouldShowNavbar && <Navbar />}
      <main className="main-content">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/hotels/:id" element={<HotelDetail />} />
          <Route path="/reserve/:hotelId" element={<Reservation />} />
          <Route path="/history" element={<History />} />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/create-hotel" element={<CreateHotel />} />
          <Route
            path="/admin/hotel/:hotelId/rooms"
            element={<ManageRooms />}
          />
          <Route
            path="/admin/hotel/:hotelId/create-room"
            element={<CreateRoom />}
          />
          <Route
            path="/admin/edit-hotel/:hotelId"
            element={<EditHotel />}
          />
          <Route
            path="/admin/room/:roomId/edit"
            element={<EditRoom />}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

/**
 * Main Application Component
 * Configures routing and global providers
 */
function App() {
  return (
    <AuthProvider>
      <SearchProvider>
        <Router>
          <AppContent />
        </Router>
      </SearchProvider>
    </AuthProvider>
  );
}

export default App;
