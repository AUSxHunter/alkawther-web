import type { QuoteRequest, QuoteEmailPayload } from "@/types";
import { formatDate } from "./utils";
import { company } from "@/data/company";

function esc(str: string | undefined | null): string {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

export function formatCustomerConfirmationEmail(
  request: QuoteRequest,
  referenceId: string
): QuoteEmailPayload {
  const fromEmail = process.env.SMTP_FROM ?? `noreply@alkawther.net`;

  const itemsHtml =
    request.items.length > 0
      ? `
  <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse; margin-top:16px;">
    <thead>
      <tr style="background:#2A2825; color:#F5F2EE;">
        <th align="left" style="padding:8px 12px; font-size:13px;">#</th>
        <th align="left" style="padding:8px 12px; font-size:13px;">Product</th>
        <th align="left" style="padding:8px 12px; font-size:13px;">Variant / Size</th>
        <th align="left" style="padding:8px 12px; font-size:13px;">Brand</th>
        <th align="left" style="padding:8px 12px; font-size:13px;">Qty</th>
      </tr>
    </thead>
    <tbody>
      ${request.items
        .map(
          (item, i) => `
      <tr style="background:${i % 2 === 0 ? "#ffffff" : "#F5F2EE"}; border-bottom:1px solid #ddd;">
        <td style="padding:8px 12px; color:#8C8078;">${i + 1}</td>
        <td style="padding:8px 12px; font-weight:600; color:#111010;">${esc(item.productName)}</td>
        <td style="padding:8px 12px; color:#2A2825;">${item.variantLabel ? esc(item.variantLabel) : "—"}</td>
        <td style="padding:8px 12px; color:#2A2825;">${item.selectedBrand ? esc(item.selectedBrand) : "—"}</td>
        <td style="padding:8px 12px; font-weight:600; color:#C8A96E;">${item.quantity}${item.unit ? ` ${esc(item.unit)}` : ""}</td>
      </tr>
      ${item.notes ? `<tr style="background:${i % 2 === 0 ? "#ffffff" : "#F5F2EE"}"><td></td><td colspan="4" style="padding:4px 12px 8px; color:#8C8078; font-style:italic; font-size:12px;">Note: ${esc(item.notes)}</td></tr>` : ""}
      `
        )
        .join("")}
    </tbody>
  </table>`
      : `<p style="color:#8C8078; font-style:italic;">General inquiry — no specific items listed.</p>`;

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>Quotation Request Confirmation</title></head>
<body style="font-family: 'Segoe UI', Arial, sans-serif; background:#F5F2EE; margin:0; padding:0;">
  <div style="max-width:700px; margin:0 auto; background:#ffffff; box-shadow:0 2px 12px rgba(0,0,0,0.08);">

    <!-- Header -->
    <div style="background:#111010; padding:32px 40px; text-align:center;">
      <h1 style="color:#C8A96E; font-size:24px; margin:0; font-weight:700; letter-spacing:0.05em;">AL KAWTHER</h1>
      <p style="color:#8C8078; font-size:13px; margin:6px 0 0;">Quotation Request Confirmation</p>
    </div>

    <!-- Warm Opening -->
    <div style="padding:32px 40px; border-bottom:1px solid #EDE8E0;">
      <h2 style="font-size:16px; color:#2A2825; margin:0 0 12px; text-transform:uppercase; letter-spacing:0.08em;">Thank You, ${esc(request.customerName)}</h2>
      <p style="color:#2A2825; line-height:1.7; margin:0;">We have received your quotation request and our team is reviewing it. You will hear from us within <strong>1–2 business days</strong>.</p>
    </div>

    <!-- Reference Box -->
    <div style="padding:24px 40px; border-bottom:1px solid #EDE8E0; background:#FDFBF8;">
      <div style="border-left:4px solid #C8A96E; background:#FFF9F0; padding:16px 20px; border-radius:2px;">
        <p style="color:#8C8078; font-size:11px; margin:0 0 6px; text-transform:uppercase; letter-spacing:0.1em;">Your Reference Number</p>
        <p style="color:#C8A96E; font-size:22px; font-weight:700; font-family:monospace; margin:0 0 6px;">${referenceId}</p>
        <p style="color:#8C8078; font-size:12px; margin:0;">Keep this for your records.</p>
      </div>
    </div>

    <!-- Items Summary -->
    <div style="padding:32px 40px; border-bottom:1px solid #EDE8E0;">
      <h2 style="font-size:16px; color:#2A2825; margin:0 0 4px; text-transform:uppercase; letter-spacing:0.08em;">Your Requested Items</h2>
      <p style="color:#8C8078; font-size:13px; margin:0 0 12px;">${request.items.length} item${request.items.length !== 1 ? "s" : ""} in your request</p>
      ${itemsHtml}
    </div>

    <!-- What Happens Next -->
    <div style="padding:32px 40px; border-bottom:1px solid #EDE8E0;">
      <h2 style="font-size:16px; color:#2A2825; margin:0 0 20px; text-transform:uppercase; letter-spacing:0.08em;">What Happens Next</h2>
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="vertical-align:top; width:36px; padding-bottom:20px;">
            <div style="width:28px; height:28px; background:#C8A96E; color:#111010; font-weight:700; font-size:14px; text-align:center; line-height:28px; border-radius:2px;">1</div>
          </td>
          <td style="vertical-align:top; padding-left:12px; padding-bottom:20px;">
            <p style="margin:0 0 2px; font-weight:600; color:#2A2825; font-size:14px;">Request Received</p>
            <p style="margin:0; color:#8C8078; font-size:13px; line-height:1.6;">Your request has been logged and assigned reference <strong style="color:#2A2825;">${referenceId}</strong>.</p>
          </td>
        </tr>
        <tr>
          <td style="vertical-align:top; width:36px; padding-bottom:20px;">
            <div style="width:28px; height:28px; background:#C8A96E; color:#111010; font-weight:700; font-size:14px; text-align:center; line-height:28px; border-radius:2px;">2</div>
          </td>
          <td style="vertical-align:top; padding-left:12px; padding-bottom:20px;">
            <p style="margin:0 0 2px; font-weight:600; color:#2A2825; font-size:14px;">Our Team Reviews</p>
            <p style="margin:0; color:#8C8078; font-size:13px; line-height:1.6;">A specialist reviews your items and prepares your quotation.</p>
          </td>
        </tr>
        <tr>
          <td style="vertical-align:top; width:36px;">
            <div style="width:28px; height:28px; background:#C8A96E; color:#111010; font-weight:700; font-size:14px; text-align:center; line-height:28px; border-radius:2px;">3</div>
          </td>
          <td style="vertical-align:top; padding-left:12px;">
            <p style="margin:0 0 2px; font-weight:600; color:#2A2825; font-size:14px;">We Contact You</p>
            <p style="margin:0; color:#8C8078; font-size:13px; line-height:1.6;">We reach out by phone or email within 1–2 business days.</p>
          </td>
        </tr>
      </table>
    </div>

    <!-- Contact Block -->
    <div style="padding:24px 40px; border-bottom:1px solid #EDE8E0; background:#F9F6F1;">
      <p style="color:#2A2825; font-weight:600; margin:0 0 12px; font-size:14px;">Need to reach us sooner?</p>
      <p style="margin:0 0 6px; color:#2A2825; font-size:13px;">Phone: <a href="tel:${esc(company.phoneTel)}" style="color:#C8A96E; text-decoration:none;">${esc(company.phone)}</a></p>
      <p style="margin:0 0 6px; color:#2A2825; font-size:13px;">WhatsApp: <a href="${esc(company.whatsappLink)}" style="color:#C8A96E; text-decoration:none;">${esc(company.whatsapp)}</a></p>
      <p style="margin:8px 0 0; color:#8C8078; font-size:12px;">${esc(company.workingHours.weekdays)}<br>${esc(company.workingHours.friday)}</p>
    </div>

    <!-- Footer -->
    <div style="padding:24px 40px; background:#F5F2EE; text-align:center;">
      <p style="color:#8C8078; font-size:12px; margin:0;">Al Kawther General Trading — ${company.address.city}, ${company.address.country}</p>
      <p style="color:#8C8078; font-size:12px; margin:4px 0 0;">This is an automated confirmation. Please do not reply to this email.</p>
      <p style="color:#8C8078; font-size:12px; margin:4px 0 0;">Ref: ${referenceId} | Submitted: ${formatDate(request.submittedAt)}</p>
    </div>

  </div>
</body>
</html>`;

  const itemsText =
    request.items.length > 0
      ? request.items
          .map(
            (item, i) =>
              `${i + 1}. ${item.productName}${item.variantLabel ? ` — ${item.variantLabel}` : ""}${item.selectedBrand ? ` (${item.selectedBrand})` : ""} — Qty: ${item.quantity}${item.unit ? ` ${item.unit}` : ""}${item.notes ? `\n   Note: ${item.notes}` : ""}`
          )
          .join("\n")
      : "General inquiry — no specific items listed.";

  const text = `
QUOTATION REQUEST CONFIRMED — AL KAWTHER
=========================================

Dear ${request.customerName},

Thank you for your quotation request. We have received it and will
contact you within 1–2 business days.

YOUR REFERENCE NUMBER: ${referenceId}
(Please keep this for your records.)

YOUR REQUESTED ITEMS (${request.items.length})
--------------------------
${itemsText}

WHAT HAPPENS NEXT
-----------------
1. Your request has been logged (Ref: ${referenceId}).
2. Our team will review your items and prepare a quotation.
3. We will contact you by phone or email within 1–2 business days.

CONTACT US
----------
Phone:     ${company.phone}
WhatsApp:  ${company.whatsappLink}
Hours:     ${company.workingHours.weekdays}
           ${company.workingHours.friday}

-----------------------------------------
Al Kawther General Trading
${company.address.full}
Submitted: ${formatDate(request.submittedAt)}
`;

  return {
    subject: `We've received your quotation request – Al Kawther`,
    to: request.email,
    from: fromEmail,
    replyTo: company.emailSales,
    html,
    text,
  };
}
