# 📊 G-Connect Google Sheet Setup Guide (Multi-Sheet per School)

Your spreadsheet:
👉 **[Open Your G-Connect Google Sheet](https://docs.google.com/spreadsheets/d/1A9BQ-2YYTPlzY-fLzQieQmb9UaYABMKoyr_BeSt8aJI/edit?usp=sharing)**

---

### 🚀 Step-by-Step 2-Minute Setup

#### Step 1: Open Apps Script in Your Sheet
1. Open your Google Sheet: [https://docs.google.com/spreadsheets/d/1A9BQ-2YYTPlzY-fLzQieQmb9UaYABMKoyr_BeSt8aJI/edit](https://docs.google.com/spreadsheets/d/1A9BQ-2YYTPlzY-fLzQieQmb9UaYABMKoyr_BeSt8aJI/edit)
2. In the top menu, click **Extensions** > **Apps Script**.
3. A new tab will open with the code editor.

---

#### Step 2: Paste the Multi-Sheet Webhook Code
1. Select all default text in the editor and delete it.
2. Open [`google-sheets-integration/Code.gs`](file:///Users/yash/G-connect/google-sheets-integration/Code.gs) in this project.
3. Copy all the code and paste it into the Apps Script editor.
4. Click the **Save** (💾) icon or press `Ctrl + S` / `Cmd + S`.

---

#### Step 3: Deploy as Web App
1. Click the blue **Deploy** button (top-right) > **New deployment**.
2. Click the gear icon ⚙️ next to "Select type" and choose **Web app**.
3. Fill in:
   - **Description**: `G-Connect Multi-School API`
   - **Execute as**: `Me (your Google email)`
   - **Who has access**: `Anyone` *(⚠️ Crucial: select "Anyone" so the website can submit data)*
4. Click **Deploy**.
5. Click **Authorize access** > Select your Google Account > Click **Advanced** > **Go to Untitled project (unsafe)** > Click **Allow**.
6. Copy the **Web App URL** (starts with `https://script.google.com/macros/s/.../exec`).

---

#### Step 4: Link to G-Connect Website
1. Go to your local website: [http://localhost:8000/#register](http://localhost:8000/#register)
2. Click **⚙️ Sheet Settings / Webhook** in the navigation bar.
3. Paste your Web App URL and click **Save & Test Connection**.
4. You are ready!

---

### 🏢 How the Sheets are Automatically Organized:

1. **Master Overview Sheet**:
   - Contains a complete log of all schools registered, Principal names, contacts, Faculty coordinators, and total student counts.

2. **Dedicated Sheet per School (e.g. `DAV Public School`, `Delhi Public School`, etc.)**:
   - Every time a new school registers with students (Student 1, Student 2, Student 3...), a **dedicated new tab** is automatically created for that school.
   - All students are listed with their Roll Numbers, Contacts, Emails, and Check-in statuses.
