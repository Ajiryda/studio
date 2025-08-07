
"use client";

import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import type { Visit, Student } from '@/lib/types';
import { getVisits, addVisit, updateVisit, getStudentsByClass } from '@/lib/firebase-services';
import { students as allStudentsMock } from '@/lib/mock-data'; // For class list only
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Skeleton } from './ui/skeleton';
import { Loader2 } from 'lucide-react';


export function UksTrafficClient() {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  
  const [selectedClass, setSelectedClass] = useState('');
  const [studentsInClass, setStudentsInClass] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [reason, setReason] = useState('');

  const fetchVisits = useCallback(async () => {
    try {
        setLoading(true);
        const fetchedVisits = await getVisits();
        setVisits(fetchedVisits);
    } catch (error) {
        toast({ title: "Gagal memuat data kunjungan", variant: "destructive" });
        console.error(error);
    } finally {
        setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchVisits();
  }, [fetchVisits]);

  const classNames = useMemo(() => {
    return [...new Set(allStudentsMock.map(s => s.class))].sort();
  }, []);

  useEffect(() => {
    const fetchStudents = async () => {
        if (selectedClass) {
            setStudentsInClass([]);
            setSelectedStudent(null);
            const fetchedStudents = await getStudentsByClass(selectedClass);
            setStudentsInClass(fetchedStudents);
        } else {
            setStudentsInClass([]);
        }
    }
    fetchStudents();
  }, [selectedClass]);

  const resetDialog = () => {
    setSelectedClass('');
    setStudentsInClass([]);
    setSelectedStudent(null);
    setReason('');
  }

  const handleLogEntry = async () => {
    if (!selectedStudent || !reason) {
      toast({
        title: 'Error',
        description: 'Silakan pilih kelas, siswa, dan masukkan alasan.',
        variant: 'destructive',
      });
      return;
    }

    setSaving(true);
    try {
        const newVisitData = {
            studentId: selectedStudent.id,
            studentName: selectedStudent.name,
            studentClass: selectedStudent.class,
            reason: reason,
        };
        await addVisit(newVisitData);
        toast({
            title: 'Kunjungan Siswa Dicatat',
            description: `${selectedStudent.name} telah dicatat masuk ke UKS.`,
        });
        fetchVisits(); // Refresh list
        resetDialog();
        setDialogOpen(false);
    } catch (error) {
        toast({ title: 'Gagal mencatat kunjungan', variant: 'destructive'});
        console.error(error);
    } finally {
        setSaving(false);
    }
  };

  const handleLogExit = async (id: string) => {
    const visit = visits.find((v) => v.id === id);
    if (!visit) return;

    try {
      await updateVisit(id, { exitTime: new Date().toISOString() });
      toast({
          title: 'Siswa Dicatat Keluar',
          description: `${visit.studentName} telah dicatat keluar dari UKS.`,
      });
      fetchVisits(); // Refresh list
    } catch(error) {
        toast({ title: 'Gagal mencatat keluar', variant: 'destructive'});
        console.error(error);
    }
  };

  const currentlyInUKS = visits.filter((v) => !v.exitTime);
  const visitHistory = visits.filter((v) => v.exitTime);

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
  }
  
  const renderTableBody = (data: Visit[], isCurrent: boolean) => {
    if (loading) {
        return (
             <TableRow>
                <TableCell colSpan={4} className="h-24">
                     <div className="space-y-2">
                        <Skeleton className="h-4 w-3/4 mx-auto" />
                        <Skeleton className="h-4 w-1/2 mx-auto" />
                    </div>
                </TableCell>
            </TableRow>
        )
    }
    if (data.length === 0) {
        return (
            <TableRow>
                <TableCell colSpan={4} className="text-center h-24">
                  {isCurrent ? 'Tidak ada siswa di UKS saat ini.' : 'Belum ada riwayat kunjungan.'}
                </TableCell>
            </TableRow>
        )
    }
    return data.map((visit) => (
        <TableRow key={visit.id}>
          <TableCell>
            <div className="font-medium">{visit.studentName}</div>
            <div className="text-sm text-muted-foreground">{visit.studentClass}</div>
          </TableCell>
          <TableCell>
            <Badge variant="secondary">{visit.reason}</Badge>
          </TableCell>
          <TableCell>
            {formatDateTime(visit.entryTime)}
          </TableCell>
          {isCurrent ? (
             <TableCell className="text-right">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleLogExit(visit.id)}
                >
                  Catat Keluar
                </Button>
              </TableCell>
          ) : (
             <TableCell>
                {visit.exitTime ? formatDateTime(visit.exitTime) : '-'}
             </TableCell>
          )}
        </TableRow>
      ))
  }


  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Saat ini di UKS</h2>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) {
                resetDialog();
            }
          }}>
            <DialogTrigger asChild>
              <Button>Catat Kunjungan Siswa</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Catat Kunjungan Siswa Baru</DialogTitle>
                <DialogDescription>
                  Catat siswa baru yang mengunjungi unit kesehatan.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                 <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="class" className="text-right">
                    Kelas
                  </Label>
                  <Select
                    onValueChange={setSelectedClass}
                    value={selectedClass}
                    disabled={saving}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Pilih kelas" />
                    </SelectTrigger>
                    <SelectContent>
                      {classNames.map((className) => (
                        <SelectItem key={className} value={className}>
                          {className}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="student" className="text-right">
                    Siswa
                  </Label>
                  <Select
                    onValueChange={(studentId) => {
                        const student = studentsInClass.find(s => s.id === studentId);
                        setSelectedStudent(student || null);
                    }}
                    value={selectedStudent?.id || ''}
                    disabled={!selectedClass || saving}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder={studentsInClass.length > 0 ? "Pilih siswa" : "Memuat..."} />
                    </SelectTrigger>
                    <SelectContent>
                      {studentsInClass.map((student) => (
                        <SelectItem key={student.id} value={student.id}>
                          {student.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="reason" className="text-right">
                    Alasan
                  </Label>
                  <Input
                    id="reason"
                    className="col-span-3"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Contoh: Sakit Kepala"
                    disabled={saving}
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" disabled={saving}>Batal</Button>
                </DialogClose>
                <Button onClick={handleLogEntry} disabled={saving || !selectedStudent || !reason}>
                    {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {saving ? 'Mencatat...' : 'Catat Kunjungan'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Siswa</TableHead>
              <TableHead>Alasan</TableHead>
              <TableHead>Waktu Masuk</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {renderTableBody(currentlyInUKS, true)}
          </TableBody>
        </Table>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Riwayat Kunjungan</h2>
        <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Siswa</TableHead>
              <TableHead>Alasan</TableHead>
              <TableHead>Waktu Masuk</TableHead>
              <TableHead>Waktu Keluar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {renderTableBody(visitHistory.slice(0, 10), false)}
          </TableBody>
        </Table>
        </div>
      </div>
    </div>
  );
}
