
'use server';

import { db } from './firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy, where, Timestamp, getDoc, writeBatch } from 'firebase/firestore';
import type { Medication, Visit, Student } from './types';

const MEDICATIONS_COLLECTION = 'medications';
const VISITS_COLLECTION = 'visits';
const STUDENTS_COLLECTION = 'students';

// Medication Services
export const getMedications = async (): Promise<Medication[]> => {
  const q = query(collection(db, MEDICATIONS_COLLECTION), orderBy('name'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Medication));
};

export const addMedication = async (med: Omit<Medication, 'id'>): Promise<Medication> => {
  const docRef = await addDoc(collection(db, MEDICATIONS_COLLECTION), med);
  return { id: docRef.id, ...med };
};

export const updateMedication = async (id: string, med: Partial<Medication>): Promise<void> => {
  const docRef = doc(db, MEDICATIONS_COLLECTION, id);
  await updateDoc(docRef, med);
};

export const deleteMedication = async (id: string): Promise<void> => {
  const docRef = doc(db, MEDICATIONS_COLLECTION, id);
  await deleteDoc(docRef);
};


// Student Services
export const getStudents = async (): Promise<Student[]> => {
    const q = query(collection(db, STUDENTS_COLLECTION), orderBy('name'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Student));
};

export const getStudentById = async (id: string): Promise<Student | null> => {
    const docRef = doc(db, STUDENTS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Student;
    }
    return null;
}


export const getStudentsByClass = async (className: string): Promise<Student[]> => {
    const q = query(collection(db, STUDENTS_COLLECTION), where('class', '==', className));
    const querySnapshot = await getDocs(q);
    const students = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    } as Student));
    // Sort students by name client-side
    return students.sort((a, b) => a.name.localeCompare(b.name));
}

export const batchAddStudents = async (students: Student[]): Promise<void> => {
    const batch = writeBatch(db);
    const studentsCollection = collection(db, STUDENTS_COLLECTION);
    students.forEach((student) => {
        // Use student.id as the document ID in Firestore
        const docRef = doc(studentsCollection, student.id);
        batch.set(docRef, {
            name: student.name,
            class: student.class,
        });
    });
    await batch.commit();
}

// Visit Services
export const getVisits = async (): Promise<Visit[]> => {
  const q = query(collection(db, VISITS_COLLECTION), orderBy('entryTime', 'desc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      entryTime: (data.entryTime as Timestamp).toDate().toISOString(),
      exitTime: data.exitTime ? (data.exitTime as Timestamp).toDate().toISOString() : null,
    } as Visit;
  });
};

export const getVisitsByStudent = async (studentId: string): Promise<Visit[]> => {
    const q = query(collection(db, VISITS_COLLECTION), where('studentId', '==', studentId), orderBy('entryTime', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            ...data,
            entryTime: (data.entryTime as Timestamp).toDate().toISOString(),
            exitTime: data.exitTime ? (data.exitTime as Timestamp).toDate().toISOString() : null,
        } as Visit;
    });
}

export const addVisit = async (visit: Omit<Visit, 'id' | 'entryTime' | 'exitTime'>): Promise<Visit> => {
  const newVisitData = {
    ...visit,
    entryTime: Timestamp.now(),
    exitTime: null,
  };
  const docRef = await addDoc(collection(db, VISITS_COLLECTION), newVisitData);

  return { 
      id: docRef.id, 
      ...visit, 
      entryTime: newVisitData.entryTime.toDate().toISOString(),
      exitTime: null 
  };
};

export const updateVisit = async (id: string, updates: Partial<Visit>): Promise<void> => {
    const docRef = doc(db, VISITS_COLLECTION, id);
    const dataToUpdate: { [key: string]: any } = { ...updates };
    if (updates.exitTime) {
      dataToUpdate.exitTime = Timestamp.fromDate(new Date(updates.exitTime));
    }
    await updateDoc(docRef, dataToUpdate);
};
