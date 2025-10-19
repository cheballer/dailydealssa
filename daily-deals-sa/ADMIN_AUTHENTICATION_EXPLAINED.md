# 🔐 How Admin Authentication Works - Complete Explanation

## Overview

Your application uses a **role-based access control (RBAC)** system to determine if a user is an admin. Here's how it works step-by-step:

---

## 1. Database: User Roles

### UserRole Enum (in `prisma/schema.prisma`)

```prisma
enum UserRole {
  ADMIN
  USER
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  password      String?
  role          UserRole  @default(USER)  // ← Every user has a role
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}
```

**What this means:**
- Every user in the database has a `role` field
- The role can be either `ADMIN` or `USER`
- By default, new users are created as `USER`
- Only users with `role = "ADMIN"` can access admin pages

---

## 2. Authentication: Storing the Role

### Login Process (in `lib/auth.ts`)

When a user logs in, their role is stored in the session:

```typescript
// lib/auth.ts
export const authOptions: NextAuthOptions = {
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role  // ← Store role in JWT token
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!
        session.user.role = token.role as string  // ← Attach role to session
      }
      return session
    }
  }
}
```

**What happens:**
1. User logs in with email/password
2. System checks database for user
3. If password is correct, user data (including role) is returned
4. Role is stored in JWT token
5. Role is attached to the session object
6. Session is sent to browser (stored in cookie)

---

## 3. Protecting Admin Pages

### Using `requireAdmin()` (in `lib/auth-utils.ts`)

Admin pages use the `requireAdmin()` function to check permissions:

```typescript
// lib/auth-utils.ts
export async function requireAdmin() {
  const user = await getCurrentUser();  // Get current session
  
  if (!user) {
    redirect("/auth/signin");  // Not logged in → go to login
  }
  
  if (user.role !== "ADMIN") {
    redirect("/404");  // Not admin → show 404 error
  }
  
  return user;  // Is admin → allow access
}
```

**What happens:**
1. Function checks if user is logged in
2. If not logged in → redirect to sign-in page
3. If logged in but not admin → redirect to 404 page
4. If admin → return user and allow access

---

## 4. Using `requireAdmin()` in Pages

### Admin Dashboard Example

```typescript
// app/admin/page.tsx
import { requireAdmin } from "@/lib/auth-utils";

export default async function AdminDashboardPage() {
  await requireAdmin();  // ← Check if user is admin
  
  // This code only runs if user is admin
  return (
    <div>
      <h1>Admin Dashboard</h1>
      {/* Admin content */}
    </div>
  );
}
```

**What happens:**
1. Page loads
2. `requireAdmin()` runs first
3. If user is not admin → redirected to 404
4. If user is admin → page continues to render

---

### Admin Orders Example

```typescript
// app/admin/orders/page.tsx
import { requireAdmin } from "@/lib/auth-utils";

export default async function AdminOrdersPage() {
  await requireAdmin();  // ← Must be admin to see this
  
  const orders = await prisma.order.findMany();
  
  return (
    <div>
      <h1>Orders</h1>
      {/* Orders list */}
    </div>
  );
}
```

---

## 5. Showing Admin Links in UI

### Header Component (Client-Side Check)

```typescript
// components/header.tsx
'use client'

import { useSession } from "next-auth/react";

export function Header() {
  const { data: session } = useSession();
  
  // Check if current user is admin
  const isAdmin = session?.user?.role === "ADMIN";
  
  return (
    <header>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/products">Products</Link>
        
        {/* Only show admin link if user is admin */}
        {isAdmin && (
          <Link href="/admin">Admin Panel</Link>
        )}
      </nav>
      
      {session && (
        <DropdownMenu>
          <DropdownMenuContent>
            <Link href="/profile">Profile</Link>
            <Link href="/orders">Orders</Link>
            
            {/* Only show admin link in dropdown if user is admin */}
            {isAdmin && (
              <Link href="/admin">Admin Panel</Link>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </header>
  );
}
```

**What happens:**
1. `useSession()` gets current user's session
2. Checks if `session.user.role === "ADMIN"`
3. If admin → show admin link
4. If not admin → hide admin link

---

## 6. Protecting API Routes

### Admin API Example

```typescript
// app/api/admin/products/route.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  
  // Check if user is logged in
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  // Check if user is admin
  if (session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  
  // User is admin → allow access
  const products = await prisma.product.findMany();
  return NextResponse.json({ products });
}
```

**What happens:**
1. API route receives request
2. Gets current session
3. Checks if user is logged in (401 if not)
4. Checks if user is admin (403 if not)
5. If admin → process request and return data

---

## 7. Creating an Admin User

### Method 1: Using Prisma Studio (GUI)

1. Run: `npx prisma studio`
2. Open browser to `http://localhost:5555`
3. Go to `User` table
4. Find your user or create new one
5. Change `role` field to `ADMIN`
6. Save

### Method 2: Using Database Query

```typescript
// scripts/create-admin.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createAdmin() {
  const admin = await prisma.user.update({
    where: { email: 'your-email@example.com' },
    data: { role: 'ADMIN' }
  });
  
  console.log('Admin created:', admin);
}

createAdmin();
```

Run: `npx tsx scripts/create-admin.ts`

### Method 3: Using SQL (Direct Database)

```sql
-- Update existing user to admin
UPDATE "User" 
SET role = 'ADMIN' 
WHERE email = 'your-email@example.com';
```

---

## 8. Complete Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    USER LOGS IN                              │
│  Email: admin@example.com                                    │
│  Password: ********                                          │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│              CHECK DATABASE (lib/auth.ts)                    │
│  • Find user by email                                        │
│  • Verify password                                           │
│  • Get user data including role                              │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│              CREATE SESSION (NextAuth)                       │
│  • Store user.id, user.email, user.name, user.role          │
│  • Create JWT token with role                                │
│  • Send session to browser (cookie)                          │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│           USER TRIES TO ACCESS /admin                        │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│          CHECK PERMISSIONS (requireAdmin())                  │
│  • Get current session                                       │
│  • Check if user is logged in                                │
│  • Check if user.role === "ADMIN"                            │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
         ┌───────────┴───────────┐
         │                       │
         ▼                       ▼
┌─────────────────┐    ┌─────────────────┐
│  NOT ADMIN      │    │  IS ADMIN       │
│  → Redirect     │    │  → Allow Access │
│    to 404       │    │  → Show Page    │
└─────────────────┘    └─────────────────┘
```

---

## 9. Security Features

### ✅ What's Protected:

1. **Admin Pages** (`/admin/*`)
   - Dashboard
   - Products
   - Orders
   - Free Drops

2. **Admin API Routes** (`/api/admin/*`)
   - Create/Update/Delete products
   - View all orders
   - Manage free drops

3. **Admin Actions**
   - Upload images
   - Modify product stock
   - Update order status

### ✅ What Happens if Non-Admin Tries to Access:

1. **Direct URL Access** (`/admin`)
   - Server-side check with `requireAdmin()`
   - Redirected to 404 page
   - Never sees admin content

2. **API Route Access** (`/api/admin/products`)
   - Server-side check in route handler
   - Returns 403 Forbidden error
   - No data returned

3. **Client-Side Checks**
   - Admin links hidden from non-admins
   - Even if they guess the URL, server blocks them

---

## 10. Common Patterns

### Pattern 1: Server Component Protection

```typescript
// app/admin/page.tsx
import { requireAdmin } from "@/lib/auth-utils";

export default async function AdminPage() {
  await requireAdmin();  // ← Must be first line
  
  // Rest of component
}
```

### Pattern 2: API Route Protection

```typescript
// app/api/admin/route.ts
export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  
  // Process request
}
```

### Pattern 3: Client Component Check

```typescript
// components/some-component.tsx
'use client'

import { useSession } from "next-auth/react";

export function SomeComponent() {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";
  
  return (
    <div>
      {isAdmin && <AdminButton />}
    </div>
  );
}
```

---

## 11. Testing Admin Access

### Test 1: Check Current User Role

```typescript
// In any component or API route
const session = await getServerSession(authOptions);
console.log('User role:', session?.user?.role);
```

### Test 2: Check if User is Admin

```typescript
// In any component or API route
const isAdmin = await isAdmin();
console.log('Is admin:', isAdmin);
```

### Test 3: Try Accessing Admin Page

1. Log in as regular user
2. Try to visit `/admin`
3. Should be redirected to 404
4. Log in as admin
5. Visit `/admin`
6. Should see admin dashboard

---

## 12. Troubleshooting

### Problem: "I can't access admin pages"

**Solution:**
1. Check if your user has `role = "ADMIN"` in database
2. Log out and log back in (to refresh session)
3. Check browser console for errors

### Problem: "Admin link not showing"

**Solution:**
1. Make sure you're logged in
2. Check if `session.user.role === "ADMIN"`
3. Hard refresh page (Ctrl+Shift+R or Cmd+Shift+R)

### Problem: "Getting 404 on admin pages"

**Solution:**
This is correct behavior if you're not admin!
- Log in as admin user
- Or update your user role to ADMIN

---

## Summary

### How the App Knows You're Admin:

1. **Database**: Your user record has `role = "ADMIN"`
2. **Login**: Role is stored in your session
3. **Protection**: Pages check `session.user.role === "ADMIN"`
4. **Access**: If admin → allow, if not → block

### Key Files:

- `prisma/schema.prisma` - Defines UserRole enum
- `lib/auth.ts` - Stores role in session
- `lib/auth-utils.ts` - `requireAdmin()` function
- `app/admin/*` - Protected admin pages
- `components/header.tsx` - Shows/hides admin links

### Quick Check:

```typescript
// Is current user admin?
const session = await getServerSession(authOptions);
const isAdmin = session?.user?.role === "ADMIN";
```

---

**That's it!** The system is simple but secure:
- ✅ Role stored in database
- ✅ Role checked on every request
- ✅ Multiple layers of protection
- ✅ Non-admins can't access admin features

