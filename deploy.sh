#!/bin/bash

# Script for automatic deployment via GitHub webhook

set -e

echo "Starting deployment..."

# Navigate to project directory
cd /path/to/fok-front

# Pull latest changes
git pull origin main

# Build and restart Docker container
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# Clean up old images
docker image prune -f

echo "Deployment completed successfully!"

