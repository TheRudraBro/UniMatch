import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, LogIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '@/components/common/Logo';
import ThemeToggle from '@/components/common/ThemeToggle';
import Button from '@/components/common/Button';
import { navLinks } from './navLinks';
import { cn } from '@/utils/cn';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => (document.body.style.overflow = '');
  }, [open]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-colors',
        scrolled
          ? 'border-b border-line bg-surface/85 backdrop-blur-lg'
          : 'border-b border-transparent bg-surface/60 backdrop-blur'
      )}
    >
      <nav className="container-px flex h-16 items-center justify-between gap-4">
        <Link to="/" aria-label="UniMatch home">
          <Logo />
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                cn(
                  'rounded-lg px-3 py-2 text-sm font-medium transition',
                  isActive
                    ? 'text-brand-600 dark:text-brand-300'
                    : 'text-content-muted hover:bg-card-muted hover:text-content'
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button to="/login" variant="ghost" size="sm" className="hidden sm:inline-flex">
            <LogIn className="h-4 w-4" /> Log in
          </Button>
          <Button to="/signup" size="sm" className="hidden sm:inline-flex">
            Get started
          </Button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-card lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-line bg-surface lg:hidden"
          >
            <div className="container-px flex flex-col gap-1 py-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    cn(
                      'rounded-xl px-4 py-3 text-sm font-medium transition',
                      isActive
                        ? 'bg-brand-500/10 text-brand-600 dark:text-brand-300'
                        : 'text-content hover:bg-card-muted'
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="mt-2 grid grid-cols-2 gap-2">
                <Button to="/login" variant="secondary" size="sm">
                  Log in
                </Button>
                <Button to="/signup" size="sm">
                  Get started
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
