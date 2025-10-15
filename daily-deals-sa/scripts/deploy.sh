#!/bin/bash

echo "🚀 Deploying Daily Deals SA to Vercel..."

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Build the project
echo "📦 Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

# Deploy to Vercel
echo "🌐 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete!"
echo "📝 Don't forget to:"
echo "   1. Set up your database (PostgreSQL)"
echo "   2. Configure environment variables in Vercel dashboard"
echo "   3. Run database migrations: npx prisma migrate deploy"
echo "   4. Create admin user: npm run create-admin"
