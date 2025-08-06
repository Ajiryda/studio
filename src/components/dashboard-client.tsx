"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/icons';
import { uksVisits } from '@/lib/mock-data';
import { DashboardCharts } from '@/components/dashboard-charts';
import { useEffect, useState } from 'react';
import type { Visit } from '@/lib/types';

export function DashboardClient() {
  const [recentVisits, setRecentVisits] = useState<Visit[]>([]);
  const [studentsInUKS, setStudentsInUKS] = useState(0);

  useEffect(() => {
    const today = new Date();
    const filteredRecentVisits = uksVisits
      .filter(
        (visit) =>
          new Date(visit.entryTime).toDateString() === today.toDateString()
      )
      .slice(0, 5);
    setRecentVisits(filteredRecentVisits);

    const filteredStudentsInUKS = uksVisits.filter(
      (visit) => !visit.exitTime
    ).length;
    setStudentsInUKS(filteredStudentsInUKS);
  }, []);

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Siswa di UKS
            </CardTitle>
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
            <div className="text-2xl font-bold">{recentVisits.length}</div>
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
            <div className="text-2xl font-bold">Sakit Kepala</div>
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
            <div className="text-2xl font-bold">Paracetamol</div>
            <p className="text-xs text-muted-foreground">
              Perlu segera diisi ulang
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-4 pt-4 lg:grid-cols-7">
        <Card className="col-span-1 lg:col-span-4">
          <CardHeader>
            <CardTitle>Tren Kunjungan UKS</CardTitle>
            <CardDescription>Kunjungan selama 7 hari terakhir.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <DashboardCharts />
          </CardContent>
        </Card>
        <Card className="col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle>Kunjungan UKS Terbaru</CardTitle>
            <CardDescription>
              Siswa yang mengunjungi UKS hari ini.
            </CardDescription>
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
                          hour: '2-digit',
                          minute: '2-digit',
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
