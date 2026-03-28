import Link from "next/link";
import { ArrowRight, FileText, List } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function QuoteCTABanner() {
  return (
    <section
      className="relative py-20 bg-ink overflow-hidden"
      aria-labelledby="quote-cta-heading"
    >
      {/* Decorative background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #C8A96E 0, #C8A96E 1px, transparent 0, transparent 50%)",
          backgroundSize: "20px 20px",
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gold-gradient" />

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-10 bg-gold/40" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold font-sans">
              No Checkout Required
            </span>
            <div className="h-px w-10 bg-gold/40" />
          </div>

          <h2
            className="font-display font-semibold text-white leading-tight mb-5 text-balance"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            Request a Personalised{" "}
            <span className="text-gold italic">Quotation</span>
          </h2>

          <p className="text-lg text-white/60 leading-relaxed mb-10 max-w-2xl mx-auto font-sans">
            Select the materials you need, specify quantities, and submit your request.
            Our team will respond with competitive pricing tailored to your project.
          </p>

          {/* How it works — 3 steps */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: List,
                step: "01",
                title: "Build Your List",
                desc: "Browse categories, select products and quantities",
              },
              {
                icon: FileText,
                step: "02",
                title: "Submit Your Request",
                desc: "Share your contact details and project requirements",
              },
              {
                icon: ArrowRight,
                step: "03",
                title: "Receive Your Quote",
                desc: "Our team responds within 24 hours with pricing",
              },
            ].map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  className="flex flex-col items-center gap-3 px-4 py-5 border border-white/8 bg-white/4"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gold/50 font-sans">
                      {step.step}
                    </span>
                    <Icon className="w-5 h-5 text-gold" />
                  </div>
                  <h3 className="font-sans font-bold text-white text-sm">{step.title}</h3>
                  <p className="text-xs text-white/50 text-center leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/request-quote">
              <Button size="xl" variant="primary">
                Request Quotation Now
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/products">
              <Button
                size="xl"
                className="bg-transparent border border-white/20 text-white hover:border-gold hover:text-gold font-semibold"
              >
                Browse Products First
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
