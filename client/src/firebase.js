// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "food-share-b8154.firebaseapp.com",
  projectId: "food-share-b8154",
  storageBucket: "food-share-b8154.appspot.com",
  messagingSenderId: "925051685884",
  appId: "1:925051685884:web:38f7c5c4d746894cb38079",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
