import { company } from "@/data/company";

export const siteConfig = {
  name: company.name,
  fullName: company.fullName,
  tagline: company.tagline,
  description: company.description,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://alkawther.com",
  ogImage: "/images/og-image.jpg",

  links: {
    phone: `tel:${company.phoneTel}`,
    whatsapp: company.whatsappLink,
    email: `mailto:${company.email}`,
  },

  metadata: {
    title: {
      default: `${company.name} | Construction Materials Supplier UAE`,
      template: `%s | ${company.name}`,
    },
    description: company.description,
    keywords: [
      "construction materials UAE",
      "building materials supplier Sharjah",
      "steel rebar UAE",
      "cement supplier UAE",
      "waterproofing materials",
      "construction quotation",
      "Al Kawther",
      "B2B construction supply",
    ],
    authors: [{ name: company.fullName }],
    openGraph: {
      type: "website",
      locale: "en_AE",
      siteName: company.fullName,
    },
  },
} as const;
