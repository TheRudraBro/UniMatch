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
      status: "Check Circular",
      reason:
        "Numeric GPA cut-offs not stated. Check the current admission circular.",
    };
  if (ssc === "" || hsc === "" || ssc == null || hsc == null)
    return {
      status: `Min GPA: ${known.sscGpa} / ${known.hscGpa}`,
      reason:
        known.generalEligibility ||
        `Minimum SSC GPA ${known.sscGpa} and HSC GPA ${known.hscGpa} required.`,
    };
  const s = Number(ssc),
    h = Number(hsc);
  if (!Number.isFinite(s) || !Number.isFinite(h))
    return {
      status: `Min GPA: ${known.sscGpa} / ${known.hscGpa}`,
      reason:
        known.generalEligibility ||
        `Minimum SSC GPA ${known.sscGpa} and HSC GPA ${known.hscGpa} required.`,
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

// শুধু Undergraduate ডিপার্টমেন্ট ফিল্টার করা
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

  if (
    /\b(cse|eee|ece|ete|cce|ce|me|ipe|csit|cs|it|itm|swe|bsc|b\.sc|b\. ?pharm|bpharm|pharmacy|engineering|computer|software|electrical|electronic|civil|mechanical|textile|architecture|barch|b\.arch|microbiology|biochemistry|biotechnology|genetic|physics|chemistry|mathematics|math|data science|artificial intelligence|cyber|robotics|automobile|mechatronics|agriculture|nursing|nutrition|food|environmental|public health|bph|maritime|apparel manufacturing|knitwear)\b/.test(
      p,
    )
  ) {
    return "Science";
  }

  return "Arts / Humanities";
}

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

    if (division && division !== "All" && uni.division !== division) {
      continue;
    }

    const progGroup = getProgrammeBackground(prog.programme);
    if (background && progGroup !== background) {
      continue;
    }

    const numericCost = parseMoney(prog.totalDegreeCost);
    if (minB != null || maxB != null) {
      if (numericCost == null) continue;
      if (minB != null && numericCost < minB) continue;
      if (maxB != null && numericCost > maxB) continue;
    }

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

    const reqRows = getRequirements(uni.name, prog.programme);
    const eligibility = checkGpaEligibility(reqRows, sscGpa, hscGpa);

    matches.push({
      id: prog.id,
      programme: prog.programme,
      group: progGroup,
      totalCredits: prog.totalCredits,
      totalSemesters: prog.totalSemesters,
      perCreditFee: prog.perCreditFee,
      firstAdmissionPayment: prog.firstAdmissionPayment,
      totalDegreeCost: prog.totalDegreeCost,
      numericCost,
      university: uni,
      eligibility,
    });
  }

  matches.sort((a, b) => {
    const aPass = a.eligibility.status.startsWith("Eligible") ? 0 : 1;
    const bPass = b.eligibility.status.startsWith("Eligible") ? 0 : 1;
    if (aPass !== bPass) return aPass - bPass;
    return (a.numericCost || 0) - (b.numericCost || 0);
  });

  return matches;
}

// Header / Hero Search থেকে ডিপার্টমেন্ট সার্চ শনাক্ত করার জন্য Alias লিস্ট
const DEPT_SEARCH_ALIASES = [
  [
    /^(cse|cs|computer science|computer engineering|computer|computer science & engineering|computer science and engineering)$/i,
    /\b(cse|computer science|computer engineering)\b/i,
  ],
  [
    /^(eee|electrical|electronic|electronics|ece|ete|electrical & electronic engineering|electrical and electronic engineering)$/i,
    /\b(eee|electrical & electronic|electrical and electronic|electronic & telecommunication|ece|ete)\b/i,
  ],
  [/^(swe|software|software engineering)$/i, /\b(swe|software engineering)\b/i],
  [
    /^(ce|civil|civil engineering)$/i,
    /\b(ce|civil engineering|civil & environmental)\b/i,
  ],
  [
    /^(me|mechanical|mechanical engineering)$/i,
    /\b(me|mechanical engineering)\b/i,
  ],
  [/^(ipe|industrial|industrial engineering)$/i, /\b(ipe|industrial)\b/i],
  [
    /^(textile|te|textile engineering|knitwear|apparel)$/i,
    /\b(textile|knitwear|apparel manufacturing)\b/i,
  ],
  [/^(ds|data science)$/i, /\b(data science)\b/i],
  [
    /^(it|csit|itm|ict|information technology)$/i,
    /\b(information technology|csit|itm|ict|information & communication)\b/i,
  ],
  [
    /^(bba|business|business administration|bachelor of business administration)$/i,
    /\b(bba|business administration)\b/i,
  ],
  [/^(accounting|ais)$/i, /\b(accounting|ais|bba)\b/i],
  [/^(finance|banking)$/i, /\b(finance|bba)\b/i],
  [/^(marketing)$/i, /\b(marketing|bba)\b/i],
  [/^(management|hrm)$/i, /\b(management|bba)\b/i],
  [/^(economics|eco|bseco)$/i, /\b(economics|bseco)\b/i],
  [/^(english|eng|ell|ba english)$/i, /\b(english|ell)\b/i],
  [/^(law|laws|llb|ll\.b)$/i, /\b(law|laws|ll\.?b)\b/i],
  [/^(journalism|media|jms|msj|mcj)$/i, /\b(journalism|media)\b/i],
  [/^(sociology|soc)$/i, /\b(sociology)\b/i],
  [/^(pharmacy|pharm|bpharm|b\.pharm)$/i, /\b(pharm|pharmacy)\b/i],
  [/^(architecture|arch|barch|b\.arch)$/i, /\b(architecture|b\.?arch)\b/i],
  [/^(public health|bph)$/i, /\b(public health|bph)\b/i],
  [/^(environmental|environmental science)$/i, /\b(environmental)\b/i],
  [/^(microbiology)$/i, /\b(microbiology)\b/i],
  [/^(biochemistry)$/i, /\b(biochemistry)\b/i],
  [
    /^(biotechnology|genetic|genetic engineering)$/i,
    /\b(biotechnology|genetic)\b/i,
  ],
  [/^(nursing|bsn)$/i, /\b(nursing)\b/i],
  [/^(agriculture|ag|bsag)$/i, /\b(agriculture)\b/i],
  [
    /^(tourism|hospitality|bthm|ithm)$/i,
    /\b(tourism|hospitality|bthm|ithm)\b/i,
  ],
  [
    /^(fashion|fashion design|graphic design)$/i,
    /\b(fashion|graphic design)\b/i,
  ],
  [/^(bangla)$/i, /\b(bangla)\b/i],
  [/^(islamic|islamic studies)$/i, /\b(islamic)\b/i],
  [/^(political science)$/i, /\b(political science)\b/i],
  [/^(mathematics|math)$/i, /\b(mathematics)\b/i],
  [/^(physics)$/i, /\b(physics)\b/i],
];

// Header বা Hero Search Bar থেকে সার্চ করলে ডিপার্টমেন্ট কি না তা চেক করে প্রোগ্রাম লিস্ট বের করা
export function searchProgrammesByKeyword(query, division = "") {
  const q = String(query || "").trim();
  if (!q) return { isDepartmentSearch: false, results: [] };

  const ql = q.toLowerCase();

  // ইউনিভার্সিটির নাম বা লোকেশন ম্যাচ করছে কি না চেক
  const matchesUniversityOrLocation = seedUniversities.some(
    (u) =>
      u.name.toLowerCase().includes(ql) ||
      (u.shortName && u.shortName.toLowerCase().includes(ql)) ||
      (u.city && u.city.toLowerCase().includes(ql)) ||
      (u.division && u.division.toLowerCase().includes(ql)),
  );

  // ডিপার্টমেন্ট Alias ম্যাচ করছে কি না চেক
  let aliasRegex = null;
  for (const [pattern, targetRegex] of DEPT_SEARCH_ALIASES) {
    if (pattern.test(q)) {
      aliasRegex = targetRegex;
      break;
    }
  }

  const uniMap = new Map();
  seedUniversities.forEach((u) => {
    uniMap.set(normalizeUniName(u.name), u);
  });

  const matchedProgs = [];
  for (const prog of programmes) {
    if (!isUndergraduateProgramme(prog.programme)) continue;

    const isMatch = aliasRegex
      ? aliasRegex.test(prog.programme)
      : ql.length >= 3 && prog.programme.toLowerCase().includes(ql);

    if (!isMatch) continue;

    const uni = uniMap.get(normalizeUniName(prog.university));
    if (!uni) continue;

    if (division && division !== "All" && uni.division !== division) {
      continue;
    }

    const reqRows = getRequirements(uni.name, prog.programme);
    const eligibility = checkGpaEligibility(reqRows, null, null);
    const numericCost = parseMoney(prog.totalDegreeCost);

    matchedProgs.push({
      id: prog.id,
      programme: prog.programme,
      group: getProgrammeBackground(prog.programme),
      totalCredits: prog.totalCredits,
      totalSemesters: prog.totalSemesters,
      perCreditFee: prog.perCreditFee,
      firstAdmissionPayment: prog.firstAdmissionPayment,
      totalDegreeCost: prog.totalDegreeCost,
      numericCost,
      university: uni,
      eligibility,
    });
  }

  // যদি ডিপার্টমেন্ট Alias ম্যাচ করে, অথবা ইউনিভার্সিটি/শহরের নামের বদলে প্রোগ্রামের নাম ম্যাচ করে
  const isDepartmentSearch =
    Boolean(aliasRegex) ||
    (!matchesUniversityOrLocation && matchedProgs.length > 0);

  if (!isDepartmentSearch) {
    return { isDepartmentSearch: false, results: [] };
  }

  // যাদের টোটাল কস্ট দেওয়া আছে সেগুলো আগে এবং কম খরচ থেকে বেশি খরচ ক্রমে সাজানো
  matchedProgs.sort((a, b) => {
    if (a.numericCost == null && b.numericCost == null) return 0;
    if (a.numericCost == null) return 1;
    if (b.numericCost == null) return -1;
    return a.numericCost - b.numericCost;
  });

  return { isDepartmentSearch: true, results: matchedProgs };
}
