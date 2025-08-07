
"use client";

import { MainLayout } from '@/components/main-layout';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Upload, Loader2, Database } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { batchAddStudents, seedDatabaseWithStudents, getStudents, getScreenings } from '@/lib/firebase-services';
import type { Student, Screening } from '@/lib/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';


export default function AdminDashboardPage() {
  
  const [importFile, setImportFile] = useState<File | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<Student[]>([]);
  const [screenings, setScreenings] = useState<Screening[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const studentsData = await getStudents();
        const screeningsData = await getScreenings();
        setStudents(studentsData);
        setScreenings(screeningsData);
      } catch (error) {
        console.error("Failed to fetch admin data:", error);
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


  const screeningStatusData = useMemo(() => {
    if (students.length === 0) return [];
    
    const studentsByClass = students.reduce((acc, student) => {
      acc[student.class] = (acc[student.class] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const screenedStudentIds = new Set(screenings.map(s => s.studentId));
    
    const screenedByClass = students.reduce((acc, student) => {
        if (screenedStudentIds.has(student.id)) {
             acc[student.class] = (acc[student.class] || 0) + 1;
        }
        return acc;
    }, {} as Record<string, number>);

    return Object.keys(studentsByClass).sort().map(className => ({
        name: className,
        total: studentsByClass[className],
        sudah: screenedByClass[className] || 0,
        belum: studentsByClass[className] - (screenedByClass[className] || 0),
    }));
  }, [students, screenings]);

  const recentScreenings = useMemo(() => {
    return screenings.slice(0, 5);
  }, [screenings]);


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
        const studentsData: any[] = JSON.parse(text);

        // Basic validation and transformation
        const validStudents: Student[] = studentsData.map(s => {
             if (!s.id || !s.name || !s.class) {
                throw new Error('Setiap objek siswa harus memiliki "id", "name", dan "class".');
             }
             return {
                id: s.id.toString(),
                name: s.name,
                class: s.class,
             }
        });
        
        await batchAddStudents(validStudents);

        toast({
          title: 'Impor Berhasil',
          description: `${validStudents.length} data siswa telah berhasil diunggah ke Firestore.`,
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
  
  const handleSeed = async () => {
    setIsSeeding(true);
    try {
        const count = await seedDatabaseWithStudents();
        if (count > 0) {
             toast({
                title: 'Database Terisi',
                description: `${count} data siswa berhasil dimasukkan ke Firestore.`,
            });
        } else {
             toast({
                title: 'Database Sudah Terisi',
                description: 'Tidak ada data baru yang ditambahkan.',
                variant: 'default',
            });
        }
    } catch (error) {
        console.error("Seeding error:", error);
        toast({
          title: 'Gagal Mengisi Database',
          description: error instanceof Error ? error.message : 'Terjadi kesalahan.',
          variant: 'destructive',
        });
    } finally {
        setIsSeeding(false);
    }
  }

  const getStatusBadgeVariant = (status: string): "default" | "destructive" | "secondary" => {
    const lowerStatus = status.toLowerCase();
    if (lowerStatus.includes("sehat") || lowerStatus.includes("normal")) return "default";
    if (lowerStatus.includes("waspada") || lowerStatus.includes("perlu pembinaan")) return "secondary";
    return "destructive";
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
            <CardTitle>Kelola Data Siswa</CardTitle>
            <CardDescription>Isi database dengan data awal atau unggah file JSON untuk menambahkan siswa.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
              <Alert>
                <Database className="h-4 w-4" />
                <AlertTitle>Opsi 1: Isi dengan Data Awal (Direkomendasikan)</AlertTitle>
                <AlertDescription>
                  Klik tombol ini untuk mengisi database Firestore Anda dengan daftar lengkap siswa yang sudah disiapkan. Ini adalah cara tercepat untuk memulai.
                </AlertDescription>
                 <div className="mt-4">
                    <Button onClick={handleSeed} disabled={isSeeding}>
                      {isSeeding ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Memproses...
                        </>
                      ) : (
                        <>
                          <Database className="mr-2 h-4 w-4" />
                          Isi Database Siswa
                        </>
                      )}
                    </Button>
                </div>
              </Alert>

              <Alert>
                  <Upload className="h-4 w-4" />
                  <AlertTitle>Opsi 2: Impor dari File JSON</AlertTitle>
                  <AlertDescription>
                    Jika Anda memiliki file JSON sendiri, Anda bisa mengunggahnya di sini. Pastikan setiap siswa memiliki "id" (bisa angka atau string), "name", dan "class".
                  </AlertDescription>
                   <div className="mt-4 space-y-4">
                     <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="json-file">File JSON Siswa</Label>
                        <Input id="json-file" type="file" accept=".json" onChange={handleFileChange} />
                    </div>
                    {importFile && <p className="text-sm text-muted-foreground">File terpilih: {importFile.name}</p>}
                    <Button onClick={handleImport} disabled={isImporting || !importFile}>
                    {isImporting ? (
                        <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Mengimpor...
                        </>
                    ) : (
                        <>
                        <Upload className="mr-2 h-4 w-4" />
                        Impor Siswa dari JSON
                        </>
                    )}
                    </Button>
                   </div>
              </Alert>
          </CardContent>
        </Card>
      
        <Card>
          <CardHeader>
            <CardTitle>Statistik Skrining per Kelas</CardTitle>
            <CardDescription>Visualisasi jumlah siswa yang sudah dan belum diskrining per kelas.</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
                 <div className="h-72 w-full flex items-center justify-center">
                    <Skeleton className="h-64 w-full" />
                 </div>
            ) : (
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={screeningStatusData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                        <XAxis dataKey="name" />
                        <YAxis allowDecimals={false} />
                        <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}/>
                        <Legend />
                        <Bar dataKey="sudah" stackId="a" fill="hsl(var(--primary))" name="Sudah Skrining" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="belum" stackId="a" fill="hsl(var(--secondary))" name="Belum Skrining" radius={[4, 4, 0, 0]}/>
                    </BarChart>
                </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Riwayat Skrining Terbaru</CardTitle>
            <CardDescription>Menampilkan 5 hasil skrining terakhir yang dimasukkan.</CardDescription>
          </CardHeader>
          <CardContent>
             {loading ? (
                <div className="space-y-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                </div>
            ) : (
                <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Siswa</TableHead>
                        <TableHead>Tanggal</TableHead>
                        <TableHead>Fisik</TableHead>
                        <TableHead>Mental</TableHead>
                        <TableHead>Pola Hidup</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {recentScreenings.length > 0 ? recentScreenings.map((entry) => (
                        <TableRow key={entry.id}>
                        <TableCell>
                            <div className="font-medium">{entry.studentName}</div>
                            <div className="text-sm text-muted-foreground">{entry.studentClass}</div>
                        </TableCell>
                        <TableCell>{new Date(entry.screeningDate).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</TableCell>
                        <TableCell><Badge variant={getStatusBadgeVariant(entry.physicalStatus)}>{entry.physicalStatus}</Badge></TableCell>
                        <TableCell><Badge variant={getStatusBadgeVariant(entry.mentalHealth)}>{entry.mentalHealth}</Badge></TableCell>
                        <TableCell><Badge variant={getStatusBadgeVariant(entry.lifestyle)}>{entry.lifestyle}</Badge></TableCell>
                        </TableRow>
                    )) : (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center h-24">Belum ada data skrining.</TableCell>
                        </TableRow>
                    )}
                    </TableBody>
                </Table>
            )}
          </CardContent>
        </Card>
        
      </div>
    </MainLayout>
  );
}
