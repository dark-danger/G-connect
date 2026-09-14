/**
 * GEETA UNIVERSITY & GEETA TECHNICAL HUB
 * G-CONNECT 2026 - ADMIN DASHBOARD, STALL 13 CHECK-IN DESK & STUDENT DATA VAULT
 */

const AdminDashboard = {
  activeFilterTech: "all",
  activeFilterDept: "all",
  activeFilterStatus: "all",

  init() {
    this.bindEvents();
    this.initCoordinatorChecklists();
  },

  bindEvents() {
    // Open Admin Talent Bank Modal
    const openAdminBtn = document.getElementById("openAdminModalBtn");
    if (openAdminBtn) openAdminBtn.addEventListener("click", () => this.openAdminModal());

    // Open Stall 13 Check-in Desk
    const openCheckinBtn = document.getElementById("openCheckinDeskBtn");
    const openCheckinNavBtn = document.getElementById("openCheckinNavBtn");
    if (openCheckinBtn) openCheckinBtn.addEventListener("click", () => this.openCheckinModal());
    if (openCheckinNavBtn) openCheckinNavBtn.addEventListener("click", () => this.openCheckinModal());

    // Open Coordinator Command Hub
    const openCoordBtn = document.getElementById("openCoordinatorModalBtn");
    if (openCoordBtn) openCoordBtn.addEventListener("click", () => this.openCoordinatorModal());

    // Open Webhook Settings
    const openWebhookBtn = document.getElementById("openWebhookNavBtn");
    if (openWebhookBtn) openWebhookBtn.addEventListener("click", () => this.openWebhookModal());

    // Save Webhook URL
    const saveWebhookBtn = document.getElementById("saveWebhookBtn");
    if (saveWebhookBtn) saveWebhookBtn.addEventListener("click", () => this.saveWebhookUrl());

    // Test Webhook URL
    const testWebhookBtn = document.getElementById("testWebhookBtn");
    if (testWebhookBtn) testWebhookBtn.addEventListener("click", () => this.testWebhookConnection());

    // Export CSV
    const exportCsvBtn = document.getElementById("exportCsvBtn");
    if (exportCsvBtn) exportCsvBtn.addEventListener("click", () => this.exportToCSV());

    // Admin Search Input
    const adminSearchInput = document.getElementById("adminSearchInput");
    if (adminSearchInput) {
      adminSearchInput.addEventListener("input", () => this.renderRegistrationsTable());
    }

    // Admin Filter Dropdowns
    const deptFilter = document.getElementById("adminDeptFilter");
    if (deptFilter) {
      deptFilter.addEventListener("change", (e) => {
        this.activeFilterDept = e.target.value;
        this.renderRegistrationsTable();
      });
    }

    const techFilter = document.getElementById("adminTechFilter");
    if (techFilter) {
      techFilter.addEventListener("change", (e) => {
        this.activeFilterTech = e.target.value;
        this.renderRegistrationsTable();
      });
    }

    const statusFilter = document.getElementById("adminStatusFilter");
    if (statusFilter) {
      statusFilter.addEventListener("change", (e) => {
        this.activeFilterStatus = e.target.value;
        this.renderRegistrationsTable();
      });
    }

    // Gate Scanner Search Input (Stall 13 Desk)
    const checkinSearchInput = document.getElementById("checkinSearchInput");
    if (checkinSearchInput) {
      checkinSearchInput.addEventListener("input", (e) => this.handleCheckinSearch(e.target.value));
      checkinSearchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          this.handleCheckinSearch(e.target.value);
        }
      });
    }
  },

  /* ------------------------------------------------------------------------
     1. STALL 13: ON-CAMPUS CHECK-IN DESK
     ------------------------------------------------------------------------ */
  openCheckinModal() {
    const modal = document.getElementById("checkinDeskModal");
    if (!modal) return;
    modal.classList.add("open");

    // Focus on search input
    setTimeout(() => {
      const input = document.getElementById("checkinSearchInput");
      if (input) input.focus();
    }, 100);

    this.renderRecentCheckins();
  },

  closeCheckinModal() {
    const modal = document.getElementById("checkinDeskModal");
    if (modal) modal.classList.remove("open");
  },

  handleCheckinSearch(query) {
    const cleanQuery = query.trim().toUpperCase();
    const resultBox = document.getElementById("checkinSearchResultBox");
    if (!resultBox) return;

    if (!cleanQuery) {
      resultBox.innerHTML = `
        <div class="checkin-empty-state">
          <div style="font-size:2.5rem;margin-bottom:0.5rem;">🔍</div>
          <p>Scan entry QR code or type Student Roll No / Registration ID (e.g. <code>GU23CSE0142</code> or <code>GC-2026-1042</code>)</p>
        </div>
      `;
      return;
    }

    const list = RegistrationManager.getAllRegistrations();
    const match = list.find(r => 
      r.studentId.toUpperCase() === cleanQuery || 
      r.regId.toUpperCase() === cleanQuery || 
      r.phone === cleanQuery ||
      r.fullName.toUpperCase().includes(cleanQuery)
    );

    if (!match) {
      resultBox.innerHTML = `
        <div class="checkin-not-found">
          <div style="font-size:2rem;color:var(--accent-pink);">❌ No Record Found</div>
          <p style="margin:0.5rem 0;color:var(--text-muted);">No pre-registration found for "<strong>${query}</strong>".</p>
          <button class="btn btn-primary btn-sm" onclick="AdminDashboard.openOnSpotModal('${query}')">
            + Quick On-Spot Registration
          </button>
        </div>
      `;
      return;
    }

    const checkedInBadge = match.checkedIn 
      ? `<span class="badge badge-success">✓ ALREADY CHECKED-IN (${new Date(match.checkedInTime).toLocaleTimeString()})</span>`
      : `<span class="badge badge-amber">ENTRY PENDING</span>`;

    resultBox.innerHTML = `
      <div class="checkin-card-found">
        <div class="checkin-card-header">
          <div>
            <div class="checkin-student-name">${match.fullName}</div>
            <div class="checkin-student-sub">${match.studentId} • ${match.program} (${match.semester || "1st Sem"})</div>
          </div>
          <div>${checkedInBadge}</div>
        </div>

        <div class="checkin-card-details-grid">
          <div class="checkin-detail-item">
            <span class="detail-label">Allocated Slot</span>
            <span class="detail-value text-cyan">${match.slotTime || "Slot 1"}</span>
          </div>
          <div class="checkin-detail-item">
            <span class="detail-label">Assigned Group (~10 stds)</span>
            <span class="detail-value text-amber">Group ${match.assignedGroup || "G1"}</span>
          </div>
          <div class="checkin-detail-item">
            <span class="detail-label">Department / School</span>
            <span class="detail-value">${match.department}</span>
          </div>
          <div class="checkin-detail-item">
            <span class="detail-label">Section</span>
            <span class="detail-value">${match.section || "A"}</span>
          </div>
        </div>

        <div class="checkin-actions-bar">
          ${!match.checkedIn ? `
            <button class="btn btn-primary btn-lg" onclick="AdminDashboard.executeCheckIn('${match.regId}')">
              <span>✅</span> Confirm Campus Entry & Issue Passport
            </button>
          ` : `
            <button class="btn btn-secondary" onclick="AdminDashboard.executeCheckIn('${match.regId}')">
              <span>🔄</span> Re-verify / Update Check-in
            </button>
          `}
          <button class="btn btn-secondary" onclick="TicketGenerator.generatePass(${JSON.stringify(match).replace(/"/g, '&quot;')})">
            <span>🎫</span> View Pass
          </button>
          <button class="btn btn-secondary" onclick="TicketGenerator.openDigitalPassport(${JSON.stringify(match).replace(/"/g, '&quot;')})">
            <span>📖</span> Open Passport
          </button>
        </div>
      </div>
    `;
  },

  executeCheckIn(regId) {
    const res = RegistrationManager.checkInStudent(regId);
    if (res.success) {
      RegistrationManager.showToast(res.message, "success");
      if (window.confetti && !res.alreadyCheckedIn) {
        window.confetti({ particleCount: 80, spread: 60 });
      }
      this.handleCheckinSearch(regId);
      this.renderRecentCheckins();
    } else {
      RegistrationManager.showToast(res.message, "error");
    }
  },

  renderRecentCheckins() {
    const container = document.getElementById("recentCheckinsList");
    if (!container) return;

    const list = RegistrationManager.getAllRegistrations().filter(r => r.checkedIn);
    
    if (list.length === 0) {
      container.innerHTML = `<div style="text-align:center;color:var(--text-muted);padding:1rem;">No check-ins recorded yet.</div>`;
      return;
    }

    container.innerHTML = list.slice(0, 5).map(item => `
      <div class="recent-checkin-item">
        <div style="display:flex;align-items:center;gap:0.75rem;">
          <div class="recent-avatar">${item.fullName.charAt(0)}</div>
          <div>
            <div style="font-weight:600;font-size:0.9rem;">${item.fullName}</div>
            <div style="font-size:0.75rem;color:var(--text-muted);">${item.studentId} • ${item.assignedGroup}</div>
          </div>
        </div>
        <div style="text-align:right;">
          <span class="badge badge-success" style="font-size:0.7rem;">Verified</span>
          <div style="font-size:0.7rem;color:var(--text-muted);margin-top:0.2rem;">
            ${item.checkedInTime ? new Date(item.checkedInTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : "Just now"}
          </div>
        </div>
      </div>
    `).join("");
  },

  openOnSpotModal(prefillId = "") {
    this.closeCheckinModal();
    const regSection = document.getElementById("register");
    if (regSection) {
      regSection.scrollIntoView({ behavior: "smooth" });
      const idInput = document.getElementById("regStudentId");
      if (idInput && prefillId) idInput.value = prefillId;
      RegistrationManager.showToast("Fill in student details for On-Spot G-Connect registration.", "info");
    }
  },

  /* ------------------------------------------------------------------------
     2. ADMIN TALENT VAULT & CSV EXPORT
     ------------------------------------------------------------------------ */
  openAdminModal() {
    const modal = document.getElementById("adminModal");
    if (!modal) return;

    this.renderRegistrationsTable();
    modal.classList.add("open");
  },

  closeAdminModal() {
    const modal = document.getElementById("adminModal");
    if (modal) modal.classList.remove("open");
  },

  renderRegistrationsTable() {
    const tableBody = document.getElementById("adminTableBody");
    const countBadge = document.getElementById("adminFilteredCountBadge");
    if (!tableBody) return;

    const list = RegistrationManager.getAllRegistrations();
    const query = (document.getElementById("adminSearchInput") ? document.getElementById("adminSearchInput").value : "").toLowerCase();

    const filtered = list.filter(item => {
      const matchQuery = 
        item.fullName.toLowerCase().includes(query) ||
        item.studentId.toLowerCase().includes(query) ||
        item.regId.toLowerCase().includes(query) ||
        item.email.toLowerCase().includes(query) ||
        item.phone.includes(query) ||
        (item.department || "").toLowerCase().includes(query);

      const matchDept = this.activeFilterDept === "all" || item.department.includes(this.activeFilterDept) || item.program.includes(this.activeFilterDept);
      
      const matchTech = this.activeFilterTech === "all" || (item.techInterests || []).some(t => t.toLowerCase().includes(this.activeFilterTech.toLowerCase()));

      const matchStatus = 
        this.activeFilterStatus === "all" ? true :
        this.activeFilterStatus === "checked_in" ? item.checkedIn :
        this.activeFilterStatus === "pending" ? !item.checkedIn :
        this.activeFilterStatus === "has_github" ? Boolean(item.githubUrl) : true;

      return matchQuery && matchDept && matchTech && matchStatus;
    });

    if (countBadge) {
      countBadge.textContent = `${filtered.length} Participants Found`;
    }

    if (filtered.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:2.5rem;color:var(--text-muted);">No student or faculty records matched your active filters.</td></tr>`;
      return;
    }

    tableBody.innerHTML = filtered.map(item => {
      const techTags = (item.techInterests || []).slice(0, 2).map(t => `<span class="table-tech-pill">${t}</span>`).join(" ");
      const checkinPill = item.checkedIn 
        ? `<span class="badge badge-success" title="${item.checkedInTime}">Checked-In</span>` 
        : `<span class="badge badge-amber">Gate Pending</span>`;

      const githubLink = item.githubUrl ? `<a href="${item.githubUrl}" target="_blank" class="table-link" title="GitHub">🐙</a>` : "";
      const linkedinLink = item.linkedinUrl ? `<a href="${item.linkedinUrl}" target="_blank" class="table-link" title="LinkedIn">💼</a>` : "";
      const isFaculty = (item.participantType === "school_faculty" || item.participantType === "faculty_coordinator");

      return `
        <tr>
          <td>
            <div style="font-weight:800;color:#047857;font-family:monospace;">${item.regId}</div>
            <div style="font-size:0.75rem;color:var(--text-muted);">${item.studentId}</div>
          </td>
          <td>
            <div style="font-weight:600;font-size:0.95rem;">${item.fullName}</div>
            <div style="font-size:0.75rem;color:var(--text-muted);">${item.phone} • ${item.email}</div>
          </td>
          <td>
            ${isFaculty 
              ? `<div style="font-size:0.85rem;font-weight:600;color:#0284c7;">${item.designation || 'Faculty Member'}</div>` 
              : `<div style="font-size:0.85rem;font-weight:500;">${item.program} (${item.semester || "1st Sem"})</div>`}
            <div style="font-size:0.75rem;color:var(--text-muted);">${item.department}</div>
          </td>
          <td>
            <div style="font-size:0.85rem;font-weight:600;color:var(--accent-amber);">${item.slotTime}</div>
            <div style="font-size:0.75rem;color:var(--text-muted);">Group: <strong>${item.assignedGroup}</strong></div>
          </td>
          <td>
            <div style="display:flex;flex-wrap:wrap;gap:0.3rem;">${techTags}</div>
          </td>
          <td>
            <div style="display:flex;align-items:center;gap:0.4rem;">
              ${checkinPill}
              ${githubLink}
              ${linkedinLink}
            </div>
          </td>
          <td>
            <div style="display:flex;gap:0.3rem;">
              <button class="btn btn-secondary btn-sm" onclick="TicketGenerator.generatePass(${JSON.stringify(item).replace(/"/g, '&quot;')})" title="View Digital Pass">
                🎫
              </button>
              <button class="btn btn-secondary btn-sm" onclick="AdminDashboard.executeCheckIn('${item.regId}')" title="Toggle Check-In">
                ${item.checkedIn ? '✓' : '📥'}
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join("");
  },

  exportToCSV() {
    const list = RegistrationManager.getAllRegistrations();
    if (!list || list.length === 0) {
      RegistrationManager.showToast("No registrations available to export.", "error");
      return;
    }

    const headers = [
      "Registration ID",
      "Student / Roll ID",
      "Full Name",
      "Participant Type",
      "Department",
      "Program",
      "Semester",
      "Section",
      "Allocated Day",
      "Slot Time",
      "Assigned Group",
      "Phone",
      "Email",
      "GitHub Profile",
      "LinkedIn Profile",
      "Tech Interests",
      "Career Goal",
      "Campus Checked In",
      "Check In Timestamp",
      "Institution Name",
      "Faculty Coordinator"
    ];

    const rows = [];
    rows.push(headers.join(","));

    list.forEach(item => {
      const techStr = (item.techInterests || []).join(" | ");
      const row = [
        `"${item.regId || ''}"`,
        `"${item.studentId || ''}"`,
        `"${(item.fullName || '').replace(/"/g, '""')}"`,
        `"${item.participantType || ''}"`,
        `"${(item.department || '').replace(/"/g, '""')}"`,
        `"${(item.program || '').replace(/"/g, '""')}"`,
        `"${item.semester || ''}"`,
        `"${item.section || ''}"`,
        `"${item.day || 1}"`,
        `"${item.slotTime || ''}"`,
        `"${item.assignedGroup || ''}"`,
        `"${item.phone || ''}"`,
        `"${item.email || ''}"`,
        `"${item.githubUrl || ''}"`,
        `"${item.linkedinUrl || ''}"`,
        `"${techStr.replace(/"/g, '""')}"`,
        `"${(item.careerGoal || '').replace(/"/g, '""')}"`,
        `"${item.checkedIn ? 'YES' : 'NO'}"`,
        `"${item.checkedInTime || ''}"`,
        `"${(item.institutionName || '').replace(/"/g, '""')}"`,
        `"${(item.facultyCoordinator || '').replace(/"/g, '""')}"`
      ];
      rows.push(row.join(","));
    });

    const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(rows.join("\n"));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", csvContent);
    downloadAnchor.setAttribute("download", `Geeta_University_G_Connect_2026_Student_Database_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    RegistrationManager.showToast("Student database exported to CSV successfully! 📊", "success");
  },

  /* ------------------------------------------------------------------------
     3. COORDINATOR COMMAND HUB & GOLDEN RULES
     ------------------------------------------------------------------------ */
  openCoordinatorModal() {
    const modal = document.getElementById("coordinatorModal");
    if (!modal) return;
    this.renderCoordinatorRules();
    modal.classList.add("open");
  },

  closeCoordinatorModal() {
    const modal = document.getElementById("coordinatorModal");
    if (modal) modal.classList.remove("open");
  },

  renderCoordinatorRules() {
    const rulesBox = document.getElementById("goldenRulesContainer");
    if (!rulesBox) return;

    rulesBox.innerHTML = GOLDEN_RULES.map(rule => `
      <div class="golden-rule-item">
        <div class="rule-badge">#${rule.number}</div>
        <div class="rule-text">${rule.text}</div>
      </div>
    `).join("");
  },

  initCoordinatorChecklists() {
    const container = document.getElementById("coordChecklistItems");
    if (!container) return;

    const savedState = JSON.parse(localStorage.getItem("gconnect_coordinator_checklists") || "{}");

    container.innerHTML = Object.entries(COORDINATOR_CHECKLISTS).map(([categoryKey, items]) => {
      const categoryTitles = {
        beforeEvent: "1. Before Event (Stall Setup & Tech Check)",
        beforeEachSlot: "2. Before Each Slot (Reset & Flow)",
        afterEachSlot: "3. After Each Slot (Participation & Replenish)",
        endOfDay: "4. End of Day (Attendance & Equipment Lock)"
      };

      return `
        <div class="checklist-group">
          <h4>${categoryTitles[categoryKey] || categoryKey}</h4>
          <div class="checklist-items-grid">
            ${items.map((item, idx) => {
              const itemKey = `${categoryKey}_${idx}`;
              const isChecked = savedState[itemKey] || false;
              return `
                <label class="coord-chk-label">
                  <input type="checkbox" data-key="${itemKey}" ${isChecked ? 'checked' : ''} onchange="AdminDashboard.saveChecklistState(this)">
                  <span>${item}</span>
                </label>
              `;
            }).join("")}
          </div>
        </div>
      `;
    }).join("");
  },

  saveChecklistState(chk) {
    const savedState = JSON.parse(localStorage.getItem("gconnect_coordinator_checklists") || "{}");
    savedState[chk.getAttribute("data-key")] = chk.checked;
    localStorage.setItem("gconnect_coordinator_checklists", JSON.stringify(savedState));
  },

  /* ------------------------------------------------------------------------
     4. GOOGLE SHEETS WEBHOOK SETTINGS
     ------------------------------------------------------------------------ */
  openWebhookModal() {
    const modal = document.getElementById("webhookSettingsModal");
    const input = document.getElementById("webhookUrlInput");
    if (input) input.value = RegistrationManager.getWebhookUrl();
    if (modal) modal.classList.add("open");
  },

  closeWebhookModal() {
    const modal = document.getElementById("webhookSettingsModal");
    if (modal) modal.classList.remove("open");
  },

  saveWebhookUrl() {
    const input = document.getElementById("webhookUrlInput");
    const url = input ? input.value.trim() : "";

    if (!url) {
      RegistrationManager.setWebhookUrl("");
      RegistrationManager.showToast("Google Sheets Webhook URL cleared.", "info");
      this.closeWebhookModal();
      return;
    }

    if (!url.startsWith("https://script.google.com/macros/s/")) {
      RegistrationManager.showToast("Invalid URL. It must start with https://script.google.com/macros/s/", "error");
      return;
    }

    RegistrationManager.setWebhookUrl(url);
    RegistrationManager.showToast("Google Sheets Webhook connected successfully!", "success");
    this.closeWebhookModal();
  },

  async testWebhookConnection() {
    const input = document.getElementById("webhookUrlInput");
    const url = input ? input.value.trim() : RegistrationManager.getWebhookUrl();

    if (!url) {
      RegistrationManager.showToast("Please enter a Webhook URL first.", "warning");
      return;
    }

    try {
      RegistrationManager.showToast("Pinging Google Sheets Webhook...", "info");
      const testPayload = {
        testPing: true,
        timestamp: new Date().toISOString(),
        regId: "GC-TEST-PING",
        fullName: "Geeta Hub Test Sync",
        studentId: "GU-TEST-001",
        program: "B.Tech CSE"
      };

      await fetch(url, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(testPayload)
      });

      RegistrationManager.showToast("Webhook ping sent! Check your Google Sheet for test row.", "success");
    } catch (err) {
      RegistrationManager.showToast("Failed to ping webhook URL.", "error");
    }
  }
};
