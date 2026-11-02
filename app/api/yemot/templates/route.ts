import { NextResponse } from "next/server";
import { yemotRequest, apiError } from "@/lib/yemot";
export async function GET() {
  try { const data = await yemotRequest("GetTemplates"); return NextResponse.json({ ok: true, data }); }
  catch (e) { return apiError(e); }
}
