import { admissionRequirements, programmes } from "@/data/unimatchData";
import { seedUniversities } from "@/data/seedUniversities";

export function parseMoney(value) {
  if (
    !value ||
    /not published|not stated|not itemised|contact|verify/i.test(String(value))
  )
    return null;
  const n = Number(String(value).replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) && n > 0 ? n : null;
}

export function formatBDT(value) {
  return value == null ? "Not published" : `৳ ${value.toLocaleString("en-BD")}`;
}

export function getRequirements(university, programme) {
  const rows = admissionRequirements.filter((r) => r.university === university);
  if (!rows.length) return [];
  const p = String(programme || "").toLowerCase();
  const specific = rows.filter((r) => {
    const label = r.applicableProgramme.toLowerCase();
    if (/general|all ug/.test(label)) return false;
    const tokens = p.split(/[^a-z0-9]+/).filter((t) => t.length > 2);
    const bbaMatch = /bba/.test(label) && /business administration|bba/.test(p);
    const pharmacyMatch = /pharm/.test(label) && /pharmacy|pharm/.test(p);
    const cseMatch = /cse/.test(label) && /computer science|cse/.test(p);
    const engineeringMatch = /engineering/.test(label) && /engineering/.test(p);
    return (
      tokens.some((t) => label.includes(t)) ||
      bbaMatch ||
      pharmacyMatch ||
      cseMatch ||
      engineeringMatch
    );
  });
  const general = rows.filter((r) =>
    /general|all ug/i.test(r.applicableProgramme),
  );
  return [...specific, ...general].filter(
    (r, i, a) => a.findIndex((x) => x.id === r.id) === i,
  );
}

export function checkGpaEligibility(requirementRows, ssc, hsc) {
  if (!requirementRows.length)
    return {
      status: "Not verified",
      reason: "No programme-specific admission requirement was captured.",
    };
  const known = requirementRows.find(
    (r) =>
      Number.isFinite(Number(r.sscGpa)) && Number.isFinite(Number(r.hscGpa)),
  );
  if (!known)
    return {
      status: "Potential — verify",
      reason:
        "Numeric GPA cut-offs not stated. Check the current admission circular.",
    };
  if (ssc === "" || hsc === "" || ssc == null || hsc == null)
    return {
      status: "GPA needed",
      reason: "Enter both SSC and HSC GPA to check the published minimum.",
    };
  const s = Number(ssc),
    h = Number(hsc);
  if (!Number.isFinite(s) || !Number.isFinite(h))
    return {
      status: "GPA needed",
      reason: "Enter valid SSC and HSC GPA values.",
    };
  const combinedRule = String(known.combinedGpa).match(/([0-9]+(?:\.[0-9]+)?)/);
  const combined = combinedRule ? Number(combinedRule[1]) : null;
  const eitherTwoRule =
    /either|one exam|one examination|one GPA|if a result/i.test(
      `${known.generalEligibility} ${known.combinedGpa}`,
    );
  const normalPass = s >= Number(known.sscGpa) && h >= Number(known.hscGpa);
  const exceptionPass =
    eitherTwoRule && combined != null && s >= 2 && h >= 2 && s + h >= combined;
  if (!normalPass && !exceptionPass)
    return {
      status: "Below published GPA",
      reason: `Minimum required: SSC ${known.sscGpa}, HSC ${known.hscGpa}${combined ? ` (or combined ${combined})` : ""}.`,
    };
  const subjects = requirementRows
    .map((r) => r.requiredSubjects)
    .filter(Boolean)
    .join(" ");
  if (subjects && !/not applicable|none/i.test(subjects))
    return {
      status: "Eligible (GPA met)",
      reason: `Meets min GPA (SSC ${known.sscGpa} / HSC ${known.hscGpa}). Confirm subject prerequisites.`,
    };
  return {
    status: "Eligible (GPA met)",
    reason: `Meets min GPA (SSC ${known.sscGpa} / HSC ${known.hscGpa}).`,
  };
}

export function getProgrammeRows(university) {
  return programmes.filter((p) => p.university === university);
}

// শুধু Undergraduate ডিপার্টমেন্ট ফিল্টার করা (Masters ও Diploma-only বাদ দিয়ে)
export function isUndergraduateProgramme(progName) {
  const p = String(progName || "").trim();
  if (
    /^(MBA|EMBA|E-MBA|MSc|M\.Sc|MA\b|M\.A|LLM|LL\.M|MPharm|M\.Pharm|MPH|MPHO|MEd|M\.Ed|MEng|M\.Engg|MSS|M\.S\.S|Master|MCA|MCS|MBM|MNFS|MDS)\b/i.test(
      p,
    )
  ) {
    return false;
  }
  if (
    /\(Diploma|For Diploma|Diploma Holder|Diploma Intake|Diploma Passed|weekend|conflicting source/i.test(
      p,
    )
  ) {
    return false;
  }
  return true;
}

// ডিপার্টমেন্টের নাম অনুযায়ী Science / Commerce / Arts গ্রুপ নির্ধারণ
export function getProgrammeBackground(progName) {
  const p = String(progName || "").toLowerCase();

  // Commerce / Business
  if (
    /\b(bba|business|accounting|finance|marketing|management|economics|bseco|tourism|hospitality|bthm|ithm|entrepreneurship|real estate|agribusiness|ais)\b/.test(
      p,
    ) &&
    !/textile engineering|environmental management|library|information science/.test(
      p,
    )
  ) {
    return "Commerce";
  }

  // Science / Engineering / Health / Tech
  if (
    /\b(cse|eee|ece|ete|cce|ce|me|ipe|csit|cs|it|itm|swe|bsc|b\.sc|b\. ?pharm|bpharm|pharmacy|engineering|computer|software|electrical|electronic|civil|mechanical|textile|architecture|barch|b\.arch|microbiology|biochemistry|biotechnology|genetic|physics|chemistry|mathematics|math|data science|artificial intelligence|cyber|robotics|automobile|mechatronics|agriculture|nursing|nutrition|food|environmental|public health|bph|maritime|apparel manufacturing|knitwear)\b/.test(
      p,
    )
  ) {
    return "Science";
  }

  // Arts / Humanities / Law / Social Science
  return "Arts / Humanities";
}

// ইউনিভার্সিটির নাম ম্যাচ করার হেল্পার
const normalizeUniName = (name) =>
  String(name || "")
    .replace(/\([^)]*\)/g, "")
    .replace(/[^a-z0-9]/gi, "")
    .toLowerCase();

// Quick Search-এর সব ক্রাইটেরিয়া অনুযায়ী ডিপার্টমেন্ট + ইউনিভার্সিটি ম্যাচিং
export function searchMatchedDepartments({
  sscGpa,
  hscGpa,
  background,
  minBudget,
  maxBudget,
  division,
  query = "",
}) {
  const uniMap = new Map();
  seedUniversities.forEach((u) => {
    uniMap.set(normalizeUniName(u.name), u);
  });

  const minB = minBudget !== "" && minBudget != null ? Number(minBudget) : null;
  const maxB = maxBudget !== "" && maxBudget != null ? Number(maxBudget) : null;
  const q = query.trim().toLowerCase();

  const matches = [];

  for (const prog of programmes) {
    if (!isUndergraduateProgramme(prog.programme)) continue;

    const uni = uniMap.get(normalizeUniName(prog.university));
    if (!uni) continue;

    // 1. Division filter
    if (division && division !== "All" && uni.division !== division) {
      continue;
    }

    // 2. Background (Science / Commerce / Arts) filter
    const progGroup = getProgrammeBackground(prog.programme);
    if (background && progGroup !== background) {
      continue;
    }

    // 3. Budget filter (Total Degree Cost)
    const numericCost = parseMoney(prog.totalDegreeCost);
    if (minB != null || maxB != null) {
      if (numericCost == null) continue;
      if (minB != null && numericCost < minB) continue;
      if (maxB != null && numericCost > maxB) continue;
    }

    // 4. Optional text search refinement
    if (q) {
      const matchProg = prog.programme.toLowerCase().includes(q);
      const matchUni =
        uni.name.toLowerCase().includes(q) ||
        (uni.shortName && uni.shortName.toLowerCase().includes(q));
      const matchCity =
        (uni.city && uni.city.toLowerCase().includes(q)) ||
        (uni.division && uni.division.toLowerCase().includes(q));
      if (!matchProg && !matchUni && !matchCity) continue;
    }

    // 5. GPA Eligibility Check
    const reqRows = getRequirements(uni.name, prog.programme);
    const eligibility = checkGpaEligibility(reqRows, sscGpa, hscGpa);

    matches.push({
      id: prog.id,
      programme: prog.programme,
      group: progGroup,
      totalCredits: prog.totalCredits,
      perCreditFee: prog.perCreditFee,
      totalDegreeCost: prog.totalDegreeCost,
      numericCost,
      university: uni,
      eligibility,
    });
  }

  // যেগুলোতে GPA মিলেছে সেগুলো আগে এবং কম খরচ থেকে বেশি খরচ ক্রমে সাজানো
  matches.sort((a, b) => {
    const aPass = a.eligibility.status.startsWith("Eligible") ? 0 : 1;
    const bPass = b.eligibility.status.startsWith("Eligible") ? 0 : 1;
    if (aPass !== bPass) return aPass - bPass;
    return (a.numericCost || 0) - (b.numericCost || 0);
  });

  return matches;
}
