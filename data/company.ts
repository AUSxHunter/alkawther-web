/**
 * Central company configuration.
 * Update all values here — they propagate across the entire site.
 */
export const company = {
  name: "Al Kawther",
  fullName: "Al Kawther Construction Materials",
  tagline: "Premium Construction Materials Supplier",
  description:
    "Al Kawther is a trusted B2B supplier of high-quality construction materials in the UAE. We serve contractors, engineers, and project buyers with a comprehensive catalog spanning steel, wood, cement, waterproofing, tools, electrical, and more.",

  // Contact details — replace with real values
  phone: "+971 55 707 1393",
  phoneTel: "+971557071393",
  whatsapp: "+971557071393",
  whatsappLink: "https://wa.me/971557071393",
  email: "info@alkawther.com",
  emailSales: "sales@alkawther.com",

  address: {
    line1: "Al Kawther General Trading LLC",
    line2: "Al Sajaa, Sharjah",
    city: "Sharjah",
    country: "UAE",
    full: "Al Kawther General Trading LLC, Al Sajaa, Sharjah, UAE",
  },

  workingHours: {
    weekdays: "Saturday – Thursday: 8:00 AM – 6:00 PM",
    friday: "Friday: Closed",
    note: "Available on WhatsApp outside office hours",
  },

  mapsEmbedUrl:
    "https://maps.google.com/maps?q=Al+Kawther+General+Trading+LLC,+Al+Sajaa,+Sharjah,+UAE&output=embed",
  mapsLink:
    "https://maps.google.com/maps?q=Al+Kawther+General+Trading+LLC,+Al+Sajaa,+Sharjah,+UAE",

  social: {
    instagram: "",
    facebook: "",
    linkedin: "",
  },

  stats: {
    yearsExperience: "15+",
    productLines: "500+",
    trustedBrands: "30+",
    projectsServed: "1,000+",
    teamSize: "50+",
  },
} as const;
