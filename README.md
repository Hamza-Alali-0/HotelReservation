# HotelReservation — Microservices Demo

Professional, concise README for the HotelReservation demo project (Spring Boot microservices + Angular frontend).

**Project Overview**
- **Purpose**: A minimal Airbnb-like demo that demonstrates a microservices architecture with service discovery (Eureka), API Gateway (Spring Cloud Gateway), two backend services (`hotel-service`, `reservation-service`) and an Angular frontend.
- **Audience**: Developers who want a working example of Spring Boot 3.x microservices, OpenFeign, Spring Data JPA, JWT auth, and an Angular SPA wired through an API gateway.

**Repository Layout**
- `reservation/` — Maven multi-module backend (root pom)
  - `eureka-server/` — Service registry
  - `api-gateway/` — Spring Cloud Gateway (routes to services)
  - `hotel-service/` — Hotels & rooms API (JPA + REST)
  - `reservation-service/` — Reservations, simple UI, auth (JWT)
- `AirBNB-Frontend-clone-main/` and `frontend-app/` — Angular frontend(s). Use `AirBNB-Frontend-clone-main` for the main SPA in this workspace; `frontend-app` contains an alternate copy.

**Technologies**
- Java 17+ / Spring Boot 3.x / Spring Cloud 2023.x
- Spring Data JPA, H2 (dev) and MySQL (production/dev via XAMPP)
- OpenFeign for service-to-service calls
- Thymeleaf for small server-side pages (reservation-service UI)
- Angular 15.x for SPA frontend
- JWT (jjwt) used for simple authentication

**Prerequisites**
- Java 17 or later installed and on `PATH`.
- Maven (or use the included Maven Wrapper `mvnw` / `mvnw.cmd`).
- Node.js and npm for frontend.
- MySQL server (XAMPP or standalone) for persistent DBs. For quick testing H2 runtime is included.

**Databases**
- Two databases used by default (configurable in each service `application.yml`):
  - `hoteldb` — hotels data
  - `reservationdb` — reservations and users
- If using XAMPP/MySQL with default root/no-password, the services are pre-configured to attempt database creation with `createDatabaseIfNotExist=true`.

**Quick Start (Development)**
1. Build the backend modules (from `reservation/`):
```powershell
cd C:\Users\DELL\Desktop\reservationHotel\reservation
.\mvnw.cmd -DskipTests clean package
```

2. Start services (open separate terminals for each):
```powershell
# Start Eureka registry
.\mvnw.cmd -pl eureka-server spring-boot:run

# Start hotel service
.\mvnw.cmd -pl hotel-service spring-boot:run

# Start reservation service
.\mvnw.cmd -pl reservation-service spring-boot:run

# Start API gateway
.\mvnw.cmd -pl api-gateway spring-boot:run
```

3. Start the Angular frontend (it is configured to proxy `/api` to the gateway):
```powershell
cd C:\Users\DELL\Desktop\reservationHotel\AirBNB-Frontend-clone-main
npm install
npm start
# opens at http://localhost:4200
```

**Notes about the frontend-backend wiring**
- The Angular dev server proxies `/api/*` requests to `http://localhost:8080` (API Gateway). This keeps same-origin for the browser and avoids CORS in development.
- The gateway strips `/api` and forwards the calls to the appropriate service (e.g. `/api/hotels` → `/hotels` on `hotel-service`).
- The frontend `HttpService` reads a JWT stored in `sessionStorage` (key: `token`) and adds it as `Authorization: Bearer <token>` to requests.

**Auth (Sign-up / Sign-in)**
- Endpoints in `reservation-service` (simple JWT-based):
  - `POST /api/auth/register` — body `{ username, password, email }` returns `{ token, username }` on success.
  - `POST /api/auth/login` — body `{ username, password }` returns `{ token, username }` on success.
- After login/register the front-end should store the returned token in `sessionStorage.setItem('token', token)` so subsequent requests include the JWT.

**Important API endpoints**
- `GET /api/hotels` — list hotels
- `GET /api/rooms` — list rooms
- `POST /api/reservations` — create reservation (JWT optional in current demo; UI simulates payment and the reservation is recorded with PAID status)
- `GET /api/reservations/history` — UI history under reservation-service (server-side view)

**Adding Hotel Categories (Suggested)**
- The `hotel-service` `Hotel` entity is simple — you can add a `category` field (e.g. `String category`) and seed `data.sql` with categories such as `Apartment`, `Boutique`, `Resort`, `Budget`.
- After updating the entity, rebuild and restart the service so JPA updates the schema.

**Troubleshooting**
- YAML parser errors: check `application.yml` indentation precisely — YAML is whitespace-sensitive.
- Port conflicts: If a service fails with `Port 8080 was already in use`, either stop the process using that port or edit the service's `application.yml` port.
- Database connectivity: ensure MySQL is running and credentials in each `application.yml` match your environment.
- Missing `mvnw.cmd`: run wrapper commands from repository root (`reservation/`) where `mvnw.cmd` is located.

**Development tips**
- If you prefer not to run a full MySQL instance, the services include H2 in runtime scope and will work for quick testing.
- To view registered services and routing, open Eureka at `http://localhost:8761`.
- To debug gateway routing, use the gateway logs and check `http://localhost:8080/actuator/routes` (actuator enabled in dev config).

**Contributing / Next work**
- Wire frontend sign-in/sign-up UI to call `/api/auth/login` and `/api/auth/register` and persist the token in `sessionStorage`.
- Add hotel categories to `hotel-service` and enhance frontend filters to use them.
- Add role-based security and server-side JWT validation (current demo uses a simple JwtUtil and does not enforce roles on all endpoints).

**Contact / Support**
- For help or to request features, open an issue in this repo or contact the maintainer.

---
Generated README — quick start and developer guide for the HotelReservation demo.
