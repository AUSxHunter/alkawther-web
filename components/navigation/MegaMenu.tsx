"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Package } from "lucide-react";
import { categories } from "@/data/categories";
import { cn } from "@/lib/utils";

// Split categories into two columns for the mega menu
const col1 = categories.slice(0, Math.ceil(categories.length / 2));
const col2 = categories.slice(Math.ceil(categories.length / 2));

interface MegaMenuProps {
  light?: boolean;
}

export function MegaMenu({ light }: MegaMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      ref={menuRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative"
    >
      {/* Trigger */}
      <button
        className={cn(
          "flex items-center gap-1.5 text-sm font-semibold tracking-wide transition-colors duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50",
          light
            ? "text-white/80 hover:text-white"
            : "text-ink hover:text-gold",
          isOpen && (light ? "text-white" : "text-gold")
        )}
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Products
        <ChevronDown
          className={cn("w-3.5 h-3.5 transition-transform duration-200", isOpen && "rotate-180")}
        />
      </button>

      {/* Dropdown panel */}
      <div
        className={cn(
          "absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[720px] bg-white border border-cream-dark shadow-card-hover",
          "transition-all duration-200 origin-top",
          isOpen ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-95 pointer-events-none"
        )}
        role="menu"
      >
        {/* Header row */}
        <div className="flex items-center gap-2 px-6 py-4 border-b border-cream-dark bg-cream/60">
          <Package className="w-4 h-4 text-gold" />
          <span className="text-xs font-bold uppercase tracking-widest text-warm-gray">
            Product Categories
          </span>
          <span className="ml-auto text-xs text-warm-gray/60">
            {categories.length} categories
          </span>
        </div>

        {/* Two-column grid */}
        <div className="grid grid-cols-2 gap-0 p-2">
          {[col1, col2].map((col, ci) => (
            <div key={ci} className="space-y-0.5 p-2">
              {col.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/products/${cat.slug}`}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-start gap-3 px-4 py-3 group transition-all duration-150",
                    "hover:bg-cream focus-visible:bg-cream focus-visible:outline-none"
                  )}
                  role="menuitem"
                >
                  <div className="w-7 h-7 flex items-center justify-center bg-gold/10 flex-shrink-0 mt-0.5 group-hover:bg-gold/20 transition-colors">
                    <Package className="w-3.5 h-3.5 text-gold" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-ink group-hover:text-gold transition-colors leading-snug">
                      {cat.name}
                    </div>
                    <div className="text-xs text-warm-gray mt-0.5 leading-snug line-clamp-1">
                      {cat.shortDescription}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-cream-dark px-6 py-3 bg-cream/40 flex items-center justify-between">
          <span className="text-xs text-warm-gray">Browse the full catalog</span>
          <Link
            href="/products"
            onClick={() => setIsOpen(false)}
            className="text-xs font-bold text-gold hover:underline tracking-wide"
          >
            View All Products →
          </Link>
        </div>
      </div>
    </div>
  );
}
