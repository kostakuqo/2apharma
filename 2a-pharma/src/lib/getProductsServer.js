import "server-only";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

function getAdminDb() {
  console.log("PROJECT_ID:", process.env.FIREBASE_PROJECT_ID);
  console.log("CLIENT_EMAIL:", process.env.FIREBASE_CLIENT_EMAIL);

  const app = getApps().length
    ? getApps()[0]
    : initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        }),
      });
  return getFirestore(app);
}

// Aceeași regulă ca în getProducts.js (client): published === false ascunde
// produsul; lipsa câmpului (produse vechi) sau published === true îl arată.
function isPublished(product) {
  return product.published !== false;
}

export async function getProductsServer() {
  const db = getAdminDb();
  const snap = await db.collection("products").get();
  return snap.docs
    .map(d => ({ id: d.id, ...d.data() }))
    .filter(isPublished);
}

export async function getProductByIdServer(id) {
  const db = getAdminDb();
  const snap = await db.collection("products").doc(id).get();
  if (!snap.exists) return null;
  const product = { id: snap.id, ...snap.data() };
  if (!isPublished(product)) return null;
  return product;
}

export async function getPartnersServer() {
  const db = getAdminDb();
  const snap = await db.collection("partners").get();
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}