import { kv } from "@vercel/kv";
import type { AvailabilityStatus } from "@/types";

export interface QuoteLogEntry {
  id: string;
  timestamp: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  items: Array<{
    productId: string;
    productName: string;
    categorySlug: string;
    variantLabel: string;
    quantity: number;
    notes?: string;
  }>;
  message?: string;
  handled: boolean;
}

function isKVConfigured() {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

export async function getAvailabilityOverrides(): Promise<Record<string, AvailabilityStatus>> {
  if (!isKVConfigured()) return {};
  return (await kv.get<Record<string, AvailabilityStatus>>("availability:overrides")) ?? {};
}

export async function setAvailabilityOverrides(
  overrides: Record<string, AvailabilityStatus>
): Promise<void> {
  if (!isKVConfigured()) return;
  await kv.set("availability:overrides", overrides);
}

export async function getQuotes(): Promise<QuoteLogEntry[]> {
  if (!isKVConfigured()) return [];
  return (await kv.get<QuoteLogEntry[]>("quotes:log")) ?? [];
}

export async function addQuote(entry: QuoteLogEntry): Promise<void> {
  if (!isKVConfigured()) return;
  const quotes = await getQuotes();
  const updated = [entry, ...quotes].slice(0, 500);
  await kv.set("quotes:log", updated);
}

export async function updateQuoteHandled(id: string, handled: boolean): Promise<void> {
  if (!isKVConfigured()) return;
  const quotes = await getQuotes();
  const updated = quotes.map((q) => (q.id === id ? { ...q, handled } : q));
  await kv.set("quotes:log", updated);
}
