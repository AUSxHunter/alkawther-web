import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { company } from "@/data/company";
import { Container } from "@/components/ui/Container";

interface CategoryContactCTAProps {
  categoryName: string;
}

export function CategoryContactCTA({ categoryName }: CategoryContactCTAProps) {
  return (
    <section className="bg-cream border-t border-cream-dark py-12">
      <Container>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
          <div>
            <div className="section-divider mb-3" />
            <h2 className="font-display font-semibold text-ink text-2xl mb-2">
              Need a Quote for {categoryName}?
            </h2>
            <p className="text-sm text-warm-gray leading-relaxed max-w-lg">
              Add items to your Quote Cart and submit a request, or contact us directly
              for bulk orders, custom specifications, or BOQ pricing.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <Link href="/request-quote">
              <Button size="md" variant="primary">
                Request Quote
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <a href={company.whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button
                size="md"
                className="bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/20 font-semibold"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
