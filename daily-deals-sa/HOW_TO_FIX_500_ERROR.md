# How to Fix the 500 Error on Vercel

## The Most Common Issue: Forgot to Redeploy!

After adding environment variables to Vercel, you **MUST** redeploy your app.

### Steps:

1. Go to https://vercel.com/dashboard
2. Select your dailydealssa project
3. Go to Deployments
4. Click "..." on the latest deployment
5. Click "Redeploy"
6. Wait for deployment to complete
7. Test again

---

## Check Vercel Logs

To see the actual error:

1. Go to Vercel Dashboard
2. Select your project
3. Go to Deployments
4. Click on the latest deployment
5. Click "Functions" tab
6. Look for `/api/checkout/create-payment`
7. Click on it to see the logs
8. Look for error messages

---

## Required Environment Variables

Make sure these are set in Vercel:

- DATABASE_URL
- NEXTAUTH_URL
- NEXTAUTH_SECRET
- YOCO_SECRET_KEY
- YOCO_PUBLIC_KEY
- PAYMENTS_MODE

---

## Test Locally First

Before testing on Vercel, test locally:

```bash
npm run dev
```

Visit http://localhost:3000 and test the checkout flow.

If it works locally but not on Vercel, the issue is with Vercel environment variables.

---

## Quick Checklist

- [ ] Added YOCO_SECRET_KEY to Vercel
- [ ] Added YOCO_PUBLIC_KEY to Vercel
- [ ] Added PAYMENTS_MODE to Vercel
- [ ] Selected all environments (Production, Preview, Development)
- [ ] Saved environment variables
- [ ] **REDEPLOYED after adding variables** (most important!)
- [ ] Tested locally (does it work?)
- [ ] Tested on Vercel after redeploy

---

**The most common issue is forgetting to redeploy after adding environment variables!**

