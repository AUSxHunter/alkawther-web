import Link from "next/link";
import {
  Layers, Square, Circle, Box, Droplet, Shield, Grid,
  Zap, Wrench, Minus, Link2, ArrowRight
} from "lucide-react";
import { categories } from "@/data/categories";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";

const iconMap: Record<string, React.ElementType> = {
  layers: Layers,
  square: Square,
  circle: Circle,
  box: Box,
  droplet: Droplet,
  shield: Shield,
  grid: Grid,
  zap: Zap,
  tool: Wrench,
  minus: Minus,
  link: Link2,
  droplets: Droplet,
};

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
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon] ?? Box;
            return (
              <Link
                key={cat.id}
                href={`/products/${cat.slug}`}
                className="group flex flex-col items-center gap-3 p-5 bg-white border border-cream-dark hover:border-gold/40 hover:shadow-gold-lg transition-all duration-200 text-center"
              >
                <div className="w-11 h-11 flex items-center justify-center bg-gold/8 group-hover:bg-gold/15 transition-colors">
                  <Icon className="w-5 h-5 text-gold" />
                </div>
                <span className="text-xs font-semibold text-ink group-hover:text-gold transition-colors leading-tight font-sans">
                  {cat.name}
                </span>
              </Link>
            );
          })}
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
