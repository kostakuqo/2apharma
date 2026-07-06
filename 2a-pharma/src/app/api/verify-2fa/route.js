import { NextResponse } from "next/server";
import speakeasy from "speakeasy";
import { getAdminDb } from "../../../lib/firebaseAdmin.js";

export async function POST(request) {
  try {
    const adminDb = getAdminDb();
    const { uid, token } = await request.json();

  
    const ADMIN_UIDS = process.env.ADMIN_UIDS
      ? process.env.ADMIN_UIDS.split(",").map(u => u.trim())
      : [];

    if (ADMIN_UIDS.length === 0) {
      console.error("ADMIN_UIDS nu e setat în environment variables!");
      return NextResponse.json({ ok: false }, { status: 500 });
    }

    if (!ADMIN_UIDS.includes(uid)) {
      console.warn("UID ne-autorizat:", uid);
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 403 });
    }

    
    const snap = await adminDb.doc(`admin_2fa/${uid}`).get();
    if (!snap.exists) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const { secret } = snap.data();

    
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