import crypto from "crypto-js";
import axios from "axios";

interface PaymentRequest {
  entityID: string;
  externalEntityID?: string;
  amount: number;
  currency: string;
  requesterUrl: string;
  description?: string;
  paymentReference?: string;
  mode: "live" | "test";
  externalTransactionID: string;
  urls: {
    callbackUrl: string;
    successPageUrl: string;
    failurePageUrl: string;
    cancelUrl?: string;
  };
}

interface PaymentResponse {
  responseCode: string;
  message?: string;
  paylinkUrl?: string;
  paylinkID?: string;
  externalTransactionID?: string;
}

interface PaymentStatusResponse {
  paylinkID: string;
  status: string;
  createdAt: string;
  amount: number;
  description?: string;
}

interface WebhookPayload {
  paylinkID: string;
  status: "SUCCESS" | "FAILURE";
  externalTransactionID: string;
  responseCode: string;
}

export class IKhokhaService {
  private apiEndpoint: string;
  private applicationId: string;
  private applicationKey: string;

  constructor() {
    this.apiEndpoint = "https://api.ikhokha.com/public-api/v1/api";
    this.applicationId = process.env.IKHOKHA_APP_ID || "IK7WXELYCOCXYDJ1LCK9ND6N7WVTXWJD";
    this.applicationKey = process.env.IKHOKHA_APP_KEY || "jG2HsRS43fyeOa3W5RfZbm3cBZRkLHUG";
  }

  private createPayloadToSign(urlPath: string, body: string = ""): string {
    try {
      const url = new URL(urlPath);
      const basePath = url.pathname;
      
      if (!basePath) {
        throw new Error("No basePath in url");
      }
      
      const payload = basePath + body;
      return this.jsStringEscape(payload);
    } catch (error) {
      console.error("Error on createPayloadToSign:", error);
      throw error;
    }
  }

  private jsStringEscape(str: string): string {
    try {
      return str.replace(/[\\"']/g, "\\$&").replace(/\u0000/g, "\\0");
    } catch (error) {
      console.error("Error on jsStringEscape:", error);
      throw error;
    }
  }

  private generateSignature(payload: string): string {
    return crypto
      .HmacSHA256(payload, this.applicationKey.trim())
      .toString(crypto.enc.Hex);
  }

  async createPaymentLink(request: PaymentRequest): Promise<PaymentResponse> {
    try {
      const requestBody = JSON.stringify(request);
      const payloadToSign = this.createPayloadToSign(`${this.apiEndpoint}/payment`, requestBody);
      const signature = this.generateSignature(payloadToSign);

      const response = await axios.post(`${this.apiEndpoint}/payment`, request, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "IK-APPID": this.applicationId.trim(),
          "IK-SIGN": signature.trim(),
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error creating payment link:", error);
      throw new Error("Failed to create payment link");
    }
  }

  async getPaymentStatus(paylinkId: string): Promise<PaymentStatusResponse> {
    try {
      const url = `${this.apiEndpoint}/getStatus/${paylinkId}`;
      const payloadToSign = this.createPayloadToSign(url);
      const signature = this.generateSignature(payloadToSign);

      const response = await axios.get(url, {
        headers: {
          "Accept": "application/json",
          "IK-APPID": this.applicationId.trim(),
          "IK-SIGN": signature.trim(),
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error getting payment status:", error);
      throw new Error("Failed to get payment status");
    }
  }

  async getPaymentStatusByExternalId(externalTransactionID: string): Promise<PaymentStatusResponse> {
    try {
      const url = `${this.apiEndpoint}/getStatus/external?externalReference=${externalTransactionID}`;
      const payloadToSign = this.createPayloadToSign(url);
      const signature = this.generateSignature(payloadToSign);

      const response = await axios.get(url, {
        headers: {
          "Accept": "application/json",
          "IK-APPID": this.applicationId.trim(),
          "IK-SIGN": signature.trim(),
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error getting payment status by external ID:", error);
      throw new Error("Failed to get payment status");
    }
  }

  async getTransactionHistory(startDate: string, endDate: string): Promise<PaymentStatusResponse[]> {
    try {
      const url = `${this.apiEndpoint}/payments/history?startDate=${startDate}&endDate=${endDate}`;
      const payloadToSign = this.createPayloadToSign(url);
      const signature = this.generateSignature(payloadToSign);

      const response = await axios.get(url, {
        headers: {
          "Accept": "application/json",
          "IK-APPID": this.applicationId.trim(),
          "IK-SIGN": signature.trim(),
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error getting transaction history:", error);
      throw new Error("Failed to get transaction history");
    }
  }

  verifyWebhookSignature(payload: string, signature: string, callbackUrl: string): boolean {
    try {
      const payloadToSign = this.createPayloadToSign(callbackUrl, payload);
      const expectedSignature = this.generateSignature(payloadToSign);
      
      return signature === expectedSignature;
    } catch (error) {
      console.error("Error verifying webhook signature:", error);
      return false;
    }
  }

  // Helper method to create payment request for our e-commerce store
  createPaymentRequest(
    orderId: string,
    amount: number,
    description: string,
    baseUrl: string
  ): PaymentRequest {
    return {
      entityID: this.applicationId,
      externalEntityID: "daily-deals-sa",
      amount: Math.round(amount * 100), // Convert to cents
      currency: "ZAR",
      requesterUrl: `${baseUrl}/checkout`,
      description: description,
      paymentReference: orderId,
      mode: process.env.NODE_ENV === "production" ? "live" : "test",
      externalTransactionID: orderId,
      urls: {
        callbackUrl: `${baseUrl}/api/webhooks/ikhokha`,
        successPageUrl: `${baseUrl}/checkout/success`,
        failurePageUrl: `${baseUrl}/checkout/failure`,
        cancelUrl: `${baseUrl}/checkout/cancel`,
      },
    };
  }
}

export const ikhokhaService = new IKhokhaService();
