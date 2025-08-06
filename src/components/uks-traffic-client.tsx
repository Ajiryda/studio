"use client";

import { useState, useEffect } from 'react';
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
import type { Visit } from '@/lib/types';
import { uksVisits as initialVisits, students } from '@/lib/mock-data';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

export function UksTrafficClient() {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [newVisit, setNewVisit] = useState({
    studentId: '',
    reason: '',
  });
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setVisits(initialVisits);
  }, []);

  const handleLogEntry = () => {
    if (!newVisit.studentId || !newVisit.reason) {
      toast({
        title: 'Error',
        description: 'Silakan pilih siswa dan masukkan alasan.',
        variant: 'destructive',
      });
      return;
    }

    const student = students.find((s) => s.id === parseInt(newVisit.studentId));
    if (!student) return;

    const newEntry: Visit = {
      id: visits.length + 1,
      studentId: student.id,
      studentName: student.name,
      studentClass: student.class,
      reason: newVisit.reason,
      entryTime: new Date().toISOString(),
      exitTime: null,
    };
    setVisits((prev) => [newEntry, ...prev]);
    toast({
      title: 'Kunjungan Siswa Dicatat',
      description: `${student.name} telah dicatat masuk ke UKS.`,
    });
    setNewVisit({ studentId: '', reason: '' });
    setDialogOpen(false);
  };

  const handleLogExit = (id: number) => {
    setVisits((prev) =>
      prev.map((v) =>
        v.id === id ? { ...v, exitTime: new Date().toISOString() } : v
      )
    );
    const visit = visits.find((v) => v.id === id);
    if(visit) {
        toast({
            title: 'Siswa Dicatat Keluar',
            description: `${visit.studentName} telah dicatat keluar dari UKS.`,
        });
    }
  };

  const currentlyInUKS = visits.filter((v) => !v.exitTime);
  const visitHistory = visits.filter((v) => v.exitTime);

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Saat ini di UKS</h2>
          <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
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
                  <Label htmlFor="student" className="text-right">
                    Siswa
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      setNewVisit({ ...newVisit, studentId: value })
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Pilih siswa" />
                    </SelectTrigger>
                    <SelectContent>
                      {students.map((student) => (
                        <SelectItem key={student.id} value={student.id.toString()}>
                          {student.name} - {student.class}
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
                    value={newVisit.reason}
                    onChange={(e) =>
                      setNewVisit({ ...newVisit, reason: e.target.value })
                    }
                    placeholder="Contoh: Sakit Kepala"
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Batal</Button>
                </DialogClose>
                <Button onClick={handleLogEntry}>Catat Kunjungan</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
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
            {currentlyInUKS.length > 0 ? (
              currentlyInUKS.map((visit) => (
                <TableRow key={visit.id}>
                  <TableCell>
                    <div className="font-medium">{visit.studentName}</div>
                    <div className="text-sm text-muted-foreground">{visit.studentClass}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{visit.reason}</Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(visit.entryTime).toLocaleTimeString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleLogExit(visit.id)}
                    >
                      Catat Keluar
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center h-24">
                  Tidak ada siswa di UKS saat ini.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div>
        <h2 className="text-xl font-semibold">Riwayat Kunjungan</h2>
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
            {visitHistory.slice(0, 10).map((visit) => (
              <TableRow key={visit.id}>
                <TableCell>
                  <div className="font-medium">{visit.studentName}</div>
                  <div className="text-sm text-muted-foreground">{visit.studentClass}</div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{visit.reason}</Badge>
                </TableCell>
                <TableCell>
                  {new Date(visit.entryTime).toLocaleTimeString()}
                </TableCell>
                <TableCell>
                  {visit.exitTime
                    ? new Date(visit.exitTime).toLocaleTimeString()
                    : '-'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
