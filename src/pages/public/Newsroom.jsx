import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight, Video, Play, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

const news = [
  { date: "March 15, 2026", title: "Annual Sports Day 2026", excerpt: "Students showcased their athletic prowess at our grand Sports Day event with record-breaking performances.", author: "Sports Department", category: "Event" },
  { date: "Feb 28, 2026", title: "Science Fair Winners Announced", excerpt: "Congratulations to our young scientists who won top honors at the Regional Science Fair.", author: "Academic Team", category: "Achievement" },
  { date: "Jan 10, 2026", title: "New Academic Session Begins", excerpt: "The 2026-27 academic session starts with new initiatives including digital learning integration.", author: "Administration", category: "Notice" },
  { date: "Dec 20, 2025", title: "Annual Day Celebration", excerpt: "A spectacular cultural evening featuring performances by students across all grades.", author: "Cultural Committee", category: "Event" },
  { date: "Nov 15, 2025", title: "Parent-Teacher Meet", excerpt: "First PTM of the session saw excellent participation with constructive discussions.", author: "Academic Team", category: "Notice" },
  { date: "Oct 5, 2025", title: "Inter-School Debate Victory", excerpt: "Our debate team clinched the championship at the inter-school debate competition.", author: "Literary Club", category: "Achievement" },
];

const videos = [
  { title: "Sunshine School Virtual Tour", duration: "3:45" },
  { title: "Annual Day 2025 Highlights", duration: "5:20" },
  { title: "Sports Day 2025 Recap", duration: "4:10" },
  { title: "Message from the Director", duration: "2:30" },
];

export default function Newsroom() {
  const [newsIndex, setNewsIndex] = useState(0);

  return (
    <div>
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-600 via-sky-700 to-cyan-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 text-white/90 text-sm font-medium backdrop-blur-sm mb-6 animate-fadeIn">
            <Sparkles className="w-4 h-4" />
            News & Media
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 animate-fadeIn">
            Newsroom &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-400">
              Events
            </span>
          </h1>
          <p className="text-lg text-sky-100 leading-relaxed max-w-2xl mx-auto animate-fadeIn" style={{ animationDelay: "0.15s" }}>
            Stay updated with the latest news, events, and achievements from Sunshine School.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-secondary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-secondary-800 dark:text-white">Latest News</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Happenings at Sunshine School</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item, i) => (
              <div key={i} className="group p-6 rounded-2xl bg-gray-50 dark:bg-secondary-800 border border-gray-100 dark:border-gray-700 hover:border-sky-200 dark:hover:border-sky-800 shadow-sm hover:shadow-xl transition-all duration-300 animate-fadeIn" style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300">{item.category}</span>
                  <span className="text-xs text-gray-400">{item.date}</span>
                </div>
                <h3 className="text-lg font-semibold text-secondary-800 dark:text-white mb-3 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">{item.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">{item.excerpt}</p>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <User className="w-3 h-3" />
                  {item.author}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50/50 dark:bg-secondary-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-800 dark:text-white mb-4">Video Gallery</h2>
            <p className="text-gray-500 dark:text-gray-400">Watch our school in action</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {videos.map((v, i) => (
              <div key={i} className="group relative aspect-video rounded-2xl bg-gradient-to-br from-sky-100 to-sky-50 dark:from-sky-900/30 dark:to-sky-800/20 border border-sky-200 dark:border-sky-800/50 overflow-hidden cursor-pointer animate-fadeIn" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 text-sky-600 ml-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="text-white font-semibold text-sm">{v.title}</div>
                  <div className="text-white/70 text-xs">{v.duration}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-secondary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fadeInLeft">
              <h2 className="text-3xl sm:text-4xl font-bold text-secondary-800 dark:text-white mb-6 leading-tight">
                Stay{" "}
                <span className="text-sky-600 dark:text-sky-400">Connected</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                Follow us on social media for real-time updates, event coverage, and daily glimpses into life at Sunshine School. Subscribe to our newsletter for monthly digests.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Facebook", "Twitter", "Instagram", "YouTube", "LinkedIn"].map((s) => (
                  <a key={s} href="#" className="px-4 py-2 text-sm font-medium rounded-xl bg-gray-50 dark:bg-secondary-800 border border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-sky-50 dark:hover:bg-sky-900/20 hover:border-sky-200 hover:text-sky-600 transition-all">
                    {s}
                  </a>
                ))}
              </div>
            </div>
            <div className="animate-fadeInRight">
              <div className="p-8 rounded-2xl bg-gradient-to-br from-sky-50 to-sky-100/50 dark:from-sky-900/20 dark:to-sky-800/10 border border-sky-200 dark:border-sky-800/50">
                <h3 className="text-xl font-bold text-secondary-800 dark:text-white mb-3">Subscribe to Our Newsletter</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Get monthly updates on school events, achievements, and announcements.</p>
                <div className="flex gap-3">
                  <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-secondary-800 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent" />
                  <button className="px-5 py-3 text-sm font-semibold text-white bg-gradient-to-r from-sky-600 to-sky-700 rounded-xl hover:from-sky-700 hover:to-sky-800 transition-all">Subscribe</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
