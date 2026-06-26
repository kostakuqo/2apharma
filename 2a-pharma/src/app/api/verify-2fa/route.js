import { NextResponse } from "next/server";
import speakeasy from "speakeasy";
import { getAdminDb } from "../../../lib/firebaseAdmin.js";

export async function POST(request) {
  try {
    const adminDb = getAdminDb();
    const { uid, token } = await request.json();

    // Verificăm că UID-ul trimis e exact adminul nostru
    const ADMIN_UID = process.env.ADMIN_UID;
    if (!ADMIN_UID) {
      console.error("ADMIN_UID nu e setat!");
      return NextResponse.json({ ok: false }, { status: 500 });
    }

    if (uid !== ADMIN_UID) {
      console.warn("UID ne-autorizat:", uid);
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

    // Setăm cookie securizat după succes
    const response = NextResponse.json({ ok: true });
    response.cookies.set("admin_session", "true", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 8, // 8 ore
      path: "/",
    });

    return response;

  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}