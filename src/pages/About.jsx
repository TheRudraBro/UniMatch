import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Target,
  ShieldCheck,
  Zap,
  Globe2,
  ArrowRight,
  GraduationCap,
} from "lucide-react";
import Section from "@/components/common/Section";
import SectionHeading from "@/components/common/SectionHeading";
import Button from "@/components/common/Button";

export default function About() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // পেজ লোড হলে চেক করবে ইউজার লগইন করা আছে কি না
  useEffect(() => {
    const role = localStorage.getItem("unimatch_role");
    if (role) {
      setIsAuthenticated(true);
    }
  }, []);

  const values = [
    {
      title: "Honest & Transparent Data",
      desc: "No hidden fees or misleading requirements. We provide verified, source-backed data so students can plan their future with confidence.",
      icon: ShieldCheck,
    },
    {
      title: "Smart Matching Engine",
      desc: "Finding the right university shouldn’t be a guessing game. Our smart algorithms match your academic profile and budget with the best options.",
      icon: Target,
    },
    {
      title: "Seamless Preparation",
      desc: "From discovering universities to preparing for admission tests with our extensive question bank, everything is integrated into one platform.",
      icon: Zap,
    },
    {
      title: "Global Opportunities",
      desc: "Education knows no borders. We bring both top local institutions and international study destinations right to your fingertips.",
      icon: Globe2,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Section className="relative overflow-hidden pt-20 pb-16 lg:pt-32 lg:pb-24">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-brand-500/10 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-accent-500/10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="eyebrow mb-6">Our Mission</span>
            <h1 className="text-4xl font-extrabold tracking-tight text-content sm:text-5xl md:text-6xl mb-6">
              Empowering Students to <br className="hidden sm:block" />
              <span className="gradient-text">Find Their Perfect Match.</span>
            </h1>
            <p className="text-lg text-content-muted max-w-2xl mx-auto leading-relaxed">
              UniMatch is dedicated to simplifying the complex journey of
              university admissions. We bring fragmented fee structures,
              admission requirements, and preparation tools into one unified,
              smart ecosystem.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Our Story / Origin Section */}
      <Section muted className="border-y border-line">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-content mb-4">
              The Story Behind UniMatch
            </h2>
            <div className="space-y-4 text-content-muted leading-relaxed">
              <p>
                Navigating university admissions in Bangladesh has traditionally
                been an overwhelming experience. Students and parents spend
                countless hours searching through scattered websites just to
                find basic information about tuition fees, credit hours, and GPA
                requirements.
              </p>
              <p>
                Developed as a flagship digital solution by{" "}
                <strong>Rudra Nex</strong> and founded by{" "}
                <strong>Rudra Mojumder</strong>, UniMatch was built to bridge
                this massive information gap. By combining modern web
                technologies with a student-first approach, we've created a
                platform that not only helps you discover and compare
                universities but also prepares you for the admission tests.
              </p>
              <p>
                Our goal is simple: to give every student the clarity and tools
                they need to make one of the most important decisions of their
                lives.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card-base p-8 relative overflow-hidden bg-gradient-to-br from-brand-600/5 to-accent-500/5 border-brand-500/20 shadow-lift"
          >
            <GraduationCap className="w-16 h-16 text-brand-500 mb-6" />
            <h3 className="text-2xl font-bold text-content mb-3">
              Built for the Future
            </h3>
            <p className="text-content-muted mb-6">
              UniMatch isn't just a directory; it's a complete admission
              companion. From finding your eligibility to taking mock tests, we
              are continuously evolving to support the next generation of
              learners.
            </p>
            <div className="flex items-center gap-4 text-sm font-semibold text-brand-600 dark:text-brand-400">
              <div className="flex flex-col">
                <span className="text-2xl font-black">31+</span>
                <span>Universities</span>
              </div>
              <div className="w-px h-8 bg-line"></div>
              <div className="flex flex-col">
                <span className="text-2xl font-black">400+</span>
                <span>Programs</span>
              </div>
              <div className="w-px h-8 bg-line"></div>
              <div className="flex flex-col">
                <span className="text-2xl font-black">500+</span>
                <span>Mock Qs</span>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Core Values Section */}
      <Section>
        <SectionHeading
          eyebrow="Core Values"
          title="What Drives Us Forward"
          subtitle="The principles that guide our platform's development and our commitment to students."
        />

        <div className="mt-12 grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {values.map((val, i) => (
            <motion.div
              key={val.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="card-base p-6 hover:border-brand-500/30 transition-colors"
            >
              <div className="flex items-start gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-300">
                  <val.icon className="w-6 h-6" />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-content mb-2">
                    {val.title}
                  </h3>
                  <p className="text-sm text-content-muted leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="pb-24">
        <div className="card-base p-10 sm:p-16 text-center bg-gradient-to-b from-surface to-brand-500/5 relative overflow-hidden">
          <h2 className="text-3xl font-bold text-content mb-4">
            Ready to start your journey?
          </h2>
          <p className="text-content-muted max-w-xl mx-auto mb-8">
            Join the UniMatch platform today to explore universities, compare
            costs, and practice for your admission tests.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button to="/find" size="lg">
              Find Universities
            </Button>

            {/* যদি ইউজার লগইন করা না থাকে, শুধু তখনই এই বাটনটি শো করবে */}
            {!isAuthenticated && (
              <Button to="/signup" variant="secondary" size="lg">
                Create Free Account <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>
        </div>
      </Section>
    </div>
  );
}
