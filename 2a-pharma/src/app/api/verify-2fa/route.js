import { NextResponse } from "next/server";
import speakeasy from "speakeasy";
import { getAdminDb, getAdminAuth } from "../../../lib/firebaseAdmin.js";

export async function POST(request) {
  try {
    const adminDb = getAdminDb();
    const adminAuth = await getAdminAuth(); // ✅ async acum

    const { idToken, token } = await request.json();

    // ✅ NU mai acceptăm UID din browser
    // Verificăm Firebase ID token pe server — nimeni nu poate falsifica asta
    if (!idToken || !token) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }

    let decodedToken;
    try {
      decodedToken = await adminAuth.verifyIdToken(idToken);
    } catch {
      return NextResponse.json({ ok: false, error: "Invalid token" }, { status: 401 });
    }

    const uid = decodedToken.uid;

    // Verificăm că UID-ul aparține adminului real
    const ADMIN_UID = process.env.ADMIN_UID;
    if (!ADMIN_UID) {
      console.error("ADMIN_UID nu e setat în environment variables!");
      return NextResponse.json({ ok: false }, { status: 500 });
    }

    if (uid !== ADMIN_UID) {
      console.warn("Tentativă de acces cu UID ne-autorizat:", uid);
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 403 });
    }

    // Luăm secretul 2FA din Firestore
    const snap = await adminDb.doc(`admin_2fa/${uid}`).get();
    if (!snap.exists) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const { secret } = snap.data();

    // Verificăm codul TOTP
    const verified = speakeasy.totp.verify({
      secret,
      encoding: "base32",
      token,
      window: 1,
    });

    if (!verified) {
      return NextResponse.json({ ok: false });
    }

    // ✅ Setăm cookie securizat după succes
    const response = NextResponse.json({ ok: true });
    response.cookies.set("admin_session", "true", {
      httpOnly: true,      // nu e accesibil din JavaScript
      secure: true,        // doar HTTPS
      sameSite: "strict",  // protecție CSRF
      maxAge: 60 * 60 * 8, // 8 ore
      path: "/",
    });

    return response;

  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}