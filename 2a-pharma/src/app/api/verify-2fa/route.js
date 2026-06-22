import { NextResponse } from "next/server";
import { TOTP } from "totp-generator";
import { getAdminDb } from "../../../lib/firebaseAdmin.js";

export async function POST(request) {
  try {
    const adminDb = getAdminDb(); // 🔥 IMPORTANT

    const { uid, token } = await request.json();

    const snap = await adminDb.doc(`admin_2fa/${uid}`).get();
    if (!snap.exists) {
      return NextResponse.json({ ok: false, error: "2FA nuk u gjet" }, { status: 400 });
    }

    const { secret } = snap.data();

    const expected = (await TOTP.generate(secret)).otp;
    const prev = (await TOTP.generate(secret, { timestamp: Date.now() - 30000 })).otp;
    const next = (await TOTP.generate(secret, { timestamp: Date.now() + 30000 })).otp;

    console.log("expected:", expected, "got:", token);

    const ok = token === expected || token === prev || token === next;

    return NextResponse.json({ ok });
  } catch (err) {
    console.error("EROARE:", err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}