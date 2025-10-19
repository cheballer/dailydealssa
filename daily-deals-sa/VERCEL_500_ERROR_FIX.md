# 🐛 Vercel 500 Error - Complete Fix Guide

## Current Issue: 500 Internal Server Error on `/api/checkout/create-payment`

Even after adding Yoco credentials to Vercel, you're still getting a 500 error.

---

## ✅ Step 1: Check Vercel Logs (Most Important!)

### **How to View Logs:**

1. **Go to Vercel Dashboard:**
   - Visit: https://vercel.com/dashboard
   - Select your `dailydealssa` project

2. **View Function Logs:**
   - Click **Deployments**
   - Click on the **latest deployment**
   - Click **Functions** tab
   - Look for `/api/checkout/create-payment`
   - Click on it to see the logs

3. **Look for the Error:**
   - Check the timestamp when you tried to checkout
   - Look for error messages like:
     - ❌ "YOCO_SECRET_KEY is not defined"
     - ❌ "Can't reach database server"
     - ❌ "Unauthorized"
     - ❌ Any other error message

---

## ✅ Step 2: Verify Environment Variables Are Set

### **Check in Vercel:**

1. **Go to Settings → Environment Variables**
2. **Verify these 3 variables exist:**
   ```
   YOCO_SECRET_KEY=YOUR_YOCO_SECRET_KEY_HERE
   YOCO_PUBLIC_KEY=YOUR_YOCO_PUBLIC_KEY_HERE
   PAYMENTS_MODE=live
   ```

3. **Check Environment Selection:**
   - Make sure **Production** is selected
   - Make sure **Preview** is selected
   - Make sure **Development** is selected

4. **Check for Typos:**
   - Make sure there are no extra spaces
   - Make sure the keys are correct
   - Make sure there are no quotes around the values

---

## ✅ Step 3: Redeploy After Adding Variables

### **This is CRITICAL!**

After adding environment variables, you **MUST** redeploy:

1. **Go to Deployments**
2. **Click "..." on the latest deployment**
3. **Click "Redeploy"**
4. **Wait for deployment to complete**
5. **Test again**

**Note:** Just adding environment variables doesn't update running deployments. You need to redeploy!

---

## ✅ Step 4: Check Database Connection

### **Verify DATABASE_URL is Set:**

1. **Go to Settings → Environment Variables**
2. **Look for `DATABASE_URL`**
3. **Should be:** `postgres://...@db.prisma.io:5432/postgres?sslmode=require`

### **If DATABASE_URL is Missing:**

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

## ✅ Step 5: Check NextAuth Configuration

### **Verify NEXTAUTH_URL is Set:**

1. **Go to Settings → Environment Variables**
2. **Look for `NEXTAUTH_URL`**
3. **Should be:** `https://dailydealssa.vercel.app`

### **If NEXTAUTH_URL is Wrong:**

1. **Update it to:** `https://dailydealssa.vercel.app`
2. **Save and redeploy**

---

## ✅ Step 6: Check All Required Environment Variables

### **Complete List of Required Variables:**

```bash
# Database
DATABASE_URL=postgres://...@db.prisma.io:5432/postgres?sslmode=require

# NextAuth.js
NEXTAUTH_URL=https://dailydealssa.vercel.app
NEXTAUTH_SECRET=your-production-secret-key

# Yoco Payment Gateway
YOCO_SECRET_KEY=YOUR_YOCO_SECRET_KEY_HERE
YOCO_PUBLIC_KEY=YOUR_YOCO_PUBLIC_KEY_HERE
PAYMENTS_MODE=live

# Optional
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

---

## ✅ Step 7: Test Locally First

### **Before testing on Vercel, test locally:**

```bash
# 1. Make sure dev server is running
cd "/Users/fatehcheballah/Documents/daily deals ecomm store/daily-deals-sa"
npm run dev

# 2. Visit http://localhost:3000
# 3. Add items to cart
# 4. Go to checkout
# 5. Fill in shipping details
# 6. Click "Pay RXXX"
# 7. Check if it works locally
```

**If it works locally but not on Vercel, the issue is with Vercel environment variables.**

---

## 🐛 Common Errors and Solutions

### **Error: "YOCO_SECRET_KEY is not defined"**

**Solution:**
- Add `YOCO_SECRET_KEY` to Vercel
- Make sure it's spelled correctly
- Redeploy after adding

### **Error: "Can't reach database server"**

**Solution:**
- Add `DATABASE_URL` to Vercel
- Verify database is accessible
- Check Prisma Cloud dashboard

### **Error: "Unauthorized"**

**Solution:**
- Make sure you're signed in
- Check `NEXTAUTH_URL` is set correctly
- Check `NEXTAUTH_SECRET` is set

### **Error: "Invalid amount"**

**Solution:**
- Amount must be in cents (multiply by 100)
- Minimum is R1.00 (100 cents)

---

## 📋 Quick Checklist

- [ ] ✅ Checked Vercel function logs for error
- [ ] ✅ Added YOCO_SECRET_KEY to Vercel
- [ ] ✅ Added YOCO_PUBLIC_KEY to Vercel
- [ ] ✅ Added PAYMENTS_MODE to Vercel
- [ ] ✅ Selected all environments (Production, Preview, Development)
- [ ] ✅ Saved environment variables
- [ ] ✅ Redeployed after adding variables
- [ ] ✅ Added DATABASE_URL to Vercel
- [ ] ✅ Added NEXTAUTH_URL to Vercel
- [ ] ✅ Added NEXTAUTH_SECRET to Vercel
- [ ] ✅ Tested locally (does it work?)
- [ ] ✅ Tested on Vercel after redeploy

---

## 🚀 Quick Fix Steps

1. **Check Vercel logs** (most important!)
2. **Verify all environment variables are set**
3. **Redeploy** (critical!)
4. **Test again**

---

## 📞 Need More Help?

### **Share the Error:**

1. **Go to Vercel Dashboard**
2. **Deployments → Latest → Functions → /api/checkout/create-payment**
3. **Copy the error message**
4. **Share it with me**

### **Common Issues:**

- ❌ Forgot to redeploy after adding variables (most common!)
- ❌ Wrong environment selected
- ❌ Typo in variable name or value
- ❌ Missing DATABASE_URL
- ❌ Missing NEXTAUTH_URL

---

**The most common issue is forgetting to redeploy after adding environment variables!** 

**Make sure you redeploy after adding the Yoco credentials!** 🚀

