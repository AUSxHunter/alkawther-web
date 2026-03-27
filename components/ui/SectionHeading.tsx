import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  light?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light,
  className,
}: SectionHeadingProps) {
  const alignClasses = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  return (
    <div className={cn("flex flex-col gap-3", alignClasses[align], className)}>
      {eyebrow && (
        <span
          className={cn(
            "text-xs font-bold uppercase tracking-[0.2em] font-sans",
            light ? "text-gold-light" : "text-gold"
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "font-display font-semibold leading-tight",
          "text-display-lg",
          light ? "text-cream" : "text-ink"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-base leading-relaxed max-w-2xl",
            light ? "text-warm-gray-light" : "text-warm-gray",
            align === "center" && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
