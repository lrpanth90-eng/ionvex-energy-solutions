import { auth, db } from "./app.js";

import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  doc, getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", async () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorBox = document.getElementById("error");

  if (!email || !password) {
    errorBox.innerText = "Email and password required";
    return;
  }

  try {
    // 🔐 Firebase Auth
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const uid = cred.user.uid;

    // 🔍 Fetch role
    const userRef = doc(db, "users", uid);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
      errorBox.innerText = "User record not found";
      return;
    }

    const user = snap.data();

    if (user.status !== "ACTIVE") {
      errorBox.innerText = "Account inactive";
      return;
    }

    // 🚀 Role based redirect
    if (user.role === "admin") {
      window.location.href = "/admin/dashboard.html";
    } 
    else if (user.role === "dealer") {
      window.location.href = "/dealer/dashboard.html";
    } 
    else {
      errorBox.innerText = "Unauthorized role";
    }

  } catch (err) {
    errorBox.innerText = "Invalid login credentials";
    console.error(err);
  }
});
