"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface QuoteChartProps {
  data: Array<{ date: string; quotes: number }>;
}

export function QuoteChart({ data }: QuoteChartProps) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="quoteGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#C8A96E" stopOpacity={0.2} />
            <stop offset="95%" stopColor="#C8A96E" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#E8E3DC" vertical={false} />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 11, fontFamily: "var(--font-sans)", fill: "#8E8680" }}
          tickLine={false}
          axisLine={false}
          interval={6}
        />
        <YAxis
          tick={{ fontSize: 11, fontFamily: "var(--font-sans)", fill: "#8E8680" }}
          tickLine={false}
          axisLine={false}
          allowDecimals={false}
        />
        <Tooltip
          contentStyle={{
            background: "#fff",
            border: "1px solid #E8E3DC",
            borderRadius: 0,
            fontSize: 12,
            fontFamily: "var(--font-sans)",
          }}
          formatter={(value) => [value ?? 0, "Quotes"]}
        />
        <Area
          type="monotone"
          dataKey="quotes"
          stroke="#C8A96E"
          strokeWidth={2}
          fill="url(#quoteGradient)"
          dot={false}
          activeDot={{ r: 4, fill: "#C8A96E" }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
