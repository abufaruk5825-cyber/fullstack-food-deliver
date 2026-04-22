@echo off
echo Starting KochaEats Backend Server...
echo.
cd backend
echo Installing dependencies (if needed)...
call npm install
echo.
echo Starting server on http://localhost:3000
echo Press Ctrl+C to stop the server
echo.
call npm start
pause