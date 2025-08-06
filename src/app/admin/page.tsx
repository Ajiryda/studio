"use client";

import { MainLayout } from '@/components/main-layout';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Download } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface jsPDFWithAutoTable extends jsPDF {
  autoTable: (options: any) => jsPDF;
}


export default function AdminDashboardPage() {
  // Mock data for demonstration
  const screeningStatus = [
    { class: '7A', screened: 28, total: 33 },
    { class: '8B', screened: 30, total: 32 },
    { class: '9F', screened: 25, total: 29 },
  ];

  const studentHistory = {
    name: 'AGUNG WIBOWO',
    class: '7A',
    history: [
      { date: '2024-05-10', physical: 'Sehat', mental: 'Normal', lifestyle: 'Perlu Pembinaan' },
      { date: '2023-10-15', physical: 'Sehat', mental: 'Normal', lifestyle: 'Sehat' },
    ],
  };
  
  const unscreenedStudents = [
    { name: 'ADAM FURYANIAWAN PUTRA', class: '7A' },
    { name: 'AGUNG WIBOWO', class: '7A' },
    { name: 'AHMAD EDI SAPUTRA', class: '7A' },
  ];

  const exportToPDF = () => {
    const doc = new jsPDF() as jsPDFWithAutoTable;
    doc.text("Daftar Siswa Belum Skrining", 14, 16);
    doc.autoTable({
        startY: 20,
        head: [['Nama Siswa', 'Kelas']],
        body: unscreenedStudents.map(s => [s.name, s.class]),
    });
    doc.save('siswa-belum-skrining.pdf');
  }

  return (
    <MainLayout>
      <PageHeader
        title="Dasbor Admin"
        description="Pantau progres skrining kesehatan siswa dan kelola data."
      />
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Statistik Skrining per Kelas</CardTitle>
            <CardDescription>Ringkasan jumlah siswa yang sudah dan belum diskrining per kelas.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kelas</TableHead>
                  <TableHead>Progres</TableHead>
                  <TableHead className="text-right">Jumlah</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {screeningStatus.map((status) => (
                  <TableRow key={status.class}>
                    <TableCell className="font-medium">{status.class}</TableCell>
                    <TableCell>
                      <div className="h-4 w-full rounded-full bg-secondary">
                        <div
                          className="h-4 rounded-full bg-primary"
                          style={{ width: `${(status.screened / status.total) * 100}%` }}
                        ></div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{`${status.screened}/${status.total}`}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Riwayat Skrining Siswa</CardTitle>
            <CardDescription>Lihat riwayat hasil skrining untuk setiap siswa.</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Student search would go here */}
            <div className="mb-4">
              <p className="font-semibold">{studentHistory.name} - {studentHistory.class}</p>
            </div>
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
                  {studentHistory.history.map((entry, index) => (
                    <TableRow key={index}>
                      <TableCell>{entry.date}</TableCell>
                      <TableCell><Badge variant={entry.physical === 'Sehat' ? 'default' : 'destructive'}>{entry.physical}</Badge></TableCell>
                      <TableCell><Badge variant={entry.mental === 'Normal' ? 'default' : 'destructive'}>{entry.mental}</Badge></TableCell>
                      <TableCell><Badge variant={entry.lifestyle === 'Sehat' ? 'default' : 'destructive'}>{entry.lifestyle}</Badge></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Siswa Belum Skrining</CardTitle>
              <CardDescription>Daftar siswa yang perlu diingatkan untuk melakukan skrining.</CardDescription>
            </div>
            <Button size="sm" variant="outline" onClick={exportToPDF}>
                <Download className="mr-2 h-4 w-4"/>
                Ekspor Data
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama Siswa</TableHead>
                    <TableHead>Kelas</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                    {unscreenedStudents.map((student, index) => (
                         <TableRow key={index}>
                            <TableCell className="font-medium">{student.name}</TableCell>
                            <TableCell>{student.class}</TableCell>
                            <TableCell className="text-right">
                                <Button size="sm" variant="secondary">Ingatkan</Button>
                            </TableCell>
                         </TableRow>
                    ))}
                </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
