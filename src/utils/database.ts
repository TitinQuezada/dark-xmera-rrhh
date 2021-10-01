import { initializeApp } from '@firebase/app';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  Firestore,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';

import FirebaseConfiguration from '../configuration/firebase.configuration';

class Database {
  database: Firestore;

  constructor() {
    const firebaseApp = initializeApp(FirebaseConfiguration);
    this.database = getFirestore(firebaseApp);
  }

  async getAll(tableName: string): Promise<Array<DocumentData>> {
    const data: Array<DocumentData> = [];
    const collectionReference = collection(this.database, tableName);

    const querySnapshot = await getDocs(collectionReference);

    querySnapshot.forEach((document) => {
      data.push({ id: document.id, ...document.data() });
    });

    return data;
  }

  async getById(tableName: string, id: string): Promise<DocumentData> {
    const docRef = doc(this.database, tableName, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
  }

  async get(
    tableName: string,
    filterKey: string,
    filterValue: any,
  ): Promise<Array<DocumentData>> {
    const data: Array<DocumentData> = [];
    const collectionReference = collection(this.database, tableName);
    const queryResult = query(
      collectionReference,
      where(filterKey, '==', filterValue),
    );
    const querySnapshot = await getDocs(queryResult);

    querySnapshot.forEach((document) => {
      data.push({ id: document.id, ...document.data() });
    });

    return data;
  }

  async create(tableName: string, document: any): Promise<string> {
    const collectionReference = collection(this.database, tableName);
    const createdDocument = await addDoc(collectionReference, document);
    return createdDocument.id;
  }

  async update(tableName: string, id: string, document: any): Promise<void> {
    const docRef = doc(this.database, tableName, id);
    await updateDoc(docRef, document);
  }

  async delete(tableName: string, id: string): Promise<void> {
    const docRef = doc(this.database, tableName, id);
    await deleteDoc(docRef);
  }
}

export default new Database();
