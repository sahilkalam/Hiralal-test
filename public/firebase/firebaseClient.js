import { initializeApp, getApps, getApp } from "firebase/app";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDWkupqoh_LpZAGZsYYJalDYmnrkcL8L80",
  authDomain: "hiralal-app.firebaseapp.com",
  projectId: "hiralal-app",
  storageBucket: "hiralal-app.appspot.com",
  messagingSenderId: "1086744796561",
  appId: "1:1086744796561:web:8b4d6653010a741b8c8e30",
  measurementId: "G-80JDVJXGEX"
};

// Safe init (Next.js SSR safe)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export default app;