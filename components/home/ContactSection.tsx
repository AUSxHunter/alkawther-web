import Link from "next/link";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { company } from "@/data/company";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function ContactSection() {
  return (
    <section className="py-20 bg-ink" aria-labelledby="contact-heading">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Heading + CTA */}
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold font-sans block mb-4">
              Get In Touch
            </span>
            <h2
              className="font-display font-semibold text-white leading-tight mb-5 text-balance"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.75rem)" }}
            >
              Ready to Source Your{" "}
              <span className="text-gold italic">Materials?</span>
            </h2>
            <p className="text-warm-gray leading-relaxed mb-8 text-base">
              Our team is available to answer your questions, help you select the right
              materials, and provide competitive quotations for your project.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/request-quote">
                <Button size="lg" variant="primary">
                  Request Quotation
                </Button>
              </Link>
              <a href={company.whatsappLink} target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  className="bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/20 font-semibold"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </Button>
              </a>
            </div>
          </div>

          {/* Right: Contact details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              {
                icon: Phone,
                label: "Phone",
                value: company.phone,
                href: `tel:${company.phoneTel}`,
              },
              {
                icon: Mail,
                label: "Email",
                value: company.email,
                href: `mailto:${company.email}`,
              },
              {
                icon: MapPin,
                label: "Location",
                value: company.address.full,
                href: company.mapsLink,
              },
              {
                icon: Clock,
                label: "Hours",
                value: `${company.workingHours.weekdays} · ${company.workingHours.friday}`,
              },
            ].map(({ icon: Icon, label, value, href }) => (
              <div
                key={label}
                className="flex items-start gap-4 p-5 border border-white/8 bg-white/4 hover:bg-white/6 hover:border-gold/20 transition-all duration-200"
              >
                <div className="w-10 h-10 flex items-center justify-center bg-gold/10 flex-shrink-0">
                  <Icon className="w-4.5 h-4.5 text-gold" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-warm-gray mb-1">
                    {label}
                  </div>
                  {href ? (
                    <a
                      href={href}
                      className="text-sm text-white/80 hover:text-white transition-colors leading-relaxed"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm text-white/80 leading-relaxed">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
