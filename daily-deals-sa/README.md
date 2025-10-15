# Daily Deals SA - E-commerce Store

A modern, full-featured e-commerce store built with Next.js 15, featuring admin management, payment processing, and courier integration.

## 🚀 Features

### Core E-commerce Features
- **Product Catalog**: Browse products with categories and search
- **Shopping Cart**: Add/remove items with quantity management
- **User Authentication**: Sign up, sign in with email/password or Google OAuth
- **Order Management**: Complete order flow with status tracking
- **Payment Processing**: iKhokha integration for secure South African payments

### Admin Features
- **Dashboard**: Overview of sales, orders, and products
- **Product Management**: Add, edit, delete products with images
- **Order Management**: View and update order status
- **User Management**: View registered users
- **Shipping Management**: Integrate with courier services

### Technical Features
- **Role-based Access**: Admin and User roles
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with multiple providers
- **Payment Gateway**: Stripe integration
- **Courier Integration**: Shipping and tracking system
- **Real-time Updates**: Live order status updates

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn/ui components
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Payments**: iKhokha (South African payment gateway)
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Stripe account
- Google OAuth credentials (optional)

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <repository-url>
cd daily-deals-sa
npm install --legacy-peer-deps
```

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/dailydeals"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# OAuth Providers (optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Stripe
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Email (for notifications)
EMAIL_FROM="noreply@dailydeals-sa.com"
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"

# Courier Service
POSTNET_API_KEY="your-postnet-api-key"
POSTNET_API_URL="https://api.postnet.co.za"
```

### 3. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed the database (optional)
npx prisma db seed
```

### 4. Create Admin User

Run this script to create an admin user:

```bash
npx tsx scripts/create-admin.ts
```

### 5. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your store!

## 🗄️ Database Schema

The application uses the following main models:

- **User**: Customer and admin accounts
- **Product**: Store inventory
- **Order**: Customer orders
- **CartItem**: Shopping cart items
- **Address**: Shipping/billing addresses
- **Coupon**: Discount codes

## 🔐 Authentication & Authorization

### User Roles
- **USER**: Can browse, add to cart, and place orders
- **ADMIN**: Full access to admin panel and management features

### Authentication Methods
- Email/Password registration and login
- Google OAuth integration
- Session management with NextAuth.js

## 💳 Payment Integration

### Stripe Setup
1. Create a Stripe account
2. Get your API keys from the dashboard
3. Set up webhooks for payment confirmation
4. Configure your webhook endpoint: `/api/webhooks/stripe`

### Supported Payment Methods
- Credit/Debit cards
- South African Rand (ZAR) currency
- Secure payment processing

## 📦 Shipping & Courier Integration

### Supported Courier Services
- PostNet
- Aramex
- Fastway
- DHL

### Features
- Shipping cost calculation
- Tracking number generation
- Delivery status updates
- Estimated delivery dates

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure environment variables

3. **Set Environment Variables**:
   Add all the environment variables from your `.env.local` file to Vercel's environment settings.

4. **Database Setup**:
   - Use Vercel Postgres or any PostgreSQL provider
   - Run migrations: `npx prisma migrate deploy`

### Environment Variables for Production

```env
DATABASE_URL="postgresql://user:pass@host:port/db"
NEXTAUTH_URL="https://your-domain.vercel.app"
NEXTAUTH_SECRET="production-secret"
STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

## 📱 Admin Panel

Access the admin panel at `/admin` with an admin account:

- **Dashboard**: Sales overview and statistics
- **Products**: Manage inventory
- **Orders**: Process and track orders
- **Users**: View customer accounts
- **Shipping**: Manage courier services
- **Settings**: Configure store settings

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/signin` - User sign in

### Products
- `GET /api/products` - Get all products
- `POST /api/admin/products` - Create product (admin)
- `PUT /api/admin/products/[id]` - Update product (admin)
- `DELETE /api/admin/products/[id]` - Delete product (admin)

### Orders
- `POST /api/checkout/create-payment-intent` - Create payment
- `GET /api/admin/orders` - Get all orders (admin)
- `PUT /api/admin/orders/[id]/shipping` - Update shipping (admin)

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `DELETE /api/cart/[id]` - Remove item from cart

## 🎨 Customization

### Styling
- Modify `tailwind.config.js` for theme customization
- Update component styles in `components/ui/`
- Customize colors and fonts in `app/globals.css`

### Features
- Add new product categories
- Integrate additional payment methods
- Add more courier services
- Implement discount codes
- Add product reviews and ratings

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**:
   - Verify DATABASE_URL is correct
   - Ensure PostgreSQL is running
   - Run `npx prisma generate` after schema changes

2. **Authentication Issues**:
   - Check NEXTAUTH_SECRET is set
   - Verify OAuth credentials if using Google sign-in

3. **Payment Failures**:
   - Verify Stripe keys are correct
   - Check webhook endpoint configuration
   - Ensure HTTPS in production

4. **Build Errors**:
   - Run `npm install --legacy-peer-deps`
   - Clear `.next` folder and rebuild

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Contact: support@dailydeals-sa.com

---

Built with ❤️ for South African e-commerce
