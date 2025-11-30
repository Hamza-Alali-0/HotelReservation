# Reservation Microservices (minimal)

Services:

- eureka-server (8761)
- api-gateway (8080)
- hotel-service (8090)
- reservation-service (8081)

Prerequisites:

- Java 17
- Maven

How to run (order matters):

1. Start Eureka:

```powershell
mvn -pl eureka-server spring-boot:run
```

2. Start hotel-service:

```powershell
mvn -pl hotel-service spring-boot:run
```

3. Start reservation-service:

```powershell
mvn -pl reservation-service spring-boot:run
```

4. Start API Gateway:

```powershell
mvn -pl api-gateway spring-boot:run
```

API examples:

- hotel-service (auto via Spring Data REST):
  GET http://localhost:8090/hotels
  GET http://localhost:8090/rooms

- reservation-service:
  POST http://localhost:8081/reservations
  body JSON:
  {
  "roomId": 1,
  "hotelId": 1,
  "customerName": "Alice",
  "date": "2025-11-20"
  }

  GET http://localhost:8081/reservations/history

- Through gateway (discovery routing enabled):
  GET http://localhost:8080/hotels
  POST http://localhost:8080/reservations

Notes:

- H2 in-memory DB is used for both services. JPA auto-creates tables.
- reservation-service validates room availability via Feign client against hotel-service.
- Payment status is faked (PAID or PENDING).
