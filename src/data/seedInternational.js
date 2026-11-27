/**
 * Country-wise International Universities Seed Data (2027 Intake)
 * Sourced from provided admission guide & verified official details (as of Nov 2026).
 */

export const countries = [
  { id: "south-korea", name: "South Korea", currency: "KRW / USD", flag: "🇰🇷" },
  { id: "china", name: "China", currency: "CNY / USD", flag: "🇨🇳" },
  { id: "malaysia", name: "Malaysia", currency: "MYR", flag: "🇲🇾" },
  { id: "estonia", name: "Estonia", currency: "EUR", flag: "🇪🇪" },
  { id: "canada", name: "Canada", currency: "CAD", flag: "🇨🇦" },
];

export const seedInternationalUniversities = [
  {
    id: "kaist",
    countryId: "south-korea",
    name: "KAIST (Korea Advanced Institute of Science and Technology)",
    city: "Daejeon, Republic of Korea",
    degreeLevel: "Undergraduate (Non-declared Major for Freshmen)",
    website: "https://admission.kaist.ac.kr/intl-undergraduate",
    sourceUrl: "https://admission.kaist.ac.kr/intl-undergraduate",
    lastVerifiedAt: "2026-11-17",
    departments: [
      "Computer Science",
      "AI Computing & AI Systems",
      "Electrical Engineering",
      "Mechanical & Aerospace Engineering",
      "Natural Sciences & Business",
    ],
    tuitionFees:
      "Full tuition waiver up to 8 semesters under KAIST Scholarship (select in application)",
    livingCosts:
      "KRW 350,000/month stipend + health insurance; budget separately for housing, meals & personal costs",
    applicationFee:
      "USD 80 (Fee waiver available for eligible LDC applicants; 2027 waiver windows passed)",
    languageRequirements:
      "IELTS 6.5 / TOEFL iBT 83 (pre-Jan 21, 2026) or 4.5 (on/after Jan 21, 2026) / TOEIC 720 / TEPS 326 (MOI exemption possible)",
    minimumSscHsc:
      "No fixed HSC GPA cutoff stated; requires official standardized/national exam score + 1-page exam summary",
    admissionRequirements:
      "Spring 2027 (Early): graduate by Feb 28, 2027. Fall 2027 (Early/Regular): graduate by Aug 31, 2027. Foreign citizenship; no transfer system (enters as freshman).",
    requiredDocuments:
      "Online application form, HS/university transcripts, Passport/National ID, standardized test score (SAT 4433 / ACT 7778 / IB 000559), EPT score; optional up to 2 recommendation letters, awards, school profile/report.",
    admissionProcess:
      "Apply online via KAIST portal -> pay USD 80 fee -> recommenders submit electronically -> eligibility & document review -> online interview (if required) -> portal result.",
    applicationDeadline:
      "Early: Oct 22, 2026 (passed) | Regular: Jan 14, 2027 (6:00 PM KST); Rec letter: Jan 21, 2027",
    scholarshipInfo:
      "Full tuition waiver (up to 8 semesters) + KRW 350,000/mo stipend + medical insurance (maintain GPA > 2.7/4.3 after freshman year)",
    visaRequirements:
      "Post-admission apostilled/consular-legalized academic docs, family proof, passport copies, and bank statement (~USD 3,200 with scholarship / KRW 16,000,000 general)",
  },
  {
    id: "njust",
    countryId: "china",
    name: "Nanjing University of Science and Technology (NJUST)",
    city: "Nanjing, Jiangsu, China",
    degreeLevel: "Undergraduate & Postgraduate (CSC Type B)",
    website: "https://admission.njust.edu.cn/",
    sourceUrl: "https://study.njust.edu.cn/b7/8e/c4390a374670/page.htm",
    lastVerifiedAt: "2026-11-17",
    departments: [
      "Computer Science & Technology",
      "Software Engineering",
      "Mechanical Engineering",
      "Electronic & Information Engineering",
      "International Economy & Trade",
    ],
    tuitionFees:
      "UG: CNY 18,000/yr (Chinese) or CNY 19,800/yr (English). PG: CNY 24,000–44,200/yr",
    livingCosts:
      "Dorm: CNY 4,000/yr (UG/Master quad room); Meals ~CNY 10,000/yr, Electricity ~CNY 1,000/yr, Books ~CNY 1,000/yr, Medical ~CNY 538, Visa ~CNY 400+/yr",
    applicationFee: "CNY 500 (Non-refundable)",
    languageRequirements:
      "English-taught: IELTS/TOEFL/equivalent or English-medium proof; Chinese-taught: HSK (PG generally HSK 5+)",
    minimumSscHsc:
      "High school completion for UG; verify 2027 HSC equivalency & CSCA subject rules in official guide",
    admissionRequirements:
      "Non-Chinese citizens in good health. UG requires high school completion; PG Master's age generally <=35 with Bachelor's, Doctoral <=40 with Master's.",
    requiredDocuments:
      "Passport bio-page, degree/graduation certificate, academic transcripts, language certificate, study/research plan (1,000+ words for PG), 2 recommendation letters, Foreigner Physical Examination Form, No Criminal Record.",
    admissionProcess:
      "Check programme language & supervisor -> apply via portal (and CGSIS Agency No. 10288 for CSC Type B PG) -> pay CNY 500 fee -> review/interview -> admission & X1 visa docs.",
    applicationDeadline:
      "2027 UG guide published Nov 12, 2026 (confirm exact UG deadline on portal); CSC Type B PG deadline: Mar 5, 2027",
    scholarshipInfo:
      "CSC High-level Postgraduate (Type B) & NJUST Lanshan Scholarship apply to PG/eligible tracks; verify UG scholarship options separately",
    visaRequirements:
      "Long-term study requires China X1 visa via Chinese diplomatic mission + on-campus registration, health check & residence permit",
  },
  {
    id: "inti-subang",
    countryId: "malaysia",
    name: "INTI International College Subang (with Swinburne)",
    city: "Subang Jaya, Selangor, Malaysia",
    degreeLevel: "Undergraduate — Bachelor of Computer Science (3+0)",
    website:
      "https://newinti.edu.my/programme/bachelor-of-computer-science-30-in-collaboration-with-swinburne-university-of-technology-australia/",
    sourceUrl:
      "https://newinti.edu.my/international-students/entry-requirements/",
    lastVerifiedAt: "2026-11-17",
    departments: [
      "Bachelor of Computer Science (3+0)",
      "Application & Mobile Development",
      "Web Systems & HCI",
    ],
    tuitionFees:
      "Published figures: From RM 95,600 to Approx. RM 103,242 (+ 6% SST for international students; confirm written quote)",
    livingCosts:
      "Visa/EMGS & processing package: RM 2,847 (~USD 680) for non-Indonesian international students; housing/food/transport extra",
    applicationFee: "Confirm with INTI / official fee schedule",
    languageRequirements:
      "Confirm exact IELTS/TOEFL/PTE/Duolingo score & English-medium rules for this programme with INTI",
    minimumSscHsc:
      "Bangladesh SSC (10 yrs) & HSC (12 yrs) recognized; confirm direct HSC equivalency & Math prerequisite",
    admissionRequirements:
      "A-Levels (3 A-Levels or 2 A-Levels + 2 AS-Levels = 72 UCAS points), IB Diploma (24+), Foundation (60–65%), or Diploma. Confirm Bangladesh HSC direct entry in writing.",
    requiredDocuments:
      "INTI application form, accommodation form (if needed), 2 full passport copies (18+ months validity recommended), 6 white-bg photos, 2 certified academic copies + translations, English test & medical report.",
    admissionProcess:
      "Submit docs via INTI/representative 2–3 months before intake -> receive Offer Letter -> EMGS student visa processing -> MDAC (within 3 days before arrival) -> report to International Office.",
    applicationDeadline:
      "Apply at least 2–3 months prior to target intake; verify active intake dates with INTI",
    scholarshipInfo:
      "Check INTI international scholarship availability & eligibility by programme, intake, and academic merit",
    visaRequirements:
      "Student visa processed via EMGS; submit arrival form >=7 working days prior (Subang/Penang) and MDAC within 3 days before arrival",
  },
  {
    id: "tallinn-university",
    countryId: "estonia",
    name: "Tallinn University",
    city: "Tallinn, Estonia",
    degreeLevel: "Bachelor's (3 years, Full-time, English-taught)",
    website: "https://www.tlu.ee/en/admission-bachelors-studies",
    sourceUrl: "https://www.tlu.ee/en/bangladesh",
    lastVerifiedAt: "2026-11-17",
    departments: [
      "Law (EUR 5,800/yr)",
      "Audiovisual Media (EUR 5,000/yr)",
      "Crossmedia (EUR 5,000/yr)",
      "Liberal Arts in Social Sciences (EUR 5,000/yr)",
      "Politics and Governance (EUR 5,000/yr)",
      "Liberal Arts in Humanities (EUR 4,600/yr)",
    ],
    tuitionFees:
      "2027/2028 Bachelor's: EUR 4,600 – EUR 5,800/year (EUR 2,300 – EUR 2,900/semester)",
    livingCosts:
      "Dormitory spots limited; many students rent private room/flat. Budget housing, meals, transit, insurance & residence costs separately",
    applicationFee: "Check DreamApply / Tallinn University fee page",
    languageRequirements:
      "IELTS Academic 6.0 (min 5.5 each band), TOEFL iBT 72 (pre-Jan 21, 2026) or 4/section (on/after Jan 21, 2026), PTE Academic 59, or Cambridge 169. Duolingo & MOI generally not accepted.",
    minimumSscHsc:
      "Bangladesh HSC / Alim or equivalent vocational qualification with at least 60% of max marks (excluding optional/additional subject)",
    admissionRequirements:
      "Secondary qualification (HSC/Alim) with >=60% score; applicants should generally be 18+ at the start of studies (confirm under-18 rules directly).",
    requiredDocuments:
      "HSC/Alim certificate & transcript (with certified English translation if needed), English test proof, passport ID page, name-change affidavit (if applicable), plus motivation letter/portfolio/interview if required.",
    admissionProcess:
      "Apply via DreamApply -> upload documents -> pay application fee -> complete programme assessment/interview/portfolio -> accept offer -> start non-EU residence/visa process.",
    applicationDeadline: "1 November 2026 – 1 March 2027 (via DreamApply)",
    scholarshipInfo:
      "Verify undergraduate tuition waivers or scholarships on Tallinn University's official pages",
    visaRequirements:
      "Non-EU applicants must arrange Estonian residence permit / long-stay visa early; apply well before March 1, 2027",
  },
  {
    id: "seneca-polytechnic",
    countryId: "canada",
    name: "Seneca Polytechnic",
    city: "Toronto, Ontario, Canada",
    degreeLevel: "Degrees, Diplomas, Advanced Diplomas & Certificates",
    website:
      "https://www.senecapolytechnic.ca/international/apply/how-to-apply.html",
    sourceUrl:
      "https://www.senecapolytechnic.ca/international/apply/how-to-apply/admission-requirements/academic-requirements.html",
    lastVerifiedAt: "2026-11-17",
    departments: [
      "Degree Programmes (60+ / 65% senior-level avg)",
      "Diploma & Advanced Diploma Programmes",
      "Graduate Certificates & Certificates",
    ],
    tuitionFees:
      "Programme & intake-specific CAD fees (check official international tuition table/calculator; excludes housing, health insurance & ancillary fees)",
    livingCosts:
      "Budget separately for Toronto housing, meals, health insurance, books/supplies, transit & mandatory fees",
    applicationFee:
      "CAD 90 by credit card (credited/reimbursed to Student Home after acceptance & 1st-semester tuition payment for full-time programmes)",
    languageRequirements:
      "Degree: IELTS Academic 6.5 (no band <6.0), TOEFL iBT (min 4.5/6 or 21/30 per skill), PTE 60, Duolingo 115–120 (varies by program), CAEL 70 (Writing 60), or Cambridge 176 (no skill <169)",
    minimumSscHsc:
      "Degree applicants: Grades 10–12 transcripts + diploma + 6 senior-level courses (~Ontario U-prep) with >=65% overall average & subject prerequisites (Math/Bio/Chem)",
    admissionRequirements:
      "Program-specific prerequisites & seat availability vary by term; domestic applicants considered first, so seats may fill early.",
    requiredDocuments:
      "Passport photo & signature page, academic transcripts & diploma/degree (with certified English translation), English proficiency proof, and program-specific portfolio/essay/test if required.",
    admissionProcess:
      "Apply via International Student Web Application (up to 3 choices) -> upload docs & pay CAD 90 -> track on Student Home -> pay tuition deposit by offer deadline.",
    applicationDeadline:
      "Open for Jan 2027, May 2027 & Sep 2027 intakes (apply early as seats fill by programme)",
    scholarshipInfo:
      "Check Seneca's current international scholarship page for eligibility and terms",
    visaRequirements:
      "Requires Canadian study permit, proof of funds, health insurance, and PGWP-eligibility verification under current IRCC rules",
  },
];

export const getCountryById = (id) => countries.find((c) => c.id === id);

export default seedInternationalUniversities;
