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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import { generateHealthTrendAnalysis, GenerateHealthTrendAnalysisOutput } from '@/ai/flows/generate-health-trend-analysis';
import { uksVisits, medications } from '@/lib/mock-data';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from './ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from 'recharts';

const chartConfig = {
  count: {
    label: "Jumlah",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function AnalyticsClient() {
  const [analysis, setAnalysis] = useState<GenerateHealthTrendAnalysisOutput | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const runAnalysis = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await generateHealthTrendAnalysis({
          uksVisits: JSON.stringify(uksVisits),
          medicationStock: JSON.stringify(medications),
        });
        setAnalysis(result);
      } catch (err) {
        console.error(err);
        setError("Gagal menganalisis data. Silakan coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    };
    runAnalysis();
  }, []);

  if (error) {
    return (
      <Alert variant="destructive">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Ringkasan Kesehatan Berbasis AI</CardTitle>
          <CardDescription>
            Ringkasan ini dibuat oleh AI berdasarkan data kunjungan UKS dan stok obat.
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
