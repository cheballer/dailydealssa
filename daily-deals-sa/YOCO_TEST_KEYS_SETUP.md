# 🔑 Yoco Test Keys Setup

## Test Keys Configuration

You've switched to **Yoco Test Mode** for safe testing without real charges.

---

## ✅ Test Keys

```env
# Yoco Test Keys (Safe for Testing)
YOCO_SECRET_KEY=sk_test_e8d4bd1d9ayPVlQfd0e4927adbfb
YOCO_PUBLIC_KEY=pk_test_a2c1e2d366ODd41351c4
PAYMENTS_MODE=live
```

---

## 📝 Update Environment Variables

### For Local Development (`.env.local`):

Create or update `.env.local` file:

```env
# Database
DATABASE_URL="postgres://..."

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-development-secret-key-change-in-production"

# Yoco Payment Gateway (TEST MODE)
YOCO_SECRET_KEY=sk_test_e8d4bd1d9ayPVlQfd0e4927adbfb
YOCO_PUBLIC_KEY=pk_test_a2c1e2d366ODd41351c4

# Shiplogic API
SHIPLOGIC_API_KEY=96f1b69f4a8646be8eb897218574437a
SHIPLOGIC_API_URL=https://api.shiplogic.com

# Email (for notifications)
EMAIL_FROM="noreply@dailydeals-sa.com"
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER=""
SMTP_PASSWORD=""

# Courier Service
POSTNET_API_KEY="your-postnet-api-key"
POSTNET_API_URL="https://api.postnet.co.za"

# Payments Mode
PAYMENTS_MODE=live

# Timezone
TZ=Africa/Johannesburg
```

---

### For Vercel Deployment:

1. Go to **Vercel Dashboard**
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Update these variables:

| Variable Name | Value | Environment |
|--------------|-------|-------------|
| `YOCO_SECRET_KEY` | `sk_test_e8d4bd1d9ayPVlQfd0e4927adbfb` | Production, Preview, Development |
| `YOCO_PUBLIC_KEY` | `pk_test_a2c1e2d366ODd41351c4` | Production, Preview, Development |
| `PAYMENTS_MODE` | `live` | Production, Preview, Development |

5. Click **Save**
6. **Redeploy** your application

---

## 🧪 Testing with Test Keys

### What You Can Test:

✅ **Create Orders** - Test the full checkout flow
✅ **Payment Processing** - Yoco will process test payments
✅ **No Real Charges** - Test keys don't charge real money
✅ **All Features** - Everything works the same as production

### Test Card Numbers (Yoco Test Mode):

Yoco provides test card numbers for testing. Common test cards:

| Card Number | Description |
|-------------|-------------|
| `4000 0000 0000 0002` | Card declined |
| `4000 0000 0000 9995` | Insufficient funds |
| `4000 0000 0000 0069` | Expired card |
| `4000 0000 0000 0127` | Incorrect CVC |
| `4000 0000 0000 0119` | Processing error |

**For successful test payments**, use any valid test card number with:
- **Expiry**: Any future date (e.g., 12/25)
- **CVC**: Any 3 digits (e.g., 123)
- **Name**: Any name

---

## 🔒 Security Notes

### Test Keys vs Live Keys:

| Feature | Test Keys | Live Keys |
|---------|-----------|-----------|
| Charges | ❌ No real charges | ✅ Real charges |
| Cards | Test cards only | Real cards |
| Environment | Safe for testing | Production only |
| Refunds | Not needed | Required for real orders |

### When to Switch Back to Live Keys:

⚠️ **Only switch to live keys when:**
- ✅ All testing is complete
- ✅ You're ready for real customers
- ✅ You understand the payment flow
- ✅ You have proper error handling

---

## 📋 Testing Checklist

### Before Going Live:

- [ ] Test checkout flow with test keys
- [ ] Test successful payment
- [ ] Test failed payment (declined card)
- [ ] Test free items (R0 orders)
- [ ] Test cart functionality
- [ ] Test order confirmation
- [ ] Test email notifications (if configured)
- [ ] Test order tracking
- [ ] Test admin order management
- [ ] Test refund process (if needed)

---

## 🚀 Quick Start

### 1. Update Local Environment:

```bash
# Create .env.local if it doesn't exist
cd daily-deals-sa
nano .env.local

# Add the test keys
YOCO_SECRET_KEY=sk_test_e8d4bd1d9ayPVlQfd0e4927adbfb
YOCO_PUBLIC_KEY=pk_test_a2c1e2d366ODd41351c4
PAYMENTS_MODE=live
```

### 2. Restart Development Server:

```bash
# Stop the current server (Ctrl+C)
# Then restart
npm run dev
```

### 3. Test a Payment:

1. Add items to cart
2. Go to checkout
3. Enter test card details
4. Complete payment
5. Verify order is created
6. Check admin panel for order

---

## 🔍 Verifying Test Mode

### Check Console Logs:

When you create a payment, you should see:

```bash
🔗 Creating Yoco checkout...
Request: {
  "amount": 50000,
  "currency": "ZAR",
  ...
}
✅ Yoco checkout created successfully
Response: {
  "id": "chk_test_...",
  "status": "created",
  ...
}
```

### Check Order Details:

In your database or admin panel, orders created with test keys will show:
- Payment status: `PENDING` or `PAID`
- Payment intent ID: Starts with test prefix
- No real money charged

---

## 📞 Support

### Yoco Support:
- **Email**: support@yoco.com
- **Phone**: +27 21 422 0320
- **Website**: https://www.yoco.com

### Test Mode Documentation:
- https://developer.yoco.com/online/checkout/testing

---

## ✅ Summary

You're now configured for **safe testing** with Yoco test keys:

- ✅ No real charges
- ✅ Test card numbers work
- ✅ All features available
- ✅ Safe to experiment
- ✅ Easy to switch to live keys later

**Happy testing!** 🎉




