import { NextRequest, NextResponse } from "next/server";
import { yemotRequest, apiError } from "@/lib/yemot";
export async function PUT(req: NextRequest) {
  try {
    const { path, settings } = await req.json();
    if (!path || !settings || typeof settings !== "object") throw new Error("נתיב או הגדרות חסרים");
    const data = await yemotRequest("UpdateExtension", { path: path.startsWith("ivr2:") ? path : "ivr2:" + path, ...settings });
    return NextResponse.json({ ok: true, data });
  } catch (e) { return apiError(e); }
}
