import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RefreshCw } from "lucide-react"

export default function RefundPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <RefreshCw className="h-16 w-16 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl font-bold mb-4">Refund Policy</h1>
          <p className="text-lg text-muted-foreground">
            Last updated: January 2025
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              At Daily Deals SA, we want you to be completely satisfied with your purchase. 
              If you're not happy with your order, we offer a straightforward refund policy 
              to ensure your peace of mind.
            </p>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>1. Eligibility for Refunds</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>You are eligible for a refund if:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>The item is defective or damaged upon delivery</li>
              <li>The item is not as described on our website</li>
              <li>You received the wrong item</li>
              <li>The item is returned within 7 days of delivery</li>
              <li>The item is in its original condition (unused, unopened, with tags)</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>2. Return Timeframe</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              You have <strong>7 days</strong> from the date of delivery to initiate a return 
              request. After this period, we cannot accept returns unless the item is defective 
              or damaged.
            </p>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>3. How to Request a Refund</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <ol className="list-decimal pl-6 space-y-2">
              <li>Contact our customer service team at returns@dailydeals-sa.com or call 0861 234 567</li>
              <li>Provide your order number and reason for return</li>
              <li>We'll send you a return authorization number and shipping instructions</li>
              <li>Package the item securely with the return label we provide</li>
              <li>Ship the item back to us using the provided return label</li>
            </ol>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>4. Refund Processing</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <ul className="list-disc pl-6 space-y-2">
              <li>Once we receive your returned item, we'll inspect it within 3-5 business days</li>
              <li>If approved, your refund will be processed within 5-10 business days</li>
              <li>Refunds will be issued to the original payment method used for the purchase</li>
              <li>You'll receive an email confirmation once the refund is processed</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>5. Refund Amount</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <ul className="list-disc pl-6 space-y-2">
              <li>Full refund of the purchase price for eligible returns</li>
              <li>Original shipping costs are non-refundable unless the item is defective or wrong</li>
              <li>Return shipping costs are covered by us for defective or incorrect items</li>
              <li>For change of mind returns, return shipping is at the customer's expense</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>6. Non-Refundable Items</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>The following items are not eligible for refunds:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Gift cards</li>
              <li>Downloadable software or digital products</li>
              <li>Items that have been used or damaged by the customer</li>
              <li>Items without original packaging or tags</li>
              <li>Personalized or custom-made items</li>
              <li>Perishable goods</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>7. Exchanges</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              We currently do not offer direct exchanges. If you'd like a different item, 
              please return the original item for a refund and place a new order for the 
              item you want.
            </p>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>8. Damaged or Defective Items</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              If you receive a damaged or defective item, please contact us immediately 
              within 48 hours of delivery. We'll arrange for a replacement or full refund 
              at no cost to you, including return shipping.
            </p>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>9. Free Items</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              Items claimed as part of our daily free drops program are not eligible for 
              cash refunds. However, if you receive a damaged or defective free item, 
              we'll replace it with another available product.
            </p>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>10. Return Shipping</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <ul className="list-disc pl-6 space-y-2">
              <li>Use the return label provided by our customer service team</li>
              <li>Package items securely to prevent damage during transit</li>
              <li>Include all original packaging, manuals, and accessories</li>
              <li>Keep your shipping receipt until the refund is processed</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>11. Contact Us</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              If you have any questions about our refund policy, please contact us:
            </p>
            <p className="mt-2">
              Email: returns@dailydeals-sa.com<br />
              Phone: 0861 234 567<br />
              Hours: Monday - Friday, 8:00 AM - 5:00 PM SAST
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

