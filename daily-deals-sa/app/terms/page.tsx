import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <FileText className="h-16 w-16 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-lg text-muted-foreground">
            Last updated: January 2025
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>1. Acceptance of Terms</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              By accessing and using Daily Deals SA ("the Website"), you accept and agree to be 
              bound by the terms and provision of this agreement. If you do not agree to abide 
              by the above, please do not use this service.
            </p>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>2. Use License</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>Permission is granted to temporarily download one copy of the materials on 
            Daily Deals SA's website for personal, non-commercial transitory viewing only. 
            This is the grant of a license, not a transfer of title, and under this license you may not:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose</li>
              <li>Attempt to reverse engineer any software contained on the website</li>
              <li>Remove any copyright or other proprietary notations</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>3. Product Information</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              We strive to provide accurate product descriptions, images, and pricing. However, 
              we do not warrant that product descriptions or other content on this site is accurate, 
              complete, reliable, current, or error-free. Prices and availability are subject to 
              change without notice.
            </p>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>4. Orders and Payment</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <ul className="list-disc pl-6 space-y-2">
              <li>All orders are subject to product availability and acceptance by Daily Deals SA</li>
              <li>Prices are in South African Rand (ZAR) and include VAT where applicable</li>
              <li>Payment must be received before order processing begins</li>
              <li>We accept major credit cards and other payment methods as displayed on our site</li>
              <li>All payments are processed securely through third-party payment providers</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>5. Shipping and Delivery</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <ul className="list-disc pl-6 space-y-2">
              <li>Shipping costs are calculated at checkout based on delivery address</li>
              <li>Estimated delivery times are provided but not guaranteed</li>
              <li>Risk of loss and title pass to you upon delivery to the carrier</li>
              <li>We are not responsible for delays caused by shipping carriers or customs</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>6. Returns and Refunds</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              Please see our Refund Policy for detailed information about returns and refunds. 
              We offer a 7-day return policy for most items, subject to certain conditions.
            </p>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>7. User Accounts</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>You are responsible for:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Maintaining the confidentiality of your account and password</li>
              <li>All activities that occur under your account</li>
              <li>Providing accurate and complete information</li>
              <li>Notifying us immediately of any unauthorized use of your account</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>8. Prohibited Uses</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>You may not use our website:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>In any way that violates any applicable law or regulation</li>
              <li>To transmit any malicious code or viruses</li>
              <li>To impersonate or attempt to impersonate the company or employees</li>
              <li>To engage in any automated use of the system</li>
              <li>To interfere with or disrupt the website or servers</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>9. Disclaimer</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              The materials on Daily Deals SA's website are provided on an 'as is' basis. 
              Daily Deals SA makes no warranties, expressed or implied, and hereby disclaims 
              and negates all other warranties including, without limitation, implied warranties 
              or conditions of merchantability, fitness for a particular purpose, or non-infringement 
              of intellectual property or other violation of rights.
            </p>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>10. Limitation of Liability</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              In no event shall Daily Deals SA or its suppliers be liable for any damages 
              (including, without limitation, damages for loss of data or profit, or due to 
              business interruption) arising out of the use or inability to use the materials 
              on Daily Deals SA's website.
            </p>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>11. Governing Law</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              These terms and conditions are governed by and construed in accordance with the 
              laws of South Africa. Any disputes relating to these terms will be subject to 
              the exclusive jurisdiction of the courts of South Africa.
            </p>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>12. Changes to Terms</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              We reserve the right to revise these terms of service at any time without notice. 
              By using this website, you are agreeing to be bound by the current version of these 
              terms of service.
            </p>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>13. Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <p className="mt-2">
              Email: legal@dailydeals-sa.com<br />
              Phone: 0861 234 567
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

