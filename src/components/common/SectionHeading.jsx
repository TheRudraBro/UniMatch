import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

export function SectionHeading({ eyebrow, title, subtitle, center = true, className }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className={cn('max-w-2xl', center && 'mx-auto text-center', className)}
    >
      {eyebrow && <span className="eyebrow mb-3">{eyebrow}</span>}
      <h2 className="text-2xl font-bold tracking-tight text-content sm:text-3xl md:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base text-content-muted sm:text-lg">{subtitle}</p>
      )}
    </motion.div>
  );
}

export default SectionHeading;
