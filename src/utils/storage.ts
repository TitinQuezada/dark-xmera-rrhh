import { initializeApp } from 'firebase/app';
import {
  ref,
  getStorage,
  uploadBytes,
  FirebaseStorage,
  getDownloadURL,
} from 'firebase/storage';

class Storage {
  storage: FirebaseStorage;

  constructor() {
    const firebaseApp = initializeApp({});
    this.storage = getStorage(firebaseApp);
  }

  async uploadFile(file: Express.Multer.File, path: string): Promise<any> {
    const storageReference = ref(this.storage, path);

    await uploadBytes(storageReference, file.buffer, {
      contentType: file.mimetype,
    });
  }

  async getDownloadURL(path: string): Promise<string> {
    const storageReference = ref(this.storage, path);
    return await getDownloadURL(storageReference);
  }
}

export default new Storage();
