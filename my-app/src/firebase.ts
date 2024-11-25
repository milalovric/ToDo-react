// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC95-9aVjn_VMDSvx6CF2UtzR714fouxgg",
  authDomain: "my-app-ad11f.firebaseapp.com",
  projectId: "my-app-ad11f",
  storageBucket: "my-app-ad11f.firebasestorage.app",
  messagingSenderId: "893142588744",
  appId: "1:893142588744:web:7ef4d1a44c258c326d277d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);