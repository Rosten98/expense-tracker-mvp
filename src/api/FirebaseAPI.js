import { initializeApp } from "firebase/app";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import { firebaseConfig } from "./firebaseConfig";


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export const addExpenseDoc = async (expense) => {
  try {
    const docRef = await addDoc(collection(db, "expenses"), {
      description: expense.description,
      price: expense.price,
      category: expense.category,
    });
  
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export const readExpenseDoc = async (expense) => {
  const querySnapshot = await getDocs(collection(db, "expenses"));

  return querySnapshot
}