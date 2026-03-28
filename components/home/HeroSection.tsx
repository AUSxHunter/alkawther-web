import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DownloadBrochureButton } from "@/components/ui/DownloadBrochureButton";
import { company } from "@/data/company";

export function HeroSection() {
  return (
    <section
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-charcoal-dark"
      aria-label="Hero"
    >
      {/* Background image overlay — desktop/tablet */}
      <div
        className="absolute inset-0 bg-hero-overlay z-10 hidden sm:block"
        style={{
          backgroundImage:
            "url('/images/hero/hero-bg.jpeg'), linear-gradient(135deg, #1A1816 0%, #2A2825 100%)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay",
        }}
      />

      {/* Background image overlay — mobile */}
      <div
        className="absolute inset-0 bg-hero-overlay z-10 block sm:hidden"
        style={{
          backgroundImage:
            "url('/images/hero/hero-bg-mobile.jpeg'), linear-gradient(135deg, #1A1816 0%, #2A2825 100%)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay",
        }}
      />

      {/* Decorative gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gold-gradient z-20" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-12 bg-gold/50" />
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-gold font-sans">
            Trusted Construction Materials Supplier — UAE
          </span>
          <div className="h-px w-12 bg-gold/50" />
        </div>

        {/* Headline */}
        <h1 className="font-display font-semibold text-white leading-[1.05] text-balance mb-6"
          style={{ fontSize: "clamp(2.75rem, 6vw, 5.5rem)" }}
        >
          Building Materials
          <br />
          <span className="text-gold italic">You Can Rely On</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg text-white/70 leading-relaxed max-w-2xl mx-auto mb-10 font-sans">
          Al Kawther supplies premium construction materials to contractors, engineers,
          and project buyers across the UAE. From structural steel and cement to
          waterproofing, electrical, and finishing materials — all under one roof
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/products">
            <Button size="xl" variant="primary">
              Browse Products
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <Link href="/request-quote">
            <Button
              size="xl"
              variant="outline"
              className="border-white/30 text-white hover:border-gold hover:text-gold"
            >
              Get Quotation
            </Button>
          </Link>
          <a href={company.whatsappLink} target="_blank" rel="noopener noreferrer">
            <Button
              size="xl"
              className="bg-transparent border border-white/20 text-white/70 hover:text-[#25D366] hover:border-[#25D366]/50 font-semibold"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </Button>
          </a>
        </div>

        {/* Brochure download */}
        <div className="mt-6">
          <DownloadBrochureButton variant="light" />
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-14 pt-8 border-t border-white/10">
          {[
            { value: company.stats.yearsExperience, label: "Years Experience" },
            { value: company.stats.productLines, label: "Product Lines" },
            { value: company.stats.trustedBrands, label: "Trusted Brands" },
            { value: company.stats.projectsServed, label: "Projects Served" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display font-bold text-gold" style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}>
                {stat.value}
              </div>
              <div className="text-xs text-white/50 uppercase tracking-widest mt-0.5 font-sans">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
