# deploy_backup.ps1
param(
    [string]$ServerDir = "C:\path\to\server",
    [string]$ProxyDll = "citizen-server-impl.dll"
)
$orig = Join-Path $ServerDir $ProxyDll
$backup = Join-Path $ServerDir ($ProxyDll + ".bak")
$real = Join-Path $ServerDir ($ProxyDll + ".real.dll")

Write-Host "Backing up original..."
if (Test-Path $orig) {
    Copy-Item $orig $backup -Force
    Rename-Item $orig $real -ErrorAction SilentlyContinue
}
Write-Host "Copying proxy DLL..."
Copy-Item (Join-Path (Get-Location) $ProxyDll) $orig -Force
Write-Host "Deployed. Restart your server process."
