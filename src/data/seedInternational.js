/**
 * Seed data — 5 international universities (1 per country).
 *
 * DATA HONESTY RULES:
 *  - Only publicly verifiable facts: name, country, city, official website.
 *  - Tuition, living costs, IELTS/TOEFL thresholds, deadlines and scholarships
 *    are NOT invented — marked "Not verified" / "Contact university".
 *  - Each record carries `sourceUrl` + `lastVerifiedAt`.
 *  - Admins can add more countries/universities later.
 */

const NV = 'Not verified';
const CONTACT = 'Contact university';
const VERIFIED_AT = '2026-11-15';

export const countries = [
  { id: 'usa', name: 'United States', currency: 'USD', flag: '🇺🇸' },
  { id: 'uk', name: 'United Kingdom', currency: 'GBP', flag: '🇬🇧' },
  { id: 'canada', name: 'Canada', currency: 'CAD', flag: '🇨🇦' },
  { id: 'australia', name: 'Australia', currency: 'AUD', flag: '🇦🇺' },
  { id: 'malaysia', name: 'Malaysia', currency: 'MYR', flag: '🇲🇾' },
];

const base = (over) => ({
  logo: null,
  departments: [],
  tuitionFees: NV,
  livingCosts: NV,
  applicationFee: NV,
  languageRequirements: CONTACT, // IELTS/TOEFL/PTE — verify on official site
  minimumSscHsc: CONTACT,
  admissionRequirements: CONTACT,
  scholarshipInfo: 'Contact university for current offers',
  visaRequirements: 'See the destination country official immigration authority',
  admissionProcess: CONTACT,
  requiredDocuments: CONTACT,
  applicationDeadline: NV,
  lastVerifiedAt: VERIFIED_AT,
  ...over,
});

export const seedInternationalUniversities = [
  base({
    id: 'unt',
    countryId: 'usa',
    name: 'University of North Texas',
    city: 'Denton, Texas',
    website: 'https://www.unt.edu',
    sourceUrl: 'https://www.unt.edu',
    departments: ['Computer Science', 'Business', 'Engineering', 'Data Science'],
  }),
  base({
    id: 'herts',
    countryId: 'uk',
    name: 'University of Hertfordshire',
    city: 'Hatfield, England',
    website: 'https://www.herts.ac.uk',
    sourceUrl: 'https://www.herts.ac.uk',
    departments: ['Computer Science', 'Business', 'Engineering'],
  }),
  base({
    id: 'windsor',
    countryId: 'canada',
    name: 'University of Windsor',
    city: 'Windsor, Ontario',
    website: 'https://www.uwindsor.ca',
    sourceUrl: 'https://www.uwindsor.ca',
    departments: ['Computer Science', 'Business', 'Engineering'],
  }),
  base({
    id: 'deakin',
    countryId: 'australia',
    name: 'Deakin University',
    city: 'Melbourne, Victoria',
    website: 'https://www.deakin.edu.au',
    sourceUrl: 'https://www.deakin.edu.au',
    departments: ['IT', 'Business', 'Engineering', 'Health'],
  }),
  base({
    id: 'apu',
    countryId: 'malaysia',
    name: 'Asia Pacific University of Technology & Innovation',
    city: 'Kuala Lumpur',
    website: 'https://www.apu.edu.my',
    sourceUrl: 'https://www.apu.edu.my',
    departments: ['Computing', 'Business', 'Engineering'],
  }),
];

export const getCountryById = (id) => countries.find((c) => c.id === id);

export default seedInternationalUniversities;
