/**
 * Yemot Studio — optional Google Sheets activity log receiver.
 * Setup:
 * 1. Create a Google Sheet and copy its spreadsheet ID.
 * 2. In Apps Script Project Settings > Script Properties set:
 *    SPREADSHEET_ID = your spreadsheet ID
 *    YEMOT_STUDIO_WEBHOOK_SECRET = a long random secret
 * 3. Deploy as a Web App, execute as you, allow access to anyone.
 * 4. Put the deployment URL in Vercel as GOOGLE_APPS_SCRIPT_WEBHOOK_URL.
 * 5. Put the same secret in Vercel as GOOGLE_APPS_SCRIPT_SECRET.
 * This script only receives activity records. It never receives Yemot passwords or API tokens.
 */
function doPost(e) {
  try {
    var payload = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    var props = PropertiesService.getScriptProperties();
    var expected = props.getProperty("YEMOT_STUDIO_WEBHOOK_SECRET");
    if (!expected || payload.secret !== expected) return json_({ ok: false, error: "Unauthorized" });
    var spreadsheetId = props.getProperty("SPREADSHEET_ID");
    if (!spreadsheetId) throw new Error("Missing SPREADSHEET_ID script property");
    var spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    var sheet = spreadsheet.getSheetByName("Activity") || spreadsheet.insertSheet("Activity");
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["תאריך", "פעולה", "פרטים"]);
      sheet.setFrozenRows(1);
    }
    sheet.appendRow([payload.createdAt || new Date().toISOString(), String(payload.action || "").slice(0, 120), String(payload.detail || "").slice(0, 500)]);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err && err.message || err) });
  }
}
function json_(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}
