
import type { Student, Visit, Medication, Screening } from './types';

export const students: Student[] = [];

export const uksVisits: Visit[] = [];

export const medications: Medication[] = [
    { id: '1', name: 'Paracetamol', stock: 50 },
    { id: '2', name: 'Antasida', stock: 30 },
    { id: '3', name: 'Plester', stock: 100 },
    { id: '4', name: 'Kain Kasa Antiseptik', stock: 80 },
    { id: '5', name: 'Ibuprofen', stock: 45 },
];

export const healthScreeningData: Screening[] = [
    { studentId: "1", studentName: 'Ahmad Budi Santoso', symptoms: 'Sakit kepala dan kelelahan' },
    { studentId: "2", studentName: 'Citra Dewi Lestari', symptoms: 'Kram perut' },
    { studentId: "3", studentName: 'Eko Fajar Nugroho', symptoms: 'Pusing dan mual' },
    { studentId: "4", studentName: 'Fitriana Indah Sari', symptoms: 'Lutut tergores' },
    { studentId: "5", studentName: 'Gilang Ramadhan', symptoms: 'Suhu badan tinggi dan sakit kepala' },
];
