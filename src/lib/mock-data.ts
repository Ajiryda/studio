import type { Student, Visit, Medication, Screening } from './types';

export const students: Student[] = [
    { id: 1, name: 'Ahmad Budi Santoso', class: '9A' },
    { id: 2, name: 'Citra Dewi Lestari', class: '8B' },
    { id: 3, name: 'Eko Fajar Nugroho', class: '7C' },
    { id: 4, name: 'Fitriana Indah Sari', class: '9B' },
    { id: 5, name: 'Gilang Ramadhan', class: '8A' },
    { id: 6, name: 'Hana Putri Amelia', class: '7B' },
    { id: 7, name: 'Irfan Jaya Kusuma', class: '9C' },
    { id: 8, name: 'Jasmine Aulia', class: '8C' },
    { id: 9, name: 'Kevin Ardiansyah', class: '7A' },
    { id: 10, name: 'Lina Marlina', class: '9A' },
    { id: 11, name: 'Muhammad Rizky', class: '8B' },
    { id: 12, name: 'Nadia Salsabila', class: '7C' },
    { id: 13, name: 'Oscar Maulana', class: '9B' },
    { id: 14, name: 'Putri Wulandari', class: '8A' },
    { id: 15, name: 'Rian Syahputra', class: '7B' },
];

export const uksVisits: Visit[] = [
  {
    id: 1,
    studentId: 1,
    studentName: 'Ahmad Budi Santoso',
    studentClass: '9A',
    reason: 'Sakit Kepala',
    entryTime: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    exitTime: new Date(new Date().setHours(new Date().getHours() - 23)).toISOString(),
  },
  {
    id: 2,
    studentId: 2,
    studentName: 'Citra Dewi Lestari',
    studentClass: '8B',
    reason: 'Sakit Perut',
    entryTime: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
    exitTime: new Date(new Date().setHours(new Date().getHours() - 47)).toISOString(),
  },
  {
    id: 3,
    studentId: 4,
    studentName: 'Fitriana Indah Sari',
    studentClass: '9B',
    reason: 'Luka Ringan',
    entryTime: new Date().toISOString(),
    exitTime: null,
  },
  {
    id: 4,
    studentId: 3,
    studentName: 'Eko Fajar Nugroho',
    studentClass: '7C',
    reason: 'Pusing',
    entryTime: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(),
    exitTime: new Date(new Date().setHours(new Date().getHours() - 70)).toISOString(),
  },
  {
    id: 5,
    studentId: 5,
    studentName: 'Gilang Ramadhan',
    studentClass: '8A',
    reason: 'Demam',
    entryTime: new Date().toISOString(),
    exitTime: null,
  },
];

export const medications: Medication[] = [
    { id: 1, name: 'Paracetamol', stock: 50 },
    { id: 2, name: 'Antasida', stock: 30 },
    { id: 3, name: 'Plester', stock: 100 },
    { id: 4, name: 'Kain Kasa Antiseptik', stock: 80 },
    { id: 5, name: 'Ibuprofen', stock: 45 },
];

export const healthScreeningData: Screening[] = [
    { studentId: 1, studentName: 'Ahmad Budi Santoso', symptoms: 'Sakit kepala dan kelelahan' },
    { studentId: 2, studentName: 'Citra Dewi Lestari', symptoms: 'Kram perut' },
    { studentId: 3, studentName: 'Eko Fajar Nugroho', symptoms: 'Pusing dan mual' },
    { studentId: 4, studentName: 'Fitriana Indah Sari', symptoms: 'Lutut tergores' },
    { studentId: 5, studentName: 'Gilang Ramadhan', symptoms: 'Suhu badan tinggi dan sakit kepala' },
];
