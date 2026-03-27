import { cn } from "@/lib/utils";
import type { AvailabilityStatus } from "@/types";
import { availabilityLabel, availabilityClass } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "gold" | "dark" | "cream" | "success" | "warning" | "error";
  className?: string;
}

export function Badge({ children, variant = "gold", className }: BadgeProps) {
  const variantClasses = {
    gold: "bg-gold/10 text-gold border border-gold/20",
    dark: "bg-charcoal text-cream",
    cream: "bg-cream text-warm-gray border border-cream-dark",
    success: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    warning: "bg-amber-50 text-amber-700 border border-amber-200",
    error: "bg-red-50 text-red-600 border border-red-200",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-semibold font-sans tracking-wide",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

interface AvailabilityBadgeProps {
  status: AvailabilityStatus;
  className?: string;
}

export function AvailabilityBadge({ status, className }: AvailabilityBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-semibold font-sans",
        availabilityClass[status],
        className
      )}
    >
      <span
        className={cn(
          "w-1.5 h-1.5 rounded-full",
          status === "available" && "bg-emerald-500",
          status === "limited" && "bg-amber-500",
          status === "enquire" && "bg-gold",
          status === "out-of-stock" && "bg-red-400"
        )}
      />
      {availabilityLabel[status]}
    </span>
  );
}
