import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from 'recharts';
import Section from '@/components/common/Section';
import SectionHeading from '@/components/common/SectionHeading';
import Icon from '@/components/common/Icon';
import { useTheme } from '@/context/ThemeContext';
import { platformStats, seedBreakdown } from '@/data/content';

function Counter({ to, suffix = '', active }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf;
    const start = performance.now();
    const dur = 1100;
    const tick = (t) => {
      const p = Math.min((t - start) / dur, 1);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, active]);
  return (
    <span>
      {n}
      {suffix}
    </span>
  );
}

const BAR_COLORS = ['#6366f1', '#4f46e5', '#0ea5e9', '#818cf8'];

export function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { isDark } = useTheme();
  const axis = isDark ? '#94a3b8' : '#475569';
  const grid = isDark ? '#27334a' : '#e2e8f0';

  return (
    <Section id="stats">
      <SectionHeading
        eyebrow="At a glance"
        title="What’s inside this build"
        subtitle="These numbers describe the seeded content in this version — not marketing claims."
      />

      <div ref={ref} className="mt-10 grid gap-6 lg:grid-cols-2">
        {/* Counters */}
        <div className="grid grid-cols-2 gap-4">
          {platformStats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="card-base p-6"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-300">
                <Icon name={s.icon} className="h-5 w-5" />
              </span>
              <p className="mt-4 text-3xl font-extrabold text-content">
                <Counter to={s.value} suffix={s.suffix} active={inView} />
              </p>
              <p className="mt-1 text-sm text-content-muted">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Chart */}
        <div className="card-base p-6">
          <p className="font-semibold text-content">Seeded records by category</p>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={seedBreakdown} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={grid} vertical={false} />
                <XAxis dataKey="name" tick={{ fill: axis, fontSize: 12 }} tickLine={false} axisLine={{ stroke: grid }} />
                <YAxis tick={{ fill: axis, fontSize: 12 }} tickLine={false} axisLine={false} />
                <Tooltip
                  cursor={{ fill: 'rgba(99,102,241,0.08)' }}
                  contentStyle={{
                    background: isDark ? '#151E30' : '#ffffff',
                    border: `1px solid ${grid}`,
                    borderRadius: 12,
                    color: axis,
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="count" radius={[8, 8, 0, 0]} maxBarSize={56}>
                  {seedBreakdown.map((_, i) => (
                    <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default Stats;
