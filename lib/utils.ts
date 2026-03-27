import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-AE", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength).trimEnd() + "…";
}

export const availabilityLabel: Record<string, string> = {
  available: "Available",
  limited: "Limited Stock",
  enquire: "Enquire",
  "out-of-stock": "Out of Stock",
};

export const availabilityClass: Record<string, string> = {
  available: "text-emerald-600 bg-emerald-50",
  limited: "text-amber-600 bg-amber-50",
  enquire: "text-gold bg-gold/10",
  "out-of-stock": "text-red-500 bg-red-50",
};
