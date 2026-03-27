"use client";

import { useState } from "react";
import type { Product, Category } from "@/types";
import { AvailabilityBadge } from "@/components/ui/Badge";
import { QuantityInput } from "./QuantityInput";
import { AddToQuoteButton } from "./AddToQuoteButton";

interface ProductCardListProps {
  products: Product[];
  category: Category;
  groupLabel?: string;
}

interface CardState {
  [productId: string]: {
    selectedVariantId: string;
    quantity: number;
    selectedBrand: string;
  };
}

export function ProductCardList({ products, category, groupLabel }: ProductCardListProps) {
  const [cardState, setCardState] = useState<CardState>(() => {
    const initial: CardState = {};
    products.forEach((product) => {
      initial[product.id] = {
        selectedVariantId: product.variants[0]?.id ?? "",
        quantity: 1,
        selectedBrand: product.brands?.[0] ?? "",
      };
    });
    return initial;
  });

  if (products.length === 0) return null;

  const updateState = (productId: string, update: Partial<CardState[string]>) => {
    setCardState((prev) => ({
      ...prev,
      [productId]: { ...prev[productId], ...update },
    }));
  };

  return (
    <div className="mb-8">
      {groupLabel && (
        <div className="flex items-center gap-3 mb-4">
          <div className="section-divider" />
          <h3 className="font-sans font-bold text-ink text-sm uppercase tracking-widest">
            {groupLabel}
          </h3>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => {
          const state = cardState[product.id];
          const selectedVariant =
            product.variants.find((v) => v.id === state?.selectedVariantId) ??
            product.variants[0];

          if (!selectedVariant) return null;

          return (
            <div
              key={product.id}
              className="group border border-cream-dark bg-white hover:border-gold/30 hover:shadow-card-hover transition-all duration-200 flex flex-col"
            >
              <div className="p-5 flex-1 space-y-3">
                {/* Header */}
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-sans font-bold text-ink text-sm leading-snug group-hover:text-gold transition-colors">
                      {product.name}
                    </h4>
                    {product.featured && (
                      <span className="bg-gold/10 text-gold text-[10px] font-bold px-1.5 py-0.5 flex-shrink-0">
                        Popular
                      </span>
                    )}
                  </div>
                  {product.shortDescription && (
                    <p className="text-xs text-warm-gray mt-1 leading-relaxed line-clamp-2">
                      {product.shortDescription}
                    </p>
                  )}
                </div>

                {/* Variant selector */}
                {product.variants.length > 1 && (
                  <div>
                    <label className="text-[11px] text-warm-gray/60 uppercase tracking-wide block mb-1">
                      Select Option
                    </label>
                    <select
                      value={state?.selectedVariantId}
                      onChange={(e) =>
                        updateState(product.id, { selectedVariantId: e.target.value })
                      }
                      className="text-sm border border-cream-dark bg-white text-ink px-2 py-1.5 w-full focus:outline-none focus:border-gold"
                    >
                      {product.variants.map((v) => (
                        <option key={v.id} value={v.id}>
                          {v.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Brand selector */}
                {product.brands && product.brands.length > 1 && (
                  <div>
                    <label className="text-[11px] text-warm-gray/60 uppercase tracking-wide block mb-1">
                      Brand
                    </label>
                    <select
                      value={state?.selectedBrand}
                      onChange={(e) =>
                        updateState(product.id, { selectedBrand: e.target.value })
                      }
                      className="text-sm border border-cream-dark bg-white text-ink px-2 py-1.5 w-full focus:outline-none focus:border-gold"
                    >
                      <option value="">Any Brand</option>
                      {product.brands.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Availability */}
                <AvailabilityBadge status={selectedVariant.availability} />
              </div>

              {/* Footer */}
              <div className="border-t border-cream-dark px-5 py-3 flex items-center justify-between gap-3">
                <QuantityInput
                  value={state?.quantity ?? 1}
                  onChange={(q) => updateState(product.id, { quantity: q })}
                  compact
                />
                <span className="text-xs text-warm-gray">
                  {selectedVariant.unit}
                </span>
                <AddToQuoteButton
                  product={product}
                  variant={selectedVariant}
                  quantity={state?.quantity ?? 1}
                  selectedBrand={state?.selectedBrand}
                  categoryName={category.name}
                  compact
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
