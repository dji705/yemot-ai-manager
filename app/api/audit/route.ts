import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const webhook = process.env.GOOGLE_APPS_SCRIPT_WEBHOOK_URL;
    const secret = process.env.GOOGLE_APPS_SCRIPT_SECRET;
    if (!webhook || !secret) return NextResponse.json({ ok: true, skipped: true });
    const { action, detail } = await req.json();
    if (typeof action !== "string" || action.length > 120 || typeof detail !== "string" || detail.length > 500) {
      return NextResponse.json({ ok: false, error: "נתוני יומן לא תקינים" }, { status: 400 });
    }
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, action, detail, createdAt: new Date().toISOString() }),
      cache: "no-store"
    });
    if (!response.ok) throw new Error("Google Apps Script החזיר שגיאה");
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : "שגיאה" }, { status: 500 });
  }
}
