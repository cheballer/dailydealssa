# 🚀 Quick Start: Yoco Test Mode

## ⚡ Fast Setup (5 minutes)

### Step 1: Update Environment Variables

**For Local Development:**

Create/update `.env.local`:
```env
YOCO_SECRET_KEY=sk_test_e8d4bd1d9ayPVlQfd0e4927adbfb
YOCO_PUBLIC_KEY=pk_test_a2c1e2d366ODd41351c4
PAYMENTS_MODE=live
```

**For Vercel:**
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Update `YOCO_SECRET_KEY` to: `sk_test_e8d4bd1d9ayPVlQfd0e4927adbfb`
3. Update `YOCO_PUBLIC_KEY` to: `pk_test_a2c1e2d366ODd41351c4`
4. Click Save and Redeploy

---

### Step 2: Restart Server

```bash
# Stop server (Ctrl+C)
npm run dev
```

---

### Step 3: Test Payment

**Use these test card details:**

| Field | Value |
|-------|-------|
| Card Number | `4000 0000 0000 0002` |
| Expiry | `12/25` |
| CVC | `123` |
| Name | `Test User` |

**Note:** This card will be declined (for testing error handling)

**For successful payment**, use any valid card number like:
- `4242 4242 4242 4242` (Visa)
- `5555 5555 5555 4444` (Mastercard)

---

## ✅ You're Ready!

Now you can:
- ✅ Test checkout flow
- ✅ Test payments (no real charges)
- ✅ Test error handling
- ✅ Test order creation
- ✅ Test admin features

---

## 🔍 Verify It's Working

Check console logs when making a payment:
```
🔗 Creating Yoco checkout...
✅ Yoco checkout created successfully
```

If you see this, test mode is working! 🎉

---

## 📚 Full Documentation

See `YOCO_TEST_KEYS_SETUP.md` for complete details.

---

**That's it! Start testing!** 🚀

