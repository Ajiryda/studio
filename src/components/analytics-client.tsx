"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Wrench } from 'lucide-react';

export function AnalyticsClient() {

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
