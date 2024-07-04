#!/bin/bash

# Create a bridge network
docker network create we4devs-network

# Start the backend container
docker run -d \
  --name backend \
  --env-file ./Server/.env \
  --network we4devs-network \
  -p 6273:6273 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  smitbutle/we4devs-server

# Build and start the frontend container
docker build -t we4devs-frontend \
  --build-arg VITE_HOST=http://localhost:6273 \
  ./Frontend 
docker run -d \
  --name frontend \
  -e VITE_HOST=http://localhost:6273 \
  -p 6173:5200 \
  --network we4devs-network \
  we4devs-frontend

