import { doc, addDoc, collection, updateDoc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from "./config"

export async function save(id, data) {

      const dbCollection = collection(db, `/anime/users/${id}`);
      const docRef = await addDoc(dbCollection, data);
      return docRef.id;

}

export async function remove(id, documentId) {
    try {
        const docRef = doc(db, `anime/users/${id}`, documentId);
        await deleteDoc(docRef);
        console.log('Document successfully deleted!');
    } catch (error) {
        console.error('Error removing document:', error.message);
    }
}



