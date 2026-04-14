import { collection, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

const CATEGORIES_COLLECTION = "categories";

export interface Category {
  id: number;
  name: string;
}

export async function getCategoriesFromDB(): Promise<Category[]> {
  const colRef = collection(db, CATEGORIES_COLLECTION);
  const snapshot = await getDocs(colRef);
  
  const categories: Category[] = [];
  snapshot.forEach((doc) => {
    const data = doc.data() as Omit<Category, 'id'> & { id: string | number };
    categories.push({
      ...data,
      id: Number(data.id)
    } as Category);
  });
  
  return categories.sort((a, b) => a.name.localeCompare(b.name));
}

export async function addCategory(name: string): Promise<Category> {
  const newId = Date.now();
  const category: Category = { id: newId, name };
  const catRef = doc(db, CATEGORIES_COLLECTION, newId.toString());
  
  await setDoc(catRef, category);
  return category;
}

export async function deleteCategory(id: number): Promise<void> {
  const catRef = doc(db, CATEGORIES_COLLECTION, id.toString());
  await deleteDoc(catRef);
}
