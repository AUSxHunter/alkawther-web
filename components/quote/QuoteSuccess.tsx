import Link from "next/link";
import { CheckCircle, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { company } from "@/data/company";

interface QuoteSuccessProps {
  referenceId: string;
}

export function QuoteSuccess({ referenceId }: QuoteSuccessProps) {
  return (
    <div className="text-center py-16 px-4 max-w-xl mx-auto">
      {/* Icon */}
      <div className="w-20 h-20 bg-emerald-50 border-2 border-emerald-100 flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-10 h-10 text-emerald-500" />
      </div>

      {/* Heading */}
      <h2 className="font-display font-semibold text-ink text-3xl mb-3">
        Request Received!
      </h2>

      {/* Reference */}
      {referenceId && (
        <div className="inline-block bg-gold/10 border border-gold/20 px-4 py-2 mb-5">
          <span className="text-xs text-warm-gray uppercase tracking-widest">
            Reference ID:
          </span>{" "}
          <span className="font-bold text-ink text-sm">{referenceId}</span>
        </div>
      )}

      <p className="text-warm-gray leading-relaxed mb-8">
        Thank you for your quotation request. Our team will review your requirements
        and respond with competitive pricing within <strong className="text-ink">24 hours</strong>{" "}
        on working days (Saturday–Thursday).
      </p>

      {/* Next steps */}
      <div className="border border-cream-dark bg-cream/50 p-5 mb-8 text-left">
        <h3 className="font-sans font-bold text-ink text-sm mb-3">What Happens Next?</h3>
        <ol className="space-y-2 text-sm text-warm-gray">
          <li className="flex items-start gap-2">
            <span className="text-gold font-bold mt-0.5 flex-shrink-0">1.</span>
            Our team reviews your request and checks stock availability.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gold font-bold mt-0.5 flex-shrink-0">2.</span>
            We prepare a detailed quotation with current pricing.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gold font-bold mt-0.5 flex-shrink-0">3.</span>
            We contact you by email or phone within 24 hours.
          </li>
        </ol>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link href="/products">
          <Button size="md" variant="primary">
            Continue Browsing
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
        <a href={company.whatsappLink} target="_blank" rel="noopener noreferrer">
          <Button
            size="md"
            className="bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/20 font-semibold"
          >
            <MessageCircle className="w-4 h-4" />
            Urgent? WhatsApp Us
          </Button>
        </a>
      </div>

      <p className="text-xs text-warm-gray/50 mt-6">
        Need to reach us sooner? Call{" "}
        <a href={`tel:${company.phoneTel}`} className="text-gold hover:underline">
          {company.phone}
        </a>
      </p>
    </div>
  );
}
