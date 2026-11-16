/**
 * Static homepage content: how-it-works, value props, prep features, stats,
 * testimonials (clearly labeled DEMO) and FAQ.
 * Keep copy honest — no fabricated statistics presented as fact.
 */

export const howItWorks = [
  {
    step: 1,
    title: 'Enter your academics',
    desc: 'Add your SSC & HSC GPA, academic background and budget in BDT.',
    icon: 'ClipboardList',
  },
  {
    step: 2,
    title: 'We match universities',
    desc: 'Our engine checks verified eligibility and estimated cost against your profile.',
    icon: 'Sparkles',
  },
  {
    step: 3,
    title: 'Compare & shortlist',
    desc: 'Compare up to 3 universities side by side on cost, credits and requirements.',
    icon: 'GitCompareArrows',
  },
  {
    step: 4,
    title: 'Prepare & apply',
    desc: 'Use admission preparation resources, then apply on the official university site.',
    icon: 'GraduationCap',
  },
];

export const whyChoose = [
  {
    title: 'Honest, source-backed data',
    desc: 'Unverified fees and requirements are clearly marked — never invented. Every record links to an official source.',
    icon: 'ShieldCheck',
  },
  {
    title: 'GPA + budget matching',
    desc: 'Results are grouped into Eligible, Potential and Not Eligible against verified requirements and your budget.',
    icon: 'Target',
  },
  {
    title: 'Side-by-side comparison',
    desc: 'Compare tuition, credits, admission tests and scholarships across universities in one table.',
    icon: 'LayoutGrid',
  },
  {
    title: 'Local + international',
    desc: 'Explore private universities across Bangladesh and study destinations abroad in one place.',
    icon: 'Globe2',
  },
  {
    title: 'Admission preparation',
    desc: 'Practice MCQs, mock tests and question banks to get ready for admission tests.',
    icon: 'BookOpenCheck',
  },
  {
    title: 'Built for students',
    desc: 'Clean, fast and responsive — on mobile, tablet and desktop, in light or dark mode.',
    icon: 'Smartphone',
  },
];

export const prepFeatures = [
  { title: 'Practice MCQ Tests', icon: 'ListChecks' },
  { title: 'Mock Admission Tests', icon: 'Timer' },
  { title: 'Previous Question Bank', icon: 'Archive' },
  { title: 'CSE & BBA Prep', icon: 'Cpu' },
  { title: 'English & Math', icon: 'Calculator' },
  { title: 'Score & Result History', icon: 'BarChart3' },
];

/**
 * Platform stats. These describe the SEED CONTENT of this build (counts of
 * seeded records), not marketing claims. Numbers are computed where possible.
 */
export const platformStats = [
  { label: 'BD universities seeded', value: 20, suffix: '', icon: 'School' },
  { label: 'Departments in catalog', value: 22, suffix: '', icon: 'BookMarked' },
  { label: 'Study destinations', value: 5, suffix: '', icon: 'Globe2' },
  { label: 'Divisions covered', value: 8, suffix: '', icon: 'MapPin' },
];

// Simple bar-chart data for the stats section (seeded records by category).
export const seedBreakdown = [
  { name: 'BD Unis', count: 20 },
  { name: 'Departments', count: 22 },
  { name: 'Intl Unis', count: 5 },
  { name: 'Divisions', count: 8 },
];

/**
 * DEMO testimonials — fictional, for layout/demonstration only.
 * Clearly labeled as sample content in the UI. Not real endorsements.
 */
export const testimonials = [
  {
    name: 'Sample Student',
    role: 'HSC 2025 · Science',
    quote:
      'UniMatch made it easy to see which universities fit my GPA and budget without guessing.',
  },
  {
    name: 'Demo User',
    role: 'HSC 2024 · Commerce',
    quote:
      'Comparing tuition and credits side by side saved me hours of digging through websites.',
  },
  {
    name: 'Example Applicant',
    role: 'HSC 2025 · Arts',
    quote:
      'I liked that fees I needed to confirm were marked clearly instead of shown as final.',
  },
];

export const faqs = [
  {
    q: 'Is UniMatch an official admission authority?',
    a: 'No. UniMatch is a discovery and planning tool. Final eligibility and admission decisions depend entirely on each university’s official admission authority.',
  },
  {
    q: 'Are the tuition fees and GPA requirements guaranteed?',
    a: 'No. Fields that are not yet verified are marked “Not verified” or “Contact university”. Always confirm costs and requirements on the official university website before applying.',
  },
  {
    q: 'Does a high GPA guarantee admission?',
    a: 'No. GPA is only one factor. Matching shows an internal compatibility score, not an admission probability or guarantee.',
  },
  {
    q: 'Do I need an account to use UniMatch?',
    a: 'You can browse and search without an account. Saving universities and using Admission Preparation requires a free student account.',
  },
  {
    q: 'How are costs calculated?',
    a: 'Estimated program cost combines tuition (credits × per-credit fee) with admission, semester and other mandatory fees, shown as a breakdown — not a single guaranteed number.',
  },
  {
    q: 'Can universities be added or corrected?',
    a: 'Yes. Every record is editable by an admin, with a source URL and last-verified date, so information can be kept accurate over time.',
  },
];

export const disclaimer =
  'UniMatch is a planning tool, not an admission authority. Final eligibility and admission decisions depend on the official university admission authority. Verify all fees and requirements on official university sources before applying.';
