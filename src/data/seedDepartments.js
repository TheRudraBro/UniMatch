/**
 * Department catalog — comprehensive metadata & matching rules for UniMatch.
 */

export const departmentCatalog = [
  // Science & Technology
  {
    id: "cse",
    name: "Computer Science & Engineering",
    short: "CSE",
    category: "Science & Technology",
    icon: "Cpu",
    duration: "4 Years (8–12 Semesters)",
    typicalCredits: "130 – 162 Credits",
    eligibilitySummary:
      "Science background in SSC & HSC with Physics and Mathematics (minimum GPA 2.50–3.50 depending on university).",
    overview:
      "CSE focuses on software development, algorithms, artificial intelligence, data structures, networking, and computer hardware architecture. It is the most sought-after engineering degree in Bangladesh with strong local and remote global job opportunities.",
    careerPaths: [
      "Software Engineer / Full-Stack Developer",
      "AI & Machine Learning Engineer",
      "Data Scientist & Cloud Architect",
      "Cybersecurity Analyst",
      "Systems & DevOps Engineer",
      "Tech Entrepreneur / Product Manager",
    ],
    matchPattern: "\\b(cse|computer science|computer engineering)\\b",
  },
  {
    id: "eee",
    name: "Electrical & Electronic Engineering",
    short: "EEE",
    category: "Science & Technology",
    icon: "Zap",
    duration: "4 Years (8–12 Semesters)",
    typicalCredits: "130 – 163 Credits",
    eligibilitySummary:
      "Science background in SSC & HSC with Physics and Mathematics (minimum GPA 2.50–3.50 depending on university).",
    overview:
      "EEE covers power generation, electronics, telecommunications, embedded systems, robotics, and renewable energy technologies. Graduates work across power grids, telecom operators, manufacturing plants, and semiconductor industries.",
    careerPaths: [
      "Power & Grid Systems Engineer",
      "Telecommunications & Network Engineer",
      "Embedded Systems & IoT Developer",
      "Electronics & Hardware Design Engineer",
      "Automation & Robotics Specialist",
    ],
    matchPattern:
      "\\b(eee|electrical & electronic|electrical and electronic|electronic & telecommunication|ece|ete)\\b",
  },
  {
    id: "swe",
    name: "Software Engineering",
    short: "SWE",
    category: "Science & Technology",
    icon: "Code2",
    duration: "4 Years (8–12 Semesters)",
    typicalCredits: "136 – 148 Credits",
    eligibilitySummary:
      "Science background in SSC & HSC with Physics and Mathematics.",
    overview:
      "Software Engineering emphasizes large-scale software architecture, agile development, quality assurance, cybersecurity, and application engineering with hands-on industry project work.",
    careerPaths: [
      "Software Architect",
      "Mobile & Web Application Developer",
      "Software Quality Assurance (SQA) Lead",
      "DevOps & Site Reliability Engineer",
      "Cybersecurity & Cloud Specialist",
    ],
    matchPattern: "\\b(swe|software engineering)\\b",
  },
  {
    id: "ce",
    name: "Civil Engineering",
    short: "CE",
    category: "Science & Technology",
    icon: "Building2",
    duration: "4 Years (8–12 Semesters)",
    typicalCredits: "145 – 167.5 Credits",
    eligibilitySummary:
      "Science background in SSC & HSC with Physics, Chemistry, and Mathematics.",
    overview:
      "Civil Engineering deals with the design, construction, and maintenance of infrastructure such as bridges, roads, high-rise buildings, water supply systems, and environmental engineering projects.",
    careerPaths: [
      "Structural & Construction Engineer",
      "Project & Infrastructure Manager",
      "Transportation & Urban Planner",
      "Geotechnical & Environmental Engineer",
      "Real Estate & Consultancy Specialist",
    ],
    matchPattern: "\\b(ce|civil engineering|civil & environmental)\\b",
  },
  {
    id: "textile",
    name: "Textile Engineering",
    short: "TE",
    category: "Science & Technology",
    icon: "Shirt",
    duration: "4 Years (8–12 Semesters)",
    typicalCredits: "133 – 169 Credits",
    eligibilitySummary:
      "Science background in SSC & HSC with Physics, Chemistry, and Mathematics.",
    overview:
      "Tailored to Bangladesh's largest export sector, Textile Engineering covers yarn manufacturing, fabric engineering, wet processing, apparel merchandising, and sustainable textile production.",
    careerPaths: [
      "Textile Production & Mill Manager",
      "Garments Merchandiser & Supply Chain Lead",
      "Fabric & Dyeing Technologist",
      "Quality Control & Compliance Auditor",
      "Apparel R&D Specialist",
    ],
    matchPattern: "\\b(textile|knitwear|apparel manufacturing)\\b",
  },
  {
    id: "ds",
    name: "Data Science",
    short: "DS",
    category: "Science & Technology",
    icon: "Database",
    duration: "4 Years (8–12 Semesters)",
    typicalCredits: "130 – 147 Credits",
    eligibilitySummary:
      "Science background in SSC & HSC with Mathematics.",
    overview:
      "Data Science combines statistical modeling, big data analytics, machine learning, and business intelligence to extract actionable insights from complex datasets.",
    careerPaths: [
      "Data Scientist",
      "Business Intelligence (BI) Analyst",
      "Machine Learning Specialist",
      "Data Engineer",
      "Quantitative Risk Analyst",
    ],
    matchPattern: "\\b(data science)\\b",
  },
  {
    id: "it",
    name: "Information Technology",
    short: "IT",
    category: "Science & Technology",
    icon: "Server",
    duration: "4 Years (8–12 Semesters)",
    typicalCredits: "140 – 153 Credits",
    eligibilitySummary:
      "Science background in SSC & HSC with Physics and Mathematics.",
    overview:
      "Information Technology focuses on enterprise IT infrastructure, database administration, networking, cloud computing, and information systems management.",
    careerPaths: [
      "IT Systems Administrator",
      "Network & Security Engineer",
      "Database Administrator",
      "IT Project Coordinator",
      "Enterprise Solutions Consultant",
    ],
    matchPattern: "\\b(information technology|csit|itm|information & communication)\\b",
  },

  // Business
  {
    id: "bba",
    name: "Business Administration",
    short: "BBA",
    category: "Business",
    icon: "Briefcase",
    duration: "4 Years (8–12 Semesters)",
    typicalCredits: "120 – 144 Credits",
    eligibilitySummary:
      "Open to all groups (Science, Commerce, Arts) with minimum GPA 2.50–3.50 in SSC & HSC.",
    overview:
      "BBA provides a broad foundation in finance, marketing, accounting, human resource management, and entrepreneurship—preparing graduates for corporate leadership, banking, and startups.",
    careerPaths: [
      "Corporate Management Trainee",
      "Financial & Investment Analyst",
      "Brand & Digital Marketing Manager",
      "Human Resources (HR) Business Partner",
      "Supply Chain & Operations Manager",
      "Startup Founder / Business Consultant",
    ],
    matchPattern: "\\b(bba|business administration)\\b",
  },
  {
    id: "accounting",
    name: "Accounting & Information Systems",
    short: "ACC",
    category: "Business",
    icon: "Calculator",
    duration: "4 Years (8–12 Semesters)",
    typicalCredits: "125 – 141 Credits",
    eligibilitySummary:
      "Open to all groups (Commerce preferred) with minimum GPA 2.50 in SSC & HSC.",
    overview:
      "Accounting focuses on financial reporting, auditing, taxation, cost accounting, and accounting information systems—an ideal pathway toward CA, ACCA, CMA, or CFA certifications.",
    careerPaths: [
      "Chartered Accountant (CA) / ACCA",
      "External & Internal Auditor",
      "Taxation & Corporate Compliance Advisor",
      "Financial Controller",
      "ERP & Accounting Systems Analyst",
    ],
    matchPattern: "\\b(accounting|ais)\\b",
    majorOfBba: true,
  },
  {
    id: "finance",
    name: "Finance & Banking",
    short: "FIN",
    category: "Business",
    icon: "TrendingUp",
    duration: "4 Years (8–12 Semesters)",
    typicalCredits: "125 – 141 Credits",
    eligibilitySummary:
      "Open to all groups with minimum GPA 2.50 in SSC & HSC.",
    overview:
      "Finance & Banking explores corporate finance, capital markets, risk management, commercial banking, and FinTech—equipping students for careers in banks, NBFIs, and investment firms.",
    careerPaths: [
      "Investment & Credit Analyst",
      "Commercial / Corporate Banker",
      "Portfolio & Wealth Manager",
      "FinTech Product Analyst",
      "Corporate Treasury Officer",
    ],
    matchPattern: "\\b(finance)\\b",
    majorOfBba: true,
  },
  {
    id: "marketing",
    name: "Marketing",
    short: "MKT",
    category: "Business",
    icon: "Megaphone",
    duration: "4 Years (8–12 Semesters)",
    typicalCredits: "125 – 141 Credits",
    eligibilitySummary:
      "Open to all groups with minimum GPA 2.50 in SSC & HSC.",
    overview:
      "Marketing covers consumer behavior, brand management, digital marketing, market research, and strategic sales across FMCG, telecom, e-commerce, and multinational companies.",
    careerPaths: [
      "Brand Manager (FMCG / Telecom)",
      "Digital Marketing & Growth Strategist",
      "Market Research & Consumer Insights Analyst",
      "Key Account & Sales Manager",
      "Advertising & Creative Account Lead",
    ],
    matchPattern: "\\b(marketing)\\b",
    majorOfBba: true,
  },
  {
    id: "management",
    name: "Management & HRM",
    short: "MGT",
    category: "Business",
    icon: "Users",
    duration: "4 Years (8–12 Semesters)",
    typicalCredits: "125 – 141 Credits",
    eligibilitySummary:
      "Open to all groups with minimum GPA 2.50 in SSC & HSC.",
    overview:
      "Management develops organizational leadership, human resource strategy, operations management, and business policy skills needed to lead teams in modern enterprises.",
    careerPaths: [
      "HR & Talent Acquisition Specialist",
      "Operations & Logistics Manager",
      "Management Consultant",
      "Project & Business Development Manager",
    ],
    matchPattern: "\\b(management)\\b",
    majorOfBba: true,
  },
  {
    id: "economics",
    name: "Economics",
    short: "ECO",
    category: "Business",
    icon: "LineChart",
    duration: "4 Years (8–12 Semesters)",
    typicalCredits: "120 – 145 Credits",
    eligibilitySummary:
      "Open to all groups (Mathematics/Statistics in HSC preferred at top universities).",
    overview:
      "Economics analyzes micro- and macroeconomic policy, econometrics, international trade, and development economics—opening doors to research think tanks, central banking, and development agencies.",
    careerPaths: [
      "Economic & Policy Researcher",
      "Central Bank / Development Bank Officer",
      "Data & Economic Analyst",
      "NGO & International Development Specialist",
      "Financial & Market Strategist",
    ],
    matchPattern: "\\b(economics|bseco)\\b",
  },

  // Arts & Humanities
  {
    id: "english",
    name: "English Language & Literature",
    short: "ENG",
    category: "Arts & Humanities",
    icon: "BookOpen",
    duration: "4 Years (8–12 Semesters)",
    typicalCredits: "120 – 144 Credits",
    eligibilitySummary:
      "Open to all groups (Science, Commerce, Arts) with minimum GPA 2.50 in SSC & HSC.",
    overview:
      "English studies literature, linguistics, creative writing, and English Language Teaching (ELT)—building strong communication, critical thinking, and editorial skills.",
    careerPaths: [
      "University / College Lecturer & Educator",
      "Content Strategist & Copywriter",
      "Editor & Publishing Specialist",
      "Corporate Communications & PR Officer",
      "Civil Service & Diplomatic Roles",
    ],
    matchPattern: "\\b(english|ell)\\b",
  },
  {
    id: "law",
    name: "Bachelor of Laws (LL.B Hons)",
    short: "LLB",
    category: "Arts & Humanities",
    icon: "Scale",
    duration: "4 Years (8 Semesters)",
    typicalCredits: "130 – 147 Credits",
    eligibilitySummary:
      "Open to all groups with minimum GPA 2.50–3.50 in SSC & HSC (subject to Bar Council rules).",
    overview:
      "LL.B (Hons) covers constitutional law, corporate and commercial law, criminal justice, human rights, and legal drafting—preparing graduates for advocacy, judiciary, and corporate legal practice.",
    careerPaths: [
      "Advocate (Supreme Court / District Judge Court)",
      "Corporate & Banking Legal Advisor",
      "Judicial Service Magistrate (via BJS Exam)",
      "Human Rights & Legal Researcher",
      "International Arbitration & Compliance Specialist",
    ],
    matchPattern: "\\b(law|laws|ll\\.?b)\\b",
  },
  {
    id: "journalism",
    name: "Journalism & Media Studies",
    short: "JMS",
    category: "Arts & Humanities",
    icon: "Newspaper",
    duration: "4 Years (8–12 Semesters)",
    typicalCredits: "129 – 144 Credits",
    eligibilitySummary:
      "Open to all groups with minimum GPA 2.50 in SSC & HSC.",
    overview:
      "Journalism & Media Studies blends broadcast journalism, digital media production, public relations, filmmaking, and strategic communication.",
    careerPaths: [
      "Broadcast & Digital Journalist",
      "Public Relations (PR) & Media Manager",
      "Filmmaker / Video Producer",
      "Advertising & Brand Communications Specialist",
    ],
    matchPattern: "\\b(journalism|media)\\b",
  },
  {
    id: "sociology",
    name: "Sociology",
    short: "SOC",
    category: "Arts & Humanities",
    icon: "Users2",
    duration: "4 Years (8–12 Semesters)",
    typicalCredits: "120 – 135 Credits",
    eligibilitySummary:
      "Open to all groups with minimum GPA 2.50 in SSC & HSC.",
    overview:
      "Sociology examines social institutions, urban development, gender studies, and social research methods—preparing graduates for NGOs, UN agencies, and public policy.",
    careerPaths: [
      "Development & NGO Program Officer",
      "Social & Market Researcher",
      "Public Policy & Advocacy Analyst",
      "HR & Community Relations Specialist",
    ],
    matchPattern: "\\b(sociology)\\b",
  },
  {
    id: "psychology",
    name: "Psychology",
    short: "PSY",
    category: "Arts & Humanities",
    icon: "Brain",
    duration: "4 Years (8 Semesters)",
    typicalCredits: "120 – 136 Credits",
    eligibilitySummary:
      "Open to all groups (Science/Arts preferred) with minimum GPA 2.50 in SSC & HSC.",
    overview:
      "Psychology studies human cognition, clinical counseling, organizational behavior, and mental health—supporting careers in clinical counseling, HR, and behavioral research.",
    careerPaths: [
      "Clinical & Counseling Psychologist (with MSc)",
      "School & University Counselor",
      "Organizational Behavior & HR Specialist",
      "Mental Health Researcher",
    ],
    matchPattern: "\\b(psychology)\\b",
  },

  // Other / Health & Design
  {
    id: "pharmacy",
    name: "Bachelor of Pharmacy (B.Pharm)",
    short: "PHARM",
    category: "Health & Life Sciences",
    icon: "Pill",
    duration: "4 Years (8 Semesters)",
    typicalCredits: "152 – 170 Credits",
    eligibilitySummary:
      "Science group with Biology & Chemistry (min GPA 3.50 each) and Physics & Math (min GPA 3.00 each); combined GPA 8.00.",
    overview:
      "B.Pharm prepares students for Bangladesh's globally competitive pharmaceutical industry, covering pharmacology, pharmaceutics, clinical pharmacy, and drug quality assurance.",
    careerPaths: [
      "Pharmaceutical R&D & Formulation Scientist",
      "Quality Control (QC) & Quality Assurance (QA) Officer",
      "Clinical & Hospital Pharmacist",
      "Regulatory Affairs Specialist",
      "Pharmaceutical Product Manager",
    ],
    matchPattern: "\\b(pharm|pharmacy)\\b",
  },
  {
    id: "architecture",
    name: "Bachelor of Architecture (B.Arch)",
    short: "ARCH",
    category: "Design & Built Environment",
    icon: "Ruler",
    duration: "5 Years (10 Semesters)",
    typicalCredits: "170 – 207 Credits",
    eligibilitySummary:
      "Science group with Physics & Mathematics in HSC, plus freehand drawing & spatial aptitude test.",
    overview:
      "B.Arch is a 5-year professional studio-based degree covering architectural design, urban planning, sustainable buildings, interior spaces, and structural aesthetics.",
    careerPaths: [
      "Licensed Practicing Architect",
      "Urban & Landscape Designer",
      "Interior & Spatial Architect",
      "3D Architectural Visualizer & BIM Specialist",
      "Real Estate Design Consultant",
    ],
    matchPattern: "\\b(architecture|b\\.?arch)\\b",
  },
  {
    id: "public-health",
    name: "Public Health",
    short: "MPH / BPH",
    category: "Health & Life Sciences",
    icon: "HeartPulse",
    duration: "4 Years (BPH) / 1–1.5 Years (MPH)",
    typicalCredits: "130 – 155 Credits (UG)",
    eligibilitySummary:
      "Science background with Biology/Chemistry/Physics/Math in SSC & HSC.",
    overview:
      "Public Health focuses on epidemiology, community nutrition, biostatistics, healthcare management, and disease prevention in collaboration with hospitals and global health bodies.",
    careerPaths: [
      "Epidemiologist & Health Researcher",
      "Hospital & Healthcare Administrator",
      "Public Health Program Specialist (WHO/UNICEF/NGOs)",
      "Community Nutrition & Health Educator",
    ],
    matchPattern: "\\b(public health|bph)\\b",
  },
  {
    id: "environmental",
    name: "Environmental Science & Management",
    short: "ENV",
    category: "Health & Life Sciences",
    icon: "Leaf",
    duration: "4 Years (8–12 Semesters)",
    typicalCredits: "130 – 145 Credits",
    eligibilitySummary:
      "Science background in SSC & HSC (some universities accept any group for Environmental Management).",
    overview:
      "Environmental Science explores climate change adaptation, waste management, ecological conservation, GIS mapping, and environmental impact assessment (EIA).",
    careerPaths: [
      "Environmental Impact Assessment (EIA) Consultant",
      "Climate Change & Sustainability Specialist",
      "GIS & Remote Sensing Analyst",
      "Industrial EHS (Environment, Health & Safety) Officer",
    ],
    matchPattern: "\\b(environmental)\\b",
  },
];

export const popularDepartments = [
  "cse",
  "bba",
  "eee",
  "pharmacy",
  "english",
  "architecture",
  "law",
  "economics",
].map((id) => departmentCatalog.find((d) => d.id === id));

export const getDepartmentById = (id) =>
  departmentCatalog.find((d) => d.id === id);

export default departmentCatalog;