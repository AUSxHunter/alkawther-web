"use client";

import { Trash2, Minus, Plus } from "lucide-react";
import type { QuoteItem } from "@/types";
import { useQuoteCart } from "@/store/quote-cart";
import { cn } from "@/lib/utils";

interface QuoteItemRowProps {
  item: QuoteItem;
  compact?: boolean;
}

export function QuoteItemRow({ item, compact }: QuoteItemRowProps) {
  const { removeItem, updateQuantity } = useQuoteCart();

  return (
    <div
      className={cn(
        "flex items-start gap-3 p-4 border-b border-cream-dark last:border-0 group",
        compact && "py-3"
      )}
    >
      {/* Product info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-ink leading-snug truncate">
          {item.productName}
        </p>
        {item.variantLabel && (
          <p className="text-xs text-warm-gray mt-0.5">{item.variantLabel}</p>
        )}
        {item.selectedBrand && (
          <p className="text-xs text-gold/80 mt-0.5">{item.selectedBrand}</p>
        )}
        <p className="text-[11px] text-warm-gray/60 mt-1 uppercase tracking-wide">
          {item.categoryName}
        </p>
      </div>

      {/* Quantity controls */}
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <button
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          disabled={item.quantity <= 1}
          className="w-7 h-7 flex items-center justify-center border border-cream-dark text-ink hover:border-gold hover:text-gold transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Decrease quantity"
        >
          <Minus className="w-3 h-3" />
        </button>
        <span className="w-8 text-center text-sm font-bold text-ink">
          {item.quantity}
        </span>
        <button
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="w-7 h-7 flex items-center justify-center border border-cream-dark text-ink hover:border-gold hover:text-gold transition-colors"
          aria-label="Increase quantity"
        >
          <Plus className="w-3 h-3" />
        </button>
        {item.unit && (
          <span className="text-xs text-warm-gray ml-1">{item.unit}</span>
        )}
      </div>

      {/* Remove */}
      <button
        onClick={() => removeItem(item.id)}
        className="flex-shrink-0 p-1.5 text-warm-gray/40 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
        aria-label={`Remove ${item.productName}`}
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
