# Google Apps Script — יומן פעילות

התוסף אופציונלי בלבד. הוא מאפשר לשמור בגיליון Google Sheets רישום של פעולות שבוצעו בממשק.

## התקנה
1. צור Google Sheet חדש.
2. פתח Extensions → Apps Script והעתק אליו את תוכן הקובץ Code.gs.
3. בהגדרות הפרויקט (Script Properties) הגדר:
   - SPREADSHEET_ID — מזהה הגיליון.
   - YEMOT_STUDIO_WEBHOOK_SECRET — מחרוזת סודית ארוכה.
4. פרוס כ-Web app, בהרצה כמשתמש שלך, עם הרשאת גישה מתאימה לקבלת POST.
5. ב-Vercel הגדר GOOGLE_APPS_SCRIPT_WEBHOOK_URL ואת GOOGLE_APPS_SCRIPT_SECRET (אותו סוד שהגדרת ב-Script Properties).

הסקריפט אינו מקבל סיסמאות ימות או טוקנים. הוא מקבל רק שם פעולה, פרטים ותאריך.
