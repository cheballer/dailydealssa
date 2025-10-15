"use client"

import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { XCircle, RefreshCw, ArrowLeft, CreditCard } from "lucide-react"
import Link from "next/link"

export default function CheckoutFailurePage() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error") || "Payment was not completed"

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Card className="border-red-200 bg-red-50">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <XCircle className="h-16 w-16 text-red-500" />
            </div>
            <CardTitle className="text-2xl text-red-800">Payment Failed</CardTitle>
            <CardDescription className="text-red-600">
              We couldn't process your payment. Please try again.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-white p-4 rounded-lg border">
              <h3 className="font-semibold mb-2">What happened?</h3>
              <p className="text-sm text-gray-600 mb-3">
                {error}
              </p>
              <div className="text-sm space-y-1">
                <p>• Check that your card details are correct</p>
                <p>• Ensure you have sufficient funds</p>
                <p>• Try a different payment method</p>
                <p>• Contact your bank if the issue persists</p>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-semibold mb-2 flex items-center">
                <CreditCard className="h-4 w-4 mr-2" />
                Need Help?
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                If you continue to experience issues, please contact our support team.
              </p>
              <p className="text-sm">
                <span className="font-medium">Email:</span> support@dailydeals-sa.com<br />
                <span className="font-medium">Phone:</span> +27 11 123 4567
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild className="flex-1">
                <Link href="/checkout">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </Link>
              </Button>
              <Button asChild variant="outline" className="flex-1">
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Store
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
