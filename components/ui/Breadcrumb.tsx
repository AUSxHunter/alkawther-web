import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  light?: boolean;
  className?: string;
}

export function Breadcrumb({ items, light, className }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center gap-1.5 text-sm font-sans", className)}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={index} className="flex items-center gap-1.5">
            {index > 0 && (
              <ChevronRight
                className={cn(
                  "w-3.5 h-3.5",
                  light ? "text-white/30" : "text-warm-gray/40"
                )}
              />
            )}
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className={cn(
                  "transition-colors duration-150 hover:underline",
                  light
                    ? "text-white/60 hover:text-white"
                    : "text-warm-gray hover:text-gold"
                )}
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={cn(
                  isLast
                    ? light
                      ? "text-white/90 font-medium"
                      : "text-ink font-medium"
                    : light
                    ? "text-white/60"
                    : "text-warm-gray"
                )}
              >
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
