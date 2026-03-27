import type { Category } from "@/types";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";

interface CategoryHeroProps {
  category: Category;
  productCount: number;
}

export function CategoryHero({ category, productCount }: CategoryHeroProps) {
  return (
    <section
      className="relative bg-ink py-14 overflow-hidden"
      aria-labelledby="category-hero-heading"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{ backgroundImage: `url('${category.heroImage}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/80 to-ink/30" />
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gold-gradient" />

      <Container className="relative z-10">
        <Breadcrumb
          light
          items={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            { label: category.name },
          ]}
          className="mb-6"
        />

        <div className="max-w-2xl">
          <div className="section-divider mb-4" />
          <h1
            id="category-hero-heading"
            className="font-display font-semibold text-white leading-tight mb-4"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 3rem)" }}
          >
            {category.name}
          </h1>
          <p className="text-base text-white/65 leading-relaxed font-sans">
            {category.introText}
          </p>

          <div className="flex items-center gap-6 mt-6 pt-6 border-t border-white/10">
            <div>
              <span className="text-xs uppercase tracking-widest text-warm-gray font-bold block mb-0.5">
                Products
              </span>
              <span className="font-display font-bold text-gold text-2xl">{productCount}</span>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div>
              <span className="text-xs uppercase tracking-widest text-warm-gray font-bold block mb-0.5">
                Display Mode
              </span>
              <span className="text-sm text-white/60 capitalize">{category.displayMode}</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
