import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  ExternalLink,
  Filter,
  ArrowRight,
  GraduationCap,
} from "lucide-react";
import Section from "@/components/common/Section";
import SectionHeading from "@/components/common/SectionHeading";
import Button from "@/components/common/Button";
import Badge from "@/components/common/Badge";
import { FormField, Input, Select } from "@/components/common/Field";
import {
  seedInternationalUniversities,
  countries,
} from "@/data/seedInternational";
import BookmarkButton from "@/components/common/BookmarkButton";

function parseMinIelts(text = "") {
  const match = text.match(/IELTS(?:\s+Academic)?\s*(\d+(?:\.\d+)?)/i);
  return match ? parseFloat(match[1]) : null;
}

export default function International() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedDegree, setSelectedDegree] = useState("");
  const [ieltsScore, setIeltsScore] = useState("");

  const degreeOptions = useMemo(() => {
    const levels = seedInternationalUniversities
      .map((u) => u.degreeLevel)
      .filter(Boolean);
    return [...new Set(levels)];
  }, []);

  const filteredUniversities = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const userIelts = ieltsScore !== "" ? parseFloat(ieltsScore) : null;

    return seedInternationalUniversities.filter((uni) => {
      if (selectedCountry && uni.countryId !== selectedCountry) {
        return false;
      }

      if (selectedDegree && uni.degreeLevel !== selectedDegree) {
        return false;
      }

      if (q) {
        const countryName =
          countries.find((c) => c.id === uni.countryId)?.name || "";
        const haystack = [
          uni.name,
          uni.city,
          countryName,
          uni.degreeLevel,
          ...(uni.departments || []),
        ]
          .join(" ")
          .toLowerCase();

        if (!haystack.includes(q)) return false;
      }

      if (userIelts !== null && !Number.isNaN(userIelts)) {
        const reqIelts = parseMinIelts(uni.languageRequirements);
        if (reqIelts !== null && userIelts < reqIelts) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedCountry, selectedDegree, ieltsScore]);

  const hasActiveFilters = Boolean(
    searchQuery.trim() || selectedCountry || selectedDegree || ieltsScore,
  );

  const resetAllFilters = () => {
    setSearchQuery("");
    setSelectedCountry("");
    setSelectedDegree("");
    setIeltsScore("");
  };

  return (
    <Section className="min-h-screen">
      <SectionHeading
        eyebrow="Study Abroad · 2027 Intake"
        title="International Universities & Requirements"
        subtitle="Search by university, city, program, or country and filter by degree level and IELTS score."
      />

      {/* Search & Filter Box */}
      <div className="mx-auto mt-10 max-w-5xl card-base p-6 sm:p-8">
        <h3 className="text-lg font-semibold text-content mb-4 flex items-center gap-2">
          <Filter className="w-5 h-5 text-brand-600 dark:text-brand-300" />
          Filter International Universities
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <FormField label="Search University / Program / City">
            <Input
              type="text"
              placeholder="e.g. KAIST, Computer Science..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </FormField>

          <FormField label="Destination Country">
            <Select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              <option value="">All Countries ({countries.length})</option>
              {countries.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.flag} {c.name}
                </option>
              ))}
            </Select>
          </FormField>

          <FormField label="Degree / Study Track">
            <Select
              value={selectedDegree}
              onChange={(e) => setSelectedDegree(e.target.value)}
            >
              <option value="">All Degree Levels</option>
              {degreeOptions.map((deg) => (
                <option key={deg} value={deg}>
                  {deg}
                </option>
              ))}
            </Select>
          </FormField>

          <FormField label="Your IELTS Score">
            <Input
              type="number"
              step="0.5"
              min="0"
              max="9"
              placeholder="e.g. 6.5"
              value={ieltsScore}
              onChange={(e) => setIeltsScore(e.target.value)}
            />
          </FormField>
        </div>

        {hasActiveFilters && (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-line pt-4 text-sm">
            <span className="text-content-muted">
              Showing{" "}
              <strong className="text-content">
                {filteredUniversities.length}
              </strong>{" "}
              {filteredUniversities.length === 1
                ? "university"
                : "universities"}
              {selectedCountry && (
                <>
                  {" "}
                  in{" "}
                  <strong className="text-content">
                    {countries.find((c) => c.id === selectedCountry)?.name}
                  </strong>
                </>
              )}
            </span>
            <button
              type="button"
              onClick={resetAllFilters}
              className="text-brand-600 dark:text-brand-300 font-semibold hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Clean University Cards */}
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredUniversities.map((uni) => {
          const country = countries.find((c) => c.id === uni.countryId);
          return (
            <article
              key={uni.id}
              className="card-base flex flex-col justify-between p-6 relative overflow-hidden transition hover:border-brand-500/40 hover:shadow-lift"
            >
              <BookmarkButton uniId={uni.id} uniName={uni.name} />

              <div>
                <div className="flex items-center justify-between mb-3 pr-10">
                  <span className="text-2xl" aria-hidden>
                    {country?.flag}
                  </span>
                  <Badge tone="info">{country?.name}</Badge>
                </div>

                <h3 className="text-xl font-bold text-content leading-tight mb-1">
                  <Link
                    to={`/international/${uni.id}`}
                    className="hover:text-brand-600 dark:hover:text-brand-300 transition"
                  >
                    {uni.name}
                  </Link>
                </h3>

                <p className="text-sm text-content-muted flex items-center gap-1 mb-2">
                  <MapPin className="w-3.5 h-3.5 shrink-0" /> {uni.city}
                </p>

                {uni.degreeLevel && (
                  <p className="text-xs font-medium text-brand-600 dark:text-brand-300 flex items-center gap-1.5 mb-4">
                    <GraduationCap className="w-3.5 h-3.5 shrink-0" />
                    <span>{uni.degreeLevel}</span>
                  </p>
                )}

                {uni.departments?.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-content-muted mb-2">
                      Key Programs
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {uni.departments.slice(0, 3).map((dept, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-card-muted text-xs font-medium text-content"
                        >
                          {dept}
                        </span>
                      ))}
                      {uni.departments.length > 3 && (
                        <span className="px-2 py-1 rounded-lg bg-surface-muted text-xs text-content-muted">
                          +{uni.departments.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-line flex items-center justify-between gap-3">
                <Link
                  to={`/international/${uni.id}`}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 transition hover:gap-2 dark:text-brand-300"
                >
                  View details <ArrowRight className="h-4 w-4" />
                </Link>

                <a
                  href={uni.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-lg border border-line bg-surface-muted/70 px-2.5 py-1.5 text-xs font-semibold text-content transition hover:border-brand-500/40 hover:text-brand-600 dark:hover:text-brand-300"
                >
                  Official Website <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </article>
          );
        })}
      </div>

      {filteredUniversities.length === 0 && (
        <div className="mt-12 text-center py-16 card-base max-w-md mx-auto">
          <p className="text-content-muted text-lg font-medium">
            No international universities match your current filters.
          </p>
          <Button onClick={resetAllFilters} variant="outline" className="mt-4">
            Reset All Filters
          </Button>
        </div>
      )}
    </Section>
  );
}
