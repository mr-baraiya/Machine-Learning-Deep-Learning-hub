# Google Sheets Backend Setup

To save typing test data to a Google Sheet, follow these steps:

1.  Create a **new Google Sheet**.
2.  In the menu, go to **Extensions > Apps Script**.
3.  **Delete** any code in the `Code.gs` file and **paste** the following code:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  
  // Add header if sheet is empty (New Schema)
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Timestamp", "Name", "WPM", "Accuracy (%)", "XP Earned", "Rank", 
      "Pause Count", "Focus Level", "Stress Level", "Duration (s)", "Screen Time", "Sleep", "Fatigue"
    ]);
  }
  
  // Append data
  sheet.appendRow([
    new Date(),
    data.username,
    data.wpm,
    data.accuracy,
    data.xp,
    data.rank,
    data.pauseCount,
    data.focusLevel,
    data.stress,
    data.duration,
    data.screenTime,
    data.sleep,
    data.fatigue
  ]);
  
  return ContentService.createTextOutput(JSON.stringify({"result":"success"})).setMimeType(ContentService.MimeType.JSON);
}
```

4.  Click the **Deploy** button (blue button, top right) > **New deployment**.
5.  Click the **Select type** gear icon > **Web app**.
6.  Fill in the details:
    *   **Description**: Typing Test Backend
    *   **Execute as**: Me (your email)
    *   **Who has access**: **Anyone** (Important!)
7.  Click **Deploy**.
8.  **Copy the Web App URL** (it starts with `https://script.google.com/macros/s/...`).
9.  Open `script.js` in this project and paste the URL into the `GOOGLE_SCRIPT_URL` variable.