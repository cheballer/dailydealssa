"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, ShoppingCart, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CheckoutCancelPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <AlertCircle className="h-16 w-16 text-yellow-500" />
            </div>
            <CardTitle className="text-2xl text-yellow-800">Payment Cancelled</CardTitle>
            <CardDescription className="text-yellow-600">
              Your payment was cancelled. No charges have been made to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-white p-4 rounded-lg border">
              <h3 className="font-semibold mb-2">What happened?</h3>
              <p className="text-sm text-gray-600 mb-3">
                You chose to cancel the payment process. Your items are still in your cart and ready for checkout.
              </p>
              <div className="text-sm space-y-1">
                <p>• No payment was processed</p>
                <p>• Your cart items are still saved</p>
                <p>• You can complete your purchase anytime</p>
                <p>• No charges were made to your account</p>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-semibold mb-2">Ready to complete your purchase?</h3>
              <p className="text-sm text-gray-600">
                Your items are waiting for you. Continue with your checkout when you're ready.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild className="flex-1">
                <Link href="/checkout">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Complete Purchase
                </Link>
              </Button>
              <Button asChild variant="outline" className="flex-1">
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
