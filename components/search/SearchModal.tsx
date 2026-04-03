"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight, Layers } from "lucide-react";
import { useProductSearch } from "@/hooks/useProductSearch";
import { AvailabilityBadge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const results = useProductSearch(query);

  // Focus input when modal opens
  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Reset active index when results change
  useEffect(() => {
    setActiveIndex(0);
  }, [results.length]);

  const navigateToProduct = useCallback(
    (categorySlug: string) => {
      router.push(`/products/${categorySlug}`);
      onClose();
    },
    [router, onClose]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (results.length === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => (i + 1) % results.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => (i - 1 + results.length) % results.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        const active = results[activeIndex];
        if (active) navigateToProduct(active.categorySlug);
      }
    },
    [results, activeIndex, navigateToProduct, onClose]
  );

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center pt-[10vh] px-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-ink/70 backdrop-blur-sm" />

      {/* Modal panel */}
      <div
        className="relative w-full max-w-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input row */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-cream-dark">
          <Search className="w-5 h-5 text-warm-gray flex-shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search products, materials, brands…"
            className="flex-1 text-base font-sans text-ink placeholder:text-warm-gray/50 bg-transparent outline-none"
            autoComplete="off"
            spellCheck={false}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-warm-gray hover:text-ink transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Results */}
        {results.length > 0 && (
          <ul className="max-h-[60vh] overflow-y-auto py-2">
            {results.map((result, idx) => (
              <li key={result.product.id}>
                <button
                  className={cn(
                    "w-full flex items-center gap-4 px-5 py-3 text-left transition-colors",
                    idx === activeIndex
                      ? "bg-cream"
                      : "hover:bg-cream/60"
                  )}
                  onClick={() => navigateToProduct(result.categorySlug)}
                  onMouseEnter={() => setActiveIndex(idx)}
                >
                  {/* Icon */}
                  <div className="w-9 h-9 bg-cream-dark flex items-center justify-center flex-shrink-0">
                    <Layers className="w-4 h-4 text-warm-gray" />
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-ink font-sans truncate">
                      {result.product.name}
                    </p>
                    <p className="text-xs text-warm-gray mt-0.5">
                      {result.categoryName}
                    </p>
                  </div>

                  {/* Availability */}
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <AvailabilityBadge status={result.product.defaultAvailability} />
                    <ArrowRight className="w-4 h-4 text-warm-gray/40" />
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Empty state */}
        {query.length >= 2 && results.length === 0 && (
          <div className="px-5 py-10 text-center">
            <p className="text-sm font-semibold text-ink mb-1">No products found</p>
            <p className="text-xs text-warm-gray">
              Try a different name, brand, or material type.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
