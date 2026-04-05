import type { Product } from "@/types";

export const cementConcreteProducts: Product[] = [
  // ── Cement ───────────────────────────────────────────────────────────────
  {
    id: "cc-001",
    categorySlug: "cement-concrete",
    slug: "opc-portland-cement-sharjah",
    name: "OPC Portland Cement – Sharjah",
    shortDescription: "Ordinary Portland Cement from Sharjah Cement Factory, 50 kg bag.",
    defaultAvailability: "available",
    brands: ["Sharjah Cement Factory"],
    group: "Cement",
    featured: true,
    tags: ["OPC", "cement", "Sharjah", "Portland"],
    variants: [
      { id: "cc-001-v1", label: "50 KG Bag", size: "50kg", unit: "bag", availability: "available" },
    ],
  },
  {
    id: "cc-002",
    categorySlug: "cement-concrete",
    slug: "src-sulfate-resisting-cement",
    name: "SRC Sulfate-Resisting Cement",
    shortDescription: "Sulphate Resistant Cement from Sharjah Cement Factory. For aggressive soil environments.",
    defaultAvailability: "available",
    brands: ["Sharjah Cement Factory"],
    group: "Cement",
    featured: true,
    tags: ["SRC", "sulphate resistant", "cement", "Sharjah"],
    variants: [
      { id: "cc-002-v1", label: "50 KG Bag", size: "50kg", unit: "bag", availability: "available" },
    ],
  },
  {
    id: "cc-003",
    categorySlug: "cement-concrete",
    slug: "opc-ultra-cement",
    name: "OPC Ultra Cement",
    shortDescription: "UltraTech Ordinary Portland Cement, 50 kg bag.",
    defaultAvailability: "available",
    brands: ["UltraTech"],
    group: "Cement",
    tags: ["OPC", "UltraTech", "cement"],
    variants: [
      { id: "cc-003-v1", label: "50 KG Bag", size: "50kg", unit: "bag", availability: "available" },
    ],
  },
  {
    id: "cc-004",
    categorySlug: "cement-concrete",
    slug: "opc-green-cement",
    name: "OPC Green Cement",
    shortDescription: "Green Cement brand Ordinary Portland Cement, 90 kg bag.",
    defaultAvailability: "available",
    brands: ["Green Cement"],
    group: "Cement",
    tags: ["OPC", "Green Cement", "cement", "90kg"],
    variants: [
      { id: "cc-004-v1", label: "90 KG Bag", size: "90kg", unit: "bag", availability: "available" },
    ],
  },

  // ── Tile Adhesive ─────────────────────────────────────────────────────────
  {
    id: "cc-005",
    categorySlug: "cement-concrete",
    slug: "tile-glue-c500-white",
    name: "Tile Glue C500 – White",
    shortDescription: "Conmix C500 standard-set white tile adhesive, 25 kg bag.",
    defaultAvailability: "available",
    brands: ["Conmix"],
    group: "Tile Adhesive",
    tags: ["tile glue", "Conmix", "C500", "white adhesive"],
    variants: [
      { id: "cc-005-v1", label: "25 KG — White", size: "25kg", unit: "bag", availability: "available" },
    ],
  },
  {
    id: "cc-006",
    categorySlug: "cement-concrete",
    slug: "tile-glue-c500-gray",
    name: "Tile Glue C500 – Gray",
    shortDescription: "Conmix C500 standard-set gray tile adhesive, 25 kg bag.",
    defaultAvailability: "available",
    brands: ["Conmix"],
    group: "Tile Adhesive",
    tags: ["tile glue", "Conmix", "C500", "gray adhesive"],
    variants: [
      { id: "cc-006-v1", label: "25 KG — Gray", size: "25kg", unit: "bag", availability: "available" },
    ],
  },

  // ── Accessories ──────────────────────────────────────────────────────────
  {
    id: "cc-007",
    categorySlug: "cement-concrete",
    slug: "concrete-cover-block",
    name: "Concrete Cover Block",
    shortDescription: "Pre-cast concrete spacer blocks for maintaining rebar cover depth.",
    defaultAvailability: "available",
    group: "Accessories",
    tags: ["cover block", "spacer", "rebar cover", "concrete"],
    variants: [
      { id: "cc-007-v1", label: "2 CM", size: "20mm", unit: "pcs", availability: "available" },
      { id: "cc-007-v2", label: "2.5 CM", size: "25mm", unit: "pcs", availability: "available" },
      { id: "cc-007-v3", label: "3 CM", size: "30mm", unit: "pcs", availability: "available" },
      { id: "cc-007-v4", label: "5 CM", size: "50mm", unit: "pcs", availability: "available" },
      { id: "cc-007-v5", label: "7.5 CM", size: "75mm", unit: "pcs", availability: "available" },
    ],
  },

  // ── Cutting & Drilling ────────────────────────────────────────────────────
  {
    id: "cc-008",
    categorySlug: "cement-concrete",
    slug: "diamond-cup-grinding-wheel",
    name: "Diamond Cup Grinding Wheel",
    shortDescription: "Uken diamond abrasive cup wheel for concrete and stone surface grinding.",
    defaultAvailability: "available",
    brands: ["Uken"],
    group: "Cutting & Drilling",
    tags: ["diamond wheel", "grinding", "concrete", "Uken"],
    variants: [
      { id: "cc-008-v1", label: "4.5\"", size: "4.5\"", unit: "pcs", availability: "available" },
    ],
  },
  {
    id: "cc-009",
    categorySlug: "cement-concrete",
    slug: "concrete-diamond-blade",
    name: "Concrete Diamond Blade",
    shortDescription: "Uken diamond segmented blade for cutting concrete, brick, and masonry.",
    defaultAvailability: "available",
    brands: ["Uken"],
    group: "Cutting & Drilling",
    tags: ["diamond blade", "concrete cutting", "4.5 inch", "Uken"],
    variants: [
      { id: "cc-009-v1", label: "4.5\"", size: "4.5\"", unit: "pcs", availability: "available" },
    ],
  },
  {
    id: "cc-010",
    categorySlug: "cement-concrete",
    slug: "concrete-drill-bit",
    name: "Concrete Drill Bit",
    shortDescription: "Masonry drill bits for drilling into concrete, brick, and block.",
    defaultAvailability: "available",
    group: "Cutting & Drilling",
    tags: ["drill bit", "concrete", "masonry drill"],
    variants: [
      { id: "cc-010-v1", label: "Standard", unit: "pcs", availability: "available" },
    ],
  },
];
