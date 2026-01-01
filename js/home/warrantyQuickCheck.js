import { db } from "../firebase/app.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const btn = document.getElementById("checkBtn");

btn.addEventListener("click", async () => {
  const serial = document.getElementById("serialInput").value.trim();
  const resultBox = document.getElementById("warrantyResult");

  if (!serial) {
    resultBox.innerText = "Please enter serial number";
    return;
  }

  try {
    const ref = doc(db, "batteries", serial);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      resultBox.innerText = "❌ Battery not found";
      return;
    }

    const data = snap.data();
    resultBox.innerHTML = `
      ✅ <b>${data.model}</b><br>
      Warranty: ${data.warrantyStatus}<br>
      Expiry: ${data.warrantyExpiry}
    `;
  } catch (err) {
    resultBox.innerText = "Error checking warranty";
    console.error(err);
  }
});
