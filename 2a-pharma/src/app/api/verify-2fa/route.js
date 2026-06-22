import { NextResponse } from "next/server";
import speakeasy from "speakeasy";
import { getAdminDb } from "../../../lib/firebaseAdmin.js";

export async function POST(request) {
  try {
    const adminDb = getAdminDb();

    const { uid, token } = await request.json();

    console.log("UID:", uid);
    console.log("TOKEN:", token);

    const snap = await adminDb.doc(`admin_2fa/${uid}`).get();

    if (!snap.exists) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const { secret } = snap.data();

    console.log("SECRET:", secret);

    const verified = speakeasy.totp.verify({
      secret,
      encoding: "base32",
      token,
      window: 1,
    });

    console.log("verified:", verified);

    return NextResponse.json({ ok: verified });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}