import { NextRequest, NextResponse } from "next/server";
import { yemotRequest, apiError } from "@/lib/yemot";
export async function GET(req: NextRequest) {
  try { const what = req.nextUrl.searchParams.get("what"); if (!what) throw new Error("חסר נתיב קובץ");
    const data = await yemotRequest("GetTextFile", { what }); return NextResponse.json({ ok: true, data });
  } catch (e) { return apiError(e); }
}
export async function PUT(req: NextRequest) {
  try { const { what, contents } = await req.json(); if (!what || typeof contents !== "string") throw new Error("נתיב או תוכן קובץ חסרים");
    const data = await yemotRequest("UploadTextFile", { what, contents }); return NextResponse.json({ ok: true, data });
  } catch (e) { return apiError(e); }
}
