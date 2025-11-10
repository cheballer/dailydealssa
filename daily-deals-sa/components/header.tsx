"use client"

import {
  ShoppingCart,
  Menu,
  Search,
  ChevronDown,
  Phone,
  LifeBuoy,
  Store,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { CATEGORIES } from "@/lib/constants"

export function Header() {
  const { data: session, status } = useSession()
  const router = useRouter()
  // @ts-ignore - session user has role field from our extended session
  const isAdmin = session?.user?.role === "ADMIN"
  const [mobileDepartmentsOpen, setMobileDepartmentsOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    // Get cart count from localStorage with user-specific key
    const updateCartCount = () => {
      // If not logged in, show 0 cart count
      if (!session) {
        setCartCount(0)
        return
      }

      const userId = session.user.id
      const cartKey = `cart_${userId}`
      const cart = localStorage.getItem(cartKey)
      if (cart) {
        const items = JSON.parse(cart)
        const total = items.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0)
        setCartCount(total)
      } else {
        setCartCount(0)
      }
    }

    // Initial load
    updateCartCount()

    // Listen for storage changes (when cart is updated)
    window.addEventListener('storage', updateCartCount)
    
    // Custom event for same-tab updates
    window.addEventListener('cartUpdated', updateCartCount)

    return () => {
      window.removeEventListener('storage', updateCartCount)
      window.removeEventListener('cartUpdated', updateCartCount)
    }
  }, [session])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="border-b bg-muted/40 text-xs">
        <div className="container mx-auto flex h-9 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link href="/contact" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <Phone className="h-3.5 w-3.5" />
              Need help? 021 000 0000
            </Link>
            <Link href="/faq" className="hidden items-center gap-2 text-muted-foreground hover:text-foreground md:flex">
              <LifeBuoy className="h-3.5 w-3.5" />
              Help Centre
            </Link>
            <Link href="/sell-with-us" className="hidden items-center gap-2 text-muted-foreground hover:text-foreground md:flex">
              <Store className="h-3.5 w-3.5" />
              Sell on DailyDealzSA
            </Link>
          </div>
          <div className="flex items-center gap-3">
            {session ? (
              <>
                <Link href="/orders" className="text-muted-foreground hover:text-foreground">
                  Orders
                </Link>
                <Link href="/profile" className="text-muted-foreground hover:text-foreground">
                  My Account
                </Link>
              </>
            ) : (
              <>
                <Link href="/auth/signin" className="text-muted-foreground hover:text-foreground">
                  Sign In
                </Link>
                <span className="text-muted-foreground">/</span>
                <Link href="/auth/signup" className="text-muted-foreground hover:text-foreground">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="border-b bg-background">
        <div className="container mx-auto flex h-16 items-center gap-4 px-4">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <img
              src="/logo.png"
              alt="DailyDealzSA"
              className="h-10 w-auto"
            />
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="hidden items-center gap-2 whitespace-nowrap lg:flex"
              >
                Shop by Department
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64">
              <DropdownMenuLabel className="text-xs uppercase text-muted-foreground">
                Popular categories
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {CATEGORIES.slice(0, 10).map((category) => (
                <DropdownMenuItem key={category.slug} asChild>
                  <Link href={`/c/${category.slug}`} className="flex items-center gap-2">
                    <span className="text-lg">{category.icon}</span>
                    <span>{category.name}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/categories">View all categories</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog open={mobileDepartmentsOpen} onOpenChange={setMobileDepartmentsOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 rounded-lg lg:hidden"
              >
                <Menu className="h-4 w-4" />
                Categories
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md p-0">
              <DialogHeader className="border-b p-5">
                <DialogTitle className="text-lg font-semibold" style={{ fontFamily: "var(--font-display)" }}>
                  Shop by Department
                </DialogTitle>
              </DialogHeader>
              <div className="max-h-[70vh] overflow-y-auto p-5">
                <div className="grid gap-3">
                  {CATEGORIES.map((category) => (
                    <Button
                      key={category.slug}
                      variant="ghost"
                      className="justify-start text-base text-[#152548]"
                      onClick={() => {
                        setMobileDepartmentsOpen(false)
                        router.push(`/c/${category.slug}`)
                      }}
                    >
                      <span className="mr-3 text-lg">{category.icon}</span>
                      {category.name}
                    </Button>
                  ))}
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <form onSubmit={handleSearch} className="flex flex-1 items-center">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for products, brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-11 w-full rounded-md pl-10 pr-4"
              />
            </div>
          </form>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link href="/checkout">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {cartCount}
                  </span>
                )}
              </Link>
            </Button>

            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
                      <AvatarFallback>
                        {session.user?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {session.user?.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {session.user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders">Orders</Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin">Admin Panel</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : status !== "loading" ? (
              <div className="flex items-center gap-2">
                <Button variant="ghost" asChild>
                  <Link href="/auth/signin">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link href="/auth/signup">Sign Up</Link>
                </Button>
              </div>
            ) : null}

            {/* Mobile menu handled by the categories dialog */}
          </div>
        </div>
      </div>

      <div className="hidden border-b bg-muted/20 lg:block">
        <div className="container mx-auto flex items-center gap-6 overflow-x-auto px-4 py-2 text-sm text-muted-foreground">
          <Link href="/deals/today" className="font-medium text-foreground hover:text-primary">
            Today's Deals
          </Link>
          {CATEGORIES.slice(0, 8).map((category) => (
            <Link
              key={category.slug}
              href={`/c/${category.slug}`}
              className="whitespace-nowrap transition-colors hover:text-primary"
            >
              {category.name}
            </Link>
          ))}
          <Link href="/categories" className="whitespace-nowrap transition-colors hover:text-primary">
            Browse Categories
          </Link>
        </div>
      </div>
    </header>
  )
}
