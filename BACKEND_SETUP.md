# Hotel Reservation Microservices - Backend Setup Guide

## Architecture Overview

This is a **Spring Boot microservices** application with the following components:

### Microservices

1. **Eureka Server** (Port 8761) - Service Discovery
2. **API Gateway** (Port 8080) - Single entry point for all services
3. **Hotel Service** (Port 8090) - Manages hotels and rooms
4. **Reservation Service** (Port 8081) - Handles booking reservations

### Frontend

- **React + TypeScript + Vite** (Port 5173) - Premium hotel booking UI

---

## Prerequisites

- **Java 17+** (JDK)
- **Maven 3.6+**
- **MySQL 8.0+**
- **Node.js 18+** and npm
- **Git**

---

## Database Setup

### 1. Install and Start MySQL

Ensure MySQL is running on `localhost:3306`

### 2. Create Databases

```sql
CREATE DATABASE hoteldb;
CREATE DATABASE reservationdb;
```

### 3. Configure MySQL Credentials

Update `application.yml` files if your MySQL credentials differ:

**hotel-service/src/main/resources/application.yml:**

```yaml
spring:
  datasource:
    username: root
    password: "" # Update with your MySQL password
```

**reservation-service/src/main/resources/application.yml:**

```yaml
spring:
  datasource:
    username: root
    password: "" # Update with your MySQL password
```

---

## Backend Startup Order (IMPORTANT!)

Start services **in this exact order** for proper Eureka registration:

### 1. Start Eureka Server

```powershell
cd reservation/eureka-server
mvn clean install
mvn spring-boot:run
```

**Verify:** Open http://localhost:8761 - You should see the Eureka dashboard

### 2. Start Hotel Service

```powershell
cd reservation/hotel-service
mvn clean install
mvn spring-boot:run
```

**Verify:** Check Eureka dashboard - `HOTEL-SERVICE` should appear

### 3. Start Reservation Service

```powershell
cd reservation/reservation-service
mvn clean install
mvn spring-boot:run
```

**Verify:** Check Eureka dashboard - `RESERVATION-SERVICE` should appear

### 4. Start API Gateway

```powershell
cd reservation/api-gateway
mvn clean install
mvn spring-boot:run
```

**Verify:** Check Eureka dashboard - `API-GATEWAY` should appear

---

## Testing Backend Endpoints

### Via API Gateway (Port 8080)

**Get all hotels:**

```powershell
curl http://localhost:8080/api/hotels
```

**Get hotel by ID:**

```powershell
curl http://localhost:8080/api/hotels/1
```

**Get all rooms:**

```powershell
curl http://localhost:8080/api/rooms
```

**Get rooms for a specific hotel:**

```powershell
curl http://localhost:8080/api/hotels/1/rooms
```

**Get reservation history:**

```powershell
curl http://localhost:8080/api/reservations/history
```

**Create a reservation:**

```powershell
curl -X POST http://localhost:8080/api/reservations -H "Content-Type: application/json" -d "{\"customerName\":\"John Doe\",\"hotelId\":1,\"roomId\":1,\"checkin\":\"2025-12-20\",\"checkout\":\"2025-12-25\"}"
```

---

## Frontend Setup

### 1. Install Dependencies

```powershell
cd reservation/frontend
npm install
```

### 2. Start Development Server

```powershell
npm run dev
```

**Access:** http://localhost:5173

---

## Key Configuration Details

### API Gateway Routes

All frontend requests go through `http://localhost:8080`:

- `/api/hotels/**` → `hotel-service` (Port 8090)
- `/api/rooms/**` → `hotel-service` (Port 8090)
- `/api/reservations/**` → `reservation-service` (Port 8081)

### CORS Configuration

API Gateway allows requests from:

- `http://localhost:5173` (frontend dev server)

To add more origins, update: `reservation/api-gateway/src/main/java/com/example/gateway/config/CorsConfig.java`

### Database Auto-initialization

On first startup, `hotel-service` automatically:

1. Creates tables (via JPA/Hibernate `ddl-auto: update`)
2. Populates sample data from `data.sql`:
   - 6 hotels
   - 12 rooms

---

## Common Issues & Solutions

### Issue 1: Service not registering with Eureka

**Solution:**

- Ensure Eureka is running **first**
- Wait 30-60 seconds for registration
- Check `application.yml` has correct `eureka.client.service-url`

### Issue 2: Cannot connect to MySQL

**Solution:**

```powershell
# Verify MySQL is running
mysql -u root -p

# Create databases manually
CREATE DATABASE hoteldb;
CREATE DATABASE reservationdb;
```

### Issue 3: CORS errors in browser console

**Solution:**

- Ensure API Gateway is running
- Check `CorsConfig.java` includes your frontend URL
- Clear browser cache

### Issue 4: Port already in use

**Solution:**

```powershell
# Find and kill process on port (e.g., 8080)
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

### Issue 5: Frontend shows "No hotels found"

**Solution:**

1. Verify all backend services are running
2. Check `http://localhost:8080/api/hotels` returns data
3. Check browser console for CORS/network errors
4. Ensure MySQL has sample data (check `data.sql`)

---

## Architecture Flow

```
Browser (localhost:5173)
    ↓
API Gateway (localhost:8080) + CORS
    ↓
Eureka Server (localhost:8761) - Service Discovery
    ↓
├── Hotel Service (localhost:8090)
│   └── MySQL: hoteldb (hotels, rooms tables)
│
└── Reservation Service (localhost:8081)
    └── MySQL: reservationdb (reservations table)
    └── Feign Client → Hotel Service
```

---

## Sample Data

After starting `hotel-service`, the database will contain:

**Hotels:**

1. The Grand Palace - Paris, France
2. Azure Beach Resort - Maldives
3. Mountain Lodge - Swiss Alps
4. The Ritz Continental - London, UK
5. Sunset Villa Resort - Santorini, Greece
6. Royal Marina Hotel - Dubai, UAE

**Rooms:** 12 rooms across all hotels (various capacities and prices)

---

## Development Tips

### Hot Reload (Backend)

Use Spring DevTools for faster development:

```xml
<!-- Add to pom.xml -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <scope>runtime</scope>
</dependency>
```

### Frontend Hot Reload

Vite provides instant HMR - changes appear immediately without refresh.

### Build for Production

**Backend:**

```powershell
cd reservation
mvn clean package -DskipTests
```

Generates JAR files in `target/` folders.

**Frontend:**

```powershell
cd reservation/frontend
npm run build
```

Generates optimized bundle in `dist/` folder.

---

## API Endpoints Summary

### Hotel Service (via Gateway)

| Method | Endpoint                      | Description         |
| ------ | ----------------------------- | ------------------- |
| GET    | `/api/hotels`                 | Get all hotels      |
| GET    | `/api/hotels/{id}`            | Get hotel by ID     |
| GET    | `/api/rooms`                  | Get all rooms       |
| GET    | `/api/rooms/{id}`             | Get room by ID      |
| GET    | `/api/hotels/{hotelId}/rooms` | Get rooms for hotel |

### Reservation Service (via Gateway)

| Method | Endpoint                    | Description            |
| ------ | --------------------------- | ---------------------- |
| GET    | `/api/reservations/history` | Get all reservations   |
| GET    | `/api/reservations/{id}`    | Get reservation by ID  |
| POST   | `/api/reservations`         | Create new reservation |

**POST Body Example:**

```json
{
  "customerName": "Jane Smith",
  "hotelId": 1,
  "roomId": 2,
  "checkin": "2025-12-20",
  "checkout": "2025-12-25"
}
```

---

## Support

For issues or questions, check:

1. Eureka Dashboard: http://localhost:8761
2. Application logs in console
3. MySQL logs

---

## License

MIT License - Free to use and modify
