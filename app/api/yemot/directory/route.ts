import { NextRequest, NextResponse } from "next/server";
import { yemotRequest, apiError } from "@/lib/yemot";
export async function GET(req: NextRequest) {
  try {
    let path = req.nextUrl.searchParams.get("path") || "/";
    path = path.replace(/^ivr2:/, "");
    if (!path) path = "/";
    const data = await yemotRequest("GetIVR2Dir", { path, orderBy: "name", orderDir: "asc" });
    return NextResponse.json({ ok: true, data });
  } catch (e) { return apiError(e); }
}
