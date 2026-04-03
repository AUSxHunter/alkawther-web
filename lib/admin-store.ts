/**
 * Simple file-based storage for the admin dashboard.
 * Works on any Node.js server (VPS, shared hosting, etc.).
 *
 * NOTE: On Vercel serverless, filesystem writes are NOT persistent.
 * For Vercel, replace this with @vercel/kv or another persistent store.
 */

import fs from "fs";
import path from "path";
import type { AvailabilityStatus } from "@/types";

const DATA_FILE = path.join(process.cwd(), "admin-data.json");

export interface QuoteLogEntry {
  id: string;
  timestamp: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  projectType?: string;
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

export interface AdminData {
  availabilityOverrides: Record<string, AvailabilityStatus>;
  quotes: QuoteLogEntry[];
}

function readData(): AdminData {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return { availabilityOverrides: {}, quotes: [] };
    }
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw) as AdminData;
  } catch {
    return { availabilityOverrides: {}, quotes: [] };
  }
}

function writeData(data: AdminData): void {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export function getAvailabilityOverrides(): Record<string, AvailabilityStatus> {
  return readData().availabilityOverrides;
}

export function setAvailabilityOverrides(
  overrides: Record<string, AvailabilityStatus>
): void {
  const data = readData();
  data.availabilityOverrides = overrides;
  writeData(data);
}

export function getQuotes(): QuoteLogEntry[] {
  return readData().quotes;
}

export function addQuote(entry: QuoteLogEntry): void {
  const data = readData();
  data.quotes = [entry, ...data.quotes].slice(0, 500); // keep last 500
  writeData(data);
}

export function updateQuoteHandled(id: string, handled: boolean): void {
  const data = readData();
  const quote = data.quotes.find((q) => q.id === id);
  if (quote) {
    quote.handled = handled;
    writeData(data);
  }
}
