import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Section from '@/components/common/Section';
import SectionHeading from '@/components/common/SectionHeading';
import Button from '@/components/common/Button';
import UniversityCard from '@/components/common/UniversityCard';
import { getFeaturedUniversities } from '@/data/seedUniversities';

export function TopUniversities() {
  const unis = getFeaturedUniversities().slice(0, 8);

  return (
    <Section id="universities">
      <SectionHeading
        eyebrow="Bangladesh"
        title="Top universities to explore"
        subtitle="A seeded selection of well-known private universities. These are initial seed records — not a ranking — with fees and requirements to be verified."
      />

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {unis.map((uni, i) => (
          <motion.div
            key={uni.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
          >
            <UniversityCard uni={uni} />
          </motion.div>
        ))}
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
