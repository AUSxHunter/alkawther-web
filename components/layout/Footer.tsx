import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { company } from "@/data/company";
import { categories } from "@/data/categories";
import { Container } from "@/components/ui/Container";
import { DownloadBrochureButton } from "@/components/ui/DownloadBrochureButton";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Request Quote", href: "/request-quote" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

// Show first 7 categories in footer
const footerCategories = categories.slice(0, 7);

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      {/* Main footer */}
      <div className="border-b border-white/8">
        <Container className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand column */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-5">
                <Image
                  src="/images/logo.png"
                  alt="Al Kawther logo"
                  width={44}
                  height={44}
                  className="h-10 w-auto object-contain brightness-0 invert"
                />
                <div>
                  <div className="font-display font-bold text-lg text-white tracking-tight leading-none">
                    Al Kawther
                  </div>
                  <div className="text-[10px] font-sans text-gold/70 tracking-widest uppercase leading-none mt-0.5">
                    Construction Materials
                  </div>
                </div>
              </div>
              <p className="text-sm text-warm-gray leading-relaxed mb-6">
                A trusted B2B supplier of premium construction materials in the UAE. Serving contractors, engineers, and project buyers since {new Date().getFullYear() - 15}.
              </p>
              <a
                href={company.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] px-4 py-2.5 text-sm font-semibold hover:bg-[#25D366]/20 transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
              </a>
              <div className="mt-4">
                <DownloadBrochureButton variant="dark" />
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-gold mb-5">
                Quick Links
              </h3>
              <ul className="space-y-2.5">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-warm-gray hover:text-white transition-colors hover:translate-x-0.5 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-gold mb-5">
                Product Categories
              </h3>
              <ul className="space-y-2.5">
                {footerCategories.map((cat) => (
                  <li key={cat.id}>
                    <Link
                      href={`/products/${cat.slug}`}
                      className="text-sm text-warm-gray hover:text-white transition-colors"
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/products"
                    className="text-sm text-gold hover:text-gold-light transition-colors font-semibold"
                  >
                    View All Categories →
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-gold mb-5">
                Get In Touch
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <div>
                    <a
                      href={`tel:${company.phoneTel}`}
                      className="text-sm text-warm-gray hover:text-white transition-colors"
                    >
                      {company.phone}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <a
                    href={`mailto:${company.email}`}
                    className="text-sm text-warm-gray hover:text-white transition-colors break-all"
                  >
                    {company.email}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <address className="not-italic text-sm text-warm-gray leading-relaxed">
                    {company.address.line1}
                    <br />
                    {company.address.line2}
                    <br />
                    {company.address.city}, {company.address.country}
                  </address>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-warm-gray">
                    <div>{company.workingHours.weekdays}</div>
                    <div>{company.workingHours.friday}</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom bar */}
      <Container>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-5">
          <p className="text-xs text-warm-gray/60">
            © {new Date().getFullYear()} Al Kawther Construction Materials. All rights reserved.
          </p>
          <p className="text-xs text-warm-gray/40">
            UAE Construction Materials Supplier
          </p>
        </div>
      </Container>
    </footer>
  );
}
