# Yemot API integration notes

Based on the uploaded developer documentation "API - גישת מפתחים למערכות".

## API base
- Public: https://www.call2all.co.il/ym/api/
- Private: https://private.call2all.co.il/ym/api/
- Set the selected base server-side with YEMOT_API_BASE.

## Authentication
- Login accepts username (system number) and password.
- The response contains a temporary token; documentation notes it expires after 30 minutes of inactivity.
- Subsequent requests can pass the token as an authorization header or as a token parameter.
- This project stores the token in an HttpOnly cookie and does not expose it to browser JavaScript.

## Implemented commands
- GetSession — account details and unit balance.
- GetIVR2Dir — directory contents. Required path: / for root, or a relative branch path such as 1 or ext/1.
- GetTextFile — reads a text file using what, e.g. ivr2:1/ext.ini.
- UploadTextFile — replaces the contents of a text file.
- UpdateExtension — updates extension settings using path and supplied configuration fields; can create a new extension.
- FileAction — copy, move, or delete using what and, for copy/move, target.
- GetIncomingCalls — current incoming calls.
- GetTemplates — campaign templates.

## Safety notes
- Destructive actions require confirmation in the UI.
- Do not put account passwords, API tokens, or OpenAI keys in frontend code.
- UploadFile is not enabled yet because its multipart upload contract should be implemented and tested separately.
