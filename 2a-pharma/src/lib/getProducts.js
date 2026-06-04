// src/lib/getProducts.js
import { db } from "./firebase.js";
import { collection, getDocs } from "firebase/firestore";

export async function getProducts() {
  const snap = await getDocs(collection(db, "products"));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function getProductById(id) {
  const { doc, getDoc } = await import("firebase/firestore");
  const ref = doc(db, "products", id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

export async function getPartners() {
  const snap = await getDocs(collection(db, "partners"));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}