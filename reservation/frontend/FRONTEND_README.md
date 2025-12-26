# Hotel Reservation Frontend - React Application

A modern, fully-functional hotel reservation system built with React, TypeScript, and Vite. This frontend connects to a Spring Boot microservices backend via API Gateway.

## 🎯 Features

### Core Functionality

- ✅ **Hotel Search & Browsing**: Search hotels by location, price, ratings
- ✅ **Hotel Details**: Detailed view with images, amenities, room listings
- ✅ **Room Booking**: Complete reservation system with date selection
- ✅ **User Authentication**: Login/Signup with mock authentication
- ✅ **User Dashboard**: View and manage reservations
- ✅ **Booking History**: Track all past and current reservations
- ✅ **Responsive Design**: Mobile-first, fully responsive layout
- ✅ **Modern UI**: Inspired by Booking.com/Expedia with professional design
yesy 768px
### Pages

1. **Home** - Hero section, search bar, featured hotels
2. **Hotels** - Listing page with filters (price, stars, location, availability)
3. **Hotel Detail** - Gallery, amenities, room selection, booking
4. **Reservation** - Booking form with payment (mock)
5. **Login/Signup** - User authentication pages
6. **Dashboard** - User profile and reservation management
7. **History** - Complete booking history

## 🏗️ Architecture

### Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **Vite** - Build tool
- **Context API** - State management

### Project Structure

```
frontend/
├── src/
│   ├── assets/          # Images and static files
│   ├── components/      # Reusable components
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Input/
│   │   ├── Modal/
│   │   ├── Navbar/
│   │   ├── Footer/
│   │   ├── Loading/
│   │   ├── StarRating/
│   │   ├── HotelCard/
│   │   └── SearchBar/
│   ├── context/         # React Context providers
│   │   ├── AuthContext.tsx
│   │   └── SearchContext.tsx
│   ├── pages/           # Page components
│   │   ├── Home/
│   │   ├── Hotels/
│   │   ├── HotelDetail/
│   │   ├── Reservation/
│   │   ├── Login/
│   │   ├── Signup/
│   │   ├── Dashboard/
│   │   └── History/
│   ├── services/        # API services
│   │   └── api.ts
│   ├── styles/          # Global styles
│   │   └── globals.css
│   ├── types/           # TypeScript types
│   │   └── index.ts
│   ├── App.tsx          # Main app component
│   └── main.tsx         # Entry point
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm
- Backend services running (Eureka, API Gateway, Hotel Service, Reservation Service)

### Installation

1. **Navigate to frontend directory**

```bash
cd reservation/frontend
```

2. **Install dependencies**

```bash
npm install
```

3. **Start development server**

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Backend Configuration

The frontend is configured to connect to the API Gateway at:

```
http://localhost:8080
```

Ensure the following services are running:

- **Eureka Server**: `http://localhost:8761`
- **API Gateway**: `http://localhost:8080`
- **Hotel Service**: `http://localhost:8090`
- **Reservation Service**: `http://localhost:8081`

## 🔌 API Integration

### Services

#### Hotel Service

```typescript
hotelService.getAllHotels(); // GET /hotels
hotelService.getHotelById(id); // GET /hotels/{id}
hotelService.searchHotels(location); // Client-side filter
```

#### Room Service

```typescript
roomService.getAllRooms(); // GET /rooms
roomService.getRoomsByHotel(hotelId); // Client-side filter
roomService.getAvailableRooms(hotelId); // Client-side filter
```

#### Reservation Service

```typescript
reservationService.getAllReservations(); // GET /reservations/history
reservationService.createReservation(); // POST /reservations
reservationService.getReservationsByCustomer(); // Client-side filter
```

#### Auth Service (Mock)

```typescript
authService.login(credentials); // Mock - localStorage
authService.signup(data); // Mock - localStorage
authService.logout(); // Clear localStorage
authService.getCurrentUser(); // Get from localStorage
```

## 🎨 Design Features

### Modern UI Components

- **SearchBar**: Advanced search with destination, dates, guests
- **HotelCard**: Responsive card with image, rating, price
- **StarRating**: 5-star rating display
- **Loading**: Spinner with customizable size
- **Modal**: Payment modal with animations

### Styling

- **Tailwind-like** utility classes
- **Gradient backgrounds** and glassmorphism effects
- **Smooth animations** and transitions
- **Mobile-first** responsive design
- **Professional color scheme** (Blue primary, clean grays)

### Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔐 Authentication

Currently uses **mock authentication** with localStorage:

```typescript
// Login stores user object
{ id, email, name, token }

// Token is added to axios headers
Authorization: Bearer {token}
```

To integrate real authentication:

1. Update `authService` in `services/api.ts`
2. Add backend auth endpoints
3. Implement JWT token handling

## 📊 State Management

### AuthContext

- User authentication state
- Login/logout functionality
- User profile data

### SearchContext

- Search parameters
- Filter state
- Search history

## 🧪 Testing Workflow

### Manual Testing Steps

1. **Start Backend Services**

```bash
# In separate terminals
cd reservation/eureka-server && mvn spring-boot:run
cd reservation/api-gateway && mvn spring-boot:run
cd reservation/hotel-service && mvn spring-boot:run
cd reservation/reservation-service && mvn spring-boot:run
```

2. **Start Frontend**

```bash
cd reservation/frontend && npm run dev
```

3. **Test User Flow**

- Browse home page → See featured hotels
- Search hotels → Filter by price/stars
- View hotel details → See rooms and amenities
- Signup/Login → Create account
- Make reservation → Complete booking
- View dashboard → See reservations
- Check history → View all bookings

## 📦 Build for Production

```bash
npm run build
```

Production files will be in `dist/` directory.

Preview production build:

```bash
npm run preview
```

## 🛠️ Development Tips

### Adding New Pages

1. Create page component in `src/pages/PageName/`
2. Add route in `App.tsx`
3. Update navigation in `Navbar.tsx`

### Adding API Calls

1. Add type in `types/index.ts`
2. Add service method in `services/api.ts`
3. Use in component with error handling

### Styling Guidelines

- Use CSS modules or component-scoped styles
- Follow BEM naming convention
- Use CSS variables from `globals.css`
- Mobile-first responsive design

## 🐛 Troubleshooting

### CORS Issues

If you encounter CORS errors, ensure API Gateway has CORS configured:

```yaml
spring:
  cloud:
    gateway:
      globalcors:
        cors-configurations:
          "[/**]":
            allowedOrigins: "http://localhost:5173"
            allowedMethods: "*"
            allowedHeaders: "*"
```

### API Connection Failed

1. Check backend services are running
2. Verify API Gateway is accessible at `localhost:8080`
3. Check browser console for error details

### Images Not Loading

1. Ensure images exist in `public/assets/` or `src/assets/`
2. Use correct path (e.g., `/assets/hotel.jfif`)
3. Check image fallback logic in components

## 📝 Code Quality

### TypeScript

- All components are typed
- API responses have interfaces
- Proper error handling

### Component Structure

- Functional components with hooks
- Props typing with interfaces
- Commented code for clarity

### Best Practices

- Error boundaries
- Loading states
- Null checks
- Responsive design

## 🚀 Future Enhancements

- [ ] Real backend authentication with JWT
- [ ] Image upload for hotels
- [ ] Advanced filtering (amenities, room types)
- [ ] Map integration
- [ ] Email notifications
- [ ] Payment gateway integration
- [ ] Reviews and ratings system
- [ ] Admin dashboard
- [ ] Multi-language support
- [ ] Dark mode

## 📄 License

This project is part of the Hotel Reservation System.

## 👥 Support

For issues and questions, please check the main project README or contact the development team.

---

**Built with ❤️ using React + TypeScript + Vite**
