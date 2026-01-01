import { db } from "../firebase/app.js";
import {
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const uploadBtn = document.getElementById("uploadBtn");
const statusBox = document.getElementById("status");

uploadBtn.addEventListener("click", async () => {
  const fileInput = document.getElementById("excelFile");
  const file = fileInput.files[0];

  if (!file) {
    alert("Please select an Excel file");
    return;
  }

  statusBox.innerText = "Uploading...";

  try {
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet);

    let count = 0;

    for (const row of rows) {
      const serial = row.Serial?.toString().trim();
      if (!serial) continue;

      await setDoc(
        doc(db, "batteries", serial),
        {
          status: "INACTIVE",
          createdAt: serverTimestamp()
        },
        { merge: true }
      );

      count++;
    }

    statusBox.innerText = `✅ Upload complete. ${count} serials added.`;

  } catch (error) {
    console.error(error);
    statusBox.innerText = "❌ Error uploading Excel";
  }
});
