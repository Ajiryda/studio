

export interface Student {
  id: string;
  name: string;
  class: string;
  absenceNumber?: number;
  school?: string;
}

export interface Visit {
  id: string; // Changed to string for Firestore
  studentId: string; // Changed to string to reference student doc ID
  studentName: string;
  studentClass: string;
  reason: string;
  entryTime: string; // ISO string format
  exitTime: string | null; // ISO string format or null
}

export interface Medication {
    id: string; 
    name: string;
    stock: number;
}

export interface Screening {
    id: string;
    studentId: string;
    studentName: string;
    studentClass: string;
    screeningDate: string; // ISO string
    physicalStatus: string;
    mentalHealth: string;
    lifestyle: string;
    recommendations: string[];
}

export interface ScreeningResult {
  physicalStatus: string;
  mentalHealth: string;
  lifestyle: string;
  recommendations: string[];
}

export interface User {
  id: string;
  name: string;
  role: 'admin' | 'guru' | 'siswa';
  class?: string;
}
