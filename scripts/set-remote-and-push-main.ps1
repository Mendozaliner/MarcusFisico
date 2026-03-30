# Pushes your local "main" branch to GitHub so Netlify can find it.
# Run in PowerShell:  powershell -ExecutionPolicy Bypass -File scripts/set-remote-and-push-main.ps1

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location $root

$user = Read-Host "Type your GitHub username (from github.com/YOURNAME/MarcusFisico)"
$user = $user.Trim()
if (-not $user) {
  Write-Host "No username entered. Exiting."
  exit 1
}

$url = "https://github.com/$user/MarcusFisico.git"
Write-Host "Using: $url"

git remote remove origin 2>$null
git remote add origin $url
git branch -M main

Write-Host "Pushing branch 'main'..."
git push -u origin main

if ($LASTEXITCODE -eq 0) {
  Write-Host ""
  Write-Host "Done. In Netlify, set Production branch to: main"
  Write-Host "Then: Deploys -> Trigger deploy -> Clear cache and deploy site"
} else {
  Write-Host ""
  Write-Host "Push failed. Common fixes:"
  Write-Host "  1. Log in to GitHub (browser or Git Credential Manager when prompted)"
  Write-Host "  2. Confirm the repo exists and is named exactly: MarcusFisico"
}
