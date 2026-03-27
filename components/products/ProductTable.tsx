"use client";

import { useState } from "react";
import type { Product, Category } from "@/types";
import { AvailabilityBadge } from "@/components/ui/Badge";
import { QuantityInput } from "./QuantityInput";
import { AddToQuoteButton } from "./AddToQuoteButton";

interface ProductTableProps {
  products: Product[];
  category: Category;
  groupLabel?: string;
}

interface ProductRowState {
  [productId: string]: {
    selectedVariantId: string;
    quantity: number;
    selectedBrand: string;
  };
}

export function ProductTable({ products, category, groupLabel }: ProductTableProps) {
  const [rowState, setRowState] = useState<ProductRowState>(() => {
    const initial: ProductRowState = {};
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

  const updateRow = (productId: string, update: Partial<ProductRowState[string]>) => {
    setRowState((prev) => ({
      ...prev,
      [productId]: { ...prev[productId], ...update },
    }));
  };

  return (
    <div className="mb-8">
      {groupLabel && (
        <div className="flex items-center gap-3 mb-3">
          <div className="section-divider" />
          <h3 className="font-sans font-bold text-ink text-sm uppercase tracking-widest">
            {groupLabel}
          </h3>
        </div>
      )}

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto border border-cream-dark">
        <table className="w-full product-table">
          <thead>
            <tr>
              <th className="text-left" style={{ width: "25%" }}>Product</th>
              <th className="text-left" style={{ width: "20%" }}>Size / Variant</th>
              <th className="text-center" style={{ width: "12%" }}>Qty / Ton</th>
              <th className="text-left" style={{ width: "15%" }}>Brand / Source</th>
              <th className="text-center" style={{ width: "13%" }}>Availability</th>
              <th className="text-center" style={{ width: "8%" }}>Qty</th>
              <th className="text-center" style={{ width: "12%" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const state = rowState[product.id];
              const selectedVariant =
                product.variants.find((v) => v.id === state?.selectedVariantId) ??
                product.variants[0];

              if (!selectedVariant) return null;

              return (
                <tr key={product.id} className="hover:bg-cream/50 transition-colors">
                  {/* Product Name */}
                  <td>
                    <div>
                      <div className="font-semibold text-ink text-sm leading-snug">
                        {product.name}
                      </div>
                      {product.shortDescription && (
                        <div className="text-xs text-warm-gray mt-0.5 leading-snug">
                          {product.shortDescription}
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Variant selector */}
                  <td>
                    {product.variants.length > 1 ? (
                      <select
                        value={state?.selectedVariantId}
                        onChange={(e) =>
                          updateRow(product.id, { selectedVariantId: e.target.value })
                        }
                        className="text-sm border border-cream-dark bg-white text-ink px-2 py-1.5 focus:outline-none focus:border-gold w-full max-w-[140px]"
                      >
                        {product.variants.map((v) => (
                          <option key={v.id} value={v.id}>
                            {v.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className="text-sm text-ink">
                        {selectedVariant.label}
                        {selectedVariant.dimensions && (
                          <span className="text-xs text-warm-gray block">
                            {selectedVariant.dimensions}
                          </span>
                        )}
                      </span>
                    )}
                  </td>

                  {/* Qty per ton */}
                  <td className="text-center">
                    <span className="text-sm text-warm-gray">
                      {selectedVariant.quantityPerTon ?? "—"}
                    </span>
                  </td>

                  {/* Brand selector */}
                  <td>
                    {product.brands && product.brands.length > 1 ? (
                      <select
                        value={state?.selectedBrand}
                        onChange={(e) =>
                          updateRow(product.id, { selectedBrand: e.target.value })
                        }
                        className="text-sm border border-cream-dark bg-white text-ink px-2 py-1.5 focus:outline-none focus:border-gold w-full max-w-[120px]"
                      >
                        <option value="">Any</option>
                        {product.brands.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className="text-sm text-ink">
                        {selectedVariant.brand ?? product.brands?.[0] ?? "—"}
                      </span>
                    )}
                  </td>

                  {/* Availability */}
                  <td className="text-center">
                    <AvailabilityBadge status={selectedVariant.availability} />
                  </td>

                  {/* Quantity input */}
                  <td className="text-center">
                    <QuantityInput
                      value={state?.quantity ?? 1}
                      onChange={(q) => updateRow(product.id, { quantity: q })}
                      compact
                    />
                  </td>

                  {/* Add to Quote */}
                  <td className="text-center">
                    <AddToQuoteButton
                      product={product}
                      variant={selectedVariant}
                      quantity={state?.quantity ?? 1}
                      selectedBrand={state?.selectedBrand}
                      categoryName={category.name}
                      compact
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile card list */}
      <div className="md:hidden space-y-3">
        {products.map((product) => {
          const state = rowState[product.id];
          const selectedVariant =
            product.variants.find((v) => v.id === state?.selectedVariantId) ??
            product.variants[0];

          if (!selectedVariant) return null;

          return (
            <div
              key={product.id}
              className="border border-cream-dark bg-white p-4 space-y-3"
            >
              <div>
                <h4 className="font-semibold text-ink text-sm">{product.name}</h4>
                {product.shortDescription && (
                  <p className="text-xs text-warm-gray mt-0.5">{product.shortDescription}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                {product.variants.length > 1 && (
                  <div>
                    <label className="text-xs text-warm-gray block mb-1">Size / Variant</label>
                    <select
                      value={state?.selectedVariantId}
                      onChange={(e) =>
                        updateRow(product.id, { selectedVariantId: e.target.value })
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

                {product.brands && product.brands.length > 1 && (
                  <div>
                    <label className="text-xs text-warm-gray block mb-1">Brand</label>
                    <select
                      value={state?.selectedBrand}
                      onChange={(e) =>
                        updateRow(product.id, { selectedBrand: e.target.value })
                      }
                      className="text-sm border border-cream-dark bg-white text-ink px-2 py-1.5 w-full focus:outline-none focus:border-gold"
                    >
                      <option value="">Any</option>
                      {product.brands.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AvailabilityBadge status={selectedVariant.availability} />
                  <QuantityInput
                    value={state?.quantity ?? 1}
                    onChange={(q) => updateRow(product.id, { quantity: q })}
                    compact
                  />
                  {selectedVariant.unit && (
                    <span className="text-xs text-warm-gray">{selectedVariant.unit}</span>
                  )}
                </div>
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
