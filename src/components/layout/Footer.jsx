import { Link } from 'react-router-dom';
import { Mail, Github, Twitter, Linkedin } from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { footerLinks } from './navLinks';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-card/40">
      <div className="container-px py-14">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-content-muted">
              Find the university that matches your future. Discover, compare and
              prepare — all in one place.
            </p>
            <div className="mt-5 flex gap-2">
              {[Twitter, Linkedin, Github, Mail].map((Icon, i) => (
                <span
                  key={i}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-card text-content-muted transition hover:text-brand-600"
                >
                  <Icon className="h-4 w-4" />
                </span>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-sm font-semibold text-content">{group}</h4>
              <ul className="mt-4 space-y-2.5">
                {links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-sm link-muted">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-xs text-content-muted sm:flex-row">
          <p>© {year} UniMatch. Find Your Perfect University.</p>
          <p className="text-center sm:text-right">
            A planning tool — not an official admission authority. Verify all info on official sources.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
