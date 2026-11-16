import { Link } from 'react-router-dom';
import Section from '@/components/common/Section';
import SectionHeading from '@/components/common/SectionHeading';
import Accordion from '@/components/common/Accordion';
import { faqs } from '@/data/content';

export function FaqPreview() {
  return (
    <Section id="faq">
      <SectionHeading
        eyebrow="FAQ"
        title="Frequently asked questions"
        subtitle="The essentials about how UniMatch works and what our data means."
      />
      <div className="mx-auto mt-10 max-w-3xl">
        <Accordion items={faqs} />
        <p className="mt-6 text-center text-sm text-content-muted">
          More questions?{' '}
          <Link to="/faq" className="font-semibold text-brand-600 dark:text-brand-300">
            See the full FAQ
          </Link>{' '}
          or{' '}
          <Link to="/contact" className="font-semibold text-brand-600 dark:text-brand-300">
            contact us
          </Link>
          .
        </p>
      </div>
    </Section>
  );
}

export default FaqPreview;
