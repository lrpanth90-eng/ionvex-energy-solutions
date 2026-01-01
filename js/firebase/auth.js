import { auth, db } from "./app.js";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// LOGIN FUNCTION
window.login = async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const msg = document.getElementById("msg");

  try {
    msg.innerText = "Logging in...";
    await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    msg.innerText = "❌ Invalid login";
  }
};

// ROLE CHECK + REDIRECT
onAuthStateChanged(auth, async (user) => {
  if (!user) return;

  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    alert("Role not assigned. Contact admin.");
    return;
  }

  const role = snap.data().role;

  if (role === "ADMIN") {
    window.location.href = "/admin/dashboard.html";
  } 
  else if (role === "DEALER") {
    window.location.href = "/dealer/dashboard.html";
  } 
  else {
    alert("Unauthorized role");
  }
});
