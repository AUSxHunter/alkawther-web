import { company } from "@/data/company";
import type { QuoteRequestInput } from "@/lib/validators";
import type { QuoteItem } from "@/types";

export function buildWhatsAppUrl(data: QuoteRequestInput, items: QuoteItem[]): string {
  const lines: string[] = [];

  lines.push("Hello Al Kawther,");
  lines.push("");
  lines.push("I'd like to request a quotation for the following:");
  lines.push("");

  // Customer details
  lines.push("*Customer Details*");
  lines.push(`Name: ${data.customerName}`);
  if (data.companyName) lines.push(`Company: ${data.companyName}`);
  lines.push(`Phone: ${data.phone}`);
  lines.push(`Email: ${data.email}`);
  if (data.projectLocation) lines.push(`Location: ${data.projectLocation}`);
  lines.push("");

  // Requested items
  lines.push("*Requested Items*");
  if (items.length === 0) {
    lines.push("No specific items selected — please see message below.");
  } else {
    items.forEach((item, i) => {
      const parts = [item.productName];
      if (item.variantLabel) parts.push(item.variantLabel);
      if (item.selectedBrand) parts.push(item.selectedBrand);
      const qty = `${item.quantity}${item.unit ? " " + item.unit : ""}`;
      lines.push(`${i + 1}. ${parts.join(" – ")} — Qty: ${qty}`);
      if (item.notes) lines.push(`   Note: ${item.notes}`);
    });
  }

  // Additional message
  if (data.message) {
    lines.push("");
    lines.push("*Additional Notes*");
    lines.push(data.message);
  }

  lines.push("");
  lines.push("Thank you");

  const message = lines.join("\n");
  return `${company.whatsappLink}?text=${encodeURIComponent(message)}`;
}
