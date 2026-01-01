import { auth, db } from "../firebase/app.js";
import {
  doc,
  getDoc,
  updateDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const btn = document.getElementById("activateBtn");
const statusBox = document.getElementById("status");

btn.addEventListener("click", async () => {
  const serial = document.getElementById("serial").value.trim();
  const customerName = document.getElementById("customerName").value.trim();
  const customerPhone = document.getElementById("customerPhone").value.trim();
  const vehicleType = document.getElementById("vehicleType").value;

  if (!serial || !customerName || !customerPhone || !vehicleType) {
    statusBox.innerText = "❌ All fields required";
    return;
  }

  const user = auth.currentUser;
  if (!user) {
    statusBox.innerText = "❌ Dealer not logged in";
    return;
  }

  try {
    statusBox.innerText = "Activating warranty...";

    const ref = doc(db, "batteries", serial);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      statusBox.innerText = "❌ Serial not found (Admin upload missing)";
      return;
    }

    const data = snap.data();

    if (data.status === "ACTIVE") {
      statusBox.innerText = "⚠️ Warranty already activated";
      return;
    }

    // Warranty expiry calculation (3 years)
    const now = new Date();
    const expiry = new Date(now);
    expiry.setFullYear(expiry.getFullYear() + 3);

    await updateDoc(ref, {
      customerName,
      customerPhone,
      vehicleType,
      activatedBy: user.uid,
      activatedAt: serverTimestamp(),
      warrantyExpiry: expiry,
      status: "ACTIVE"
    });

    statusBox.innerText = "✅ Warranty Activated Successfully";

  } catch (err) {
    console.error(err);
    statusBox.innerText = "❌ Error activating warranty";
  }
});
