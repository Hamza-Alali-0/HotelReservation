# 🏨 HotelBook - Ultra-Modern Premium Frontend

A world-class, production-ready hotel booking interface built with **TypeScript + React + Vite**. Inspired by Booking.com, Airbnb, and Expedia with luxury travel aesthetics.

## ✨ Premium Features Implemented

### 🎬 Cinematic Hero Section
- **Full-screen background** with Ken Burns animation effect
- **Glassmorphism search bar** with backdrop blur
- **Gradient overlay** for perfect text readability
- **Responsive date pickers** with smooth animations

### 🖼️ Image-Driven Design
- **High-quality Unsplash images** for hotels, destinations, and rooms
- **Hover zoom effects** on all image cards
- **Image galleries** with smooth transitions
- **Realistic hotel photography** feel

### 🎨 Design System
- **Premium color palette**: Deep blue (#003580), Royal blue (#0071c2), White, Soft grays
- **Custom CSS variables** for consistency
- **Glassmorphism effects** with backdrop blur
- **Gradient overlays** and text effects
- **Smooth micro-interactions**

### 📱 Pages

#### 1. Home Page (`/`)
**Cinematic Landing Experience**
- Large hero with background video-style animation
- Premium search bar with glassmorphism
- Featured destinations grid (6 locations)
- Trending hotels carousel
- Quick action cards with gradients
- Trust indicators (1M+ guests, 50K+ hotels)
- Professional footer

#### 2. Reservation Page (`/reserve`)
**Luxury Booking Interface**
- Hotel grid with realistic images
- Rating badges and pricing
- Dynamic room loading
- Booking form with validation
- **3D Credit Card Payment Modal**:
  - Front/back flip animation
  - Real-time preview
  - Glassmorphism backdrop
  - Fintech-level polish

#### 3. History Page (`/history`)
**Professional Dashboard**
- Statistics cards with gradients
- Filter bar (All, Paid, Pending)
- Live search functionality
- Reservation cards with images
- Status badges
- Empty state design

## 🎯 Premium UI Components

### Core Components
- ✅ **Button** - 3 variants, hover glow effects
- ✅ **Card** - Image cards with zoom effects
- ✅ **Input** - Premium form fields
- ✅ **Badge** - Status indicators
- ✅ **Modal** - Glassmorphism overlays
- ✅ **Navbar** - Sticky header with active states

### Advanced Features
- ✅ **Image hover zoom** with smooth transforms
- ✅ **Ken Burns animation** for hero backgrounds
- ✅ **Glassmorphism** UI elements
- ✅ **Gradient text** effects
- ✅ **Skeleton loading** states
- ✅ **Glow on hover** interactions
- ✅ **Floating animations**

## 🚀 Running the Project

```bash
# Navigate to frontend
cd frontend

# Install dependencies (if not already done)
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

**Access:** http://localhost:3001 (or 3000 if available)

## 📦 Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI library with hooks |
| **TypeScript** | Type safety |
| **Vite** | Lightning-fast dev server |
| **React Router v6** | Client-side routing |
| **Axios** | HTTP client |
| **CSS3** | Modern styling & animations |
| **Unsplash API** | High-quality hotel images |

## 🎨 Design Philosophy

### Inspired By
- **Booking.com** - Professional layout & trustworthy design
- **Airbnb** - Image-driven cards & clean spacing
- **Expedia** - Comprehensive filtering & search
- **Hotels.com** - Premium hotel presentations
- **Stripe** - Fintech-level payment UI

### Key Principles
1. **Image-First**: Large, high-quality photography
2. **Glassmorphism**: Modern blur effects
3. **Smooth Animations**: 60fps transitions
4. **Bold Typography**: Clear hierarchy
5. **Luxury Feel**: Premium travel vibes
6. **Mobile-First**: Responsive breakpoints

## 📁 Project Structure

```
frontend/
├── src/
│   ├── assets/
│   │   └── images.ts          # Image URLs & helpers
│   ├── components/
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Input/
│   │   ├── Badge/
│   │   ├── Modal/
│   │   └── Navbar/
│   ├── pages/
│   │   ├── Home/              # Cinematic landing
│   │   ├── Reservation/       # Booking interface
│   │   └── History/           # User dashboard
│   ├── services/
│   │   └── api.ts             # API integration
│   ├── styles/
│   │   └── globals.css        # Design system
│   └── types/
│       └── index.ts           # TypeScript types
```

## 🔌 API Integration

Connects to Spring Boot microservices via API Gateway:

- **Hotels**: `GET /api/hotels`
- **Rooms**: `GET /api/rooms`, `GET /api/rooms/search/findByHotelId?hotelId={id}`
- **Reservations**: `GET /api/reservations`, `POST /api/reservations`

Vite proxies `/api` to `http://localhost:8080`

## 🎨 CSS Features

### Custom Properties
```css
--primary: #003580;
--accent: #0071c2;
--shadow-xl: 0 20px 60px rgba(0,0,0,0.3);
--radius-xl: 24px;
--transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```

### Utility Classes
- `.glass` - Glassmorphism effect
- `.gradient-text` - Gradient text fill
- `.img-hover-zoom` - Image zoom on hover
- `.fade-in`, `.slide-in`, `.scale-in` - Animations
- `.floating` - Floating animation
- `.glow-on-hover` - Hover glow effect

## 📊 Performance

- **Vite HMR**: Instant updates during development
- **Code splitting**: Optimized bundle sizes
- **Lazy loading**: Images load on demand
- **CSS optimization**: Minimal runtime overhead
- **TypeScript**: Zero runtime cost

## 🎯 Next Steps

### Backend Integration
1. Start Eureka Server (8761)
2. Start Hotel Service (8090)
3. Start Reservation Service (8081)
4. Start API Gateway (8080)
5. Frontend auto-connects via proxy

### Production Deployment
```bash
npm run build
# Deploy dist/ to Vercel, Netlify, or AWS S3
```

## 🌟 Highlights

✅ **Booking.com-level polish**  
✅ **Premium image-driven design**  
✅ **3D credit card animation**  
✅ **Glassmorphism UI**  
✅ **Smooth micro-interactions**  
✅ **Fully responsive**  
✅ **Type-safe with TypeScript**  
✅ **Production-ready**  

---

**Built with ❤️ using React + TypeScript + Vite**

*Ultra-modern hotel booking experience ready for production deployment.*
