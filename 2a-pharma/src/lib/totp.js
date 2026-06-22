import { TOTP } from "totp-generator";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase.js";

function generateRandomSecret() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  let secret = "";
  for (let i = 0; i < 32; i++) {
    secret += chars[Math.floor(Math.random() * chars.length)];
  }
  return secret;
}

export async function generateSecret(uid) {
  const secret = generateRandomSecret();
  await setDoc(doc(db, "admin_2fa", uid), { secret, enabled: false });
  return secret;
}

export async function getSecret(uid) {
  const snap = await getDoc(doc(db, "admin_2fa", uid));
  if (!snap.exists()) return null;
  return snap.data();
}

export async function enableTotp(uid) {
  await setDoc(doc(db, "admin_2fa", uid), { enabled: true }, { merge: true });
}

export function verifyToken(secret, token) {
  try {
    const expected = TOTP.generate(secret).otp;
    const prev = TOTP.generate(secret, { timestamp: Date.now() - 30000 }).otp;
    return token === expected || token === prev;
  } catch {
    return false;
  }
}

export function getOtpAuthUrl(secret, email) {
  return `otpauth://totp/2A%20Pharma%20Admin:${encodeURIComponent(email)}?secret=${secret}&issuer=2A%20Pharma%20Admin&algorithm=SHA1&digits=6&period=30`;
}