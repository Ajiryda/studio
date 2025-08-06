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
import { medications as initialMedications } from '@/lib/mock-data';
import { PlusCircle, Trash2, Edit } from 'lucide-react';

export function MedicationClient() {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMed, setCurrentMed] = useState<Partial<Medication>>({});
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, this would be a fetch call to an API
    setMedications(initialMedications);
  }, []);

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

  const handleDelete = (id: number) => {
    setMedications(medications.filter((med) => med.id !== id));
    toast({
      title: 'Obat Dihapus',
      description: 'Data obat telah berhasil dihapus.',
    });
  };

  const handleSaveChanges = () => {
    if (!currentMed.name || currentMed.stock === undefined || currentMed.stock < 0) {
      toast({
        title: 'Input Tidak Valid',
        description: 'Nama obat dan stok harus diisi dengan benar.',
        variant: 'destructive',
      });
      return;
    }

    if (isEditing) {
      setMedications(medications.map((med) => (med.id === currentMed.id ? (currentMed as Medication) : med)));
      toast({
        title: 'Obat Diperbarui',
        description: `Data untuk ${currentMed.name} telah diperbarui.`,
      });
    } else {
      const newMed: Medication = {
        id: Math.max(...medications.map((m) => m.id), 0) + 1,
        name: currentMed.name,
        stock: currentMed.stock,
      };
      setMedications([...medications, newMed]);
      toast({
        title: 'Obat Ditambahkan',
        description: `${currentMed.name} telah ditambahkan ke daftar.`,
      });
    }

    setDialogOpen(false);
    setCurrentMed({});
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
                />
              </div>
            </div>
            <DialogFooter>
               <DialogClose asChild>
                  <Button variant="outline">Batal</Button>
                </DialogClose>
              <Button onClick={handleSaveChanges}>Simpan Perubahan</Button>
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
            {medications.map((med) => (
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
            ))}
             {medications.length === 0 && (
                <TableRow>
                    <TableCell colSpan={3} className="text-center h-24">
                        Tidak ada data obat.
                    </TableCell>
                </TableRow>
             )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
