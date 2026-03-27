import type { Product } from "@/types";

export const bricksMasonryProducts: Product[] = [
  {
    id: "bm-001",
    categorySlug: "bricks-masonry",
    slug: "gi-lintel-masonry",
    name: "GI Lintel",
    shortDescription: "Galvanised steel lintels for brick and block openings.",
    defaultAvailability: "available",
    group: "Masonry Accessories",
    tags: ["lintel", "GI", "masonry", "brickwork"],
    variants: [
      { id: "bm-001-v1", label: "100×50mm", dimensions: "100×50mm", unit: "length", availability: "available" },
      { id: "bm-001-v2", label: "150×50mm", dimensions: "150×50mm", unit: "length", availability: "available" },
      { id: "bm-001-v3", label: "200×50mm", dimensions: "200×50mm", unit: "length", availability: "available" },
    ],
  },
  {
    id: "bm-002",
    categorySlug: "bricks-masonry",
    slug: "concrete-cover-block-masonry",
    name: "Concrete Cover Block",
    shortDescription: "Pre-cast cover blocks for maintaining rebar cover in blockwork.",
    defaultAvailability: "available",
    group: "Masonry Accessories",
    tags: ["cover block", "spacer", "masonry"],
    variants: [
      { id: "bm-002-v1", label: "20mm", size: "20mm", unit: "pcs", availability: "available" },
      { id: "bm-002-v2", label: "25mm", size: "25mm", unit: "pcs", availability: "available" },
      { id: "bm-002-v3", label: "30mm", size: "30mm", unit: "pcs", availability: "available" },
      { id: "bm-002-v4", label: "50mm", size: "50mm", unit: "pcs", availability: "available" },
    ],
  },
  {
    id: "bm-003",
    categorySlug: "bricks-masonry",
    slug: "expanded-block-mesh-masonry",
    name: "Expanded Block Mesh",
    shortDescription: "Galvanised expanded mesh for block joint reinforcement.",
    defaultAvailability: "available",
    group: "Masonry Accessories",
    tags: ["block mesh", "masonry mesh", "expanded mesh"],
    variants: [
      { id: "bm-003-v1", label: "4 inch", size: "4\"", unit: "roll", availability: "available" },
      { id: "bm-003-v2", label: "6 inch", size: "6\"", unit: "roll", availability: "available" },
      { id: "bm-003-v3", label: "8 inch", size: "8\"", unit: "roll", availability: "available" },
    ],
  },
  {
    id: "bm-004",
    categorySlug: "bricks-masonry",
    slug: "wall-ties",
    name: "Wall Ties",
    shortDescription: "Galvanised wire wall ties for cavity and blockwork construction.",
    defaultAvailability: "available",
    group: "Masonry Accessories",
    tags: ["wall ties", "masonry tie", "cavity wall"],
    variants: [
      { id: "bm-004-v1", label: "Standard", unit: "box", availability: "available" },
    ],
  },
];
