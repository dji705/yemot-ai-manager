import { NextResponse } from "next/server";
export async function GET() {
 const configured = Boolean(process.env.YEMOT_USERNAME && (process.env.YEMOT_PASSWORD || process.env.YEMOT_API_TOKEN));
 return NextResponse.json({ configured, connected: false, message: configured ? "פרטי הגישה הוגדרו. נדרשת השלמת חיבור לפי תיעוד API הרשמי." : "טרם הוגדרו פרטי גישה לימות המשיח." });
}
