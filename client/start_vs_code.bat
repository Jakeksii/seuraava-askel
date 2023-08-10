@echo off
start "" code "%cd%\vite-react-frontend"
start "" code "%cd%\backend"
cd /d "%cd%\backend"
call npm start
