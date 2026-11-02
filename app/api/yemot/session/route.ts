import { NextResponse } from "next/server";
import { yemotRequest, getToken } from "@/lib/yemot";
export async function GET() {
  try { const token = await getToken(); if (!token) return NextResponse.json({ ok: true, connected: false });
    const session = await yemotRequest("GetSession", {}, token);
    return NextResponse.json({ ok: true, connected: true, session });
  } catch { return NextResponse.json({ ok: true, connected: false }); }
}
