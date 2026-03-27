"use client";

import { Phone, MessageCircle, ShoppingCart } from "lucide-react";
import { company } from "@/data/company";
import { useQuoteCart } from "@/store/quote-cart";
import { cn } from "@/lib/utils";

export function StickyMobileActions() {
  const { items, openCart } = useQuoteCart();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 lg:hidden bg-ink border-t border-white/10 safe-area-pb">
      <div className="grid grid-cols-3 divide-x divide-white/10">
        {/* Call */}
        <a
          href={`tel:${company.phoneTel}`}
          className="flex flex-col items-center justify-center gap-1 py-3 text-white hover:bg-white/5 transition-colors"
        >
          <Phone className="w-5 h-5 text-gold" />
          <span className="text-[10px] font-sans font-semibold tracking-wide text-white/70">
            Call Us
          </span>
        </a>

        {/* WhatsApp */}
        <a
          href={company.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 py-3 text-white hover:bg-white/5 transition-colors"
        >
          <MessageCircle className="w-5 h-5 text-[#25D366]" />
          <span className="text-[10px] font-sans font-semibold tracking-wide text-white/70">
            WhatsApp
          </span>
        </a>

        {/* Quote Cart */}
        <button
          onClick={openCart}
          className="flex flex-col items-center justify-center gap-1 py-3 text-white hover:bg-white/5 transition-colors relative"
          aria-label="Open quote cart"
        >
          <div className="relative">
            <ShoppingCart className="w-5 h-5 text-gold" />
            {items.length > 0 && (
              <span
                className={cn(
                  "absolute -top-1.5 -right-1.5 min-w-[16px] h-4 px-1",
                  "bg-gold text-ink text-[9px] font-bold",
                  "flex items-center justify-center leading-none"
                )}
              >
                {items.length}
              </span>
            )}
          </div>
          <span className="text-[10px] font-sans font-semibold tracking-wide text-white/70">
            Quote Cart
          </span>
        </button>
      </div>
    </div>
  );
}
