import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Award, Users, TrendingUp, ArrowRight } from "lucide-react";
import { company } from "@/data/company";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about Al Kawther General Trading — a trusted UAE supplier of premium building materials serving contractors and project buyers.`,
};

const values = [
  {
    icon: Award,
    title: "Quality Without Compromise",
    description:
      "We source exclusively from certified mills and manufacturers. Every product in our catalog meets the quality standards required for UAE construction.",
  },
  {
    icon: Users,
    title: "Client-First Approach",
    description:
      "Our team works closely with contractors, engineers, and procurement managers to ensure the right materials are delivered at the right time.",
  },
  {
    icon: TrendingUp,
    title: "Reliable Supply Chain",
    description:
      "With established supplier relationships and consistent stock management, we minimise disruptions and keep your project on schedule.",
  },
];

const offerings = [
  "Structural steel, rebar, and BRC mesh from leading UAE mills",
  "Premium plywood boards including our own Kawther branded range",
  "Comprehensive cement and concrete accessories",
  "Full Polybit waterproofing systems and accessories",
  "Paint, primers, and finishing materials from Jotun and others",
  "Safety PPE and site equipment",
  "Electrical cables, conduit, and wiring accessories",
  "Power tools and hand tools from professional brands",
  "Gypsum, plaster beads, and dry lining accessories",
  "Adhesives, tile adhesives, and sealants",
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-ink py-16 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gold-gradient" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #C8A96E 0, #C8A96E 1px, transparent 0, transparent 50%)",
            backgroundSize: "20px 20px",
          }}
        />
        <Container className="relative z-10">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold font-sans block mb-4">
              About Al Kawther
            </span>
            <h1
              className="font-display font-semibold text-white leading-tight mb-5"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              Built on Reliability,
              <br />
              <span className="text-gold italic">Driven by Quality.</span>
            </h1>
            <p className="text-lg text-white/60 leading-relaxed font-sans">
              Al Kawther is a B2B construction materials supplier based in the UAE,
              dedicated to providing contractors, engineers, and project buyers with
              premium materials at competitive prices.
            </p>
          </div>
        </Container>
      </section>

      {/* Company Story */}
      <section className="py-16 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className="section-divider mb-5" />
              <h2 className="font-display font-semibold text-ink leading-tight mb-5"
                style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}>
                Who We Are
              </h2>
              <div className="space-y-4 text-warm-gray leading-relaxed text-base">
                <p>
                  Al Kawther General Trading has been serving the UAE construction
                  industry for over {company.stats.yearsExperience.replace("+", "")} years. We
                  began as a specialist steel and plywood supplier and have grown into a
                  comprehensive construction materials source trusted by contractors,
                  subcontractors, and project procurement teams.
                </p>
                <p>
                  Our catalog spans {company.stats.productLines} product lines across 14
                  categories — from structural steel, cement, and waterproofing to electrical
                  materials, tools, and safety equipment. We source from over{" "}
                  {company.stats.trustedBrands} trusted brands and manufacturers to ensure
                  the quality and reliability your projects demand.
                </p>
                <p>
                  We operate on a quotation-based model designed for B2B customers. Browse
                  our catalog, select your materials, and submit a request — our team will
                  respond with competitive pricing tailored to your project scale.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { value: company.stats.yearsExperience, label: "Years Experience" },
                { value: company.stats.productLines, label: "Product Lines" },
                { value: company.stats.trustedBrands, label: "Trusted Brands" },
                { value: company.stats.projectsServed, label: "Projects Served" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center justify-center gap-2 p-7 border border-cream-dark bg-cream/40 text-center"
                >
                  <span className="font-display font-bold text-gold"
                    style={{ fontSize: "clamp(2rem, 3vw, 2.75rem)" }}>
                    {stat.value}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-warm-gray font-sans">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* What We Offer */}
      <section className="py-16 bg-cream">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <SectionHeading
                eyebrow="Our Catalog"
                title="What We Supply"
                align="left"
                className="mb-6"
              />
              <p className="text-warm-gray leading-relaxed mb-6">
                Our catalog is designed to serve every stage of a construction project,
                from structural foundations to interior finishing:
              </p>
              <ul className="space-y-2.5">
                {offerings.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-warm-gray">
                    <CheckCircle className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-5">
              <SectionHeading
                eyebrow="Our Values"
                title="What Drives Us"
                align="left"
                className="mb-6"
              />
              {values.map((value, i) => {
                const Icon = value.icon;
                return (
                  <div key={i} className="flex items-start gap-4 p-5 bg-white border border-cream-dark">
                    <div className="w-10 h-10 bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4.5 h-4.5 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-sans font-bold text-ink text-sm mb-1">{value.title}</h3>
                      <p className="text-sm text-warm-gray leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-14 bg-ink relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gold-gradient" />
        <Container>
          <div className="text-center max-w-xl mx-auto">
            <h2 className="font-display font-semibold text-white text-3xl mb-4">
              Ready to Work With Us?
            </h2>
            <p className="text-warm-gray mb-7 leading-relaxed">
              Browse our product catalog and request a quotation, or contact our team
              directly to discuss your project requirements.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/products">
                <Button size="lg" variant="primary">
                  Browse Products
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-transparent border border-white/20 text-white hover:border-gold hover:text-gold font-semibold"
                >
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
