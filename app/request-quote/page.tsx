import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { RequestQuoteClient } from "./RequestQuoteClient";

export const metadata: Metadata = {
  title: `Request Quotation — ${siteConfig.name}`,
  description:
    "Submit a quotation request for construction materials. Add items to your Quote Cart or send a general inquiry.",
};

export default function RequestQuotePage() {
  return <RequestQuoteClient />;
}
