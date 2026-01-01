import { db } from "../firebase/app.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

document.getElementById("checkBtn").addEventListener("click", async () => {
  const serial = document.getElementById("serialInput").value.trim();
  const result = document.getElementById("result");

  if (!serial) {
    result.innerText = "Serial number enter karo";
    return;
  }

  try {
    const ref = doc(db, "batteries", serial);
    const snap = await getDoc(ref);

    if (snap.exists()) {
      const data = snap.data();
      result.innerText = `Warranty Active | Valid Till: ${data.warrantyEnd || "NA"}`;
    } else {
      result.innerText = "Invalid Serial Number";
    }
  } catch (e) {
    result.innerText = "Error: " + e.message;
  }
});
