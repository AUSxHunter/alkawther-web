import { z } from "zod";

export const quoteItemSchema = z.object({
  id: z.string(),
  productId: z.string(),
  productName: z.string(),
  categorySlug: z.string(),
  categoryName: z.string(),
  variantId: z.string().optional(),
  variantLabel: z.string().optional(),
  selectedBrand: z.string().optional(),
  quantity: z.number().min(1),
  unit: z.string().optional(),
  notes: z.string().optional(),
});

export const quoteRequestSchema = z.object({
  customerName: z.string().min(2, "Full name is required"),
  companyName: z.string().optional(),
  phone: z
    .string()
    .min(7, "Phone number is required")
    .regex(/^[+\d\s\-()]+$/, "Enter a valid phone number"),
  email: z.string().email("Enter a valid email address"),
  projectLocation: z.string().optional(),
  message: z.string().optional(),
  items: z.array(quoteItemSchema).optional(),
  attachmentName: z.string().optional(),
});

export type QuoteRequestInput = z.infer<typeof quoteRequestSchema>;
