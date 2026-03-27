import { CheckCircle, Truck, DollarSign, Clock, Package, Award } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";

const reasons = [
  {
    icon: Award,
    title: "Premium Quality Materials",
    description:
      "We source only from certified, reputable mills and manufacturers. Every product meets the quality standards expected for UAE construction.",
  },
  {
    icon: Package,
    title: "Comprehensive Catalog",
    description:
      "From structural steel and cement to waterproofing, electrical, tools, and finishing — everything you need from a single trusted supplier.",
  },
  {
    icon: DollarSign,
    title: "Competitive Pricing",
    description:
      "Bulk purchasing power and established supplier relationships mean we can offer competitive pricing for projects of all scales.",
  },
  {
    icon: Clock,
    title: "Fast Response",
    description:
      "Quotation requests are responded to within 24 hours. For urgent needs, reach us directly on WhatsApp for immediate assistance.",
  },
  {
    icon: Truck,
    title: "Reliable Supply",
    description:
      "Consistent stock availability and a proven supply chain ensure your project timelines are met without costly delays.",
  },
  {
    icon: CheckCircle,
    title: "B2B Expertise",
    description:
      "Dedicated to serving contractors, engineers, and project procurement teams with the professionalism and efficiency your projects demand.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 bg-white" aria-labelledby="why-choose-us-heading">
      <Container>
        <SectionHeading
          eyebrow="Why Al Kawther"
          title="Built on Trust & Performance"
          subtitle="Construction projects demand reliable partners. Here is why our clients return to us project after project."
          className="mb-14"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div
                key={index}
                className="group relative p-7 border border-cream-dark hover:border-gold/30 hover:shadow-gold-lg transition-all duration-200 bg-white"
              >
                {/* Number */}
                <div className="absolute top-5 right-5 text-5xl font-display font-bold text-cream-dark/80 leading-none group-hover:text-gold/10 transition-colors">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="relative z-10">
                  <div className="w-11 h-11 bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors">
                    <Icon className="w-5 h-5 text-gold" />
                  </div>
                  <h3 className="font-sans font-bold text-ink text-base mb-3 leading-snug">
                    {reason.title}
                  </h3>
                  <p className="text-sm text-warm-gray leading-relaxed">
                    {reason.description}
                  </p>
                </div>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 right-0 h-0 group-hover:h-0.5 bg-gold-gradient transition-all duration-300" />
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
