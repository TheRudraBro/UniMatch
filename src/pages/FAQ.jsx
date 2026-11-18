import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Section from "@/components/common/Section";
import SectionHeading from "@/components/common/SectionHeading";

const FAQS = [
  {
    q: "Is UniMatch completely free for students?",
    a: "Yes! Searching universities, comparing tuition fees, bookmarking shortlists, and taking admission mock tests are 100% free for students.",
  },
  {
    q: "How accurate are the tuition fees and GPA requirements?",
    a: "We collect data from official university websites and admission circulars. However, universities may update fees each semester, so we always recommend verifying with the official link provided on each university page.",
  },
  {
    q: "Why do I need an account to take Mock Tests?",
    a: "Creating a free account lets us track your attempted questions so they don’t repeat, and saves your test scores directly to your Student Dashboard.",
  },
  {
    q: "How many universities can I compare at once?",
    a: "You can compare up to 3 university programs side-by-side on the Compare page, including total degree cost, per-credit fees, and admission eligibility.",
  },
  {
    q: "Does UniMatch cover international universities?",
    a: "Yes, our International section covers top destinations including the USA, UK, Canada, Australia, and Malaysia with IELTS and tuition details.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <Section className="min-h-screen">
      <SectionHeading
        eyebrow="Help Center"
        title="Frequently Asked Questions"
        subtitle="Quick answers to common questions about UniMatch."
      />

      <div className="mt-12 max-w-3xl mx-auto space-y-4">
        {FAQS.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="card-base overflow-hidden">
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full flex items-center justify-between p-5 text-left font-semibold text-content hover:bg-surface-muted/40 transition"
              >
                <span>{item.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-content-muted transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 text-sm text-content-muted leading-relaxed border-t border-line pt-4">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Section>
  );
}
