"use client";

import { useMemo, useState } from "react";
import Fuse, { type IFuseOptions } from "fuse.js";
import { allProducts } from "@/data/products";
import { categories } from "@/data/categories";
import type { Product } from "@/types";

export interface SearchResult {
  product: Product;
  categoryName: string;
  categorySlug: string;
  score: number;
}

const fuseOptions: IFuseOptions<Product> = {
  keys: [
    { name: "name", weight: 0.5 },
    { name: "tags", weight: 0.25 },
    { name: "brands", weight: 0.15 },
    { name: "shortDescription", weight: 0.1 },
  ],
  threshold: 0.35,
  includeScore: true,
  minMatchCharLength: 2,
};

const categoryNameMap = Object.fromEntries(
  categories.map((c) => [c.slug, c.name])
);

export function useProductSearch(query: string, limit = 8): SearchResult[] {
  const fuse = useMemo(() => new Fuse(allProducts, fuseOptions), []);

  return useMemo(() => {
    const trimmed = query.trim();
    if (trimmed.length < 2) return [];

    return fuse
      .search(trimmed, { limit })
      .map((result) => ({
        product: result.item,
        categoryName: categoryNameMap[result.item.categorySlug] ?? result.item.categorySlug,
        categorySlug: result.item.categorySlug,
        score: result.score ?? 1,
      }));
  }, [fuse, query, limit]);
}
