import { useState, useMemo, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, SlidersHorizontal, RotateCcw } from "lucide-react";
import Section from "@/components/common/Section";
import SectionHeading from "@/components/common/SectionHeading";
import { Input, Select } from "@/components/common/Field";
import UniversityCard from "@/components/common/UniversityCard";
import MatchedProgramCard from "@/components/common/MatchedProgramCard";
import { seedUniversities } from "@/data/seedUniversities";
import {
  searchMatchedDepartments,
  searchProgrammesByKeyword,
  formatBDT,
} from "@/utils/admission";
import { DIVISIONS } from "@/utils/constants";
import Button from "@/components/common/Button";
import Badge from "@/components/common/Badge";

export default function FindResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [deptDivisionFilter, setDeptDivisionFilter] = useState("");
  const [deptSortBy, setDeptSortBy] = useState("cost-asc");

  // Quick Search parameters from URL
  const sscGpa = searchParams.get("sscGpa");
  const hscGpa = searchParams.get("hscGpa");
  const background = searchParams.get("background");
  const minBudget = searchParams.get("minBudget");
  const maxBudget = searchParams.get("maxBudget");
  const division = searchParams.get("division");

  const isQuickMatchMode = Boolean(
    background || minBudget || maxBudget || division || sscGpa || hscGpa
  );

  useEffect(() => {
    setSearchQuery(searchParams.get("q") || "");
  }, [searchParams]);

  // Mode 1: Quick Search (Profile + Budget + Group)
  const quickMatchResults = useMemo(() => {
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

  // Mode 2: Header / Hero Search Bar (Smart detection: Department vs University/City)
  const keywordDeptSearch = useMemo(() => {
    if (isQuickMatchMode || !searchQuery.trim()) {
      return { isDepartmentSearch: false, results: [] };
    }
    return searchProgrammesByKeyword(searchQuery, deptDivisionFilter);
  }, [isQuickMatchMode, searchQuery, deptDivisionFilter]);

  const sortedKeywordDeptResults = useMemo(() => {
    if (!keywordDeptSearch.isDepartmentSearch) return [];
    const list = [...keywordDeptSearch.results];
    if (deptSortBy === "cost-desc") {
      list.sort((a, b) => {
        if (a.numericCost == null && b.numericCost == null) return 0;
        if (a.numericCost == null) return 1;
        if (b.numericCost == null) return -1;
        return b.numericCost - a.numericCost;
      });
    } else if (deptSortBy === "name-asc") {
      list.sort((a, b) => a.university.name.localeCompare(b.university.name));
    }
    return list;
  }, [keywordDeptSearch, deptSortBy]);

  const showProgramCards =
    isQuickMatchMode || keywordDeptSearch.isDepartmentSearch;
  const programCardsList = isQuickMatchMode
    ? quickMatchResults
    : sortedKeywordDeptResults;

  // Mode 3: Normal University Directory Mode (when searching University Name or City)
  const filteredUniversities = useMemo(() => {
    if (showProgramCards) return [];
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
  }, [showProgramCards, searchQuery]);

  const handleResetAll = () => {
    setSearchQuery("");
    setDeptDivisionFilter("");
    setSearchParams({});
  };

  return (
    <Section className="min-h-screen">
      <SectionHeading
        eyebrow={
          isQuickMatchMode
            ? "Smart Match Results"
            : keywordDeptSearch.isDepartmentSearch
            ? "Department Search"
            : "Directory"
        }
        title={
          isQuickMatchMode
            ? "Matched Departments & Universities"
            : keywordDeptSearch.isDepartmentSearch
            ? `Universities Offering "${searchQuery.trim()}"`
            : "Find Universities"
        }
        subtitle={
          isQuickMatchMode
            ? "Showing undergraduate departments matching your academic group, GPA, location, and budget."
            : keywordDeptSearch.isDepartmentSearch
            ? "Compare total degree cost, credit hours, and minimum GPA across universities offering this department."
            : "Search by university name, department (e.g. CSE, BBA, Pharmacy), or city."
        }
      />

      {/* Active Quick Search Criteria Summary */}
      {isQuickMatchMode && (
        <div className="max-w-5xl mx-auto mt-8 card-base p-4 sm:p-5 bg-brand-500/5 border-brand-500/20 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 font-semibold text-content mr-1">
              <SlidersHorizontal className="h-4 w-4 text-brand-500" /> Your Profile:
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
      <div className="max-w-3xl mx-auto mt-8 mb-8">
        <div className="relative shadow-sm">
          <Input
            type="text"
            placeholder={
              isQuickMatchMode
                ? "Filter matched results by department or university (e.g. CSE, BBA, NSU)..."
                : "Search by university name, department (CSE, BBA, Pharmacy), or city..."
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

      {/* Extra Division & Cost Sort Controls when searching a Department from Header/Hero */}
      {!isQuickMatchMode && keywordDeptSearch.isDepartmentSearch && (
        <div className="max-w-5xl mx-auto mb-6 grid gap-4 sm:grid-cols-2">
          <Select
            value={deptDivisionFilter}
            onChange={(e) => setDeptDivisionFilter(e.target.value)}
          >
            <option value="">All Divisions</option>
            {DIVISIONS.map((div) => (
              <option key={div} value={div}>
                {div} Division
              </option>
            ))}
          </Select>

          <Select
            value={deptSortBy}
            onChange={(e) => setDeptSortBy(e.target.value)}
          >
            <option value="cost-asc">Sort: Lowest Total Cost First</option>
            <option value="cost-desc">Sort: Highest Total Cost First</option>
            <option value="name-asc">Sort: University Name (A–Z)</option>
          </Select>
        </div>
      )}

      {/* Results Area */}
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-2 bg-surface-muted p-4 rounded-xl border border-line">
          <p className="text-sm text-content-muted">
            {showProgramCards ? (
              <>
                Showing{" "}
                <span className="font-bold text-content">
                  {programCardsList.length}
                </span>{" "}
                {isQuickMatchMode
                  ? "matching departments within your criteria"
                  : `universities offering "${searchQuery.trim()}"`}
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

          {!isQuickMatchMode && keywordDeptSearch.isDepartmentSearch && (
            <button
              onClick={handleResetAll}
              className="text-xs font-semibold text-brand-600 dark:text-brand-300 hover:underline"
            >
              Show All Universities
            </button>
          )}
        </div>

        {/* Render Matched Department Cards OR Directory University Cards */}
        {showProgramCards ? (
          programCardsList.length > 0 ? (
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
              {programCardsList.map((item) => (
                <MatchedProgramCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="card-base p-12 text-center border-dashed shadow-none bg-surface-muted/30 max-w-2xl mx-auto">
              <span className="grid w-16 h-16 place-items-center rounded-full bg-card mx-auto mb-4 border border-line">
                <Search className="w-6 h-6 text-content-muted opacity-50" />
              </span>
              <h3 className="text-lg font-semibold text-content mb-2">
                {isQuickMatchMode
                  ? "No matching departments found in this budget"
                  : `No universities found for "${searchQuery}"`}
              </h3>
              <p className="text-sm text-content-muted mb-6">
                {isQuickMatchMode
                  ? 'Try increasing your Max Budget or selecting "All Divisions" to see more eligible programs.'
                  : "Try clearing the division filter or searching another department or university name."}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {isQuickMatchMode && (
                  <Button to="/">Update Budget / Criteria</Button>
                )}
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