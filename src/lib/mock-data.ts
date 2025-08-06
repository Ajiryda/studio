import type { Student, Visit, Medication, Screening } from './types';

export const students: Student[] = [
  { id: 1, name: 'Budi Santoso', class: '10A' },
  { id: 2, name: 'Citra Lestari', class: '11B' },
  { id: 3, name: 'Agus Wijaya', class: '12C' },
  { id: 4, name: 'Dewi Anggraini', class: '10A' },
  { id: 5, name: 'Eko Prasetyo', class: '11C' },
];

export const uksVisits: Visit[] = [
  {
    id: 1,
    studentId: 1,
    studentName: 'Budi Santoso',
    studentClass: '10A',
    reason: 'Headache',
    entryTime: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    exitTime: new Date(new Date().setHours(new Date().getHours() - 23)).toISOString(),
  },
  {
    id: 2,
    studentId: 2,
    studentName: 'Citra Lestari',
    studentClass: '11B',
    reason: 'Stomachache',
    entryTime: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
    exitTime: new Date(new Date().setHours(new Date().getHours() - 47)).toISOString(),
  },
  {
    id: 3,
    studentId: 4,
    studentName: 'Dewi Anggraini',
    studentClass: '10A',
    reason: 'Minor cut',
    entryTime: new Date().toISOString(),
    exitTime: null,
  },
  {
    id: 4,
    studentId: 3,
    studentName: 'Agus Wijaya',
    studentClass: '12C',
    reason: 'Feeling dizzy',
    entryTime: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(),
    exitTime: new Date(new Date().setHours(new Date().getHours() - 70)).toISOString(),
  },
  {
    id: 5,
    studentId: 5,
    studentName: 'Eko Prasetyo',
    studentClass: '11C',
    reason: 'Fever',
    entryTime: new Date().toISOString(),
    exitTime: null,
  },
];

export const medications: Medication[] = [
    { id: 1, name: 'Paracetamol', stock: 50 },
    { id: 2, name: 'Antacid', stock: 30 },
    { id: 3, name: 'Bandages', stock: 100 },
    { id: 4, name: 'Antiseptic Wipes', stock: 80 },
    { id: 5, name: 'Ibuprofen', stock: 45 },
];

export const healthScreeningData: Screening[] = [
    { studentId: 1, studentName: 'Budi Santoso', symptoms: 'Headache and fatigue' },
    { studentId: 2, studentName: 'Citra Lestari', symptoms: 'Stomach cramps' },
    { studentId: 3, studentName: 'Agus Wijaya', symptoms: 'Dizziness and nausea' },
    { studentId: 4, studentName: 'Dewi Anggraini', symptoms: 'Scraped knee' },
    { studentId: 5, studentName: 'Eko Prasetyo', symptoms: 'High temperature and headache' },
];
