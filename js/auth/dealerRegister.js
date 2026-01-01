import { db } from "../firebase/app.js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

document.getElementById("applyBtn").onclick = async () => {
  const name = name.value;
  const email = email.value;
  const phone = phone.value;
  const state = state.value;

  await addDoc(collection(db, "dealerRequests"), {
    name,
    email,
    phone,
    state,
    status: "PENDING",
    createdAt: serverTimestamp()
  });

  document.getElementById("msg").innerText =
    "Request submitted. Admin approval required.";
};
