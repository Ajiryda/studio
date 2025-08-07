
"use client";

import { useState, useEffect, useCallback } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
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
import type { Medication } from '@/lib/types';
import { getMedications, addMedication, updateMedication, deleteMedication } from '@/lib/firebase-services';
import { PlusCircle, Trash2, Edit, Loader2 } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

export function MedicationClient() {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMed, setCurrentMed] = useState<Partial<Medication>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const fetchMedications = useCallback(async () => {
    try {
      setLoading(true);
      const meds = await getMedications();
      setMedications(meds);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Gagal Memuat Data',
        description: 'Tidak dapat mengambil data obat dari database.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchMedications();
  }, [fetchMedications]);

  const handleOpenDialog = (med?: Medication) => {
    if (med) {
      setIsEditing(true);
      setCurrentMed(med);
    } else {
      setIsEditing(false);
      setCurrentMed({});
    }
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMedication(id);
      setMedications(medications.filter((med) => med.id !== id));
      toast({
        title: 'Obat Dihapus',
        description: 'Data obat telah berhasil dihapus.',
      });
    } catch (error) {
      toast({
        title: 'Gagal Menghapus',
        description: 'Terjadi kesalahan saat menghapus data.',
        variant: 'destructive',
      });
    }
  };

  const handleSaveChanges = async () => {
    if (!currentMed.name || currentMed.stock === undefined || currentMed.stock < 0) {
      toast({
        title: 'Input Tidak Valid',
        description: 'Nama obat dan stok harus diisi dengan benar.',
        variant: 'destructive',
      });
      return;
    }

    setSaving(true);
    try {
      if (isEditing && currentMed.id) {
        await updateMedication(currentMed.id, { name: currentMed.name, stock: currentMed.stock });
        toast({
          title: 'Obat Diperbarui',
          description: `Data untuk ${currentMed.name} telah diperbarui.`,
        });
      } else {
        await addMedication({ name: currentMed.name, stock: currentMed.stock });
        toast({
          title: 'Obat Ditambahkan',
          description: `${currentMed.name} telah ditambahkan ke daftar.`,
        });
      }
      fetchMedications(); // Refresh data from firestore
    } catch (error) {
       toast({
        title: 'Gagal Menyimpan',
        description: 'Terjadi kesalahan saat menyimpan data.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
      setDialogOpen(false);
      setCurrentMed({});
    }
  };
  
  const renderTableBody = () => {
    if (loading) {
        return (
            <TableRow>
                <TableCell colSpan={3} className="h-24 text-center">
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-1/2 mx-auto" />
                        <Skeleton className="h-4 w-1/3 mx-auto" />
                    </div>
                </TableCell>
            </TableRow>
        );
    }
    if (medications.length === 0) {
        return (
            <TableRow>
                <TableCell colSpan={3} className="text-center h-24">
                    Tidak ada data obat. Silakan tambahkan obat baru.
                </TableCell>
            </TableRow>
        );
    }
    return medications.map((med) => (
      <TableRow key={med.id}>
        <TableCell className="font-medium">{med.name}</TableCell>
        <TableCell>{med.stock}</TableCell>
        <TableCell className="text-right">
          <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(med)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDelete(med.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </TableCell>
      </TableRow>
    ));
  };


  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()}>
              <PlusCircle className="mr-2" />
              Tambah Obat
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{isEditing ? 'Edit Obat' : 'Tambah Obat Baru'}</DialogTitle>
              <DialogDescription>
                {isEditing ? 'Perbarui detail obat di bawah ini.' : 'Masukkan detail untuk obat baru.'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nama Obat
                </Label>
                <Input
                  id="name"
                  value={currentMed.name || ''}
                  onChange={(e) => setCurrentMed({ ...currentMed, name: e.target.value })}
                  className="col-span-3"
                  placeholder="e.g., Paracetamol"
                  disabled={saving}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="stock" className="text-right">
                  Stok
                </Label>
                <Input
                  id="stock"
                  type="number"
                  value={currentMed.stock || ''}
                  onChange={(e) => setCurrentMed({ ...currentMed, stock: parseInt(e.target.value) || 0 })}
                  className="col-span-3"
                  placeholder="e.g., 100"
                   disabled={saving}
                />
              </div>
            </div>
            <DialogFooter>
               <DialogClose asChild>
                  <Button variant="outline" disabled={saving}>Batal</Button>
                </DialogClose>
              <Button onClick={handleSaveChanges} disabled={saving}>
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Obat</TableHead>
              <TableHead>Stok</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {renderTableBody()}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
