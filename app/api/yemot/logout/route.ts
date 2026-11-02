import { NextResponse } from "next/server";
import { yemotRequest, getToken } from "@/lib/yemot";
export async function POST() {
  const token = await getToken();
  try { if (token) await yemotRequest("Logout", {}, token); } catch {}
  const response = NextResponse.json({ ok: true });
  response.cookies.set("yemot_session", "", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: 0 });
  return response;
}
