export interface QuoteItem {
  /** Unique cart entry ID (generated on add) */
  id: string;
  productId: string;
  productName: string;
  categorySlug: string;
  categoryName: string;
  variantId?: string;
  variantLabel?: string;
  selectedBrand?: string;
  quantity: number;
  /** Unit of measurement from the variant */
  unit?: string;
  /** Optional per-item note from user */
  notes?: string;
}

export interface QuoteRequest {
  customerName: string;
  companyName?: string;
  phone: string;
  email: string;
  projectLocation?: string;
  message?: string;
  items: QuoteItem[];
  submittedAt: string;
}

export interface QuoteEmailPayload {
  subject: string;
  to: string;
  from: string;
  replyTo: string;
  html: string;
  text: string;
}

export interface QuoteSubmissionResponse {
  success: boolean;
  message: string;
  referenceId?: string;
}
