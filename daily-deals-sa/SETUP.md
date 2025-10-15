# 🚀 Daily Deals SA - Setup Guide

This guide will help you set up and deploy your Daily Deals SA e-commerce store.

## 📋 Prerequisites

Before starting, ensure you have:

- Node.js 18+ installed
- A PostgreSQL database (local or cloud)
- A Stripe account for payments
- A Google account for OAuth (optional)
- A Vercel account for deployment

## 🗄️ Database Setup

### Option 1: Local PostgreSQL

1. Install PostgreSQL on your machine
2. Create a new database:
   ```sql
   CREATE DATABASE dailydeals;
   ```
3. Update your `.env.local` with:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/dailydeals"
   ```

### Option 2: Cloud Database (Recommended)

**Vercel Postgres:**
1. Go to your Vercel dashboard
2. Create a new Postgres database
3. Copy the connection string to your environment variables

**Other providers:**
- Supabase (Free tier available)
- Railway
- PlanetScale
- Neon

## 🔑 Environment Variables Setup

Create a `.env.local` file in your project root:

```env
# Database
DATABASE_URL="postgresql://username:password@host:port/database"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-key-here"

# Google OAuth (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# iKhokha Payment Gateway
IKHOKHA_APP_ID="IK7WXELYCOCXYDJ1LCK9ND6N7WVTXWJD"
IKHOKHA_APP_KEY="jG2HsRS43fyeOa3W5RfZbm3cBZRkLHUG"

# Email (Optional - for notifications)
EMAIL_FROM="noreply@yourdomain.com"
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"

# Courier Service (Optional)
POSTNET_API_KEY="your-postnet-api-key"
POSTNET_API_URL="https://api.postnet.co.za"
```

### How to get these values:

#### 1. NEXTAUTH_SECRET
Generate a random secret:
```bash
openssl rand -base64 32
```

#### 2. Google OAuth (Optional)
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.vercel.app/api/auth/callback/google` (production)

#### 3. iKhokha Payment Setup
1. Your iKhokha credentials are already configured:
   - App ID: `IK7WXELYCOCXYDJ1LCK9ND6N7WVTXWJD`
   - App Key: `jG2HsRS43fyeOa3W5RfZbm3cBZRkLHUG`
2. The webhook endpoint is automatically configured at: `/api/webhooks/ikhokha`
3. Payment redirects are set up for success, failure, and cancel pages

## 🏃‍♂️ Local Development Setup

1. **Install dependencies:**
   ```bash
   npm install --legacy-peer-deps
   ```

2. **Set up the database:**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Run database migrations
   npm run db:migrate
   ```

3. **Create an admin user:**
   ```bash
   npm run create-admin
   ```
   This creates an admin user with:
   - Email: `admin@dailydeals-sa.com`
   - Password: `admin123`
   - ⚠️ **Change this password after first login!**

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Access your store:**
   - Frontend: `http://localhost:3000`
   - Admin Panel: `http://localhost:3000/admin`

## 🚀 Deployment to Vercel

### Method 1: Using Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel --prod
   ```

### Method 2: Using Vercel Dashboard

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure build settings:
     - Framework Preset: Next.js
     - Build Command: `npm run build`
     - Output Directory: `.next`

3. **Set Environment Variables:**
   - Go to Project Settings → Environment Variables
   - Add all variables from your `.env.local` file
   - Update `NEXTAUTH_URL` to your production domain

4. **Set up Database:**
   - Create a Postgres database in Vercel dashboard
   - Copy the connection string to `DATABASE_URL`
   - Run migrations:
     ```bash
     npx prisma migrate deploy
     ```

## 🔧 Post-Deployment Setup

After deploying to Vercel:

1. **Update Environment Variables:**
   ```env
   NEXTAUTH_URL="https://yourdomain.vercel.app"
   ```

2. **Run Database Migrations:**
   ```bash
   npx prisma migrate deploy
   ```

3. **Create Admin User:**
   ```bash
   npm run create-admin
   ```

4. **Test the Application:**
   - Visit your production URL
   - Test user registration/login
   - Test admin panel access
   - Test payment flow (use Stripe test cards)

## 🧪 Testing Payment Integration

Use these Stripe test card numbers:

- **Successful payment:** `4242 4242 4242 4242`
- **Declined payment:** `4000 0000 0000 0002`
- **Requires authentication:** `4000 0025 0000 3155`

Use any future expiry date and any 3-digit CVC.

## 🔍 Troubleshooting

### Common Issues:

1. **Database Connection Error:**
   - Verify DATABASE_URL is correct
   - Ensure database is running
   - Check firewall settings

2. **Build Errors:**
   - Run `npm install --legacy-peer-deps`
   - Clear `.next` folder: `rm -rf .next`
   - Check TypeScript errors

3. **Authentication Issues:**
   - Verify NEXTAUTH_SECRET is set
   - Check OAuth callback URLs
   - Ensure HTTPS in production

4. **Payment Failures:**
   - Verify Stripe keys are correct
   - Check webhook endpoint
   - Test with Stripe test cards

### Getting Help:

- Check the [README.md](./README.md) for detailed documentation
- Review the [troubleshooting section](./README.md#-troubleshooting)
- Create an issue on GitHub

## 🎉 Success!

Once everything is set up, you'll have:

- ✅ A fully functional e-commerce store
- ✅ Admin panel for managing products and orders
- ✅ User authentication and registration
- ✅ Secure payment processing with Stripe
- ✅ Courier service integration
- ✅ Responsive design for mobile and desktop

**Admin Access:**
- URL: `https://yourdomain.vercel.app/admin`
- Email: `admin@dailydeals-sa.com`
- Password: `admin123` (change this!)

**Next Steps:**
1. Add your products through the admin panel
2. Configure your Stripe account for live payments
3. Set up real courier service integration
4. Customize the design and branding
5. Add your domain and SSL certificate

Happy selling! 🛍️
