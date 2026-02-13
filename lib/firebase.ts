import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDol7ntgBgBHYhqZkxCTuRJGQ5eZn32JnI",
  authDomain: "lumina-portfolio-yivvo.firebaseapp.com",
  projectId: "lumina-portfolio-yivvo",
  storageBucket: "lumina-portfolio-yivvo.firebasestorage.app",
  messagingSenderId: "428284645579",
  appId: "1:428284645579:web:b44a6d758fce7bb2688b4e"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Collection path: wedding/Salomo dan maysi/wishes
export const WEDDING_DOC = "Salomo dan maysi";
export const WISHES_COLLECTION = `wedding/${WEDDING_DOC}/wishes`;
