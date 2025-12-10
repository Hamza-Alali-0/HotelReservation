// ============================================
// API Types (matching backend entities)
// ============================================

export interface Hotel {
  id: number;
  name: string;
  location: string;
  description?: string;
  stars?: number;
  image?: string;
  amenities?: string[];
}

export interface Room {
  id: number;
  roomNumber: string;
  capacity: number;
  price: number;
  available: boolean;
  hotelId: number;
  type?: string;
  description?: string;
  size?: number;
  amenities?: string[];
}

export interface Reservation {
  id: number;
  customerName: string;
  hotelId: number;
  roomId: number;
  checkin: string;
  checkout: string;
  paymentStatus: 'PAID' | 'PENDING';
}

export interface ReservationCreate {
  customerName: string;
  hotelId: number;
  roomId: number;
  checkin: string;
  checkout: string;
}

// ============================================
// Authentication Types
// ============================================

export interface User {
  id: number;
  email: string;
  name: string;
  token: string;
  phone?: string;
  role?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
  admin?: boolean;
}

// ============================================
// UI Component Types
// ============================================

export interface SearchParams {
  destination: string;
  checkin: string;
  checkout: string;
  guests: number;
}

export interface FilterOptions {
  priceRange: {
    min: number;
    max: number;
  };
  stars?: number[];
  location?: string;
  capacity?: number;
  available?: boolean;
}

export interface PaymentFormData {
  cardNumber: string;
  cardHolder: string;
  expiry: string;
  cvv: string;
}

export interface BookingDetails {
  hotel: Hotel;
  room: Room;
  checkin: string;
  checkout: string;
  guests: number;
  totalNights: number;
  totalPrice: number;
}

// ============================================
// Context Types
// ============================================

export interface AuthContextType {
  user: User | null;
  login: (credentials: LoginRequest) => Promise<User>;
  signup: (data: SignupRequest) => Promise<User>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface SearchContextType {
  searchParams: SearchParams;
  updateSearch: (params: Partial<SearchParams>) => void;
  clearSearch: () => void;
}

// ============================================
// Utility Types
// ============================================

export interface ApiError {
  message: string;
  status?: number;
  errors?: Record<string, string[]>;
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

