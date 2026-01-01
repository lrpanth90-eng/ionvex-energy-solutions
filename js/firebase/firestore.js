// ionvex-energy-solutions/js/firebase/firestore.js

import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  addDoc,
  serverTimestamp,
  query,
  where
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { db } from "./app.js";

/* =====================================================
   🔹 COMMON HELPERS
===================================================== */

// 🔹 Get single document
export async function getDocument(path, id) {
  const ref = doc(db, path, id);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
}

// 🔹 Create / overwrite document
export async function setDocument(path, id, data) {
  const ref = doc(db, path, id);
  await setDoc(ref, {
    ...data,
    createdAt: serverTimestamp()
  });
}

// 🔹 Update document
export async function updateDocument(path, id, data) {
  const ref = doc(db, path, id);
  await updateDoc(ref, {
    ...data,
    updatedAt: serverTimestamp()
  });
}

// 🔹 Add auto-ID document
export async function addDocument(path, data) {
  const ref = collection(db, path);
  return await addDoc(ref, {
    ...data,
    createdAt: serverTimestamp()
  });
}

// 🔹 Query documents
export async function queryDocuments(path, field, operator, value) {
  const ref = collection(db, path);
  const q = query(ref, where(field, operator, value));
  const snapshot = await getDocs(q);

  let results = [];
  snapshot.forEach(doc => {
    results.push({ id: doc.id, ...doc.data() });
  });

  return results;
}
