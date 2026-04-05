import type { Product } from "@/types";

export const gypsumPlasterProducts: Product[] = [
  {
    id: "gp-001",
    categorySlug: "gypsum-plaster",
    slug: "gypsum-powder",
    name: "Gypsum Powder",
    shortDescription: "High-purity gypsum powder for interior plaster and surface finishing.",
    defaultAvailability: "available",
    group: "Gypsum & Plaster",
    featured: true,
    tags: ["gypsum", "plaster", "gypsum powder"],
    variants: [
      { id: "gp-001-v1", label: "Standard Bag", unit: "bag", availability: "available" },
    ],
  },
  {
    id: "gp-002",
    categorySlug: "gypsum-plaster",
    slug: "rush-machine",
    name: "Rush Machine",
    shortDescription: "Plastering rush machine for fast and efficient gypsum application.",
    defaultAvailability: "available",
    group: "Gypsum & Plaster",
    tags: ["rush machine", "plastering machine", "gypsum"],
    variants: [
      { id: "gp-002-v1", label: "Standard", unit: "pcs", availability: "available" },
    ],
  },
];
