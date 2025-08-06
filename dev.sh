#!/bin/bash

echo "🚀 Starting Astro development server..."
echo "📝 Blog: Silent Commit - Astro Version"
echo "🌐 URL: http://localhost:4321"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Start the development server
npm run dev