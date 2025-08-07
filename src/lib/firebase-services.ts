
'use server';

import { db } from './firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import type { Medication } from './types';

const MEDICATIONS_COLLECTION = 'medications';

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
