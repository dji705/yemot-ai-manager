import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Yemot Manager | ניהול מערכת ימות", description: "ניהול שלוחות ימות המשיח בעזרת ממשק חכם בעברית" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="he" dir="rtl"><body>{children}</body></html>; }
