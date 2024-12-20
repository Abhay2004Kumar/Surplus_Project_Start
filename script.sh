#!/bin/bash

# Exit script on any error
set -e

# Define the backend and frontend directories
BACKEND_DIR="./backend"
FRONTEND_DIR="./frontend"

# Function to start the backend
start_backend() {
  echo "Starting backend on port 5000..."
  cd "$BACKEND_DIR"
  PORT=5000 npm run dev &
  BACKEND_PID=$!
  cd - > /dev/null
}

# Function to start the frontend
start_frontend() {
  echo "Starting frontend on port 3000..."
  cd "$FRONTEND_DIR"
  PORT=3000 npm start &
  FRONTEND_PID=$!
  cd - > /dev/null
}

# Function to stop both processes
stop_processes() {
  echo "Stopping backend and frontend..."
  kill $BACKEND_PID $FRONTEND_PID
  exit
}

# Trap SIGINT and SIGTERM to clean up
trap stop_processes SIGINT SIGTERM

# Start backend and frontend
start_backend
start_frontend

# Wait for both processes to finish
wait
