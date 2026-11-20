import { useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  GraduationCap,
  Clock,
  Wallet,
  Search,
  MapPin,
  BookOpen,
  CheckCircle2,
  Info,
} from "lucide-react";
import Section from "@/components/common/Section";
import Badge from "@/components/common/Badge";
import Button from "@/components/common/Button";
import Icon from "@/components/common/Icon";
import { Input, Select } from "@/components/common/Field";
import { InitialsBadge } from "@/components/common/Logo";
import BookmarkButton from "@/components/common/BookmarkButton";
import { departmentCatalog, getDepartmentById } from "@/data/seedDepartments";
import { seedUniversities } from "@/data/seedUniversities";
import { programmes } from "@/data/unimatchData";
import {
  isUndergraduateProgramme,
  parseMoney,
  formatBDT,
  getRequirements,
} from "@/utils/admission";
import { DIVISIONS } from "@/utils/constants";

const normalizeUniName = (name) =>
  String(name || "")
    .replace(/\([^)]*\)/g, "")
    .replace(/[^a-z0-9]/gi, "")
    .toLowerCase();

export default function DepartmentDetails() {
  const { id } = useParams();
  const dept = getDepartmentById(id);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [sortBy, setSortBy] = useState("cost-asc");

  // Match all undergraduate programmes for this department across universities
  const offeringRows = useMemo(() => {
    if (!dept) return [];

    const uniMap = new Map();
    seedUniversities.forEach((u) => {
      uniMap.set(normalizeUniName(u.name), u);
    });

    const primaryRegex = new RegExp(dept.matchPattern, "i");
    const bbaFallbackRegex = /\b(bba|business administration)\b/i;

    let matched = [];

    for (const prog of programmes) {
      if (!isUndergraduateProgramme(prog.programme)) continue;

      // Filter false positives for Management
      if (
        dept.id === "management" &&
        /(environmental|hospitality|tourism|information|library|fashion)/i.test(
          prog.programme
        )
      ) {
        continue;
      }

      if (primaryRegex.test(prog.programme)) {
        const uni = uniMap.get(normalizeUniName(prog.university));
        if (!uni) continue;

        const numericCost = parseMoney(prog.totalDegreeCost);
        const reqs = getRequirements(uni.name, prog.programme);

        matched.push({
          id: prog.id,
          programme: prog.programme,
          totalCredits: prog.totalCredits,
          perCreditFee: prog.perCreditFee,
          totalDegreeCost: prog.totalDegreeCost,
          numericCost,
          university: uni,
          requirement: reqs[0] || null,
          isBbaMajorFallback: false,
        });
      }
    }

    // For BBA concentrations (Accounting, Finance, Marketing, Management), also include BBA programs
    if (dept.majorOfBba) {
      const existingUniIds = new Set(matched.map((m) => m.university.id));
      for (const prog of programmes) {
        if (!isUndergraduateProgramme(prog.programme)) continue;
        if (!bbaFallbackRegex.test(prog.programme)) continue;

        const uni = uniMap.get(normalizeUniName(prog.university));
        if (!uni || existingUniIds.has(uni.id)) continue;

        existingUniIds.add(uni.id);
        const numericCost = parseMoney(prog.totalDegreeCost);
        const reqs = getRequirements(uni.name, prog.programme);

        matched.push({
          id: prog.id,
          programme: `${prog.programme} (Major in ${dept.name})`,
          totalCredits: prog.totalCredits,
          perCreditFee: prog.perCreditFee,
          totalDegreeCost: prog.totalDegreeCost,
          numericCost,
          university: uni,
          requirement: reqs[0] || null,
          isBbaMajorFallback: true,
        });
      }
    }

    return matched;
  }, [dept]);

  // Calculate min and max published total cost for overview stats
  const costStats = useMemo(() => {
    const validCosts = offeringRows
      .map((r) => r.numericCost)
      .filter((c) => c != null);
    if (!validCosts.length) return null;
    return {
      min: Math.min(...validCosts),
      max: Math.max(...validCosts),
    };
  }, [offeringRows]);

  // Apply search, division, and sort filters
  const filteredRows = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const filtered = offeringRows.filter((item) => {
      if (selectedDivision && item.university.division !== selectedDivision) {
        return false;
      }
      if (q) {
        const matchUni =
          item.university.name.toLowerCase().includes(q) ||
          (item.university.shortName &&
            item.university.shortName.toLowerCase().includes(q));
        const matchProg = item.programme.toLowerCase().includes(q);
        const matchCity =
          item.university.city &&
          item.university.city.toLowerCase().includes(q);
        if (!matchUni && !matchProg && !matchCity) return false;
      }
      return true;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === "cost-asc") {
        if (a.numericCost == null && b.numericCost == null) return 0;
        if (a.numericCost == null) return 1;
        if (b.numericCost == null) return -1;
        return a.numericCost - b.numericCost;
      }
      if (sortBy === "cost-desc") {
        if (a.numericCost == null && b.numericCost == null) return 0;
        if (a.numericCost == null) return 1;
        if (b.numericCost == null) return -1;
        return b.numericCost - a.numericCost;
      }
      return a.university.name.localeCompare(b.university.name);
    });
  }, [offeringRows, searchQuery, selectedDivision, sortBy]);

  if (!dept) {
    return (
      <Section className="min-h-[70vh]">
        <div className="card-base mx-auto max-w-lg p-10 text-center">
          <h1 className="text-2xl font-bold text-content">
            Department Not Found
          </h1>
          <p className="mt-2 text-sm text-content-muted">
            The department you are looking for does not exist in our catalog.
          </p>
          <Button to="/" className="mt-6">
            Back to Home
          </Button>
        </div>
      </Section>
    );
  }

  return (
    <Section className="min-h-screen">
      {/* Top Back Navigation */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 transition hover:gap-2.5 dark:text-brand-300"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>

        {/* Quick Department Switcher */}
        <div className="flex flex-wrap gap-1.5">
          {departmentCatalog.slice(0, 8).map((item) => (
            <Link
              key={item.id}
              to={`/department/${item.id}`}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                item.id === dept.id
                  ? "bg-brand-600 text-white shadow-sm"
                  : "bg-card border border-line text-content-muted hover:border-brand-500/40 hover:text-content"
              }`}
            >
              {item.short}
            </Link>
          ))}
        </div>
      </div>

      {/* Department Hero Header */}
      <div className="card-base p-6 sm:p-8 border-brand-500/20">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
          <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-brand-500/10 text-brand-600 dark:text-brand-300">
            <Icon name={dept.icon} className="h-8 w-8" />
          </span>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge tone="info">{dept.category}</Badge>
              <Badge tone="warning">{dept.short}</Badge>
            </div>
            <h1 className="text-2xl font-extrabold text-content sm:text-4xl">
              {dept.name}
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-content-muted sm:text-base">
              {dept.overview}
            </p>
          </div>
        </div>

        {/* Key Academic & Cost Highlights */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3 border-t border-line pt-6">
          <div className="rounded-xl bg-surface-muted/70 p-4 border border-line">
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-content-muted">
              <Clock className="h-4 w-4 text-brand-500" /> Duration & Credits
            </p>
            <p className="mt-1.5 font-bold text-content">{dept.duration}</p>
            <p className="text-xs text-content-muted mt-0.5">
              Typical: {dept.typicalCredits}
            </p>
          </div>

          <div className="rounded-xl bg-surface-muted/70 p-4 border border-line">
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-content-muted">
              <Wallet className="h-4 w-4 text-brand-500" /> Estimated Total Cost
            </p>
            <p className="mt-1.5 font-bold text-brand-600 dark:text-brand-400">
              {costStats
                ? `${formatBDT(costStats.min)} – ${formatBDT(costStats.max)}`
                : "Verify per university"}
            </p>
            <p className="text-xs text-content-muted mt-0.5">
              Across {offeringRows.length} captured university records
            </p>
          </div>

          <div className="rounded-xl bg-surface-muted/70 p-4 border border-line">
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-content-muted">
              <GraduationCap className="h-4 w-4 text-brand-500" /> Entry Background
            </p>
            <p className="mt-1.5 text-xs font-medium leading-relaxed text-content">
              {dept.eligibilitySummary}
            </p>
          </div>
        </div>
      </div>

      {/* Career Prospects Section */}
      <div className="mt-8 card-base p-6 sm:p-8">
        <h2 className="text-xl font-bold text-content flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-brand-500" /> Career Opportunities & Job Market
        </h2>
        <p className="mt-1 text-sm text-content-muted">
          Popular career tracks for {dept.short} graduates in Bangladesh and internationally:
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {dept.careerPaths.map((role) => (
            <div
              key={role}
              className="flex items-center gap-2.5 rounded-xl border border-line bg-surface-muted/50 px-4 py-3 text-sm font-medium text-content"
            >
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
              <span>{role}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Universities Offering This Department */}
      <div className="mt-10">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-content">
              Universities Offering {dept.short} ({filteredRows.length})
            </h2>
            <p className="text-sm text-content-muted mt-1">
              Compare tuition costs, credit hours, and minimum requirements across private universities.
            </p>
          </div>

          <Button to="/compare" variant="outline" size="sm">
            Compare Side-by-Side
          </Button>
        </div>

        {dept.majorOfBba && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-brand-500/20 bg-brand-500/5 p-4 text-xs text-content-muted">
            <Info className="h-4 w-4 shrink-0 text-brand-500 mt-0.5" />
            <p>
              Most private universities in Bangladesh offer{" "}
              <strong className="text-content">{dept.name}</strong> as a major/concentration under their{" "}
              <strong className="text-content">BBA</strong> degree. Below are the university-wise BBA & specialized fee records.
            </p>
          </div>
        )}

        {/* Filter & Sort Controls */}
        <div className="card-base p-4 mb-6 grid gap-4 sm:grid-cols-3">
          <div className="relative">
            <Input
              type="text"
              placeholder="Filter by university or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Search className="h-4 w-4 text-content-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>

          <Select
            value={selectedDivision}
            onChange={(e) => setSelectedDivision(e.target.value)}
          >
            <option value="">All Divisions</option>
            {DIVISIONS.map((div) => (
              <option key={div} value={div}>
                {div} Division
              </option>
            ))}
          </Select>

          <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="cost-asc">Sort: Lowest Total Cost First</option>
            <option value="cost-desc">Sort: Highest Total Cost First</option>
            <option value="name-asc">Sort: University Name (A–Z)</option>
          </Select>
        </div>

        {/* Program Cards Grid */}
        {filteredRows.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            {filteredRows.map((item) => {
              const uni = item.university;
              return (
                <div
                  key={item.id}
                  className="card-base relative flex h-full w-full min-w-0 flex-col p-5 transition hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-lift"
                >
                  <BookmarkButton
                    uniId={uni.id}
                    uniName={uni.shortName || uni.name}
                  />

                  <div className="flex items-start gap-3 pr-10">
                    <InitialsBadge
                      text={uni.shortName || uni.name}
                      className="h-11 w-11 shrink-0 text-xs"
                    />
                    <div className="min-w-0">
                      <h3 className="truncate font-bold text-content">
                        {uni.name}
                      </h3>
                      <p className="mt-0.5 flex items-center gap-1 text-xs text-content-muted">
                        <MapPin className="h-3.5 w-3.5 shrink-0" />
                        {uni.city}, {uni.division}
                      </p>
                    </div>
                  </div>

                  <p className="mt-3 text-sm font-semibold text-brand-600 dark:text-brand-300">
                    {item.programme}
                  </p>

                  {/* Fee & Credit Summary Box */}
                  <div className="mt-3 rounded-xl border border-line bg-surface-muted/70 p-3.5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-content-muted">
                        Total Degree Cost
                      </span>
                      <span className="text-base font-extrabold text-content">
                        {item.totalDegreeCost}
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-t border-line/70 pt-2 text-xs text-content-muted">
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-3.5 w-3.5" /> Credits:{" "}
                        <strong className="text-content">
                          {item.totalCredits}
                        </strong>
                      </span>
                      {item.perCreditFee &&
                        item.perCreditFee !== "Not published" && (
                          <span>
                            Per Credit:{" "}
                            <strong className="text-content">
                              {item.perCreditFee}
                            </strong>
                          </span>
                        )}
                    </div>
                  </div>

                  {/* Quick GPA Requirement Pill */}
                  {item.requirement && (
                    <p className="mt-3 text-xs text-content-muted line-clamp-2">
                      <strong className="text-content">Min GPA:</strong> SSC{" "}
                      {item.requirement.sscGpa} · HSC {item.requirement.hscGpa}
                    </p>
                  )}

                  <div className="mt-auto pt-4 border-t border-line flex items-center justify-between">
                    <Link
                      to={`/university/${uni.id}`}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 transition hover:gap-2 dark:text-brand-300"
                    >
                      View University Details <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="card-base p-12 text-center border-dashed bg-surface-muted/30">
            <p className="text-base font-semibold text-content">
              No matching university records found for {dept.name}
            </p>
            <p className="mt-1 text-sm text-content-muted">
              Try clearing your search or division filter, or explore all universities in the directory.
            </p>
            <div className="mt-5 flex justify-center gap-3">
              {(searchQuery || selectedDivision) && (
                <Button
                  variant="secondary"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedDivision("");
                  }}
                >
                  Reset Filters
                </Button>
              )}
              <Button to="/find">Browse All Universities</Button>
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}