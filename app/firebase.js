// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: "pantry-fa310.firebaseapp.com",
  projectId: "pantry-fa310",
  storageBucket: "pantry-fa310.appspot.com",
  messagingSenderId: "880731753470",
  appId: "1:880731753470:web:8af964b67d8b379c3b4eaf",
  measurementId: "G-K4V12YXS8J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);