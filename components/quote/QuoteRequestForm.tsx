"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Paperclip, X } from "lucide-react";
import { quoteRequestSchema, type QuoteRequestInput } from "@/lib/validators";
import type { QuoteSubmissionResponse } from "@/types";
import { Button } from "@/components/ui/Button";
import { QuoteItemRow } from "./QuoteItemRow";
import { useQuoteCart } from "@/store/quote-cart";
import { cn } from "@/lib/utils";

interface QuoteRequestFormProps {
  onSuccess: (referenceId: string) => void;
}

export function QuoteRequestForm({ onSuccess }: QuoteRequestFormProps) {
  const { items, clearCart } = useQuoteCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attachmentName, setAttachmentName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuoteRequestInput>({
    resolver: zodResolver(quoteRequestSchema),
  });

  const onSubmit = async (data: QuoteRequestInput) => {
    setIsSubmitting(true);
    setError("");

    try {
      const payload = {
        ...data,
        items,
        attachmentName: attachmentName || undefined,
      };

      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result: QuoteSubmissionResponse = await res.json();

      if (result.success) {
        clearCart();
        onSuccess(result.referenceId ?? "");
      } else {
        setError(result.message || "Submission failed. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (hasError?: boolean) =>
    cn(
      "w-full border bg-white text-ink text-sm px-4 py-3 font-sans",
      "focus:outline-none focus:border-gold transition-colors",
      "placeholder:text-warm-gray/50",
      hasError ? "border-red-400" : "border-cream-dark hover:border-warm-gray/50"
    );

  const labelClass = "block text-xs font-bold uppercase tracking-widest text-warm-gray mb-2";

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8">
      {/* Quote Cart Summary */}
      {items.length > 0 && (
        <div className="border border-gold/20 bg-gold/5">
          <div className="flex items-center justify-between px-5 py-3 border-b border-gold/20 bg-gold/10">
            <h3 className="text-sm font-bold text-ink">
              Your Quote Cart ({items.length} item{items.length !== 1 ? "s" : ""})
            </h3>
            <span className="text-xs text-warm-gray">
              Items will be included in your request
            </span>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {items.map((item) => (
              <QuoteItemRow key={item.id} item={item} compact />
            ))}
          </div>
        </div>
      )}

      {/* No items — general request note */}
      {items.length === 0 && (
        <div className="border border-cream-dark bg-cream/50 px-5 py-4">
          <p className="text-sm text-warm-gray">
            <strong className="text-ink">General Quote Request:</strong> You have no items in
            your Quote Cart. You can still submit a request — include your requirements in the
            message below or attach a BOQ document.
          </p>
        </div>
      )}

      {/* Contact Details */}
      <div>
        <h3 className="font-sans font-bold text-ink text-base mb-5 pb-3 border-b border-cream-dark">
          Your Contact Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Full Name */}
          <div>
            <label htmlFor="customerName" className={labelClass}>
              Full Name <span className="text-red-400">*</span>
            </label>
            <input
              id="customerName"
              type="text"
              placeholder="Your full name"
              autoComplete="name"
              {...register("customerName")}
              className={inputClass(!!errors.customerName)}
            />
            {errors.customerName && (
              <p className="text-xs text-red-500 mt-1">{errors.customerName.message}</p>
            )}
          </div>

          {/* Company Name */}
          <div>
            <label htmlFor="companyName" className={labelClass}>
              Company Name <span className="text-warm-gray/40">(Optional)</span>
            </label>
            <input
              id="companyName"
              type="text"
              placeholder="Your company or organisation"
              autoComplete="organization"
              {...register("companyName")}
              className={inputClass()}
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className={labelClass}>
              Phone Number <span className="text-red-400">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="+971 XX XXX XXXX"
              autoComplete="tel"
              {...register("phone")}
              className={inputClass(!!errors.phone)}
            />
            {errors.phone && (
              <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className={labelClass}>
              Email Address <span className="text-red-400">*</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="your@email.com"
              autoComplete="email"
              {...register("email")}
              className={inputClass(!!errors.email)}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Project Location */}
          <div className="sm:col-span-2">
            <label htmlFor="projectLocation" className={labelClass}>
              Project Location <span className="text-warm-gray/40">(Optional)</span>
            </label>
            <input
              id="projectLocation"
              type="text"
              placeholder="e.g. Sharjah Industrial Area, Dubai, Abu Dhabi..."
              {...register("projectLocation")}
              className={inputClass()}
            />
          </div>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className={labelClass}>
          Additional Message / Requirements{" "}
          <span className="text-warm-gray/40">(Optional)</span>
        </label>
        <textarea
          id="message"
          rows={4}
          placeholder="Describe your project requirements, mention any specific brands, delivery preferences, or bulk quantity needs..."
          {...register("message")}
          className={cn(inputClass(), "resize-none leading-relaxed")}
        />
      </div>

      {/* File Attachment */}
      <div>
        <p className={labelClass}>
          Attach BOQ / Specification{" "}
          <span className="text-warm-gray/40">(Optional)</span>
        </p>
        <div
          className="border-2 border-dashed border-cream-dark hover:border-gold/30 transition-colors p-6 text-center cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          {attachmentName ? (
            <div className="flex items-center justify-center gap-3">
              <Paperclip className="w-4 h-4 text-gold" />
              <span className="text-sm text-ink font-semibold">{attachmentName}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setAttachmentName("");
                }}
                className="text-warm-gray hover:text-red-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div>
              <Paperclip className="w-6 h-6 text-warm-gray/40 mx-auto mb-2" />
              <p className="text-sm text-warm-gray">
                Click to attach a BOQ, Excel file, or specification document
              </p>
              <p className="text-xs text-warm-gray/50 mt-1">
                PDF, Excel, Word — max 10MB
              </p>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept=".pdf,.xls,.xlsx,.doc,.docx,.csv"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setAttachmentName(file.name);
            }}
          />
        </div>
        <p className="text-xs text-warm-gray/50 mt-2">
          Note: File content is not transmitted — only the filename is included in the request.
          Please send the actual file via email or WhatsApp after submission.
        </p>
      </div>

      {/* Error message */}
      {error && (
        <div className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Submit */}
      <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
        <Button
          type="submit"
          size="xl"
          variant="primary"
          loading={isSubmitting}
          className="w-full sm:w-auto"
        >
          {isSubmitting ? "Submitting..." : "Submit Quotation Request"}
          {!isSubmitting && <ArrowRight className="w-5 h-5" />}
        </Button>
        <p className="text-xs text-warm-gray text-center sm:text-left leading-relaxed">
          By submitting, you agree to be contacted by our team regarding your request.
          We respond within 24 hours.
        </p>
      </div>
    </form>
  );
}
