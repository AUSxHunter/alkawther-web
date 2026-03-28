import type { QuoteRequestInput } from "@/lib/validators";
import type { QuoteItem } from "@/types";

const RECIPIENT_EMAIL = "ahmedtaad03@gmail.com";

export function buildMailtoUrl(data: QuoteRequestInput, items: QuoteItem[]): string {
  const subject = [
    "Quotation Request",
    data.customerName,
    data.companyName ? `(${data.companyName})` : "",
    `— ${items.length} item${items.length !== 1 ? "s" : ""}`,
  ]
    .filter(Boolean)
    .join(" ");

  const lines: string[] = [];

  lines.push("Hello Al Kawther,");
  lines.push("");
  lines.push("I'd like to request a quotation for the following:");
  lines.push("");

  lines.push("CUSTOMER DETAILS");
  lines.push(`Name: ${data.customerName}`);
  if (data.companyName) lines.push(`Company: ${data.companyName}`);
  lines.push(`Phone: ${data.phone}`);
  lines.push(`Email: ${data.email}`);
  if (data.projectLocation) lines.push(`Location: ${data.projectLocation}`);
  lines.push("");

  lines.push(`REQUESTED ITEMS (${items.length})`);
  if (items.length === 0) {
    lines.push("No specific items selected — please see message below.");
  } else {
    items.forEach((item, i) => {
      const parts = [item.productName];
      if (item.variantLabel) parts.push(item.variantLabel);
      if (item.selectedBrand) parts.push(item.selectedBrand);
      const qty = `${item.quantity}${item.unit ? " " + item.unit : ""}`;
      lines.push(`${i + 1}. ${parts.join(" - ")} — Qty: ${qty} [${item.categoryName}]`);
      if (item.notes) lines.push(`   Note: ${item.notes}`);
    });
  }

  if (data.message) {
    lines.push("");
    lines.push("ADDITIONAL MESSAGE");
    lines.push(data.message);
  }

  lines.push("");
  lines.push("Thank you");

  const body = lines.join("\n");
  return `mailto:${RECIPIENT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
