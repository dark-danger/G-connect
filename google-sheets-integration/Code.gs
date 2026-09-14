/**
 * =========================================================================
 * GEETA UNIVERSITY & GEETA TECHNICAL HUB
 * G-CONNECT 2026 - SCHOOL DELEGATION GOOGLE APPS SCRIPT WEBHOOK
 * =========================================================================
 * Target Spreadsheet ID: 1A9BQ-2YYTPlzY-fLzQieQmb9UaYABMKoyr_BeSt8aJI
 * Target Spreadsheet URL: https://docs.google.com/spreadsheets/d/1A9BQ-2YYTPlzY-fLzQieQmb9UaYABMKoyr_BeSt8aJI/edit
 * 
 * AUTOMATIC MULTI-SHEET CREATION:
 * 1. Automatically maintains a "Master Overview" sheet summarizing all schools.
 * 2. For every registered school, automatically generates a dedicated Sheet Tab
 *    (e.g., "DAV Public School", "Delhi Public School", etc.).
 * 3. Populates all teachers and students of that school into its dedicated sheet.
 * =========================================================================
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(30000);

  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    
    var rawData = e.postData ? e.postData.contents : "";
    var data = {};

    if (rawData && rawData.startsWith("{")) {
      data = JSON.parse(rawData);
    } else if (e.parameter) {
      data = e.parameter;
    }

    // Ping check
    if (data.testPing) {
      return ContentService.createTextOutput(JSON.stringify({ 
        status: "success", 
        message: "G-Connect Google Sheet Connected Successfully! Multi-sheet per school active." 
      })).setMimeType(ContentService.MimeType.JSON);
    }

    var timestamp = new Date();
    var delegationId = data.delegationId || ("GC-SCH-" + Math.floor(1000 + Math.random() * 9000));
    var schoolName = (data.schoolName || "Unnamed School").trim();
    var principalName = data.principalName || "N/A";
    var schoolContact = data.schoolPhone || data.schoolContact || "N/A";
    var eventDay = data.day || data.eventDay || 1;
    var slotTime = data.slotTime || "Slot 1 (9:30 – 10:00 AM)";
    
    // Teachers / Faculty Coordinators Array
    var teachers = Array.isArray(data.teachers) ? data.teachers : [];
    if (teachers.length === 0 && (data.facultyName || data.facultyCoordinator)) {
      teachers.push({
        name: data.facultyName || data.facultyCoordinator || "Faculty Coordinator",
        phone: data.facultyPhone || "N/A",
        email: data.facultyEmail || data.email || "N/A",
        designation: data.facultyDesignation || "Coordinator"
      });
    }

    var primaryFacultyName = teachers.length > 0 ? teachers.map(function(t){ return t.name; }).join(", ") : (data.facultyName || "N/A");
    var primaryFacultyPhone = teachers.length > 0 ? teachers.map(function(t){ return t.phone; }).join(", ") : (data.facultyPhone || "N/A");

    // Students Array
    var students = Array.isArray(data.students) ? data.students : [];
    if (students.length === 0 && (data.fullName || data.studentName)) {
      students.push({
        regId: data.regId || ("GC-2026-" + Math.floor(1000 + Math.random() * 9000)),
        name: data.fullName || data.studentName || "Student",
        studentClass: data.studentClass || data.program || data.semester || "12th Standard",
        rollNo: data.studentId || data.rollNo || "N/A",
        contact: data.phone || data.contact || "N/A",
        email: data.email || "N/A",
        techInterests: data.techInterests || []
      });
    }

    var totalStudents = students.length;
    var totalTeachers = teachers.length;

    // -------------------------------------------------------------------------
    // 1. UPDATE "Master Overview" TAB
    // -------------------------------------------------------------------------
    var masterSheet = ss.getSheetByName("Master Overview");
    if (!masterSheet) {
      var defaultSheet = ss.getSheetByName("Sheet1");
      if (defaultSheet && ss.getSheets().length === 1 && defaultSheet.getLastRow() === 0) {
        masterSheet = defaultSheet;
        masterSheet.setName("Master Overview");
      } else {
        masterSheet = ss.insertSheet("Master Overview", 0);
      }
    }

    if (masterSheet.getLastRow() === 0) {
      var masterHeaders = [
        "Timestamp",
        "Delegation ID",
        "School Name",
        "Principal Name",
        "School Contact No",
        "Faculty Coordinators / Teachers",
        "Teachers Contact Numbers",
        "Allocated Event Day",
        "Assigned Slot Timing",
        "Total Teachers",
        "Total Students",
        "Dedicated Sheet Tab",
        "Status"
      ];
      var mRange = masterSheet.getRange(1, 1, 1, masterHeaders.length);
      mRange.setValues([masterHeaders]);
      mRange.setBackground("#09090b");
      mRange.setFontColor("#38bdf8");
      mRange.setFontWeight("bold");
      mRange.setFontFamily("Outfit");
      masterSheet.setFrozenRows(1);
    }

    // Clean sheet tab name for this school (Max 50 chars, no illegal chars : \ / ? * [ ])
    var tabName = cleanSheetName(schoolName);
    
    // Add Master Summary row
    masterSheet.appendRow([
      timestamp,
      delegationId,
      schoolName,
      principalName,
      "'" + schoolContact,
      primaryFacultyName,
      "'" + primaryFacultyPhone,
      "Day " + eventDay,
      slotTime,
      totalTeachers,
      totalStudents,
      tabName,
      "CONFIRMED"
    ]);

    // -------------------------------------------------------------------------
    // 2. CREATE / POPULATE DEDICATED SHEET TAB FOR THIS SCHOOL
    // -------------------------------------------------------------------------
    var schoolSheet = ss.getSheetByName(tabName);
    var isNewTab = false;

    if (!schoolSheet) {
      schoolSheet = ss.insertSheet(tabName);
      isNewTab = true;
    }

    if (isNewTab || schoolSheet.getLastRow() === 0) {
      // Row 1: Header Banner
      schoolSheet.getRange("A1:I1").merge()
        .setValue("🏛️ " + schoolName.toUpperCase() + " — G-CONNECT 2026 DELEGATION")
        .setBackground("#0f172a")
        .setFontColor("#38bdf8")
        .setFontWeight("bold")
        .setFontSize(13)
        .setHorizontalAlignment("center");

      // Row 2: Leadership info
      schoolSheet.getRange("A2:D2").merge().setValue("Principal: " + principalName + " | School Office: " + schoolContact);
      schoolSheet.getRange("E2:G2").merge().setValue("Teachers: " + primaryFacultyName);
      schoolSheet.getRange("H2").setValue("Day " + eventDay + " • " + slotTime);
      schoolSheet.getRange("I2").setValue("ID: " + delegationId);
      
      var metaRange = schoolSheet.getRange("A2:I2");
      metaRange.setBackground("#1e293b")
        .setFontColor("#e2e8f0")
        .setFontWeight("bold")
        .setFontSize(9)
        .setHorizontalAlignment("center");

      // Row 3: Blank separator
      // Row 4: Student Table Column Headers
      var studentHeaders = [
        "S.No",
        "Student Reg ID",
        "Student Full Name",
        "Class / Grade",
        "Roll No / Student ID",
        "Mobile / WhatsApp",
        "Email Address",
        "Tech Interests",
        "Campus Check-In Status"
      ];

      var sRange = schoolSheet.getRange(4, 1, 1, studentHeaders.length);
      sRange.setValues([studentHeaders]);
      sRange.setBackground("#047857");
      sRange.setFontColor("#ffffff");
      sRange.setFontWeight("bold");
      sRange.setFontSize(10);
      sRange.setHorizontalAlignment("center");
      schoolSheet.setFrozenRows(4);
    }

    // Append Students
    var currentLastRow = schoolSheet.getLastRow();
    var existingStudentCount = Math.max(0, currentLastRow - 4);

    var studentRows = [];
    for (var i = 0; i < students.length; i++) {
      var s = students[i];
      var sNo = existingStudentCount + i + 1;
      var sRegId = s.regId || ("GC-2026-" + Math.floor(1000 + Math.random() * 9000));
      var sName = s.name || s.fullName || "Student " + sNo;
      var sClass = s.studentClass || s.class || "12th Standard";
      var sRoll = s.rollNo || s.studentId || "N/A";
      var sContact = s.contact || s.phone || "N/A";
      var sEmail = s.email || "N/A";
      var sInterests = Array.isArray(s.techInterests) ? s.techInterests.join(" | ") : (s.techInterests || "FSD | AI");
      var sCheckin = s.checkedIn ? "YES" : "PENDING";

      studentRows.push([
        sNo,
        sRegId,
        sName,
        sClass,
        sRoll,
        "'" + sContact,
        sEmail,
        sInterests,
        sCheckin
      ]);
    }

    if (studentRows.length > 0) {
      var appendRange = schoolSheet.getRange(currentLastRow + 1, 1, studentRows.length, studentRows[0].length);
      appendRange.setValues(studentRows);
      appendRange.setFontSize(9);
      appendRange.setVerticalAlignment("middle");
      
      // Alternating row background
      for (var r = 0; r < studentRows.length; r++) {
        var rowIdx = currentLastRow + 1 + r;
        var rowBg = (rowIdx % 2 === 0) ? "#f8fafc" : "#ffffff";
        schoolSheet.getRange(rowIdx, 1, 1, studentRows[0].length).setBackground(rowBg);
      }
    }

    // Auto resize columns
    try {
      schoolSheet.autoResizeColumns(1, 9);
      masterSheet.autoResizeColumns(1, 13);
    } catch(err) {}

    return ContentService.createTextOutput(JSON.stringify({ 
      status: "success", 
      delegationId: delegationId,
      schoolName: schoolName,
      sheetTab: tabName,
      totalTeachers: totalTeachers,
      totalStudents: totalStudents
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 
      status: "error", 
      message: error.toString() 
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService.createTextOutput("G-Connect 2026 Multi-Sheet School Delegation API is LIVE.");
}

function cleanSheetName(name) {
  if (!name) return "School_" + Math.floor(100 + Math.random() * 900);
  var clean = name.replace(/[\\\/:\?\*\[\]]/g, "-").trim();
  if (clean.length > 50) {
    clean = clean.substring(0, 47) + "...";
  }
  return clean || "School";
}
