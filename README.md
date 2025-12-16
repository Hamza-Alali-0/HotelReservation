# 🏨 Hotel Reservation System - Full Stack Application

A complete hotel reservation system built with **React**, **TypeScript**, **Spring Boot microservices**, and **MySQL**. Features modern UI design, responsive layout, and full booking functionality.

## 📸 Features

### ✨ Frontend (React + TypeScript)

- 🏠 **Home Page** - Hero section, search bar, featured hotels
- 🏨 **Hotel Listing** - Browse hotels with advanced filters (price, stars, location)
- 🔍 **Hotel Details** - Image gallery, amenities, room selection
- 📝 **Reservation System** - Complete booking flow with payment
- 👤 **User Authentication** - Login/Signup (mock implementation)
- 📊 **User Dashboard** - View bookings and manage reservations
- 📜 **Booking History** - Track all reservations
- 📱 **Responsive Design** - Mobile-first, works on all devices

### ⚙️ Backend (Spring Boot Microservices)

- 🔧 **Eureka Server** - Service discovery and registration
- 🌐 **API Gateway** - Single entry point for all services
- 🏢 **Hotel Service** - Manage hotels and rooms
- 📋 **Reservation Service** - Handle bookings and reservations
- 💾 **MySQL Databases** - Persistent data storage
- 🔄 **Load Balancing** - Via Eureka and Spring Cloud Gateway

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    React Frontend                       │
│              (Vite + TypeScript + React Router)         │
│                  http://localhost:5173                  │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                   API Gateway                           │
│              (Spring Cloud Gateway)                     │
│                  http://localhost:8080                  │
└──────┬──────────────────────────────────────────┬───────┘
       │                                          │
       ▼                                          ▼
┌──────────────────┐                    ┌──────────────────┐
│  Hotel Service   │                    │ Reservation Svc  │
│   Port: 8090     │                    │   Port: 8081     │
│  ┌────────────┐  │                    │  ┌────────────┐  │
│  │ MySQL DB   │  │                    │  │ MySQL DB   │  │
│  │ hoteldb    │  │                    │  │ reservation│  │
│  └────────────┘  │                    │  └────────────┘  │
└──────────────────┘                    └──────────────────┘
       │                                          │
       └──────────────┬───────────────────────────┘
                      ▼
             ┌──────────────────┐
             │  Eureka Server   │
             │   Port: 8761     │
             │ (Service Registry)│
             └──────────────────┘
```

## 🚀 Quick Start

### Prerequisites

- **Java 17+**
- **Maven 3.6+**
- **Node.js 16+**
- **MySQL 8.0+**
- **Git**

### Option 1: Automated Startup (Windows PowerShell)

```powershell
# Run the automated startup script
.\start-all.ps1
```

This will:

1. Start all backend services
2. Install frontend dependencies (if needed)
3. Start the React frontend
4. Open the app in your browser

### Option 2: Manual Startup

See **[QUICKSTART.md](./QUICKSTART.md)** for detailed manual startup instructions.

### Option 3: Step-by-Step

```bash
# 1. Start Eureka Server
cd reservation/eureka-server
mvn spring-boot:run

# 2. Start API Gateway (new terminal)
cd reservation/api-gateway
mvn spring-boot:run

# 3. Start Hotel Service (new terminal)
cd reservation/hotel-service
mvn spring-boot:run

# 4. Start Reservation Service (new terminal)
cd reservation/reservation-service
mvn spring-boot:run

# 5. Start Frontend (new terminal)
cd reservation/frontend
npm install
npm run dev
```

## 📊 Database Setup

### Automatic Database Creation

Both databases are created automatically on first run:

- `hoteldb` - Hotels and rooms
- `reservationdb` - Reservations

### Load Sample Data

```bash
# Connect to MySQL
mysql -u root -p

# Run sample data script
source reservation/sample-data.sql
```

This adds:

- 8 sample hotels
- 30+ rooms with varying prices and availability
- 3 sample reservations

## 🌐 Access Points

| Service             | URL                   | Description                     |
| ------------------- | --------------------- | ------------------------------- |
| Frontend            | http://localhost:5173 | React application               |
| API Gateway         | http://localhost:8080 | API entry point                 |
| Eureka Dashboard    | http://localhost:8761 | Service registry                |
| Hotel Service       | http://localhost:8090 | Direct access (not recommended) |
| Reservation Service | http://localhost:8081 | Direct access (not recommended) |

## 📁 Project Structure

```
reservationHotel/
├── reservation/
│   ├── eureka-server/         # Service Discovery (Port 8761)
│   ├── api-gateway/           # API Gateway (Port 8080)
│   ├── hotel-service/         # Hotel & Room Management (Port 8090)
│   │   ├── src/main/java/com/example/hotel/
│   │   │   ├── controller/    # REST controllers
│   │   │   ├── entity/        # JPA entities
│   │   │   └── repository/    # Data repositories
│   │   └── src/main/resources/
│   │       ├── application.yml
│   │       └── data.sql       # Sample room data
│   ├── reservation-service/   # Reservation Management (Port 8081)
│   │   ├── src/main/java/com/example/reservation/
│   │   │   ├── controller/    # REST controllers
│   │   │   ├── entity/        # JPA entities
│   │   │   ├── dto/           # Data transfer objects
│   │   │   └── repository/    # Data repositories
│   │   └── src/main/resources/
│   │       └── application.yml
│   ├── frontend/              # React Frontend (Port 5173)
│   │   ├── src/
│   │   │   ├── components/    # Reusable UI components
│   │   │   ├── pages/         # Page components
│   │   │   ├── services/      # API service layer
│   │   │   ├── context/       # React Context (Auth, Search)
│   │   │   ├── types/         # TypeScript interfaces
│   │   │   └── styles/        # Global styles
│   │   ├── package.json
│   │   └── vite.config.ts
│   └── sample-data.sql        # Sample database data
├── QUICKSTART.md              # Detailed startup guide
├── start-all.ps1              # Automated startup script
└── README.md                  # This file
```

## 🔌 API Documentation

### Hotels API (via Gateway: http://localhost:8080)

```http
# Get all hotels
GET /hotels

# Get hotel by ID
GET /hotels/{id}
```

### Rooms API

```http
# Get all rooms
GET /rooms

# Get room by ID
GET /rooms/{id}
```

### Reservations API

```http
# Create reservation
POST /reservations
Content-Type: application/json

{
  "customerName": "John Doe",
  "hotelId": 1,
  "roomId": 1,
  "checkin": "2024-12-15",
  "checkout": "2024-12-20"
}

# Get all reservations
GET /reservations/history
```

## 🎨 Frontend Features

### Pages

1. **Home** (`/`) - Search, featured hotels, features
2. **Hotels** (`/hotels`) - Browse with filters
3. **Hotel Detail** (`/hotels/:id`) - Detailed view
4. **Reservation** (`/reserve`) - Booking form
5. **Login** (`/login`) - User authentication
6. **Signup** (`/signup`) - User registration
7. **Dashboard** (`/dashboard`) - User profile
8. **History** (`/history`) - Booking history

### Components

- `SearchBar` - Hotel search with dates
- `HotelCard` - Hotel display card
- `StarRating` - 5-star rating system
- `Loading` - Loading spinner
- `Navbar` - Navigation with auth
- `Footer` - Site footer
- `Modal` - Payment modal
- `Button`, `Input`, `Card`, `Badge` - UI primitives

## 🛠️ Technologies Used

### Frontend

- React 18
- TypeScript
- React Router v6
- Axios
- Vite
- CSS3 (Responsive)

### Backend

- Spring Boot 3.x
- Spring Cloud (Gateway, Eureka)
- Spring Data JPA
- MySQL 8.0
- Maven

## 📱 Screenshots & Demo

### User Flow

1. Browse hotels on home page
2. Filter by price, location, stars
3. View hotel details and rooms
4. Sign up / Login
5. Make a reservation
6. View booking in dashboard
7. Check history

## 🧪 Testing

### Test User Flow

1. Start all services
2. Open http://localhost:5173
3. Click "Sign Up" → Create account
4. Browse hotels → Click a hotel
5. Click "Book Now" on a room
6. Fill reservation form
7. Complete mock payment
8. View in "Dashboard" or "My Bookings"

### API Testing (Postman/cURL)

```bash
# Get hotels
curl http://localhost:8080/hotels

# Get rooms
curl http://localhost:8080/rooms

# Create reservation
curl -X POST http://localhost:8080/reservations \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "Test User",
    "hotelId": 1,
    "roomId": 1,
    "checkin": "2024-12-15",
    "checkout": "2024-12-20"
  }'

# Get reservations
curl http://localhost:8080/reservations/history
```

## 🐛 Troubleshooting

### Services Won't Start

- Ensure MySQL is running
- Check ports 8080, 8081, 8090, 8761, 5173 are free
- Verify Java 17+ is installed: `java -version`

### No Hotels Showing

- Run `sample-data.sql` to insert hotels
- Check hotel-service logs
- Verify database connection

### Frontend Build Issues

```bash
cd reservation/frontend
rm -rf node_modules package-lock.json
npm install
```

### CORS Errors

Ensure `api-gateway/application.yml` has CORS configured (already included).

## 📚 Documentation

- **[QUICKSTART.md](./QUICKSTART.md)** - Detailed setup guide
- **[Frontend README](./reservation/frontend/FRONTEND_README.md)** - Frontend documentation
- **API Gateway Config** - `reservation/api-gateway/src/main/resources/application.yml`

## 🔄 Development Workflow

### Adding a New Feature

1. **Backend**: Add controller/service/entity
2. **Frontend**: Add page/component
3. **API**: Update `services/api.ts`
4. **Types**: Add interfaces in `types/index.ts`
5. **Routes**: Add route in `App.tsx`

### Making Changes

- Backend: Edit Java files → Restart service
- Frontend: Edit React files → Auto-reload
- Database: Edit SQL → Restart service or manual migration

## 🚀 Deployment

### Production Build

```bash
# Backend: Build JARs
cd reservation/eureka-server && mvn clean package
cd reservation/api-gateway && mvn clean package
cd reservation/hotel-service && mvn clean package
cd reservation/reservation-service && mvn clean package

# Frontend: Build static files
cd reservation/frontend
npm run build
# Output in: dist/
```

### Docker (Future Enhancement)

Could add Docker Compose for containerized deployment.

## 🎯 Future Enhancements

- [ ] Real JWT authentication
- [ ] Email notifications
- [ ] Payment gateway integration
- [ ] Hotel image uploads
- [ ] Reviews and ratings
- [ ] Advanced search filters
- [ ] Admin dashboard
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Real-time availability
- [ ] Booking modifications/cancellations
- [ ] Map integration (Google Maps)

## 👥 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is created for educational purposes.

## 📞 Support

For issues and questions:

1. Check QUICKSTART.md
2. Review troubleshooting section
3. Check service logs
4. Verify database connections

## 🙏 Acknowledgments

- Spring Boot for microservices framework
- React for frontend library
- Vite for blazing fast builds
- Inspired by Booking.com and Expedia UX

---

**Built with ❤️ using Spring Boot, React, and TypeScript**

**Happy Coding! 🚀**
