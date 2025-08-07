"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import {
  ChartContainer,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import type { Visit } from "@/lib/types";

const chartConfig = {
  visits: {
    label: "Kunjungan",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

interface DashboardChartsProps {
  visits: Visit[];
}

export function DashboardCharts({ visits }: DashboardChartsProps) {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const chartData = Array.from({ length: 7 })
      .map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return {
          date: d.toLocaleDateString("id-ID", { weekday: "short" }),
          visits: visits.filter(
            (v) => new Date(v.entryTime).toDateString() === d.toDateString()
          ).length,
        };
      })
      .reverse();
    setData(chartData);
  }, [visits]);

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="date"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            allowDecimals={false}
          />
          <Tooltip
            cursor={{ fill: "hsl(var(--accent) / 0.2)" }}
            content={<ChartTooltipContent />}
          />
          <Bar
            dataKey="visits"
            fill="hsl(var(--primary))"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
