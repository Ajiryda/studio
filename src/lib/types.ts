export interface Student {
  id: number;
  name: string;
  class: string;
}

export interface Visit {
  id: number;
  studentId: number;
  studentName: string;
  studentClass: string;
  reason: string;
  entryTime: string;
  exitTime: string | null;
}

export interface Medication {
    id: number;
    name: string;
    stock: number;
}

export interface Screening {
    studentId: number;
    studentName: string;
    symptoms: string;
}

export interface ScreeningResult {
  physicalStatus: string;
  mentalHealth: string;
  lifestyle: string;
  recommendations: string[];
}
