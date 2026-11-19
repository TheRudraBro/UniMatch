import { useState, useMemo, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, SlidersHorizontal, RotateCcw } from "lucide-react";
import Section from "@/components/common/Section";
import SectionHeading from "@/components/common/SectionHeading";
import { Input } from "@/components/common/Field";
import UniversityCard from "@/components/common/UniversityCard";
import MatchedProgramCard from "@/components/common/MatchedProgramCard";
import { seedUniversities } from "@/data/seedUniversities";
import { searchMatchedDepartments, formatBDT } from "@/utils/admission";
import Button from "@/components/common/Button";
import Badge from "@/components/common/Badge";

export default function FindResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  // Quick Search parameters from URL
  const sscGpa = searchParams.get("sscGpa");
  const hscGpa = searchParams.get("hscGpa");
  const background = searchParams.get("background");
  const minBudget = searchParams.get("minBudget");
  const maxBudget = searchParams.get("maxBudget");
  const division = searchParams.get("division");

  const isQuickMatchMode = Boolean(
    background || minBudget || maxBudget || division || sscGpa || hscGpa,
  );

  useEffect(() => {
    setSearchQuery(searchParams.get("q") || "");
  }, [searchParams]);

  // Mode 1: Quick Match Mode (Department + University + Fees on Card)
  const matchedDepartments = useMemo(() => {
    if (!isQuickMatchMode) return [];
    return searchMatchedDepartments({
      sscGpa,
      hscGpa,
      background,
      minBudget,
      maxBudget,
      division,
      query: searchQuery,
    });
  }, [
    isQuickMatchMode,
    sscGpa,
    hscGpa,
    background,
    minBudget,
    maxBudget,
    division,
    searchQuery,
  ]);

  // Mode 2: Normal Directory Mode
  const filteredUniversities = useMemo(() => {
    if (isQuickMatchMode) return [];
    if (!searchQuery.trim()) return seedUniversities;

    const query = searchQuery.toLowerCase();

    return seedUniversities.filter((uni) => {
      const matchName = uni.name.toLowerCase().includes(query);
      const matchShortName =
        uni.shortName && uni.shortName.toLowerCase().includes(query);
      const matchCity = uni.city && uni.city.toLowerCase().includes(query);
      const matchDivision =
        uni.division && uni.division.toLowerCase().includes(query);
      const matchDept =
        uni.departments &&
        uni.departments.some((dept) => dept.toLowerCase().includes(query));

      return (
        matchName || matchShortName || matchCity || matchDivision || matchDept
      );
    });
  }, [isQuickMatchMode, searchQuery]);

  const handleResetAll = () => {
    setSearchQuery("");
    setSearchParams({});
  };

  return (
    <Section className="min-h-screen">
      <SectionHeading
        eyebrow={isQuickMatchMode ? "Smart Match Results" : "Directory"}
        title={
          isQuickMatchMode
            ? "Matched Departments & Universities"
            : "Find Universities"
        }
        subtitle={
          isQuickMatchMode
            ? "Showing undergraduate departments matching your academic group, GPA, location, and budget."
            : "Search through the top private universities in Bangladesh."
        }
      />

      {/* Active Quick Search Criteria Summary */}
      {isQuickMatchMode && (
        <div className="max-w-5xl mx-auto mt-8 card-base p-4 sm:p-5 bg-brand-500/5 border-brand-500/20 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 font-semibold text-content mr-1">
              <SlidersHorizontal className="h-4 w-4 text-brand-500" /> Your
              Profile:
            </span>
            {sscGpa && <Badge tone="info">SSC: {sscGpa}</Badge>}
            {hscGpa && <Badge tone="info">HSC: {hscGpa}</Badge>}
            {background && <Badge tone="info">Group: {background}</Badge>}
            {(minBudget || maxBudget) && (
              <Badge tone="warning">
                Budget: {formatBDT(Number(minBudget || 0))} –{" "}
                {formatBDT(Number(maxBudget || 0))}
              </Badge>
            )}
            {division && <Badge tone="info">Division: {division}</Badge>}
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="text-xs font-semibold text-brand-600 dark:text-brand-300 hover:underline"
            >
              Modify Search
            </Link>
            <span className="text-line">|</span>
            <button
              onClick={handleResetAll}
              className="inline-flex items-center gap-1 text-xs font-semibold text-red-500 hover:underline"
            >
              <RotateCcw className="h-3.5 w-3.5" /> View All Universities
            </button>
          </div>
        </div>
      )}

      {/* Top Search Bar */}
      <div className="max-w-3xl mx-auto mt-8 mb-10">
        <div className="relative shadow-sm">
          <Input
            type="text"
            placeholder={
              isQuickMatchMode
                ? "Filter matched results by department or university (e.g. CSE, BBA, NSU)..."
                : "Search by university name, city, or department (e.g. CSE, Dhaka, BRAC)..."
            }
            value={searchQuery}
            onChange={(e) => {
              const val = e.target.value;
              setSearchQuery(val);
              const next = new URLSearchParams(searchParams);
              if (val) next.set("q", val);
              else next.delete("q");
              setSearchParams(next);
            }}
            className="pl-14 h-14 text-base rounded-2xl border-brand-500/20 focus:border-brand-500"
          />
          <Search className="w-6 h-6 text-content-muted absolute left-4 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Results Area */}
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 flex items-center justify-between bg-surface-muted p-4 rounded-xl border border-line">
          <p className="text-sm text-content-muted">
            {isQuickMatchMode ? (
              <>
                Showing{" "}
                <span className="font-bold text-content">
                  {matchedDepartments.length}
                </span>{" "}
                matching departments within your criteria
              </>
            ) : (
              <>
                Showing{" "}
                <span className="font-bold text-content">
                  {filteredUniversities.length}
                </span>{" "}
                universities
              </>
            )}
          </p>
        </div>

        {/* Render Matched Department Cards OR Directory University Cards */}
        {isQuickMatchMode ? (
          matchedDepartments.length > 0 ? (
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
              {matchedDepartments.map((item) => (
                <MatchedProgramCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="card-base p-12 text-center border-dashed shadow-none bg-surface-muted/30 max-w-2xl mx-auto">
              <span className="grid w-16 h-16 place-items-center rounded-full bg-card mx-auto mb-4 border border-line">
                <Search className="w-6 h-6 text-content-muted opacity-50" />
              </span>
              <h3 className="text-lg font-semibold text-content mb-2">
                No matching departments found in this budget
              </h3>
              <p className="text-sm text-content-muted mb-6">
                Try increasing your Max Budget or selecting "All Divisions" to
                see more eligible programs.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button to="/">Update Budget / Criteria</Button>
                <Button variant="secondary" onClick={handleResetAll}>
                  Browse All Universities
                </Button>
              </div>
            </div>
          )
        ) : filteredUniversities.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            {filteredUniversities.map((uni) => (
              <UniversityCard key={uni.id} uni={uni} />
            ))}
          </div>
        ) : (
          <div className="card-base p-12 text-center border-dashed shadow-none bg-surface-muted/30 max-w-2xl mx-auto">
            <span className="grid w-16 h-16 place-items-center rounded-full bg-card mx-auto mb-4 border border-line">
              <Search className="w-6 h-6 text-content-muted opacity-50" />
            </span>
            <h3 className="text-lg font-semibold text-content mb-2">
              No results found
            </h3>
            <p className="text-sm text-content-muted mb-6">
              We couldn't find any universities, cities, or departments matching
              "{searchQuery}".
            </p>
            <Button onClick={handleResetAll}>Clear Search</Button>
          </div>
        )}
      </div>
    </Section>
  );
}
