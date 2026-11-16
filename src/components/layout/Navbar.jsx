// src/components/layout/Navbar.jsx
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LogIn, Search, LogOut, LayoutDashboard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/common/Logo";
import ThemeToggle from "@/components/common/ThemeToggle";
import Button from "@/components/common/Button";
import { navLinks } from "./navLinks";
import { cn } from "@/utils/cn";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userRole, setUserRole] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setUserRole(localStorage.getItem("unimatch_role"));
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/find?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("unimatch_role");
    setUserRole(null);
    navigate("/login", { replace: true });
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-colors",
        scrolled
          ? "border-b border-line bg-surface/85 backdrop-blur-lg"
          : "border-b border-transparent bg-surface/60 backdrop-blur",
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
              end={link.to === "/"}
              className={({ isActive }) =>
                cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition whitespace-nowrap",
                  isActive
                    ? "text-brand-600 dark:text-brand-300"
                    : "text-content-muted hover:bg-card-muted hover:text-content",
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Right Action Area */}
        <div className="flex items-center gap-3 shrink-0 flex-nowrap">
          <form
            onSubmit={handleSearchSubmit}
            className="hidden lg:flex relative items-center"
          >
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-40 xl:w-56 h-9 pl-9 pr-3 rounded-full text-sm bg-card border border-line text-content focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all placeholder:text-content-muted"
            />
            <Search className="absolute left-3 h-4 w-4 text-content-muted" />
          </form>

          <ThemeToggle className="shrink-0" />

          <div className="hidden sm:flex items-center gap-2 shrink-0 flex-nowrap">
            {userRole ? (
              <>
                {/* ড্যাশবোর্ড লিংক (এডমিন হলে /admin, ইউজার হলে /dashboard) */}
                <Button
                  to={userRole === "admin" ? "/admin" : "/dashboard"}
                  variant="ghost"
                  size="sm"
                  className="whitespace-nowrap text-brand-600"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  {userRole === "admin" ? "Admin Panel" : "Dashboard"}
                </Button>

                <Button
                  onClick={handleLogout}
                  variant="secondary"
                  size="sm"
                  className="whitespace-nowrap"
                >
                  <LogOut className="h-4 w-4" /> Log out
                </Button>
              </>
            ) : (
              <>
                <Button
                  to="/login"
                  variant="ghost"
                  size="sm"
                  className="whitespace-nowrap"
                >
                  <LogIn className="h-4 w-4" /> Log in
                </Button>
                <Button to="/signup" size="sm" className="whitespace-nowrap">
                  Get started
                </Button>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line bg-card lg:hidden"
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
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-line bg-surface lg:hidden"
          >
            <div className="container-px flex flex-col gap-3 py-4">
              <form
                onSubmit={handleSearchSubmit}
                className="relative flex items-center mb-2"
              >
                <input
                  type="text"
                  placeholder="Search university..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-11 pl-10 pr-4 rounded-xl text-sm bg-card-muted border border-line text-content focus:outline-none focus:border-brand-500 transition-all"
                />
                <Search className="absolute left-3 h-5 w-5 text-content-muted" />
              </form>

              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    cn(
                      "rounded-xl px-4 py-3 text-sm font-medium transition",
                      isActive
                        ? "bg-brand-500/10 text-brand-600 dark:text-brand-300"
                        : "text-content hover:bg-card-muted",
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              <div className="mt-2 grid grid-cols-2 gap-2">
                {userRole ? (
                  <>
                    <Button
                      to={userRole === "admin" ? "/admin" : "/dashboard"}
                      variant="ghost"
                      size="sm"
                    >
                      {userRole === "admin" ? "Admin Panel" : "Dashboard"}
                    </Button>
                    <Button
                      onClick={handleLogout}
                      variant="secondary"
                      size="sm"
                    >
                      <LogOut className="h-4 w-4" /> Log out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button to="/login" variant="secondary" size="sm">
                      Log in
                    </Button>
                    <Button to="/signup" size="sm">
                      Get started
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
