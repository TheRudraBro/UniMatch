import Section from '@/components/common/Section';
import SectionHeading from '@/components/common/SectionHeading';

export default function Privacy() {
  return (
    <Section className="min-h-screen">
      <SectionHeading
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle="Last updated: November 2026"
      />

      <div className="mt-12 max-w-3xl mx-auto card-base p-8 sm:p-10 space-y-6 text-sm text-content-muted leading-relaxed">
        <div>
          <h3 className="text-lg font-bold text-content mb-2">1. Information We Collect</h3>
          <p>
            UniMatch stores basic preferences such as your bookmarked universities, academic profile (SSC/HSC GPA), and mock test scores locally in your browser to personalize your experience.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-content mb-2">2. How We Use Your Data</h3>
          <p>
            Your data is used solely to display your saved shortlist, prevent repeating mock test questions, and track your admission preparation progress on your dashboard. We do not sell or share your personal information with third parties.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-content mb-2">3. External University Links</h3>
          <p>
            Our platform contains links to official local and international university websites. We are not responsible for the privacy practices or content of those external sites.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-content mb-2">4. Contact</h3>
          <p>
            If you have any questions regarding this Privacy Policy, please reach out to us via the Contact page.
          </p>
        </div>
      </div>
    </Section>
  );
}