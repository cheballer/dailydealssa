# 🔧 Vercel Environment Variables Setup

## ✅ Fixed: vercel.json Updated

I've removed the placeholder environment variable references from `vercel.json`. Now you need to add environment variables directly in the Vercel dashboard.

---

## 📝 How to Add Environment Variables in Vercel

### Step 1: Go to Your Project Settings

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click on your **Daily Deals SA** project
3. Click on **Settings** tab
4. Click on **Environment Variables** in the left sidebar

### Step 2: Add Each Variable

Click **"Add New"** and add these variables one by one:

#### 1. DATABASE_URL
```
Name: DATABASE_URL
Value: postgres://dcc414ef8ed9c7a450ddc6e6ce4dc5e32e3c28aa63bcf6207f3ed3bbb1496327:sk_QtPkmGrIV-hcQnhoms9fh@db.prisma.io:5432/postgres?sslmode=require
Environment: Production, Preview, Development (select all three)
```

#### 2. NEXTAUTH_URL
```
Name: NEXTAUTH_URL
Value: https://YOUR-APP-NAME.vercel.app
Environment: Production, Preview, Development (select all three)
```
**⚠️ Replace YOUR-APP-NAME with your actual Vercel app name!**

#### 3. NEXTAUTH_SECRET
```
Name: NEXTAUTH_SECRET
Value: (generate with: openssl rand -base64 32)
Environment: Production, Preview, Development (select all three)
```

**Generate the secret:**
```bash
openssl rand -base64 32
```
Copy the output and paste it as the value.

#### 4. PAYMENTS_MODE
```
Name: PAYMENTS_MODE
Value: mock
Environment: Production, Preview, Development (select all three)
```

#### 5. IKHOKHA_APP_ID
```
Name: IKHOKHA_APP_ID
Value: IK7WXELYCOCXYDJ1LCK9ND6N7WVTXWJD
Environment: Production, Preview, Development (select all three)
```

#### 6. IKHOKHA_APP_KEY
```
Name: IKHOKHA_APP_KEY
Value: jG2HsRS43fyeOa3W5RfZbm3cBZRkLHUG
Environment: Production, Preview, Development (select all three)
```

---

## 🔄 After Adding Variables

### Step 3: Redeploy Your Project

1. Go to **Deployments** tab
2. Find the latest deployment
3. Click the **"..."** menu (three dots)
4. Click **"Redeploy"**
5. Wait for deployment to complete

---

## ✅ Verify Variables Are Set

After redeployment, you can verify:

1. Go to **Settings → Environment Variables**
2. You should see all 6 variables listed
3. Each should have checkmarks for Production, Preview, Development

---

## 🎯 Quick Checklist

- [ ] Added DATABASE_URL
- [ ] Added NEXTAUTH_URL (with your actual Vercel URL)
- [ ] Generated and added NEXTAUTH_SECRET
- [ ] Added PAYMENTS_MODE=mock
- [ ] Added IKHOKHA_APP_ID
- [ ] Added IKHOKHA_APP_KEY
- [ ] Selected all environments for each variable
- [ ] Redeployed the project

---

## 🚀 Next Steps

After redeployment succeeds:

1. **Setup Database:**
   ```bash
   npm install -g vercel
   vercel login
   vercel link
   npx prisma migrate deploy
   npm run seed:products
   npm run seed:drops
   npm run create-admin
   ```

2. **Test Your Site:**
   - Visit: `https://YOUR-APP-NAME.vercel.app`
   - Test homepage
   - Test categories
   - Test sign in/sign up
   - Test admin panel

3. **Admin Login:**
   - Email: `admin@dailydeals-sa.com`
   - Password: `admin123`

---

## 🆘 Troubleshooting

### "Secret does not exist" Error

**Solution:** You don't need to create secrets. Just add environment variables directly in the Vercel dashboard (as described above).

### Variables Not Working After Redeploy

**Solution:**
1. Make sure you selected all environments (Production, Preview, Development)
2. Try redeploying again
3. Check the deployment logs

### Still Getting Errors

**Solution:**
1. Go to Vercel Dashboard → Your Project → Deployments
2. Click on the failed deployment
3. Check the build logs for specific errors
4. Make sure all environment variables are set correctly

---

## 📞 Need Help?

- Check `DEPLOY_NOW.md` for full deployment guide
- View deployment logs in Vercel dashboard
- Check environment variables are all set

---

**You're almost there!** Add the environment variables and redeploy! 🚀

