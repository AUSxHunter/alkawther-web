export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const faqItems: FAQItem[] = [
  {
    id: "faq-01",
    question: "How do I request a quotation?",
    answer:
      "You can browse our product catalog, select the items and quantities you need, and click 'Add to Quote'. Once you've built your list, proceed to the Request Quote page, fill in your contact details, and submit. Our team will respond with pricing within 24 hours.",
  },
  {
    id: "faq-03",
    question: "Do you supply bulk quantities?",
    answer:
      "Yes. Al Kawther specialises in bulk and project-scale supply for contractors, developers, and site buyers. Bulk orders often attract preferential pricing — include the quantities in your quotation request for the best rates.",
  },
  {
    id: "faq-04",
    question: "Do you deliver to site?",
    answer:
      "Delivery availability and terms are confirmed at the quotation stage depending on your location, order size, and material type. Please mention your project location in the quote request form.",
  },
  {
    id: "faq-05",
    question: "Are products subject to stock confirmation?",
    answer:
      "All quotations are subject to stock availability at the time of order confirmation. We endeavour to keep our catalog up to date, but certain items — particularly specialist sizes or imported products — may have lead times. Our team will advise you at quotation stage.",
  },
  {
    id: "faq-06",
    question: "How quickly do you respond to quotation requests?",
    answer:
      "We aim to respond to all quotation requests within 24 hours during working days (Saturday to Thursday). For urgent requirements, you can reach us directly on WhatsApp for a faster response.",
  },
  {
    id: "faq-07",
    question: "Do you work with engineers, consultants, and developers?",
    answer:
      "Yes. Our client base includes contractors, structural engineers, interior fit-out specialists, developers, and procurement teams. We are experienced in supplying to both small residential projects and large commercial developments.",
  },
  {
    id: "faq-08",
    question: "Do you show prices on the website?",
    answer:
      "We do not display fixed prices on the website, as construction material pricing varies with market conditions, order volume, and material specifications. All pricing is provided through personalised quotations to ensure accuracy.",
  },
];
