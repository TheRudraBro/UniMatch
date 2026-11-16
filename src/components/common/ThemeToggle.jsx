import { Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/utils/cn';

export function ThemeToggle({ className }) {
  const { isDark, toggleTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        'relative grid h-10 w-10 place-items-center rounded-xl border border-line bg-card text-content transition hover:bg-card-muted',
        className
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? 'moon' : 'sun'}
          initial={{ y: -8, opacity: 0, rotate: -30 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 8, opacity: 0, rotate: 30 }}
          transition={{ duration: 0.18 }}
        >
          {isDark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

export default ThemeToggle;
