import { auth, db } from "../firebase/app.js";
import { signInWithEmailAndPassword } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { doc, getDoc } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const btn = document.getElementById("loginBtn");
const msg = document.getElementById("msg");

btn.onclick = async () => {
  try {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await signInWithEmailAndPassword(auth, email, password);

    const uid = res.user.uid;

    const userDoc = await getDoc(doc(db, "users", uid));

    if (!userDoc.exists()) {
      msg.innerText = "User role not found";
      return;
    }

    const role = userDoc.data().role;

    if (role === "ADMIN") {
      window.location.href = "/admin/dashboard.html";
    } 
    else if (role === "DEALER") {
      window.location.href = "/dealer/dashboard.html";
    } 
    else {
      msg.innerText = "Invalid role";
    }

  } catch (e) {
    msg.innerText = e.message;
  }
};
