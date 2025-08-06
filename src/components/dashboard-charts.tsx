'use client';

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { uksVisits } from '@/lib/mock-data';
import { ChartTooltipContent } from '@/components/ui/chart';

export function DashboardCharts() {
  const data = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return {
      date: d.toLocaleDateString('en-US', { weekday: 'short' }),
      visits: uksVisits.filter(
        (v) => new Date(v.entryTime).toDateString() === d.toDateString()
      ).length,
    };
  }).reverse();

  return (
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
          cursor={{ fill: 'hsl(var(--accent) / 0.2)' }}
          content={<ChartTooltipContent />}
        />
        <Bar dataKey="visits" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
