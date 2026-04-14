import { collection, getDocs, writeBatch, doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Product } from "@/store/useStore";

const PRODUCTS_COLLECTION = "products";

export async function getProductsFromDB(): Promise<Product[]> {
  const productsCol = collection(db, PRODUCTS_COLLECTION);
  const snapshot = await getDocs(productsCol);
  
  const products: Product[] = [];
  snapshot.forEach((doc) => {
    // We expect the data to match the Product interface
    const data = doc.data() as Omit<Product, 'id'> & { id: string | number };
    products.push({
      ...data,
      id: Number(data.id) // Ensure ID is a number for our store
    } as Product);
  });
  
  return products;
}

// Temporary function to seed your initial data to Firestore
export async function seedInitialProducts(products: Product[]) {
  const batch = writeBatch(db);
  
  products.forEach((product) => {
    // Use the product ID as the document ID for convenience, or let Firestore generate it.
    // Using stringified ID to keep it simple.
    const productRef = doc(db, PRODUCTS_COLLECTION, product.id.toString());
    batch.set(productRef, product);
  });

  await batch.commit();
  console.log("Successfully seeded products to Firestore!");
}

export async function addProduct(productData: Omit<Product, 'id'>): Promise<Product> {
  const newId = Date.now();
  const product: Product = { ...productData, id: newId };
  const productRef = doc(db, PRODUCTS_COLLECTION, newId.toString());
  
  await setDoc(productRef, product);
  return product;
}

export async function deleteProduct(productId: number): Promise<void> {
  const productRef = doc(db, PRODUCTS_COLLECTION, productId.toString());
  await deleteDoc(productRef);
}
