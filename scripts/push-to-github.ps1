# Run once after: gh auth login
# Creates public repo MarcusFisico on your GitHub account and pushes this project.

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location $root

$gh = Get-Command gh -ErrorAction SilentlyContinue
if (-not $gh) {
  Write-Host "Install GitHub CLI: winget install GitHub.cli"
  exit 1
}

gh auth status 2>$null
if ($LASTEXITCODE -ne 0) {
  Write-Host "Log in first (browser will open):"
  gh auth login
}

if (git remote get-url origin 2>$null) {
  Write-Host "Remote 'origin' already set. Pushing..."
  git push -u origin main
  exit $LASTEXITCODE
}

Write-Host "Creating repo MarcusFisico and pushing..."
gh repo create MarcusFisico --public --source=. --remote=origin --push
