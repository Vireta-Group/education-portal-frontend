import { useState, useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu, X, ChevronDown, GraduationCap, Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";

const navLinks = [
  { to: "/public", label: "Home" },
  { to: "/public/about", label: "About" },
  { to: "/public/academic-life", label: "Academic" },
  { to: "/public/admission", label: "Admission" },
  { to: "/public/co-curricular", label: "Co-Curricular" },
  { to: "/public/newsroom", label: "Newsroom" },
  { to: "/public/contact", label: "Contact" },
];

const footerLinks = [
  { title: "Quick Links", links: [
    { label: "About Us", to: "/public/about" },
    { label: "Admissions", to: "/public/admission" },
    { label: "Academics", to: "/public/academic-life" },
    { label: "Co-Curricular", to: "/public/co-curricular" },
    { label: "News & Events", to: "/public/newsroom" },
    { label: "Contact Us", to: "/public/contact" },
  ]},
  { title: "Student Life", links: [
    { label: "Clubs & Societies", to: "/public/co-curricular" },
    { label: "Sports & Games", to: "/public/co-curricular" },
    { label: "Cultural Events", to: "/public/co-curricular" },
    { label: "Student Council", to: "/public/academic-life" },
    { label: "Code of Conduct", to: "/public/academic-life" },
  ]},
  { title: "Resources", links: [
    { label: "Academic Calendar", to: "/public/academic-life" },
    { label: "Admission Circulars", to: "/public/admission" },
    { label: "Photo Gallery", to: "/public/newsroom" },
    { label: "Video Gallery", to: "/public/newsroom" },
    { label: "Downloads", to: "/public/admission" },
    { label: "FAQ", to: "/public/admission" },
  ]},
];

export default function PublicLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { darkMode } = useSelector((state) => state.app);

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? "dark" : ""}`}>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-secondary-900/80 backdrop-blur-xl shadow-lg shadow-black/5"
          : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <NavLink to="/public" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/25 group-hover:shadow-primary-500/40 transition-shadow">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-secondary-800 dark:text-white tracking-tight">
                Sunshine <span className="text-primary-600">School</span>
              </span>
            </NavLink>

            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to || (link.to !== "/public" && location.pathname.startsWith(link.to));
                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative group ${
                      isActive
                        ? "text-primary-600 dark:text-primary-400"
                        : "text-secondary-800/70 dark:text-white/70 hover:text-secondary-800 dark:hover:text-white"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-primary-500 rounded-full" />
                    )}
                  </NavLink>
                );
              })}
            </nav>

            <div className="flex items-center gap-3">
              <NavLink
                to="/login"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-800 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors"
              >
                Sign In
              </NavLink>
              <NavLink
                to="/register"
                className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl hover:from-primary-700 hover:to-primary-800 shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all"
              >
                Register
                <ArrowUpRight className="w-3.5 h-3.5" />
              </NavLink>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-xl text-secondary-800 dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
          mobileOpen ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
        }`}>
          <nav className="px-4 pb-4 pt-2 bg-white/95 dark:bg-secondary-900/95 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to || (link.to !== "/public" && location.pathname.startsWith(link.to));
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20"
                      : "text-secondary-800/70 dark:text-white/70 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  }`}
                >
                  {link.label}
                </NavLink>
              );
            })}
            <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 flex gap-2">
              <NavLink to="/login" className="flex-1 text-center px-4 py-2.5 text-sm font-medium text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-800 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors">
                Sign In
              </NavLink>
              <NavLink to="/register" className="flex-1 text-center px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all">
                Register
              </NavLink>
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-secondary-900 dark:bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(99,102,241,0.06),transparent_50%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/25">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold tracking-tight">
                  Sunshine <span className="text-primary-400">School</span>
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Empowering students with knowledge, skills, and values to excel in a rapidly changing world. Nurturing tomorrow's leaders today.
              </p>
              <div className="flex gap-3">
                {["facebook", "twitter", "instagram", "youtube"].map((social) => (
                  <a key={social} href="#" className="w-9 h-9 rounded-lg bg-white/10 hover:bg-primary-600/20 flex items-center justify-center text-gray-400 hover:text-primary-400 transition-all">
                    <span className="text-xs font-bold uppercase">{social[0]}</span>
                  </a>
                ))}
              </div>
            </div>

            {footerLinks.map((group) => (
              <div key={group.title}>
                <h3 className="text-sm font-semibold text-white/90 uppercase tracking-wider mb-4">{group.title}</h3>
                <ul className="space-y-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <NavLink to={link.to} className="text-sm text-gray-400 hover:text-primary-400 transition-colors flex items-center gap-1.5 group">
                        <span className="w-1 h-1 rounded-full bg-gray-500 group-hover:bg-primary-400 transition-colors" />
                        {link.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Sunshine School. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-gray-500 hover:text-gray-400 transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-400 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
