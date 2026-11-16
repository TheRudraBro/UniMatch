import { admissionRequirements, programmes } from "@/data/unimatchData";

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
        "The workbook does not state numeric GPA cut-offs. Check the current admission circular.",
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
      reason: `Published minimum: SSC ${known.sscGpa}, HSC ${known.hscGpa}${combined ? `; combined ${combined}` : ""}.`,
    };
  const subjects = requirementRows
    .map((r) => r.requiredSubjects)
    .filter(Boolean)
    .join(" ");
  if (subjects && !/not applicable|none/i.test(subjects))
    return {
      status: "GPA met — check subjects",
      reason:
        "Numeric GPA minimum appears met. Required subjects, group and admission-test conditions still need manual confirmation.",
    };
  return {
    status: "GPA met — confirm",
    reason:
      "Numeric GPA minimum appears met; confirm the current circular and any other conditions.",
  };
}

export function getProgrammeRows(university) {
  return programmes.filter((p) => p.university === university);
}
