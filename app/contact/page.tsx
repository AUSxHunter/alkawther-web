import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, MessageCircle, ArrowRight } from "lucide-react";
import { company } from "@/data/company";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact Al Kawther General Trading. Call, email, or WhatsApp us for quotations and product enquiries.`,
};

const contactDetails = [
  {
    icon: Phone,
    label: "Phone",
    value: company.phone,
    href: `tel:${company.phoneTel}`,
    description: "Call us during working hours",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat on WhatsApp",
    href: company.whatsappLink,
    description: "Available outside office hours",
    external: true,
    highlight: true,
  },
  {
    icon: Mail,
    label: "Email",
    value: company.email,
    href: `mailto:${company.email}`,
    description: "For quotation requests and enquiries",
  },
  {
    icon: MapPin,
    label: "Address",
    value: company.address.full,
    href: company.mapsLink,
    description: "Visit our warehouse / showroom",
    external: true,
  },
  {
    icon: Clock,
    label: "Working Hours",
    value: company.workingHours.weekdays,
    description: company.workingHours.friday,
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-ink py-14 relative">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gold-gradient" />
        <Container>
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold font-sans block mb-4">
              Get In Touch
            </span>
            <h1
              className="font-display font-semibold text-white leading-tight mb-4"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Contact{" "}
              <span className="text-gold italic">Al Kawther</span>
            </h1>
            <p className="text-lg text-white/60 leading-relaxed font-sans">
              Reach out to our team for quotation requests, product enquiries, or to
              discuss your project requirements.
            </p>
          </div>
        </Container>
      </section>

      {/* Contact details */}
      <section className="py-14 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left: Contact cards */}
            <div>
              <div className="section-divider mb-5" />
              <h2 className="font-display font-semibold text-ink text-2xl mb-7">
                How to Reach Us
              </h2>

              <div className="space-y-4">
                {contactDetails.map(({ icon: Icon, label, value, href, description, external, highlight }) => (
                  <div
                    key={label}
                    className={`flex items-start gap-4 p-5 border transition-all duration-200 ${
                      highlight
                        ? "border-[#25D366]/30 bg-[#25D366]/5 hover:border-[#25D366]/50"
                        : "border-cream-dark hover:border-gold/30 hover:shadow-card"
                    }`}
                  >
                    <div className={`w-10 h-10 flex items-center justify-center flex-shrink-0 ${
                      highlight ? "bg-[#25D366]/10" : "bg-gold/10"
                    }`}>
                      <Icon className={`w-4.5 h-4.5 ${highlight ? "text-[#25D366]" : "text-gold"}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold uppercase tracking-widest text-warm-gray mb-1">
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          target={external ? "_blank" : undefined}
                          rel={external ? "noopener noreferrer" : undefined}
                          className={`text-sm font-semibold transition-colors ${
                            highlight
                              ? "text-[#25D366] hover:text-[#1da851]"
                              : "text-ink hover:text-gold"
                          }`}
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm font-semibold text-ink">{value}</p>
                      )}
                      {description && (
                        <p className="text-xs text-warm-gray mt-0.5">{description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Quick contact CTA + notes */}
            <div className="space-y-6">
              {/* Request quote CTA */}
              <div className="bg-ink p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gold-gradient" />
                <h2 className="font-display font-semibold text-white text-2xl mb-3">
                  Ready to Get Pricing?
                </h2>
                <p className="text-warm-gray text-sm leading-relaxed mb-6">
                  Use our Request Quote page to submit your material list and receive a
                  personalised quotation from our team within 24 hours.
                </p>
                <Link href="/request-quote">
                  <Button size="md" variant="primary">
                    Request Quotation
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>

              {/* Notes */}
              <div className="border border-cream-dark bg-cream/40 p-6">
                <h3 className="font-sans font-bold text-ink text-sm uppercase tracking-widest mb-4">
                  Before You Contact Us
                </h3>
                <ul className="space-y-3 text-sm text-warm-gray">
                  {[
                    "We respond to all quotation requests within 24 hours (Sat–Thu)",
                    "For bulk orders, include approximate quantities in your message",
                    "For urgent enquiries, WhatsApp is the fastest channel",
                    "All pricing is subject to stock availability at time of order",
                  ].map((note, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-gold font-bold mt-0.5 flex-shrink-0">·</span>
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Map */}
      <section aria-label="Location map">
        <div className="h-80 sm:h-[420px] bg-charcoal relative overflow-hidden">
          <iframe
            src={company.mapsEmbedUrl}
            className="absolute inset-0 w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Al Kawther Location"
          />
          <div className="absolute top-4 left-4 bg-white shadow-card p-4 z-10 max-w-xs">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 bg-gold flex items-center justify-center flex-shrink-0">
                <span className="text-ink text-[8px] font-bold">AK</span>
              </div>
              <span className="text-xs font-bold text-ink">Al Kawther</span>
            </div>
            <p className="text-xs text-warm-gray leading-relaxed">{company.address.full}</p>
            <a
              href={company.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-xs font-bold text-gold hover:underline"
            >
              Get Directions →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
