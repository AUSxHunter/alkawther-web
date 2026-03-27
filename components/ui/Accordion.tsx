"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItem {
  id: string;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  light?: boolean;
}

export function Accordion({ items, light }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="space-y-2">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className={cn(
              "border transition-all duration-200",
              light
                ? "border-white/10 bg-white/5 hover:bg-white/8"
                : "border-cream-dark bg-white hover:border-gold/30",
              isOpen && !light && "border-gold/30 shadow-gold",
              isOpen && light && "border-gold/30"
            )}
          >
            <button
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className={cn(
                "w-full flex items-start justify-between gap-4 px-6 py-5 text-left",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
              )}
              aria-expanded={isOpen}
            >
              <span
                className={cn(
                  "font-sans font-semibold text-base leading-snug pr-2",
                  light ? "text-cream" : "text-ink"
                )}
              >
                {item.question}
              </span>
              <ChevronDown
                className={cn(
                  "w-5 h-5 flex-shrink-0 mt-0.5 transition-transform duration-300",
                  light ? "text-gold" : "text-gold",
                  isOpen && "rotate-180"
                )}
              />
            </button>
            <div
              className={cn(
                "overflow-hidden transition-all duration-300",
                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              )}
            >
              <div
                className={cn(
                  "px-6 pb-5 text-sm leading-relaxed",
                  light ? "text-warm-gray-light" : "text-warm-gray"
                )}
              >
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
