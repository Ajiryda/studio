"use client";

import { MainLayout } from '@/components/main-layout';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Download, Upload, Loader2 } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { batchAddStudents } from '@/lib/firebase-services';
import type { Student } from '@/lib/types';

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

  const [importFile, setImportFile] = useState<File | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const { toast } = useToast();


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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImportFile(event.target.files[0]);
    }
  };

  const handleImport = async () => {
    if (!importFile) {
      toast({
        title: 'Tidak ada file terpilih',
        description: 'Silakan pilih file JSON untuk diimpor.',
        variant: 'destructive',
      });
      return;
    }

    setIsImporting(true);
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const text = e.target?.result;
        if (typeof text !== 'string') {
          throw new Error("Gagal membaca file");
        }
        const students: Student[] = JSON.parse(text);

        // Basic validation
        if (!Array.isArray(students) || students.some(s => !s.id || !s.name || !s.class)) {
             toast({
                title: 'Format JSON tidak valid',
                description: 'Pastikan file JSON adalah array dan setiap objek siswa memiliki "id", "name", dan "class".',
                variant: 'destructive',
            });
            setIsImporting(false);
            return;
        }
        
        await batchAddStudents(students);

        toast({
          title: 'Impor Berhasil',
          description: `${students.length} data siswa telah berhasil diunggah ke Firestore.`,
        });

      } catch (error) {
        console.error("Import error:", error);
        toast({
          title: 'Gagal Mengimpor',
          description: error instanceof Error ? error.message : 'Terjadi kesalahan saat memproses file JSON.',
          variant: 'destructive',
        });
      } finally {
        setIsImporting(false);
        setImportFile(null);
      }
    };
    reader.readAsText(importFile);
  };

  return (
    <MainLayout>
      <PageHeader
        title="Dasbor Admin"
        description="Pantau progres skrining kesehatan siswa dan kelola data."
      />
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Impor Data Siswa</CardTitle>
            <CardDescription>Unggah file JSON untuk menambahkan banyak siswa sekaligus ke database.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="json-file">File JSON Siswa</Label>
                  <Input id="json-file" type="file" accept=".json" onChange={handleFileChange} />
              </div>
              {importFile && <p className="text-sm text-muted-foreground">File terpilih: {importFile.name}</p>}
          </CardContent>
           <CardContent>
             <Button onClick={handleImport} disabled={isImporting || !importFile}>
              {isImporting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Mengimpor...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Impor Siswa
                </>
              )}
            </Button>
           </CardContent>
        </Card>
      
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
