# PowerShell script to sync static files to public/static for Vercel
# Run this script before committing if you change files in static/

Write-Host "Syncing static files to public/static..." -ForegroundColor Green

# Create public/static directory if it doesn't exist
if (-not (Test-Path "public\static")) {
    New-Item -ItemType Directory -Path "public\static" -Force | Out-Null
}

# Copy all files from static/ to public/static/
Copy-Item "static\*" -Destination "public\static\" -Recurse -Force

Write-Host "Done! All static files synced to public/static" -ForegroundColor Green
