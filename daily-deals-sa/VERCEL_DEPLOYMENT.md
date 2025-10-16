# 🚀 Vercel Deployment Guide - Daily Deals SA

## 📋 Prerequisites

- [ ] GitHub account
- [ ] Vercel account (free tier is fine)
- [ ] Prisma Cloud database (already configured)
- [ ] iKhokha merchant account (for payments)

---

## 🎯 Quick Deploy (5 minutes)

### Step 1: Push to GitHub

```bash
cd "/Users/fatehcheballah/Documents/daily deals ecomm store/daily-deals-sa"

# Stage all changes
git add .

# Commit changes
git commit -m "Ready for Vercel deployment - Full ecommerce with free drops"

# Push to GitHub
git push origin main
```

### Step 2: Deploy to Vercel

1. **Go to [vercel.com](https://vercel.com)**
2. **Click "Add New..." → "Project"**
3. **Import your GitHub repository**
4. **Configure project:**
   - **Project Name:** `daily-deals-sa` (or your choice)
   - **Framework Preset:** Next.js
   - **Root Directory:** `./daily-deals-sa` (if repo is at root)
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
   - **Install Command:** `npm install --legacy-peer-deps`

5. **Click "Deploy"**

### Step 3: Set Environment Variables

After first deployment, go to **Project Settings → Environment Variables** and add:

```env
# Database (use your Prisma Cloud URL)
DATABASE_URL=postgres://dcc414ef8ed9c7a450ddc6e6ce4dc5e32e3c28aa63bcf6207f3ed3bbb1496327:sk_QtPkmGrIV-hcQnhoms9fh@db.prisma.io:5432/postgres?sslmode=require

# NextAuth (IMPORTANT: Update with your Vercel URL)
NEXTAUTH_URL=https://your-app-name.vercel.app
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32

# Payments Mode
PAYMENTS_MODE=mock

# iKhokha (for production)
IKHOKHA_APP_ID=IK7WXELYCOCXYDJ1LCK9ND6N7WVTXWJD
IKHOKHA_APP_KEY=jG2HsRS43fyeOa3W5RfZbm3cBZRkLHUG

# Optional: Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Optional: Email
EMAIL_FROM=noreply@dailydeals-sa.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

**⚠️ Important:** Generate a secure `NEXTAUTH_SECRET`:

```bash
openssl rand -base64 32
```

### Step 4: Run Database Migrations

After deployment, run:

```bash
# Install Vercel CLI globally (if not already installed)
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

### Step 5: Create Admin User

```bash
npm run create-admin
```

This creates:
- **Email:** `admin@dailydeals-sa.com`
- **Password:** `admin123`

**⚠️ Change this password immediately after first login!**

---

## 🔧 Alternative: Deploy via Vercel CLI

If you prefer using the command line:

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy (first time - setup)
vercel

# Deploy to production
vercel --prod
```

---

## 📊 Post-Deployment Setup

### 1. Seed Products

```bash
npm run seed:products
```

### 2. Seed Free Drops

```bash
npm run seed:drops
```

### 3. Test Your Deployment

Visit your Vercel URL and test:

- [ ] Homepage loads
- [ ] Categories page works
- [ ] Product pages display
- [ ] Sign in/Sign up works
- [ ] Admin panel accessible at `/admin`
- [ ] Can add products via admin
- [ ] Cart and checkout work

---

## 🔑 Admin Access

After deployment:

1. Go to `https://your-app.vercel.app/auth/signin`
2. Login with:
   - **Email:** `admin@dailydeals-sa.com`
   - **Password:** `admin123`
3. You'll be redirected to `/admin` dashboard
4. **IMPORTANT:** Change the password immediately!

---

## 🎨 Custom Domain (Optional)

1. Go to **Project Settings → Domains**
2. Add your custom domain
3. Update `NEXTAUTH_URL` to match your domain
4. Redeploy

---

## 🔍 Troubleshooting

### Build Fails

**Error:** `Module not found` or `Prisma Client not generated`

**Solution:**
```bash
# Add this to package.json scripts:
"postinstall": "prisma generate"
```

### Database Connection Error

**Error:** `Can't reach database server`

**Solution:**
- Verify `DATABASE_URL` is correct in Vercel env vars
- Check Prisma Cloud dashboard for connection status
- Ensure `sslmode=require` is in the URL

### Authentication Not Working

**Error:** `NEXTAUTH_URL mismatch`

**Solution:**
- Update `NEXTAUTH_URL` in Vercel to match your domain
- Ensure `NEXTAUTH_SECRET` is set
- Redeploy after changing env vars

### Payment Issues

**Error:** `iKhokha API error`

**Solution:**
- Verify iKhokha credentials are correct
- Check `PAYMENTS_MODE` is set to `live` for production
- Test with `PAYMENTS_MODE=mock` first

---

## 📈 Monitoring

### View Logs

```bash
# Real-time logs
vercel logs

# Specific deployment
vercel logs --follow
```

### Check Build Status

1. Go to Vercel Dashboard
2. Click on your project
3. View "Deployments" tab
4. Click on a deployment to see logs

---

## 🎉 Success Checklist

After deployment, verify:

- [x] Homepage loads without errors
- [x] All navigation links work
- [x] Categories display correctly
- [x] Products load from database
- [x] User can sign up/sign in
- [x] Admin panel is accessible (admin only)
- [x] Can add products via admin
- [x] Cart functionality works
- [x] Checkout process completes
- [x] Free drops display correctly
- [x] Payment integration works (mock or live)
- [x] Order tracking works

---

## 🚀 Next Steps

1. **Add your products** via admin panel
2. **Configure iKhokha** for live payments
3. **Set up email notifications** (optional)
4. **Add your logo** and branding
5. **Configure custom domain** (optional)
6. **Start marketing!** 🎊

---

## 📞 Support

If you encounter issues:

1. Check Vercel deployment logs
2. Verify all environment variables are set
3. Test database connection
4. Review this guide's troubleshooting section
5. Check [Vercel Docs](https://vercel.com/docs)
6. Check [Next.js Docs](https://nextjs.org/docs)

---

## 🎊 You're Live!

Your Daily Deals SA e-commerce store is now live on Vercel! 🚀

**Your URL:** `https://your-app-name.vercel.app`

Start selling and enjoy your new online store! 🛍️

