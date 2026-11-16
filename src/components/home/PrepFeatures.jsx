import { motion } from 'framer-motion';
import { Lock, ArrowRight } from 'lucide-react';
import Section from '@/components/common/Section';
import SectionHeading from '@/components/common/SectionHeading';
import Button from '@/components/common/Button';
import Badge from '@/components/common/Badge';
import Icon from '@/components/common/Icon';
import { prepFeatures } from '@/data/content';

export function PrepFeatures() {
  return (
    <Section id="prep" muted>
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <SectionHeading
            center={false}
            eyebrow="Admission preparation"
            title="Practice, mock tests & question banks"
            subtitle="Get ready for admission tests with MCQ practice, timed mock exams and your score history. Sign in to track progress."
          />
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Badge tone="brand" icon={Lock}>Requires sign-in</Badge>
            <Badge tone="warning">Sample questions marked as demo</Badge>
          </div>
          <div className="mt-6">
            <Button to="/preparation" size="lg">
              Start preparing <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {prepFeatures.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: (i % 6) * 0.05 }}
              className="card-base flex flex-col items-start gap-3 p-4"
            >
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent-500/10 text-accent-600 dark:text-accent-400">
                <Icon name={f.icon} className="h-5 w-5" />
              </span>
              <p className="text-sm font-semibold text-content">{f.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

export default PrepFeatures;
