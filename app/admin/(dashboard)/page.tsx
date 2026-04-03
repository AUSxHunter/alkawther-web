import { getQuotes, type QuoteLogEntry } from "@/lib/admin-store";
import { QuoteChart } from "@/components/admin/QuoteChart";
import { FileText, TrendingUp, Package, Calendar } from "lucide-react";

function getAnalytics(quotes: QuoteLogEntry[]) {
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const thisWeek = quotes.filter((q) => new Date(q.timestamp) >= weekAgo).length;
  const thisMonth = quotes.filter((q) => new Date(q.timestamp) >= monthAgo).length;

  // Top 5 products
  const productCounts: Record<string, { name: string; count: number }> = {};
  for (const quote of quotes) {
    for (const item of quote.items) {
      if (!productCounts[item.productId]) {
        productCounts[item.productId] = { name: item.productName, count: 0 };
      }
      productCounts[item.productId].count++;
    }
  }
  const topProducts = Object.values(productCounts)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Top 5 categories
  const categoryCounts: Record<string, number> = {};
  for (const quote of quotes) {
    for (const item of quote.items) {
      categoryCounts[item.categorySlug] = (categoryCounts[item.categorySlug] ?? 0) + 1;
    }
  }
  const topCategories = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([slug, count]) => ({ slug, count }));

  // Daily chart data (last 30 days)
  const dailyCounts: Record<string, number> = {};
  for (let i = 0; i < 30; i++) {
    const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    dailyCounts[d.toISOString().slice(0, 10)] = 0;
  }
  for (const quote of quotes) {
    const day = quote.timestamp.slice(0, 10);
    if (day in dailyCounts) {
      dailyCounts[day]++;
    }
  }
  const chartData = Object.entries(dailyCounts)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, count]) => ({
      date: new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "short" }),
      quotes: count,
    }));

  return { thisWeek, thisMonth, topProducts, topCategories, chartData };
}

export default async function AdminOverviewPage() {
  const quotes = await getQuotes();
  const { thisWeek, thisMonth, topProducts, topCategories, chartData } = getAnalytics(quotes);
  const pending = quotes.filter((q) => !q.handled).length;

  const stats = [
    { label: "Total Requests", value: quotes.length, icon: FileText, color: "text-gold" },
    { label: "This Month", value: thisMonth, icon: Calendar, color: "text-blue-500" },
    { label: "This Week", value: thisWeek, icon: TrendingUp, color: "text-emerald-500" },
    { label: "Pending", value: pending, icon: Package, color: "text-amber-500" },
  ];

  return (
    <div className="max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display font-bold text-2xl text-ink mb-1">Overview</h1>
        <p className="text-sm text-warm-gray font-sans">Quote request analytics</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white border border-cream-dark p-4 lg:p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold uppercase tracking-widest text-warm-gray font-sans">
                {stat.label}
              </p>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
            <p className="font-display font-bold text-2xl lg:text-3xl text-ink">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white border border-cream-dark p-6 mb-6">
        <h2 className="text-sm font-bold uppercase tracking-widest text-warm-gray font-sans mb-4">
          Quote Requests — Last 30 Days
        </h2>
        {quotes.length === 0 ? (
          <div className="h-40 flex items-center justify-center text-sm text-warm-gray font-sans">
            No data yet. Quote requests will appear here.
          </div>
        ) : (
          <QuoteChart data={chartData} />
        )}
      </div>

      {/* Top products + categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-cream-dark p-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-warm-gray font-sans mb-4">
            Most Requested Products
          </h2>
          {topProducts.length === 0 ? (
            <p className="text-sm text-warm-gray font-sans py-4">No data yet.</p>
          ) : (
            <ol className="space-y-3">
              {topProducts.map((p, i) => (
                <li key={p.name} className="flex items-center gap-3">
                  <span className="text-sm font-display font-bold text-gold/50 w-5">{i + 1}</span>
                  <span className="flex-1 text-sm font-sans text-ink truncate">{p.name}</span>
                  <span className="text-xs font-bold text-warm-gray font-sans bg-cream px-2 py-0.5">
                    {p.count}
                  </span>
                </li>
              ))}
            </ol>
          )}
        </div>

        <div className="bg-white border border-cream-dark p-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-warm-gray font-sans mb-4">
            Most Requested Categories
          </h2>
          {topCategories.length === 0 ? (
            <p className="text-sm text-warm-gray font-sans py-4">No data yet.</p>
          ) : (
            <ol className="space-y-3">
              {topCategories.map((c, i) => (
                <li key={c.slug} className="flex items-center gap-3">
                  <span className="text-sm font-display font-bold text-gold/50 w-5">{i + 1}</span>
                  <span className="flex-1 text-sm font-sans text-ink capitalize">
                    {c.slug.replace(/-/g, " ")}
                  </span>
                  <span className="text-xs font-bold text-warm-gray font-sans bg-cream px-2 py-0.5">
                    {c.count}
                  </span>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </div>
  );
}
