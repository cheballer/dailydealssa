# 🐛 Vercel Troubleshooting Guide

## Current Issue: 500 Internal Server Error on `/api/checkout/create-payment`

### Possible Causes:

1. ❌ **iKhokha credentials not added to Vercel**
2. ❌ **Database connection issue on Vercel**
3. ❌ **Environment variables not set correctly**
4. ❌ **Missing dependencies**

---

## ✅ Step 1: Check Vercel Logs

### How to View Logs:

1. **Go to Vercel Dashboard:**
   - Visit: https://vercel.com/dashboard
   - Select your `dailydealssa` project

2. **View Deployment Logs:**
   - Click **Deployments**
   - Click on the latest deployment
   - Click **Functions** tab
   - Look for `/api/checkout/create-payment`

3. **Check for Errors:**
   Look for:
   - ❌ "IKHOKHA_APP_ID is not defined"
   - ❌ "IKHOKHA_APP_KEY is not defined"
   - ❌ "Can't reach database server"
   - ❌ Any other error messages

---

## ✅ Step 2: Add iKhokha Credentials to Vercel

### **CRITICAL: You MUST add these to Vercel!**

1. **Go to Vercel Dashboard:**
   - Visit: https://vercel.com/dashboard
   - Select your `dailydealssa` project

2. **Navigate to Environment Variables:**
   - Click **Settings**
   - Click **Environment Variables**

3. **Add These 4 Variables:**

   ```
   IKHOKHA_APP_ID = IK7WXELYCOCXYDJ1LCK9ND6N7WVTXWJD
   IKHOKHA_APP_KEY = jG2HsRS43fyeOa3W5RfZbm3cBZRkLHUG
   IKHOKHA_API_URL = https://api.ikhokha.com
   PAYMENTS_MODE = live
   ```

4. **Select Environments:**
   - ✅ Production
   - ✅ Preview
   - ✅ Development

5. **Save:**
   - Click **Save**

6. **Redeploy:**
   - Go to **Deployments**
   - Click **...** on the latest deployment
   - Click **Redeploy**
   - OR push a new commit to trigger auto-deploy

---

## ✅ Step 3: Verify Database Connection

### Check if DATABASE_URL is set:

1. **Go to Vercel Dashboard**
2. **Settings → Environment Variables**
3. **Look for `DATABASE_URL`**
4. **Should be:** `postgres://...@db.prisma.io:5432/postgres?sslmode=require`

### If DATABASE_URL is missing:

1. **Get it from your `.env` file:**
   ```bash
   cd "/Users/fatehcheballah/Documents/daily deals ecomm store/daily-deals-sa"
   cat .env | grep DATABASE_URL
   ```

2. **Add to Vercel:**
   - Copy the DATABASE_URL
   - Add as environment variable
   - Select all environments
   - Save and redeploy

---

## ✅ Step 4: Check All Required Environment Variables

### **Required Variables for Vercel:**

```bash
# Database
DATABASE_URL=postgres://...@db.prisma.io:5432/postgres?sslmode=require

# NextAuth.js
NEXTAUTH_URL=https://dailydealssa.vercel.app
NEXTAUTH_SECRET=your-production-secret-key

# iKhokha Payment Gateway
IKHOKHA_APP_ID=IK7WXELYCOCXYDJ1LCK9ND6N7WVTXWJD
IKHOKHA_APP_KEY=jG2HsRS43fyeOa3W5RfZbm3cBZRkLHUG
IKHOKHA_API_URL=https://api.ikhokha.com
PAYMENTS_MODE=live

# OAuth (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

---

## ✅ Step 5: Test After Adding Credentials

### After adding credentials and redeploying:

1. **Visit:** https://dailydealssa.vercel.app
2. **Sign in** to your account
3. **Add items to cart**
4. **Go to checkout**
5. **Fill in shipping details**
6. **Click "Pay RXXX"**
7. **Should redirect to iKhokha payment page!**

---

## 🐛 Common Errors and Solutions

### Error: "IKHOKHA_APP_ID is not defined"

**Solution:**
- Add `IKHOKHA_APP_ID` to Vercel environment variables
- Redeploy

### Error: "Can't reach database server"

**Solution:**
- Check `DATABASE_URL` is set in Vercel
- Verify database is accessible
- Check Prisma Cloud dashboard

### Error: "NEXTAUTH_SECRET is not defined"

**Solution:**
- Add `NEXTAUTH_SECRET` to Vercel
- Use a strong random string
- Redeploy

### Error: "Unauthorized"

**Solution:**
- Make sure you're signed in
- Check session is valid
- Try signing out and back in

---

## 📝 Quick Checklist

- [ ] ✅ Checked Vercel logs for errors
- [ ] ✅ Added IKHOKHA_APP_ID to Vercel
- [ ] ✅ Added IKHOKHA_APP_KEY to Vercel
- [ ] ✅ Added IKHOKHA_API_URL to Vercel
- [ ] ✅ Added PAYMENTS_MODE to Vercel
- [ ] ✅ Added DATABASE_URL to Vercel
- [ ] ✅ Added NEXTAUTH_URL to Vercel
- [ ] ✅ Added NEXTAUTH_SECRET to Vercel
- [ ] ✅ Selected all environments (Production, Preview, Development)
- [ ] ✅ Saved environment variables
- [ ] ✅ Redeployed app
- [ ] ✅ Tested payment flow

---

## 🚀 Quick Fix Script

### Copy these commands to add all variables at once:

```bash
# 1. Go to Vercel Dashboard
# 2. Select your project
# 3. Go to Settings → Environment Variables
# 4. Add each variable:

IKHOKHA_APP_ID = IK7WXELYCOCXYDJ1LCK9ND6N7WVTXWJD
IKHOKHA_APP_KEY = jG2HsRS43fyeOa3W5RfZbm3cBZRkLHUG
IKHOKHA_API_URL = https://api.ikhokha.com
PAYMENTS_MODE = live

# 5. Select all environments
# 6. Click Save
# 7. Redeploy
```

---

## 📞 Need More Help?

### Check Logs:
1. Vercel Dashboard → Deployments → Functions → Logs
2. Look for the specific error message
3. Share the error with me for further debugging

### Common Issues:
- ❌ Credentials not added to Vercel (most common)
- ❌ Wrong environment selected
- ❌ Forgot to redeploy after adding variables
- ❌ Database connection issue

---

## 🎯 Expected Result After Fix

Once you add the credentials and redeploy:

✅ Checkout page loads  
✅ Shipping form works  
✅ Click "Pay RXXX" button  
✅ Order created in database  
✅ iKhokha payment link generated  
✅ Redirect to iKhokha payment page  
✅ Customer enters card details  
✅ Payment processed  
✅ Redirect back to success page  

---

**The most likely issue is that you haven't added the iKhokha credentials to Vercel yet!** 

**Follow Step 2 above to add them now!** 🚀

