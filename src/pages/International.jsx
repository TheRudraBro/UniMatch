import { useState, useMemo } from "react";
import {
  Globe,
  MapPin,
  ExternalLink,
  Filter,
  GraduationCap,
  Award,
  BookOpen,
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

export default function International() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [sscGpa, setSscGpa] = useState("");
  const [hscGpa, setHscGpa] = useState("");
  const [ieltsScore, setIeltsScore] = useState("");

  // কান্ট্রি অনুযায়ী ইউনিভার্সিটি ফিল্টারিং
  const filteredUniversities = useMemo(() => {
    if (!selectedCountry) return seedInternationalUniversities;
    return seedInternationalUniversities.filter(
      (u) => u.countryId === selectedCountry,
    );
  }, [selectedCountry]);

  return (
    <Section className="min-h-screen">
      <SectionHeading
        eyebrow="Study Abroad"
        title="International Universities & Requirements"
        subtitle="Explore top study destinations worldwide. Check verified institutional links, language requirements, and admission criteria."
      />

      {/* Filter & Profile Matcher Box */}
      <div className="mx-auto mt-10 max-w-4xl card-base p-6 sm:p-8">
        <h3 className="text-lg font-semibold text-content mb-4 flex items-center gap-2">
          <Filter className="w-5 h-5 text-brand-600 dark:text-brand-300" />{" "}
          Filter by Country & Academic Profile
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Country Filter */}
          <FormField label="Destination Country">
            <Select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              <option value="">All Countries (5 Destinations)</option>
              {countries.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.flag} {c.name}
                </option>
              ))}
            </Select>
          </FormField>

          {/* SSC GPA */}
          <FormField label="SSC GPA (Optional)">
            <Input
              type="number"
              step="0.01"
              placeholder="e.g. 4.00"
              value={sscGpa}
              onChange={(e) => setSscGpa(e.target.value)}
            />
          </FormField>

          {/* HSC GPA */}
          <FormField label="HSC GPA (Optional)">
            <Input
              type="number"
              step="0.01"
              placeholder="e.g. 4.00"
              value={hscGpa}
              onChange={(e) => setHscGpa(e.target.value)}
            />
          </FormField>

          {/* IELTS Target */}
          <FormField label="Target IELTS Score">
            <Input
              type="number"
              step="0.5"
              placeholder="e.g. 6.5"
              value={ieltsScore}
              onChange={(e) => setIeltsScore(e.target.value)}
            />
          </FormField>
        </div>

        {selectedCountry && (
          <div className="mt-4 flex items-center justify-between border-t border-line pt-4 text-sm">
            <span className="text-content-muted">
              Showing universities in:{" "}
              <strong className="text-content">
                {countries.find((c) => c.id === selectedCountry)?.name}
              </strong>
            </span>
            <button
              onClick={() => {
                setSelectedCountry("");
                setSscGpa("");
                setHscGpa("");
                setIeltsScore("");
              }}
              className="text-brand-600 dark:text-brand-300 font-semibold hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* University Cards Grid */}
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredUniversities.map((uni) => {
          const country = countries.find((c) => c.id === uni.countryId);
          return (
            <div
              key={uni.id}
              className="card-base flex flex-col justify-between p-6 relative overflow-hidden transition hover:border-brand-500/40 hover:shadow-lift"
            >
              <div>
                {/* Country Flag & City Header */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl" aria-hidden>
                    {country?.flag}
                  </span>
                  <Badge tone="info">{country?.name}</Badge>
                </div>

                <h3 className="text-xl font-bold text-content leading-tight mb-1">
                  {uni.name}
                </h3>
                <p className="text-sm text-content-muted flex items-center gap-1 mb-4">
                  <MapPin className="w-3.5 h-3.5" /> {uni.city}
                </p>

                {/* Departments Tag */}
                {uni.departments.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-content-muted mb-2">
                      Key Programs
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {uni.departments.map((dept, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-card-muted text-xs font-medium text-content"
                        >
                          {dept}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Requirements & Costs info box */}
                <div className="space-y-2.5 text-xs text-content-muted border-t border-line pt-4 mt-2">
                  <div className="flex justify-between">
                    <span className="font-semibold text-content">
                      Tuition Fees:
                    </span>
                    <span>{uni.tuitionFees}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-content">
                      Living Costs:
                    </span>
                    <span>{uni.livingCosts}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-content">
                      Language (IELTS):
                    </span>
                    <span className="text-amber-500 font-medium">
                      {uni.languageRequirements}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-content">
                      Scholarships:
                    </span>
                    <span>{uni.scholarshipInfo}</span>
                  </div>
                </div>
              </div>

              {/* Official Link Button */}
              <div className="mt-6 pt-4 border-t border-line">
                <Button
                  href={uni.website}
                  variant="outline"
                  size="sm"
                  className="w-full justify-center gap-1.5"
                >
                  Visit Official Website <ExternalLink className="w-4 h-4" />
                </Button>
                <p className="text-[10px] text-center text-content-muted mt-2">
                  Last verified: {uni.lastVerifiedAt}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {filteredUniversities.length === 0 && (
        <div className="mt-12 text-center py-16 card-base max-w-md mx-auto">
          <p className="text-content-muted text-lg font-medium">
            No international universities found for this filter.
          </p>
          <Button
            onClick={() => setSelectedCountry("")}
            variant="outline"
            className="mt-4"
          >
            View All International Universities
          </Button>
        </div>
      )}
    </Section>
  );
}
