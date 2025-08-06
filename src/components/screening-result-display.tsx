"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ScreeningResult } from "@/lib/types";
import { CheckCircle, AlertTriangle, HeartPulse } from "lucide-react";

interface ScreeningResultDisplayProps {
  result: ScreeningResult;
  onNewScreening: () => void;
}

export function ScreeningResultDisplay({ result, onNewScreening }: ScreeningResultDisplayProps) {
  const getStatusColor = (status: string) => {
    if (status.toLowerCase().includes("sehat") || status.toLowerCase().includes("normal")) {
      return "text-green-600";
    }
    if (status.toLowerCase().includes("waspada") || status.toLowerCase().includes("perlu pembinaan")) {
      return "text-yellow-600";
    }
    return "text-red-600";
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HeartPulse className="text-primary" />
            Hasil Skrining Kesehatan
          </CardTitle>
          <CardDescription>
            Berikut adalah ringkasan dan rekomendasi otomatis berdasarkan data yang Anda masukkan.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Kesehatan Fisik</CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`text-2xl font-bold ${getStatusColor(result.physicalStatus)}`}>
                  {result.physicalStatus}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Kesehatan Mental</CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`text-2xl font-bold ${getStatusColor(result.mentalHealth)}`}>
                  {result.mentalHealth}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pola Hidup</CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`text-2xl font-bold ${getStatusColor(result.lifestyle)}`}>
                  {result.lifestyle}
                </p>
              </CardContent>
            </Card>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Rekomendasi Tindak Lanjut:</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
              {result.recommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={onNewScreening}>Lakukan Skrining Baru</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
