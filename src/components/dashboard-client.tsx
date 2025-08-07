"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/icons";
import { DashboardCharts } from "@/components/dashboard-charts";
import { useEffect, useState, useMemo } from "react";
import type { Visit, Medication } from "@/lib/types";
import { getVisits, getMedications } from "@/lib/firebase-services";
import { useToast } from "@/hooks/use-toast";

export function DashboardClient() {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [visitsData, medicationsData] = await Promise.all([
          getVisits(),
          getMedications(),
        ]);
        setVisits(visitsData);
        setMedications(medicationsData);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        toast({
          title: "Gagal Memuat Data",
          description: "Tidak dapat mengambil data dari Firestore.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [toast]);

  const {
    studentsInUKS,
    visitsToday,
    commonComplaint,
    lowStockMedication,
    recentVisits,
  } = useMemo(() => {
    const studentsInUKS = visits.filter((visit) => !visit.exitTime).length;

    const today = new Date().toDateString();
    const visitsToday = visits.filter(
      (visit) => new Date(visit.entryTime).toDateString() === today
    );

    const recentVisits = [...visitsToday]
      .sort((a, b) => new Date(b.entryTime).getTime() - new Date(a.entryTime).getTime())
      .slice(0, 5);

    // Common complaint logic
    const complaintCounts: { [key: string]: number } = {};
    visits.forEach((visit) => {
      complaintCounts[visit.reason] = (complaintCounts[visit.reason] || 0) + 1;
    });
    const commonComplaint =
      Object.keys(complaintCounts).length > 0
        ? Object.entries(complaintCounts).reduce((a, b) => (a[1] > b[1] ? a : b))[0]
        : "N/A";

    // Low stock medication logic
    const lowStockMedication = medications
      .filter((med) => med.stock < 20)
      .sort((a, b) => a.stock - b.stock)[0];

    return {
      studentsInUKS,
      visitsToday: visitsToday.length,
      commonComplaint,
      lowStockMedication,
      recentVisits,
    };
  }, [visits, medications]);

  if (loading) {
    return <div>Loading...</div>; // Or a proper loading spinner
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Siswa di UKS</CardTitle>
            <Icons.users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studentsInUKS}</div>
            <p className="text-xs text-muted-foreground">
              Saat ini di unit kesehatan
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Kunjungan Hari Ini
            </CardTitle>
            <Icons.clipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{visitsToday}</div>
            <p className="text-xs text-muted-foreground">
              Total kunjungan tercatat hari ini
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Keluhan Umum</CardTitle>
            <Icons.activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{commonComplaint}</div>
            <p className="text-xs text-muted-foreground">
              Gejala paling sering minggu ini
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Peringatan Stok Rendah
            </CardTitle>
            <Icons.alertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {lowStockMedication ? lowStockMedication.name : "Aman"}
            </div>
            <p className="text-xs text-muted-foreground">
              {lowStockMedication ? "Perlu segera diisi ulang" : "Stok obat cukup"}
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-4 pt-4 lg:grid-cols-7">
        <Card className="col-span-1 lg:col-span-4">
          <CardHeader>
            <CardTitle>Tren Kunjungan UKS</CardTitle>
            <CardDescription>
              Kunjungan selama 7 hari terakhir.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <DashboardCharts visits={visits} />
          </CardContent>
        </Card>
        <Card className="col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle>Kunjungan UKS Terbaru</CardTitle>
            <CardDescription>Siswa yang mengunjungi UKS hari ini.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Siswa</TableHead>
                  <TableHead>Alasan</TableHead>
                  <TableHead>Waktu Masuk</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentVisits.length > 0 ? (
                  recentVisits.map((visit) => (
                    <TableRow key={visit.id}>
                      <TableCell>
                        <div className="font-medium">{visit.studentName}</div>
                        <div className="text-sm text-muted-foreground">
                          {visit.studentClass}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{visit.reason}</Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(visit.entryTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center">
                      Tidak ada kunjungan tercatat hari ini.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
