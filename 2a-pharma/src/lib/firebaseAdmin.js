import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

function initAdmin() {
  if (!getApps().length) {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n").trim(),
      }),
    });
  }
}

export function getAdminDb() {
  initAdmin();
  return getFirestore();
}

export async function getAdminAuth() {
  initAdmin();
  // Import dinamic pentru a evita conflictul ESM/CommonJS cu jose/jwks-rsa
  const { getAuth } = await import("firebase-admin/auth");
  return getAuth();
}