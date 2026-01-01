// ionvex-energy-solutions/js/firebase/auth.js

import { auth, db } from "./app.js";
import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* =====================================================
   🔐 AUTH & ROLE GUARD
===================================================== */

export function protectPage(requiredRole) {
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      window.location.href = "/login.html";
      return;
    }

    try {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await signOut(auth);
        window.location.href = "/login.html";
        return;
      }

      const userData = userSnap.data();

      if (userData.role !== requiredRole) {
        alert("❌ Unauthorized Access");
        await signOut(auth);
        window.location.href = "/login.html";
        return;
      }

      console.log("✅ Access granted:", userData.role);

    } catch (error) {
      console.error(error);
      window.location.href = "/login.html";
    }
  });
}

/* =====================================================
   🔓 LOGOUT
===================================================== */
export async function logout() {
  await signOut(auth);
  window.location.href = "/login.html";
}
