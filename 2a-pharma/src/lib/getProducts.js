// src/lib/getProducts.js
import { db } from "./firebase.js";
import { collection, getDocs } from "firebase/firestore";

// Un produs e considerat "publicat" dacă published === true SAU dacă
// nu are deloc câmpul (produsele vechi, create înainte de import Excel).
// Doar published === false îl ascunde explicit (draft, fără poză).
function isPublished(product) {
  return product.published !== false;
}

export async function getProducts() {
  const snap = await getDocs(collection(db, "products"));
  return snap.docs
    .map(d => ({ id: d.id, ...d.data() }))
    .filter(isPublished);
}

export async function getProductById(id) {
  const { doc, getDoc } = await import("firebase/firestore");
  const ref = doc(db, "products", id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  const product = { id: snap.id, ...snap.data() };
  if (!isPublished(product)) return null; // draft-urile nu au pagină publică proprie
  return product;
}

export async function getPartners() {
  const snap = await getDocs(collection(db, "partners"));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}