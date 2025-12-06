import axios from 'axios';
import type { Hotel, Room, Reservation, ReservationCreate, User, LoginRequest, SignupRequest } from '@/types';

// API Gateway base URL (port 8080)
const API_BASE_URL = 'http://localhost:8080';

// Configure axios defaults
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Add auth token to requests if available
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Hotel Service - connects to hotel-service via API Gateway
export const hotelService = {
  /**
   * Get all hotels from the database
   * Endpoint: GET /api/hotels (routed to hotel-service)
   */
  getAllHotels: async (): Promise<Hotel[]> => {
    try {
      const response = await axios.get('/api/hotels');
      return response.data || [];
    } catch (error) {
      console.error('Error fetching hotels:', error);
      throw error;
    }
  },

  /**
   * Get a single hotel by ID
   * Endpoint: GET /api/hotels/{id}
   */
  getHotelById: async (id: number): Promise<Hotel | null> => {
    try {
      const response = await axios.get(`/api/hotels/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching hotel ${id}:`, error);
      return null;
    }
  },

  /**
   * Create a new hotel (admin only)
   * Endpoint: POST /api/hotels
   */
  createHotel: async (hotelData: any): Promise<Hotel> => {
    try {
      const response = await axios.post('/api/hotels', hotelData);
      return response.data;
    } catch (error) {
      console.error('Error creating hotel:', error);
      throw error;
    }
  },

  /**
   * Update a hotel (admin only)
   * Endpoint: PUT /api/hotels/{id}
   */
  updateHotel: async (id: number, hotelData: any): Promise<Hotel> => {
    try {
      const response = await axios.put(`/api/hotels/${id}`, hotelData);
      return response.data;
    } catch (error) {
      console.error('Error updating hotel:', error);
      throw error;
    }
  },

  /**
   * Search hotels by location (client-side filtering for now)
   */
  searchHotels: async (location?: string): Promise<Hotel[]> => {
    const hotels = await hotelService.getAllHotels();
    if (!location) return hotels;
    return hotels.filter(hotel => 
      hotel.location.toLowerCase().includes(location.toLowerCase())
    );
  },
};

// Room Service - connects to hotel-service via API Gateway
export const roomService = {
  /**
   * Get all rooms from the database
   * Endpoint: GET /api/rooms (routed to hotel-service)
   */
  getAllRooms: async (): Promise<Room[]> => {
    try {
      const response = await axios.get('/api/rooms');
      return response.data || [];
    } catch (error) {
      console.error('Error fetching rooms:', error);
      throw error;
    }
  },

  /**
   * Get rooms by hotel ID
   * Endpoint: GET /api/hotels/{hotelId}/rooms
   */
  getRoomsByHotel: async (hotelId: number): Promise<Room[]> => {
    try {
      const response = await axios.get(`/api/hotels/${hotelId}/rooms`);
      return response.data || [];
    } catch (error) {
      console.error(`Error fetching rooms for hotel ${hotelId}:`, error);
      // Fallback to client-side filtering if endpoint not available
      try {
        const allRooms = await roomService.getAllRooms();
        return allRooms.filter(room => room.hotelId === hotelId);
      } catch (fallbackError) {
        throw error;
      }
    }
  },

  /**
   * Get a single room by ID
   * Endpoint: GET /api/rooms/{id}
   */
  getRoomById: async (id: number): Promise<Room | null> => {
    try {
      const response = await axios.get(`/api/rooms/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching room ${id}:`, error);
      return null;
    }
  },

  /**
   * Create a new room (admin only)
   * Endpoint: POST /api/rooms
   */
  createRoom: async (roomData: any): Promise<Room> => {
    try {
      const response = await axios.post('/api/rooms', roomData);
      return response.data;
    } catch (error) {
      console.error('Error creating room:', error);
      throw error;
    }
  },

  /**
   * Update a room (admin only)
   * Endpoint: PUT /api/rooms/{id}
   */
  updateRoom: async (id: number, roomData: any): Promise<Room> => {
    try {
      const response = await axios.put(`/api/rooms/${id}`, roomData);
      return response.data;
    } catch (error) {
      console.error('Error updating room:', error);
      throw error;
    }
  },

  /**
   * Get available rooms for a hotel
   */
  getAvailableRooms: async (hotelId: number): Promise<Room[]> => {
    const rooms = await roomService.getRoomsByHotel(hotelId);
    return rooms.filter(room => room.available);
  },
};

// Reservation Service - connects to reservation-service via API Gateway
export const reservationService = {
  /**
   * Get all reservations (history)
   * Endpoint: GET /api/reservations/history (routed to reservation-service)
   */
  getAllReservations: async (): Promise<Reservation[]> => {
    try {
      const response = await axios.get('/api/reservations/history');
      return response.data || [];
    } catch (error) {
      console.error('Error fetching reservations:', error);
      throw error;
    }
  },

  /**
   * Create a new reservation
   * Endpoint: POST /api/reservations (routed to reservation-service)
   */
  createReservation: async (reservation: ReservationCreate): Promise<Reservation> => {
    try {
      const response = await axios.post('/api/reservations', reservation);
      return response.data;
    } catch (error) {
      console.error('Error creating reservation:', error);
      throw error;
    }
  },

  /**
   * Get reservations by customer name (client-side filtering)
   */
  getReservationsByCustomer: async (customerName: string): Promise<Reservation[]> => {
    const allReservations = await reservationService.getAllReservations();
    return allReservations.filter(r => r.customerName === customerName);
  },

  /**
   * Get a single reservation by ID
   * Endpoint: GET /api/reservations/{id}
   */
  getReservationById: async (id: number): Promise<Reservation | null> => {
    try {
      const response = await axios.get(`/api/reservations/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching reservation ${id}:`, error);
      return null;
    }
  },
};

// Auth Service - connects to auth-service via API Gateway
export const authService = {
  /**
   * Login user
   * Endpoint: POST /api/auth/login (routed to auth-service)
   */
  login: async (credentials: LoginRequest): Promise<User> => {
    try {
      const response = await axios.post('/api/auth/login', credentials);
      const authData = response.data;
      
      const user: User = {
        id: authData.id,
        email: authData.email,
        name: authData.name,
        phone: authData.phone,
        token: authData.token,
        role: authData.role,
      };
      
      localStorage.setItem('authToken', user.token);
      localStorage.setItem('user', JSON.stringify(user));
      
      return user;
    } catch (error: any) {
      console.error('Login error:', error);
      const message = error.response?.data?.message || error.response?.statusText || 'Login failed';
      throw new Error(message);
    }
  },

  /**
   * Admin login
   * Endpoint: POST /api/auth/admin/login (routed to auth-service)
   */
  adminLogin: async (credentials: LoginRequest): Promise<User> => {
    try {
      const response = await axios.post('/api/auth/admin/login', credentials);
      const authData = response.data;
      
      const user: User = {
        id: authData.id,
        email: authData.email,
        name: authData.name,
        phone: authData.phone,
        token: authData.token,
        role: authData.role,
      };
      
      localStorage.setItem('authToken', user.token);
      localStorage.setItem('user', JSON.stringify(user));
      
      return user;
    } catch (error: any) {
      console.error('Admin login error:', error);
      const message = error.response?.data?.message || error.response?.statusText || 'Admin login failed';
      throw new Error(message);
    }
  },

  /**
   * Signup user
   * Endpoint: POST /api/auth/signup (routed to auth-service)
   */
  signup: async (data: SignupRequest): Promise<User> => {
    try {
      const response = await axios.post('/api/auth/signup', data);
      const authData = response.data;
      
      const user: User = {
        id: authData.id,
        email: authData.email,
        name: authData.name,
        phone: authData.phone,
        token: authData.token,
        role: authData.role,
      };
      
      localStorage.setItem('authToken', user.token);
      localStorage.setItem('user', JSON.stringify(user));
      
      return user;
    } catch (error: any) {
      console.error('Signup error:', error);
      const message = error.response?.data?.message || error.response?.statusText || 'Signup failed';
      throw new Error(message);
    }
  },

  /**
   * Logout user
   */
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  /**
   * Get current user from localStorage
   */
  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('authToken');
  },
};
