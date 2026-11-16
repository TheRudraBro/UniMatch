import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";
import Section from "@/components/common/Section";
import SectionHeading from "@/components/common/SectionHeading";
import Badge from "@/components/common/Badge";
import Button from "@/components/common/Button";
import { universities, programmes } from "@/data/unimatchData";
import {
  parseMoney,
  formatBDT,
  getRequirements,
  checkGpaEligibility,
} from "@/utils/admission";

export default function FindResults() {
  const [params] = useSearchParams();

  // URL থেকে সব প্যারামিটার নিচ্ছি
  const query = params.get("q") || params.get("query") || ""; // Hero.jsx বা Navbar এর সার্চের জন্য
  const ssc = params.get("sscGpa") || "";
  const hsc = params.get("hscGpa") || "";
  const background = params.get("background") || "";
  const minBudget = params.get("minBudget")
    ? Number(params.get("minBudget"))
    : null;
  const maxBudget = params.get("maxBudget")
    ? Number(params.get("maxBudget"))
    : null;
  const division = params.get("division") || "";

  const results = useMemo(() => {
    return programmes
      .map((p) => {
        const uni = universities.find((u) => u.name === p.university);
        const requirements = getRequirements(p.university, p.programme);
        const eligibility = checkGpaEligibility(requirements, ssc, hsc);
        const cost = parseMoney(p.totalDegreeCost);
        return { ...p, uni, requirements, eligibility, cost };
      })
      .filter((p) => {
        if (!p.uni) return false;

        // --- নতুন টেক্সট সার্চ লজিক (University, Department, City) ---
        if (query) {
          const searchKeyword = query.toLowerCase();
          const uniName = p.uni.name.toLowerCase();
          const uniCity = (
            p.uni.district ||
            p.uni.division ||
            ""
          ).toLowerCase();
          const progName = p.programme.toLowerCase();

          // যদি নাম, শহর বা ডিপার্টমেন্টের সাথে কি-ওয়ার্ড না মেলে, তবে বাদ দিবে
          if (
            !uniName.includes(searchKeyword) &&
            !uniCity.includes(searchKeyword) &&
            !progName.includes(searchKeyword)
          ) {
            return false;
          }
        }

        // --- আগের ফিল্টার লজিকগুলো ---
        if (division && p.uni.division !== division) return false;

        if (background && background !== "Science") {
          const requirementText = p.requirements
            .map((r) => `${r.generalEligibility} ${r.requiredSubjects}`)
            .join(" ");
          if (
            /science background mandatory|only science|science stream/i.test(
              requirementText,
            )
          )
            return false;
        }

        if (
          minBudget != null &&
          minBudget >= 0 &&
          p.cost != null &&
          p.cost < minBudget
        )
          return false;
        if (
          maxBudget != null &&
          maxBudget >= 0 &&
          p.cost != null &&
          p.cost > maxBudget
        )
          return false;

        return true;
      })
      .sort((a, b) => {
        const aFits =
          (minBudget == null || a.cost == null || a.cost >= minBudget) &&
          (maxBudget == null || a.cost == null || a.cost <= maxBudget);
        const bFits =
          (minBudget == null || b.cost == null || b.cost >= minBudget) &&
          (maxBudget == null || b.cost == null || b.cost <= maxBudget);
        return (
          Number(bFits) - Number(aFits) ||
          (a.cost ?? Infinity) - (b.cost ?? Infinity)
        );
      });
  }, [query, ssc, hsc, background, minBudget, maxBudget, division]);

  const universityCount = new Set(results.map((r) => r.university)).size;

  return (
    <Section>
      <SectionHeading
        eyebrow="Search Results"
        title="Your university matches"
        subtitle="Programme-level fees and admission notes from the supplied UniMatch workbook. Matching is a guide, not an admission decision."
      />

      <div className="mb-6 rounded-2xl border border-line bg-surface p-4 text-sm text-content-muted">
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {query && (
            <span>
              Keyword:{" "}
              <b className="text-brand-600 dark:text-brand-300">"{query}"</b>
            </span>
          )}
          {ssc && (
            <span>
              SSC: <b className="text-content">{ssc}</b>
            </span>
          )}
          {hsc && (
            <span>
              HSC: <b className="text-content">{hsc}</b>
            </span>
          )}
          {background && (
            <span>
              Background: <b className="text-content">{background}</b>
            </span>
          )}
          {(minBudget != null || maxBudget != null) && (
            <span>
              Budget:{" "}
              <b className="text-content">
                {`${minBudget == null ? "No minimum" : formatBDT(minBudget)} – ${maxBudget == null ? "No maximum" : formatBDT(maxBudget)}`}
              </b>
            </span>
          )}
          {division && (
            <span>
              Division: <b className="text-content">{division}</b>
            </span>
          )}
        </div>

        <p className="mt-4">
          Showing <strong className="text-content">{results.length}</strong>{" "}
          programme records across{" "}
          <strong className="text-content">{universityCount}</strong>{" "}
          universities.
        </p>
      </div>

      {results.length === 0 ? (
        <div className="card-base p-8 text-center">
          <h3 className="text-xl font-semibold text-content">
            No programme matches these filters
          </h3>
          <p className="mt-2 text-sm text-content-muted">
            Try searching with a different university name, department, or
            clearing some filters.
          </p>
          <Button to="/find" variant="outline" className="mt-6">
            Clear all filters
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {results.map((p) => (
            <article key={p.id} className="card-base p-5">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-300">
                    {p.university}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-content">
                    {p.programme}
                  </h3>
                  <p className="mt-1 flex items-center gap-1 text-xs text-content-muted">
                    <MapPin className="h-3.5 w-3.5" />
                    {p.uni.district}, {p.uni.division} Division
                  </p>
                </div>
                <Badge
                  tone={
                    p.eligibility.status.includes("Below")
                      ? "danger"
                      : p.eligibility.status.includes("met")
                        ? "success"
                        : "warning"
                  }
                >
                  {p.eligibility.status}
                </Badge>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-surface-muted p-3">
                  <p className="text-xs text-content-muted">
                    Total degree cost
                  </p>
                  <p className="mt-1 font-semibold text-content">
                    {p.totalDegreeCost || "Not published"}
                  </p>
                </div>
                <div className="rounded-xl bg-surface-muted p-3">
                  <p className="text-xs text-content-muted">Total credits</p>
                  <p className="mt-1 font-semibold text-content">
                    {p.totalCredits || "Not published"}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-xs text-content-muted">
                {p.eligibility.reason}
              </p>
              <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
                <Link
                  to={`/university/${p.uni.id}`}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 dark:text-brand-300"
                >
                  University details <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </Section>
  );
}
