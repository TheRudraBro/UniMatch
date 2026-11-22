// src/data/seedUniversities.js

import { universities, programmes } from "./unimatchData";
import { universityWebsites } from "./universityWebsites";

const customShortNames = {
  "Ahsanullah University of Science and Technology": "AUST",
  "American International University-Bangladesh": "AIUB",
  "BRAC University": "BRACU",
  "North South University": "NSU",
  "East West University": "EWU",
  "Daffodil International University": "DIU",
  "Independent University, Bangladesh": "IUB",
};

export const seedUniversities = universities.map((u) => {
  let finalShortName = customShortNames[u.name];

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
    shortName: finalShortName,
    division: u.division,
    city: u.district,
    address: u.area,
    website: universityWebsites[u.id] || "",
    sourceUrl: universityWebsites[u.id] || "",
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
    lastVerifiedAt: "2026-11-22",
    ugcCaution: u.ugcCaution,
  };
});

export const getFeaturedUniversities = () => seedUniversities;
export const getUniversityById = (id) =>
  seedUniversities.find((u) => u.id === id);
export default seedUniversities;
