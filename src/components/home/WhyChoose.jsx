import { motion } from 'framer-motion';
import Section from '@/components/common/Section';
import SectionHeading from '@/components/common/SectionHeading';
import Icon from '@/components/common/Icon';
import { whyChoose } from '@/data/content';

export function WhyChoose() {
  return (
    <Section id="why">
      <SectionHeading
        eyebrow="Why UniMatch"
        title="Built to help you decide with confidence"
        subtitle="Premium experience, honest data, and tools that actually work."
      />

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {whyChoose.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: (i % 3) * 0.06 }}
            className="card-base p-6 transition hover:border-brand-500/40"
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-300">
              <Icon name={f.icon} className="h-5 w-5" />
            </span>
            <h3 className="mt-4 font-semibold text-content">{f.title}</h3>
            <p className="mt-1.5 text-sm text-content-muted">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

export default WhyChoose;
