"use client";

import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { uksVisits, medications } from '@/lib/mock-data';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from './ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from 'recharts';

interface AnalysisResult {
  summary: string;
  commonComplaints: { complaint: string; count: number }[];
  stockRecommendations: { medicationName: string; recommendation: string }[];
}

const chartConfig = {
  count: {
    label: "Jumlah",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

// Simple analysis function to replace the AI flow
const runSimpleAnalysis = (visits: typeof uksVisits, stock: typeof medications): AnalysisResult => {
  const complaintCounts: { [key: string]: number } = {};
  visits.forEach(visit => {
    complaintCounts[visit.reason] = (complaintCounts[visit.reason] || 0) + 1;
  });

  const commonComplaints = Object.entries(complaintCounts)
    .map(([complaint, count]) => ({ complaint, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const stockRecommendations = stock.map(med => {
    const isNeeded = commonComplaints.some(c => c.complaint.toLowerCase().includes(med.name.toLowerCase().slice(0, 5)));
    let recommendation = "Stok cukup";
    if (med.stock < 50 && isNeeded) {
        recommendation = "Segera restock";
    } else if (med.stock < 50) {
        recommendation = "Perlu dipantau";
    }
    return {
      medicationName: med.name,
      recommendation,
    };
  });
  
  const mostCommonComplaint = commonComplaints.length > 0 ? commonComplaints[0].complaint : 'tidak ada keluhan';

  const summary = `Analisis data menunjukkan keluhan paling umum adalah ${mostCommonComplaint}. Beberapa stok obat perlu diperhatikan berdasarkan tren keluhan ini.`;

  return { summary, commonComplaints, stockRecommendations };
}


export function AnalyticsClient() {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const analysisResult = runSimpleAnalysis(uksVisits, medications);
    setAnalysis(analysisResult);
    setLoading(false);
  }, []);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Ringkasan Kesehatan</CardTitle>
          <CardDescription>
            Ringkasan ini dibuat berdasarkan data kunjungan UKS dan stok obat.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ) : (
            <p className="text-muted-foreground">{analysis?.summary}</p>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Keluhan Kesehatan Umum</CardTitle>
            <CardDescription>Diidentifikasi dari kunjungan UKS terkini.</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                <Skeleton className="h-28 w-full" />
              </div>
            ) : analysis && (
               <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={analysis.commonComplaints} layout="vertical" margin={{ left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                        <YAxis dataKey="complaint" type="category" width={80} tickLine={false} axisLine={false} />
                        <XAxis dataKey="count" type="number" hide />
                        <ChartTooltip cursor={{fill: 'hsl(var(--accent) / 0.2)'}} content={<ChartTooltipContent />} />
                        <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                    </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Saran Obat & Perlengkapan</CardTitle>
            <CardDescription>Rekomendasi berdasarkan tren keluhan dan stok.</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ) : (
              <ul className="space-y-2 text-sm text-muted-foreground">
                {analysis?.stockRecommendations.map((item, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{item.medicationName}</span>
                    <span className={`font-semibold ${item.recommendation.includes('restock') ? 'text-destructive' : 'text-green-600'}`}>
                      {item.recommendation}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
