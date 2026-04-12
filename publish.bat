@echo off
title Publish NPM Package
setlocal

echo.
echo ==========================================
echo   NPM Publish Tool
echo ==========================================
echo.

for /f "tokens=*" %%a in ('node -p "require('./package.json').version"') do set CURRENT_VERSION=%%a
echo Current version: v%CURRENT_VERSION%
echo.

echo Select option:
echo   1. patch  - Bump x.x.X version and publish
echo   2. minor  - Bump x.X.0 version and publish
echo   3. major  - Bump X.0.0 version and publish
echo   4. publish - Publish current version without bump
echo.

set /p choice="Enter choice (1/2/3/4): "

if "%choice%"=="1" set VERSION_TYPE=patch
if "%choice%"=="2" set VERSION_TYPE=minor
if "%choice%"=="3" set VERSION_TYPE=major
if "%choice%"=="4" set VERSION_TYPE=publish

if not defined VERSION_TYPE (
    echo Invalid choice. Exiting.
    exit /b 1
)

echo.
echo Selected: %VERSION_TYPE%
echo.

if "%VERSION_TYPE%"=="publish" (
    echo [1/4] Skipping version bump...
) else (
    echo [1/4] Bumping version...
    call npm version %VERSION_TYPE%
    if errorlevel 1 goto :error
)

echo.
echo [2/4] Checking npm account...
call npm whoami
if errorlevel 1 goto :error

echo.
echo [3/4] Dry run packaging...
call npm pack --dry-run
if errorlevel 1 goto :error

echo.
echo [4/4] Publishing to npm...
call npm publish --access public
if errorlevel 1 goto :error

echo.
echo ==========================================
echo   Publish completed successfully!
echo ==========================================
goto :end

:error
echo.
echo ERROR: Publish failed!
pause
exit /b 1

:end
pause
endlocal
