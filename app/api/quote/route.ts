import { NextRequest, NextResponse } from "next/server";
import { quoteRequestSchema } from "@/lib/validators";
import { formatQuoteEmail } from "@/lib/quote-formatter";
import { sendEmail } from "@/lib/email";
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

    // Format email
    const emailPayload = formatQuoteEmail(quoteRequest);

    // Send (stubbed if SMTP not configured)
    const result = await sendEmail(emailPayload);

    if (!result.success) {
      console.error("Email delivery failed:", result.error);
      // Still return success to user — log the error internally
    }

    const referenceId = `QR-${Date.now().toString(36).toUpperCase()}`;

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
