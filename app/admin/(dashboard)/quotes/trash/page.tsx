import { getQuotes } from "@/lib/admin-store";
import { TrashTable } from "@/components/admin/TrashTable";

export default async function QuotesTrashPage() {
  const quotes = await getQuotes();
  const trashed = quotes.filter((q) => q.trashed);

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="font-display font-bold text-2xl text-ink mb-1">Trash</h1>
        <p className="text-sm text-warm-gray font-sans">
          Trashed quote requests. Restore them or delete permanently.
        </p>
      </div>

      {trashed.length === 0 ? (
        <div className="bg-white border border-cream-dark p-12 text-center">
          <p className="text-sm font-semibold text-ink mb-1">Trash is empty</p>
          <p className="text-xs text-warm-gray font-sans">
            Quotes you move to trash will appear here.
          </p>
        </div>
      ) : (
        <TrashTable initialQuotes={trashed} />
      )}
    </div>
  );
}
