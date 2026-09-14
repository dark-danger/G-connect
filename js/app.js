/**
 * GEETA UNIVERSITY & GEETA TECHNICAL HUB
 * G-CONNECT 2026 - MAIN CONTROLLER SCRIPT
 * Manages Zone Navigation, Stall Modals with 4-Step Framework, Schedule Matrix, Countdown & Interactions.
 */

document.addEventListener("DOMContentLoaded", () => {
  App.init();
  RegistrationManager.init();
  TicketGenerator.init();
  AdminDashboard.init();
});

const App = {
  activeZoneFilter: "all",
  activeScheduleDay: 1,

  init() {
    this.initCountdown();
    this.renderZonesOverview();
    this.renderStalls();
    this.renderSchedule();
    this.bindGlobalEvents();
  },

  /* ------------------------------------------------------------------------
     1. COUNTDOWN TIMER TO SEPT 8, 2026
     ------------------------------------------------------------------------ */
  initCountdown() {
    const eventDate = new Date("2026-09-08T09:30:00+05:30").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = eventDate - now;

      if (diff <= 0) {
        if (document.getElementById("cdDays")) document.getElementById("cdDays").textContent = "00";
        if (document.getElementById("cdHours")) document.getElementById("cdHours").textContent = "00";
        if (document.getElementById("cdMins")) document.getElementById("cdMins").textContent = "00";
        if (document.getElementById("cdSecs")) document.getElementById("cdSecs").textContent = "00";
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);

      const dEl = document.getElementById("cdDays");
      const hEl = document.getElementById("cdHours");
      const mEl = document.getElementById("cdMins");
      const sEl = document.getElementById("cdSecs");

      if (dEl) dEl.textContent = String(days).padStart(2, "0");
      if (hEl) hEl.textContent = String(hours).padStart(2, "0");
      if (mEl) mEl.textContent = String(mins).padStart(2, "0");
      if (sEl) sEl.textContent = String(secs).padStart(2, "0");
    };

    updateTimer();
    setInterval(updateTimer, 1000);
  },

  /* ------------------------------------------------------------------------
     2. 3-ZONE OVERVIEW CARDS
     ------------------------------------------------------------------------ */
  renderZonesOverview() {
    const container = document.getElementById("zonesOverviewGrid");
    if (!container) return;

    container.innerHTML = ZONES_DATA.map(zone => {
      const stallsInZone = STALLS_DATA.filter(s => zone.stallIds.includes(s.id));
      const stallNames = stallsInZone.map(s => s.shortName).join(" • ");

      return `
        <div class="zone-overview-card" style="--zone-color: ${zone.themeColor};" onclick="App.filterByZone('${zone.id}')">
          <div class="zone-card-top">
            <span class="zone-badge">ZONE ${zone.zoneNumber}</span>
            <div class="zone-icon-pill">${zone.icon}</div>
          </div>
          <h3 class="zone-title">${zone.name}</h3>
          <div class="zone-tagline">"${zone.tagline}"</div>
          <p class="zone-desc">${zone.description}</p>
          <div class="zone-stalls-preview">
            <span class="stalls-label">Stalls (${stallsInZone.length}):</span>
            <span class="stalls-list">${stallNames}</span>
          </div>
          <div class="zone-explore-action">
            <span>Explore Zone Stalls →</span>
          </div>
        </div>
      `;
    }).join("");
  },

  /* ------------------------------------------------------------------------
     3. 12 THEMED STALLS RENDERING & 4-STEP MODAL
     ------------------------------------------------------------------------ */
  renderStalls(filterZone = "all") {
    this.activeZoneFilter = filterZone;
    const grid = document.getElementById("stallsGrid");
    if (!grid) return;

    const filtered = filterZone === "all"
      ? STALLS_DATA.filter(s => !s.isSupportStall)
      : STALLS_DATA.filter(s => s.zoneId === filterZone && !s.isSupportStall);

    grid.innerHTML = filtered.map(stall => {
      const techTags = (stall.technologies || []).slice(0, 3).map(t => `<span class="stall-mini-tag">${t}</span>`).join("");

      return `
        <div class="glass-card stall-card" style="--stall-theme: ${stall.themeColor};" data-stall-id="${stall.id}">
          <div class="stall-card-header">
            <div class="stall-icon-wrap" style="background: ${stall.themeColor}22; border-color: ${stall.themeColor}44;">
              ${stall.icon}
            </div>
            <div style="text-align:right;">
              <span class="stall-number-pill">STALL #${stall.stallNumber}</span>
              <div style="font-size:0.75rem;color:var(--text-muted);margin-top:0.25rem;">${stall.zoneName.split('—')[0]}</div>
            </div>
          </div>

          <h3 class="stall-card-title">${stall.title}</h3>
          <p class="stall-purpose">${stall.purpose}</p>

          <div class="stall-activity-box">
            <div class="activity-label">
              <span>⚡</span> Suggested Live Activity:
            </div>
            <div class="activity-text">${stall.suggestedActivity}</div>
          </div>

          <div class="stall-tech-row">
            ${techTags}
          </div>

          <div class="stall-card-footer">
            <span class="badge badge-green">
              ${stall.badge}
            </span>
            <button class="btn btn-secondary btn-sm" onclick="App.openStallModal('${stall.id}')">
              4-Step Experience →
            </button>
          </div>
        </div>
      `;
    }).join("");
  },

  filterByZone(zoneId) {
    const buttons = document.querySelectorAll(".zone-filter-tab");
    buttons.forEach(btn => {
      if (btn.getAttribute("data-zone") === zoneId) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    this.renderStalls(zoneId);

    const stallsSection = document.getElementById("stalls");
    if (stallsSection) {
      stallsSection.scrollIntoView({ behavior: "smooth" });
    }
  },

  openStallModal(stallId) {
    const stall = STALLS_DATA.find(s => s.id === stallId);
    if (!stall) return;

    const modal = document.getElementById("stallDetailModal");
    const content = document.getElementById("stallModalBody");
    if (!modal || !content) return;

    content.innerHTML = `
      <div class="modal-stall-header" style="border-left: 4px solid #059669;">
        <div style="font-size:2.8rem;">${stall.icon}</div>
        <div style="flex:1;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span class="stall-number-pill">STALL #${stall.stallNumber}</span>
            <span class="badge badge-green">${stall.badge}</span>
          </div>
          <h2 style="font-size:1.6rem;margin-top:0.25rem;color:#09090b;font-weight:900;">${stall.title}</h2>
          <div style="font-size:0.85rem;color:var(--text-muted);">${stall.zoneName}</div>
        </div>
      </div>

      <div class="four-step-journey-wrap">
        <h3 class="four-step-title">
          <span>✨</span> The 4-Step Stall Experience Flow (~30 Mins)
        </h3>

        <!-- Step 1: DISCOVER -->
        <div class="step-journey-card step-discover">
          <div class="step-header">
            <span class="step-badge">STEP 1: DISCOVER</span>
            <span class="step-sub">What is this technology / skill?</span>
          </div>
          <p class="step-body">${stall.discover}</p>
        </div>

        <!-- Step 2: EXPERIENCE -->
        <div class="step-journey-card step-experience">
          <div class="step-header">
            <span class="step-badge">STEP 2: EXPERIENCE</span>
            <span class="step-sub">Live demo, project, tool or hands-on activity</span>
          </div>
          <p class="step-body">${stall.experience}</p>
          <div class="step-tech-list">
            <strong>Key Tools & Platforms:</strong> ${(stall.technologies || []).join(", ")}
          </div>
        </div>

        <!-- Step 3: CHALLENGE (INTERACTIVE) -->
        <div class="step-journey-card step-challenge">
          <div class="step-header">
            <span class="step-badge">STEP 3: CHALLENGE</span>
            <span class="step-sub">${stall.challenge.title}</span>
          </div>
          <div class="interactive-challenge-box">
            <div class="challenge-question">❓ ${stall.challenge.prompt}</div>
            <div class="challenge-options-grid">
              ${stall.challenge.options.map((opt, idx) => `
                <button class="challenge-opt-btn" onclick="App.checkChallengeAnswer(this, ${idx}, ${stall.challenge.correctIndex}, '${encodeURIComponent(stall.challenge.explanation)}')">
                  <span class="opt-letter">${String.fromCharCode(65 + idx)}</span>
                  <span>${opt}</span>
                </button>
              `).join("")}
            </div>
            <div class="challenge-result-feedback" id="challengeFeedbackBox" style="display:none;"></div>
          </div>
        </div>

        <!-- Step 4: CONNECT -->
        <div class="step-journey-card step-connect">
          <div class="step-header">
            <span class="step-badge">STEP 4: CONNECT</span>
            <span class="step-sub">Career pathway, certification, placement & next steps</span>
          </div>
          <p class="step-body">${stall.connect}</p>
        </div>
      </div>

      <div class="modal-stall-footer-meta">
        <div>
          <span style="font-size:0.8rem;color:var(--text-muted);">Coordinator Team:</span>
          <div style="font-size:0.85rem;font-weight:500;">${stall.coordinatorLead}</div>
        </div>
        <div>
          <span style="font-size:0.8rem;color:var(--text-muted);">Technical Contingency:</span>
          <div style="font-size:0.85rem;color:var(--accent-amber);">${stall.contingencyPlan}</div>
        </div>
      </div>
    `;

    modal.classList.add("open");
  },

  closeStallModal() {
    const modal = document.getElementById("stallDetailModal");
    if (modal) modal.classList.remove("open");
  },

  checkChallengeAnswer(btn, selectedIndex, correctIndex, encodedExplanation) {
    const parent = btn.parentElement;
    const buttons = parent.querySelectorAll(".challenge-opt-btn");
    buttons.forEach(b => b.disabled = true);

    const feedbackBox = document.getElementById("challengeFeedbackBox");
    const explanation = decodeURIComponent(encodedExplanation);

    if (selectedIndex === correctIndex) {
      btn.classList.add("correct");
      if (feedbackBox) {
        feedbackBox.style.display = "block";
        feedbackBox.className = "challenge-result-feedback correct-feedback";
        feedbackBox.innerHTML = `🎉 <strong>Correct!</strong> ${explanation}`;
      }
      if (window.confetti) {
        window.confetti({ particleCount: 50, spread: 50 });
      }
    } else {
      btn.classList.add("wrong");
      buttons[correctIndex].classList.add("correct");
      if (feedbackBox) {
        feedbackBox.style.display = "block";
        feedbackBox.className = "challenge-result-feedback wrong-feedback";
        feedbackBox.innerHTML = `⚠️ <strong>Not quite.</strong> ${explanation}`;
      }
    }
  },

  /* ------------------------------------------------------------------------
     4. STANDARDIZED 11-SLOT SCHEDULE MATRIX
     ------------------------------------------------------------------------ */
  renderSchedule(dayNumber = 1) {
    this.activeScheduleDay = dayNumber;
    const container = document.getElementById("scheduleTableContainer");
    const headerInfo = document.getElementById("scheduleDayHeaderInfo");
    if (!container) return;

    const dayConfig = EVENT_DAYS_CONFIG.find(d => d.dayNumber === dayNumber) || EVENT_DAYS_CONFIG[0];

    if (headerInfo) {
      headerInfo.innerHTML = `
        <div class="sched-info-box">
          <div class="sched-date-title">${dayConfig.dayName} • ${dayConfig.date}</div>
          <div class="sched-audience-target">${dayConfig.targetAudience}</div>
          <div class="sched-stats-pills">
            <span class="sched-pill">11 Standard Slots (~30m each)</span>
            <span class="sched-pill">Cohort: ${dayConfig.totalStudents} Students</span>
            <span class="sched-pill">Batches: ${dayConfig.totalGroups} Groups (~10 std/group)</span>
            <span class="sched-pill status-pill">${dayConfig.status}</span>
          </div>
        </div>
      `;
    }

    if (dayNumber === 1) {
      container.innerHTML = `
        <div class="table-responsive">
          <table class="schedule-matrix-table">
            <thead>
              <tr>
                <th>Slot</th>
                <th>Timing</th>
                <th>Program</th>
                <th>Semester</th>
                <th>Section</th>
                <th>Strength</th>
                <th>Groups</th>
                <th>Pacing & Notes</th>
              </tr>
            </thead>
            <tbody>
              ${CSE_DAY1_SCHEDULE.map(slot => {
                if (slot.isBreak) {
                  return `
                    <tr class="schedule-break-row">
                      <td colspan="8">
                        <div class="break-content">
                          <span>🍱</span> <strong>${slot.program} (${slot.time})</strong> — ${slot.notes}
                        </div>
                      </td>
                    </tr>
                  `;
                }

                return `
                  <tr class="${slot.heaviest ? 'heavy-slot-row' : ''}">
                    <td><strong class="slot-tag">Slot ${slot.slotNumber}</strong></td>
                    <td class="slot-time-col">${slot.time}</td>
                    <td><strong>${slot.program}</strong></td>
                    <td><span class="sem-tag">${slot.semester}</span></td>
                    <td><span class="sec-tag">${slot.section}</span></td>
                    <td><span class="strength-num">${slot.students}</span></td>
                    <td><span class="group-range-badge">${slot.groupRange} (${slot.groups})</span></td>
                    <td class="slot-notes-col">${slot.notes}</td>
                  </tr>
                `;
              }).join("")}
            </tbody>
          </table>
        </div>
      `;
    } else {
      container.innerHTML = `
        <div class="schedule-tbf-card">
          <div style="font-size:2.5rem;margin-bottom:0.75rem;">📋</div>
          <h3>${dayConfig.targetAudience}</h3>
          <p style="color:var(--text-muted);max-width:650px;margin:0 auto 1.5rem;">
            Following the standardized 11-slot (~30-minute) model (Slots 1 to 11, 9:30 AM – 4:00 PM with Lunch break at 12:30 PM). Specific department-wise student section allocations are marked <strong>TBF (To Be Finalized)</strong> pending enrollment figures.
          </p>
          <div class="tbf-specs-grid">
            <div class="tbf-spec-item">
              <span class="tbf-label">Slots Per Day</span>
              <span class="tbf-val">11 Slots</span>
            </div>
            <div class="tbf-spec-item">
              <span class="tbf-label">Slot Duration</span>
              <span class="tbf-val">~30 Minutes</span>
            </div>
            <div class="tbf-spec-item">
              <span class="tbf-label">Group Rotation Size</span>
              <span class="tbf-val">~10 Students / Group</span>
            </div>
            <div class="tbf-spec-item">
              <span class="tbf-label">Estimated Day Strength</span>
              <span class="tbf-val">${dayConfig.totalStudents}</span>
            </div>
          </div>
        </div>
      `;
    }
  },

  switchScheduleDay(dayNum) {
    const tabs = document.querySelectorAll(".sched-day-tab");
    tabs.forEach(t => {
      if (parseInt(t.getAttribute("data-day")) === dayNum) {
        t.classList.add("active");
      } else {
        t.classList.remove("active");
      }
    });
    this.renderSchedule(dayNum);
  },

  /* ------------------------------------------------------------------------
     5. GLOBAL UI & EVENT LISTENERS
     ------------------------------------------------------------------------ */
  bindGlobalEvents() {
    // Zone filter tabs
    const zoneTabs = document.querySelectorAll(".zone-filter-tab");
    zoneTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        zoneTabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        this.renderStalls(tab.getAttribute("data-zone"));
      });
    });

    // Schedule Day tabs
    const dayTabs = document.querySelectorAll(".sched-day-tab");
    dayTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        const day = parseInt(tab.getAttribute("data-day"));
        this.switchScheduleDay(day);
      });
    });

    // Mobile nav toggle
    const mobileBtn = document.getElementById("mobileNavToggle");
    const navLinks = document.getElementById("navLinks");
    if (mobileBtn && navLinks) {
      mobileBtn.addEventListener("click", () => {
        navLinks.classList.toggle("open");
      });

      // Close on link click
      navLinks.querySelectorAll("a").forEach(a => {
        a.addEventListener("click", () => navLinks.classList.remove("open"));
      });
    }

    // Modal Close buttons
    const closeStallModalBtn = document.getElementById("closeStallModalBtn");
    if (closeStallModalBtn) {
      closeStallModalBtn.addEventListener("click", () => this.closeStallModal());
    }

    // Close Modals on background click
    document.querySelectorAll(".modal-overlay").forEach(modal => {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.classList.remove("open");
        }
      });
    });

    // Keyboard ESC to close all open modals
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        document.querySelectorAll(".modal-overlay.open").forEach(m => m.classList.remove("open"));
      }
    });

    // FAQ Accordion
    document.querySelectorAll(".faq-question").forEach(q => {
      q.addEventListener("click", () => {
        const item = q.parentElement;
        item.classList.toggle("active");
      });
    });
  }
};
