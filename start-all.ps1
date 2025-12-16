# Hotel Reservation System - Start All Services
# PowerShell Script for Windows

Write-Host "===============================================" -ForegroundColor Cyan
Write-Host "  Hotel Reservation System - Startup Script" -ForegroundColor Cyan
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host ""

# Check if we're in the correct directory
if (-not (Test-Path "reservation")) {
    Write-Host "ERROR: Please run this script from the project root directory" -ForegroundColor Red
    Write-Host "Current directory: $(Get-Location)" -ForegroundColor Yellow
    exit 1
}

# Function to start a Spring Boot service
function Start-SpringBootService {
    param(
        [string]$ServiceName,
        [string]$ServicePath,
        [int]$Port,
        [int]$DelaySeconds = 20
    )
    
    Write-Host "Starting $ServiceName on port $Port..." -ForegroundColor Green
    
    # Start the service in a new PowerShell window
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$ServicePath'; Write-Host 'Starting $ServiceName...' -ForegroundColor Cyan; mvn spring-boot:run"
    
    Write-Host "  -> $ServiceName window opened" -ForegroundColor Gray
    Write-Host "  -> Waiting $DelaySeconds seconds for $ServiceName to start..." -ForegroundColor Gray
    Start-Sleep -Seconds $DelaySeconds
}

# Function to start the frontend
function Start-Frontend {
    Write-Host "Starting React Frontend on port 5173..." -ForegroundColor Green
    
    $frontendPath = "$(Get-Location)\reservation\frontend"
    
    # Check if node_modules exists
    if (-not (Test-Path "$frontendPath\node_modules")) {
        Write-Host "  -> Installing npm dependencies..." -ForegroundColor Yellow
        Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$frontendPath'; Write-Host 'Installing dependencies...' -ForegroundColor Cyan; npm install; Write-Host 'Starting frontend...' -ForegroundColor Cyan; npm run dev"
    } else {
        Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$frontendPath'; Write-Host 'Starting React Frontend...' -ForegroundColor Cyan; npm run dev"
    }
    
    Write-Host "  -> Frontend window opened" -ForegroundColor Gray
}

# Main execution
Write-Host "Step 1: Starting Eureka Server (Service Discovery)" -ForegroundColor Yellow
Write-Host "------------------------------------------------" -ForegroundColor Yellow
Start-SpringBootService -ServiceName "Eureka Server" -ServicePath "$(Get-Location)\reservation\eureka-server" -Port 8761 -DelaySeconds 30

Write-Host ""
Write-Host "Step 2: Starting API Gateway" -ForegroundColor Yellow
Write-Host "------------------------------------------------" -ForegroundColor Yellow
Start-SpringBootService -ServiceName "API Gateway" -ServicePath "$(Get-Location)\reservation\api-gateway" -Port 8080 -DelaySeconds 25

Write-Host ""
Write-Host "Step 3: Starting Hotel Service" -ForegroundColor Yellow
Write-Host "------------------------------------------------" -ForegroundColor Yellow
Start-SpringBootService -ServiceName "Hotel Service" -ServicePath "$(Get-Location)\reservation\hotel-service" -Port 8090 -DelaySeconds 25

Write-Host ""
Write-Host "Step 4: Starting Reservation Service" -ForegroundColor Yellow
Write-Host "------------------------------------------------" -ForegroundColor Yellow
Start-SpringBootService -ServiceName "Reservation Service" -ServicePath "$(Get-Location)\reservation\reservation-service" -Port 8081 -DelaySeconds 25

Write-Host ""
Write-Host "Step 5: Starting React Frontend" -ForegroundColor Yellow
Write-Host "------------------------------------------------" -ForegroundColor Yellow
Start-Frontend

Write-Host ""
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host "  All services are starting!" -ForegroundColor Green
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Service URLs:" -ForegroundColor White
Write-Host "  Eureka Dashboard:  http://localhost:8761" -ForegroundColor Gray
Write-Host "  API Gateway:       http://localhost:8080" -ForegroundColor Gray
Write-Host "  Hotel Service:     http://localhost:8090" -ForegroundColor Gray
Write-Host "  Reservation Svc:   http://localhost:8081" -ForegroundColor Gray
Write-Host "  Frontend App:      http://localhost:5173" -ForegroundColor Cyan
Write-Host ""
Write-Host "Wait 2-3 minutes for all services to fully start" -ForegroundColor Yellow
Write-Host "Then open: http://localhost:5173" -ForegroundColor Green
Write-Host ""
Write-Host "Check Eureka at http://localhost:8761 to see registered services" -ForegroundColor Yellow
Write-Host ""
Write-Host "To stop services: Close each PowerShell window or press Ctrl+C" -ForegroundColor Gray
Write-Host ""

# Wait and then try to open the frontend
Write-Host "Waiting 90 seconds, then opening frontend in browser..." -ForegroundColor Yellow
Start-Sleep -Seconds 90

try {
    Start-Process "http://localhost:5173"
    Write-Host "Frontend opened in browser!" -ForegroundColor Green
} catch {
    Write-Host "Could not open browser automatically. Please open http://localhost:5173 manually" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Press any key to exit this window..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
