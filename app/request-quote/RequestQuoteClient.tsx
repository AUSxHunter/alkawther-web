"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Phone, Mail, MessageCircle } from "lucide-react";
import { QuoteRequestForm } from "@/components/quote/QuoteRequestForm";
import { QuoteSuccess } from "@/components/quote/QuoteSuccess";
import { Container } from "@/components/ui/Container";
import { company } from "@/data/company";

export function RequestQuoteClient() {
  const [successData, setSuccessData] = useState<{ referenceId: string } | null>(null);

  if (successData) {
    return (
      <section className="py-16 bg-white">
        <Container narrow>
          <QuoteSuccess referenceId={successData.referenceId} />
        </Container>
      </section>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-ink py-14 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gold-gradient" />
        <Container>
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gold/10 flex items-center justify-center">
                <ShoppingCart className="w-4 h-4 text-gold" />
              </div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold font-sans">
                Quotation Request
              </span>
            </div>
            <h1
              className="font-display font-semibold text-white leading-tight mb-4"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 3rem)" }}
            >
              Request a{" "}
              <span className="text-gold italic">Quotation</span>
            </h1>
            <p className="text-base text-white/60 leading-relaxed font-sans">
              Fill in your details below and our team will respond with competitive pricing
              within 24 hours. No commitment required.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form — left 2 columns */}
            <div className="lg:col-span-2">
              <QuoteRequestForm
                onSuccess={(referenceId) => setSuccessData({ referenceId })}
              />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* How it works */}
              <div className="border border-cream-dark bg-cream/40 p-6">
                <h3 className="font-sans font-bold text-ink text-sm uppercase tracking-widest mb-4">
                  How Quotations Work
                </h3>
                <ol className="space-y-3">
                  {[
                    "Browse products and add to Quote Cart",
                    "Fill in your contact details below",
                    "Submit your request",
                    "We respond within 24 hours with pricing",
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-warm-gray">
                      <span className="font-display font-bold text-gold text-lg leading-none flex-shrink-0 mt-0.5">
                        {i + 1}.
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              {/* Contact alternatives */}
              <div className="border border-cream-dark p-6">
                <h3 className="font-sans font-bold text-ink text-sm uppercase tracking-widest mb-4">
                  Prefer to Contact Directly?
                </h3>
                <div className="space-y-3">
                  <a
                    href={`tel:${company.phoneTel}`}
                    className="flex items-center gap-3 text-sm text-ink hover:text-gold transition-colors group"
                  >
                    <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                    <span>{company.phone}</span>
                  </a>
                  <a
                    href={`mailto:${company.email}`}
                    className="flex items-center gap-3 text-sm text-ink hover:text-gold transition-colors break-all"
                  >
                    <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                    <span>{company.email}</span>
                  </a>
                  <a
                    href={company.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-[#25D366] hover:text-[#1da851] transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 flex-shrink-0" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Working hours */}
              <div className="border border-gold/20 bg-gold/5 p-6">
                <h3 className="font-sans font-bold text-ink text-sm uppercase tracking-widest mb-3">
                  Working Hours
                </h3>
                <p className="text-sm text-warm-gray leading-relaxed">
                  {company.workingHours.weekdays}
                </p>
                <p className="text-sm text-warm-gray leading-relaxed">
                  {company.workingHours.friday}
                </p>
                <p className="text-xs text-warm-gray/60 mt-2 italic">
                  {company.workingHours.note}
                </p>
              </div>

              {/* Browse products CTA */}
              <div className="text-center border border-cream-dark p-5">
                <p className="text-sm text-warm-gray mb-3">
                  Haven&apos;t selected items yet?
                </p>
                <Link
                  href="/products"
                  className="text-sm font-bold text-gold hover:underline tracking-wide"
                >
                  Browse Product Catalog →
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
