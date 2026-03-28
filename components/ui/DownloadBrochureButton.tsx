import { Download } from "lucide-react";
import { cn } from "@/lib/utils";

const BROCHURE_PATH = "/docs/AlKawther-Brochure.pdf";

interface DownloadBrochureButtonProps {
  variant?: "light" | "dark";
  className?: string;
}

export function DownloadBrochureButton({
  variant = "light",
  className,
}: DownloadBrochureButtonProps) {
  return (
    <a
      href={BROCHURE_PATH}
      download="AlKawther-Brochure.pdf"
      className={cn(
        "inline-flex items-center gap-2 text-sm font-semibold font-sans transition-colors",
        variant === "light" &&
          "text-white/60 hover:text-gold",
        variant === "dark" &&
          "text-warm-gray hover:text-gold",
        className
      )}
    >
      <Download className="w-4 h-4" />
      Download Brochure
    </a>
  );
}
