import { db } from "../firebase/app.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const btn = document.getElementById("checkBtn");
const resultBox = document.getElementById("result");

btn.addEventListener("click", async () => {
  const serial = document.getElementById("serialInput").value.trim();

  if (!serial) {
    resultBox.innerHTML = "<span class='error'>Please enter serial number</span>";
    return;
  }

  resultBox.innerHTML = "Checking...";

  try {
    const ref = doc(db, "warranties", serial);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      resultBox.innerHTML = "<span class='error'>Invalid Serial Number</span>";
      return;
    }

    const data = snap.data();
    const expiry = data.expiryDate.toDate();
    const today = new Date();

    if (today <= expiry) {
      resultBox.innerHTML = `
        <span class="success">
          ✅ Warranty Active <br>
          Expires on: ${expiry.toDateString()}
        </span>
      `;
    } else {
      resultBox.innerHTML = `
        <span class="error">
          ❌ Warranty Expired <br>
          Expired on: ${expiry.toDateString()}
        </span>
      `;
    }

  } catch (err) {
    console.error(err);
    resultBox.innerHTML = "<span class='error'>System Error</span>";
  }
});
