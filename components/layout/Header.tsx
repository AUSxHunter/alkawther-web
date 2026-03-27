"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ShoppingCart, Phone } from "lucide-react";
import { MegaMenu } from "@/components/navigation/MegaMenu";
import { useQuoteCart } from "@/store/quote-cart";
import { company } from "@/data/company";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { items, openCart } = useQuoteCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, []);

  return (
    <>
      {/* Top bar */}
      <div className="bg-ink text-white/60 text-xs font-sans py-2 hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <span>{company.workingHours.weekdays}</span>
          <div className="flex items-center gap-6">
            <a
              href={`tel:${company.phoneTel}`}
              className="flex items-center gap-1.5 hover:text-gold transition-colors"
            >
              <Phone className="w-3 h-3" />
              {company.phone}
            </a>
            <a
              href={`mailto:${company.email}`}
              className="hover:text-gold transition-colors"
            >
              {company.email}
            </a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-card border-b border-cream-dark"
            : "bg-white border-b border-cream-dark"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-8 h-8 bg-gold flex items-center justify-center">
                <span className="text-ink font-display font-bold text-sm">AK</span>
              </div>
              <div className="leading-tight">
                <div className="font-display font-bold text-lg text-ink tracking-tight leading-none">
                  Al Kawther
                </div>
                <div className="text-[10px] font-sans text-warm-gray tracking-widest uppercase leading-none mt-0.5">
                  Construction Materials
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link
                href="/"
                className="text-sm font-semibold tracking-wide text-ink hover:text-gold transition-colors"
              >
                Home
              </Link>
              <MegaMenu />
              <Link
                href="/about"
                className="text-sm font-semibold tracking-wide text-ink hover:text-gold transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-sm font-semibold tracking-wide text-ink hover:text-gold transition-colors"
              >
                Contact
              </Link>
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              {/* Quote cart icon */}
              <button
                onClick={openCart}
                className="relative p-2 text-ink hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
                aria-label={`Quote cart, ${items.length} items`}
              >
                <ShoppingCart className="w-5 h-5" />
                {items.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 min-w-[18px] bg-gold text-ink text-[10px] font-bold rounded-none flex items-center justify-center leading-none px-1">
                    {items.length}
                  </span>
                )}
              </button>

              {/* CTA button */}
              <Link href="/request-quote" className="hidden sm:block">
                <Button size="sm" variant="primary">
                  Get Quotation
                </Button>
              </Link>

              {/* Mobile menu toggle */}
              <button
                className="lg:hidden p-2 text-ink hover:text-gold transition-colors"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Toggle mobile menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-ink flex flex-col">
          {/* Mobile header */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
            <Link
              href="/"
              className="flex items-center gap-2"
              onClick={() => setMobileOpen(false)}
            >
              <div className="w-7 h-7 bg-gold flex items-center justify-center">
                <span className="text-ink font-display font-bold text-xs">AK</span>
              </div>
              <span className="font-display font-bold text-white text-lg">Al Kawther</span>
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="text-white/60 hover:text-white p-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile nav links */}
          <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
            {[
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
              { label: "About Us", href: "/about" },
              { label: "Contact Us", href: "/contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between px-4 py-4 text-white hover:text-gold hover:bg-white/5 border border-transparent hover:border-gold/20 transition-all font-semibold"
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile categories */}
            <div className="pt-4">
              <p className="px-4 text-xs font-bold uppercase tracking-widest text-warm-gray mb-3">
                Product Categories
              </p>
              <div className="space-y-0.5">
                {/* Categories are accessible via /products */}
              </div>
            </div>
          </nav>

          {/* Mobile bottom CTA */}
          <div className="px-4 pb-8 pt-4 border-t border-white/10 space-y-3">
            <Link href="/request-quote" onClick={() => setMobileOpen(false)}>
              <Button className="w-full" size="lg">
                Get Quotation
              </Button>
            </Link>
            <a href={company.whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="w-full border-white/20 text-white hover:text-gold hover:border-gold" size="lg">
                WhatsApp Us
              </Button>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
