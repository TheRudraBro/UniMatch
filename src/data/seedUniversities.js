/**
 * University directory generated from the supplied 31-university workbook.
 * The workbook provides district/area and programme counts, not official URLs,
 * addresses or establishment dates; those fields are intentionally omitted.
 */
import { universities, programmes } from "./unimatchData";

export const seedUniversities = universities.map((u) => ({
  id: u.id,
  name: u.name,
  shortName:
    u.name.match(/\(([^)]+)\)/)?.[1] ||
    u.name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 5)
      .toUpperCase(),
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
}));

export const getFeaturedUniversities = () => seedUniversities;
export const getUniversityById = (id) =>
  seedUniversities.find((u) => u.id === id);
export default seedUniversities;
