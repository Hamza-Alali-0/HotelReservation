# Auth Service

Authentication and authorization microservice for the Hotel Reservation System.

## Overview

The Auth Service handles user authentication, admin login, and JWT token generation. It's a separate microservice that manages all authentication concerns independently from the business logic services.

## Features

- ✅ User registration (signup)
- ✅ User login with JWT token generation
- ✅ Admin login with role-based access
- ✅ Password encryption with BCrypt
- ✅ JWT token validation
- ✅ Separate admin endpoint for privileged access
- ✅ H2 in-memory database
- ✅ Service discovery with Eureka

## Technology Stack

- **Framework**: Spring Boot 3.2.6
- **Security**: Spring Security + JWT (jjwt 0.11.5)
- **Database**: H2 (in-memory)
- **Service Discovery**: Netflix Eureka Client
- **Build Tool**: Maven

## Default Credentials

### Admin Account

- **Email**: `admin@hotel.com`
- **Password**: `admin123`
- **Role**: ADMIN

### Test User Account

- **Email**: `user@hotel.com`
- **Password**: `user123`
- **Role**: USER

## API Endpoints

### User Authentication

#### Signup

```http
POST /api/auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "phone": "1234567890"
}
```

**Response:**

```json
{
  "id": 1,
  "email": "user@example.com",
  "name": "John Doe",
  "phone": "1234567890",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "role": "USER"
}
```

#### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "id": 1,
  "email": "user@example.com",
  "name": "John Doe",
  "phone": "1234567890",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "role": "USER"
}
```

#### Admin Login

```http
POST /api/auth/admin/login
Content-Type: application/json

{
  "email": "admin@hotel.com",
  "password": "admin123"
}
```

**Response:**

```json
{
  "id": 1,
  "email": "admin@hotel.com",
  "name": "Admin User",
  "phone": "1234567890",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "role": "ADMIN"
}
```

**Error Response (non-admin user):**

```json
{
  "message": "Access denied. Admin privileges required."
}
```

#### Logout

```http
POST /api/auth/logout
```

**Response:**

```json
{
  "message": "Logged out successfully"
}
```

## Configuration

### Application Properties (`application.yml`)

```yaml
server:
  port: 8084

spring:
  application:
    name: auth-service

  datasource:
    url: jdbc:h2:mem:authdb
    driver-class-name: org.h2.Driver
    username: sa
    password:

  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true

eureka:
  client:
    service-url:
      defaultZone: http://localhost:8761/eureka/

jwt:
  secret: mySecretKeyForJWTTokenGenerationAndValidation2024
  expiration: 86400000 # 24 hours
```

## Running the Service

### Prerequisites

- Java 17+
- Maven 3.6+
- Eureka Server running on port 8761

### Run Standalone

```bash
cd reservation/auth-service
mvn spring-boot:run
```

### Run with All Services

```bash
cd reservation
./start-all-services.ps1
```

## Development

### Project Structure

```
auth-service/
├── src/
│   └── main/
│       ├── java/com/example/auth/
│       │   ├── AuthServiceApplication.java
│       │   ├── config/
│       │   │   └── SecurityConfig.java
│       │   ├── controller/
│       │   │   └── AuthController.java
│       │   ├── dto/
│       │   │   ├── LoginRequest.java
│       │   │   ├── SignupRequest.java
│       │   │   └── AuthResponse.java
│       │   ├── entity/
│       │   │   └── User.java
│       │   ├── repository/
│       │   │   └── UserRepository.java
│       │   ├── security/
│       │   │   └── JwtUtil.java
│       │   └── service/
│       │       └── AuthService.java
│       └── resources/
│           ├── application.yml
│           └── data.sql
└── pom.xml
```

### Security Features

1. **Password Encryption**: All passwords are encrypted using BCrypt
2. **JWT Tokens**: Tokens include user email and role
3. **Token Expiration**: Tokens expire after 24 hours
4. **Role-Based Access**: Separate admin login endpoint
5. **CORS**: Configured to allow requests from frontend

### Database Access

H2 Console is enabled for development:

- **URL**: http://localhost:8084/h2-console
- **JDBC URL**: jdbc:h2:mem:authdb
- **Username**: sa
- **Password**: (empty)

## Integration with Frontend

The frontend calls the auth service through the API Gateway:

```typescript
// Login
const response = await axios.post("/api/auth/login", {
  email: "user@example.com",
  password: "password123",
});

// Admin Login
const response = await axios.post("/api/auth/admin/login", {
  email: "admin@hotel.com",
  password: "admin123",
});
```

## Monitoring

Check service health and registration:

- Eureka Dashboard: http://localhost:8761
- Service Status: Look for "AUTH-SERVICE" in registered instances

## Troubleshooting

### Service not registering with Eureka

- Ensure Eureka Server is running on port 8761
- Check `eureka.client.service-url.defaultZone` in application.yml

### JWT Token errors

- Verify JWT secret matches between services
- Check token expiration time
- Ensure Authorization header is properly set

### Database errors

- H2 database recreates on restart (in-memory)
- Check data.sql for initialization scripts
- Verify JPA configuration in application.yml

## Future Enhancements

- [ ] Email verification
- [ ] Password reset functionality
- [ ] Refresh token mechanism
- [ ] OAuth2/Social login integration
- [ ] Rate limiting for login attempts
- [ ] Persistent database (PostgreSQL/MySQL)
- [ ] User profile management endpoints
