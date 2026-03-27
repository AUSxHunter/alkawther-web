import type { Product } from "@/types";
import { steelMetalProducts } from "./steel-metal";
import { woodPlywoodProducts } from "./wood-plywood";
import { pvcPlasticProducts } from "./pvc-plastic";
import { cementConcreteProducts } from "./cement-concrete";
import { paintFinishingProducts } from "./paint-finishing";
import { safetyEquipmentProducts } from "./safety-equipment";
import { bricksMasonryProducts } from "./bricks-masonry";
import { powerToolsProducts } from "./power-tools";
import { handToolsProducts } from "./hand-tools";
import { gypsumPlasterProducts } from "./gypsum-plaster";
import { electricalProducts } from "./electrical";
import { waterproofingProducts } from "./waterproofing";
import { adhesivesProducts } from "./adhesives";
import { plumbingProducts } from "./plumbing";

/** All products keyed by categorySlug */
export const productsByCategory: Record<string, Product[]> = {
  "steel-metal": steelMetalProducts,
  "wood-plywood": woodPlywoodProducts,
  "pvc-plastic-materials": pvcPlasticProducts,
  "cement-concrete": cementConcreteProducts,
  "paint-finishing": paintFinishingProducts,
  "safety-equipment": safetyEquipmentProducts,
  "bricks-masonry": bricksMasonryProducts,
  "power-tools": powerToolsProducts,
  "hand-tools": handToolsProducts,
  "gypsum-plaster": gypsumPlasterProducts,
  "electrical-materials": electricalProducts,
  waterproofing: waterproofingProducts,
  "adhesives-tile-adhesives": adhesivesProducts,
  "plumbing-bathroom-utility": plumbingProducts,
};

/** Flat list of all products across all categories */
export const allProducts: Product[] = Object.values(productsByCategory).flat();

/** Get products for a specific category */
export const getProductsByCategory = (categorySlug: string): Product[] =>
  productsByCategory[categorySlug] ?? [];

/** Get a single product by its id */
export const getProductById = (id: string): Product | undefined =>
  allProducts.find((p) => p.id === id);

/** Get product groups within a category (for grouped table rendering) */
export const getProductGroups = (categorySlug: string): Record<string, Product[]> => {
  const products = getProductsByCategory(categorySlug);
  return products.reduce<Record<string, Product[]>>((acc, product) => {
    const group = product.group ?? "General";
    if (!acc[group]) acc[group] = [];
    acc[group].push(product);
    return acc;
  }, {});
};

export {
  steelMetalProducts,
  woodPlywoodProducts,
  pvcPlasticProducts,
  cementConcreteProducts,
  paintFinishingProducts,
  safetyEquipmentProducts,
  bricksMasonryProducts,
  powerToolsProducts,
  handToolsProducts,
  gypsumPlasterProducts,
  electricalProducts,
  waterproofingProducts,
  adhesivesProducts,
  plumbingProducts,
};
