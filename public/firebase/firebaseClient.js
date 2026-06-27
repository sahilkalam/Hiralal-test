import { initializeApp, getApps, getApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDWkupqoh_LpZAGZsYYJalDYmnrkcL8L80",
  authDomain: "hiralal-app.firebaseapp.com",
  projectId: "hiralal-app",
  storageBucket: "hiralal-app.firebasestorage.app",
  messagingSenderId: "1086744796561",
  appId: "1:1086744796561:web:8b4d6653010a741b8c8e30",
  measurementId: "G-80JDVJXGEX"
};

// Next.js SSR error se bachne ke liye condition check
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export { app };