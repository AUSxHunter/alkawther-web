"use client";

import Link from "next/link";
import { X, ShoppingCart, ArrowRight } from "lucide-react";
import { useQuoteCart } from "@/store/quote-cart";
import { QuoteItemRow } from "./QuoteItemRow";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function QuoteCartDrawer() {
  const { items, isOpen, closeCart, clearCart } = useQuoteCart();

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-ink/50 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={cn(
          "fixed right-0 top-0 z-50 h-full w-full max-w-sm bg-white shadow-2xl flex flex-col",
          "transition-transform duration-350 ease-smooth",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-label="Quote Cart"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-cream-dark bg-cream/40">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-4 h-4 text-gold" />
            <h2 className="font-display font-bold text-lg text-ink">Quote Cart</h2>
            {items.length > 0 && (
              <span className="bg-gold text-ink text-xs font-bold px-2 py-0.5">
                {items.length}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs text-warm-gray hover:text-red-500 transition-colors font-semibold"
              >
                Clear All
              </button>
            )}
            <button
              onClick={closeCart}
              className="p-1.5 text-warm-gray hover:text-ink transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 px-6 text-center">
              <div className="w-16 h-16 bg-cream flex items-center justify-center">
                <ShoppingCart className="w-7 h-7 text-warm-gray/40" />
              </div>
              <div>
                <p className="font-semibold text-ink">Your quote cart is empty</p>
                <p className="text-sm text-warm-gray mt-1">
                  Browse products and add items to request a quotation.
                </p>
              </div>
              <Link href="/products" onClick={closeCart}>
                <Button variant="gold" size="sm">
                  Browse Products
                </Button>
              </Link>
            </div>
          ) : (
            <div>
              {items.map((item) => (
                <QuoteItemRow key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-cream-dark px-5 py-5 space-y-3 bg-cream/30">
            <div className="flex items-center justify-between text-sm">
              <span className="text-warm-gray">Total line items</span>
              <span className="font-bold text-ink">{items.length}</span>
            </div>
            <p className="text-xs text-warm-gray/70 leading-relaxed">
              No pricing is shown — submit your list to receive a personalised quotation from our team.
            </p>
            <Link href="/request-quote" onClick={closeCart} className="block">
              <Button className="w-full" size="md">
                Request Quotation
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <button
              onClick={closeCart}
              className="w-full text-sm text-warm-gray hover:text-gold transition-colors py-1"
            >
              Continue Browsing
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
