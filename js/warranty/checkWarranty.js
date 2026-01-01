import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.checkWarranty = async function () {

  const serial = document.getElementById("serialInput").value.trim();
  const resultDiv = document.getElementById("result");

  if (!serial) {
    resultDiv.innerHTML = "<p>Please enter serial number</p>";
    return;
  }

  try {
    const ref = doc(db, "batteries", serial);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      resultDiv.innerHTML = "<p style='color:red'>Invalid Serial Number</p>";
      return;
    }

    const data = snap.data();
    const today = new Date();
    const activation = data.activationDate.toDate();
    const warrantyYears = data.warrantyYears;

    const expiry = new Date(activation);
    expiry.setFullYear(expiry.getFullYear() + warrantyYears);

    const status = today <= expiry ? "ACTIVE" : "EXPIRED";

    resultDiv.innerHTML = `
      <h3>Battery Details</h3>
      <p><b>Model:</b> ${data.model}</p>
      <p><b>Vehicle:</b> ${data.vehicleType}</p>
      <p><b>Activated:</b> ${activation.toDateString()}</p>
      <p><b>Expiry:</b> ${expiry.toDateString()}</p>
      <p><b>Status:</b>
        <span style="color:${status==="ACTIVE"?"#22c55e":"red"}">
          ${status}
        </span>
      </p>
    `;

  } catch (err) {
    console.error(err);
    resultDiv.innerHTML = "<p>Error checking warranty</p>";
  }
}
