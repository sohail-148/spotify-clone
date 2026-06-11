#!/bin/bash

# Vercel Deployment Script
# This script handles the deployment of your Spotify clone to Vercel

echo "🎵 Spotify Clone - Vercel Deployment"
echo "=================================="

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Login to Vercel (if not already logged in)
echo "🔐 Checking Vercel authentication..."
vercel whoami &> /dev/null
if [ $? -ne 0 ]; then
    echo "📋 Please authenticate with Vercel:"
    vercel login
fi

# Deploy to production
echo "🚀 Deploying to Vercel..."
vercel --prod --yes

echo "✅ Deployment complete!"
echo "🎉 Your Spotify clone is now live!"

# Show deployment URL
echo "📊 Deployment status:"
vercel ls