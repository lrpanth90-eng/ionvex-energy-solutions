import { auth, db } from "../firebase/app.js";
import { onAuthStateChanged } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  doc,
  getDoc,
  updateDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const activateBtn = document.getElementById("activateBtn");
const msg = document.getElementById("msg");

onAuthStateChanged(auth, (user) => {
  if (!user) window.location.href = "/login.html";
});

activateBtn.onclick = async () => {
  const serial = document.getElementById("serial").value.trim();
  const name = document.getElementById("customerName").value.trim();
  const phone = document.getElementById("customerPhone").value.trim();
  const vehicle = document.getElementById("vehicleType").value;

  if (!serial || !name || !phone || !vehicle) {
    msg.innerText = "All fields required";
    return;
  }

  try {
    const user = auth.currentUser;
    const ref = doc(db, "batteries", serial);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      msg.innerText = "Invalid serial number";
      return;
    }

    if (snap.data().status === "ACTIVE") {
      msg.innerText = "Warranty already activated";
      return;
    }

    const expiry = new Date();
    expiry.setFullYear(expiry.getFullYear() + 3);

    await updateDoc(ref, {
      customerName: name,
      customerPhone: phone,
      vehicleType: vehicle,
      activatedBy: user.uid,
      activatedAt: serverTimestamp(),
      warrantyExpiry: expiry,
      status: "ACTIVE"
    });

    msg.innerText = "✅ Warranty Activated Successfully";

  } catch (e) {
    msg.innerText = e.message;
  }
};
