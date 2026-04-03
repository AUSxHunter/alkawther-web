import { getAvailabilityOverrides } from "@/lib/admin-store";
import { categories } from "@/data/categories";
import { productsByCategory } from "@/data/products";
import { AvailabilityManager } from "@/components/admin/AvailabilityManager";
import type { AvailabilityStatus } from "@/types";

export default async function AvailabilityPage() {
  const overrides = await getAvailabilityOverrides();

  const categoryData = categories.map((cat) => ({
    id: cat.id,
    slug: cat.slug,
    name: cat.name,
    products: (productsByCategory[cat.slug] ?? []).map((p) => ({
      id: p.id,
      name: p.name,
      group: p.group,
      defaultAvailability: p.defaultAvailability,
      currentAvailability: (overrides[p.id] ?? p.defaultAvailability) as AvailabilityStatus,
    })),
  }));

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="font-display font-bold text-2xl text-ink mb-1">Availability</h1>
        <p className="text-sm text-warm-gray font-sans">
          Control product availability status. Changes are reflected immediately on the website.
        </p>
      </div>
      <AvailabilityManager categories={categoryData} initialOverrides={overrides} />
    </div>
  );
}
