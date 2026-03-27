import { Accordion } from "@/components/ui/Accordion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { faqItems } from "@/data/faq";

export function FAQSection() {
  return (
    <section className="py-20 bg-cream" aria-labelledby="faq-heading">
      <Container narrow>
        <SectionHeading
          eyebrow="FAQs"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about ordering, quotations, and how we work."
          className="mb-12"
        />
        <Accordion items={faqItems} />
      </Container>
    </section>
  );
}
