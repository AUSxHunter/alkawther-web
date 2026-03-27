import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/categories";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";

const featuredSlugs = [
  "steel-metal",
  "cement-concrete",
  "wood-plywood",
  "waterproofing",
  "electrical-materials",
  "paint-finishing",
];

const featuredCategories = featuredSlugs
  .map((slug) => categories.find((c) => c.slug === slug))
  .filter(Boolean) as typeof categories;

const categoryColors: Record<string, string> = {
  "steel-metal": "from-charcoal-dark to-charcoal",
  "cement-concrete": "from-[#3D3530] to-[#2A2220]",
  "wood-plywood": "from-[#3D2B1A] to-[#2A1E10]",
  waterproofing: "from-[#1A2A3D] to-[#101E2A]",
  "electrical-materials": "from-[#2A2010] to-[#1A1508]",
  "paint-finishing": "from-[#2A1A1A] to-[#1A1010]",
};

export function FeaturedCategories() {
  return (
    <section className="py-20 bg-white" aria-labelledby="featured-categories-heading">
      <Container>
        <SectionHeading
          eyebrow="Popular Categories"
          title="High-Demand Materials"
          subtitle="Explore our most requested construction material categories, stocked and ready for your project."
          className="mb-12"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredCategories.map((cat, index) => {
            const gradient = categoryColors[cat.slug] ?? "from-charcoal to-charcoal-dark";
            const isLarge = index === 0 || index === 3;

            return (
              <Link
                key={cat.id}
                href={`/products/${cat.slug}`}
                className={`group relative overflow-hidden ${isLarge ? "sm:row-span-1" : ""} min-h-[220px] flex flex-col justify-end p-7`}
              >
                {/* Full background image */}
                <div
                  className="absolute inset-0 bg-cover bg-center scale-100 group-hover:scale-105 transition-transform duration-700 ease-smooth"
                  style={{ backgroundImage: `url('${cat.heroImage}')` }}
                />

                {/* Dark gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10 group-hover:from-black/75 transition-all duration-500" />

                {/* Gold accent bar on hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gold/0 group-hover:bg-gold transition-all duration-300" />

                {/* Content */}
                <div className="relative z-10">
                  <div className="section-divider mb-4 group-hover:w-16 transition-all duration-300" />
                  <h3 className="font-display font-semibold text-white text-2xl leading-tight mb-2 group-hover:text-gold transition-colors duration-200">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed line-clamp-2 mb-4">
                    {cat.shortDescription}
                  </p>
                  <div className="flex items-center gap-1.5 text-gold/70 group-hover:text-gold text-xs font-bold uppercase tracking-widest transition-colors">
                    View Products
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
