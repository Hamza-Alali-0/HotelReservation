# 🚀 Quick Start - Auth Microservice & Admin Portal

## What's New?

✅ **Auth Service Microservice** - Dedicated authentication service  
✅ **Admin Login Portal** - Separate admin authentication  
✅ **Hotel Management** - Create and manage hotels  
✅ **Room Management** - Create and manage rooms

## Start Everything

### 1. Start Backend Services

```powershell
cd reservation
./start-all-services.ps1
```

Wait for all 5 services to start:

- Eureka Server (8761)
- Hotel Service (8090)
- Reservation Service (8081)
- **Auth Service (8084)** ⭐ NEW
- API Gateway (8080)

### 2. Start Frontend

```powershell
cd reservation/frontend
npm run dev
```

Frontend runs on: http://localhost:5173

## Access Admin Portal

### 1. Login as Admin

Navigate to: **http://localhost:5173/admin/login**

**Credentials:**

- Email: `admin@hotel.com`
- Password: `admin123`

### 2. Create a Hotel

1. Click **"Create Hotel"** button
2. Fill in hotel details:
   - Name (e.g., "Grand Plaza Hotel")
   - Location (e.g., "New York, NY")
   - Description
   - Amenities (comma-separated: WiFi, Pool, Gym)
   - Rating (0-5)
3. Click **"Create Hotel"**

### 3. Add Rooms to Hotel

1. From dashboard, click **"Manage Rooms"** on a hotel
2. Click **"Add Room"**
3. Fill in room details:
   - Type (Standard, Deluxe, Suite, etc.)
   - Price per night
   - Capacity (number of guests)
   - Size (m²)
   - Description
   - Amenities (comma-separated)
   - Availability checkbox
4. Click **"Create Room"**

## API Testing

### Test Admin Login

```bash
curl -X POST http://localhost:8080/api/auth/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@hotel.com",
    "password": "admin123"
  }'
```

### Test User Signup

```bash
curl -X POST http://localhost:8080/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "password123",
    "name": "John Doe",
    "phone": "1234567890"
  }'
```

## Verify Services

**Eureka Dashboard**: http://localhost:8761

You should see all 5 services registered:

- API-GATEWAY
- HOTEL-SERVICE
- RESERVATION-SERVICE
- **AUTH-SERVICE** ⭐ NEW

## Troubleshooting

### Frontend won't start

```powershell
cd reservation/frontend
npm install
npm run dev
```

### Services won't connect

1. Ensure Eureka Server started first
2. Wait 30 seconds between service starts
3. Check Eureka dashboard for registrations

### Admin login fails

- Verify auth-service is running on port 8084
- Check API Gateway routes to auth-service
- Default credentials are case-sensitive

## User Workflows

### Regular User Flow

1. Go to http://localhost:5173
2. Click "Sign Up" to create account
3. Login with user credentials
4. Browse hotels and make reservations

### Admin Flow

1. Go to http://localhost:5173/admin/login
2. Login with admin credentials
3. Create hotels from admin dashboard
4. Add rooms to hotels
5. Manage hotel inventory

## Architecture

```
Frontend (5173)
    ↓
API Gateway (8080)
    ↓
┌───┴───┬───────┬──────────┐
│       │       │          │
Hotel   Res.    Auth    Eureka
Service Service Service Server
(8090)  (8081)  (8084)  (8761)
```

## Default Accounts

**Admin:**

- Email: admin@hotel.com
- Password: admin123
- Access: Full hotel/room management

**Test User:**

- Email: user@hotel.com
- Password: user123
- Access: Browse and reserve only

---

**Questions?** Check:

- `AUTH_MICROSERVICE_SUMMARY.md` - Complete implementation details
- `reservation/auth-service/README.md` - Auth service documentation
- Eureka Dashboard - Service health and registration
