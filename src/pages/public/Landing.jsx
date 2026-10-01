import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { GraduationCap, Menu, X, BookOpen, Users, Award, Sparkles, ArrowRight, CheckCircle, ChevronRight, Star, Quote } from "lucide-react";

const features = [
  { icon: BookOpen, title: "Academic Excellence", description: "Comprehensive curriculum designed to foster critical thinking and intellectual growth." },
  { icon: Users, title: "Expert Faculty", description: "Dedicated educators committed to nurturing each student's unique potential." },
  { icon: Award, title: "Holistic Development", description: "Balanced focus on academics, sports, arts, and character building." },
  { icon: Sparkles, title: "Modern Facilities", description: "State-of-the-art labs, library, sports complex, and digital classrooms." },
];

const stats = [
  { value: "25+", label: "Years of Excellence" },
  { value: "2,000+", label: "Students Enrolled" },
  { value: "98%", label: "Pass Percentage" },
  { value: "50+", label: "Expert Faculty" },
];

const testimonials = [
  { name: "Priya Sharma", role: "Parent", text: "Sunshine School has transformed my child's outlook towards learning. The teachers are incredibly supportive and the environment is nurturing." },
  { name: "Arun Kumar", role: "Alumni, Class of 2020", text: "The values and education I received here laid the foundation for my success. Proud to be a Sunshine alumnus!" },
  { name: "Dr. Meera Patel", role: "Education Board Member", text: "One of the finest institutions I've had the pleasure to assess. Their commitment to holistic education is commendable." },
];

export default function Landing() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { darkMode } = useSelector((state) => state.app);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`min-h-screen ${darkMode ? "dark bg-secondary-900" : "bg-white"}`}>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-secondary-900/80 backdrop-blur-xl shadow-lg shadow-black/5"
          : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/25">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-secondary-800 dark:text-white tracking-tight">
                Sunshine <span className="text-primary-600">School</span>
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-2">
              {["About", "Academics", "Admission", "Contact"].map((item) => (
                <Link key={item} to={`/public/${item.toLowerCase()}`} className="px-4 py-2 rounded-lg text-sm font-medium text-secondary-800/70 dark:text-white/70 hover:text-secondary-800 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-all">
                  {item}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Link to="/login" className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-800 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors">
                Sign In
              </Link>
              <Link to="/register" className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl hover:from-primary-700 hover:to-primary-800 shadow-lg shadow-primary-500/25 transition-all">
                Get Started
              </Link>
              <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 rounded-xl text-secondary-800 dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${mobileOpen ? "max-h-[24rem] opacity-100" : "max-h-0 opacity-0"}`}>
          <nav className="px-4 pb-4 pt-2 bg-white/95 dark:bg-secondary-900/95 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800">
            {["About", "Academics", "Admission", "Contact"].map((item) => (
              <Link key={item} to={`/public/${item.toLowerCase()}`} className="block px-4 py-3 rounded-xl text-sm font-medium text-secondary-800/70 dark:text-white/70 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                {item}
              </Link>
            ))}
            <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 flex gap-2">
              <Link to="/login" className="flex-1 text-center px-4 py-2.5 text-sm font-medium text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-800 rounded-xl">Sign In</Link>
              <Link to="/register" className="flex-1 text-center px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl">Register</Link>
            </div>
          </nav>
        </div>
      </header>

      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-indigo-50 dark:from-secondary-900 dark:via-secondary-900 dark:to-primary-950" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: "3s" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-6 animate-fadeIn">
              <Sparkles className="w-4 h-4" />
              Admissions Open for 2025-26
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-secondary-800 dark:text-white leading-[1.1] tracking-tight mb-6 animate-fadeIn">
              Shaping Bright
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-primary-500 to-violet-500">
                Futures Today
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8 max-w-2xl animate-fadeIn" style={{ animationDelay: "0.15s" }}>
              At Sunshine School, we nurture every child's potential through academic excellence, creative exploration, and character development in a supportive community.
            </p>
            <div className="flex flex-wrap gap-4 animate-fadeIn" style={{ animationDelay: "0.3s" }}>
              <Link to="/register" className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl hover:from-primary-700 hover:to-primary-800 shadow-xl shadow-primary-500/30 hover:shadow-primary-500/50 transition-all">
                Apply Now
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/public" className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-secondary-800 dark:text-white border-2 border-secondary-200 dark:border-gray-700 rounded-2xl hover:bg-secondary-50 dark:hover:bg-white/5 transition-all">
                Explore More
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-secondary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, i) => (
              <div key={stat.label} className="text-center p-6 rounded-2xl bg-gradient-to-b from-primary-50 to-white dark:from-primary-950/30 dark:to-secondary-900 border border-primary-100 dark:border-primary-900/30 animate-fadeIn" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="text-3xl lg:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50/50 dark:bg-secondary-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-800 dark:text-white mb-4">Why Choose Sunshine?</h2>
            <p className="text-gray-500 dark:text-gray-400">We provide an environment where every student can discover their strengths and build a foundation for lifelong success.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, i) => (
              <div key={feat.title} className="group p-6 rounded-2xl bg-white dark:bg-secondary-800 border border-gray-100 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-800 shadow-sm hover:shadow-xl hover:shadow-primary-500/5 transition-all duration-300 animate-fadeIn" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center mb-4 shadow-lg shadow-primary-500/20 group-hover:shadow-primary-500/40 transition-shadow">
                  <feat.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-secondary-800 dark:text-white mb-2">{feat.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{feat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-secondary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-800 dark:text-white mb-4">What People Say</h2>
            <p className="text-gray-500 dark:text-gray-400">Hear from our community about their experience with Sunshine School.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={t.name} className="p-8 rounded-2xl bg-gray-50 dark:bg-secondary-800 border border-gray-100 dark:border-gray-700 animate-fadeIn" style={{ animationDelay: `${i * 0.15}s` }}>
                <Quote className="w-8 h-8 text-primary-300 dark:text-primary-700 mb-4" />
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-sm font-bold">{t.name[0]}</div>
                  <div>
                    <div className="text-sm font-semibold text-secondary-800 dark:text-white">{t.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-primary-700 to-violet-800" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(255,255,255,0.05),transparent_50%)]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Begin Your Journey?</h2>
          <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">Join Sunshine School and give your child the gift of a world-class education in a nurturing environment.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register" className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-primary-700 bg-white rounded-2xl hover:bg-primary-50 shadow-xl transition-all">
              Enroll Today
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/public/contact" className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white border-2 border-white/30 rounded-2xl hover:bg-white/10 transition-all">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-secondary-900 dark:bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-semibold">Sunshine School</span>
            </div>
            <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} All rights reserved.</p>
            <div className="flex gap-4">
              <Link to="/public" className="text-sm text-gray-400 hover:text-white transition-colors">Home</Link>
              <Link to="/public/about" className="text-sm text-gray-400 hover:text-white transition-colors">About</Link>
              <Link to="/public/contact" className="text-sm text-gray-400 hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
