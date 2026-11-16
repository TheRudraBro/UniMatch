import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import Section from '@/components/common/Section';
import SectionHeading from '@/components/common/SectionHeading';
import Badge from '@/components/common/Badge';
import { InitialsBadge } from '@/components/common/Logo';
import { testimonials } from '@/data/content';

export function Testimonials() {
  return (
    <Section id="testimonials" muted>
      <SectionHeading
        eyebrow="Student voices"
        title="What students could say"
        subtitle="The quotes below are sample content to illustrate the layout."
      />
      <div className="mt-4 flex justify-center">
        <Badge tone="warning">Sample / demo content — not real endorsements</Badge>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.figure
            key={t.name}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="card-base flex flex-col p-6"
          >
            <Quote className="h-7 w-7 text-brand-500/40" />
            <blockquote className="mt-3 flex-1 text-sm text-content">“{t.quote}”</blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <InitialsBadge text={t.name} className="h-10 w-10 text-xs" />
              <div>
                <p className="text-sm font-semibold text-content">{t.name}</p>
                <p className="text-xs text-content-muted">{t.role}</p>
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </Section>
  );
}

export default Testimonials;
