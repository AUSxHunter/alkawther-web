import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { WhatWeOffer } from "@/components/home/WhatWeOffer";
import { StatsRibbon } from "@/components/home/StatsRibbon";
import { FeaturedCategories } from "@/components/home/FeaturedCategories";
import { BrandsSection } from "@/components/home/BrandsSection";
import { QuoteCTABanner } from "@/components/home/QuoteCTABanner";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { FAQSection } from "@/components/home/FAQSection";
import { ContactSection } from "@/components/home/ContactSection";
import { MapSection } from "@/components/home/MapSection";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: siteConfig.metadata.title.default,
  description: siteConfig.metadata.description,
  openGraph: {
    title: siteConfig.metadata.title.default,
    description: siteConfig.metadata.description,
    url: siteConfig.url,
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhatWeOffer />
      <StatsRibbon />
      <FeaturedCategories />
      <BrandsSection />
      <QuoteCTABanner />
      <WhyChooseUs />
      <FAQSection />
      <ContactSection />
      <MapSection />
    </>
  );
}
