"use client";

import { useState } from "react";
import { Plus, Check } from "lucide-react";
import { useQuoteCart } from "@/store/quote-cart";
import type { Product, ProductVariant } from "@/types";
import { cn } from "@/lib/utils";

interface AddToQuoteButtonProps {
  product: Product;
  variant: ProductVariant;
  quantity: number;
  selectedBrand?: string;
  categoryName: string;
  compact?: boolean;
}

export function AddToQuoteButton({
  product,
  variant,
  quantity,
  selectedBrand,
  categoryName,
  compact,
}: AddToQuoteButtonProps) {
  const { addItem } = useQuoteCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({
      productId: product.id,
      productName: product.name,
      categorySlug: product.categorySlug,
      categoryName,
      variantId: variant.id,
      variantLabel: variant.label,
      selectedBrand: selectedBrand ?? variant.brand,
      quantity,
      unit: variant.unit,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const isDisabled = variant.availability === "out-of-stock";

  return (
    <button
      onClick={handleAdd}
      disabled={isDisabled}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50",
        "disabled:opacity-40 disabled:cursor-not-allowed font-semibold font-sans",
        compact
          ? "px-3 py-1.5 text-xs"
          : "px-4 py-2 text-sm",
        added
          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
          : "bg-gold/10 text-gold border border-gold/30 hover:bg-gold hover:text-ink"
      )}
      aria-label={`Add ${product.name} to quote`}
    >
      {added ? (
        <>
          <Check className={cn("flex-shrink-0", compact ? "w-3 h-3" : "w-3.5 h-3.5")} />
          Added
        </>
      ) : (
        <>
          <Plus className={cn("flex-shrink-0", compact ? "w-3 h-3" : "w-3.5 h-3.5")} />
          {compact ? "Quote" : "Add to Quote"}
        </>
      )}
    </button>
  );
}
