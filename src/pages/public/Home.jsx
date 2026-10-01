import { Link } from "react-router-dom";
import { BookOpen, Users, Award, Sparkles, ArrowRight, GraduationCap, Library, Microscope, Trophy, Palette, ChevronRight, Star, Heart, Shield } from "lucide-react";

const quickLinks = [
  { label: "About Us", to: "/public/about", desc: "Our mission & vision", color: "from-blue-500 to-blue-600" },
  { label: "Admissions", to: "/public/admission", desc: "Apply for 2025-26", color: "from-violet-500 to-violet-600" },
  { label: "Academics", to: "/public/academic-life", desc: "Curriculum & rules", color: "from-emerald-500 to-emerald-600" },
  { label: "Co-Curricular", to: "/public/co-curricular", desc: "Activities & clubs", color: "from-amber-500 to-amber-600" },
];

const highlights = [
  { icon: Library, title: "Digital Library", desc: "Access to 10,000+ resources" },
  { icon: Microscope, title: "Modern Labs", desc: "Science & computer labs" },
  { icon: Trophy, title: "Sports Complex", desc: "Indoor & outdoor facilities" },
  { icon: Palette, title: "Creative Arts", desc: "Music, dance & fine arts" },
  { icon: Heart, title: "Counseling", desc: "Student wellness support" },
  { icon: Shield, title: "Safe Campus", desc: "24/7 security & surveillance" },
];

const newsItems = [
  { date: "Mar 15, 2026", title: "Annual Sports Day 2026", category: "Event" },
  { date: "Feb 28, 2026", title: "Science Fair Winners Announced", category: "Achievement" },
  { date: "Jan 10, 2026", title: "New Academic Session Begins", category: "Notice" },
];

export default function Home() {
  return (
    <div>
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-violet-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.06),transparent_50%)]" />
        <div className="absolute top-20 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-blob" style={{ animationDelay: "3s" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 text-white/90 text-sm font-medium backdrop-blur-sm mb-6 animate-fadeIn">
              <Star className="w-4 h-4 text-yellow-300" />
              Excellence in Education Since 2000
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6 animate-fadeIn">
              Welcome to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-400">
                Sunshine School
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-primary-100 leading-relaxed mb-8 max-w-xl animate-fadeIn" style={{ animationDelay: "0.15s" }}>
              Where young minds blossom and futures take flight. Discover a world of learning, creativity, and endless possibilities.
            </p>
            <div className="flex flex-wrap gap-4 animate-fadeIn" style={{ animationDelay: "0.3s" }}>
              <Link to="/public/admission" className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-primary-700 bg-white rounded-2xl hover:bg-primary-50 shadow-xl transition-all">
                Apply for Admission
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/public/about" className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white border-2 border-white/25 rounded-2xl hover:bg-white/10 transition-all">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-secondary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickLinks.map((link, i) => (
              <Link key={link.label} to={link.to} className={`group relative p-5 rounded-2xl bg-gradient-to-br ${link.color} text-white overflow-hidden transition-all duration-300 hover:scale-[1.02] shadow-lg animate-fadeIn`} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
                <div className="relative">
                  <div className="text-lg font-semibold mb-1">{link.label}</div>
                  <div className="text-sm text-white/80">{link.desc}</div>
                </div>
                <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60 group-hover:translate-x-1 transition-transform" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50/50 dark:bg-secondary-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-800 dark:text-white mb-4">School Highlights</h2>
            <p className="text-gray-500 dark:text-gray-400">Discover what makes Sunshine School a premier institution for your child's education.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((item, i) => (
              <div key={item.title} className="group p-6 rounded-2xl bg-white dark:bg-secondary-800 border border-gray-100 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-800 shadow-sm hover:shadow-xl transition-all duration-300 animate-fadeIn" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center mb-4 shadow-lg shadow-primary-500/20 group-hover:shadow-primary-500/40 transition-all">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-secondary-800 dark:text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-secondary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fadeInLeft">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-4">
                <GraduationCap className="w-4 h-4" />
                Our Philosophy
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-secondary-800 dark:text-white mb-6 leading-tight">
                Nurturing Potential,<br />
                <span className="text-primary-600 dark:text-primary-400">Building Character</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                At Sunshine School, we believe education extends beyond textbooks. Our holistic approach combines rigorous academics with character development, creative expression, and physical wellness to prepare students for a dynamic world.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: "Student-Teacher Ratio", value: "15:1" },
                  { label: "Average Experience", value: "12+ Years" },
                ].map((s) => (
                  <div key={s.label} className="p-4 rounded-xl bg-gray-50 dark:bg-secondary-800 border border-gray-100 dark:border-gray-700">
                    <div className="text-xl font-bold text-primary-600 dark:text-primary-400">{s.value}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{s.label}</div>
                  </div>
                ))}
              </div>
              <Link to="/public/about" className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all">
                Know More About Us
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative animate-fadeInRight">
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900/30 dark:to-primary-800/20 border border-primary-200 dark:border-primary-800/50 flex items-center justify-center overflow-hidden">
                <div className="text-center p-8">
                  <GraduationCap className="w-16 h-16 text-primary-300 dark:text-primary-600 mx-auto mb-4" />
                  <p className="text-primary-400 dark:text-primary-500 text-sm">Image Gallery</p>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl -z-10 blur-sm opacity-30" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50/50 dark:bg-secondary-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-secondary-800 dark:text-white">Latest News</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Stay updated with school events and announcements</p>
            </div>
            <Link to="/public/newsroom" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 transition-colors">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {newsItems.map((item, i) => (
              <Link key={item.title} to="/public/newsroom" className="group p-6 rounded-2xl bg-white dark:bg-secondary-800 border border-gray-100 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-800 shadow-sm hover:shadow-xl transition-all duration-300 animate-fadeIn" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">{item.category}</span>
                  <span className="text-xs text-gray-400">{item.date}</span>
                </div>
                <h3 className="text-base font-semibold text-secondary-800 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{item.title}</h3>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link to="/public/newsroom" className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 dark:text-primary-400">
              View All News <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-primary-700 to-violet-800" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1),transparent_60%)]" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Shape Your Child's Future</h2>
          <p className="text-primary-100 text-lg mb-8">Admissions open for the academic year 2025-26. Limited seats available.</p>
          <Link to="/public/admission" className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-primary-700 bg-white rounded-2xl hover:bg-primary-50 shadow-xl transition-all">
            View Admission Details
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
