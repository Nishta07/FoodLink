#!/usr/bin/env bash
set -e
echo "---------------------------------"
echo "Starting Python ML service..."
echo "---------------------------------"

# run inside ml-service so python can import ml_service.py
cd ml-service

# Use pip-installed uvicorn (requirements_ml.txt should include uvicorn)
uvicorn ml_service:app --host 0.0.0.0 --port 8000 &

cd ..

# short wait for ML to start; uvicorn already backgrounded
sleep 3

echo "---------------------------------"
echo "Building React frontend..."
echo "---------------------------------"

# Use npm ci for reproducible installs
npm ci

# build using project vite config
npm run build

echo "---------------------------------"
echo "Starting Node backend..."
echo "---------------------------------"

cd backend

# install production deps
npm ci --only=production

# ensure server listens on process.env.PORT or fallback to 5000
node server.js
