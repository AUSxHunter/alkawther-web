"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, RotateCcw, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import type { QuoteLogEntry } from "@/lib/admin-store";

interface TrashTableProps {
  initialQuotes: QuoteLogEntry[];
}

export function TrashTable({ initialQuotes }: TrashTableProps) {
  const [quotes, setQuotes] = useState(initialQuotes);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const router = useRouter();

  function toggleExpanded(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function restore(id: string) {
    try {
      const res = await fetch("/api/admin/quotes", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, trashed: false }),
      });
      if (res.ok) {
        setQuotes((prev) => prev.filter((q) => q.id !== id));
        router.refresh();
      }
    } catch {
      // silently ignore
    }
  }

  async function permanentlyDelete(id: string) {
    try {
      const res = await fetch("/api/admin/quotes", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setQuotes((prev) => prev.filter((q) => q.id !== id));
        setConfirmDelete(null);
      }
    } catch {
      // silently ignore
    }
  }

  if (quotes.length === 0) {
    return (
      <div className="bg-white border border-cream-dark p-12 text-center">
        <p className="text-sm font-semibold text-ink mb-1">Trash is empty</p>
        <p className="text-xs text-warm-gray font-sans">Quotes you move to trash will appear here.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-red-100 divide-y divide-red-50">
      {quotes.map((quote) => {
        const isOpen = expanded.has(quote.id);
        const isConfirming = confirmDelete === quote.id;
        const date = new Date(quote.timestamp).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });
        const time = new Date(quote.timestamp).toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        });

        return (
          <div key={quote.id}>
            <div className="flex items-center gap-3 px-4 py-3">
              <button
                onClick={() => toggleExpanded(quote.id)}
                className="text-warm-gray hover:text-ink transition-colors flex-shrink-0"
                aria-label={isOpen ? "Collapse" : "Expand"}
              >
                {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-warm-gray font-sans truncate">
                  {quote.name}
                  {quote.company && (
                    <span className="ml-1.5 font-normal">— {quote.company}</span>
                  )}
                </p>
                <p className="text-xs text-warm-gray/70 font-sans mt-0.5">
                  {date} at {time} · {quote.items.length} item{quote.items.length !== 1 ? "s" : ""}
                </p>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => restore(quote.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold font-sans border border-cream-dark text-warm-gray hover:text-ink hover:bg-cream transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Restore
                </button>

                {isConfirming ? (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => permanentlyDelete(quote.id)}
                      className="px-3 py-1.5 text-xs font-semibold font-sans bg-red-600 text-white hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => setConfirmDelete(null)}
                      className="p-1.5 text-warm-gray hover:text-ink transition-colors"
                      aria-label="Cancel"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmDelete(quote.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold font-sans border border-red-200 text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete
                  </button>
                )}
              </div>
            </div>

            {isOpen && (
              <div className="px-4 sm:px-10 pb-4 pt-1 bg-red-50/30">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 mb-4 text-xs font-sans">
                  <div>
                    <span className="text-warm-gray">Email: </span>
                    <span className="text-ink">{quote.email}</span>
                  </div>
                  {quote.phone && (
                    <div>
                      <span className="text-warm-gray">Phone: </span>
                      <span className="text-ink">{quote.phone}</span>
                    </div>
                  )}
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs font-sans border border-cream-dark bg-white">
                    <thead>
                      <tr className="bg-cream border-b border-cream-dark">
                        <th className="text-left px-3 py-2 text-warm-gray font-bold uppercase tracking-wide">Product</th>
                        <th className="text-left px-3 py-2 text-warm-gray font-bold uppercase tracking-wide">Variant</th>
                        <th className="text-center px-3 py-2 text-warm-gray font-bold uppercase tracking-wide">Qty</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-cream-dark">
                      {quote.items.map((item, i) => (
                        <tr key={i}>
                          <td className="px-3 py-2 text-ink">{item.productName}</td>
                          <td className="px-3 py-2 text-warm-gray">{item.variantLabel}</td>
                          <td className="px-3 py-2 text-center text-ink font-semibold">{item.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {quote.message && (
                  <div className="mt-3 p-3 bg-white border border-cream-dark text-xs font-sans text-warm-gray">
                    <span className="font-semibold text-ink">Notes: </span>
                    {quote.message}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
