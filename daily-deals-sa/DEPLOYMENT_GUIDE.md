# 🚀 Vercel Deployment Guide - Daily Deals SA

## 📋 Environment Variables for Vercel

Add these environment variables in your Vercel dashboard (Project Settings → Environment Variables):

### Database Configuration
```env
POSTGRES_URL="postgres://dcc414ef8ed9c7a450ddc6e6ce4dc5e32e3c28aa63bcf6207f3ed3bbb1496327:sk_QtPkmGrIV-hcQnhoms9fh@db.prisma.io:5432/postgres?sslmode=require"
PRISMA_DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RfaWQiOjEsInNlY3VyZV9rZXkiOiJza19RdFBrbUdySVYtaGNRbmhvbXM5ZmgiLCJhcGlfa2V5IjoiMDFLN01SR0tXRTkzS1I4MldNWEtCSkdERUoiLCJ0ZW5hbnRfaWQiOiJkY2M0MTRlZjhlZDljN2E0NTBkZGM2ZTZjZTRkYzVlMzJlM2MyOGFhNjNiY2Y2MjA3ZjNlZDNiYmIxNDk2MzI3IiwiaW50ZXJuYWxfc2VjcmV0IjoiYTg0NTBhY2YtMTRlZC00YmZhLWIzMDQtMTRmZmQ5ZGRkNGJlIn0.FjCtzKt_gm2oitAS1I2dqiES5z0O65o45UUk8C8hejg"
DATABASE_URL="postgres://dcc414ef8ed9c7a450ddc6e6ce4dc5e32e3c28aa63bcf6207f3ed3bbb1496327:sk_QtPkmGrIV-hcQnhoms9fh@db.prisma.io:5432/postgres?sslmode=require"
```

### NextAuth.js Configuration
```env
NEXTAUTH_URL="https://your-app-name.vercel.app"
NEXTAUTH_SECRET="your-super-secret-production-key-here"
```

### iKhokha Payment Gateway
```env
IKHOKHA_APP_ID="IK7WXELYCOCXYDJ1LCK9ND6N7WVTXWJD"
IKHOKHA_APP_KEY="jG2HsRS43fyeOa3W5RfZbm3cBZRkLHUG"
```

### Optional: Google OAuth
```env
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### Optional: Email Configuration
```env
EMAIL_FROM="noreply@dailydeals-sa.com"
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"
```

### Optional: Courier Service
```env
POSTNET_API_KEY="your-postnet-api-key"
POSTNET_API_URL="https://api.postnet.co.za"
```

## 🔧 Deployment Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Ready for deployment with iKhokha integration"
git push origin main
```

### 2. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure build settings:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install --legacy-peer-deps`

### 3. Set Environment Variables
1. Go to Project Settings → Environment Variables
2. Add all the environment variables listed above
3. **Important**: Update `NEXTAUTH_URL` to your actual Vercel domain

### 4. Database Setup
Run these commands after deployment:

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Link to your project
vercel link

# Run database migrations
npx prisma migrate deploy

# Generate Prisma client
npx prisma generate
```

### 5. Create Admin User
```bash
# Run the admin creation script
npm run create-admin
```

## 🔑 Generate NEXTAUTH_SECRET

Run this command to generate a secure secret:
```bash
openssl rand -base64 32
```

Copy the output and use it as your `NEXTAUTH_SECRET`.

## 🧪 Test Your Deployment

### 1. Visit Your Site
- Go to `https://your-app-name.vercel.app`
- Verify the homepage loads correctly

### 2. Test Authentication
- Try signing up with a new account
- Test admin login with:
  - **Email**: `admin@dailydeals-sa.com`
  - **Password**: `admin123`

### 3. Test Admin Panel
- Go to `/admin`
- Verify you can access the dashboard
- Test adding a product

### 4. Test Payment Flow
- Add items to cart
- Go to checkout
- Fill shipping details
- Test payment (use iKhokha test mode)

## 🔍 Troubleshooting

### Common Issues:

1. **Database Connection Error**
   - Verify DATABASE_URL is correctly set
   - Ensure Prisma migrations ran successfully

2. **Build Failures**
   - Check that all environment variables are set
   - Verify `npm install --legacy-peer-deps` is used

3. **Authentication Issues**
   - Verify NEXTAUTH_URL matches your domain
   - Check NEXTAUTH_SECRET is set

4. **Payment Issues**
   - Verify iKhokha credentials are correct
   - Check webhook URL is accessible

### Debug Commands:
```bash
# Check environment variables
vercel env ls

# View deployment logs
vercel logs

# Test database connection
npx prisma db pull
```

## 📊 Post-Deployment Checklist

- [ ] Homepage loads correctly
- [ ] User registration works
- [ ] Admin panel accessible
- [ ] Products can be added via admin
- [ ] Shopping cart functions
- [ ] Checkout process works
- [ ] Payment integration functional
- [ ] Webhooks receive callbacks
- [ ] Order status updates correctly

## 🎉 Success!

Once everything is working:
1. **Update admin password** from default `admin123`
2. **Add your products** through the admin panel
3. **Configure your domain** (optional)
4. **Set up monitoring** and analytics
5. **Start selling!** 🛍️

## 📞 Support

If you encounter issues:
1. Check the deployment logs in Vercel dashboard
2. Verify all environment variables are set
3. Test database connection
4. Review the troubleshooting section above

Your Daily Deals SA store is now live with iKhokha payment integration! 🚀
