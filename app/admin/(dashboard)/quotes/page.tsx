import { getQuotes } from "@/lib/admin-store";
import { QuoteLogTable } from "@/components/admin/QuoteLogTable";

export default async function QuotesPage() {
  const quotes = await getQuotes();

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="font-display font-bold text-2xl text-ink mb-1">Quote Requests</h1>
        <p className="text-sm text-warm-gray font-sans">
          All submitted quote requests. Mark as handled once actioned.
        </p>
      </div>

      {quotes.length === 0 ? (
        <div className="bg-white border border-cream-dark p-12 text-center">
          <p className="text-sm font-semibold text-ink mb-1">No quote requests yet</p>
          <p className="text-xs text-warm-gray font-sans">
            Submitted quote requests will appear here.
          </p>
        </div>
      ) : (
        <QuoteLogTable initialQuotes={quotes} />
      )}
    </div>
  );
}
