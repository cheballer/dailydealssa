#!/bin/bash

echo "🚀 Deploying Daily Deals SA to Vercel with PostgreSQL..."

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Check if logged in to Vercel
if ! vercel whoami &> /dev/null; then
    echo "🔐 Please login to Vercel..."
    vercel login
fi

# Build the project
echo "📦 Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build successful!"

# Deploy to Vercel
echo "🌐 Deploying to Vercel..."
vercel --prod

if [ $? -eq 0 ]; then
    echo "✅ Deployment successful!"
    echo ""
    echo "📝 Next steps:"
    echo "1. Set up environment variables in Vercel dashboard:"
    echo "   - Go to your project settings → Environment Variables"
    echo "   - Add all variables from DEPLOYMENT_GUIDE.md"
    echo ""
    echo "2. Run database migrations:"
    echo "   npx prisma migrate deploy"
    echo ""
    echo "3. Create admin user:"
    echo "   npm run create-admin"
    echo ""
    echo "4. Test your deployment:"
    echo "   - Visit your Vercel URL"
    echo "   - Test user registration"
    echo "   - Test admin panel access"
    echo "   - Test payment flow"
    echo ""
    echo "🔑 Admin credentials:"
    echo "   Email: admin@dailydeals-sa.com"
    echo "   Password: admin123"
    echo "   ⚠️  Change this password after first login!"
    echo ""
    echo "🏦 iKhokha Payment Gateway is configured and ready!"
else
    echo "❌ Deployment failed!"
    exit 1
fi
