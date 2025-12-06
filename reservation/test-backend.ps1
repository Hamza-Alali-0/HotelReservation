# Test Backend API Endpoints
# Run this after all services are started

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Testing Backend API Endpoints" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$apiBase = "http://localhost:8080"
$testsPassed = 0
$testsFailed = 0

function Test-Endpoint {
    param(
        [string]$Name,
        [string]$Url,
        [string]$Method = "GET"
    )
    
    Write-Host "Testing: $Name" -ForegroundColor Yellow
    Write-Host "  URL: $Url" -ForegroundColor Gray
    
    try {
        if ($Method -eq "GET") {
            $response = Invoke-RestMethod -Uri $Url -Method Get -TimeoutSec 5
            Write-Host "  ✓ SUCCESS" -ForegroundColor Green
            
            if ($response -is [Array]) {
                Write-Host "    Response: Array with $($response.Count) items" -ForegroundColor Gray
            } else {
                Write-Host "    Response: $($response | ConvertTo-Json -Depth 1 -Compress)" -ForegroundColor Gray
            }
            
            $script:testsPassed++
            return $true
        }
    } catch {
        Write-Host "  ✗ FAILED" -ForegroundColor Red
        Write-Host "    Error: $($_.Exception.Message)" -ForegroundColor Red
        $script:testsFailed++
        return $false
    }
    
    Write-Host ""
}

# Test 1: Get all hotels
Write-Host ""
Test-Endpoint -Name "Get All Hotels" -Url "$apiBase/api/hotels"

# Test 2: Get hotel by ID
Write-Host ""
Test-Endpoint -Name "Get Hotel by ID (id=1)" -Url "$apiBase/api/hotels/1"

# Test 3: Get all rooms
Write-Host ""
Test-Endpoint -Name "Get All Rooms" -Url "$apiBase/api/rooms"

# Test 4: Get room by ID
Write-Host ""
Test-Endpoint -Name "Get Room by ID (id=1)" -Url "$apiBase/api/rooms/1"

# Test 5: Get rooms by hotel
Write-Host ""
Test-Endpoint -Name "Get Rooms for Hotel (hotelId=1)" -Url "$apiBase/api/hotels/1/rooms"

# Test 6: Get reservation history
Write-Host ""
Test-Endpoint -Name "Get Reservation History" -Url "$apiBase/api/reservations/history"

# Test 7: Signup
Write-Host ""
Write-Host "Testing: Signup New User" -ForegroundColor Yellow
Write-Host "  URL: $apiBase/api/auth/signup" -ForegroundColor Gray

try {
    $signupData = @{
        email = "test@example.com"
        password = "password123"
        name = "Test User"
        phone = "+1234567890"
    } | ConvertTo-Json

    $response = Invoke-RestMethod -Uri "$apiBase/api/auth/signup" -Method Post -Body $signupData -ContentType "application/json" -TimeoutSec 5
    Write-Host "  ✓ SUCCESS" -ForegroundColor Green
    Write-Host "    User ID: $($response.id)" -ForegroundColor Gray
    Write-Host "    Email: $($response.email)" -ForegroundColor Gray
    Write-Host "    Token: $($response.token.Substring(0, 20))..." -ForegroundColor Gray
    $testsPassed++
    $global:testToken = $response.token
    $global:testEmail = $response.email
} catch {
    if ($_.Exception.Message -like "*409*" -or $_.Exception.Message -like "*Conflict*") {
        Write-Host "  ℹ SKIPPED (Email already exists)" -ForegroundColor Yellow
    } else {
        Write-Host "  ✗ FAILED" -ForegroundColor Red
        Write-Host "    Error: $($_.Exception.Message)" -ForegroundColor Red
        $testsFailed++
    }
}

# Test 8: Login
Write-Host ""
Write-Host "Testing: Login User" -ForegroundColor Yellow
Write-Host "  URL: $apiBase/api/auth/login" -ForegroundColor Gray

try {
    $loginData = @{
        email = "test@example.com"
        password = "password123"
    } | ConvertTo-Json

    $response = Invoke-RestMethod -Uri "$apiBase/api/auth/login" -Method Post -Body $loginData -ContentType "application/json" -TimeoutSec 5
    Write-Host "  ✓ SUCCESS" -ForegroundColor Green
    Write-Host "    User ID: $($response.id)" -ForegroundColor Gray
    Write-Host "    Name: $($response.name)" -ForegroundColor Gray
    Write-Host "    Token received: Yes" -ForegroundColor Gray
    $testsPassed++
} catch {
    Write-Host "  ✗ FAILED" -ForegroundColor Red
    Write-Host "    Error: $($_.Exception.Message)" -ForegroundColor Red
    $testsFailed++
}

# Test 9: Create a reservation
Write-Host ""
Write-Host "Testing: Create New Reservation" -ForegroundColor Yellow
Write-Host "  URL: $apiBase/api/reservations" -ForegroundColor Gray

try {
    $reservationData = @{
        customerName = "Test User"
        hotelId = 1
        roomId = 1
        checkin = "2025-12-20"
        checkout = "2025-12-25"
    } | ConvertTo-Json

    $response = Invoke-RestMethod -Uri "$apiBase/api/reservations" -Method Post -Body $reservationData -ContentType "application/json" -TimeoutSec 5
    Write-Host "  ✓ SUCCESS" -ForegroundColor Green
    Write-Host "    Created reservation ID: $($response.id)" -ForegroundColor Gray
    Write-Host "    Payment Status: $($response.paymentStatus)" -ForegroundColor Gray
    $testsPassed++
} catch {
    Write-Host "  ✗ FAILED" -ForegroundColor Red
    Write-Host "    Error: $($_.Exception.Message)" -ForegroundColor Red
    $testsFailed++
}

# Summary
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Test Summary" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Total Tests: $($testsPassed + $testsFailed)" -ForegroundColor White
Write-Host "Passed: $testsPassed" -ForegroundColor Green
Write-Host "Failed: $testsFailed" -ForegroundColor $(if ($testsFailed -eq 0) { "Green" } else { "Red" })
Write-Host ""

if ($testsFailed -eq 0) {
    Write-Host "✓ All tests passed! Backend is working correctly." -ForegroundColor Green
    Write-Host ""
    Write-Host "You can now start the frontend:" -ForegroundColor Cyan
    Write-Host "  cd frontend" -ForegroundColor White
    Write-Host "  npm install" -ForegroundColor White
    Write-Host "  npm run dev" -ForegroundColor White
} else {
    Write-Host "✗ Some tests failed. Please check the service logs." -ForegroundColor Red
    Write-Host ""
    Write-Host "Troubleshooting:" -ForegroundColor Yellow
    Write-Host "  1. Verify all services are running (check Eureka: http://localhost:8761)" -ForegroundColor White
    Write-Host "  2. Check MySQL is running and databases exist (hoteldb, reservationdb)" -ForegroundColor White
    Write-Host "  3. Review service console logs for errors" -ForegroundColor White
}

Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
