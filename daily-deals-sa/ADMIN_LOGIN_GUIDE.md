# 🔐 Admin Login & Product Management Guide

## ✅ What's Been Fixed

1. ✅ **Header now appears on ALL pages** (including auth and admin pages)
2. ✅ **Footer now appears on ALL pages**
3. ✅ **Admin layout includes header and footer**
4. ✅ **Auth pages (sign in/sign up) include header and footer**

---

## 🔑 How to Log In as Admin

### Step 1: Create Admin User (First Time Only)

After your Vercel deployment succeeds, you need to create an admin user. Run this command locally:

```bash
cd "/Users/fatehcheballah/Documents/daily deals ecomm store/daily-deals-sa"
npm run create-admin
```

This will create:
- **Email:** `admin@dailydeals-sa.com`
- **Password:** `admin123`
- **Role:** `ADMIN`

### Step 2: Sign In to Your Deployed Site

1. **Go to your Vercel site:** `https://YOUR-APP-NAME.vercel.app`
2. **Click "Sign In"** in the header
3. **Enter credentials:**
   - Email: `admin@dailydeals-sa.com`
   - Password: `admin123`
4. **Click "Sign In"**
5. You'll be redirected to `/admin` dashboard

---

## ⚠️ Important Notes

### Authentication Will Work After:

1. **Vercel deployment succeeds** (build completes)
2. **Environment variables are set** (especially `NEXTAUTH_URL` and `NEXTAUTH_SECRET`)
3. **Database migrations run** (`npx prisma migrate deploy`)
4. **Admin user is created** (`npm run create-admin`)

### Google Sign-In

Google sign-in requires:
1. **Google OAuth credentials** set up in Google Cloud Console
2. **Environment variables** in Vercel:
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
3. **Authorized redirect URIs** configured in Google Cloud Console

**For now, use email/password login instead of Google.**

---

## 📦 How to Add Products (After Logging In)

### Step 1: Access Admin Panel

1. Log in as admin
2. You'll see the admin sidebar on the left
3. Click **"Products"** in the sidebar

### Step 2: Add a New Product

1. Click **"Add Product"** button
2. Fill in the form:
   - **Name:** Product name (e.g., "Wireless Earbuds Pro")
   - **Description:** Product description
   - **Price:** Regular price (e.g., 799)
   - **Original Price:** Original price before discount (e.g., 1299)
   - **Discount:** Discount percentage (e.g., 38)
   - **Category:** Select from dropdown
   - **Stock:** Available quantity (e.g., 24)
   - **SKU:** Product SKU (e.g., "ELEC-EARBUDS-001")
   - **Images:** Upload product images
   - **Featured:** Check if featured product
3. Click **"Save"**

### Step 3: Manage Products

In the admin panel, you can:
- ✅ View all products
- ✅ Edit existing products
- ✅ Delete products
- ✅ Update stock levels
- ✅ Toggle product active/inactive

---

## 🎯 Quick Start Checklist

### Before You Can Log In:

- [ ] Vercel deployment succeeds
- [ ] Add `NEXTAUTH_URL` environment variable in Vercel
- [ ] Redeploy after adding environment variables
- [ ] Run database migrations: `npx prisma migrate deploy`
- [ ] Create admin user: `npm run create-admin`

### After Logging In:

- [ ] Access admin panel at `/admin`
- [ ] Add products via admin panel
- [ ] Upload product images
- [ ] Set prices and stock
- [ ] Seed free drops: `npm run seed:drops`

---

## 🚀 Deployment Steps (Complete)

### 1. Check Vercel Deployment

Go to [vercel.com/dashboard](https://vercel.com/dashboard) and verify:
- ✅ Build succeeded
- ✅ Deployment is live

### 2. Add Missing Environment Variable

Go to **Settings → Environment Variables** and add:

```
Name: NEXTAUTH_URL
Value: https://YOUR-APP-NAME.vercel.app
```

(Replace `YOUR-APP-NAME` with your actual Vercel app name)

### 3. Redeploy

1. Go to **Deployments** tab
2. Click **"..."** on latest deployment
3. Click **"Redeploy"**

### 4. Setup Database

Run these commands locally:

```bash
cd "/Users/fatehcheballah/Documents/daily deals ecomm store/daily-deals-sa"

# Link to Vercel project
vercel link

# Run migrations
npx prisma migrate deploy

# Seed products (optional)
npm run seed:products

# Create admin user
npm run create-admin
```

### 5. Test Login

1. Visit your site: `https://YOUR-APP-NAME.vercel.app`
2. Click **"Sign In"**
3. Enter:
   - Email: `admin@dailydeals-sa.com`
   - Password: `admin123`
4. Click **"Sign In"**
5. You should be redirected to `/admin`

---

## 🆘 Troubleshooting

### Can't Log In?

**Problem:** Login page doesn't work

**Solutions:**
1. Make sure `NEXTAUTH_URL` is set correctly in Vercel
2. Make sure `NEXTAUTH_SECRET` is set in Vercel
3. Redeploy after adding environment variables
4. Check Vercel logs for errors

### Admin User Not Created?

**Problem:** `npm run create-admin` fails

**Solutions:**
1. Make sure `DATABASE_URL` is correct
2. Make sure database migrations ran successfully
3. Check database connection in Vercel logs

### Can't Access Admin Panel?

**Problem:** Getting 404 when accessing `/admin`

**Solutions:**
1. Make sure you're logged in
2. Make sure your user has `role: 'ADMIN'`
3. Check Vercel logs for errors
4. Try logging out and logging back in

### Google Sign-In Not Working?

**Problem:** Google sign-in button doesn't work

**Solutions:**
1. Use email/password login instead (recommended for now)
2. Google OAuth requires additional setup (see below)

---

## 🔧 Setting Up Google OAuth (Optional)

If you want Google sign-in to work:

### 1. Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (for local dev)
   - `https://YOUR-APP-NAME.vercel.app/api/auth/callback/google` (for production)

### 2. Add to Vercel Environment Variables

```
Name: GOOGLE_CLIENT_ID
Value: (your Google Client ID)

Name: GOOGLE_CLIENT_SECRET
Value: (your Google Client Secret)
```

### 3. Redeploy

After adding the variables, redeploy your project.

---

## 📝 Summary

### ✅ What Works Now:

- ✅ Header and footer on all pages
- ✅ Email/password authentication
- ✅ Admin panel with header and footer
- ✅ Product management (after logging in)

### ⚠️ What Needs Setup:

- ⚠️ `NEXTAUTH_URL` environment variable (required)
- ⚠️ Database migrations (required)
- ⚠️ Admin user creation (required)
- ⚠️ Google OAuth credentials (optional)

---

## 🎉 You're Almost There!

Just follow the deployment steps above, and you'll be able to:
1. ✅ Log in as admin
2. ✅ Access admin panel
3. ✅ Add products with images and prices
4. ✅ Manage your store

**Start with the deployment checklist and you'll be live soon!** 🚀

