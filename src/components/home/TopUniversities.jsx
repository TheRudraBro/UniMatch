import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Section from "@/components/common/Section";
import SectionHeading from "@/components/common/SectionHeading";
import Button from "@/components/common/Button";
import UniversityCard from "@/components/common/UniversityCard";
import { getFeaturedUniversities } from "@/data/seedUniversities";

export function TopUniversities() {
  const unis = getFeaturedUniversities().slice(0, 8);

  return (
    <Section id="universities">
      <SectionHeading
        eyebrow="Bangladesh"
        title="Top universities to explore"
        subtitle="A seeded selection of well-known private universities. These are initial seed records — not a ranking — with fees and requirements to be verified."
      />

      <div className="mx-auto mt-10 max-w-5xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {unis.map((uni, i) => (
            <motion.div
              key={uni.id}
              className="min-w-0 h-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: (i % 2) * 0.08 }}
            >
              <UniversityCard uni={uni} />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-10 text-center">
        <Button to="/find" variant="outline" size="lg">
          Browse all universities <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </Section>
  );
}

export default TopUniversities;
