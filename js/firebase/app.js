import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDvV77_17S233OHTDxxOHaEIeruo_IP-u8",
  authDomain: "ionvex-energy.firebaseapp.com",
  projectId: "ionvex-energy",
  storageBucket: "ionvex-energy.firebasestorage.app",
  messagingSenderId: "48652442204",
  appId: "1:48652442204:web:f23a353804282630c1e499"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
