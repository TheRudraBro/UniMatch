import Hero from '@/components/home/Hero';
import QuickSearch from '@/components/home/QuickSearch';
import DisclaimerBar from '@/components/common/DisclaimerBar';
import TopUniversities from '@/components/home/TopUniversities';
import PopularDepartments from '@/components/home/PopularDepartments';
import IntlDestinations from '@/components/home/IntlDestinations';
import HowItWorks from '@/components/home/HowItWorks';
import WhyChoose from '@/components/home/WhyChoose';
import PrepFeatures from '@/components/home/PrepFeatures';
import Stats from '@/components/home/Stats';
import Testimonials from '@/components/home/Testimonials';
import FaqPreview from '@/components/home/FaqPreview';
import NewsletterCta from '@/components/home/NewsletterCta';

export default function Home() {
  return (
    <>
      <Hero />
      <QuickSearch />
      <DisclaimerBar />
      <TopUniversities />
      <PopularDepartments />
      <IntlDestinations />
      <HowItWorks />
      <WhyChoose />
      <PrepFeatures />
      <Stats />
      <Testimonials />
      <FaqPreview />
      <NewsletterCta />
    </>
  );
}
