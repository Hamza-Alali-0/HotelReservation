# Environment Configuration

## Backend Services

### Eureka Server

- Port: 8761
- URL: http://localhost:8761
- Purpose: Service Discovery and Registration
- No database required

### API Gateway

- Port: 8080
- URL: http://localhost:8080
- Purpose: Single entry point, routing, CORS
- Frontend URL: http://localhost:5173
- Routes:
  - `/api/hotels/**` → hotel-service
  - `/api/rooms/**` → hotel-service
  - `/api/reservations/**` → reservation-service

### Hotel Service

- Port: 8090
- Database: hoteldb
- Tables: hotels, rooms
- Endpoints: /api/hotels, /api/rooms
- Sample Data: 6 hotels, 12 rooms

### Reservation Service

- Port: 8081
- Database: reservationdb
- Tables: reservations
- Endpoints: /api/reservations
- Feign Client: Communicates with hotel-service

---

## Frontend

- Port: 5173 (Vite dev server)
- Framework: React 18 + TypeScript + Vite
- API Base: http://localhost:8080
- Mock Data: Available as fallback

---

## MySQL Configuration

### Databases Required

```sql
CREATE DATABASE hoteldb;
CREATE DATABASE reservationdb;
```

### Credentials (Default)

- Host: localhost
- Port: 3306
- Username: root
- Password: (empty string)

### To Change Credentials

Edit `application.yml` in both services:

**hotel-service/src/main/resources/application.yml:**

```yaml
spring:
  datasource:
    username: your_username
    password: your_password
```

**reservation-service/src/main/resources/application.yml:**

```yaml
spring:
  datasource:
    username: your_username
    password: your_password
```

---

## Environment Variables (Optional)

You can override configuration using environment variables:

### Backend (Spring Boot)

```powershell
$env:SERVER_PORT=8090
$env:SPRING_DATASOURCE_URL="jdbc:mysql://localhost:3306/hoteldb"
$env:SPRING_DATASOURCE_USERNAME="root"
$env:SPRING_DATASOURCE_PASSWORD=""
```

### Frontend (Vite)

Create `frontend/.env.local`:

```env
VITE_API_BASE_URL=http://localhost:8080
```

Then update `api.ts`:

```typescript
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
```

---

## Production Configuration

### Backend

1. **Update application.yml to production profile:**

```yaml
spring:
  profiles:
    active: prod
---
spring:
  config:
    activate:
      on-profile: prod
  datasource:
    url: ${DATABASE_URL}
    username: ${DATABASE_USERNAME}
    password: ${DATABASE_PASSWORD}
```

2. **Build JARs:**

```powershell
cd reservation
mvn clean package -DskipTests
```

3. **Run with profile:**

```powershell
java -jar -Dspring.profiles.active=prod target/service-name.jar
```

### Frontend

1. **Update API base URL in `api.ts`:**

```typescript
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://your-production-gateway.com";
```

2. **Build for production:**

```powershell
cd frontend
npm run build
```

3. **Deploy `dist/` folder to web server (Nginx, Apache, or CDN)**

---

## Network Configuration

### Firewall Rules (if needed)

```powershell
# Allow incoming on ports
New-NetFirewallRule -DisplayName "Eureka" -Direction Inbound -LocalPort 8761 -Protocol TCP -Action Allow
New-NetFirewallRule -DisplayName "Gateway" -Direction Inbound -LocalPort 8080 -Protocol TCP -Action Allow
New-NetFirewallRule -DisplayName "Hotel Service" -Direction Inbound -LocalPort 8090 -Protocol TCP -Action Allow
New-NetFirewallRule -DisplayName "Reservation Service" -Direction Inbound -LocalPort 8081 -Protocol TCP -Action Allow
New-NetFirewallRule -DisplayName "Frontend" -Direction Inbound -LocalPort 5173 -Protocol TCP -Action Allow
```

### Hosts File (optional, for custom domains)

Edit `C:\Windows\System32\drivers\etc\hosts`:

```
127.0.0.1 eureka.local
127.0.0.1 gateway.local
127.0.0.1 hotel.local
```

---

## Docker Configuration (Future)

Sample `docker-compose.yml` structure:

```yaml
version: "3.8"
services:
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: hoteldb
    ports:
      - "3306:3306"

  eureka:
    build: ./eureka-server
    ports:
      - "8761:8761"

  hotel-service:
    build: ./hotel-service
    depends_on:
      - mysql
      - eureka
    ports:
      - "8090:8090"

  reservation-service:
    build: ./reservation-service
    depends_on:
      - mysql
      - eureka
      - hotel-service
    ports:
      - "8081:8081"

  gateway:
    build: ./api-gateway
    depends_on:
      - eureka
    ports:
      - "8080:8080"

  frontend:
    build: ./frontend
    ports:
      - "80:80"
```

---

## Monitoring & Health Checks

### Actuator Endpoints (if enabled)

Add to `pom.xml`:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

Access health endpoints:

- http://localhost:8080/actuator/health
- http://localhost:8090/actuator/health
- http://localhost:8081/actuator/health

---

## Security Notes

⚠️ **Current Configuration is for DEVELOPMENT ONLY**

For production:

1. Enable Spring Security
2. Add JWT authentication
3. Use HTTPS/TLS
4. Secure MySQL with strong passwords
5. Implement rate limiting
6. Add input validation
7. Use environment variables for secrets

---

## Backup & Data

### Backup MySQL Databases

```powershell
# Backup
mysqldump -u root -p hoteldb > hoteldb_backup.sql
mysqldump -u root -p reservationdb > reservationdb_backup.sql

# Restore
mysql -u root -p hoteldb < hoteldb_backup.sql
mysql -u root -p reservationdb < reservationdb_backup.sql
```

---

**Last Updated:** December 6, 2025
