import { db, auth } from "../firebase/app.js";
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const serialInput = document.getElementById("serialNo");
const customerNameInput = document.getElementById("customerName");
const customerPhoneInput = document.getElementById("customerPhone");
const vehicleTypeInput = document.getElementById("vehicleType");
const activateBtn = document.getElementById("activateBtn");
const msg = document.getElementById("msg");

let currentDealer = null;

/* 🔐 Check dealer login */
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "/login.html";
  } else {
    currentDealer = user;
  }
});

/* 🚀 Activate Warranty */
activateBtn.addEventListener("click", async () => {
  msg.innerText = "";
  msg.style.color = "white";

  const serial = serialInput.value.trim();
  const customerName = customerNameInput.value.trim();
  const customerPhone = customerPhoneInput.value.trim();
  const vehicleType = vehicleTypeInput.value.trim();

  if (!serial || !customerName || !customerPhone || !vehicleType) {
    msg.innerText = "❌ All fields are required";
    msg.style.color = "red";
    return;
  }

  try {
    const batteryRef = doc(db, "batteries", serial);
    const batterySnap = await getDoc(batteryRef);

    if (batterySnap.exists()) {
      msg.innerText = "⚠️ Warranty already activated for this serial";
      msg.style.color = "orange";
      return;
    }

    const warrantyYears = 3;
    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + warrantyYears);

    await setDoc(batteryRef, {
      serialNumber: serial,
      customerName,
      customerPhone,
      vehicleType,
      activatedBy: currentDealer.uid,
      dealerEmail: currentDealer.email,
      activatedAt: serverTimestamp(),
      warrantyYears,
      warrantyExpiry: expiryDate,
      status: "ACTIVE"
    });

    msg.innerText = "✅ Warranty activated successfully";
    msg.style.color = "#22c55e";

    serialInput.value = "";
    customerNameInput.value = "";
    customerPhoneInput.value = "";
    vehicleTypeInput.value = "";

  } catch (err) {
    console.error(err);
    msg.innerText = "❌ Error activating warranty";
    msg.style.color = "red";
  }
});
