import { NextRequest, NextResponse } from "next/server";
import { yemotRequest, apiError } from "@/lib/yemot";
export async function POST(req: NextRequest) {
  try {
    const { action, what, target } = await req.json();
    if (!["copy", "move", "delete"].includes(action) || !what) throw new Error("פעולת קובץ או נתיב אינם תקינים");
    if (action !== "delete" && !target) throw new Error("יש לציין נתיב יעד");
    const data = await yemotRequest("FileAction", { action, what, ...(target ? { target } : {}) });
    return NextResponse.json({ ok: true, data });
  } catch (e) { return apiError(e); }
}
