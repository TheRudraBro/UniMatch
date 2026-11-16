import {
  // how it works
  ClipboardList, Sparkles, GitCompareArrows, GraduationCap,
  // why choose
  ShieldCheck, Target, LayoutGrid, Globe2, BookOpenCheck, Smartphone,
  // prep features
  ListChecks, Timer, Archive, BarChart3,
  // stats
  School, BookMarked, MapPin,
  // department catalog
  Cpu, Zap, Code2, Building2, Shirt, Database, Server,
  Briefcase, Calculator, TrendingUp, Megaphone, Users, LineChart,
  BookOpen, Scale, Newspaper, Users2, Brain,
  Pill, Ruler, HeartPulse, Leaf,
  Circle,
} from 'lucide-react';

/**
 * Explicit icon registry so only the icons we actually use are bundled
 * (avoids pulling the entire lucide library into the build). Data files store
 * icons by name; this maps those names to components.
 */
const registry = {
  ClipboardList, Sparkles, GitCompareArrows, GraduationCap,
  ShieldCheck, Target, LayoutGrid, Globe2, BookOpenCheck, Smartphone,
  ListChecks, Timer, Archive, BarChart3,
  School, BookMarked, MapPin,
  Cpu, Zap, Code2, Building2, Shirt, Database, Server,
  Briefcase, Calculator, TrendingUp, Megaphone, Users, LineChart,
  BookOpen, Scale, Newspaper, Users2, Brain,
  Pill, Ruler, HeartPulse, Leaf,
};

export function Icon({ name, className, ...props }) {
  const Cmp = registry[name] || Circle;
  return <Cmp className={className} {...props} />;
}

export default Icon;
