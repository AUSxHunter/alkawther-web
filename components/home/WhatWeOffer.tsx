import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/categories";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";

export function WhatWeOffer() {
  return (
    <section className="py-20 bg-cream" aria-labelledby="what-we-offer-heading">
      <Container>
        <SectionHeading
          eyebrow="Our Catalog"
          title="What We Supply"
          subtitle="A comprehensive range of construction materials for every stage of your project — sourced from trusted regional and international suppliers."
          className="mb-14"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/products/${cat.slug}`}
              className="group relative overflow-hidden min-h-[140px] flex flex-col justify-end p-4"
            >
              {/* Background image */}
              <div
                className="absolute inset-0 bg-cover bg-center scale-100 group-hover:scale-105 transition-transform duration-700"
                style={{ backgroundImage: `url('${cat.heroImage}')` }}
              />

              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 group-hover:from-black/70 transition-all duration-500" />

              {/* Gold top accent bar on hover */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gold/0 group-hover:bg-gold transition-all duration-300" />

              {/* Category name */}
              <span className="relative z-10 text-xs font-semibold text-white group-hover:text-gold transition-colors duration-200 leading-tight font-sans">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Link
            href="/products"
            className="flex items-center gap-2 text-sm font-bold text-gold hover:text-gold-dark transition-colors tracking-wide"
          >
            View Full Product Catalog
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
