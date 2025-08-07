"use client";

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
// import { healthScreeningData } from '@/lib/mock-data';
// import { analyzeHealthTrends } from '@/ai/flows/analyze-health-trends';
// import { visualizeHealthData } from '@/ai/flows/visualize-health-data';
// import type { AnalyzeHealthTrendsOutput } from '@/ai/flows/analyze-health-trends';
// import type { VisualizeHealthDataOutput } from '@/ai/flows/visualize-health-data';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, Wrench } from 'lucide-react';

export function AnalyticsClient() {
  // const [analysis, setAnalysis] = useState<AnalyzeHealthTrendsOutput | null>(null);
  // const [visualization, setVisualization] = useState<VisualizeHealthDataOutput | null>(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       setLoading(true);
  //       setError(null);

  //       const healthDataString = healthScreeningData
  //         .map((d) => `${d.studentName} berkunjung karena ${d.symptoms}.`)
  //         .join(' ');

  //       const analysisResult = await analyzeHealthTrends({ healthData: healthDataString });
  //       setAnalysis(analysisResult);

  //       if (analysisResult) {
  //         const vizResult = await visualizeHealthData({
  //           mostCommonReason: analysisResult.commonIssues,
  //           suggestedMedications: analysisResult.suggestedMedications,
  //         });
  //         setVisualization(vizResult);
  //       }
  //     } catch (e) {
  //       console.error(e);
  //       setError('Gagal menganalisis data kesehatan. Silakan coba lagi nanti.');
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   fetchData();
  // }, []);

  return (
    <div className="space-y-4">
        <Alert>
          <Wrench className="h-4 w-4" />
          <AlertTitle>Fitur Dalam Perbaikan</AlertTitle>
          <AlertDescription>
            Halaman analisis tren kesehatan berbasis AI sedang dalam perbaikan dan akan segera kembali. Terima kasih atas kesabaran Anda.
          </AlertDescription>
        </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Ringkasan Kesehatan Berbasis AI</CardTitle>
          <CardDescription>
            Ringkasan ini dibuat oleh AI berdasarkan data skrining kesehatan.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Keluhan Kesehatan Umum</CardTitle>
            <CardDescription>Diidentifikasi dari kunjungan UKS terkini.</CardDescription>
          </CardHeader>
          <CardContent>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-2/3" />
              </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Saran Obat & Perlengkapan</CardTitle>
            <CardDescription>Rekomendasi berdasarkan tren.</CardDescription>
          </CardHeader>
          <CardContent>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-2/3" />
              </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
