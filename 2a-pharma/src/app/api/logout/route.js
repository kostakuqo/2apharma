import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  
  // Ștergem cookie-ul de sesiune
  response.cookies.set("admin_session", "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 0, // expiră imediat
    path: "/",
  });

  return response;
}