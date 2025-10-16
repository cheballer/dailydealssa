# 💳 iKhokha Payment Integration Setup Guide

## 🚨 Current Issue

Your iKhokha payment integration is failing because the credentials are not configured. The API is returning a 500 error because it can't authenticate with iKhokha.

---

## ✅ Step-by-Step Setup

### Step 1: Get Your iKhokha Credentials

1. **Log in to your iKhokha Merchant Portal**
   - Visit: https://merchant.ikhokha.com
   - Log in with your merchant account

2. **Navigate to API Settings**
   - Go to **Settings** → **API Integration**
   - Or **Developer** → **API Keys**

3. **Copy Your Credentials**
   You'll need:
   - ✅ **Application ID** (e.g., `IK7WXELYCOCXYDJ1LCK9ND6N7WVTXWJD`)
   - ✅ **Application Key** (e.g., `jG2HsRS43fyeOa3W5RfZbm3cBZRkLHUG`)
   - ✅ **Webhook Secret** (for payment notifications)

---

### Step 2: Update Local Environment Variables

**Edit `.env.local` file:**

```bash
# iKhokha Payment Gateway (for South Africa)
IKHOKHA_APP_ID="YOUR_APP_ID_HERE"
IKHOKHA_APP_KEY="YOUR_APP_KEY_HERE"
IKHOKHA_WEBHOOK_SECRET="YOUR_WEBHOOK_SECRET_HERE"
IKHOKHA_API_URL="https://api.ikhokha.com"

# Change payment mode to live
PAYMENTS_MODE=live
```

**Example:**
```bash
IKHOKHA_APP_ID="IK7WXELYCOCXYDJ1LCK9ND6N7WVTXWJD"
IKHOKHA_APP_KEY="jG2HsRS43fyeOa3W5RfZbm3cBZRkLHUG"
IKHOKHA_WEBHOOK_SECRET="your-webhook-secret-here"
```

---

### Step 3: Update Vercel Environment Variables

Since your app is deployed on Vercel, you need to add the same credentials there:

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Select your `dailydealssa` project

2. **Navigate to Settings**
   - Click **Settings** → **Environment Variables**

3. **Add These Variables:**
   ```
   IKHOKHA_APP_ID = YOUR_APP_ID_HERE
   IKHOKHA_APP_KEY = YOUR_APP_KEY_HERE
   IKHOKHA_WEBHOOK_SECRET = YOUR_WEBHOOK_SECRET_HERE
   IKHOKHA_API_URL = https://api.ikhokha.com
   PAYMENTS_MODE = live
   ```

4. **Select Environment:**
   - ✅ Production
   - ✅ Preview
   - ✅ Development

5. **Redeploy Your App**
   - After adding variables, redeploy your app
   - Or push a new commit to trigger auto-deploy

---

### Step 4: Test the Integration

#### Test Locally:

```bash
# 1. Restart your dev server
cd "/Users/fatehcheballah/Documents/daily deals ecomm store/daily-deals-sa"
npm run dev

# 2. Visit your site
# http://localhost:3000

# 3. Add items to cart
# 4. Go to checkout
# 5. Fill in shipping details
# 6. Click "Pay RXXX"
# 7. You should be redirected to iKhokha payment page
```

#### Test on Vercel:

1. **Visit your live site:** https://dailydealssa.vercel.app
2. **Add items to cart**
3. **Go to checkout**
4. **Fill in shipping details**
5. **Click "Pay RXXX"**
6. **You should be redirected to iKhokha payment page**

---

## 🔍 How to Check if It's Working

### Check Logs:

**Local:**
```bash
# In your terminal where npm run dev is running
# Look for these logs:
📦 Creating order with items: 2
💰 Total amount: 1598
✅ Order created: DD-1697234567890-ABC123
🔗 Creating iKhokha payment link...
Payment request: { ... }
Payment response: { ... }
✅ Payment link created successfully: https://pay.ikhokha.com/...
```

**Vercel:**
1. Go to Vercel Dashboard
2. Select your project
3. Click **Deployments**
4. Click on the latest deployment
5. Click **Functions** tab
6. Check the logs for the `/api/checkout/create-payment` function

---

## 🐛 Troubleshooting

### Error: "Failed to create payment link"

**Possible causes:**
1. ❌ Invalid credentials
2. ❌ Wrong API URL
3. ❌ Network connectivity issues
4. ❌ iKhokha account not activated

**Fix:**
1. Double-check your credentials in iKhokha portal
2. Verify API URL is correct
3. Check iKhokha account status
4. Contact iKhokha support if needed

### Error: "Unauthorized"

**Possible causes:**
1. ❌ User not logged in
2. ❌ Session expired

**Fix:**
1. Make sure you're signed in
2. Try signing out and back in

### Error: "Can't reach database server"

**Possible causes:**
1. ❌ DATABASE_URL not set
2. ❌ Database connection issues

**Fix:**
1. Check `.env` file has DATABASE_URL
2. Verify database is accessible
3. Check Prisma Cloud dashboard

---

## 📋 iKhokha API Reference

### Payment Request Format:

```json
{
  "entityID": "YOUR_APP_ID",
  "externalEntityID": "daily-deals-sa",
  "amount": 159800,
  "currency": "ZAR",
  "requesterUrl": "https://dailydealssa.vercel.app/checkout",
  "description": "Daily Deals SA - Order #DD-123456",
  "paymentReference": "order-id-123",
  "mode": "live",
  "externalTransactionID": "order-id-123",
  "urls": {
    "callbackUrl": "https://dailydealssa.vercel.app/api/webhooks/ikhokha",
    "successPageUrl": "https://dailydealssa.vercel.app/checkout/success",
    "failurePageUrl": "https://dailydealssa.vercel.app/checkout/failure",
    "cancelUrl": "https://dailydealssa.vercel.app/checkout/cancel"
  }
}
```

### Success Response:

```json
{
  "responseCode": "00",
  "message": "Payment link created successfully",
  "paylinkUrl": "https://pay.ikhokha.com/...",
  "paylinkID": "PL-1234567890",
  "externalTransactionID": "order-id-123"
}
```

---

## 🔐 Security Best Practices

1. ✅ **Never commit credentials to Git**
   - Use `.env.local` for local development
   - Use Vercel Environment Variables for production

2. ✅ **Use different credentials for dev/prod**
   - Test mode for development
   - Live mode for production

3. ✅ **Rotate credentials regularly**
   - Change API keys every 90 days
   - Revoke old keys after rotation

4. ✅ **Enable webhook signature verification**
   - Verify all incoming webhooks
   - Reject unsigned requests

---

## 📞 Support

### iKhokha Support:
- **Email:** support@ikhokha.com
- **Phone:** 0861 454 654
- **Website:** https://ikhokha.com/support

### Documentation:
- **API Docs:** https://docs.ikhokha.com
- **Merchant Portal:** https://merchant.ikhokha.com

---

## 🎯 Next Steps After Setup

1. ✅ Test payment flow end-to-end
2. ✅ Set up webhook handlers for payment notifications
3. ✅ Configure success/failure pages
4. ✅ Test with real card (small amount)
5. ✅ Monitor transactions in iKhokha dashboard

---

## 📝 Checklist

- [ ] Got iKhokha credentials from merchant portal
- [ ] Updated `.env.local` with credentials
- [ ] Updated Vercel environment variables
- [ ] Redeployed app on Vercel
- [ ] Tested payment flow locally
- [ ] Tested payment flow on Vercel
- [ ] Verified order creation in database
- [ ] Verified payment link generation
- [ ] Tested with real card (small amount)
- [ ] Set up webhook handlers

---

**Once you add your iKhokha credentials, the payment flow will work!** 🎉

Need help? Check the logs or contact iKhokha support!

