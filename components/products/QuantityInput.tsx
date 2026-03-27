"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuantityInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  compact?: boolean;
}

export function QuantityInput({
  value,
  onChange,
  min = 1,
  max = 9999,
  compact,
}: QuantityInputProps) {
  const decrement = () => onChange(Math.max(min, value - 1));
  const increment = () => onChange(Math.min(max, value + 1));

  return (
    <div className={cn("flex items-center border border-cream-dark", compact ? "h-7" : "h-9")}>
      <button
        onClick={decrement}
        disabled={value <= min}
        className={cn(
          "flex items-center justify-center text-warm-gray hover:text-gold",
          "hover:bg-cream transition-colors disabled:opacity-30 disabled:cursor-not-allowed",
          compact ? "w-7 h-7" : "w-9 h-9"
        )}
        type="button"
        aria-label="Decrease"
      >
        <Minus className={cn(compact ? "w-2.5 h-2.5" : "w-3 h-3")} />
      </button>
      <input
        type="number"
        value={value}
        onChange={(e) => {
          const v = parseInt(e.target.value, 10);
          if (!isNaN(v) && v >= min && v <= max) onChange(v);
        }}
        className={cn(
          "border-x border-cream-dark text-center text-ink font-bold",
          "focus:outline-none focus:border-gold bg-white",
          compact ? "w-10 h-7 text-xs" : "w-12 h-9 text-sm"
        )}
        min={min}
        max={max}
        aria-label="Quantity"
      />
      <button
        onClick={increment}
        disabled={value >= max}
        className={cn(
          "flex items-center justify-center text-warm-gray hover:text-gold",
          "hover:bg-cream transition-colors disabled:opacity-30 disabled:cursor-not-allowed",
          compact ? "w-7 h-7" : "w-9 h-9"
        )}
        type="button"
        aria-label="Increase"
      >
        <Plus className={cn(compact ? "w-2.5 h-2.5" : "w-3 h-3")} />
      </button>
    </div>
  );
}
