import { motion } from 'framer-motion';
import Section from '@/components/common/Section';
import SectionHeading from '@/components/common/SectionHeading';
import Icon from '@/components/common/Icon';
import { howItWorks } from '@/data/content';

export function HowItWorks() {
  return (
    <Section id="how-it-works" muted>
      <SectionHeading
        eyebrow="How it works"
        title="From GPA to shortlist in four steps"
        subtitle="A simple, honest flow — we help you plan, you apply through official channels."
      />

      <div className="relative mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {howItWorks.map((s, i) => (
          <motion.div
            key={s.step}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="relative"
          >
            <div className="card-base h-full p-6">
              <div className="flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-brand-600 to-accent-500 text-white shadow-lift">
                  <Icon name={s.icon} className="h-6 w-6" />
                </span>
                <span className="text-4xl font-black text-line">0{s.step}</span>
              </div>
              <h3 className="mt-4 font-semibold text-content">{s.title}</h3>
              <p className="mt-1.5 text-sm text-content-muted">{s.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

export default HowItWorks;
