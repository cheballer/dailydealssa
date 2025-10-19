import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package } from "lucide-react"

export default function ReturnsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Package className="h-16 w-16 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl font-bold mb-4">Returns Information</h1>
          <p className="text-lg text-muted-foreground">
            Simple and hassle-free returns process
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Return Process Overview</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              Returning an item to Daily Deals SA is quick and easy. Follow these simple 
              steps to initiate your return.
            </p>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Step 1: Contact Us</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              Reach out to our customer service team within 7 days of receiving your order:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Email: returns@dailydeals-sa.com</li>
              <li>Phone: 0861 234 567</li>
              <li>Include your order number and reason for return</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Step 2: Receive Return Authorization</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              Our team will review your request and send you:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>A return authorization number (RMA)</li>
              <li>Return shipping label (if applicable)</li>
              <li>Detailed return instructions</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Step 3: Package Your Item</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>Please ensure your item is properly packaged:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Use the original packaging if possible</li>
              <li>Include all original accessories and manuals</li>
              <li>Attach the return label to the outside of the package</li>
              <li>Include the RMA number inside the package</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Step 4: Ship Your Return</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <ul className="list-disc pl-6 space-y-1">
              <li>Drop off your package at any authorized shipping location</li>
              <li>Keep your shipping receipt for tracking</li>
              <li>You'll receive tracking updates via email</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Step 5: Receive Your Refund</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              Once we receive and inspect your return (3-5 business days), we'll process 
              your refund within 5-10 business days to your original payment method.
            </p>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Return Conditions</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>Items must be returned in:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Original condition (unused, unopened)</li>
              <li>Original packaging with all tags attached</li>
              <li>With all accessories, manuals, and documentation</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Return Timeframes</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Request Return:</strong> Within 7 days of delivery</li>
              <li><strong>Ship Return:</strong> Within 14 days of authorization</li>
              <li><strong>Inspection:</strong> 3-5 business days after receipt</li>
              <li><strong>Refund Processing:</strong> 5-10 business days after approval</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Return Shipping Costs</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Defective or Wrong Item:</strong> Free - we cover shipping</li>
              <li><strong>Change of Mind:</strong> Customer pays return shipping</li>
              <li><strong>Damaged in Transit:</strong> Free - we cover shipping</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Return Address</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              Daily Deals SA Returns<br />
              123 Main Street<br />
              Cape Town, 8001<br />
              South Africa<br />
              <br />
              Please do not send returns to this address without a return authorization number.
            </p>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <h3 className="font-semibold mb-2">Can I return an item after 7 days?</h3>
            <p>
              Generally, no. However, if the item is defective or was incorrectly shipped, 
              please contact us immediately and we'll assist you.
            </p>

            <h3 className="font-semibold mb-2 mt-4">What if I lost the original packaging?</h3>
            <p>
              Contact us and we'll provide guidance. We may still accept the return with 
              appropriate packaging, though this is evaluated case-by-case.
            </p>

            <h3 className="font-semibold mb-2 mt-4">Can I exchange an item for a different size or color?</h3>
            <p>
              We don't offer direct exchanges. Please return the item for a refund and 
              place a new order for the item you want.
            </p>

            <h3 className="font-semibold mb-2 mt-4">How long until I receive my refund?</h3>
            <p>
              After we receive and inspect your return, refunds are processed within 5-10 
              business days. You'll receive an email confirmation once processed.
            </p>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              Our customer service team is here to help with any questions about returns:
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

