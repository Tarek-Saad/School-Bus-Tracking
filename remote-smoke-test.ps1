# PowerShell Remote API Smoke Test
$ErrorActionPreference = 'Stop'

$base = 'https://web-project-sigma-two.vercel.app/api'
$guid = [Guid]::NewGuid().ToString().Substring(0,8)
$email = "test_$guid@example.com"

Write-Host "Using email: $email" -ForegroundColor Cyan

# Register
$registerBody = @{ email=$email; password='test1234'; name='Test User'; role='parent' } | ConvertTo-Json
$reg = Invoke-RestMethod -Uri ($base + '/users/register') -Method Post -ContentType 'application/json' -Body $registerBody -UseBasicParsing
Write-Host ("Register success: " + $reg.success) -ForegroundColor Green

# Login
$loginBody = @{ email=$email; password='test1234' } | ConvertTo-Json
$login = Invoke-RestMethod -Uri ($base + '/users/login') -Method Post -ContentType 'application/json' -Body $loginBody -UseBasicParsing
Write-Host ("Login success: " + $login.success) -ForegroundColor Green

$token = $login.data.token
if (-not $token) { throw 'No token returned from login' }
$headers = @{ Authorization = "Bearer $token" }

# Profile
$profile = Invoke-RestMethod -Uri ($base + '/profile') -Headers $headers -Method Get -UseBasicParsing
Write-Host ("Profile email: " + $profile.data.email) -ForegroundColor Green

Write-Host "Smoke test completed successfully." -ForegroundColor Green
