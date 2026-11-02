import { NextRequest, NextResponse } from "next/server";
import { yemotRequest, apiError } from "@/lib/yemot";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    if (!username || !password) return NextResponse.json({ ok: false, error: "יש להזין מספר מערכת וסיסמה" }, { status: 400 });
    const login = await yemotRequest("Login", { username: String(username).trim(), password: String(password) }, "");
    if (!login.token) throw new Error("ההתחברות לא החזירה טוקן");
    const session = await yemotRequest("GetSession", {}, login.token);
    const response = NextResponse.json({ ok: true, session });
    response.cookies.set("yemot_session", login.token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: 60 * 30 });
    return response;
  } catch (e) { return apiError(e); }
}
