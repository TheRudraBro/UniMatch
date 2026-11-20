import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Section from "@/components/common/Section";
import SectionHeading from "@/components/common/SectionHeading";
import Icon from "@/components/common/Icon";
import { popularDepartments } from "@/data/seedDepartments";

export function PopularDepartments() {
  return (
    <Section id="departments" muted>
      <SectionHeading
        eyebrow="Programs"
        title="Popular departments"
        subtitle="Explore programs across Science & Technology, Business, Arts & Humanities and more. Requirements and fees vary by university."
      />

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {popularDepartments.map((d, i) => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.35, delay: (i % 4) * 0.05 }}
          >
            <Link
              to={`/department/${d.id}`}
              className="card-base group flex h-full flex-col gap-3 p-5 transition hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-lift"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-500/10 text-brand-600 transition group-hover:scale-110 dark:text-brand-300">
                <Icon name={d.icon} className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-content">{d.short}</p>
                <p className="text-xs text-content-muted">{d.name}</p>
              </div>
              <span className="mt-auto text-[11px] font-medium text-content-muted">
                {d.category}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

export default PopularDepartments;
