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
    line1: "Warehouse / Showroom Address",
    line2: "Industrial Area, Sharjah",
    city: "Sharjah",
    country: "UAE",
    full: "Warehouse / Showroom Address, Industrial Area, Sharjah, UAE",
  },

  workingHours: {
    weekdays: "Saturday – Thursday: 8:00 AM – 6:00 PM",
    friday: "Friday: Closed",
    note: "Available on WhatsApp outside office hours",
  },

  // Replace with actual Google Maps embed URL
  mapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3605.2!2d55.4!3d25.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDQ4JzAwLjAiTiA1NcKwMjQnMDAuMCJF!5e0!3m2!1sen!2sae!4v0000000000000",
  mapsLink: "https://maps.google.com",

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
