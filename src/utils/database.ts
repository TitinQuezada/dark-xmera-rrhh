import { initializeApp } from '@firebase/app';
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  Firestore,
  getDoc,
  getDocs,
  getFirestore,
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

    return docSnap.data();
  }

  async create(tableName: string, document: any): Promise<void> {
    const collectionReference = collection(this.database, tableName);
    await addDoc(collectionReference, document);
  }
}

export default new Database();
