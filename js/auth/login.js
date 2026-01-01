import { auth, db } from "../firebase/app.js";
import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const loginBtn = document.getElementById("loginBtn");
const errorBox = document.getElementById("error");

loginBtn.addEventListener("click", async () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    errorBox.innerText = "Email aur password required";
    return;
  }

  try {
    // 🔐 Firebase Login
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const uid = cred.user.uid;

    // 👤 Get Role
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      errorBox.innerText = "User role not assigned";
      return;
    }

    const role = userSnap.data().role;

    // 🚀 Role based redirect
    if (role === "dealer") {
      window.location.href = "/dealer/dashboard.html";
    } 
    else if (role === "admin") {
      window.location.href = "/admin/dashboard.html";
    } 
    else {
      errorBox.innerText = "Invalid role";
    }

  } catch (err) {
    errorBox.innerText = err.message;
  }
});
