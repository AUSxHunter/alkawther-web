export type AvailabilityStatus = "available" | "limited" | "enquire" | "out-of-stock";

export interface ProductVariant {
  id: string;
  label: string;
  /** e.g. "8mm", "18mm", "2 inch" */
  size?: string;
  /** e.g. "1.5mm", "4mm" */
  thickness?: string;
  /** e.g. "100x50", "2400x1200" */
  dimensions?: string;
  /** Unit of measurement: "pcs", "ton", "roll", "bag", "m", "m²", etc. */
  unit?: string;
  /** Brand/source for this specific variant */
  brand?: string;
  /** For steel: how many pieces make up 1 ton */
  quantityPerTon?: number | string;
  availability: AvailabilityStatus;
  /** Any extra arbitrary key-value fields for display in table columns */
  specs?: Record<string, string | number>;
  /** Additional notes about this variant */
  notes?: string;
}

export interface Product {
  id: string;
  categorySlug: string;
  slug: string;
  name: string;
  shortDescription?: string;
  description?: string;
  /** Path to product image, relative to /public */
  image?: string;
  defaultAvailability: AvailabilityStatus;
  /** Global specs that apply to all variants */
  specs?: Record<string, string | number>;
  /** Available brands/sources for this product */
  brands?: string[];
  variants: ProductVariant[];
  /** Searchable keywords */
  tags?: string[];
  /** Whether to show prominent on category page */
  featured?: boolean;
  /** Display group heading within a category, e.g. "Primers & Compounds" */
  group?: string;
}
