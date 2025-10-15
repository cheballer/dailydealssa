# 🏦 iKhokha Payment Integration

This document outlines the iKhokha payment gateway integration for Daily Deals SA.

## 🔑 Configuration

### Environment Variables
```env
IKHOKHA_APP_ID="IK7WXELYCOCXYDJ1LCK9ND6N7WVTXWJD"
IKHOKHA_APP_KEY="jG2HsRS43fyeOa3W5RfZbm3cBZRkLHUG"
```

### Your iKhokha Credentials
- **App ID**: `IK7WXELYCOCXYDJ1LCK9ND6N7WVTXWJD`
- **App Key**: `jG2HsRS43fyeOa3W5RfZbm3cBZRkLHUG`
- **Entity ID**: `dailyDeals-SA`

## 🏗️ Architecture

### Payment Flow
1. **Customer initiates checkout** → Fills shipping details
2. **Create payment request** → Generate iKhokha payment link
3. **Redirect to iKhokha** → Customer completes payment on secure iKhokha page
4. **Webhook callback** → iKhokha notifies our system of payment result
5. **Order update** → Update order status and clear cart
6. **Redirect to result page** → Success, failure, or cancel page

### Key Components

#### 1. iKhokha Service (`lib/ikhokha.ts`)
- **createPaymentLink()**: Creates secure payment links
- **getPaymentStatus()**: Checks payment status
- **verifyWebhookSignature()**: Validates webhook authenticity
- **createPaymentRequest()**: Helper for e-commerce payment requests

#### 2. Payment API (`app/api/checkout/create-payment/route.ts`)
- Creates order in database
- Generates iKhokha payment link
- Handles payment redirection

#### 3. Webhook Handler (`app/api/webhooks/ikhokha/route.ts`)
- Receives payment notifications from iKhokha
- Verifies webhook signatures
- Updates order status based on payment result

#### 4. Result Pages
- **Success**: `/checkout/success` - Payment completed
- **Failure**: `/checkout/failure` - Payment failed
- **Cancel**: `/checkout/cancel` - Payment cancelled

## 🔄 API Endpoints

### Create Payment
```
POST /api/checkout/create-payment
```
**Request Body:**
```json
{
  "items": [...],
  "total": 299.99,
  "userId": "user_id",
  "shippingInfo": {...}
}
```

**Response:**
```json
{
  "paylinkUrl": "https://securepay.ikhokha.red/...",
  "orderId": "order_id",
  "paylinkId": "paylink_id"
}
```

### Webhook Callback
```
POST /api/webhooks/ikhokha
```
**Headers:**
- `ik-appid`: Your application ID
- `ik-sign`: HMAC signature

**Body:**
```json
{
  "paylinkID": "paylink_id",
  "status": "SUCCESS|FAILURE",
  "externalTransactionID": "order_id",
  "responseCode": "00"
}
```

## 🛡️ Security Features

### Request Signing
All requests to iKhokha are signed using HMAC-SHA256:
```javascript
signature = HMAC-SHA256(path + requestBody, appKey)
```

### Webhook Verification
Webhooks are verified using the same signature algorithm to ensure authenticity.

### Environment-based Mode
- **Development**: `mode: "test"`
- **Production**: `mode: "live"`

## 💳 Payment Features

### Supported Payment Methods
- Credit/Debit Cards
- EFT/Bank Transfer
- Mobile Payments (via iKhokha's platform)

### Currency
- **ZAR** (South African Rand)
- Amounts in cents (e.g., R100.00 = 10000 cents)

### Transaction States
- **PENDING**: Payment link created, awaiting payment
- **SUCCESS**: Payment completed successfully
- **FAILURE**: Payment failed or declined
- **CANCELLED**: Customer cancelled payment

## 🔧 Integration Details

### Order Creation Process
1. Customer completes shipping form
2. Order created in database with `PENDING` status
3. iKhokha payment link generated
4. Customer redirected to iKhokha payment page
5. Webhook updates order status based on payment result

### Database Updates
- **Order Status**: `PENDING` → `CONFIRMED` (on success)
- **Payment Status**: `PENDING` → `PAID` (on success)
- **Payment Intent ID**: Stores iKhokha `paylinkID`

### Cart Management
- Cart is cleared only after successful payment
- Failed payments preserve cart items

## 📱 User Experience

### Checkout Flow
1. **Shipping Form** → Customer enters delivery details
2. **Payment Button** → "Pay R299.99" with iKhokha branding
3. **Secure Redirect** → Customer goes to iKhokha's secure page
4. **Payment Completion** → Customer completes payment on iKhokha
5. **Return to Store** → Redirected back with payment result

### Result Pages
- **Success Page**: Order confirmation with details
- **Failure Page**: Error explanation and retry options
- **Cancel Page**: Cancellation confirmation with cart preservation

## 🔍 Testing

### Test Payment Flow
1. Add items to cart
2. Proceed to checkout
3. Fill shipping details
4. Click "Pay" button
5. Complete payment on iKhokha test environment
6. Verify order status update via webhook

### Webhook Testing
Use tools like ngrok to test webhook callbacks locally:
```bash
ngrok http 3000
# Use https://your-ngrok-url.ngrok.io/api/webhooks/ikhokha as callback URL
```

## 🚀 Deployment

### Production Setup
1. Update `NEXTAUTH_URL` to production domain
2. Ensure webhook URL is accessible: `https://yourdomain.com/api/webhooks/ikhokha`
3. Verify iKhokha credentials are correct
4. Test payment flow in production

### Environment Variables for Production
```env
NEXTAUTH_URL="https://yourdomain.vercel.app"
IKHOKHA_APP_ID="IK7WXELYCOCXYDJ1LCK9ND6N7WVTXWJD"
IKHOKHA_APP_KEY="jG2HsRS43fyeOa3W5RfZbm3cBZRkLHUG"
```

## 📊 Monitoring

### Logging
- Payment creation attempts
- Webhook callbacks received
- Order status updates
- Error conditions

### Key Metrics to Monitor
- Payment success rate
- Webhook delivery success
- Order completion rate
- Average payment processing time

## 🔧 Troubleshooting

### Common Issues

1. **Payment Link Creation Fails**
   - Check iKhokha credentials
   - Verify request signature
   - Ensure valid order data

2. **Webhook Not Received**
   - Verify webhook URL is accessible
   - Check webhook signature verification
   - Ensure proper headers are sent

3. **Order Status Not Updated**
   - Check webhook processing
   - Verify order ID matching
   - Check database connection

### Debug Steps
1. Check application logs
2. Verify iKhokha dashboard for payment status
3. Test webhook endpoint manually
4. Verify environment variables

## 📞 Support

### iKhokha Support
- **Documentation**: iKhokha API docs
- **Dashboard**: Merchant portal for transaction history
- **Support**: Contact iKhokha support for payment issues

### Store Support
- **Email**: support@dailydeals-sa.com
- **Technical Issues**: Check logs and webhook status
- **Payment Issues**: Verify with iKhokha dashboard

---

This integration provides a secure, South African-focused payment solution for Daily Deals SA with comprehensive error handling and user experience optimization.
