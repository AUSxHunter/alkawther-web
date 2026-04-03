import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategoryBySlug, categories } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";
import { getAvailabilityOverrides } from "@/lib/admin-store";
import { CategoryHero } from "@/components/products/CategoryHero";
import { ProductTable } from "@/components/products/ProductTable";
import { ProductCardList } from "@/components/products/ProductCardList";
import { CategoryContactCTA } from "@/components/products/CategoryContactCTA";
import { Container } from "@/components/ui/Container";
import type { Product } from "@/types";

// Always render fresh so admin availability overrides are reflected immediately
export const dynamic = "force-dynamic";

interface Props {
  params: { categorySlug: string };
}

export async function generateStaticParams() {
  return categories.map((cat) => ({ categorySlug: cat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = getCategoryBySlug(params.categorySlug);
  if (!category) return {};

  return {
    title: category.name,
    description: `${category.shortDescription} Browse our range and request a quotation.`,
    openGraph: {
      title: category.name,
      description: category.shortDescription,
    },
  };
}

export default function CategoryPage({ params }: Props) {
  const category = getCategoryBySlug(params.categorySlug);
  if (!category) notFound();

  const rawProducts = getProductsByCategory(category.slug);
  const overrides = getAvailabilityOverrides();

  // Merge admin availability overrides into product data
  const products: Product[] = rawProducts.map((p) => {
    const override = overrides[p.id];
    if (!override) return p;
    return {
      ...p,
      defaultAvailability: override,
      variants: p.variants.map((v) => ({ ...v, availability: override })),
    };
  });

  const groups = Object.fromEntries(
    Object.entries(
      products.reduce<Record<string, Product[]>>((acc, p) => {
        const g = p.group ?? "General";
        if (!acc[g]) acc[g] = [];
        acc[g].push(p);
        return acc;
      }, {})
    )
  );
  const groupEntries = Object.entries(groups);
  const hasGroups = groupEntries.length > 1;

  const DisplayComponent = category.displayMode === "cards" ? ProductCardList : ProductTable;

  return (
    <>
      <CategoryHero category={category} productCount={products.length} />

      <section className="py-12 bg-white">
        <Container>
          {/* Group intro if multiple groups */}
          {hasGroups ? (
            <div className="space-y-10">
              {groupEntries.map(([groupName, groupProducts]) => (
                <DisplayComponent
                  key={groupName}
                  products={groupProducts}
                  category={category}
                  groupLabel={groupName}
                />
              ))}
            </div>
          ) : (
            <DisplayComponent
              products={products}
              category={category}
            />
          )}

          {products.length === 0 && (
            <div className="text-center py-20">
              <p className="text-warm-gray text-lg">
                Products for this category are coming soon.
              </p>
              <p className="text-warm-gray/60 text-sm mt-2">
                Contact us directly for availability and pricing.
              </p>
            </div>
          )}
        </Container>
      </section>

      <CategoryContactCTA categoryName={category.name} />
    </>
  );
}
