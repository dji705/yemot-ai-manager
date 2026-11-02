import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const API_BASE = (process.env.YEMOT_API_BASE || "https://www.call2all.co.il/ym/api/").replace(/\/$/, "") + "/";

export async function getToken() {
  const jar = await cookies();
  return jar.get("yemot_session")?.value || "";
}

export async function yemotRequest(command: string, params: Record<string, unknown> = {}, token?: string) {
  const authToken = token || await getToken();
  if (!authToken && command !== "Login") throw new Error("לא מחוברים למערכת ימות המשיח");
  const body = command === "Login" ? params : { ...params, token: authToken };
  const response = await fetch(API_BASE + command, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(authToken ? { authorization: authToken } : {}) },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  const raw = await response.text();
  let data: any;
  try { data = JSON.parse(raw); } catch { throw new Error("התקבלה תשובה לא תקינה משרת ימות המשיח"); }
  if (!response.ok || (data.responseStatus && data.responseStatus !== "OK")) {
    throw new Error(data.message || data.exceptionMessage || "פעולת API נכשלה");
  }
  return data;
}

export function apiError(error: unknown) {
  const message = error instanceof Error ? error.message : "שגיאה לא צפויה";
  return NextResponse.json({ ok: false, error: message }, { status: 400 });
}
