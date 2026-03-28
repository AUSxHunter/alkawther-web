import type { QuoteEmailPayload } from "@/types";

/**
 * Sends an email using Resend (https://resend.com).
 * Falls back to console stub if RESEND_API_KEY is not configured.
 */
export async function sendEmail(payload: QuoteEmailPayload): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;

  // Stub mode: log to console if Resend not configured
  if (!apiKey) {
    console.log("\n📧 [EMAIL STUB — RESEND_API_KEY NOT CONFIGURED]");
    console.log("To:", payload.to);
    console.log("Subject:", payload.subject);
    console.log("Reply-To:", payload.replyTo);
    console.log("---");
    console.log(payload.text);
    console.log("---\n");
    return { success: true };
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: `Al Kawther <${payload.from}>`,
      to: payload.to,
      replyTo: payload.replyTo,
      subject: payload.subject,
      html: payload.html,
      text: payload.text,
    });

    if (error) {
      console.error("Email send failed:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Email send failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Email sending failed",
    };
  }
}
