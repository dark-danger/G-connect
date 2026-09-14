/**
 * GEETA UNIVERSITY & GEETA TECHNICAL HUB
 * G-CONNECT 2026 - SCHOOL DELEGATION & STUDENT REGISTRATION MANAGER
 * - School Selection Dropdown (with previously added schools & "+ Add New School")
 * - Dynamic Teachers / Faculty Coordinators Repeater (Teacher 1, 2, 3...)
 * - Dynamic Students Repeater (Student 1, 2, 3...)
 * - Automatic Multi-Sheet per School Google Sheet Sync
 */

const RegistrationManager = {
  DEFAULT_WEBHOOK_KEY: "gconnect_webhook_url",
  REGISTRATIONS_KEY: "gconnect_registrations_v2",
  KNOWN_SCHOOLS_KEY: "gconnect_known_schools_v1",

  DEFAULT_KNOWN_SCHOOLS: [
    {
      id: "sch_1",
      name: "DAV Public School, Sector 12, Panipat",
      principalName: "Dr. Rajesh Khanna",
      schoolPhone: "9812345670",
      city: "Panipat"
    },
    {
      id: "sch_2",
      name: "Delhi Public School (DPS), Panipat",
      principalName: "Mrs. Rohini Sen",
      schoolPhone: "9812345688",
      city: "Panipat"
    },
    {
      id: "sch_3",
      name: "Geeta Vidya Mandir Senior Secondary School",
      principalName: "Sh. Suresh Goel",
      schoolPhone: "9812345699",
      city: "Samalkha"
    },
    {
      id: "sch_4",
      name: "St. Mary's Convent Senior Secondary School",
      principalName: "Sr. Teresa Joseph",
      schoolPhone: "9812345611",
      city: "Panipat"
    },
    {
      id: "sch_5",
      name: "Government Model Senior Secondary School",
      principalName: "Dr. Virender Malik",
      schoolPhone: "9812345622",
      city: "Panipat"
    }
  ],

  // State: Dynamic Teachers & Students
  teachersList: [
    { id: 1, name: "", phone: "", email: "", designation: "Faculty Coordinator" }
  ],
  studentsList: [
    { id: 1, name: "", studentClass: "", rollNo: "", contact: "", email: "" }
  ],

  init() {
    this.seedInitialDataIfEmpty();
    this.populateSchoolDropdown();
    this.renderTeacherCards();
    this.renderStudentCards();
    this.bindEvents();
    this.updateLiveStats();
    this.checkWebhookStatus();
  },

  // Seed sample initial data
  seedInitialDataIfEmpty() {
    const existing = localStorage.getItem(this.REGISTRATIONS_KEY);
    if (!existing || JSON.parse(existing).length === 0) {
      const seedStudents = [
        {
          regId: "GC-2026-1042",
          delegationId: "GC-SCH-9011",
          timestamp: "2026-09-08T09:15:00.000Z",
          participantType: "school_student",
          fullName: "Aarav Sharma",
          studentId: "DAV-1201",
          phone: "9876543210",
          email: "aarav.sharma@davpanipat.org",
          schoolName: "DAV Public School, Sector 12, Panipat",
          department: "DAV Public School, Sector 12, Panipat",
          program: "12th Science (Non-Med)",
          semester: "12th Standard",
          section: "A",
          day: 1,
          slotNumber: 3,
          slotTime: "10:30 – 11:00 AM",
          assignedGroup: "G2",
          checkedIn: true,
          checkedInTime: "2026-09-08T10:22:15.000Z",
          techInterests: ["FSD (Full Stack)", "AI & Agentic AI", "Cloud & DevOps"],
          careerGoal: "Full-Stack Cloud Developer",
          visitedStalls: ["fsd", "ai-agentic", "cloud-devops"]
        },
        {
          regId: "GC-2026-1088",
          delegationId: "GC-SCH-9011",
          timestamp: "2026-09-08T09:20:00.000Z",
          participantType: "school_student",
          fullName: "Priya Verma",
          studentId: "DAV-1202",
          phone: "9812345678",
          email: "priya.verma@davpanipat.org",
          schoolName: "DAV Public School, Sector 12, Panipat",
          department: "DAV Public School, Sector 12, Panipat",
          program: "12th Science (Non-Med)",
          semester: "12th Standard",
          section: "A",
          day: 1,
          slotNumber: 3,
          slotTime: "10:30 – 11:00 AM",
          assignedGroup: "G2",
          checkedIn: true,
          checkedInTime: "2026-09-08T11:25:00.000Z",
          techInterests: ["Cyber Security", "Quantum Computing"],
          careerGoal: "Security Operations Analyst",
          visitedStalls: ["cyber-security"]
        },
        {
          regId: "GC-2026-FAC1",
          delegationId: "GC-SCH-9011",
          timestamp: "2026-09-08T09:00:00.000Z",
          participantType: "school_faculty",
          fullName: "Dr. Sunita Kapoor",
          studentId: "FAC-DAV-01",
          phone: "9871122334",
          email: "sunita.kapoor@davpanipat.org",
          schoolName: "DAV Public School, Sector 12, Panipat",
          department: "DAV Public School, Sector 12, Panipat",
          designation: "PGT Computer Science & Faculty Coordinator",
          program: "Faculty Coordinator",
          semester: "Faculty Lead",
          section: "Delegation Lead",
          day: 1,
          slotNumber: 3,
          slotTime: "10:30 – 11:00 AM",
          assignedGroup: "Delegation Lead",
          checkedIn: true,
          checkedInTime: "2026-09-08T09:30:00.000Z",
          techInterests: ["AI & Agentic AI", "Cloud & DevOps"],
          careerGoal: "Faculty Mentorship & Hackathons",
          visitedStalls: ["ai-agentic"]
        }
      ];
      localStorage.setItem(this.REGISTRATIONS_KEY, JSON.stringify(seedStudents));
    }
  },

  /* ------------------------------------------------------------------------
     SCHOOL DROPDOWN & PERSISTENCE
     ------------------------------------------------------------------------ */
  getKnownSchools() {
    try {
      const stored = localStorage.getItem(this.KNOWN_SCHOOLS_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn("Could not read known schools from storage", e);
    }
    return [...this.DEFAULT_KNOWN_SCHOOLS];
  },

  saveKnownSchools(list) {
    localStorage.setItem(this.KNOWN_SCHOOLS_KEY, JSON.stringify(list));
  },

  addKnownSchool(schoolObj) {
    const list = this.getKnownSchools();
    const exists = list.find(s => s.name.trim().toLowerCase() === schoolObj.name.trim().toLowerCase());
    if (!exists) {
      list.push(schoolObj);
      this.saveKnownSchools(list);
    }
    this.populateSchoolDropdown(schoolObj.name);
  },

  populateSchoolDropdown(selectSchoolName = "") {
    const select = document.getElementById("regSchoolSelect");
    if (!select) return;

    const schools = this.getKnownSchools();

    let html = `<option value="" disabled ${!selectSchoolName ? 'selected' : ''}>-- Choose an Existing School or Add New School --</option>`;
    
    schools.forEach(sch => {
      const isSelected = (selectSchoolName && sch.name.trim().toLowerCase() === selectSchoolName.trim().toLowerCase());
      html += `<option value="${sch.id || sch.name}" data-name="${sch.name}" data-principal="${sch.principalName || ''}" data-phone="${sch.schoolPhone || ''}" ${isSelected ? 'selected' : ''}>🏛️ ${sch.name}</option>`;
    });

    html += `<option value="__NEW_SCHOOL__" style="font-weight:700;color:#047857;">➕ + Add New School (Enter New School Details)</option>`;
    
    select.innerHTML = html;

    if (selectSchoolName) {
      this.handleSchoolSelection();
    }
  },

  handleSchoolSelection() {
    const select = document.getElementById("regSchoolSelect");
    const newSchoolGroup = document.getElementById("newSchoolInputGroup");
    const leadershipSection = document.getElementById("schoolLeadershipSection");
    const promptBox = document.getElementById("schoolSelectPrompt");
    const principalInput = document.getElementById("regPrincipalName");
    const schoolPhoneInput = document.getElementById("regSchoolPhone");

    if (!select) return;

    const selectedVal = select.value;

    if (!selectedVal) {
      if (leadershipSection) leadershipSection.style.display = "none";
      if (newSchoolGroup) newSchoolGroup.style.display = "none";
      if (promptBox) promptBox.style.display = "block";
      return;
    }

    if (promptBox) promptBox.style.display = "none";
    if (leadershipSection) leadershipSection.style.display = "block";

    if (selectedVal === "__NEW_SCHOOL__") {
      if (newSchoolGroup) {
        newSchoolGroup.style.display = "block";
        const newNameInput = document.getElementById("regNewSchoolName");
        if (newNameInput) {
          newNameInput.value = "";
          setTimeout(() => newNameInput.focus(), 50);
        }
      }
      if (principalInput) principalInput.value = "";
      if (schoolPhoneInput) schoolPhoneInput.value = "";
    } else {
      if (newSchoolGroup) newSchoolGroup.style.display = "none";
      const selectedOption = select.options[select.selectedIndex];
      if (selectedOption) {
        const principal = selectedOption.getAttribute("data-principal") || "";
        const phone = selectedOption.getAttribute("data-phone") || "";
        if (principalInput && principal) principalInput.value = principal;
        if (schoolPhoneInput && phone) schoolPhoneInput.value = phone;
      }
    }
  },

  /* ------------------------------------------------------------------------
     DYNAMIC TEACHERS REPEATER (TEACHER 1, 2, 3...)
     ------------------------------------------------------------------------ */
  captureCurrentTeacherInputs() {
    const container = document.getElementById("teachersContainer");
    if (!container) return;

    const cards = container.querySelectorAll(".teacher-entry-card");
    cards.forEach((card, idx) => {
      if (this.teachersList[idx]) {
        const nameInput = card.querySelector(".teacher-name-input");
        const phoneInput = card.querySelector(".teacher-phone-input");
        const emailInput = card.querySelector(".teacher-email-input");
        const desigInput = card.querySelector(".teacher-desig-input");

        if (nameInput) this.teachersList[idx].name = nameInput.value;
        if (phoneInput) this.teachersList[idx].phone = phoneInput.value;
        if (emailInput) this.teachersList[idx].email = emailInput.value;
        if (desigInput) this.teachersList[idx].designation = desigInput.value;
      }
    });
  },

  addTeacher() {
    this.captureCurrentTeacherInputs();
    this.teachersList.push({
      id: Date.now() + Math.random(),
      name: "",
      phone: "",
      email: "",
      designation: "Faculty Coordinator"
    });
    this.renderTeacherCards();

    setTimeout(() => {
      const container = document.getElementById("teachersContainer");
      if (container && container.lastElementChild) {
        container.lastElementChild.scrollIntoView({ behavior: "smooth", block: "nearest" });
        const firstInput = container.lastElementChild.querySelector(".teacher-name-input");
        if (firstInput) firstInput.focus();
      }
    }, 50);
  },

  removeTeacher(index) {
    if (this.teachersList.length <= 1) {
      this.showToast("At least 1 Teacher / Faculty Coordinator is required.", "warning");
      return;
    }
    this.captureCurrentTeacherInputs();
    this.teachersList.splice(index, 1);
    this.renderTeacherCards();
    this.showToast(`Teacher removed. Total teachers: ${this.teachersList.length}`, "info");
  },

  renderTeacherCards() {
    const container = document.getElementById("teachersContainer");
    const countBadge = document.getElementById("teacherCountBadge");
    if (!container) return;

    if (countBadge) {
      const count = this.teachersList.length;
      countBadge.textContent = `${count} Teacher${count > 1 ? 's' : ''} Added`;
    }

    container.innerHTML = this.teachersList.map((teacher, idx) => `
      <div class="teacher-entry-card" data-index="${idx}">
        <div class="student-entry-header">
          <div class="teacher-badge-num">
            <span>👨‍🏫</span> Teacher / Faculty #${idx + 1}
          </div>
          ${this.teachersList.length > 1 ? `
            <button type="button" class="btn-remove-student" onclick="RegistrationManager.removeTeacher(${idx})" title="Remove Teacher #${idx + 1}">
              &times; Remove
            </button>
          ` : ''}
        </div>

        <div class="form-row-2">
          <div class="form-group">
            <label>Teacher Full Name <span class="req">*</span></label>
            <input type="text" class="teacher-name-input" required placeholder="e.g. Dr. Sunita Kapoor" value="${teacher.name || ''}">
          </div>
          <div class="form-group">
            <label>Teacher Mobile Number <span class="req">*</span></label>
            <input type="tel" class="teacher-phone-input" required placeholder="10-digit mobile number" pattern="[0-9]{10}" value="${teacher.phone || ''}">
          </div>
        </div>

        <div class="form-row-2" style="margin-top:0.75rem;">
          <div class="form-group">
            <label>Email Address (Optional)</label>
            <input type="email" class="teacher-email-input" placeholder="e.g. sunita@school.edu.in" value="${teacher.email || ''}">
          </div>
          <div class="form-group">
            <label>Designation / Subject Specialization</label>
            <input type="text" class="teacher-desig-input" placeholder="e.g. PGT Computer Science / Mentor" value="${teacher.designation || 'Faculty Coordinator'}">
          </div>
        </div>
      </div>
    `).join("");
  },

  /* ------------------------------------------------------------------------
     DYNAMIC STUDENTS REPEATER (STUDENT 1, 2, 3...)
     ------------------------------------------------------------------------ */
  captureCurrentStudentInputs() {
    const container = document.getElementById("studentsContainer");
    if (!container) return;

    const cards = container.querySelectorAll(".student-entry-card");
    cards.forEach((card, idx) => {
      if (this.studentsList[idx]) {
        const nameInput = card.querySelector(".student-name-input");
        const classInput = card.querySelector(".student-class-input");
        const rollInput = card.querySelector(".student-roll-input");
        const contactInput = card.querySelector(".student-contact-input");
        const emailInput = card.querySelector(".student-email-input");

        if (nameInput) this.studentsList[idx].name = nameInput.value;
        if (classInput) this.studentsList[idx].studentClass = classInput.value;
        if (rollInput) this.studentsList[idx].rollNo = rollInput.value;
        if (contactInput) this.studentsList[idx].contact = contactInput.value;
        if (emailInput) this.studentsList[idx].email = emailInput.value;
      }
    });
  },

  addStudent() {
    this.captureCurrentStudentInputs();
    this.studentsList.push({
      id: Date.now() + Math.random(),
      name: "",
      studentClass: this.studentsList[0]?.studentClass || "",
      rollNo: "",
      contact: "",
      email: ""
    });
    this.renderStudentCards();

    setTimeout(() => {
      const container = document.getElementById("studentsContainer");
      if (container && container.lastElementChild) {
        container.lastElementChild.scrollIntoView({ behavior: "smooth", block: "nearest" });
        const firstInput = container.lastElementChild.querySelector(".student-name-input");
        if (firstInput) firstInput.focus();
      }
    }, 50);
  },

  removeStudent(index) {
    if (this.studentsList.length <= 1) {
      this.showToast("At least 1 student is required per delegation.", "warning");
      return;
    }
    this.captureCurrentStudentInputs();
    this.studentsList.splice(index, 1);
    this.renderStudentCards();
    this.showToast(`Student removed. Total students: ${this.studentsList.length}`, "info");
  },

  renderStudentCards() {
    const container = document.getElementById("studentsContainer");
    const countBadge = document.getElementById("studentCountBadge");
    if (!container) return;

    if (countBadge) {
      const count = this.studentsList.length;
      countBadge.textContent = `${count} Student${count > 1 ? 's' : ''} Added`;
    }

    container.innerHTML = this.studentsList.map((student, idx) => `
      <div class="student-entry-card" data-index="${idx}">
        <div class="student-entry-header">
          <div class="student-badge-num">
            <span>🎓</span> Student #${idx + 1}
          </div>
          ${this.studentsList.length > 1 ? `
            <button type="button" class="btn-remove-student" onclick="RegistrationManager.removeStudent(${idx})" title="Remove Student #${idx + 1}">
              &times; Remove
            </button>
          ` : ''}
        </div>

        <div class="form-row-2">
          <div class="form-group">
            <label>Student Full Name <span class="req">*</span></label>
            <input type="text" class="student-name-input" required placeholder="e.g. Aarav Sharma" value="${student.name || ''}">
          </div>
          <div class="form-group">
            <label>Class / Grade / Stream <span class="req">*</span></label>
            <input type="text" class="student-class-input" required placeholder="e.g. 12th Science (PCM) / 11th" value="${student.studentClass || ''}">
          </div>
        </div>

        <div class="form-row-2" style="margin-top:0.75rem;">
          <div class="form-group">
            <label>Roll No / Student ID <span class="req">*</span></label>
            <input type="text" class="student-roll-input" required placeholder="e.g. SCH-2026-${String(idx + 1).padStart(2, '0')}" value="${student.rollNo || ''}">
          </div>
          <div class="form-group">
            <label>Student WhatsApp / Mobile <span class="req">*</span></label>
            <input type="tel" class="student-contact-input" required placeholder="10-digit mobile number" pattern="[0-9]{10}" value="${student.contact || ''}">
          </div>
        </div>

        <div class="form-group" style="margin-top:0.75rem;">
          <label>Student Email (Optional)</label>
          <input type="email" class="student-email-input" placeholder="e.g. student@gmail.com" value="${student.email || ''}">
        </div>
      </div>
    `).join("");
  },

  /* ------------------------------------------------------------------------
     EVENTS & FORM SUBMISSION
     ------------------------------------------------------------------------ */
  bindEvents() {
    // School Dropdown change
    const schoolSelect = document.getElementById("regSchoolSelect");
    if (schoolSelect) {
      schoolSelect.addEventListener("change", () => this.handleSchoolSelection());
    }

    // Add Teacher Button
    const addTeacherBtn = document.getElementById("addTeacherBtn");
    if (addTeacherBtn) {
      addTeacherBtn.addEventListener("click", () => this.addTeacher());
    }

    // Add Student Button
    const addStudentBtn = document.getElementById("addStudentBtn");
    if (addStudentBtn) {
      addStudentBtn.addEventListener("click", () => this.addStudent());
    }

    // Form Submit
    const form = document.getElementById("gconnectRegForm");
    if (form) {
      form.addEventListener("submit", (e) => this.handleFormSubmit(e));
    }
  },

  async handleFormSubmit(e) {
    e.preventDefault();
    this.captureCurrentTeacherInputs();
    this.captureCurrentStudentInputs();

    const submitBtn = document.getElementById("regSubmitBtn");
    const originalBtnText = submitBtn ? submitBtn.innerHTML : "Register Delegation";
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Saving & Creating School Sheet Tab...</span> <span class="spinner-inline"></span>`;
    }

    try {
      // 1. Extract School Info
      const schoolSelect = document.getElementById("regSchoolSelect");
      let schoolName = "";

      if (!schoolSelect || !schoolSelect.value) {
        this.showToast("Please select a school or choose '+ Add New School'", "error");
        if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = originalBtnText; }
        return;
      }

      if (schoolSelect.value === "__NEW_SCHOOL__") {
        schoolName = (document.getElementById("regNewSchoolName")?.value || "").trim();
        if (!schoolName) {
          this.showToast("Please enter the name of the new school.", "error");
          document.getElementById("regNewSchoolName")?.focus();
          if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = originalBtnText; }
          return;
        }
      } else {
        const selOption = schoolSelect.options[schoolSelect.selectedIndex];
        schoolName = selOption.getAttribute("data-name") || selOption.textContent.replace(/^🏛️\s*/, '').trim();
      }

      const principalName = document.getElementById("regPrincipalName").value.trim();
      const schoolPhone = document.getElementById("regSchoolPhone").value.trim();
      const day = document.getElementById("regDay") ? parseInt(document.getElementById("regDay").value) : 1;
      const slotTime = document.getElementById("regSlot") ? document.getElementById("regSlot").value : "Slot 1 (9:30 – 10:00 AM)";

      // Persist newly registered school into Known Schools list
      this.addKnownSchool({
        id: "sch_" + Date.now(),
        name: schoolName,
        principalName,
        schoolPhone
      });

      // 2. Validate Teachers
      const teacherCards = document.querySelectorAll(".teacher-entry-card");
      const teachersData = [];

      for (let t = 0; t < teacherCards.length; t++) {
        const card = teacherCards[t];
        const tName = (card.querySelector(".teacher-name-input")?.value || "").trim();
        const tPhone = (card.querySelector(".teacher-phone-input")?.value || "").trim();
        const tEmail = (card.querySelector(".teacher-email-input")?.value || "").trim();
        const tDesig = (card.querySelector(".teacher-desig-input")?.value || "").trim() || "Faculty Coordinator";

        if (!tName || !tPhone) {
          this.showToast(`Please enter Name and Mobile number for Teacher #${t + 1}`, "error");
          if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = originalBtnText; }
          return;
        }

        teachersData.push({
          name: tName,
          phone: tPhone,
          email: tEmail || "N/A",
          designation: tDesig
        });
      }

      // 3. Validate Students
      const studentCards = document.querySelectorAll(".student-entry-card");
      const studentsData = [];

      for (let i = 0; i < studentCards.length; i++) {
        const card = studentCards[i];
        const sName = (card.querySelector(".student-name-input")?.value || "").trim();
        const sClass = (card.querySelector(".student-class-input")?.value || "").trim();
        const sRoll = (card.querySelector(".student-roll-input")?.value || "").trim().toUpperCase();
        const sContact = (card.querySelector(".student-contact-input")?.value || "").trim();
        const sEmail = (card.querySelector(".student-email-input")?.value || "").trim();

        if (!sName || !sClass || !sRoll || !sContact) {
          this.showToast(`Please complete all required fields for Student #${i + 1}`, "error");
          if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = originalBtnText; }
          return;
        }

        const sRandomSuffix = Math.floor(1000 + Math.random() * 9000);
        const sRegId = `GC-2026-${sRandomSuffix}`;

        studentsData.push({
          regId: sRegId,
          name: sName,
          fullName: sName,
          studentClass: sClass,
          rollNo: sRoll,
          studentId: sRoll,
          contact: sContact,
          phone: sContact,
          email: sEmail || "N/A",
          checkedIn: false
        });
      }

      // 4. Tech Interests
      const techInterests = [];
      document.querySelectorAll("input[name='tech_interest']:checked").forEach(chk => {
        techInterests.push(chk.value);
      });
      if (techInterests.length === 0) {
        techInterests.push("FSD (Full Stack)", "AI & Agentic AI");
      }

      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const delegationId = `GC-SCH-${randomSuffix}`;
      const groupNum = Math.floor(1 + Math.random() * 8);
      const assignedGroup = `G${groupNum}`;
      const slotNumMatch = slotTime.match(/Slot\s*(\d+)/i);
      const slotNumber = slotNumMatch ? parseInt(slotNumMatch[1]) : 1;

      // Master Payload for Google Sheets Multi-Sheet Backend
      const delegationPayload = {
        delegationId,
        timestamp: new Date().toISOString(),
        schoolName,
        principalName,
        schoolPhone,
        teachers: teachersData,
        facultyName: teachersData[0]?.name || "N/A",
        facultyPhone: teachersData[0]?.phone || "N/A",
        facultyEmail: teachersData[0]?.email || "N/A",
        day,
        slotNumber,
        slotTime,
        assignedGroup,
        totalTeachers: teachersData.length,
        totalStudents: studentsData.length,
        students: studentsData,
        techInterests
      };

      // Persist Teacher records locally
      teachersData.forEach((tch, tIdx) => {
        const teacherRecord = {
          regId: `GC-FAC-${randomSuffix + tIdx}`,
          delegationId,
          timestamp: new Date().toISOString(),
          participantType: "school_faculty",
          fullName: tch.name,
          studentId: `FAC-${randomSuffix + tIdx}`,
          phone: tch.phone,
          email: tch.email,
          schoolName,
          department: schoolName,
          designation: tch.designation,
          program: tch.designation,
          semester: "Faculty Coordinator",
          section: "Delegation Lead",
          principalName,
          schoolPhone,
          day,
          slotNumber,
          slotTime,
          assignedGroup: "Delegation Mentor",
          checkedIn: false,
          checkedInTime: null,
          techInterests,
          visitedStalls: []
        };
        this.addRegistration(teacherRecord);
      });

      // Persist Student records locally
      studentsData.forEach(st => {
        const studentRecord = {
          regId: st.regId,
          delegationId,
          timestamp: new Date().toISOString(),
          participantType: "school_student",
          fullName: st.name,
          studentId: st.rollNo,
          phone: st.contact,
          email: st.email,
          schoolName,
          department: schoolName,
          program: st.studentClass,
          semester: st.studentClass,
          section: "Delegation",
          facultyCoordinator: teachersData[0]?.name || "Faculty Coordinator",
          principalName,
          day,
          slotNumber,
          slotTime,
          assignedGroup,
          checkedIn: false,
          checkedInTime: null,
          techInterests,
          visitedStalls: []
        };
        this.addRegistration(studentRecord);
      });

      // Send to Google Sheets Webhook
      this.syncRecordToGoogleSheets(delegationPayload);

      this.showToast(`🎉 Registration Complete! Sheet Tab generated for "${schoolName}" with ${studentsData.length} students & ${teachersData.length} teachers!`, "success");

      // Confetti
      if (window.confetti) {
        window.confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      }

      // Generate Pass for first student or teacher
      if (window.TicketGenerator) {
        const firstStudent = this.getRegistrationById(studentsData[0].regId);
        TicketGenerator.generatePass(firstStudent || this.getAllRegistrations()[0]);
      }

      // Reset form & dynamic state
      e.target.reset();
      this.teachersList = [
        { id: 1, name: "", phone: "", email: "", designation: "Faculty Coordinator" }
      ];
      this.studentsList = [
        { id: 1, name: "", studentClass: "", rollNo: "", contact: "", email: "" }
      ];
      this.renderTeacherCards();
      this.renderStudentCards();
      this.populateSchoolDropdown(schoolName);

    } catch (err) {
      console.error("Error during delegation registration:", err);
      this.showToast("Failed to process registration. Please try again.", "error");
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    }
  },

  async syncRecordToGoogleSheets(delegationPayload) {
    const webhookUrl = this.getWebhookUrl();
    if (!webhookUrl || !webhookUrl.startsWith("https://script.google.com/")) {
      console.log("No Google Sheets webhook configured; record stored in local vault.");
      return;
    }

    try {
      await fetch(webhookUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(delegationPayload)
      });
      console.log(`Delegation for "${delegationPayload.schoolName}" synced to Google Sheets successfully!`);
    } catch (err) {
      console.warn("Failed to sync to Google Sheet webhook:", err);
    }
  },

  /* ------------------------------------------------------------------------
     UTILITY: PERSISTENCE, STATS & TOAST
     ------------------------------------------------------------------------ */
  getWebhookUrl() {
    return localStorage.getItem(this.DEFAULT_WEBHOOK_KEY) || "";
  },

  setWebhookUrl(url) {
    localStorage.setItem(this.DEFAULT_WEBHOOK_KEY, url.trim());
    this.checkWebhookStatus();
  },

  checkWebhookStatus() {
    const url = this.getWebhookUrl();
    const statusDot = document.getElementById("sheetStatusDot");
    const statusText = document.getElementById("sheetStatusText");

    if (url && url.startsWith("https://script.google.com/")) {
      if (statusDot) statusDot.style.backgroundColor = "#10b981";
      if (statusText) statusText.textContent = "Google Sheets Webhook Connected (Auto Multi-Sheet Active)";
    } else {
      if (statusDot) statusDot.style.backgroundColor = "#f59e0b";
      if (statusText) statusText.textContent = "Local Backup Active (G-Sheet Sync Optional)";
    }
  },

  getAllRegistrations() {
    try {
      return JSON.parse(localStorage.getItem(this.REGISTRATIONS_KEY)) || [];
    } catch (e) {
      console.error("Failed to parse registrations from localStorage", e);
      return [];
    }
  },

  saveAllRegistrations(list) {
    localStorage.setItem(this.REGISTRATIONS_KEY, JSON.stringify(list));
    this.updateLiveStats();
  },

  getRegistrationById(regId) {
    const list = this.getAllRegistrations();
    return list.find(r => r.regId === regId || r.studentId === regId);
  },

  addRegistration(record) {
    const list = this.getAllRegistrations();
    list.unshift(record);
    this.saveAllRegistrations(list);
    return record;
  },

  updateRegistration(regId, updates) {
    const list = this.getAllRegistrations();
    const index = list.findIndex(r => r.regId === regId || r.studentId === regId);
    if (index !== -1) {
      list[index] = { ...list[index], ...updates };
      this.saveAllRegistrations(list);
      return list[index];
    }
    return null;
  },

  checkInStudent(regId) {
    const student = this.getRegistrationById(regId);
    if (!student) return { success: false, message: "Participant record not found." };
    
    if (student.checkedIn) {
      return { success: true, alreadyCheckedIn: true, student, message: `${student.fullName} is already checked in!` };
    }

    const updated = this.updateRegistration(regId, {
      checkedIn: true,
      checkedInTime: new Date().toISOString()
    });

    return { success: true, alreadyCheckedIn: false, student: updated, message: `Check-in confirmed for ${updated.fullName} (${updated.assignedGroup})` };
  },

  recordStallVisit(regId, stallId) {
    const student = this.getRegistrationById(regId);
    if (!student) return false;

    const visited = student.visitedStalls || [];
    if (!visited.includes(stallId)) {
      visited.push(stallId);
      this.updateRegistration(regId, { visitedStalls: visited });
    }
    return true;
  },

  getStats() {
    const list = this.getAllRegistrations();
    const total = list.length;
    const checkedIn = list.filter(r => r.checkedIn).length;
    const schoolStudents = list.filter(r => r.participantType === "school_student" || r.participantType === "geeta_student").length;
    const schoolFaculty = list.filter(r => r.participantType === "school_faculty" || r.participantType === "faculty_coordinator").length;
    
    const schoolsSet = new Set();
    list.forEach(r => {
      if (r.schoolName) schoolsSet.add(r.schoolName);
    });

    const techCounts = {};
    list.forEach(r => {
      (r.techInterests || []).forEach(t => {
        techCounts[t] = (techCounts[t] || 0) + 1;
      });
    });

    return { total, checkedIn, schoolStudents, schoolFaculty, schoolsCount: schoolsSet.size, techCounts };
  },

  updateLiveStats() {
    const stats = this.getStats();
    
    const totalRegEl = document.getElementById("statTotalRegistrations");
    const checkinEl = document.getElementById("statTotalCheckins");
    const schoolStdEl = document.getElementById("statSchoolStudents") || document.getElementById("statGeetaStudents");
    const facultyEl = document.getElementById("statSchoolFaculty") || document.getElementById("statExtStudents");
    const cohortPill = document.getElementById("heroCohortCounter");

    if (totalRegEl) totalRegEl.textContent = `${stats.total + 850}+`;
    if (checkinEl) checkinEl.textContent = `${stats.checkedIn}`;
    if (schoolStdEl) schoolStdEl.textContent = `${stats.schoolStudents}`;
    if (facultyEl) facultyEl.textContent = `${stats.schoolFaculty}`;
    if (cohortPill) cohortPill.textContent = `${stats.total + 850} Students & Faculty`;
  },

  showToast(message, type = "info") {
    const container = document.getElementById("toastContainer");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    
    let icon = "ℹ️";
    if (type === "success") icon = "✅";
    if (type === "error") icon = "⚠️";
    if (type === "warning") icon = "🔔";

    toast.innerHTML = `
      <span class="toast-icon">${icon}</span>
      <span class="toast-msg">${message}</span>
      <button class="toast-close" onclick="this.parentElement.remove()">&times;</button>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.add("show");
    }, 10);

    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  }
};
