// ionvex-energy-solutions/js/warranty/activateWarranty.js

import { db } from "../firebase/app.js";
import {
  doc,
  getDoc,
  updateDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* =====================================================
   🔹 DEALER WARRANTY ACTIVATION
===================================================== */

const activateBtn = document.getElementById("activateBtn");

if (activateBtn) {
  activateBtn.addEventListener("click", activateWarranty);
}

async function activateWarranty() {
  const serialInput = document.getElementById("serialInput");
  const customerNameInput = document.getElementById("customerName");
  const mobileInput = document.getElementById("customerMobile");
  const resultBox = document.getElementById("resultBox");

  const serialNo = serialInput.value.trim();
  const customerName = customerNameInput.value.trim();
  const customerMobile = mobileInput.value.trim();

  resultBox.style.display = "block";
  resultBox.innerText = "⏳ Processing...";

  if (!serialNo || !customerName || !customerMobile) {
    resultBox.innerText = "❌ All fields are required";
    return;
  }

  try {
    // 🔹 Battery serial document
    const batteryRef = doc(db, "batteries", serialNo);
    const batterySnap = await getDoc(batteryRef);

    if (!batterySnap.exists()) {
      resultBox.innerText = "❌ Invalid Serial Number";
      return;
    }

    const batteryData = batterySnap.data();

    // 🔹 Already activated check
    if (batteryData.warrantyActivated === true) {
      resultBox.innerText = "⚠️ Warranty already activated";
      return;
    }

    // 🔹 Warranty duration (default 36 months)
    const warrantyMonths = batteryData.warrantyMonths || 36;
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + warrantyMonths);

    // 🔹 Update battery document
    await updateDoc(batteryRef, {
      warrantyActivated: true,
      warrantyStart: startDate,
      warrantyEnd: endDate,
      customerName,
      customerMobile,
      activated
