// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsBUWNymJ5pjLtW7hrAWve_uL19mREtYM",
  authDomain: "clone-sk-eace6.firebaseapp.com",
  projectId: "clone-sk-eace6",
  storageBucket: "clone-sk-eace6.firebasestorage.app",
  messagingSenderId: "705297867762",
  appId: "1:705297867762:web:4e3ca0f1a4a8b0c295c16b",
  measurementId: "G-BXM2ZEE61K"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
// const analytics = getAnalytics(app);