import { Link } from "react-router-dom";
import { Music, Palette, Dumbbell, BookOpen, Theater, Laptop, Trophy, Heart, ArrowRight, Sparkles, Camera } from "lucide-react";

const activities = [
  { icon: Music, title: "Music & Band", desc: "Vocal training, instrumental music, and school band performances.", color: "from-rose-500 to-rose-600" },
  { icon: Palette, title: "Fine Arts", desc: "Painting, sketching, sculpture, and craft workshops.", color: "from-orange-500 to-orange-600" },
  { icon: Dumbbell, title: "Sports & Games", desc: "Cricket, basketball, football, athletics, swimming, and yoga.", color: "from-green-500 to-green-600" },
  { icon: Theater, title: "Drama & Theatre", desc: "Stage performances, elocution, debates, and public speaking.", color: "from-purple-500 to-purple-600" },
  { icon: BookOpen, title: "Literary Club", desc: "Creative writing, poetry, storytelling, and book clubs.", color: "from-cyan-500 to-cyan-600" },
  { icon: Laptop, title: "Technology Club", desc: "Coding, robotics, web design, and digital literacy.", color: "from-blue-500 to-blue-600" },
];

const gallery = [
  { label: "Annual Day Celebration", count: "24 photos" },
  { label: "Sports Meet 2026", count: "18 photos" },
  { label: "Art Exhibition", count: "30 photos" },
  { label: "Science Fair", count: "22 photos" },
  { label: "Cultural Fest", count: "28 photos" },
  { label: "Field Trips", count: "15 photos" },
];

const achievements = [
  { title: "State Level Chess Champion", year: "2025-26" },
  { title: "Inter-School Debate Winners", year: "2025-26" },
  { title: "Science Olympiad Gold Medalists", year: "2024-25" },
  { title: "District Cricket Champions", year: "2024-25" },
];

export default function CoCurricular() {
  return (
    <div>
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-600 via-orange-600 to-rose-700" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 text-white/90 text-sm font-medium backdrop-blur-sm mb-6 animate-fadeIn">
            <Sparkles className="w-4 h-4" />
            Beyond Academics
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 animate-fadeIn">
            Co-Curricular{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-400">
              Activities
            </span>
          </h1>
          <p className="text-lg text-amber-100 leading-relaxed max-w-2xl mx-auto animate-fadeIn" style={{ animationDelay: "0.15s" }}>
            Where talents are discovered, creativity is nurtured, and every student finds their passion beyond the classroom.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-secondary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-800 dark:text-white mb-4">Explore Activities</h2>
            <p className="text-gray-500 dark:text-gray-400">Diverse opportunities for every student to explore and excel</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((act, i) => (
              <div key={act.title} className="group p-6 rounded-2xl bg-gray-50 dark:bg-secondary-800 border border-gray-100 dark:border-gray-700 hover:border-transparent hover:shadow-xl transition-all duration-300 relative overflow-hidden animate-fadeIn" style={{ animationDelay: `${i * 0.08}s` }}>
                <div className={`absolute inset-0 bg-gradient-to-br ${act.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center mb-4 shadow-lg shadow-amber-500/20 group-hover:bg-white/20 transition-all">
                    <act.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-secondary-800 dark:text-white group-hover:text-white mb-2 transition-colors">{act.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-white/80 transition-colors">{act.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50/50 dark:bg-secondary-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-secondary-800 dark:text-white">Achievements</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Our students shine on every stage</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {achievements.map((ach, i) => (
              <div key={ach.title} className="p-5 rounded-2xl bg-white dark:bg-secondary-800 border border-gray-100 dark:border-gray-700 flex items-center gap-4 animate-fadeIn" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center flex-shrink-0">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-secondary-800 dark:text-white">{ach.title}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{ach.year}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-secondary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-800 dark:text-white mb-4">Photo Gallery</h2>
            <p className="text-gray-500 dark:text-gray-400">Moments captured from school events and activities</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery.map((item, i) => (
              <div key={item.label} className="group relative aspect-[4/3] rounded-2xl bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-900/30 dark:to-amber-800/20 border border-amber-200 dark:border-amber-800/50 overflow-hidden cursor-pointer animate-fadeIn" style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Camera className="w-12 h-12 text-amber-300 dark:text-amber-600" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                  <div className="text-white font-semibold text-sm">{item.label}</div>
                  <div className="text-white/70 text-xs">{item.count}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
