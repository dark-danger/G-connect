/**
 * GEETA UNIVERSITY & GEETA TECHNICAL HUB
 * G-CONNECT 2026 - DIGITAL ENTRY PASS & 12-STALL PASSPORT GENERATOR
 */

const TicketGenerator = {
  currentActiveRecord: null,

  init() {
    this.bindEvents();
  },

  bindEvents() {
    // Close Pass Modal
    const closePassBtn = document.getElementById("closePassModalBtn");
    if (closePassBtn) {
      closePassBtn.addEventListener("click", () => this.closePassModal());
    }

    // Close Passport Modal
    const closePassportBtn = document.getElementById("closePassportModalBtn");
    if (closePassportBtn) {
      closePassportBtn.addEventListener("click", () => this.closePassportModal());
    }

    // Download Pass as Image
    const downloadBtn = document.getElementById("downloadPassBtn");
    if (downloadBtn) {
      downloadBtn.addEventListener("click", () => this.downloadPassImage());
    }

    // Print Pass
    const printBtn = document.getElementById("printPassBtn");
    if (printBtn) {
      printBtn.addEventListener("click", () => window.print());
    }

    // Open Passport Button from Pass
    const openPassportBtn = document.getElementById("openPassportFromPassBtn");
    if (openPassportBtn) {
      openPassportBtn.addEventListener("click", () => {
        this.closePassModal();
        if (this.currentActiveRecord) {
          this.openDigitalPassport(this.currentActiveRecord);
        }
      });
    }
  },

  generatePass(record) {
    this.currentActiveRecord = record;
    const modal = document.getElementById("ticketModal");
    if (!modal) return;

    // Populate Pass Fields
    const elName = document.getElementById("passStudentName");
    const elId = document.getElementById("passStudentId");
    const elReg = document.getElementById("passRegId");
    const elDept = document.getElementById("passDepartment");
    const elProg = document.getElementById("passProgram");
    const elSlot = document.getElementById("passSlotTime");
    const elGroup = document.getElementById("passGroupBadge");
    const elDay = document.getElementById("passDayBadge");
    const elInterests = document.getElementById("passInterests");
    const elRole = document.getElementById("passRolePill");
    const elCheckinStatus = document.getElementById("passCheckinStatus");
    const isFaculty = (record.participantType === "school_faculty" || record.participantType === "faculty_coordinator");

    if (elName) elName.textContent = record.fullName;
    if (elId) elId.textContent = record.studentId || record.regId;
    if (elReg) elReg.textContent = record.regId;
    if (elDept) elDept.textContent = record.department || "Geeta University";
    if (elProg) {
      if (isFaculty) {
        elProg.textContent = `${record.designation || "Faculty Member"} • ${record.facultyRole || "Mentor / Evaluator"}`;
      } else {
        elProg.textContent = `${record.program} (${record.semester || "1st Sem"} - Sec ${record.section || "A"})`;
      }
    }
    if (elSlot) elSlot.textContent = record.slotTime || `Slot ${record.slotNumber || 1}`;
    if (elGroup) {
      elGroup.textContent = isFaculty ? (record.assignedGroup || "Faculty Mentor") : `Group ${record.assignedGroup || "G1"}`;
    }
    if (elDay) elDay.textContent = `Day ${record.day || 1} • Sept ${7 + (record.day || 1)}, 2026`;
    if (elRole) {
      elRole.textContent = isFaculty ? "Faculty of the School" : "School Student";
    }

    if (elCheckinStatus) {
      if (record.checkedIn) {
        elCheckinStatus.innerHTML = `<span class="badge badge-success">✓ Campus Checked-In</span>`;
      } else {
        elCheckinStatus.innerHTML = `<span class="badge badge-amber">Gate Pass Ready (Pending Arrival)</span>`;
      }
    }

    if (elInterests) {
      const interests = record.techInterests || ["FSD", "AI & Agentic AI"];
      elInterests.innerHTML = interests.map(t => `<span class="pass-tech-pill">${t}</span>`).join("");
    }

    // Render High-Res QR Code
    const qrContainer = document.getElementById("passQrCodeContainer");
    if (qrContainer) {
      qrContainer.innerHTML = "";
      const qrPayload = JSON.stringify({
        regId: record.regId,
        studentId: record.studentId,
        name: record.fullName,
        slot: record.slotTime,
        group: record.assignedGroup,
        day: record.day,
        verifiedBy: "Geeta Technical Hub"
      });

      if (window.QRCode) {
        new QRCode(qrContainer, {
          text: qrPayload,
          width: 140,
          height: 140,
          colorDark: "#09090b",
          colorLight: "#ffffff",
          correctLevel: QRCode.CorrectLevel.M
        });
      }
    }

    modal.classList.add("open");
  },

  closePassModal() {
    const modal = document.getElementById("ticketModal");
    if (modal) modal.classList.remove("open");
  },

  async downloadPassImage() {
    const passElement = document.getElementById("printablePassCard");
    if (!passElement || !window.html2canvas) {
      RegistrationManager.showToast("Preparing printable pass...", "info");
      return;
    }

    try {
      RegistrationManager.showToast("Generating high-resolution pass image...", "info");
      const canvas = await html2canvas(passElement, {
        scale: 2,
        backgroundColor: "#09090b",
        useCORS: true
      });
      const link = document.createElement("a");
      link.download = `G-Connect-2026-Pass-${this.currentActiveRecord ? this.currentActiveRecord.regId : "Pass"}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      RegistrationManager.showToast("Pass downloaded successfully!", "success");
    } catch (err) {
      console.error("Pass image generation failed:", err);
      RegistrationManager.showToast("Failed to export image. You can use Print instead.", "error");
    }
  },

  /* ------------------------------------------------------------------------
     12-STALL DIGITAL PASSPORT SYSTEM
     ------------------------------------------------------------------------ */
  openDigitalPassport(record) {
    this.currentActiveRecord = record;
    const modal = document.getElementById("passportModal");
    if (!modal) return;

    const passportStudentName = document.getElementById("passportStudentName");
    const passportStudentInfo = document.getElementById("passportStudentInfo");
    const passportRegId = document.getElementById("passportRegId");

    if (passportStudentName) passportStudentName.textContent = record.fullName;
    if (passportStudentInfo) passportStudentInfo.textContent = `${record.program} • ${record.studentId || record.regId} • Group ${record.assignedGroup}`;
    if (passportRegId) passportRegId.textContent = record.regId;

    this.renderPassportGrid(record);
    modal.classList.add("open");
  },

  closePassportModal() {
    const modal = document.getElementById("passportModal");
    if (modal) modal.classList.remove("open");
  },

  renderPassportGrid(record) {
    const grid = document.getElementById("passportStallsGrid");
    const progressBar = document.getElementById("passportProgressBar");
    const progressCount = document.getElementById("passportProgressCount");
    const certBanner = document.getElementById("passportCertUnlockBanner");

    if (!grid) return;

    const visited = record.visitedStalls || [];
    const totalStalls = STALLS_DATA.filter(s => !s.isSupportStall).length; // 12 stalls

    // Update Progress
    const visitedCount = visited.length;
    const percent = Math.min(100, Math.round((visitedCount / totalStalls) * 100));

    if (progressBar) progressBar.style.width = `${percent}%`;
    if (progressCount) progressCount.textContent = `${visitedCount} / ${totalStalls} Stalls Verified`;

    if (certBanner) {
      if (visitedCount >= 6) {
        certBanner.style.display = "block";
      } else {
        certBanner.style.display = "none";
      }
    }

    grid.innerHTML = STALLS_DATA.filter(s => !s.isSupportStall).map(stall => {
      const isStamped = visited.includes(stall.id);
      return `
        <div class="passport-stall-box ${isStamped ? 'stamped' : ''}" onclick="TicketGenerator.togglePassportStamp('${stall.id}')">
          <div class="passport-box-header">
            <span class="passport-stall-num">#${stall.stallNumber}</span>
            <span class="passport-zone-pill">${stall.zoneName.split('—')[0]}</span>
          </div>
          <div class="passport-icon">${stall.icon}</div>
          <div class="passport-title">${stall.shortName}</div>
          
          <div class="passport-stamp-seal">
            ${isStamped 
              ? `<div class="stamp-verified"><span>VERIFIED</span><small>GEETA HUB</small></div>` 
              : `<div class="stamp-unverified">TAP TO STAMP</div>`}
          </div>
        </div>
      `;
    }).join("");
  },

  togglePassportStamp(stallId) {
    if (!this.currentActiveRecord) return;
    
    let visited = this.currentActiveRecord.visitedStalls || [];
    if (visited.includes(stallId)) {
      visited = visited.filter(id => id !== stallId);
    } else {
      visited.push(stallId);
      RegistrationManager.showToast(`Stall stamp verified! 🎉`, "success");
    }

    this.currentActiveRecord.visitedStalls = visited;
    RegistrationManager.updateRegistration(this.currentActiveRecord.regId, {
      visitedStalls: visited
    });

    this.renderPassportGrid(this.currentActiveRecord);
  },

  generateCertificate() {
    if (!this.currentActiveRecord) return;
    
    const record = this.currentActiveRecord;
    const certModal = document.getElementById("certificateModal");
    if (!certModal) {
      alert(`🎉 Congratulations ${record.fullName}! You have successfully completed your G-Connect 2026 Journey!`);
      return;
    }

    document.getElementById("certHolderName").textContent = record.fullName;
    document.getElementById("certHolderId").textContent = record.studentId || record.regId;
    document.getElementById("certHolderDept").textContent = record.department;
    document.getElementById("certStallCount").textContent = `${(record.visitedStalls || []).length} Themed Stalls Completed`;
    document.getElementById("certIssueDate").textContent = `Issued: September 8–11, 2026`;

    certModal.classList.add("open");
  }
};
