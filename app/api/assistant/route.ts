import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const key = process.env.OPENAI_API_KEY;
    if (!key) return NextResponse.json({ ok: false, error: "OPENAI_API_KEY לא הוגדר ב-Vercel" }, { status: 503 });
    const { message, context } = await req.json();
    if (typeof message !== "string" || !message.trim()) return NextResponse.json({ ok: false, error: "לא התקבלה הודעה" }, { status: 400 });
    const system = [
      "אתה עוזר מומחה לניהול מערכות IVR של ימות המשיח.",
      "ענה בעברית ברורה, תמציתית ומדויקת.",
      "עזור לתכנן שלוחות, להסביר פרמטרים, לבנות טיוטות ext.ini ולנתח מבני תפריטים.",
      "לעולם אל תטען שביצעת שינוי במערכת. אתה מייצר הסבר או טיוטה בלבד.",
      "הדגש שפעולות מחיקה, העברה ושינוי הגדרות חייבות אישור מפורש של המשתמש.",
      "אל תמציא פרמטרים של API. אם חסר מידע, אמור מה חסר.",
      "הקשר נוכחי: " + JSON.stringify(context || {})
    ].join("\n");
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: "Bearer " + key },
      body: JSON.stringify({ model: "gpt-4.1-mini", instructions: system, input: message, max_output_tokens: 900 }),
      cache: "no-store"
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || "שירות העוזר לא זמין");
    const answer = (data.output || []).flatMap((item: any) => item.content || []).filter((part: any) => part.type === "output_text").map((part: any) => part.text).join("\n");
    return NextResponse.json({ ok: true, answer: answer || "לא התקבלה תשובה מהעוזר" });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : "שגיאה לא צפויה" }, { status: 500 });
  }
}
