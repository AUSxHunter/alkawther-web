"use client";

import { useState, useTransition } from "react";
import { CheckCircle, AlertCircle, Save, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AvailabilityStatus } from "@/types";

interface ProductRow {
  id: string;
  name: string;
  group?: string;
  defaultAvailability: AvailabilityStatus;
  currentAvailability: AvailabilityStatus;
}

interface CategoryData {
  id: string;
  slug: string;
  name: string;
  products: ProductRow[];
}

interface AvailabilityManagerProps {
  categories: CategoryData[];
  initialOverrides: Record<string, AvailabilityStatus>;
}

const STATUS_OPTIONS: { value: AvailabilityStatus; label: string; color: string }[] = [
  { value: "available", label: "Available", color: "bg-emerald-50 text-emerald-700 border-emerald-300 data-[active=true]:bg-emerald-500 data-[active=true]:text-white data-[active=true]:border-emerald-500" },
  { value: "limited", label: "Limited", color: "bg-amber-50 text-amber-700 border-amber-300 data-[active=true]:bg-amber-500 data-[active=true]:text-white data-[active=true]:border-amber-500" },
  { value: "enquire", label: "Enquire", color: "bg-gold/10 text-gold border-gold/40 data-[active=true]:bg-gold data-[active=true]:text-ink data-[active=true]:border-gold" },
  { value: "out-of-stock", label: "Out of Stock", color: "bg-red-50 text-red-600 border-red-300 data-[active=true]:bg-red-500 data-[active=true]:text-white data-[active=true]:border-red-500" },
];

export function AvailabilityManager({ categories, initialOverrides }: AvailabilityManagerProps) {
  const [overrides, setOverrides] = useState<Record<string, AvailabilityStatus>>(initialOverrides);
  const [savedCategories, setSavedCategories] = useState<Set<string>>(new Set());
  const [errorCategories, setErrorCategories] = useState<Set<string>>(new Set());
  const [isPending, startTransition] = useTransition();

  function setProductStatus(productId: string, status: AvailabilityStatus) {
    setOverrides((prev) => ({ ...prev, [productId]: status }));
  }

  function resetCategory(categorySlug: string, productIds: string[]) {
    const next = { ...overrides };
    for (const id of productIds) {
      next[id] = "available";
    }
    setOverrides(next);
    // Auto-save after reset
    startTransition(async () => {
      const res = await fetch("/api/admin/availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(next),
      });
      if (res.ok) {
        setSavedCategories((prev) => { const s = new Set(prev); s.add(categorySlug); return s; });
        setTimeout(() => {
          setSavedCategories((prev) => { const s = new Set(prev); s.delete(categorySlug); return s; });
        }, 2500);
      }
    });
  }

  function saveCategory(categorySlug: string) {
    startTransition(async () => {
      try {
        const res = await fetch("/api/admin/availability", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(overrides),
        });

        if (res.ok) {
          setSavedCategories((prev) => {
            const next = new Set(prev);
            next.add(categorySlug);
            return next;
          });
          setErrorCategories((prev) => {
            const next = new Set(prev);
            next.delete(categorySlug);
            return next;
          });
          setTimeout(() => {
            setSavedCategories((prev) => {
              const next = new Set(prev);
              next.delete(categorySlug);
              return next;
            });
          }, 2500);
        } else {
          throw new Error("Save failed");
        }
      } catch {
        setErrorCategories((prev) => { const s = new Set(prev); s.add(categorySlug); return s; });
      }
    });
  }

  return (
    <div className="space-y-4">
      {categories.map((cat) => (
        <div key={cat.id} className="bg-white border border-cream-dark">
          {/* Category header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-cream-dark bg-cream/40">
            <h2 className="text-sm font-bold font-sans text-ink">{cat.name}</h2>
            <div className="flex items-center gap-3">
              {savedCategories.has(cat.slug) && (
                <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-sans font-semibold">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Saved
                </span>
              )}
              {errorCategories.has(cat.slug) && (
                <span className="flex items-center gap-1.5 text-xs text-red-500 font-sans font-semibold">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Error saving
                </span>
              )}
              <button
                onClick={() => resetCategory(cat.slug, cat.products.map((p) => p.id))}
                disabled={isPending}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-warm-gray border border-cream-dark text-xs font-bold font-sans hover:text-ink hover:border-ink/30 disabled:opacity-50 transition-colors"
                title="Reset all to Available"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
              <button
                onClick={() => saveCategory(cat.slug)}
                disabled={isPending}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-ink text-white text-xs font-bold font-sans hover:bg-charcoal disabled:opacity-50 transition-colors"
              >
                <Save className="w-3 h-3" />
                Save
              </button>
            </div>
          </div>

          {/* Product rows */}
          <div className="divide-y divide-cream-dark">
            {cat.products.map((product) => {
              const currentStatus = overrides[product.id] ?? product.defaultAvailability;

              return (
                <div
                  key={product.id}
                  className="flex flex-col sm:flex-row sm:items-center gap-3 px-5 py-3"
                >
                  <p className="text-sm font-sans text-ink flex-1 min-w-0 truncate">
                    {product.name}
                    {product.group && (
                      <span className="ml-2 text-xs text-warm-gray">({product.group})</span>
                    )}
                  </p>
                  <div className="flex flex-wrap gap-1.5 flex-shrink-0">
                    {STATUS_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        data-active={currentStatus === opt.value}
                        onClick={() => setProductStatus(product.id, opt.value)}
                        className={cn(
                          "px-2.5 py-1 text-xs font-semibold font-sans border transition-colors",
                          opt.color
                        )}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
