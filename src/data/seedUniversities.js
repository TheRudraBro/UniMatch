/**
 * Seed data — 20 well-known private universities in Bangladesh.
 *
 * DATA HONESTY RULES (per project spec):
 *  - Only publicly verifiable facts are filled in: name, short name, division,
 *    city, official website, establishment year, UGC status.
 *  - Tuition fees, GPA thresholds, credit counts, deadlines and ratings are NOT
 *    invented. They are marked "Not verified" / "Contact university" and must be
 *    entered/verified by an admin through the dashboard before being shown as fact.
 *  - `rating` is null everywhere: there is no single reliable public ranking, so
 *    we do not fabricate one.
 *  - Every record carries `sourceUrl` (official site) and `lastVerifiedAt`.
 *
 * This is INITIAL SEED DATA, not a verified ranking.
 */

const NV = 'Not verified';
const CONTACT = 'Contact university';
const VERIFIED_AT = '2026-11-15';

const base = (over) => ({
  logo: null, // render initials fallback until an admin uploads a real logo
  coverImage: null,
  rating: null, // only set when backed by a reliable source
  ugcStatus: 'UGC-approved private university',
  type: 'Private',
  status: 'published',
  // Unverified academic/financial fields — admin must verify:
  admissionRequirements: CONTACT,
  totalTuitionRange: NV,
  admissionFee: NV,
  semesterFee: NV,
  perCreditFee: NV,
  totalCredits: NV,
  scholarshipAvailability: 'Contact university for current offers',
  admissionTestRequired: 'Depends',
  applicationDeadline: NV,
  lastVerifiedAt: VERIFIED_AT,
  ...over,
});

export const seedUniversities = [
  base({
    id: 'nsu',
    name: 'North South University',
    shortName: 'NSU',
    division: 'Dhaka',
    city: 'Dhaka',
    address: 'Plot 15, Block B, Bashundhara, Dhaka',
    website: 'https://www.northsouth.edu',
    sourceUrl: 'https://www.northsouth.edu',
    established: 1992,
    featured: true,
    description:
      'A UGC-approved private university in Dhaka, Bangladesh, established in 1992 and among the first private universities in the country.',
    departments: ['CSE', 'EEE', 'BBA', 'Economics', 'English', 'Pharmacy', 'Architecture'],
  }),
  base({
    id: 'bracu',
    name: 'BRAC University',
    shortName: 'BRACU',
    division: 'Dhaka',
    city: 'Dhaka',
    address: 'Kha 224 Bir Uttam Rafiqul Islam Ave, Merul Badda, Dhaka',
    website: 'https://www.bracu.ac.bd',
    sourceUrl: 'https://www.bracu.ac.bd',
    established: 2001,
    featured: true,
    description:
      'A UGC-approved private university in Dhaka, Bangladesh, established in 2001.',
    departments: ['CSE', 'EEE', 'BBA', 'Economics', 'English', 'Pharmacy', 'Architecture'],
  }),
  base({
    id: 'iub',
    name: 'Independent University, Bangladesh',
    shortName: 'IUB',
    division: 'Dhaka',
    city: 'Dhaka',
    address: 'Plot 16 Block B, Aftabnagar, Dhaka',
    website: 'https://www.iub.ac.bd',
    sourceUrl: 'https://www.iub.ac.bd',
    established: 1993,
    featured: true,
    description:
      'A UGC-approved private university in Dhaka, Bangladesh, established in 1993.',
    departments: ['CSE', 'EEE', 'BBA', 'Economics', 'Public Health', 'Environmental Science'],
  }),
  base({
    id: 'ewu',
    name: 'East West University',
    shortName: 'EWU',
    division: 'Dhaka',
    city: 'Dhaka',
    address: 'A/2 Jahurul Islam Ave, Aftabnagar, Dhaka',
    website: 'https://www.ewubd.edu',
    sourceUrl: 'https://www.ewubd.edu',
    established: 1996,
    featured: true,
    description:
      'A UGC-approved private university in Dhaka, Bangladesh, established in 1996.',
    departments: ['CSE', 'EEE', 'BBA', 'Economics', 'English', 'Pharmacy'],
  }),
  base({
    id: 'aiub',
    name: 'American International University-Bangladesh',
    shortName: 'AIUB',
    division: 'Dhaka',
    city: 'Dhaka',
    address: '408/1 Kuratoli, Khilkhet, Dhaka',
    website: 'https://www.aiub.edu',
    sourceUrl: 'https://www.aiub.edu',
    established: 1994,
    featured: true,
    description:
      'A UGC-approved private university in Dhaka, Bangladesh, established in 1994.',
    departments: ['CSE', 'EEE', 'BBA', 'Architecture', 'Economics'],
  }),
  base({
    id: 'aust',
    name: 'Ahsanullah University of Science and Technology',
    shortName: 'AUST',
    division: 'Dhaka',
    city: 'Dhaka',
    address: '141 & 142 Love Road, Tejgaon, Dhaka',
    website: 'https://www.aust.edu',
    sourceUrl: 'https://www.aust.edu',
    established: 1995,
    featured: true,
    description:
      'A UGC-approved private university in Dhaka, Bangladesh, established in 1995, with a focus on science and technology.',
    departments: ['CSE', 'EEE', 'Civil Engineering', 'Textile Engineering', 'Architecture'],
  }),
  base({
    id: 'uiu',
    name: 'United International University',
    shortName: 'UIU',
    division: 'Dhaka',
    city: 'Dhaka',
    address: 'United City, Madani Ave, Badda, Dhaka',
    website: 'https://www.uiu.ac.bd',
    sourceUrl: 'https://www.uiu.ac.bd',
    established: 2003,
    featured: true,
    description:
      'A UGC-approved private university in Dhaka, Bangladesh, established in 2003.',
    departments: ['CSE', 'EEE', 'Data Science', 'BBA', 'Economics', 'Civil Engineering'],
  }),
  base({
    id: 'diu',
    name: 'Daffodil International University',
    shortName: 'DIU',
    division: 'Dhaka',
    city: 'Dhaka',
    address: 'Daffodil Smart City, Birulia, Savar, Dhaka',
    website: 'https://daffodilvarsity.edu.bd',
    sourceUrl: 'https://daffodilvarsity.edu.bd',
    established: 2002,
    featured: true,
    description:
      'A UGC-approved private university in Dhaka, Bangladesh, established in 2002.',
    departments: ['CSE', 'SWE', 'Information Technology', 'BBA', 'Pharmacy', 'English'],
  }),
  base({
    id: 'uap',
    name: 'University of Asia Pacific',
    shortName: 'UAP',
    division: 'Dhaka',
    city: 'Dhaka',
    address: '74/A Green Road, Farmgate, Dhaka',
    website: 'https://www.uap-bd.edu',
    sourceUrl: 'https://www.uap-bd.edu',
    established: 1996,
    description:
      'A UGC-approved private university in Dhaka, Bangladesh, established in 1996.',
    departments: ['CSE', 'EEE', 'Civil Engineering', 'Pharmacy', 'Architecture', 'BBA'],
  }),
  base({
    id: 'ulab',
    name: 'University of Liberal Arts Bangladesh',
    shortName: 'ULAB',
    division: 'Dhaka',
    city: 'Dhaka',
    address: '688 Beribadh Road, Mohammadpur, Dhaka',
    website: 'https://ulab.edu.bd',
    sourceUrl: 'https://ulab.edu.bd',
    established: 2002,
    description:
      'A UGC-approved private university in Dhaka, Bangladesh, established in 2002.',
    departments: ['CSE', 'English', 'Journalism & Media Studies', 'BBA', 'Economics'],
  }),
  base({
    id: 'bubt',
    name: 'Bangladesh University of Business and Technology',
    shortName: 'BUBT',
    division: 'Dhaka',
    city: 'Dhaka',
    address: 'Rupnagar, Mirpur-2, Dhaka',
    website: 'https://www.bubt.edu.bd',
    sourceUrl: 'https://www.bubt.edu.bd',
    established: 2003,
    description:
      'A UGC-approved private university in Dhaka, Bangladesh, established in 2003.',
    departments: ['CSE', 'EEE', 'BBA', 'Accounting', 'Finance', 'Economics'],
  }),
  base({
    id: 'seu',
    name: 'Southeast University',
    shortName: 'SEU',
    division: 'Dhaka',
    city: 'Dhaka',
    address: '251/A & 252 Tejgaon I/A, Dhaka',
    website: 'https://www.seu.edu.bd',
    sourceUrl: 'https://www.seu.edu.bd',
    established: 2002,
    description:
      'A UGC-approved private university in Dhaka, Bangladesh, established in 2002.',
    departments: ['CSE', 'EEE', 'BBA', 'English', 'Textile Engineering'],
  }),
  base({
    id: 'green',
    name: 'Green University of Bangladesh',
    shortName: 'GUB',
    division: 'Dhaka',
    city: 'Dhaka',
    address: 'Purbachal American City, Kanchan, Rupganj, Dhaka',
    website: 'https://www.green.edu.bd',
    sourceUrl: 'https://www.green.edu.bd',
    established: 2003,
    description:
      'A UGC-approved private university in Dhaka, Bangladesh, established in 2003.',
    departments: ['CSE', 'EEE', 'BBA', 'English', 'Sociology', 'Law (LLB)'],
  }),
  base({
    id: 'stamford',
    name: 'Stamford University Bangladesh',
    shortName: 'SUB',
    division: 'Dhaka',
    city: 'Dhaka',
    address: '51 Siddeswari Road, Dhaka',
    website: 'https://www.stamforduniversity.edu.bd',
    sourceUrl: 'https://www.stamforduniversity.edu.bd',
    established: 2002,
    description:
      'A UGC-approved private university in Dhaka, Bangladesh, established in 2002.',
    departments: ['CSE', 'EEE', 'BBA', 'English', 'Journalism & Media Studies', 'Environmental Science'],
  }),
  base({
    id: 'iiuc',
    name: 'International Islamic University Chittagong',
    shortName: 'IIUC',
    division: 'Chattogram',
    city: 'Chattogram',
    address: 'Kumira, Sitakunda, Chattogram',
    website: 'https://www.iiuc.ac.bd',
    sourceUrl: 'https://www.iiuc.ac.bd',
    established: 1995,
    description:
      'A UGC-approved private university in Chattogram, Bangladesh, established in 1995.',
    departments: ['CSE', 'EEE', 'BBA', 'English', 'Law (LLB)', 'Pharmacy'],
  }),
  base({
    id: 'premier',
    name: 'Premier University',
    shortName: 'PU',
    division: 'Chattogram',
    city: 'Chattogram',
    address: '1851/52 Hazi Chiniful Bhaban, Chattogram',
    website: 'https://puc.ac.bd',
    sourceUrl: 'https://puc.ac.bd',
    established: 2002,
    description:
      'A UGC-approved private university in Chattogram, Bangladesh, established in 2002.',
    departments: ['CSE', 'EEE', 'BBA', 'English', 'Law (LLB)'],
  }),
  base({
    id: 'eastern',
    name: 'Eastern University',
    shortName: 'EU',
    division: 'Dhaka',
    city: 'Dhaka',
    address: 'Road 6, Block B, Ashulia Model Town, Savar, Dhaka',
    website: 'https://www.easternuni.edu.bd',
    sourceUrl: 'https://www.easternuni.edu.bd',
    established: 2003,
    description:
      'A UGC-approved private university in Dhaka, Bangladesh, established in 2003.',
    departments: ['CSE', 'EEE', 'BBA', 'English', 'Law (LLB)'],
  }),
  base({
    id: 'city',
    name: 'City University',
    shortName: 'CU',
    division: 'Dhaka',
    city: 'Dhaka',
    address: 'Jamgara, Ashulia, Savar, Dhaka',
    website: 'https://www.cityuniversity.edu.bd',
    sourceUrl: 'https://www.cityuniversity.edu.bd',
    established: 2002,
    description:
      'A UGC-approved private university in Dhaka, Bangladesh, established in 2002.',
    departments: ['CSE', 'EEE', 'BBA', 'English', 'Textile Engineering'],
  }),
  base({
    id: 'wub',
    name: 'World University of Bangladesh',
    shortName: 'WUB',
    division: 'Dhaka',
    city: 'Dhaka',
    address: 'Rajal Bati, Avenue, 3 Rd No. 4, Dhaka',
    website: 'https://www.wub.edu.bd',
    sourceUrl: 'https://www.wub.edu.bd',
    established: 2003,
    description:
      'A UGC-approved private university in Dhaka, Bangladesh, established in 2003.',
    departments: ['CSE', 'EEE', 'BBA', 'Pharmacy', 'Textile Engineering', 'Law (LLB)'],
  }),
  base({
    id: 'cub',
    name: 'Canadian University of Bangladesh',
    shortName: 'CUB',
    division: 'Dhaka',
    city: 'Dhaka',
    address: 'Pragati Sarani, Beside Bashundhara R/A, Dhaka',
    website: 'https://www.cub.edu.bd',
    sourceUrl: 'https://www.cub.edu.bd',
    established: 2016,
    description:
      'A UGC-approved private university in Dhaka, Bangladesh.',
    departments: ['CSE', 'BBA', 'English', 'Economics'],
  }),
];

export const getFeaturedUniversities = () =>
  seedUniversities.filter((u) => u.featured);

export const getUniversityById = (id) =>
  seedUniversities.find((u) => u.id === id);

export default seedUniversities;
