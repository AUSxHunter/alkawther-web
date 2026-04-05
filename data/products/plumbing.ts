import type { Product } from "@/types";

export const plumbingProducts: Product[] = [
  {
    id: "pl-001",
    categorySlug: "plumbing-bathroom-utility",
    slug: "hose-pipe-plumbing",
    name: "Hose Pipe",
    shortDescription: "3/4 inch × 50 metre hose pipe for site water supply and plumbing.",
    defaultAvailability: "available",
    group: "Plumbing / Bathroom / Utility",
    featured: true,
    tags: ["hose pipe", "3/4 inch", "50m", "site hose"],
    variants: [
      { id: "pl-001-v1", label: "3/4\" × 50 MTR", size: "3/4\"", dimensions: "50m", unit: "roll", availability: "available" },
    ],
  },
  {
    id: "pl-002",
    categorySlug: "plumbing-bathroom-utility",
    slug: "water-tank-plumbing",
    name: "Water Tank",
    shortDescription: "1000 gallon water storage tank for site water supply.",
    defaultAvailability: "available",
    group: "Plumbing / Bathroom / Utility",
    tags: ["water tank", "storage tank", "1000G"],
    variants: [
      { id: "pl-002-v1", label: "1000 G", size: "1000G", unit: "pcs", availability: "available" },
    ],
  },
  {
    id: "pl-003",
    categorySlug: "plumbing-bathroom-utility",
    slug: "silicon-caulking-gun-plumbing",
    name: "Silicon / Caulking Gun",
    shortDescription: "Manual caulking gun for silicone sealants and plumbing applications.",
    defaultAvailability: "available",
    group: "Plumbing / Bathroom / Utility",
    tags: ["caulking gun", "silicone gun", "sealant gun", "plumbing"],
    variants: [
      { id: "pl-003-v1", label: "Standard", unit: "pcs", availability: "available" },
    ],
  },
  {
    id: "pl-004",
    categorySlug: "plumbing-bathroom-utility",
    slug: "pipe-22mm-3mtr-plumbing",
    name: "Pipe 22 MM × 3 MTR",
    shortDescription: "Light-duty 22mm pipe, 3 metre length, for plumbing and water supply.",
    defaultAvailability: "available",
    group: "Plumbing / Bathroom / Utility",
    tags: ["pipe", "22mm", "3m", "LD", "plumbing"],
    variants: [
      { id: "pl-004-v1", label: "22MM × 3MTR — LD", size: "22mm", dimensions: "3m", unit: "length", availability: "available" },
    ],
  },
  {
    id: "pl-005",
    categorySlug: "plumbing-bathroom-utility",
    slug: "water-stopper-plumbing",
    name: "Water Stopper",
    shortDescription: "PVC water stopper for sealing construction joints against water ingress.",
    defaultAvailability: "available",
    group: "Plumbing / Bathroom / Utility",
    tags: ["water stopper", "joint seal", "construction joint"],
    variants: [
      { id: "pl-005-v1", label: "Standard", unit: "roll", availability: "available" },
    ],
  },
  {
    id: "pl-006",
    categorySlug: "plumbing-bathroom-utility",
    slug: "water-pump-1hp-plumbing",
    name: "Water Pump 1 HP",
    shortDescription: "Vido 1 HP water pump for site dewatering and water transfer.",
    defaultAvailability: "available",
    brands: ["Vido"],
    group: "Plumbing / Bathroom / Utility",
    tags: ["water pump", "1HP", "site pump", "Vido"],
    variants: [
      { id: "pl-006-v1", label: "1 HP", size: "1HP", unit: "pcs", availability: "available" },
    ],
  },
];
