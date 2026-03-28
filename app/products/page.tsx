import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/categories";
import { CategoryGrid } from "@/components/products/CategoryGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { DownloadBrochureButton } from "@/components/ui/DownloadBrochureButton";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse our full catalog of construction materials. Steel, cement, wood, waterproofing, electrical, tools, and more — all available for quotation.",
};

const howItWorks = [
  {
    step: "01",
    title: "Browse Categories",
    description: "Navigate to the product category you need and explore the available items.",
  },
  {
    step: "02",
    title: "Select & Add to Quote",
    description: "Choose sizes, variants, and quantities, then click Add to Quote.",
  },
  {
    step: "03",
    title: "Submit Your Request",
    description: "Fill in your contact details and submit. We will respond within 24 hours.",
  },
];

export default function ProductsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-ink py-16 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gold-gradient" />
        <Container>
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold font-sans block mb-4">
              Product Catalog
            </span>
            <h1
              className="font-display font-semibold text-white leading-tight mb-4"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              Construction Materials
              <br />
              <span className="text-gold italic">Catalog</span>
            </h1>
            <p className="text-lg text-white/60 leading-relaxed font-sans max-w-2xl mb-6">
              Browse {categories.length} product categories spanning structural materials,
              finishing, safety, tools, and more. Select what you need and request a quotation.
            </p>
            <DownloadBrochureButton variant="light" />
          </div>
        </Container>
      </section>

      {/* How the Quote System Works */}
      <section className="bg-cream py-12 border-b border-cream-dark">
        <Container>
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
            <div className="flex-shrink-0">
              <p className="text-xs font-bold uppercase tracking-widest text-warm-gray mb-2">
                How It Works
              </p>
              <p className="font-sans font-bold text-ink text-base">
                No pricing shown — submit a<br />request for a personalised quote.
              </p>
            </div>
            <div className="h-px lg:h-16 w-full lg:w-px bg-cream-dark" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 flex-1">
              {howItWorks.map((step) => (
                <div key={step.step} className="flex items-start gap-3">
                  <span className="text-2xl font-display font-bold text-gold/30 leading-none mt-0.5 flex-shrink-0">
                    {step.step}
                  </span>
                  <div>
                    <h3 className="font-sans font-bold text-ink text-sm mb-1">
                      {step.title}
                    </h3>
                    <p className="text-xs text-warm-gray leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Category Grid */}
      <section className="py-16 bg-white">
        <Container>
          <div className="flex items-center justify-between mb-10">
            <SectionHeading
              eyebrow="All Categories"
              title="Browse by Category"
              align="left"
            />
            <Link href="/request-quote" className="hidden sm:block">
              <Button variant="gold" size="sm">
                Request Quote
              </Button>
            </Link>
          </div>

          <CategoryGrid categories={categories} />
        </Container>
      </section>

      {/* Bottom CTA */}
      <section className="bg-cream py-14 border-t border-cream-dark">
        <Container>
          <div className="text-center max-w-xl mx-auto">
            <h2 className="font-display font-semibold text-ink text-2xl mb-3">
              Can&apos;t Find What You Need?
            </h2>
            <p className="text-sm text-warm-gray mb-6 leading-relaxed">
              If a specific material is not listed, contact us directly. We can source
              additional materials and provide custom quotations for your project requirements.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/request-quote">
                <Button size="md" variant="primary">
                  General Quote Request
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="md">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
