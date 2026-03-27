import Link from "next/link";
import { ArrowRight, Box } from "lucide-react";
import type { Category } from "@/types";
import { getProductsByCategory } from "@/data/products";

interface CategoryGridProps {
  categories: Category[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {categories.map((cat) => {
        const productCount = getProductsByCategory(cat.slug).length;
        return (
          <Link
            key={cat.id}
            href={`/products/${cat.slug}`}
            className="group flex flex-col bg-white border border-cream-dark hover:border-gold/40 hover:shadow-gold-lg transition-all duration-200"
          >
            {/* Category image placeholder */}
            <div
              className="h-36 bg-gradient-to-br from-charcoal to-charcoal-dark relative overflow-hidden"
              style={{
                backgroundImage: `url('${cat.heroImage}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-ink/50 group-hover:bg-ink/40 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Box className="w-10 h-10 text-white/30 group-hover:text-gold/50 transition-colors" />
              </div>
              {cat.featured && (
                <div className="absolute top-3 right-3 bg-gold text-ink text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide">
                  Popular
                </div>
              )}
            </div>

            <div className="flex-1 flex flex-col p-5">
              <div className="section-divider mb-3" />
              <h3 className="font-sans font-bold text-ink text-base group-hover:text-gold transition-colors leading-snug mb-2">
                {cat.name}
              </h3>
              <p className="text-xs text-warm-gray leading-relaxed flex-1 line-clamp-2">
                {cat.shortDescription}
              </p>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-cream-dark">
                <span className="text-xs text-warm-gray/60">
                  {productCount} product{productCount !== 1 ? "s" : ""}
                </span>
                <span className="flex items-center gap-1 text-xs font-bold text-gold/70 group-hover:text-gold transition-colors">
                  Browse
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
