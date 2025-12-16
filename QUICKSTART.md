# 🚀 Quick Start Guide - Hotel Reservation Frontend

## Prerequisites Check

- [ ] Node.js 16+ installed (`node --version`)
- [ ] MySQL running on localhost:3306
- [ ] Java 17+ installed (`java -version`)
- [ ] Maven installed (`mvn -version`)

## Step 1: Start Backend Services

Open **4 separate terminals** and run:

### Terminal 1: Eureka Server

```bash
cd reservation/eureka-server
mvn spring-boot:run
```

Wait for: `Started EurekaServerApplication` at http://localhost:8761

### Terminal 2: API Gateway

```bash
cd reservation/api-gateway
mvn spring-boot:run
```

Wait for: `Started ApiGatewayApplication` at http://localhost:8080

### Terminal 3: Hotel Service

```bash
cd reservation/hotel-service
mvn spring-boot:run
```

Wait for: `Started HotelServiceApplication` at http://localhost:8090

### Terminal 4: Reservation Service

```bash
cd reservation/reservation-service
mvn spring-boot:run
```

Wait for: `Started ReservationServiceApplication` at http://localhost:8081

## Step 2: Verify Services

Open browser and check:

- Eureka Dashboard: http://localhost:8761
  - Should show: HOTEL-SERVICE, RESERVATION-SERVICE, API-GATEWAY

## Step 3: Start Frontend

### Terminal 5: React Frontend

```bash
cd reservation/frontend
npm install
npm run dev
```

Wait for: `Local: http://localhost:5173`

## Step 4: Test the Application

### Open Browser

Navigate to: **http://localhost:5173**

### Test User Flow

1. **Home Page** ✅

   - See hero section with search bar
   - View featured hotels
   - Browse hotel cards

2. **Browse Hotels** ✅

   - Click "View All Hotels" or navigate to /hotels
   - Use filters (price range, stars)
   - Click on a hotel card

3. **Hotel Details** ✅

   - View hotel information
   - See available rooms
   - Click "Book Now" on a room

4. **Create Account** ✅

   - Click "Sign Up" in navbar
   - Fill form: Name, Email, Password
   - Click "Sign Up" → Auto-login

5. **Make Reservation** ✅

   - Fill customer name (pre-filled if logged in)
   - Select hotel and room
   - Choose check-in/check-out dates
   - Click "Complete Reservation"
   - Fill mock payment details
   - Submit payment

6. **View Dashboard** ✅

   - Click "Dashboard" in navbar
   - See reservation statistics
   - View recent bookings

7. **Check History** ✅
   - Click "My Bookings" in navbar
   - See all reservations
   - Check payment status (PAID/PENDING)

## 🎯 API Endpoints

### Via API Gateway (localhost:8080)

**Hotels**

- GET /hotels - List all hotels
- GET /hotels/{id} - Get hotel by ID

**Rooms**

- GET /rooms - List all rooms
- GET /rooms/{id} - Get room by ID

**Reservations**

- POST /reservations - Create reservation
- GET /reservations/history - Get all reservations

### Request Examples

**Create Reservation**

```json
POST http://localhost:8080/reservations
Content-Type: application/json

{
  "customerName": "John Doe",
  "hotelId": 1,
  "roomId": 1,
  "checkin": "2024-12-15",
  "checkout": "2024-12-20"
}
```

**Response**

```json
{
  "id": 1,
  "customerName": "John Doe",
  "hotelId": 1,
  "roomId": 1,
  "checkin": "2024-12-15",
  "checkout": "2024-12-20",
  "paymentStatus": "PAID" // or "PENDING" (random)
}
```

## 📊 Database Setup

### MySQL Databases Created Automatically

- `hoteldb` - Hotels and rooms
- `reservationdb` - Reservations

### Sample Data

Hotel service creates sample data on startup:

- Rooms are auto-seeded in `data.sql`
- Hotels need to be added via API or manually

### Add Sample Hotel

```sql
USE hoteldb;
INSERT INTO hotels (name, location) VALUES ('Grand Plaza', 'Downtown');
```

## 🎨 Features Checklist

### Pages ✅

- [x] Home - Hero, search, featured hotels
- [x] Hotels - Listing with filters
- [x] Hotel Detail - Gallery, rooms, booking
- [x] Reservation - Booking form with payment
- [x] Login - User authentication
- [x] Signup - User registration
- [x] Dashboard - User profile and stats
- [x] History - Booking history

### Features ✅

- [x] Search by destination, dates, guests
- [x] Filter by price range, stars, availability
- [x] Hotel cards with images, ratings, prices
- [x] Room selection with capacity and pricing
- [x] Date picker validation
- [x] Mock payment processing
- [x] User authentication (mock)
- [x] Responsive mobile design
- [x] Loading states
- [x] Error handling
- [x] Navigation with active states
- [x] Footer with links

## 🐛 Common Issues

### Backend Not Starting

```bash
# Check MySQL is running
mysql -u root -p

# Check ports are free
netstat -ano | findstr :8080
netstat -ano | findstr :8090
```

### Frontend Build Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### CORS Errors

Add to `api-gateway/application.yml`:

```yaml
spring:
  cloud:
    gateway:
      globalcors:
        corsConfigurations:
          "[/**]":
            allowedOrigins: "http://localhost:5173"
            allowedMethods: "*"
```

### No Hotels Showing

```bash
# Add hotels via MySQL
mysql -u root -p hoteldb
INSERT INTO hotels (name, location) VALUES ('Hotel Test', 'City Center');
```

## 🎓 Development Workflow

### Making Changes

1. **Add new page**: Create in `src/pages/`, add route in `App.tsx`
2. **Add component**: Create in `src/components/`, export in `index.ts`
3. **Update API**: Add types in `types/index.ts`, service in `services/api.ts`
4. **Style changes**: Edit component CSS or `globals.css`

### Hot Reload

- Frontend: Auto-reload on save
- Backend: Restart spring-boot:run

## 📚 Project Structure

```
reservation/
├── eureka-server/          # Service discovery
├── api-gateway/            # API gateway (port 8080)
├── hotel-service/          # Hotels & rooms (port 8090)
├── reservation-service/    # Reservations (port 8081)
└── frontend/              # React app (port 5173)
    ├── src/
    │   ├── components/    # UI components
    │   ├── pages/         # Page components
    │   ├── services/      # API calls
    │   ├── context/       # State management
    │   └── types/         # TypeScript types
    └── public/assets/     # Images
```

## ✅ Success Indicators

You'll know everything is working when:

- ✅ Eureka shows 3 services registered
- ✅ Frontend loads at localhost:5173
- ✅ Hotels display on home page
- ✅ Can create reservations
- ✅ Reservations appear in history
- ✅ No console errors

## 🎉 Next Steps

Once everything is running:

1. Explore the UI and test all features
2. Try creating multiple reservations
3. Test filters and search
4. Check responsive design on mobile
5. Review code structure
6. Add your own hotels via SQL

## 📞 Need Help?

Check:

1. All services running? Check terminals
2. Databases created? Check MySQL
3. Ports free? Check netstat
4. Dependencies installed? Run npm install
5. Browser console? Check for errors

---

**Happy Coding! 🚀**
