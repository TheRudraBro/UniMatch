import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import Section from "@/components/common/Section";
import SectionHeading from "@/components/common/SectionHeading";
import { Input } from "@/components/common/Field";
import UniversityCard from "@/components/common/UniversityCard";
import { seedUniversities } from "@/data/seedUniversities";
import Button from "@/components/common/Button";

export default function FindResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  // URL Parameter পরিবর্তন হলে সার্চ বক্স আপডেট করা
  useEffect(() => {
    setSearchQuery(searchParams.get("q") || "");
  }, [searchParams]);

  // নাম, শহর, বিভাগ এবং ডিপার্টমেন্ট অনুযায়ী এডভান্সড সার্চ লজিক
  const filteredUniversities = useMemo(() => {
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
  }, [searchQuery]);

  return (
    <Section className="min-h-screen">
      <SectionHeading
        eyebrow="Directory"
        title="Find Universities"
        subtitle="Search through the top private universities in Bangladesh."
      />

      {/* Top Search Bar */}
      <div className="max-w-3xl mx-auto mt-10 mb-10">
        <div className="relative shadow-sm">
          <Input
            type="text"
            placeholder="Search by university name, city, or department (e.g. CSE, Dhaka, BRAC)..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSearchParams(e.target.value ? { q: e.target.value } : {});
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
            Showing{" "}
            <span className="font-bold text-content">
              {filteredUniversities.length}
            </span>{" "}
            universities
          </p>
        </div>

        {filteredUniversities.length > 0 ? (
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
            <Button
              onClick={() => {
                setSearchQuery("");
                setSearchParams({});
              }}
            >
              Clear Search
            </Button>
          </div>
        )}
      </div>
    </Section>
  );
}
