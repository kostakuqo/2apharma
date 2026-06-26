import { NextResponse } from "next/server";

export async function GET(request) {
  const cookie = request.cookies.get("admin_session");

  if (!cookie || cookie.value !== "true") {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({ authenticated: true });
}