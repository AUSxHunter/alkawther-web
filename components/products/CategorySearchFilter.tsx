"use client";

import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import Fuse from "fuse.js";
import type { Category } from "@/types";
import { allProducts } from "@/data/products";
import { CategoryGrid } from "@/components/products/CategoryGrid";

interface CategorySearchFilterProps {
  categories: Category[];
}

// Build a set of category slugs that contain matching products for a query
function getCategorySlugsByProductMatch(query: string): Set<string> {
  const fuse = new Fuse(allProducts, {
    keys: ["name", "tags", "brands", "shortDescription"],
    threshold: 0.35,
    minMatchCharLength: 2,
  });
  const results = fuse.search(query, { limit: 50 });
  return new Set(results.map((r) => r.item.categorySlug));
}

export function CategorySearchFilter({ categories }: CategorySearchFilterProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const trimmed = query.trim();
    if (trimmed.length < 2) return categories;

    // Match by category name / description
    const categoryFuse = new Fuse(categories, {
      keys: ["name", "shortDescription"],
      threshold: 0.35,
      minMatchCharLength: 2,
    });
    const catMatches = new Set(categoryFuse.search(trimmed).map((r) => r.item.slug));

    // Also include categories that have matching products
    const productMatches = getCategorySlugsByProductMatch(trimmed);

    const combined = new Set(Array.from(catMatches).concat(Array.from(productMatches)));
    if (combined.size === 0) return [];
    return categories.filter((c) => combined.has(c.slug));
  }, [categories, query]);

  return (
    <div>
      {/* Filter bar */}
      <div className="mb-8">
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-gray pointer-events-none" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter by category or product name…"
            className="w-full pl-10 pr-10 py-2.5 text-sm font-sans text-ink placeholder:text-warm-gray/50 border border-cream-dark bg-white focus:outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/30 transition-colors"
            autoComplete="off"
            spellCheck={false}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-gray hover:text-ink transition-colors"
              aria-label="Clear filter"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        {query.trim().length >= 2 && (
          <p className="mt-2 text-xs text-warm-gray">
            {filtered.length === 0
              ? "No categories match your search."
              : `Showing ${filtered.length} of ${categories.length} categories`}
          </p>
        )}
      </div>

      <CategoryGrid categories={filtered} />
    </div>
  );
}
