/**
 * GEETA UNIVERSITY & GEETA TECHNICAL HUB
 * G-CONNECT 2026 - OFFICIAL STALLS, ZONES & SCHEDULE DATA
 * Theme: "EXPLORE – BUILD – CONNECT" (8 – 11 September 2026)
 * Tagline: "Technology • Career Readiness • Opportunities"
 */

const GCONNECT_CONFIG = {
  eventName: "G-CONNECT 2026",
  university: "Geeta University",
  hub: "Geeta Technical Hub",
  tagline: "Technology • Career Readiness • Opportunities",
  dates: "8 – 11 September 2026",
  durationDays: 4,
  totalZones: 3,
  totalStalls: 12,
  supportStallNumber: 13,
  totalSlots: 44, // 11 slots/day x 4 days
  slotsPerDay: 11,
  slotDurationMinutes: 30,
  targetCohortDay1: 861,
  totalGroupsDay1: 91,
  groupSizeAvg: 10
};

// 3 ZONES DEFINITION
const ZONES_DATA = [
  {
    id: "zone-1",
    zoneNumber: 1,
    name: "EXPLORE: FUTURE TECH",
    tagline: "Discover What's Next",
    themeColor: "#059669", // Rich Emerald Green
    gradient: "linear-gradient(135deg, rgba(5, 150, 105, 0.15) 0%, rgba(16, 185, 129, 0.25) 100%)",
    icon: "🚀",
    description: "Immerse in cutting-edge emerging technologies through live interactive demonstrations, in-house code demos, and hands-on experimental sandboxes.",
    stallIds: ["fsd", "ai-agentic", "cyber-security", "quantum", "cloud-devops"]
  },
  {
    id: "zone-2",
    zoneNumber: 2,
    name: "BUILD: CAREER READINESS",
    tagline: "Build the Skills That Get You Hired",
    themeColor: "#09090b", // Obsidian Black
    gradient: "linear-gradient(135deg, rgba(9, 9, 11, 0.12) 0%, rgba(24, 24, 27, 0.25) 100%)",
    icon: "🛠️",
    description: "Sharpen placement-focused core skills from data engineering to aptitude drills, mock interviews, LinkedIn/GitHub optimization, and open-source contributions.",
    stallIds: ["data-analytics", "apt-reasoning", "comm-interview", "profile-branding", "social-coding"]
  },
  {
    id: "zone-3",
    zoneNumber: 3,
    name: "CONNECT: OPPORTUNITIES",
    tagline: "Turn Your Skills into Opportunities",
    themeColor: "#10b981", // Vibrant Spring Green
    gradient: "linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.25) 100%)",
    icon: "🌐",
    description: "Connect your hands-on learning with campus Centres of Excellence, global industry certifications, high-paying corporate placements, and internship pathways.",
    stallIds: ["coe-certifications", "placements-industry"]
  }
];

// 12 THEMED STALLS + STALL 13 (SUPPORT)
const STALLS_DATA = [
  // ZONE 1: EXPLORE
  {
    id: "fsd",
    stallNumber: 1,
    zoneId: "zone-1",
    zoneName: "Zone 1 — Explore: Future Tech",
    title: "FSD (Full Stack Development)",
    shortName: "Full Stack Dev",
    icon: "💻",
    themeColor: "#38bdf8",
    badge: "Core Engineering",
    purpose: "Showcase in-house web/app projects, live coding demos, and introduction to modern frontend and backend development.",
    suggestedActivity: "UI/Web Challenge",
    
    // 4-Step Stall Experience Model
    discover: "Understand modern full-stack architectures: Component-based UI, REST & GraphQL APIs, microservices, and database layers that power modern high-scale apps.",
    experience: "Explore live in-house Geeta University student projects, inspect responsive web apps, and participate in live paired code refactoring demos on React & Node.js.",
    challenge: {
      title: "UI/Web Rapid Challenge",
      type: "code-quiz",
      prompt: "Which CSS layout method is most suitable for a 2-dimensional grid layout?",
      options: ["CSS Flexbox", "CSS Grid Layout", "Float Layout", "Absolute Positioning"],
      correctIndex: 1,
      explanation: "CSS Grid is designed specifically for two-dimensional layout systems (both columns and rows simultaneously)."
    },
    connect: "Leads to Full Stack Developer, Frontend Engineer, and Backend Specialist roles. Industry CTCs range from ₹6 LPA to ₹18+ LPA. Pathway: Geeta Web Dev Bootcamp & Hackathons.",
    
    technologies: ["React.js", "Next.js", "Node.js", "Express", "PostgreSQL", "TailwindCSS", "REST APIs"],
    coordinatorLead: "Faculty Coordinator (FSD Lab Lead) & 4 Student Volunteers",
    contingencyPlan: "Plan A: Live Web Deployment demo on Vercel. Plan B: Offline Localhost Node server. Plan C: Pre-recorded demo video & slide deck."
  },
  {
    id: "ai-agentic",
    stallNumber: 2,
    zoneId: "zone-1",
    zoneName: "Zone 1 — Explore: Future Tech",
    title: "AI & Agentic AI",
    shortName: "AI & Agentic AI",
    icon: "🤖",
    themeColor: "#a855f7",
    badge: "High Trend",
    purpose: "Showcase AI tools, Generative AI and Agentic AI applications through in-house projects, live demonstrations, prompt engineering, and AI agent workflows.",
    suggestedActivity: "Prompt Engineering / AI Agent Challenge",
    
    discover: "Discover how Generative AI, Large Language Models (LLMs), and Autonomous Multi-Agent Systems are transforming software development and enterprise workflows.",
    experience: "Interact with Geeta University in-house AI Agents, test automated reasoning workflows, and see multi-agent collaboration solving live coding & research tasks.",
    challenge: {
      title: "Prompt Engineering / AI Agent Challenge",
      type: "prompt-battle",
      prompt: "In Agentic AI architecture, what primary component enables an autonomous agent to interact with external databases and APIs?",
      options: ["Context Window Tokenizer", "Tool Calling / Function Execution Engine", "Temperature Parameter", "Vector Embedding Index only"],
      correctIndex: 1,
      explanation: "Tool calling / function calling gives autonomous AI agents the capability to execute API requests, query databases, and perform external tasks."
    },
    connect: "Prepares students for AI Engineer, Agentic Workflow Developer, and Prompt Specialist careers with compensation ranging ₹10 LPA to ₹28+ LPA.",
    
    technologies: ["LangChain", "CrewAI", "Gemini API", "OpenAI API", "Vector Databases", "Python AI", "Hugging Face"],
    coordinatorLead: "Faculty Coordinator (AI/ML Lead) & 4 Student Volunteers",
    contingencyPlan: "Plan A: Live API Agent execution. Plan B: Local Ollama / TinyLlama offline model. Plan C: Screen recording of multi-agent execution."
  },
  {
    id: "cyber-security",
    stallNumber: 3,
    zoneId: "zone-1",
    zoneName: "Zone 1 — Explore: Future Tech",
    title: "Cyber Security",
    shortName: "Cyber Security",
    icon: "🛡️",
    themeColor: "#ef4444",
    badge: "Critical Domain",
    purpose: "Create awareness of cybersecurity fundamentals through controlled demonstrations of vulnerabilities, threats, and safe coding practices.",
    suggestedActivity: "Spot the Threat / Phishing Awareness Challenge",
    
    discover: "Learn the foundational principles of ethical hacking, network defense, threat modeling, and OWASP Top 10 web application vulnerabilities.",
    experience: "Live sandbox demonstration of SQL Injection detection, packet sniffing with Wireshark, password hashing audits, and anti-phishing defense.",
    challenge: {
      title: "Spot the Threat / Phishing Challenge",
      type: "threat-spotter",
      prompt: "Identify the biggest red flag in this simulated incoming email: 'From: support@gееta-univ-auth.tk | Subject: Immediate Password Reset Required'",
      options: ["Urgent threatening tone & lookalike domain (.tk / punycode)", "Professional logo in email footer", "Valid HTTPS link", "Standard corporate greeting"],
      correctIndex: 0,
      explanation: "Lookalike phishing domains (typosquatting/.tk) combined with manufactured urgency are classic hallmarks of credential-harvesting phishing attacks."
    },
    connect: "Career pathways include SOC Analyst, Penetration Tester, Security Consultant, and Cyber Defense Engineer (Entry CTC: ₹8-20 LPA). Pathway: CEH & CompTIA Security+ certifications.",
    
    technologies: ["Wireshark", "Burp Suite", "Kali Linux", "OWASP ZAP", "Metasploit", "Cryptography"],
    coordinatorLead: "Faculty Coordinator (Cyber Lab Lead) & 3 Student Volunteers",
    contingencyPlan: "Plan A: Live sandboxed CTF demo. Plan B: Offline isolated VM attack-defense simulator. Plan C: Interactive threat detection slides."
  },
  {
    id: "quantum",
    stallNumber: 4,
    zoneId: "zone-1",
    zoneName: "Zone 1 — Explore: Future Tech",
    title: "Quantum Computing",
    shortName: "Quantum Computing",
    icon: "⚛️",
    themeColor: "#6366f1",
    badge: "Next-Gen Frontier",
    purpose: "Introduce quantum computing concepts, emerging applications, and hands-on demonstrations of quantum circuits and basic algorithms.",
    suggestedActivity: "Quantum Circuit Challenge",
    
    discover: "Understand qubits, superposition, quantum entanglement, and how quantum algorithms solve complex optimization and cryptographic problems exponentially faster.",
    experience: "Hands-on quantum circuit builder on IBM Qiskit simulator, visualizing Bloch spheres and running Deutsch-Jozsa and Bell State simulations.",
    challenge: {
      title: "Quantum Circuit Challenge",
      type: "quantum-circuit",
      prompt: "What quantum logic gate puts a standard qubit state |0⟩ into an equal superposition of (|0⟩ + |1⟩)/√2?",
      options: ["Pauli-X Gate (NOT)", "Hadamard (H) Gate", "CNOT Gate", "Phase (S) Gate"],
      correctIndex: 1,
      explanation: "The Hadamard (H) gate transforms a basis state into a balanced quantum superposition state."
    },
    connect: "Prepares students for future roles in Quantum Software Engineering, Quantum Cryptography, and Deep Tech Research at global research labs.",
    
    technologies: ["IBM Qiskit", "PennyLane", "Quantum Circuits", "Bloch Sphere", "Python Quantum SDK"],
    coordinatorLead: "Faculty Coordinator (Advanced Tech Lead) & 3 Student Volunteers",
    contingencyPlan: "Plan A: Live IBM Quantum Cloud circuit execution. Plan B: Local Python Qiskit Aer simulator. Plan C: Interactive Quantum visualizer slides."
  },
  {
    id: "cloud-devops",
    stallNumber: 5,
    zoneId: "zone-1",
    zoneName: "Zone 1 — Explore: Future Tech",
    title: "Cloud & DevOps",
    shortName: "Cloud & DevOps",
    icon: "☁️",
    themeColor: "#0284c7",
    badge: "Industry Standard",
    purpose: "Introduce cloud platforms, deployment, DevOps practices, and the difference between personal projects and production environments.",
    suggestedActivity: "Cloud Architecture / Deployment Challenge",
    
    discover: "Demystify cloud infrastructure (AWS/GCP/Azure), containerization with Docker, Kubernetes orchestration, and automated CI/CD deployment pipelines.",
    experience: "Live container build demo: Push a code change to GitHub, trigger an automated GitHub Actions CI pipeline, and watch zero-downtime containerized deployment.",
    challenge: {
      title: "Cloud Architecture & Deployment Challenge",
      type: "cloud-quiz",
      prompt: "In modern cloud-native architectures, what is the primary benefit of containerization with Docker over traditional virtual machines?",
      options: ["Lighter weight, shared host OS kernel, and instant spin-up times", "Containers emulate entire hardware chipsets", "Containers eliminate need for networking", "Containers only run on Linux servers"],
      correctIndex: 0,
      explanation: "Docker containers share the host operating system kernel, making them significantly lighter and faster to spin up than full hardware-virtualized VMs."
    },
    connect: "Direct entry to DevOps Engineer, Cloud Solutions Architect, and SRE (Site Reliability Engineer) with packages ₹8 LPA to ₹22+ LPA.",
    
    technologies: ["AWS", "Google Cloud", "Docker", "Kubernetes", "GitHub Actions", "Terraform", "Linux"],
    coordinatorLead: "Faculty Coordinator (Cloud Systems Lead) & 4 Student Volunteers",
    contingencyPlan: "Plan A: Live Cloud pipeline deployment. Plan B: Local Docker Desktop container spin-up. Plan C: Visual Cloud Architecture walkthrough."
  },

  // ZONE 2: BUILD
  {
    id: "data-analytics",
    stallNumber: 6,
    zoneId: "zone-2",
    zoneName: "Zone 2 — Build: Career Readiness",
    title: "Data & Analytics",
    shortName: "Data & Analytics",
    icon: "📊",
    themeColor: "#f59e0b",
    badge: "High Growth",
    purpose: "Introduce Data Analytics, Data Science and Data Engineering, showing how data becomes insights, predictions and real-world solutions.",
    suggestedActivity: "Data Detective Challenge",
    
    discover: "Understand the end-to-end data lifecycle: Ingestion, cleaning, exploratory data analysis (EDA), statistical modeling, and interactive executive dashboards.",
    experience: "Analyze a real-world e-commerce & campus dataset in real-time with Python Pandas and interactive PowerBI/Looker charts to uncover actionable trends.",
    challenge: {
      title: "Data Detective Challenge",
      type: "data-puzzle",
      prompt: "A dataset has 10,000 rows. Column 'Salary' has extreme outliers (up to ₹50 Cr) due to data entry errors. Which measure of central tendency is most robust to report?",
      options: ["Mean (Arithmetic Average)", "Median (Middle Value)", "Standard Deviation", "Variance"],
      correctIndex: 1,
      explanation: "The median is robust against extreme outliers and skewed distributions, unlike the mean which gets dragged by extreme values."
    },
    connect: "Career roles: Data Analyst, BI Developer, Data Scientist, Data Engineer. Entry CTC ₹7 LPA to ₹19+ LPA. Pathway: Geeta Data Lab & BigQuery projects.",
    
    technologies: ["Python (Pandas, NumPy)", "SQL / BigQuery", "PowerBI", "Tableau", "Scikit-Learn", "Jupyter"],
    coordinatorLead: "Faculty Coordinator (Data Science Lead) & 4 Student Volunteers",
    contingencyPlan: "Plan A: Live BigQuery/PowerBI interactive query. Plan B: Local Jupyter Notebook offline dataset. Plan C: Case study infographic display."
  },
  {
    id: "apt-reasoning",
    stallNumber: 7,
    zoneId: "zone-2",
    zoneName: "Zone 2 — Build: Career Readiness",
    title: "APT & Logical Reasoning",
    shortName: "Aptitude & Logic",
    icon: "🧠",
    themeColor: "#ec4899",
    badge: "Placement Core",
    purpose: "Conduct quick aptitude and logical reasoning challenges focused on problem-solving and placement preparation.",
    suggestedActivity: "Quick Aptitude Challenge",
    
    discover: "Master the speed-math tricks, pattern recognition, syllogisms, and algorithmic reasoning necessary to clear Tier-1 corporate recruitment elimination rounds.",
    experience: "3-minute lightning buzzer round test with instant scoreboard ranking, speed calculations, and analytical shortcuts.",
    challenge: {
      title: "Quick Aptitude Challenge",
      type: "speed-aptitude",
      prompt: "If a train traveling at 72 km/h crosses a 200m long platform in 25 seconds, what is the length of the train?",
      options: ["300 meters", "250 meters", "200 meters", "350 meters"],
      correctIndex: 0,
      explanation: "Speed = 72 * (5/18) = 20 m/s. Total distance in 25s = 20 * 25 = 500m. Train length = 500 - 200 = 300 meters."
    },
    connect: "Critical for clearing Day 1 placement test rounds for TCS Ninja/Digital, Infosys, Wipro, Capgemini, Amazon, and product companies.",
    
    technologies: ["Quantitative Aptitude", "Logical Reasoning", "Data Interpretation", "Speed Math", "Cognitive Assessment"],
    coordinatorLead: "Faculty Coordinator (Placement Aptitude Lead) & 3 Student Volunteers",
    contingencyPlan: "Plan A: Digital interactive buzzer quiz. Plan B: Offline paper-based flash speed cards. Plan C: Formula handbook handouts."
  },
  {
    id: "comm-interview",
    stallNumber: 8,
    zoneId: "zone-2",
    zoneName: "Zone 2 — Build: Career Readiness",
    title: "Communication & Interview Skills",
    shortName: "Communication & GD",
    icon: "🎙️",
    themeColor: "#14b8a6",
    badge: "Essential Soft Skill",
    purpose: "Develop communication, interview, presentation and professional interaction skills relevant to placements.",
    suggestedActivity: "30-Second Introduction / Interview Challenge",
    
    discover: "Learn how to master the STAR method (Situation, Task, Action, Result), body language, pitch delivery, and Group Discussion (GD) leadership techniques.",
    experience: "Step up to the live mock interview mic for a 30-Second Elevator Pitch with instant AI/Faculty feedback on confidence, clarity, and articulation.",
    challenge: {
      title: "30-Second Elevator Pitch Challenge",
      type: "interview-challenge",
      prompt: "When answering 'Tell me about yourself' in a technical interview, what should comprise 70% of your time?",
      options: ["Schooling and childhood background", "Relevant projects, technical skills, and problem-solving impact", "Personal hobbies and family history", "Salary expectations"],
      correctIndex: 1,
      explanation: "A winning technical intro focuses directly on your current projects, hands-on skills, internship experience, and value you bring to the team."
    },
    connect: "Directly prepares students for technical interviews, HR interviews, client meetings, and international conference presentations.",
    
    technologies: ["STAR Framework", "Elevator Pitching", "Group Discussion", "HR Negotiation", "Technical Storytelling"],
    coordinatorLead: "Faculty Coordinator (Corporate Relations Lead) & 3 Student Volunteers",
    contingencyPlan: "Plan A: Live mock interview booth with video recording. Plan B: 1-on-1 rapid verbal pitch booth. Plan C: Interview question cheat-sheets."
  },
  {
    id: "profile-branding",
    stallNumber: 9,
    zoneId: "zone-2",
    zoneName: "Zone 2 — Build: Career Readiness",
    title: "Profile & Personal Branding",
    shortName: "Profile & Branding",
    icon: "🌟",
    themeColor: "#8b5cf6",
    badge: "Recruiter Magnet",
    purpose: "Guide students in building resumes, LinkedIn and GitHub profiles, and presenting skills/projects to recruiters.",
    suggestedActivity: "Resume / Profile Review",
    
    discover: "Understand how Applicant Tracking Systems (ATS) scan resumes, how recruiter LinkedIn algorithms work, and how to create a high-impact personal portfolio website.",
    experience: "Bring your resume or digital profile for an instant 2-minute ATS Score check, LinkedIn headline audit, and bio optimization.",
    challenge: {
      title: "Resume & ATS Optimization Challenge",
      type: "profile-quiz",
      prompt: "Which bullet point demonstrates the strongest impact on a tech resume?",
      options: [
        "'Worked on developing a university portal website using PHP.'",
        "'Built full-stack student portal with React & Node, reducing registration latency by 45% for 2,000+ users.'",
        "'Responsible for writing code and testing features in our final year team.'",
        "'Learned web development technologies during semester.'"
      ],
      correctIndex: 1,
      explanation: "Using the XYZ formula ('Accomplished [X], as measured by [Y], by doing [Z]') with quantified metrics makes resumes standout to recruiters."
    },
    connect: "Essential for securing internships, off-campus interviews, freelancing gigs, and connecting with tech founders globally.",
    
    technologies: ["LinkedIn SEO", "ATS Resume Formatting", "GitHub Readmes", "Personal Portfolios", "Overleaf LaTeX"],
    coordinatorLead: "Faculty Coordinator (Career Development Lead) & 3 Student Volunteers",
    contingencyPlan: "Plan A: Live ATS resume scanner tool. Plan B: Offline printed ATS checklist scorecard. Plan C: Resume sample showcase portfolio."
  },
  {
    id: "social-coding",
    stallNumber: 10,
    zoneId: "zone-2",
    zoneName: "Zone 2 — Build: Career Readiness",
    title: "Social Coding & Open Source",
    shortName: "Open Source & GitHub",
    icon: "🐙",
    themeColor: "#10b981",
    badge: "Coder Identity",
    purpose: "Create awareness of platforms such as LeetCode and GitHub, an active coding profile, and contributing to open-source projects.",
    suggestedActivity: "Coding / GitHub Challenge",
    
    discover: "Learn how an active GitHub green-streak, verified LeetCode contest rating, and open-source contributions act as your living software engineering credentials.",
    experience: "Make a live Pull Request (PR) to the official Geeta Technical Hub Open Source repository, submit a solved LeetCode problem, and verify Git branch workflows.",
    challenge: {
      title: "Git & Open Source Rapid Challenge",
      type: "git-challenge",
      prompt: "What is the correct Git sequence to create a feature branch, commit changes, and submit code for review on an open-source repo?",
      options: [
        "git branch -> git commit -> git push directly to main",
        "git checkout -b feature-name -> git commit -m '...' -> git push origin feature-name -> Open Pull Request",
        "git clone -> git merge main -> git delete",
        "git pull --force -> git rebase"
      ],
      correctIndex: 1,
      explanation: "Creating dedicated feature branches and opening descriptive Pull Requests is the standard collaborative workflow for GitHub and Open Source."
    },
    connect: "Connects students to Google Summer of Code (GSoC), Hacktoberfest, remote global tech internships, and Tier-1 product engineering roles.",
    
    technologies: ["Git", "GitHub Actions", "LeetCode", "Codeforces", "Markdown", "Open Source PRs"],
    coordinatorLead: "Faculty Coordinator (Coding Club Lead) & 4 Student Volunteers",
    contingencyPlan: "Plan A: Live GitHub PR submission arena. Plan B: Local Git command-line simulator. Plan C: Git Cheat-sheet flashcards."
  },

  // ZONE 3: CONNECT
  {
    id: "coe-certifications",
    stallNumber: 11,
    zoneId: "zone-3",
    zoneName: "Zone 3 — Connect: Opportunities",
    title: "COE & Certifications",
    shortName: "COE & Certs",
    icon: "🏆",
    themeColor: "#f97316",
    badge: "Skill Pathways",
    purpose: "Showcase available Centres of Excellence, certification programs, and technology learning pathways offered on campus.",
    suggestedActivity: "Certification Awareness Quiz",
    
    discover: "Explore the state-of-the-art Centres of Excellence (COEs) at Geeta University in AI, Robotics, Cyber Security, IoT, and Cloud Computing.",
    experience: "View actual hardware testbeds, IoT sensor rigs, and roadmap pathways for globally recognized certifications (AWS, Microsoft, Google Cloud, Cisco).",
    challenge: {
      title: "Certification Awareness Quiz",
      type: "coe-quiz",
      prompt: "Which certification is widely recognized as the foundational industry standard for Cloud Computing literacy?",
      options: ["AWS Certified Cloud Practitioner / GCP Digital Leader", "Oracle Certified Master", "CISSP", "Red Hat Certified Architect"],
      correctIndex: 0,
      explanation: "AWS Cloud Practitioner and GCP Cloud Digital Leader are the primary recognized entry-level credentials across global IT firms."
    },
    connect: "Direct enrollment into subsidized campus certification cohorts, specialized research labs, and COE project grants.",
    
    technologies: ["Geeta AI COE", "IoT Hardware Lab", "AWS Academy", "Google Cloud Faculty", "Cisco NetAcad"],
    coordinatorLead: "Faculty Coordinator (COE Director / Academic Lead) & 3 Student Volunteers",
    contingencyPlan: "Plan A: Interactive COE lab tour & certificate dashboard. Plan B: Physical hardware display boards. Plan C: Curriculum brochures."
  },
  {
    id: "placements-industry",
    stallNumber: 12,
    zoneId: "zone-3",
    zoneName: "Zone 3 — Connect: Opportunities",
    title: "Placements & Industry Connect",
    shortName: "Placements & HR",
    icon: "💼",
    themeColor: "#059669",
    badge: "Direct Outcomes",
    purpose: "Connect technology skills with placement/industry opportunities through data, success stories, industry expectations and career-readiness guidance.",
    suggestedActivity: "HR / Placement Readiness Challenge",
    
    discover: "Analyze Geeta University placement statistics, hiring trends of 350+ recruiting partners, salary benchmarks, and corporate selection criteria.",
    experience: "Consult with campus placement officers, view verified student offer letters, and map your current skill set against target company CTC brackets.",
    challenge: {
      title: "HR / Placement Readiness Challenge",
      type: "hr-challenge",
      prompt: "When high-tier product companies evaluate student tech candidates, which combination is valued the highest?",
      options: [
        "Theoretical textbook memorization only",
        "Strong Data Structures & Algorithms + 2 Production-grade deployed projects + Clear problem communication",
        "High percentage alone with no coding projects",
        "Number of unpaid certificates with no code repos"
      ],
      correctIndex: 1,
      explanation: "Companies seek well-rounded engineers who understand DSA, have proved execution through real deployed projects, and can communicate effectively."
    },
    connect: "Get mapped to corporate recruitment drives, pre-placement talks (PPTs), high-paying internships, and corporate mentor networks.",
    
    technologies: ["Placement Cell Portal", "350+ Hiring Partners", "CTC Benchmarks", "Alumni Mentorship", "Internship Drives"],
    coordinatorLead: "Faculty Coordinator (Head of Training & Placements) & 4 Student Volunteers",
    contingencyPlan: "Plan A: Live placement data portal demo. Plan B: Offline placement year-book infographic. Plan C: Alumni video success reel."
  },

  // EVENT SUPPORT (NOT A ZONE STALL)
  {
    id: "registration-helpdesk",
    stallNumber: 13,
    isSupportStall: true,
    zoneId: "support",
    zoneName: "Event Support (Central Support Desk)",
    title: "Registration & Help Desk (Stall 13)",
    shortName: "Stall 13: Help Desk",
    icon: "🎫",
    themeColor: "#64748b",
    badge: "Central Desk",
    purpose: "Manage participant registration via Google Form QR Code, verify entries, assign slots/groups, distribute G-Connect Passports, and provide on-site assistance.",
    suggestedActivity: "QR Check-in & Passport Allotment",
    
    discover: "The primary nerve center of G-Connect 2026. Ensures seamless entry flow, crowd balancing, and student verification across all 4 days.",
    experience: "Scan your entry QR code, receive your assigned Slot & Group badge (~10 students per group), and pick up your physical/digital G-Connect Passport.",
    challenge: {
      title: "On-Spot Check-in Challenge",
      type: "checkin-demo",
      prompt: "What is the maximum recommended group size for stall rotation across the 12 themed stalls to ensure practical engagement?",
      options: ["~10 Students per group", "60 Students per group", "100 Students in one big batch", "Individual isolated walkthrough"],
      correctIndex: 0,
      explanation: "As per the G-Connect model, students move in small, managed groups of ~10 (G1, G2, G3...) for hands-on, high-engagement interaction."
    },
    connect: "Provides on-site assistance, lost & found, emergency coordinator hotline, and feedback collection desk.",
    
    technologies: ["Google Sheets Sync", "QR Scanner Desk", "G-Connect Passports", "Wristband Issuance", "Attendance Logger"],
    coordinatorLead: "Core Operations Team & Registration Desk Volunteer Leads",
    contingencyPlan: "Plan A: Real-time Cloud Webhook Check-in. Plan B: Offline Local Data Bank Scanner. Plan C: Physical manual attendance registry."
  }
];

// CSE DEPARTMENT - DAY 1 FINALIZED WORKING SCHEDULE (861 Students, 91 Groups across 11 Slots)
const CSE_DAY1_SCHEDULE = [
  {
    slotNumber: 1,
    time: "9:30 – 10:00 AM",
    program: "B.Tech CSE + MCA",
    semester: "1st Sem",
    section: "A + MCA-A",
    students: 65,
    groups: 7,
    groupRange: "G1 – G7",
    heaviest: false,
    notes: "MCA 1st Sem (17) combined with B.Tech CSE 1st Sem Section A"
  },
  {
    slotNumber: 2,
    time: "10:00 – 10:30 AM",
    program: "B.Tech CSE + MCA",
    semester: "1st + 3rd Sem",
    section: "C+D + MCA-A",
    students: 77,
    groups: 8,
    groupRange: "G1 – G8",
    heaviest: false,
    notes: "MCA 3rd Sem (18) combined with B.Tech CSE 1st Sem Sections C+D"
  },
  {
    slotNumber: 3,
    time: "10:30 – 11:00 AM",
    program: "B.Tech CSE",
    semester: "3rd Sem",
    section: "A + B",
    students: 70,
    groups: 7,
    groupRange: "G1 – G7",
    heaviest: false,
    notes: "B.Tech CSE 2nd Year Batch 1"
  },
  {
    slotNumber: 4,
    time: "11:00 – 11:30 AM",
    program: "B.Tech CSE",
    semester: "3rd Sem",
    section: "C",
    students: 105,
    groups: 11,
    groupRange: "G1 – G11",
    heaviest: true,
    notes: "⚠️ Heaviest morning slot (105 students) — extra stall staffing & entry support required"
  },
  {
    slotNumber: 5,
    time: "11:30 AM – 12:00 PM",
    program: "B.Tech CSE",
    semester: "5th Sem",
    section: "A + B",
    students: 80,
    groups: 8,
    groupRange: "G1 – G8",
    heaviest: false,
    notes: "B.Tech CSE 3rd Year Batch 1"
  },
  {
    slotNumber: 6,
    time: "12:00 – 12:30 PM",
    program: "B.Tech CSE",
    semester: "5th Sem",
    section: "C",
    students: 66,
    groups: 7,
    groupRange: "G1 – G7",
    heaviest: false,
    notes: "B.Tech CSE 3rd Year Batch 2"
  },
  {
    isBreak: true,
    slotNumber: null,
    time: "12:30 – 1:30 PM",
    program: "LUNCH / RESET / STALL MAINTENANCE",
    semester: "All",
    section: "All",
    students: 0,
    groups: 0,
    groupRange: "N/A",
    heaviest: false,
    notes: "Stall reset, equipment checks, volunteer lunch, material replenishment"
  },
  {
    slotNumber: 7,
    time: "1:30 – 2:00 PM",
    program: "B.Tech CSE",
    semester: "7th Sem",
    section: "A + B",
    students: 98,
    groups: 10,
    groupRange: "G1 – G10",
    heaviest: true,
    notes: "⚠️ Heavy afternoon slot (98 final year students) — focus on Placement & COE stalls"
  },
  {
    slotNumber: 8,
    time: "2:00 – 2:30 PM",
    program: "BCA",
    semester: "1st Sem",
    section: "A + C",
    students: 72,
    groups: 8,
    groupRange: "G1 – G8",
    heaviest: false,
    notes: "BCA 1st Year Batch 1"
  },
  {
    slotNumber: 9,
    time: "2:30 – 3:00 PM",
    program: "BCA",
    semester: "1st Sem",
    section: "B",
    students: 63,
    groups: 7,
    groupRange: "G1 – G7",
    heaviest: false,
    notes: "BCA 1st Year Batch 2"
  },
  {
    slotNumber: 10,
    time: "3:00 – 3:30 PM",
    program: "BCA",
    semester: "3rd Sem",
    section: "A + B",
    students: 91,
    groups: 10,
    groupRange: "G1 – G10",
    heaviest: false,
    notes: "BCA 2nd Year"
  },
  {
    slotNumber: 11,
    time: "3:30 – 4:00 PM",
    program: "BCA",
    semester: "5th Sem",
    section: "A + B",
    students: 74,
    groups: 8,
    groupRange: "G1 – G8",
    heaviest: false,
    notes: "BCA 3rd Year Final Batch of Day 1"
  }
];

// ALL 4 DAYS STRUCTURE
const EVENT_DAYS_CONFIG = [
  {
    dayNumber: 1,
    date: "8 September 2026",
    dayName: "Day 1",
    targetAudience: "School of Computer Science & Engineering (B.Tech CSE, BCA, MCA)",
    status: "Finalized",
    totalSlots: 11,
    totalStudents: 861,
    totalGroups: 91,
    schedule: CSE_DAY1_SCHEDULE
  },
  {
    dayNumber: 2,
    date: "9 September 2026",
    dayName: "Day 2",
    targetAudience: "School of Engineering & Technology (ECE, ME, Civil, AI/DS) + Allied Programs",
    status: "Standard 11-Slot Model (TBF)",
    totalSlots: 11,
    totalStudents: "~800+",
    totalGroups: "~80+",
    schedule: []
  },
  {
    dayNumber: 3,
    date: "10 September 2026",
    dayName: "Day 3",
    targetAudience: "School of Management, Commerce, Pharmacy & Allied Health Sciences",
    status: "Standard 11-Slot Model (TBF)",
    totalSlots: 11,
    totalStudents: "~850+",
    totalGroups: "~85+",
    schedule: []
  },
  {
    dayNumber: 4,
    date: "11 September 2026",
    dayName: "Day 4",
    targetAudience: "External Colleges, +2 School Delegations & Remaining University Batches",
    status: "Standard 11-Slot Model (TBF)",
    totalSlots: 11,
    totalStudents: "~900+",
    totalGroups: "~90+",
    schedule: []
  }
];

// 10 GOLDEN RULES FOR COORDINATORS & VOLUNTEERS
const GOLDEN_RULES = [
  { number: 1, text: "Report to your assigned location before the slot begins." },
  { number: 2, text: "Keep your stall completely ready before students arrive." },
  { number: 3, text: "Do not conduct long lectures — keep it practical and interactive." },
  { number: 4, text: "Keep every interaction practical and engaging." },
  { number: 5, text: "Follow the assigned group movement plan (~10 students/group)." },
  { number: 6, text: "Do not allow overcrowding at the stall." },
  { number: 7, text: "Keep backup content ready for technical failures (Plans A, B, C)." },
  { number: 8, text: "Maintain discipline, professionalism and cleanliness." },
  { number: 9, text: "Immediately report issues to the Core Operations Team." },
  { number: 10, text: "Ensure every participant receives a meaningful EXPLORE – BUILD – CONNECT experience." }
];

// COORDINATOR CHECKLISTS
const COORDINATOR_CHECKLISTS = {
  beforeEvent: [
    "Stall setup complete",
    "Branding installed",
    "TV/display working",
    "Laptop/system ready",
    "Internet working & verified",
    "Power checked & extension boards secure",
    "Live Demo tested",
    "Backup demo ready (Offline / Slides)",
    "Activity materials ready",
    "QR code working",
    "Student coordinators present & briefed"
  ],
  beforeEachSlot: [
    "Previous group cleared cleanly",
    "Stall reset completed",
    "Activity material replenished",
    "Next group identified",
    "Demo ready to trigger",
    "Passport/checkpoint stamp ready"
  ],
  afterEachSlot: [
    "Participation checked",
    "Activity material replenished",
    "Equipment checked",
    "Stall reset"
  ],
  endOfDay: [
    "Attendance submitted to Central Desk",
    "Feedback reviewed",
    "Issues documented",
    "Equipment secured",
    "Stall ready for next day"
  ]
};
