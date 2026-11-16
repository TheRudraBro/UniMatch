/**
 * Department catalog — the set of programs UniMatch understands.
 * Used for the "Popular Departments" homepage section and (later) filters.
 *
 * Fees / GPA requirements are intentionally NOT included here: those are
 * university-specific and must be verified per university (see departments/
 * collection in the spec). Do not reuse one university's requirements for another.
 */

export const departmentCatalog = [
  // Science & Technology
  { id: 'cse', name: 'Computer Science & Engineering', short: 'CSE', category: 'Science & Technology', icon: 'Cpu' },
  { id: 'eee', name: 'Electrical & Electronic Engineering', short: 'EEE', category: 'Science & Technology', icon: 'Zap' },
  { id: 'swe', name: 'Software Engineering', short: 'SWE', category: 'Science & Technology', icon: 'Code2' },
  { id: 'ce', name: 'Civil Engineering', short: 'CE', category: 'Science & Technology', icon: 'Building2' },
  { id: 'textile', name: 'Textile Engineering', short: 'TE', category: 'Science & Technology', icon: 'Shirt' },
  { id: 'ds', name: 'Data Science', short: 'DS', category: 'Science & Technology', icon: 'Database' },
  { id: 'it', name: 'Information Technology', short: 'IT', category: 'Science & Technology', icon: 'Server' },

  // Business
  { id: 'bba', name: 'Business Administration', short: 'BBA', category: 'Business', icon: 'Briefcase' },
  { id: 'accounting', name: 'Accounting', short: 'ACC', category: 'Business', icon: 'Calculator' },
  { id: 'finance', name: 'Finance', short: 'FIN', category: 'Business', icon: 'TrendingUp' },
  { id: 'marketing', name: 'Marketing', short: 'MKT', category: 'Business', icon: 'Megaphone' },
  { id: 'management', name: 'Management', short: 'MGT', category: 'Business', icon: 'Users' },
  { id: 'economics', name: 'Economics', short: 'ECO', category: 'Business', icon: 'LineChart' },

  // Arts & Humanities
  { id: 'english', name: 'English', short: 'ENG', category: 'Arts & Humanities', icon: 'BookOpen' },
  { id: 'law', name: 'Law', short: 'LLB', category: 'Arts & Humanities', icon: 'Scale' },
  { id: 'journalism', name: 'Journalism & Media Studies', short: 'JMS', category: 'Arts & Humanities', icon: 'Newspaper' },
  { id: 'sociology', name: 'Sociology', short: 'SOC', category: 'Arts & Humanities', icon: 'Users2' },
  { id: 'psychology', name: 'Psychology', short: 'PSY', category: 'Arts & Humanities', icon: 'Brain' },

  // Other
  { id: 'pharmacy', name: 'Pharmacy', short: 'PHARM', category: 'Other', icon: 'Pill' },
  { id: 'architecture', name: 'Architecture', short: 'ARCH', category: 'Other', icon: 'Ruler' },
  { id: 'public-health', name: 'Public Health', short: 'MPH', category: 'Other', icon: 'HeartPulse' },
  { id: 'environmental', name: 'Environmental Science', short: 'ENV', category: 'Other', icon: 'Leaf' },
];

export const popularDepartments = [
  'cse', 'bba', 'eee', 'pharmacy', 'english', 'architecture', 'law', 'economics',
].map((id) => departmentCatalog.find((d) => d.id === id));

export default departmentCatalog;
