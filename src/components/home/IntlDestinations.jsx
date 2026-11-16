import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Section from '@/components/common/Section';
import SectionHeading from '@/components/common/SectionHeading';
import Button from '@/components/common/Button';
import { InitialsBadge } from '@/components/common/Logo';
import Badge from '@/components/common/Badge';
import seedInternationalUniversities, { getCountryById } from '@/data/seedInternational';

export function IntlDestinations() {
  return (
    <Section id="international">
      <SectionHeading
        eyebrow="Study abroad"
        title="International study destinations"
        subtitle="One seeded university per country to start. Tuition, living costs and language requirements must be verified on official sources."
      />

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {seedInternationalUniversities.map((u, i) => {
          const country = getCountryById(u.countryId);
          return (
            <motion.div
              key={u.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.06 }}
              className="card-base flex flex-col p-5 transition hover:border-brand-500/40 hover:shadow-lift"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl" aria-hidden>
                  {country?.flag}
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-content-muted">
                    {country?.name}
                  </p>
                  <p className="font-semibold text-content">{u.city}</p>
                </div>
              </div>

              <div className="mt-4 flex items-start gap-3">
                <InitialsBadge text={u.name} className="h-10 w-10 text-xs" />
                <h3 className="text-sm font-semibold text-content">{u.name}</h3>
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5">
                <Badge tone="warning">Tuition: verify</Badge>
                <Badge tone="info">{country?.currency} ↔ BDT</Badge>
              </div>

              <a
                href={u.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 dark:text-brand-300"
              >
                Official site <ArrowUpRight className="h-4 w-4" />
              </a>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-10 text-center">
        <Button to="/international" variant="outline" size="lg">
          Explore international universities
        </Button>
      </div>
    </Section>
  );
}

export default IntlDestinations;
