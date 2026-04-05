import { Redis } from "@upstash/redis";
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
  return !!(process.env.UPSTASH_REDIS_KV_REST_API_URL && process.env.UPSTASH_REDIS_KV_REST_API_TOKEN);
}

function getRedis() {
  return new Redis({
    url: process.env.UPSTASH_REDIS_KV_REST_API_URL!,
    token: process.env.UPSTASH_REDIS_KV_REST_API_TOKEN!,
  });
}

export async function getAvailabilityOverrides(): Promise<Record<string, AvailabilityStatus>> {
  if (!isKVConfigured()) return {};
  return (await getRedis().get<Record<string, AvailabilityStatus>>("availability:overrides")) ?? {};
}

export async function setAvailabilityOverrides(
  overrides: Record<string, AvailabilityStatus>
): Promise<void> {
  if (!isKVConfigured()) return;
  await getRedis().set("availability:overrides", overrides);
}

export async function getQuotes(): Promise<QuoteLogEntry[]> {
  if (!isKVConfigured()) return [];
  return (await getRedis().get<QuoteLogEntry[]>("quotes:log")) ?? [];
}

export async function addQuote(entry: QuoteLogEntry): Promise<void> {
  if (!isKVConfigured()) return;
  const redis = getRedis();
  const quotes = await redis.get<QuoteLogEntry[]>("quotes:log") ?? [];
  const updated = [entry, ...quotes].slice(0, 500);
  await redis.set("quotes:log", updated);
}

export async function updateQuoteHandled(id: string, handled: boolean): Promise<void> {
  if (!isKVConfigured()) return;
  const redis = getRedis();
  const quotes = await redis.get<QuoteLogEntry[]>("quotes:log") ?? [];
  const updated = quotes.map((q) => (q.id === id ? { ...q, handled } : q));
  await redis.set("quotes:log", updated);
}
