import { NextResponse } from "next/server";
import speakeasy from "speakeasy";
import { getAdminDb } from "../../../lib/firebaseAdmin.js";

export async function POST(request) {
  try {
    const adminDb = getAdminDb();

    const { uid, token } = await request.json();

    const snap = await adminDb.doc(`admin_2fa/${uid}`).get();

    if (!snap.exists) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const { secret } = snap.data();

    const verified = speakeasy.totp.verify({
      secret,
      encoding: "base32",
      token,
      window: 1, // accepta ±30 sec
    });

    console.log("got:", token, "verified:", verified);

    return NextResponse.json({ ok: verified });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}