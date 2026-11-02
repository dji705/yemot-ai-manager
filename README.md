# Yemot Studio — מערכת ניהול מתקדמת לימות המשיח

ממשק RTL בעברית, מותאם לנייד ולמחשב, עם דפי ניהול נפרדים וחיבור שרת מאובטח ל-API של ימות המשיח.

## מה כלול
- מרכז בקרה ונתוני חשבון.
- עץ שלוחות וניווט בתיקיות.
- מנהל קבצים: הצגת תיקיות וקבצים, עריכת קובצי טקסט ומחיקה באישור.
- עורך ext.ini עם טעינה ושמירה.
- יצירת שלוחה ועדכון הגדרות באמצעות UpdateExtension.
- שיחות פעילות וקמפיינים.
- עוזר AI בעברית (לאחר הגדרת מפתח OpenAI).
- יומן פעילות אופציונלי ל-Google Sheets באמצעות Google Apps Script.
- טוקן ימות נשמר בעוגיית HttpOnly; הסיסמה ומפתח ה-API אינם נחשפים לקוד הדפדפן.

## פריסה ב-Vercel
1. ייבא את המאגר dji705/yemot-ai-manager ל-Vercel.
2. Framework Preset: Next.js.
3. Deploy.
4. הגדר ב-Project Settings → Environment Variables:
   - YEMOT_API_BASE = https://www.call2all.co.il/ym/api/
   - OPENAI_API_KEY = מפתח API להפעלת העוזר החכם (אופציונלי).
   - GOOGLE_APPS_SCRIPT_WEBHOOK_URL = כתובת Web App של Apps Script (אופציונלי).
   - GOOGLE_APPS_SCRIPT_SECRET = סוד משותף ארוך (אופציונלי).
5. בצע Redeploy לאחר הוספת משתני סביבה.

כתובת הכניסה הראשית תפתח את public/manager.html.

## חיבור לימות
במסך "הגדרות וחיבור" מזינים מספר מערכת וסיסמת ניהול. פרטי ההתחברות נשלחים לשרת בלבד. השרת מבצע Login, שומר את הטוקן בעוגיית HttpOnly ומבצע GetSession.

אפשר להחליף לשרת private באמצעות YEMOT_API_BASE:
https://private.call2all.co.il/ym/api/

## Google Apps Script
הקבצים נמצאים בתיקייה google-apps-script. ההתקנה אופציונלית ומתועדת בקובץ google-apps-script/README.md. התוסף מיועד ליומן פעילות בלבד ואינו מקבל סיסמאות או טוקנים של ימות.

## תיעוד API
סיכום הפקודות שמומשו נמצא ב-docs/YEMOT-API-NOTES.md. הוא מבוסס על מסמך התיעוד שהועלה לשיחה. פקודות העלאת קבצים בינאריים עדיין אינן מופעלות בממשק.
