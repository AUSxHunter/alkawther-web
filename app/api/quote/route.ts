import { NextRequest, NextResponse } from "next/server";
import { quoteRequestSchema } from "@/lib/validators";
import { formatQuoteEmail } from "@/lib/quote-formatter";
import { formatCustomerConfirmationEmail } from "@/lib/customer-confirmation-formatter";
import { sendEmail } from "@/lib/email";
import { addQuote } from "@/lib/admin-store";
import type { QuoteRequest } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate
    const parsed = quoteRequestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 422 }
      );
    }

    const quoteRequest: QuoteRequest = {
      ...parsed.data,
      items: parsed.data.items ?? [],
      submittedAt: new Date().toISOString(),
    };

    const referenceId = `QR-${Date.now().toString(36).toUpperCase()}`;

    // Format both emails
    const ownerPayload = formatQuoteEmail(quoteRequest, referenceId);
    const customerPayload = formatCustomerConfirmationEmail(quoteRequest, referenceId);

    // Log the quote to the admin dashboard store (non-blocking)
    try {
      addQuote({
        id: referenceId,
        timestamp: quoteRequest.submittedAt,
        name: quoteRequest.customerName,
        company: quoteRequest.companyName ?? "",
        email: quoteRequest.email,
        phone: quoteRequest.phone,
        items: quoteRequest.items.map((item) => ({
          productId: item.productId,
          productName: item.productName,
          categorySlug: item.categorySlug,
          variantLabel: item.variantLabel ?? item.variantId ?? "",
          quantity: item.quantity,
          notes: item.notes,
        })),
        message: quoteRequest.message,
        handled: false,
      });
    } catch (e) {
      console.error("Failed to log quote to admin store:", e);
    }

    // Send both concurrently — failures are logged but do not block the user response
    const [ownerResult, customerResult] = await Promise.allSettled([
      sendEmail(ownerPayload),
      sendEmail(customerPayload),
    ]);

    if (ownerResult.status === "rejected" || (ownerResult.status === "fulfilled" && !ownerResult.value.success)) {
      console.error("Owner notification failed:", ownerResult.status === "rejected" ? ownerResult.reason : ownerResult.value.error);
    }
    if (customerResult.status === "rejected" || (customerResult.status === "fulfilled" && !customerResult.value.success)) {
      console.error("Customer confirmation failed:", customerResult.status === "rejected" ? customerResult.reason : customerResult.value.error);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Quotation request received. We will respond within 24 hours.",
        referenceId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Quote API error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred. Please try again or contact us directly.",
      },
      { status: 500 }
    );
  }
}
