import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Truck, Package, Clock, MapPin } from "lucide-react"

export default function ShippingPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Truck className="h-16 w-16 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl font-bold mb-4">Shipping Information</h1>
          <p className="text-lg text-muted-foreground">
            Fast and reliable delivery across South Africa
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Shipping Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4">
              <Package className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold">Standard Shipping</h3>
                <p className="text-sm text-muted-foreground">
                  R99 for orders under R500 | FREE for orders over R500
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Delivery: 5-7 business days
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Truck className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold">Express Shipping</h3>
                <p className="text-sm text-muted-foreground">
                  R199 - Available at checkout
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Delivery: 2-3 business days
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Clock className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold">Overnight Shipping</h3>
                <p className="text-sm text-muted-foreground">
                  R299 - Available for major cities
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Delivery: Next business day
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Delivery Timeframes</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              Delivery times are calculated from the date your order ships (not when you place 
              the order). Most orders ship within 1-2 business days of payment confirmation.
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>Major Cities (Cape Town, Johannesburg, Durban, Pretoria):</strong> 5-7 business days</li>
              <li><strong>Other Cities:</strong> 7-10 business days</li>
              <li><strong>Remote Areas:</strong> 10-14 business days</li>
              <li><strong>Express Delivery:</strong> 2-3 business days (major cities only)</li>
              <li><strong>Overnight:</strong> Next business day (major cities only)</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Shipping Costs</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Standard Shipping</h3>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>Orders under R500: R99</li>
                  <li>Orders R500 and above: FREE</li>
                  <li>Applies to most areas in South Africa</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold">Express Shipping</h3>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>Additional R199</li>
                  <li>Available for major cities</li>
                  <li>2-3 business day delivery</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold">Overnight Shipping</h3>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>Additional R299</li>
                  <li>Available for Cape Town, Johannesburg, Durban, Pretoria</li>
                  <li>Next business day delivery</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold">Free Items</h3>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>Free items from daily drops: R99 shipping</li>
                  <li>Free shipping applies when combined with paid orders over R500</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Order Processing</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <ol className="list-decimal pl-6 space-y-2">
              <li><strong>Order Placed:</strong> You'll receive an order confirmation email</li>
              <li><strong>Payment Processing:</strong> 1-2 hours for card payments</li>
              <li><strong>Order Preparation:</strong> 1-2 business days</li>
              <li><strong>Shipping:</strong> You'll receive a tracking number via email</li>
              <li><strong>In Transit:</strong> Track your package using the provided tracking number</li>
              <li><strong>Delivery:</strong> Package delivered to your specified address</li>
            </ol>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Tracking Your Order</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              Once your order ships, you'll receive an email with a tracking number. You can:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Track your package on our website using your order number</li>
              <li>Use the tracking number on the courier's website</li>
              <li>Sign up for SMS notifications for real-time updates</li>
              <li>Contact our customer service team for assistance</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Delivery Locations</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              We ship to addresses throughout South Africa. When placing your order, please ensure:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Your address is complete and accurate</li>
              <li>Include apartment/unit numbers if applicable</li>
              <li>Provide a contact phone number for delivery updates</li>
              <li>Add delivery instructions if needed (e.g., "Leave at front gate")</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Delivery Issues</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <h3 className="font-semibold mb-2">What if I'm not home during delivery?</h3>
            <p>
              The courier will attempt delivery up to 3 times. If you're not available, they'll 
              leave a notification card with instructions on how to arrange redelivery or pickup 
              from the nearest depot.
            </p>

            <h3 className="font-semibold mb-2 mt-4">What if my package is damaged?</h3>
            <p>
              If your package arrives damaged, please contact us immediately at 
              support@dailydeals-sa.com with photos of the damage. We'll arrange a replacement 
              or refund at no cost to you.
            </p>

            <h3 className="font-semibold mb-2 mt-4">What if my package is lost?</h3>
            <p>
              If your package hasn't arrived within the expected timeframe, contact our customer 
              service team. We'll investigate and either reship your order or provide a full refund.
            </p>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>International Shipping</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              We currently only ship within South Africa. We're working on expanding to other 
              African countries in the near future. Sign up for our newsletter to be notified 
              when international shipping becomes available.
            </p>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              Have questions about shipping? Our customer service team is here to help!
            </p>
            <p className="mt-4">
              Email: shipping@dailydeals-sa.com<br />
              Phone: 0861 234 567<br />
              Hours: Monday - Friday, 8:00 AM - 5:00 PM SAST
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

