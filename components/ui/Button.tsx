"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "gold" | "dark";
type ButtonSize = "sm" | "md" | "lg" | "xl";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  as?: "button";
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-gold text-ink font-semibold hover:bg-gold-dark active:bg-gold-dark shadow-sm hover:shadow-gold-lg border border-transparent",
  secondary:
    "bg-cream text-charcoal font-semibold hover:bg-cream-dark border border-cream-dark",
  ghost:
    "bg-transparent text-warm-gray hover:text-ink hover:bg-cream border border-transparent",
  outline:
    "bg-transparent text-ink border border-charcoal/30 hover:border-gold hover:text-gold font-semibold",
  gold:
    "bg-transparent text-gold border border-gold hover:bg-gold hover:text-ink font-semibold",
  dark:
    "bg-charcoal text-cream font-semibold hover:bg-charcoal-dark border border-transparent",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-3.5 text-base",
  xl: "px-10 py-4 text-base",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", loading, className, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center gap-2 transition-all duration-200 tracking-wide",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {loading ? (
          <>
            <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            <span>{children}</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
export type { ButtonVariant, ButtonSize };
