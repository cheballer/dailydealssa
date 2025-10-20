# 🔐 Environment Variables Setup

## Add These to Your `.env.local` File

```env
# Shiplogic API Configuration
SHIPLOGIC_API_KEY=96f1b69f4a8646be8eb897218574437a
SHIPLOGIC_API_URL=https://api.shiplogic.com

# Existing variables (keep these)
DATABASE_URL="postgres://..."
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
YOCO_SECRET_KEY="sk_live_..."
YOCO_PUBLIC_KEY="pk_live_..."
PAYMENTS_MODE=live
```

## For Vercel Deployment

Add these environment variables in Vercel Dashboard:

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add:
   - **SHIPLOGIC_API_KEY**: `96f1b69f4a8646be8eb897218574437a`
   - **SHIPLOGIC_API_URL**: `https://api.shiplogic.com`

4. Select all environments (Production, Preview, Development)
5. Redeploy your application

---

## What's Been Implemented

✅ Shiplogic service created (`lib/shiplogic.ts`)
✅ Checkout integration updated
✅ Webhook handler created
✅ Fallback to mock shipping if Shiplogic fails
✅ Automatic shipment creation on order

---

## How It Works

1. Customer places order
2. Payment processed (Yoco)
3. **Shiplogic creates shipment automatically**
4. Tracking number saved to order
5. Customer receives tracking info
6. Shiplogic handles delivery
7. Webhook updates order status

---

## Testing

The integration will automatically:
- Try to create shipment with Shiplogic
- If Shiplogic fails, use fallback mock shipping
- Log all actions to console
- Save tracking number to order

Check your console logs for:
- `📦 Creating Shiplogic shipment for order: ...`
- `✅ Shiplogic shipment created: [tracking-number]`
- `❌ Shiplogic error, using fallback: ...` (if fails)

