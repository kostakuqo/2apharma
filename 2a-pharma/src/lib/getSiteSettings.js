import { db } from "./firebase.js";
import { doc, getDoc } from "firebase/firestore";

const DEFAULT_SETTINGS = {
  logoType: "text",     // "text" | "image"
  logoMark: "2A",
  logoText: "Pharma",
  logoImageUrl: "",
};

export async function getSiteSettings() {
  try {
    const snap = await getDoc(doc(db, "settings", "site"));
    if (snap.exists()) {
      return { ...DEFAULT_SETTINGS, ...snap.data() };
    }
    return DEFAULT_SETTINGS;
  } catch (err) {
    console.error("getSiteSettings error:", err);
    return DEFAULT_SETTINGS;
  }
}