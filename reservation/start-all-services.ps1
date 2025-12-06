# Hotel Reservation - Start All Services
# Run this script from the reservation folder

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Hotel Reservation Microservices Startup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if running from correct directory
if (-Not (Test-Path "eureka-server")) {
    Write-Host "ERROR: Please run this script from the 'reservation' folder!" -ForegroundColor Red
    Write-Host "Current directory: $PWD" -ForegroundColor Yellow
    exit 1
}

# Check Java
Write-Host "Checking Java installation..." -ForegroundColor Yellow
try {
    $javaVersion = java -version 2>&1 | Select-String "version"
    Write-Host "✓ Java found: $javaVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Java not found! Please install Java 17+" -ForegroundColor Red
    exit 1
}

# Check Maven
Write-Host "Checking Maven installation..." -ForegroundColor Yellow
try {
    $mavenVersion = mvn -version 2>&1 | Select-String "Apache Maven"
    Write-Host "✓ Maven found: $mavenVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Maven not found! Please install Maven" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Building and Starting Services..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Function to start a service in a new window
function Start-Service {
    param(
        [string]$ServiceName,
        [string]$ServicePath,
        [int]$Port,
        [int]$DelaySeconds = 0
    )
    
    Write-Host "[$ServiceName] Building..." -ForegroundColor Yellow
    Set-Location $ServicePath
    
    # Clean and install
    mvn clean install -DskipTests -q
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "✗ [$ServiceName] Build failed!" -ForegroundColor Red
        Set-Location ..
        return $false
    }
    
    Write-Host "✓ [$ServiceName] Build successful" -ForegroundColor Green
    Write-Host "[$ServiceName] Starting on port $Port..." -ForegroundColor Yellow
    
    # Start in new PowerShell window
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$ServicePath'; Write-Host '[$ServiceName] Running on port $Port' -ForegroundColor Cyan; mvn spring-boot:run"
    
    Set-Location ..
    
    if ($DelaySeconds -gt 0) {
        Write-Host "Waiting $DelaySeconds seconds for $ServiceName to initialize..." -ForegroundColor Gray
        Start-Sleep -Seconds $DelaySeconds
    }
    
    return $true
}

# 1. Start Eureka Server
Write-Host ""
Write-Host "=== Step 1/5: Eureka Server ===" -ForegroundColor Cyan
if (-Not (Start-Service -ServiceName "Eureka Server" -ServicePath "eureka-server" -Port 8761 -DelaySeconds 30)) {
    Write-Host "Failed to start Eureka Server. Exiting..." -ForegroundColor Red
    exit 1
}

# 2. Start Hotel Service
Write-Host ""
Write-Host "=== Step 2/5: Hotel Service ===" -ForegroundColor Cyan
if (-Not (Start-Service -ServiceName "Hotel Service" -ServicePath "hotel-service" -Port 8090 -DelaySeconds 20)) {
    Write-Host "Failed to start Hotel Service. Exiting..." -ForegroundColor Red
    exit 1
}

# 3. Start Reservation Service
Write-Host ""
Write-Host "=== Step 3/5: Reservation Service ===" -ForegroundColor Cyan
if (-Not (Start-Service -ServiceName "Reservation Service" -ServicePath "reservation-service" -Port 8081 -DelaySeconds 20)) {
    Write-Host "Failed to start Reservation Service. Exiting..." -ForegroundColor Red
    exit 1
}

# 4. Start Auth Service
Write-Host ""
Write-Host "=== Step 4/5: Auth Service ===" -ForegroundColor Cyan
if (-Not (Start-Service -ServiceName "Auth Service" -ServicePath "auth-service" -Port 8084 -DelaySeconds 20)) {
    Write-Host "Failed to start Auth Service. Exiting..." -ForegroundColor Red
    exit 1
}

# 5. Start API Gateway
Write-Host ""
Write-Host "=== Step 5/5: API Gateway ===" -ForegroundColor Cyan
if (-Not (Start-Service -ServiceName "API Gateway" -ServicePath "api-gateway" -Port 8080 -DelaySeconds 15)) {
    Write-Host "Failed to start API Gateway. Exiting..." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "All Services Started Successfully!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Service Dashboard:" -ForegroundColor Cyan
Write-Host "  • Eureka Server:        http://localhost:8761" -ForegroundColor White
Write-Host "  • API Gateway:          http://localhost:8080" -ForegroundColor White
Write-Host "  • Hotel Service:        http://localhost:8090" -ForegroundColor White
Write-Host "  • Reservation Service:  http://localhost:8081" -ForegroundColor White
Write-Host "  • Auth Service:         http://localhost:8084" -ForegroundColor White
Write-Host ""
Write-Host "Test Endpoints:" -ForegroundColor Cyan
Write-Host "  • GET http://localhost:8080/api/hotels" -ForegroundColor Gray
Write-Host "  • GET http://localhost:8080/api/rooms" -ForegroundColor Gray
Write-Host "  • POST http://localhost:8080/api/auth/login" -ForegroundColor Gray
Write-Host "  • POST http://localhost:8080/api/auth/admin/login" -ForegroundColor Gray
Write-Host ""
Write-Host "Admin Credentials:" -ForegroundColor Yellow
Write-Host "  Email: admin@hotel.com" -ForegroundColor White
Write-Host "  Password: admin123" -ForegroundColor White
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "  1. Verify all services in Eureka: http://localhost:8761" -ForegroundColor White
Write-Host "  2. Test API endpoints using curl or browser" -ForegroundColor White
Write-Host "  3. Start frontend: cd frontend; npm run dev" -ForegroundColor White
Write-Host "  4. Access admin portal: http://localhost:5173/admin/login" -ForegroundColor White
Write-Host ""
Write-Host "Press any key to exit this window..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
