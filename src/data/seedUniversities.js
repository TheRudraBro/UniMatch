// src/data/seedUniversities.js

import { universities, programmes } from "./unimatchData";

// ম্যানুয়ালি শর্ট ফর্মগুলোর লিস্ট (যেগুলোর নাম অটোমেটিকভাবে ঠিকমতো আসছে না, সেগুলো এখানে দিন)
const customShortNames = {
  "Ahsanullah University of Science and Technology": "AUST",
  "American International University-Bangladesh": "AIUB",
  "BRAC University": "BRACU",
  "North South University": "NSU",
  "East West University": "EWU",
  "Daffodil International University": "DIU",
  "Independent University, Bangladesh": "IUB",
  // আপনার প্রয়োজন মতো বাকি ইউনিভার্সিটির শর্ট নেম এখানে অ্যাড করতে পারেন
};

export const seedUniversities = universities.map((u) => {
  // প্রথমে চেক করবে কাস্টম লিস্টে নাম আছে কি না
  let finalShortName = customShortNames[u.name];

  // যদি কাস্টম লিস্টে না থাকে, তখন আগের লজিক দিয়ে বানাবে
  if (!finalShortName) {
    finalShortName =
      u.name.match(/\(([^)]+)\)/)?.[1] ||
      u.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 5)
        .toUpperCase();
  }

  return {
    id: u.id,
    name: u.name,
    shortName: finalShortName, // এখানে শর্ট নেমটি সেট হবে
    division: u.division,
    city: u.district,
    address: u.area,
    website: "",
    sourceUrl: "",
    established: null,
    featured: true,
    description: `${u.name} — ${u.district}, Bangladesh. ${u.programmeRows} programme fee records are included in the supplied dataset.`,
    departments: programmes
      .filter((p) => p.university === u.name)
      .map((p) => p.programme),
    ugcStatus: "Check UGC / operation status",
    type: "Private",
    status: "published",
    rating: null,
    totalTuitionRange: "See programme-wise fees",
    lastVerifiedAt: "2026-11-16",
    ugcCaution: u.ugcCaution,
  };
});

export const getFeaturedUniversities = () => seedUniversities;
export const getUniversityById = (id) =>
  seedUniversities.find((u) => u.id === id);
export default seedUniversities;
