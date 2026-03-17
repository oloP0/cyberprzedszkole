# Uruchom prosty serwer HTTP i otwórz przeglądarkę
# Użyj tej komendy w PowerShell: .\start.ps1

$port = 8000
$uri = "http://localhost:$port"

Write-Host "Uruchamiam serwer w katalogu: $(Get-Location)"
Write-Host "Otwieram przeglądarkę pod adresem $uri"

Start-Process $uri

# Uruchom serwer w nowym oknie PowerShell (nie blokuje)</nStart-Process -FilePath "powershell" -ArgumentList "-NoExit","-Command","python -m http.server $port"
