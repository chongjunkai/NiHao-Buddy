#!/bin/bash

# -------------------------------
# NiHao-Buddy Startup Script with Grade Selection
# -------------------------------

# Navigate to project root
cd "$(dirname "$0")"

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Kill any process on port 5000
PID=$(lsof -ti :5000)
if [ -n "$PID" ]; then
  echo "Killing process on port 5000 (PID: $PID)..."
  kill -9 $PID
fi

# Start Flask backend in the background
echo "Starting Flask backend..."
nohup python backend/app.py > flask.log 2>&1 &

# Give Flask a moment to start
sleep 2

# Ask user for grade
read -p "Enter the grade you want to study (e.g., 1, 2, 3...): " GRADE

# Open frontend with grade query parameter
echo "Opening frontend for grade $GRADE..."
open "frontend/index.html?grade=$GRADE"

echo "✅ NiHao-Buddy started successfully for grade $GRADE!"
echo "Flask backend logs are in flask.log"
