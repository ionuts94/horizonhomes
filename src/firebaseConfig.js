// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBu3ioXmMK6WR5Z5pS400a9cm8qhxmIqBY",
  authDomain: "horizonhomes-edaa3.firebaseapp.com",
  projectId: "horizonhomes-edaa3",
  storageBucket: "horizonhomes-edaa3.appspot.com",
  messagingSenderId: "931596721922",
  appId: "1:931596721922:web:b0604f01b6e428131c2c1b",
  measurementId: "G-1M3V8GKV77"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);