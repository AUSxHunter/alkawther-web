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

export function formatQuoteEmail(request: QuoteRequest, referenceId: string): QuoteEmailPayload {
  const recipientEmail = process.env.RECIPIENT_EMAIL ?? company.emailSales;
  const fromEmail = process.env.SMTP_FROM ?? `noreply@alkawther.net`;

  const subject = `Quotation Request — ${esc(request.customerName)}${request.companyName ? ` (${esc(request.companyName)})` : ""} — ${request.items.length} item${request.items.length !== 1 ? "s" : ""}`;

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
        <th align="left" style="padding:8px 12px; font-size:13px;">Category</th>
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
        <td style="padding:8px 12px; color:#8C8078;">${esc(item.categoryName)}</td>
      </tr>
      ${item.notes ? `<tr style="background:${i % 2 === 0 ? "#ffffff" : "#F5F2EE"}"><td></td><td colspan="5" style="padding:4px 12px 8px; color:#8C8078; font-style:italic; font-size:12px;">Note: ${esc(item.notes)}</td></tr>` : ""}
      `
        )
        .join("")}
    </tbody>
  </table>`
      : `<p style="color:#8C8078; font-style:italic;">No specific items selected. General inquiry.</p>`;

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>Quotation Request</title></head>
<body style="font-family: 'Segoe UI', Arial, sans-serif; background:#F5F2EE; margin:0; padding:0;">
  <div style="max-width:700px; margin:0 auto; background:#ffffff; box-shadow:0 2px 12px rgba(0,0,0,0.08);">
    
    <!-- Header -->
    <div style="background:#111010; padding:32px 40px; text-align:center;">
      <h1 style="color:#C8A96E; font-size:24px; margin:0; font-weight:700; letter-spacing:0.05em;">AL KAWTHER</h1>
      <p style="color:#8C8078; font-size:13px; margin:6px 0 0;">New Quotation Request Received</p>
    </div>

    <!-- Customer Details -->
    <div style="padding:32px 40px; border-bottom:1px solid #EDE8E0;">
      <h2 style="font-size:16px; color:#2A2825; margin:0 0 16px; text-transform:uppercase; letter-spacing:0.08em;">Customer Details</h2>
      <table width="100%" cellpadding="4" cellspacing="0">
        <tr><td style="color:#8C8078; width:160px; font-size:13px;">Full Name</td><td style="color:#111010; font-weight:600;">${esc(request.customerName)}</td></tr>
        ${request.companyName ? `<tr><td style="color:#8C8078; font-size:13px;">Company</td><td style="color:#111010;">${esc(request.companyName)}</td></tr>` : ""}
        <tr><td style="color:#8C8078; font-size:13px;">Phone</td><td style="color:#111010;">${esc(request.phone)}</td></tr>
        <tr><td style="color:#8C8078; font-size:13px;">Email</td><td style="color:#111010;"><a href="mailto:${esc(request.email)}" style="color:#C8A96E;">${esc(request.email)}</a></td></tr>
        ${request.projectLocation ? `<tr><td style="color:#8C8078; font-size:13px;">Project Location</td><td style="color:#111010;">${esc(request.projectLocation)}</td></tr>` : ""}
      </table>
    </div>

    <!-- Selected Items -->
    <div style="padding:32px 40px; border-bottom:1px solid #EDE8E0;">
      <h2 style="font-size:16px; color:#2A2825; margin:0 0 4px; text-transform:uppercase; letter-spacing:0.08em;">Requested Items</h2>
      <p style="color:#8C8078; font-size:13px; margin:0 0 12px;">${request.items.length} line item${request.items.length !== 1 ? "s" : ""} selected</p>
      ${itemsHtml}
    </div>

    <!-- Message -->
    ${
      request.message
        ? `
    <div style="padding:32px 40px; border-bottom:1px solid #EDE8E0;">
      <h2 style="font-size:16px; color:#2A2825; margin:0 0 12px; text-transform:uppercase; letter-spacing:0.08em;">Additional Message</h2>
      <p style="color:#2A2825; line-height:1.7; white-space:pre-wrap;">${esc(request.message)}</p>
    </div>`
        : ""
    }

    <!-- Footer -->
    <div style="padding:24px 40px; background:#F5F2EE; text-align:center;">
      <p style="color:#8C8078; font-size:12px; margin:0;">Received: ${formatDate(request.submittedAt)}</p>
      <p style="color:#8C8078; font-size:12px; margin:4px 0 0;">Reference: ${referenceId}</p>
      <p style="color:#8C8078; font-size:12px; margin:4px 0 0;">Al Kawther Construction Materials — ${company.address.city}, ${company.address.country}</p>
    </div>

  </div>
</body>
</html>`;

  const text = `
QUOTATION REQUEST — AL KAWTHER
================================

Customer: ${request.customerName}
${request.companyName ? `Company: ${request.companyName}` : ""}
Phone: ${request.phone}
Email: ${request.email}
${request.projectLocation ? `Project Location: ${request.projectLocation}` : ""}

REQUESTED ITEMS (${request.items.length})
-----------
${request.items
  .map(
    (item, i) =>
      `${i + 1}. ${item.productName}${item.variantLabel ? ` — ${item.variantLabel}` : ""}${item.selectedBrand ? ` (${item.selectedBrand})` : ""} — Qty: ${item.quantity}${item.unit ? ` ${item.unit}` : ""} [${item.categoryName}]${item.notes ? `\n   Note: ${item.notes}` : ""}`
  )
  .join("\n")}

${request.message ? `MESSAGE:\n${request.message}` : ""}

Reference: ${referenceId}
Submitted: ${formatDate(request.submittedAt)}
`;

  return {
    subject,
    to: recipientEmail,
    from: fromEmail,
    replyTo: request.email,
    html,
    text,
  };
}
