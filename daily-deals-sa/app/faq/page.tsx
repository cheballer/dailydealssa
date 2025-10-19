import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { HelpCircle } from "lucide-react"

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <HelpCircle className="h-16 w-16 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about Daily Deals SA
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>General Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="what-is-daily-deals">
                <AccordionTrigger>What is Daily Deals SA?</AccordionTrigger>
                <AccordionContent>
                  Daily Deals SA is South Africa's premier online marketplace for unbeatable 
                  daily deals on electronics, appliances, hardware, and more. We offer new 
                  deals every 24 hours plus 10 free items daily!
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="how-do-free-drops-work">
                <AccordionTrigger>How do the daily free drops work?</AccordionTrigger>
                <AccordionContent>
                  Every day between 8:00 AM and 12:00 PM SAST, 10 random items become free 
                  at staggered times. If you claim a free item during its drop window, you 
                  get it for R0 (free shipping may apply). Each user can claim one free unit 
                  per product per day.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="do-i-need-account">
                <AccordionTrigger>Do I need to create an account to shop?</AccordionTrigger>
                <AccordionContent>
                  While you can browse our products without an account, you'll need to create 
                  a free account to make purchases, claim free drops, and track your orders.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="payment-methods">
                <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                <AccordionContent>
                  We accept all major credit and debit cards through our secure payment 
                  processor Yoco. All transactions are encrypted and secure.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Orders & Shipping</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="shipping-cost">
                <AccordionTrigger>How much does shipping cost?</AccordionTrigger>
                <AccordionContent>
                  Standard shipping costs R99 for orders under R500. Orders over R500 qualify 
                  for free shipping. Express shipping options are available at checkout for 
                  an additional fee.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="delivery-time">
                <AccordionTrigger>How long does delivery take?</AccordionTrigger>
                <AccordionContent>
                  Standard delivery takes 5-7 business days within major South African cities, 
                  and 7-14 business days for remote areas. Express delivery options are 
                  available for faster shipping.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="track-order">
                <AccordionTrigger>How can I track my order?</AccordionTrigger>
                <AccordionContent>
                  Once your order ships, you'll receive a tracking number via email. You can 
                  use this tracking number on our website or the courier's website to track 
                  your package's progress.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="shipping-areas">
                <AccordionTrigger>Where do you ship to?</AccordionTrigger>
                <AccordionContent>
                  We currently ship throughout South Africa. We're working on expanding to 
                  other African countries in the future.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="order-status">
                <AccordionTrigger>How do I check my order status?</AccordionTrigger>
                <AccordionContent>
                  Log into your account and visit the "Orders" section to view all your 
                  orders and their current status. You'll also receive email updates at 
                  each stage of the order process.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Returns & Refunds</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="return-policy">
                <AccordionTrigger>What is your return policy?</AccordionTrigger>
                <AccordionContent>
                  We offer a 7-day return policy for most items. Items must be in original 
                  condition, unopened, with all tags and packaging. Please see our Returns 
                  page for full details.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="how-to-return">
                <AccordionTrigger>How do I return an item?</AccordionTrigger>
                <AccordionContent>
                  Contact our customer service team at returns@dailydeals-sa.com with your 
                  order number. We'll provide a return authorization number and shipping 
                  label. For detailed instructions, visit our Returns page.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="refund-time">
                <AccordionTrigger>How long until I receive my refund?</AccordionTrigger>
                <AccordionContent>
                  Once we receive and inspect your return (3-5 business days), your refund 
                  will be processed within 5-10 business days to your original payment method.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="return-shipping">
                <AccordionTrigger>Who pays for return shipping?</AccordionTrigger>
                <AccordionContent>
                  If the item is defective, damaged, or incorrect, we cover return shipping. 
                  For change of mind returns, the customer pays return shipping costs.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Product Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="product-condition">
                <AccordionTrigger>Are your products new or used?</AccordionTrigger>
                <AccordionContent>
                  All products sold on Daily Deals SA are brand new, unless specifically 
                  marked as refurbished or pre-owned. We source directly from manufacturers 
                  and authorized distributors.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="warranty">
                <AccordionTrigger>Do products come with a warranty?</AccordionTrigger>
                <AccordionContent>
                  Yes! All products come with the manufacturer's warranty. Warranty terms 
                  vary by product and manufacturer. Details are provided on each product page.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="out-of-stock">
                <AccordionTrigger>What if an item is out of stock?</AccordionTrigger>
                <AccordionContent>
                  If an item is out of stock, you can sign up for restock notifications on 
                  the product page. We'll email you when the item becomes available again.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="price-matching">
                <AccordionTrigger>Do you price match?</AccordionTrigger>
                <AccordionContent>
                  We already offer the best prices on all our products! However, if you find 
                  a lower price elsewhere, contact us and we'll review it on a case-by-case basis.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Account & Security</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="reset-password">
                <AccordionTrigger>How do I reset my password?</AccordionTrigger>
                <AccordionContent>
                  Click "Sign In" and then "Forgot Password" on the sign-in page. Enter your 
                  email address and we'll send you a password reset link.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="change-email">
                <AccordionTrigger>Can I change my email address?</AccordionTrigger>
                <AccordionContent>
                  Yes, you can update your email address in your account settings. You'll 
                  need to verify your new email address before the change takes effect.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="secure-payment">
                <AccordionTrigger>Is my payment information secure?</AccordionTrigger>
                <AccordionContent>
                  Absolutely! We use industry-standard SSL encryption and partner with Yoco, 
                  a PCI DSS compliant payment processor. We never store your full credit card 
                  information on our servers.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="data-privacy">
                <AccordionTrigger>How do you protect my personal information?</AccordionTrigger>
                <AccordionContent>
                  We take data privacy seriously. Your personal information is encrypted and 
                  stored securely. We never sell your data to third parties. See our Privacy 
                  Policy for full details.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Still Have Questions?</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              Can't find the answer you're looking for? Our customer service team is here to help!
            </p>
            <p className="mt-4">
              Email: support@dailydeals-sa.com<br />
              Phone: 0861 234 567<br />
              Hours: Monday - Friday, 8:00 AM - 5:00 PM SAST
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

