// src/firebase/config.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDqg-9e9WbVBh7EJLF6_OxhOYnk_cK0WqY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "unimatch-7c86c.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "unimatch-7c86c",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "unimatch-7c86c.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "323524053654",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:323524053654:web:e6212256afa297fb2e10b7",
  measurementId: "G-81G24V7QH1",
};

const isDemoForced = import.meta.env.VITE_DEMO_MODE === "true";

export const isFirebaseConfigured = Boolean(
  !isDemoForced && firebaseConfig.apiKey && firebaseConfig.projectId
);

let app = null;
let auth = null;
let db = null;
let analytics = null;
const googleProvider = new GoogleAuthProvider();

if (isFirebaseConfigured) {
  app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  isSupported().then((yes) => {
    if (yes) analytics = getAnalytics(app);
  });
}

export { auth, db, analytics, googleProvider };
export default app;