// ionvex-energy-solutions/js/firebase/app.js

// 🔹 Firebase SDKs (v10 – stable)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

// 🔹 Ionvex Energy – Firebase Configuration (UPDATED)
const firebaseConfig = {
  apiKey: "AIzaSyDvV77_17S233OHTDxxOHaEIeruo_IP-u8",
  authDomain: "ionvex-energy.firebaseapp.com",
  projectId: "ionvex-energy",
  storageBucket: "ionvex-energy.firebasestorage.app",
  messagingSenderId: "48652442204",
  appId: "1:48652442204:web:f23a353804282630c1e499"
};

// 🔹 Initialize Firebase App (ONLY ONCE)
const app = initializeApp(firebaseConfig);

// 🔹 Firebase Services Exports
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// 🔹 Debug helper (optional – can remove later)
console.log("🔥 Firebase initialized for Ionvex Energy");
