import { db } from "../firebase/app.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const btn = document.getElementById("checkBtn");
const input = document.getElementById("serialInput");
const result = document.getElementById("warrantyResult");

btn.addEventListener("click", async () => {
  const serial = input.value.trim();

  if (!serial) {
    result.innerHTML = "❌ Serial number enter karo";
    return;
  }

  result.innerHTML = "🔄 Checking...";

  try {
    const ref = doc(db, "batteries", serial);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      result.innerHTML = "❌ Battery not found";
      return;
    }

    const data = snap.data();
    result.innerHTML = `
      ✅ <b>Status:</b> ${data.status}<br>
      🔋 <b>Vehicle:</b> ${data.vehicleType}<br>
      📅 <b>Warranty Till:</b> ${data.warrantyExpiry}
    `;
  } catch (err) {
    result.innerHTML = "❌ Error checking warranty";
    console.error(err);
  }
});
