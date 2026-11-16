import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Sparkles, Compass, GraduationCap, MapPin, Building2 } from 'lucide-react';
import Button from '@/components/common/Button';

export function Hero() {
  const navigate = useNavigate();
  const [q, setQ] = useState('');

  const submit = (e) => {
    e.preventDefault();
    const query = q.trim();
    navigate(query ? `/find?q=${encodeURIComponent(query)}` : '/find');
  };

  return (
    <section className="relative overflow-hidden">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl" />
        <div className="absolute -top-10 right-1/4 h-72 w-72 rounded-full bg-accent-500/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(var(--line))_1px,transparent_0)] [background-size:28px_28px] opacity-40" />
      </div>

      <div className="container-px grid items-center gap-12 py-16 md:py-24 lg:grid-cols-2">
        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="eyebrow mb-5">
            <Sparkles className="h-3.5 w-3.5" /> Smart University Finder
          </span>
          <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-content sm:text-5xl md:text-6xl">
            Find the University That <span className="gradient-text">Matches Your Future.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-content-muted">
            Discover universities, explore departments, compare tuition fees, and
            find your admission opportunities with UniMatch.
          </p>

          {/* Large search bar */}
          <form onSubmit={submit} className="mt-7 flex max-w-xl flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-content-muted" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search universities, departments, cities…"
                className="input-base h-12 pl-11 text-base"
                aria-label="Search universities"
              />
            </div>
            <Button type="submit" size="lg" className="shrink-0">
              Search
            </Button>
          </form>

          <div className="mt-5 flex flex-wrap gap-3">
            <Button to="/find" size="lg">
              <Compass className="h-5 w-5" /> Find My University
            </Button>
            <Button to="/find" variant="secondary" size="lg">
              <GraduationCap className="h-5 w-5" /> Explore Universities
            </Button>
          </div>

          <p className="mt-5 text-sm text-content-muted">
            20 Bangladeshi universities seeded · 5 study destinations · honest,
            source-backed data.
          </p>
        </motion.div>

        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative hidden lg:block"
        >
          <HeroVisual />
        </motion.div>
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative mx-auto max-w-md">
      <div className="card-base relative overflow-hidden p-6 shadow-lift">
        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-brand-500/10 blur-2xl" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-brand-500" />
            <span className="font-semibold text-content">Your match</span>
          </div>
          <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            Eligible
          </span>
        </div>

        {[
          { icon: Building2, label: 'Universities in budget', value: '12 matches' },
          { icon: MapPin, label: 'Preferred division', value: 'Dhaka' },
          { icon: Sparkles, label: 'Compatibility score', value: '92%' },
        ].map((row, i) => (
          <motion.div
            key={row.label}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.12 }}
            className="mt-3 flex items-center justify-between rounded-xl border border-line bg-card-muted px-4 py-3"
          >
            <span className="flex items-center gap-2 text-sm text-content-muted">
              <row.icon className="h-4 w-4 text-brand-500" /> {row.label}
            </span>
            <span className="text-sm font-semibold text-content">{row.value}</span>
          </motion.div>
        ))}
        <p className="mt-4 text-[11px] text-content-muted">
          Illustrative preview. Compatibility is an internal score, not an
          admission guarantee.
        </p>
      </div>

      <div className="animate-float absolute -bottom-6 -left-6 card-base w-44 p-4 shadow-lift">
        <p className="text-xs text-content-muted">Est. program cost</p>
        <p className="mt-1 text-lg font-bold text-content">Breakdown shown</p>
        <p className="text-[11px] text-content-muted">Tuition + fees, itemized</p>
      </div>
    </div>
  );
}

export default Hero;
