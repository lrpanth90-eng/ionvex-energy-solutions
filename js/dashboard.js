import { auth, db } from "../firebase/app.js";
import { signOut, onAuthStateChanged } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  collection,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const totalCount = document.getElementById("totalCount");
const logoutBtn = document.getElementById("logoutBtn");

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "/login.html";
    return;
  }

  const q = query(
    collection(db, "batteries"),
    where("activatedBy", "==", user.uid)
  );

  const snap = await getDocs(q);
  totalCount.innerText = snap.size;
});

logoutBtn.onclick = async () => {
  await signOut(auth);
  window.location.href = "/login.html";
};
