"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, CheckCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { QuoteLogEntry } from "@/lib/admin-store";

interface QuoteLogTableProps {
  initialQuotes: QuoteLogEntry[];
}

export function QuoteLogTable({ initialQuotes }: QuoteLogTableProps) {
  const [quotes, setQuotes] = useState(initialQuotes);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  function toggleExpanded(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function toggleHandled(id: string, current: boolean) {
    const newHandled = !current;
    try {
      const res = await fetch("/api/admin/quotes", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, handled: newHandled }),
      });
      if (res.ok) {
        setQuotes((prev) =>
          prev.map((q) => (q.id === id ? { ...q, handled: newHandled } : q))
        );
      }
    } catch {
      // silently ignore
    }
  }

  const pending = quotes.filter((q) => !q.handled);
  const handled = quotes.filter((q) => q.handled);

  return (
    <div className="space-y-6">
      {/* Pending */}
      {pending.length > 0 && (
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-warm-gray font-sans mb-3">
            Pending ({pending.length})
          </p>
          <QuoteSection
            quotes={pending}
            expanded={expanded}
            onToggleExpand={toggleExpanded}
            onToggleHandled={toggleHandled}
          />
        </div>
      )}

      {/* Handled */}
      {handled.length > 0 && (
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-warm-gray font-sans mb-3">
            Handled ({handled.length})
          </p>
          <QuoteSection
            quotes={handled}
            expanded={expanded}
            onToggleExpand={toggleExpanded}
            onToggleHandled={toggleHandled}
          />
        </div>
      )}
    </div>
  );
}

function QuoteSection({
  quotes,
  expanded,
  onToggleExpand,
  onToggleHandled,
}: {
  quotes: QuoteLogEntry[];
  expanded: Set<string>;
  onToggleExpand: (id: string) => void;
  onToggleHandled: (id: string, current: boolean) => void;
}) {
  return (
    <div className="bg-white border border-cream-dark divide-y divide-cream-dark">
      {quotes.map((quote) => {
        const isOpen = expanded.has(quote.id);
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
            {/* Row */}
            <div className="flex items-center gap-3 px-4 py-3">
              <button
                onClick={() => onToggleExpand(quote.id)}
                className="text-warm-gray hover:text-ink transition-colors flex-shrink-0"
                aria-label={isOpen ? "Collapse" : "Expand"}
              >
                {isOpen ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-ink font-sans truncate">
                  {quote.name}
                  {quote.company && (
                    <span className="ml-1.5 text-warm-gray font-normal">— {quote.company}</span>
                  )}
                </p>
                <p className="text-xs text-warm-gray font-sans mt-0.5">
                  {date} at {time} · {quote.items.length} item{quote.items.length !== 1 ? "s" : ""}
                </p>
              </div>

              <button
                onClick={() => onToggleHandled(quote.id, quote.handled)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold font-sans border transition-colors flex-shrink-0",
                  quote.handled
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                    : "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
                )}
              >
                {quote.handled ? (
                  <CheckCircle className="w-3.5 h-3.5" />
                ) : (
                  <Clock className="w-3.5 h-3.5" />
                )}
                {quote.handled ? "Handled" : "Pending"}
              </button>
            </div>

            {/* Expanded details */}
            {isOpen && (
              <div className="px-10 pb-4 pt-1 bg-cream/30">
                <div className="grid grid-cols-2 gap-x-6 gap-y-1 mb-4 text-xs font-sans">
                  <div>
                    <span className="text-warm-gray">Email: </span>
                    <a href={`mailto:${quote.email}`} className="text-ink hover:text-gold transition-colors">
                      {quote.email}
                    </a>
                  </div>
                  {quote.phone && (
                    <div>
                      <span className="text-warm-gray">Phone: </span>
                      <a href={`tel:${quote.phone}`} className="text-ink hover:text-gold transition-colors">
                        {quote.phone}
                      </a>
                    </div>
                  )}
                </div>

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
