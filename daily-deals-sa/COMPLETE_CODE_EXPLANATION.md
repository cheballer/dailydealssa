# 📚 Complete Code Explanation for Beginners

## Table of Contents
1. [What is Next.js?](#what-is-nextjs)
2. [Understanding File Types](#understanding-file-types)
3. [Project Structure](#project-structure)
4. [Frontend Explained](#frontend-explained)
5. [Backend Explained](#backend-explained)
6. [How Everything Works Together](#how-everything-works-together)
7. [Key Concepts](#key-concepts)

---

## What is Next.js?

**Next.js** is a framework for building websites and web applications using **React** (a JavaScript library for creating user interfaces).

### Think of it like this:
- **HTML/CSS/JavaScript** = Basic building materials (bricks, wood, nails)
- **React** = A pre-built house frame that makes building easier
- **Next.js** = A complete construction system with plumbing, electricity, and all utilities included

### Why Next.js?
- ✅ **Fast**: Pages load quickly
- ✅ **SEO Friendly**: Search engines can read your pages
- ✅ **Full-Stack**: Can build both frontend (what users see) and backend (server logic) in one project
- ✅ **Easy Routing**: Creating pages is simple
- ✅ **Automatic Optimization**: Images, fonts, and code are optimized automatically

---

## Understanding File Types

### 1. `.tsx` Files (TypeScript + JSX)

**What is it?**
- `.tsx` = TypeScript + JSX (JavaScript XML)
- Used for creating **components** (reusable pieces of UI)

**Example:**
```tsx
// This is a React component
export function Button() {
  return (
    <button className="bg-blue-500 text-white p-2">
      Click Me
    </button>
  );
}
```

**What's happening?**
- `export function Button()` = Creates a reusable button component
- `return (...)` = Returns HTML-like code (JSX)
- This button can be used anywhere in your app

---

### 2. `.ts` Files (TypeScript)

**What is it?**
- `.ts` = TypeScript (JavaScript with type safety)
- Used for **logic**, **utilities**, and **API routes**
- NO HTML/JSX - just pure code

**Example:**
```typescript
// This is a utility function
export function calculateTotal(items: CartItem[]): number {
  let total = 0;
  for (const item of items) {
    total += item.price * item.quantity;
  }
  return total;
}
```

**What's happening?**
- `items: CartItem[]` = Takes an array of cart items
- `: number` = Returns a number
- This function calculates the total price

---

### 3. `.prisma` Files (Database Schema)

**What is it?**
- `.prisma` = Database schema definition
- Defines your database structure (tables, columns, relationships)

**Example:**
```prisma
model User {
  id    String   @id @default(cuid())
  name  String?
  email String   @unique
  orders Order[]
}
```

**What's happening?**
- `model User` = Creates a User table in the database
- `id`, `name`, `email` = Columns in the table
- `@id` = This is the primary key
- `@unique` = No two users can have the same email
- `orders Order[]` = One user can have many orders (relationship)

---

## Project Structure

```
daily-deals-sa/
├── app/                    # All pages and routes
│   ├── page.tsx           # Home page (/)
│   ├── layout.tsx         # Main layout (wraps all pages)
│   ├── api/               # Backend API routes
│   ├── admin/             # Admin pages
│   ├── products/          # Product pages
│   └── checkout/          # Checkout pages
├── components/            # Reusable UI components
│   ├── header.tsx        # Top navigation
│   ├── footer.tsx        # Bottom navigation
│   └── ui/               # Basic UI elements (buttons, cards, etc.)
├── lib/                   # Utility functions and services
│   ├── db.ts             # Database connection
│   ├── auth.ts           # Authentication logic
│   └── yoco.ts           # Payment processing
├── prisma/                # Database schema
│   └── schema.prisma     # Database structure
├── contexts/              # React contexts (global state)
├── hooks/                 # Custom React hooks
└── public/                # Static files (images, etc.)
```

---

## Frontend Explained

### What is Frontend?
**Frontend** = Everything the user sees and interacts with in their browser.

### Frontend Components

#### 1. **Pages** (`app/*/page.tsx`)

**What are they?**
- Each `page.tsx` file creates a route (URL) in your app
- Example: `app/contact/page.tsx` = `/contact` URL

**Example - Contact Page:**
```tsx
// app/contact/page.tsx
export default function ContactPage() {
  return (
    <div className="container">
      <h1>Contact Us</h1>
      <form>
        <input type="text" placeholder="Your name" />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
```

**What's happening?**
- `export default function ContactPage()` = Creates a page component
- Returns JSX (HTML-like code)
- This becomes the `/contact` page

---

#### 2. **Layouts** (`app/layout.tsx`)

**What are they?**
- Wraps all pages
- Contains common elements (header, footer, navigation)
- Applied to all pages automatically

**Example:**
```tsx
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Header />           {/* Shows on every page */}
        <main>{children}</main>  {/* Current page content */}
        <Footer />           {/* Shows on every page */}
      </body>
    </html>
  );
}
```

**What's happening?**
- `{children}` = The current page being viewed
- Header and Footer appear on every page
- Layout wraps all pages

---

#### 3. **Components** (`components/*.tsx`)

**What are they?**
- Reusable pieces of UI
- Can be used in multiple pages
- Makes code DRY (Don't Repeat Yourself)

**Example - Header Component:**
```tsx
// components/header.tsx
export function Header() {
  return (
    <header className="sticky top-0">
      <div className="container">
        <Link href="/">Daily Deals SA</Link>
        <nav>
          <Link href="/products">Products</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
```

**What's happening?**
- Creates a reusable header
- Can be imported and used anywhere: `<Header />`
- Contains navigation links

---

#### 4. **UI Components** (`components/ui/*.tsx`)

**What are they?**
- Basic building blocks (buttons, cards, inputs, etc.)
- From shadcn/ui library
- Highly customizable

**Example - Button Component:**
```tsx
// components/ui/button.tsx
export function Button({ children, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="bg-primary text-white px-4 py-2 rounded"
    >
      {children}
    </button>
  );
}
```

**Usage:**
```tsx
<Button onClick={handleClick}>Click Me</Button>
```

---

#### 5. **Client Components** (`'use client'`)

**What are they?**
- Components that use interactivity (buttons, forms, state)
- Run in the browser (client-side)
- Can use React hooks (useState, useEffect, etc.)

**Example:**
```tsx
'use client'  // ← This makes it a client component

import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);  // State

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

**What's happening?**
- `'use client'` = Runs in browser (not on server)
- `useState(0)` = Creates state starting at 0
- `setCount(count + 1)` = Updates state when clicked
- State changes trigger re-render

---

#### 6. **Server Components** (Default)

**What are they?**
- Components that run on the server
- Can fetch data directly
- No `'use client'` directive
- Better performance

**Example:**
```tsx
// No 'use client' = Server Component
import { prisma } from '@/lib/db';

export default async function ProductsPage() {
  // Fetch data directly from database
  const products = await prisma.product.findMany();
  
  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

**What's happening?**
- Runs on server before page loads
- Fetches data from database
- HTML sent to browser (faster)
- No client-side JavaScript needed

---

## Backend Explained

### What is Backend?
**Backend** = Server-side logic (database, authentication, API, etc.)
- Runs on server (not in browser)
- Handles data processing
- Manages security

---

### Backend Components

#### 1. **API Routes** (`app/api/*/route.ts`)

**What are they?**
- Server-side endpoints
- Handle HTTP requests (GET, POST, PUT, DELETE)
- Process data and return responses

**Example - Get Products API:**
```typescript
// app/api/products/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    // Fetch products from database
    const products = await prisma.product.findMany({
      where: { active: true }
    });
    
    // Return JSON response
    return NextResponse.json({ products });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
```

**What's happening?**
1. `GET` = Handles GET requests to `/api/products`
2. `prisma.product.findMany()` = Fetches products from database
3. `NextResponse.json()` = Returns JSON data
4. Frontend can call this endpoint to get products

**How Frontend Uses It:**
```tsx
// In a component
const response = await fetch('/api/products');
const data = await response.json();
console.log(data.products); // Array of products
```

---

#### 2. **POST Route** (Creating Data)

**Example - Create Order:**
```typescript
// app/api/orders/route.ts
export async function POST(request: NextRequest) {
  try {
    // Get data from request body
    const { userId, items, total } = await request.json();
    
    // Create order in database
    const order = await prisma.order.create({
      data: {
        userId,
        items: {
          create: items.map(item => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price
          }))
        },
        total
      }
    });
    
    return NextResponse.json({ order });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
```

**What's happening?**
1. Receives order data from frontend
2. Creates order in database
3. Returns created order
4. Frontend shows success message

**How Frontend Uses It:**
```tsx
const response = await fetch('/api/orders', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: user.id,
    items: cartItems,
    total: 500
  })
});
```

---

#### 3. **Authentication** (`lib/auth.ts`)

**What is it?**
- Verifies user identity
- Manages login/logout
- Protects routes

**Example:**
```typescript
// lib/auth.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Check if user exists
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });
        
        // Verify password
        if (user && verifyPassword(credentials.password, user.password)) {
          return user;
        }
        return null;
      }
    })
  ]
};
```

**What's happening?**
1. User enters email/password
2. `authorize()` checks database
3. If valid, returns user
4. Session created
5. User is logged in

---

#### 4. **Database** (`lib/db.ts`)

**What is it?**
- Connection to database
- Prisma client instance
- Used to query data

**Example:**
```typescript
// lib/db.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
};

export const db = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db;
}
```

**What's happening?**
1. Creates Prisma client
2. Reuses same instance in development
3. Exports as `db`
4. Used everywhere to access database

**Usage:**
```typescript
// Fetch users
const users = await db.user.findMany();

// Create user
const user = await db.user.create({
  data: { name: "John", email: "john@example.com" }
});

// Update user
await db.user.update({
  where: { id: "123" },
  data: { name: "Jane" }
});

// Delete user
await db.user.delete({
  where: { id: "123" }
});
```

---

#### 5. **Payment Processing** (`lib/yoco.ts`)

**What is it?**
- Integrates with Yoco payment gateway
- Creates payment links
- Handles transactions

**Example:**
```typescript
// lib/yoco.ts
export class YocoService {
  private apiKey: string;
  private apiUrl: string;
  
  constructor() {
    this.apiKey = process.env.YOCO_SECRET_KEY;
    this.apiUrl = 'https://api.yoco.com/v1';
  }
  
  async createCheckout(amount: number, orderId: string) {
    const response = await fetch(`${this.apiUrl}/checkouts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: amount * 100, // Convert to cents
        currency: 'ZAR',
        successUrl: `${process.env.NEXTAUTH_URL}/checkout/success`,
        cancelUrl: `${process.env.NEXTAUTH_URL}/checkout/cancel`,
        metadata: { orderId }
      })
    });
    
    return await response.json();
  }
}
```

**What's happening?**
1. Creates checkout session with Yoco
2. Returns payment link
3. User redirected to payment page
4. After payment, redirected back to success/cancel page

---

## How Everything Works Together

### Example: User Adds Item to Cart

```
1. USER ACTION
   ↓
   User clicks "Add to Cart" button
   ↓
2. FRONTEND (ProductCard Component)
   ↓
   'use client' component handles click
   ↓
   handleAddToCart() function runs
   ↓
   Gets user ID from session
   ↓
   Saves to localStorage with key: cart_${userId}
   ↓
   Dispatches 'cartUpdated' event
   ↓
3. HEADER COMPONENT
   ↓
   Listens for 'cartUpdated' event
   ↓
   Reads cart from localStorage
   ↓
   Updates cart count badge
   ↓
4. USER SEES
   ↓
   Cart icon shows new count
```

---

### Example: User Checks Out

```
1. USER ACTION
   ↓
   User clicks "Checkout" button
   ↓
2. FRONTEND (Checkout Page)
   ↓
   Collects cart items and shipping info
   ↓
   Sends POST request to /api/checkout/create-payment
   ↓
3. BACKEND (API Route)
   ↓
   app/api/checkout/create-payment/route.ts
   ↓
   Validates user session
   ↓
   Creates order in database
   ↓
   Calls YocoService.createCheckout()
   ↓
   Returns payment link
   ↓
4. FRONTEND
   ↓
   Redirects user to Yoco payment page
   ↓
5. USER
   ↓
   Enters payment details
   ↓
   Completes payment
   ↓
6. YOCO
   ↓
   Redirects to success/cancel page
   ↓
7. BACKEND
   ↓
   Updates order status in database
   ↓
   Sends confirmation email
   ↓
8. USER SEES
   ↓
   Order confirmation page
```

---

## Key Concepts

### 1. **State Management**

**What is it?**
- State = Data that can change
- When state changes, UI updates

**Example:**
```tsx
const [count, setCount] = useState(0);

// count = current value (0)
// setCount = function to update value
// useState(0) = initial value

<button onClick={() => setCount(count + 1)}>
  Count: {count}
</button>
```

---

### 2. **Props**

**What are they?**
- Data passed from parent to child component
- Like function parameters

**Example:**
```tsx
// Parent component
<ProductCard product={myProduct} />

// Child component
function ProductCard({ product }) {
  return <div>{product.name}</div>;
}
```

---

### 3. **Hooks**

**What are they?**
- Special functions that start with `use`
- Add functionality to components

**Common Hooks:**
```tsx
// useState - Manage state
const [value, setValue] = useState(0);

// useEffect - Run code after render
useEffect(() => {
  console.log('Component mounted');
}, []);

// useSession - Get user session
const { data: session } = useSession();

// useRouter - Navigate between pages
const router = useRouter();
router.push('/products');
```

---

### 4. **Context**

**What is it?**
- Share data across components
- Avoid "prop drilling" (passing props through many components)

**Example:**
```tsx
// Create context
const CartContext = createContext();

// Provide context
<CartProvider>
  <App />
</CartProvider>

// Use context
const { items, addItem } = useCart();
```

---

### 5. **Environment Variables**

**What are they?**
- Secret keys and configuration
- Stored in `.env.local` file
- Never committed to git

**Example:**
```env
# .env.local
DATABASE_URL="postgres://..."
YOCO_SECRET_KEY="sk_live_..."
NEXTAUTH_SECRET="your-secret-key"
```

**Usage:**
```typescript
const apiKey = process.env.YOCO_SECRET_KEY;
```

---

### 6. **Database Relationships**

**What are they?**
- How tables connect to each other

**Example:**
```prisma
model User {
  id    String   @id
  name  String
  orders Order[]  // One user has many orders
}

model Order {
  id     String @id
  userId String
  user   User   @relation(fields: [userId], references: [id])
  // One order belongs to one user
}
```

**Types of Relationships:**
- **One-to-Many**: One user has many orders
- **Many-to-Many**: Products can have multiple categories
- **One-to-One**: One user has one profile

---

### 7. **Middleware**

**What is it?**
- Code that runs before requests
- Used for authentication, logging, etc.

**Example:**
```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  // Check if user is authenticated
  const session = await getToken({ req: request });
  
  if (!session && request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }
}
```

---

### 8. **Server Actions**

**What are they?**
- Functions that run on server
- Can be called directly from components
- Alternative to API routes

**Example:**
```typescript
// app/actions.ts
'use server'

export async function createProduct(formData: FormData) {
  const name = formData.get('name');
  const price = formData.get('price');
  
  await db.product.create({
    data: { name, price }
  });
}
```

**Usage:**
```tsx
<form action={createProduct}>
  <input name="name" />
  <input name="price" />
  <button>Submit</button>
</form>
```

---

## Common Patterns

### 1. **Protected Routes**

```tsx
// app/admin/page.tsx
import { requireAdmin } from '@/lib/auth-utils';

export default async function AdminPage() {
  await requireAdmin(); // Returns 404 if not admin
  
  return <div>Admin Content</div>;
}
```

---

### 2. **Data Fetching**

```tsx
// Server Component (recommended)
export default async function ProductsPage() {
  const products = await prisma.product.findMany();
  
  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

---

### 3. **Form Handling**

```tsx
'use client'

export function ContactForm() {
  const [email, setEmail] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    
    if (response.ok) {
      alert('Success!');
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

---

### 4. **Error Handling**

```tsx
try {
  const response = await fetch('/api/products');
  const data = await response.json();
} catch (error) {
  console.error('Error:', error);
  toast.error('Failed to load products');
}
```

---

## File-by-File Breakdown

### Frontend Files

#### `app/page.tsx` - Home Page
```tsx
import { HeroSection } from "@/components/hero-section"
import { DailyDeals } from "@/components/daily-deals"
import { ProductGrid } from "@/components/product-grid"

export default function Home() {
  return (
    <div>
      <HeroSection />      {/* Hero banner */}
      <DailyDeals />       {/* Featured deals */}
      <ProductGrid />      {/* Product grid */}
    </div>
  );
}
```
**What it does:** Renders the home page with hero, deals, and products.

---

#### `components/header.tsx` - Navigation
```tsx
'use client'

export function Header() {
  const { data: session } = useSession();
  const [cartCount, setCartCount] = useState(0);
  
  // Get cart count from localStorage
  useEffect(() => {
    const cart = localStorage.getItem(`cart_${session?.user?.id}`);
    setCartCount(JSON.parse(cart).length);
  }, [session]);
  
  return (
    <header>
      <Link href="/">Logo</Link>
      <nav>
        <Link href="/products">Products</Link>
        <Link href="/contact">Contact</Link>
      </nav>
      <Link href="/checkout">
        Cart ({cartCount})
      </Link>
    </header>
  );
}
```
**What it does:** Shows navigation, user menu, and cart count.

---

#### `components/product-card.tsx` - Product Display
```tsx
'use client'

export function ProductCard({ product }) {
  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    toast.success('Added to cart!');
  };
  
  return (
    <Card>
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>R{product.price}</p>
      <button onClick={handleAddToCart}>
        Add to Cart
      </button>
    </Card>
  );
}
```
**What it does:** Displays a product and allows adding to cart.

---

### Backend Files

#### `app/api/products/route.ts` - Products API
```typescript
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  const products = await prisma.product.findMany({
    where: { active: true }
  });
  
  return NextResponse.json({ products });
}
```
**What it does:** Returns all active products from database.

---

#### `app/api/checkout/create-payment/route.ts` - Payment API
```typescript
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const { items, total } = await request.json();
  
  // Create order
  const order = await db.order.create({
    data: {
      userId: session.user.id,
      items: { create: items },
      total
    }
  });
  
  // Create payment
  const checkout = await yocoService.createCheckout(total, order.id);
  
  return NextResponse.json({ paylinkUrl: checkout.redirectUrl });
}
```
**What it does:** Creates order and payment link.

---

#### `lib/auth.ts` - Authentication
```typescript
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });
        
        if (user && verifyPassword(credentials.password, user.password)) {
          return user;
        }
        return null;
      }
    })
  ]
};
```
**What it does:** Handles user login with email/password.

---

#### `lib/db.ts` - Database Connection
```typescript
import { PrismaClient } from '@prisma/client';

export const db = new PrismaClient();
```
**What it does:** Creates database connection for queries.

---

#### `prisma/schema.prisma` - Database Schema
```prisma
model Product {
  id          String   @id @default(cuid())
  name        String
  price       Float
  stock       Int
  active      Boolean  @default(true)
  createdAt   DateTime @default(now())
  orders      OrderItem[]
}

model Order {
  id        String      @id @default(cuid())
  userId    String
  user      User        @relation(fields: [userId], references: [id])
  items     OrderItem[]
  total     Float
  status    OrderStatus @default(PENDING)
  createdAt DateTime    @default(now())
}

model User {
  id      String   @id @default(cuid())
  email   String   @unique
  name    String?
  orders  Order[]
}
```
**What it does:** Defines database structure and relationships.

---

## Summary

### Frontend (What Users See)
- **Pages**: Routes users visit (`/products`, `/contact`)
- **Components**: Reusable UI pieces (buttons, cards, forms)
- **Client Components**: Interactive elements with state
- **Server Components**: Fast pages with server-side data

### Backend (Server Logic)
- **API Routes**: Endpoints for data operations
- **Database**: Stores and retrieves data
- **Authentication**: Verifies user identity
- **Payment**: Processes transactions

### How They Connect
1. User clicks button (Frontend)
2. Component calls API (Frontend → Backend)
3. API queries database (Backend)
4. API returns data (Backend → Frontend)
5. Component displays data (Frontend)

---

## Quick Reference

### File Types
- `.tsx` = TypeScript + JSX (components with HTML)
- `.ts` = TypeScript (logic, no HTML)
- `.prisma` = Database schema

### Directories
- `app/` = Pages and routes
- `components/` = Reusable UI
- `lib/` = Utilities and services
- `prisma/` = Database

### Key Concepts
- **State**: Data that changes
- **Props**: Data passed to components
- **Hooks**: Add functionality
- **Context**: Share data globally
- **API Routes**: Backend endpoints
- **Database**: Data storage

---

## Learning Path

1. **Start with HTML/CSS/JavaScript**
2. **Learn React basics** (components, props, state)
3. **Learn Next.js** (pages, routing, data fetching)
4. **Learn TypeScript** (types, interfaces)
5. **Learn Prisma** (database queries)
6. **Learn Authentication** (NextAuth.js)
7. **Build projects** (practice makes perfect!)

---

**Remember:** Programming is like learning a language. Start simple, practice often, and don't be afraid to make mistakes. Every error is a learning opportunity! 🚀

