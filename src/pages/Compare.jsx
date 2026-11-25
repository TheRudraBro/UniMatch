import { useState, useMemo, useRef, useEffect } from "react";
import { X, MapPin, ArrowRight, Search, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import Section from "@/components/common/Section";
import SectionHeading from "@/components/common/SectionHeading";
import Button from "@/components/common/Button";
import { programmes, universities } from "@/data/unimatchData";
import { getRequirements } from "@/utils/admission";

export default function Compare() {
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pendingSelection, setPendingSelection] = useState(null); // ড্রপডাউন থেকে সিলেক্ট করা আইটেম
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  // ড্রপডাউনের বাইরে ক্লিক করলে সেটি বন্ধ করার জন্য
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  // ইউজারের সার্চ অনুযায়ী প্রোগ্রাম ফিল্টার করা
  const filteredProgrammes = useMemo(() => {
    // যদি ইউজার অলরেডি ড্রপডাউন থেকে সিলেক্ট করে থাকে, তবে সব লিস্ট দেখানোর দরকার নেই
    if (!searchTerm.trim() || pendingSelection) return programmes;

    const lowerTerm = searchTerm.toLowerCase();
    return programmes.filter(
      (p) =>
        p.programme.toLowerCase().includes(lowerTerm) ||
        p.university.toLowerCase().includes(lowerTerm),
    );
  }, [searchTerm, pendingSelection]);

  // ফিল্টার করা প্রোগ্রামগুলোকে ইউনিভার্সিটির নাম অনুযায়ী গ্রুপ করা
  const groupedProgrammes = useMemo(() => {
    const groups = {};
    filteredProgrammes.forEach((p) => {
      if (!groups[p.university]) groups[p.university] = [];
      groups[p.university].push(p);
    });
    return Object.keys(groups)
      .sort()
      .map((uniName) => ({
        uniName,
        programs: groups[uniName],
      }));
  }, [filteredProgrammes]);

  // সিলেক্ট করা আইডিগুলো থেকে ফুল ডেটা বের করা
  const selectedData = useMemo(() => {
    return selectedIds.map((id) => {
      const prog = programmes.find((p) => p.id === id);
      const uni = universities.find((u) => u.name === prog.university);
      const reqs = getRequirements(prog.university, prog.programme);
      return { ...prog, uni, reqs };
    });
  }, [selectedIds]);

  // Add to Compare বাটনে ক্লিক করলে লিস্টে যুক্ত হবে
  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (
      pendingSelection &&
      !selectedIds.includes(pendingSelection) &&
      selectedIds.length < 3
    ) {
      setSelectedIds([...selectedIds, pendingSelection]);
      setPendingSelection(null);
      setSearchTerm(""); // ইনপুট ক্লিয়ার করে দেওয়া
    }
  };

  // ড্রপডাউন থেকে কোনো আইটেমে ক্লিক করলে
  const handleOptionSelect = (progId, progName, uniName) => {
    setPendingSelection(progId);
    setSearchTerm(`${progName} - ${uniName}`); // ইনপুটে নাম দেখাবে
    setIsDropdownOpen(false); // ড্রপডাউন বন্ধ হবে
  };

  const handleRemove = (idToRemove) => {
    setSelectedIds(selectedIds.filter((id) => id !== idToRemove));
  };

  return (
    <Section className="min-h-screen">
      <SectionHeading
        eyebrow="Compare"
        title="Compare Universities"
        subtitle="Select up to 3 programs to compare tuition fees, credits, and admission requirements side by side."
      />

      {/* Search, Selection & Add Button Area */}
      <div className="mx-auto mt-10 max-w-2xl card-base p-6 overflow-visible">
        <form
          onSubmit={handleAddSubmit}
          className="flex flex-col sm:flex-row gap-3"
        >
          <div className="relative flex-1" ref={dropdownRef}>
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-content-muted" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPendingSelection(null); // নতুন কিছু টাইপ করলে সিলেকশন বাতিল হবে
                  setIsDropdownOpen(true);
                }}
                onFocus={() => setIsDropdownOpen(true)}
                placeholder="Search university or department to compare..."
                className="w-full h-12 pl-12 pr-4 rounded-xl border border-line bg-card text-content focus:border-brand-500 focus:ring-2 focus:ring-brand-500/25 outline-none transition-all"
                disabled={selectedIds.length >= 3}
              />
            </div>

            {/* Custom Searchable Dropdown */}
            {isDropdownOpen && !pendingSelection && selectedIds.length < 3 && (
              <div className="absolute z-50 w-full mt-2 bg-card border border-line rounded-xl shadow-xl max-h-72 overflow-y-auto">
                {groupedProgrammes.length > 0 ? (
                  groupedProgrammes.map((group) => (
                    <div key={group.uniName}>
                      <div className="px-4 py-2 bg-surface-muted text-xs font-bold text-content-muted uppercase tracking-wider sticky top-0 z-10 border-y border-line first:border-t-0">
                        {group.uniName}
                      </div>
                      {group.programs.map((p) => {
                        const isSelected = selectedIds.includes(p.id);
                        return (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() =>
                              handleOptionSelect(
                                p.id,
                                p.programme,
                                group.uniName,
                              )
                            }
                            disabled={isSelected}
                            className={`w-full text-left px-6 py-3 text-sm transition-colors ${
                              isSelected
                                ? "bg-card-muted text-content-muted cursor-not-allowed"
                                : "text-content hover:bg-brand-500/10 hover:text-brand-600"
                            }`}
                          >
                            {p.programme}
                            {isSelected && (
                              <span className="ml-2 text-xs font-semibold text-amber-500">
                                (Added)
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-sm text-content-muted">
                    No university or program found for "{searchTerm}"
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Add to Compare Button */}
          <Button
            type="submit"
            size="lg"
            className="shrink-0"
            disabled={!pendingSelection || selectedIds.length >= 3}
          >
            <Plus className="w-4 h-4" /> Add to Compare
          </Button>
        </form>

        {selectedIds.length >= 3 && (
          <p className="mt-3 text-sm font-medium text-amber-500 text-center">
            You have reached the maximum limit of 3 programs to compare.
          </p>
        )}
      </div>

      {/* Comparison Grid */}
      {selectedData.length > 0 ? (
        <div
          className={`mt-12 grid gap-6 ${
            selectedData.length === 1
              ? "grid-cols-1 max-w-md mx-auto"
              : selectedData.length === 2
                ? "grid-cols-1 md:grid-cols-2"
                : "grid-cols-1 md:grid-cols-3"
          }`}
        >
          {selectedData.map((data) => (
            <div
              key={data.id}
              className="card-base flex flex-col relative overflow-hidden"
            >
              {/* Remove Button */}
              <button
                onClick={() => handleRemove(data.id)}
                className="absolute top-4 right-4 p-1.5 rounded-lg bg-card-muted hover:bg-red-500/10 hover:text-red-500 transition z-10"
                title="Remove"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header */}
              <div className="p-6 border-b border-line bg-surface-muted/30 pt-10">
                <p className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-2 leading-relaxed pr-6">
                  {data.uni?.name || data.university}
                </p>
                <h3 className="text-xl font-bold text-content leading-tight mb-2">
                  {data.programme}
                </h3>
                <p className="text-sm text-content-muted flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />{" "}
                  {data.uni?.district || "Unknown"},{" "}
                  {data.uni?.division || "Location"}
                </p>
              </div>

              {/* Body / Stats */}
              <div className="p-6 flex-1 flex flex-col gap-6">
                <div>
                  <p className="text-xs text-content-muted uppercase tracking-wider font-semibold mb-1">
                    Total Degree Cost
                  </p>
                  <p className="text-2xl font-bold text-brand-600 dark:text-brand-400">
                    {data.totalDegreeCost || "Not published"}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-content-muted mb-1">
                      Total Credits
                    </p>
                    <p className="font-semibold text-content">
                      {data.totalCredits || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-content-muted mb-1">
                      Per Credit Fee
                    </p>
                    <p className="font-semibold text-content">
                      {data.perCreditFee || "N/A"}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-content-muted mb-1">
                      Other Fees
                    </p>
                    <p className="text-sm font-medium text-content leading-relaxed">
                      {data.otherFees || "Not itemised"}
                    </p>
                  </div>
                </div>

                <div className="border-t border-line pt-4 mt-auto">
                  <p className="text-xs text-content-muted uppercase tracking-wider font-semibold mb-2">
                    Admission Requirement
                  </p>
                  {data.reqs && data.reqs[0] ? (
                    <div className="text-sm text-content-muted space-y-1.5">
                      <p>
                        <b>SSC:</b> {data.reqs[0].sscGpa} | <b>HSC:</b>{" "}
                        {data.reqs[0].hscGpa}
                      </p>
                      <p className="line-clamp-3 leading-relaxed">
                        {data.reqs[0].generalEligibility}
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-content-muted">
                      Check official circular.
                    </p>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-line bg-surface-muted/30">
                <Link
                  to={data.uni?.id ? `/university/${data.uni.id}` : "#"}
                  className="flex items-center justify-center gap-2 text-sm font-semibold text-brand-600 dark:text-brand-300 hover:underline w-full"
                >
                  View Full Details <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-12 text-center text-content-muted">
          <p>
            No programs selected. Search and select a program above to start
            comparing.
          </p>
        </div>
      )}
    </Section>
  );
}
