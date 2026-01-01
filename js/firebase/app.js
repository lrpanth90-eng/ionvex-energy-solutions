// Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔥 IONVEX ENERGY – Firebase Config (YOUR DATA)
const firebaseConfig = {
  apiKey: "AIzaSyDvV77_17S233OHTDxxOHaEIeruo_IP-u8",
  authDomain: "ionvex-energy.firebaseapp.com",
  projectId: "ionvex-energy",
  storageBucket: "ionvex-energy.firebasestorage.app",
  messagingSenderId: "48652442204",
  appId: "1:48652442204:web:f23a353804282630c1e499",
  measurementId: "G-8R40WC76D4"
};

// Init Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);

console.log("✅ Ionvex Firebase connected successfully");
