import type { Product } from "@/types";

export const bricksMasonryProducts: Product[] = [
  // ── Beads & Trims ─────────────────────────────────────────────────────────
  {
    id: "bm-001",
    categorySlug: "bricks-masonry",
    slug: "plaster-stop-bead",
    name: "Plaster Stop Bead",
    shortDescription: "Galvanised plaster stop bead for clean plaster terminations and reveals.",
    defaultAvailability: "available",
    group: "Beads & Trims",
    tags: ["plaster bead", "stop bead", "render", "masonry"],
    variants: [
      { id: "bm-001-v1", label: "Standard", unit: "pcs", availability: "available" },
    ],
  },
  {
    id: "bm-002",
    categorySlug: "bricks-masonry",
    slug: "architrave-bead-double-side",
    name: "Architrave Bead (Double Side)",
    shortDescription: "Double-sided architrave bead for door and window reveals.",
    defaultAvailability: "available",
    group: "Beads & Trims",
    tags: ["architrave bead", "double side", "plaster", "reveal"],
    variants: [
      { id: "bm-002-v1", label: "Standard", unit: "pcs", availability: "available" },
    ],
  },
  {
    id: "bm-003",
    categorySlug: "bricks-masonry",
    slug: "movement-bead",
    name: "Movement Bead",
    shortDescription: "Expansion and movement bead for plaster and render systems.",
    defaultAvailability: "available",
    group: "Beads & Trims",
    tags: ["movement bead", "expansion joint", "plaster"],
    variants: [
      { id: "bm-003-v1", label: "Standard", unit: "pcs", availability: "available" },
    ],
  },
  {
    id: "bm-004",
    categorySlug: "bricks-masonry",
    slug: "pvc-tile-trim",
    name: "PVC Tile Trim",
    shortDescription: "PVC edge trim for finishing tile edges and transitions.",
    defaultAvailability: "available",
    group: "Beads & Trims",
    tags: ["PVC trim", "tile trim", "edge trim"],
    variants: [
      { id: "bm-004-v1", label: "Standard", unit: "pcs", availability: "available" },
    ],
  },

  // ── Block & Tile Tools ────────────────────────────────────────────────────
  {
    id: "bm-005",
    categorySlug: "bricks-masonry",
    slug: "block-saw",
    name: "Block Saw",
    shortDescription: "500mm block saw for cutting concrete blocks and masonry units.",
    defaultAvailability: "available",
    group: "Block & Tile Tools",
    tags: ["block saw", "masonry saw", "500mm"],
    variants: [
      { id: "bm-005-v1", label: "500 MM", size: "500mm", unit: "pcs", availability: "available" },
    ],
  },
  {
    id: "bm-006",
    categorySlug: "bricks-masonry",
    slug: "ceramic-germala-notched-trowel",
    name: "Ceramic Germala (Notched Trowel)",
    shortDescription: "Notched trowel for spreading tile adhesive and bedding ceramic tiles.",
    defaultAvailability: "available",
    group: "Block & Tile Tools",
    tags: ["notched trowel", "tile adhesive", "ceramic", "germala"],
    variants: [
      { id: "bm-006-v1", label: "Standard", unit: "pcs", availability: "available" },
    ],
  },
  {
    id: "bm-007",
    categorySlug: "bricks-masonry",
    slug: "tile-spacer",
    name: "Tile Spacer",
    shortDescription: "Plastic tile spacers for maintaining consistent grout joint width.",
    defaultAvailability: "available",
    group: "Block & Tile Tools",
    tags: ["tile spacer", "grout joint", "tiling"],
    variants: [
      { id: "bm-007-v1", label: "Standard", unit: "pcs", availability: "available" },
    ],
  },
  {
    id: "bm-008",
    categorySlug: "bricks-masonry",
    slug: "tile-cutter",
    name: "Tile Cutter",
    shortDescription: "110mm manual tile cutter for clean straight cuts on ceramic and porcelain tiles.",
    defaultAvailability: "available",
    group: "Block & Tile Tools",
    tags: ["tile cutter", "110mm", "ceramic", "porcelain"],
    variants: [
      { id: "bm-008-v1", label: "110 MM", size: "110mm", unit: "pcs", availability: "available" },
    ],
  },
  {
    id: "bm-009",
    categorySlug: "bricks-masonry",
    slug: "tile-cutting-blade",
    name: "Tile Cutting Blade",
    shortDescription: "Uken diamond blade for tile cutting machines.",
    defaultAvailability: "available",
    brands: ["Uken"],
    group: "Block & Tile Tools",
    tags: ["tile blade", "cutting blade", "Uken", "diamond"],
    variants: [
      { id: "bm-009-v1", label: "Standard", unit: "pcs", availability: "available" },
    ],
  },
  {
    id: "bm-010",
    categorySlug: "bricks-masonry",
    slug: "tile-cutting-scrapper",
    name: "Tile Cutting Scrapper",
    shortDescription: "Scrapper tool for cleaning and finishing tile cuts.",
    defaultAvailability: "available",
    group: "Block & Tile Tools",
    tags: ["tile scrapper", "tile finishing", "cutting"],
    variants: [
      { id: "bm-010-v1", label: "Standard", unit: "pcs", availability: "available" },
    ],
  },
];
