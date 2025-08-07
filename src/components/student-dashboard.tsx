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
import { Badge } from "./ui/badge";
import { useAuth } from "@/hooks/use-auth";
import { useEffect, useState } from "react";
import type { Visit } from "@/lib/types";
import { getVisitsByStudent } from "@/lib/firebase-services";

export function StudentDashboard() {
  const { user } = useAuth();
  const [myVisits, setMyVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.role === "siswa") {
      const fetchVisits = async () => {
        setLoading(true);
        const studentVisits = await getVisitsByStudent(user.id);
        setMyVisits(studentVisits);
        setLoading(false);
      };
      fetchVisits();
    }
  }, [user]);

  // Mock screening data for now
  const screeningHistory = [
    {
      date: "2024-05-10",
      physical: "Sehat",
      mental: "Normal",
      lifestyle: "Perlu Pembinaan",
    },
    {
      date: "2023-10-15",
      physical: "Sehat",
      mental: "Normal",
      lifestyle: "Sehat",
    },
  ];

  if (!user) return null;

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Riwayat Skrining Kesehatan Anda</CardTitle>
          <CardDescription>
            Hasil skrining kesehatan yang pernah Anda ikuti.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tanggal</TableHead>
                <TableHead>Fisik</TableHead>
                <TableHead>Mental</TableHead>
                <TableHead>Pola Hidup</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {screeningHistory.length > 0 ? (
                screeningHistory.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell>{entry.date}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          entry.physical === "Sehat" ? "default" : "destructive"
                        }
                      >
                        {entry.physical}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          entry.mental === "Normal" ? "default" : "destructive"
                        }
                      >
                        {entry.mental}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          entry.lifestyle === "Sehat"
                            ? "default"
                            : "destructive"
                        }
                      >
                        {entry.lifestyle}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    Anda belum pernah melakukan skrining.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Riwayat Kunjungan UKS Anda</CardTitle>
          <CardDescription>
            Catatan kunjungan Anda ke Unit Kesehatan Sekolah.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Alasan</TableHead>
                <TableHead>Waktu Masuk</TableHead>
                <TableHead>Waktu Keluar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                    <TableCell colSpan={3} className="h-24 text-center">Memuat riwayat kunjungan...</TableCell>
                </TableRow>
              ) : myVisits.length > 0 ? (
                myVisits.map((visit) => (
                  <TableRow key={visit.id}>
                    <TableCell>
                      <Badge variant="secondary">{visit.reason}</Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(visit.entryTime).toLocaleString("id-ID")}
                    </TableCell>
                    <TableCell>
                      {visit.exitTime
                        ? new Date(visit.exitTime).toLocaleString("id-ID")
                        : "Masih di UKS"}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="h-24 text-center">
                    Anda tidak memiliki riwayat kunjungan ke UKS.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
