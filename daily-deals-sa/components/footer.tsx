import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="mb-4">
              <Link href="/">
                <img 
                  src="/logo.png" 
                  alt="Daily Deals SA" 
                  className="h-12 w-auto"
                />
              </Link>
            </div>
            <p className="text-sm text-secondary-foreground/80 leading-relaxed">
              South Africa's premier destination for unbeatable daily deals on electronics, appliances, and more.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Shop</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/80">
              <li>
                <a href="/deals/today" className="hover:text-secondary-foreground transition-colors">
                  Today's Deals
                </a>
              </li>
              <li>
                <a href="/c/electronics" className="hover:text-secondary-foreground transition-colors">
                  Electronics
                </a>
              </li>
              <li>
                <a href="/c/appliances" className="hover:text-secondary-foreground transition-colors">
                  Appliances
                </a>
              </li>
              <li>
                <a href="/c/hardware" className="hover:text-secondary-foreground transition-colors">
                  Hardware
                </a>
              </li>
              <li>
                <a href="/categories" className="hover:text-secondary-foreground transition-colors">
                  All Categories
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Support</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/80">
              <li>
                <a href="#" className="hover:text-secondary-foreground transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary-foreground transition-colors">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary-foreground transition-colors">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary-foreground transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/80">
              <li>
                <a href="#" className="hover:text-secondary-foreground transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary-foreground transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary-foreground transition-colors">
                  Refund Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-secondary-foreground/20 pt-8 text-center text-sm text-secondary-foreground/60">
          <p>© 2025 Daily Deals SA. All rights reserved. Prices in South African Rand (ZAR).</p>
        </div>
      </div>
    </footer>
  )
}
