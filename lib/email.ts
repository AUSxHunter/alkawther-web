import type { QuoteEmailPayload } from "@/types";

/**
 * Sends an email using Nodemailer.
 * If SMTP is not configured, logs to console in development and returns success.
 * This allows the site to run without SMTP configuration during development.
 */
export async function sendEmail(payload: QuoteEmailPayload): Promise<{ success: boolean; error?: string }> {
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  // Stub mode: log to console if SMTP not configured
  if (!smtpHost || !smtpUser || !smtpPass) {
    console.log("\n📧 [EMAIL STUB — SMTP NOT CONFIGURED]");
    console.log("To:", payload.to);
    console.log("Subject:", payload.subject);
    console.log("Reply-To:", payload.replyTo);
    console.log("---");
    console.log(payload.text);
    console.log("---\n");
    return { success: true };
  }

  try {
    // Dynamic import to avoid build errors when nodemailer is not needed
    const nodemailer = await import("nodemailer");
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_PORT === "465",
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: `"Al Kawther" <${payload.from}>`,
      to: payload.to,
      replyTo: payload.replyTo,
      subject: payload.subject,
      html: payload.html,
      text: payload.text,
    });

    return { success: true };
  } catch (error) {
    console.error("Email send failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Email sending failed",
    };
  }
}
