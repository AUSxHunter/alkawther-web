import { brands } from "@/data/brands";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";

export function BrandsSection() {
  return (
    <section className="py-20 bg-cream" aria-labelledby="brands-heading">
      <Container>
        <SectionHeading
          eyebrow="Our Suppliers"
          title="Trusted Brands We Carry"
          subtitle="We source from established regional and international manufacturers to ensure quality and reliability on every project."
          className="mb-12"
        />

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="group flex flex-col items-center justify-center gap-2 p-5 bg-white border border-cream-dark hover:border-gold/30 hover:shadow-gold transition-all duration-200 aspect-square"
            >
              {/* Logo placeholder — replace with actual <Image> when logos are ready */}
              <div className="w-10 h-10 bg-cream flex items-center justify-center">
                <span className="text-[10px] font-bold text-warm-gray/50 uppercase tracking-wider text-center leading-tight">
                  {brand.name.split(" ").map((w) => w[0]).join("").slice(0, 3)}
                </span>
              </div>
              <span className="text-xs font-semibold text-warm-gray group-hover:text-gold transition-colors text-center leading-tight">
                {brand.name}
              </span>
              {brand.category && (
                <span className="text-[10px] text-warm-gray/40 uppercase tracking-wide">
                  {brand.category}
                </span>
              )}
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-warm-gray mt-8">
          And many more — our catalog includes products from 30+ trusted brands and manufacturers.
        </p>
      </Container>
    </section>
  );
}
