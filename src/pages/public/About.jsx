import { Link } from "react-router-dom";
import { Target, Eye, Heart, ArrowRight, Quote, BookOpen, Users, Award, Sparkles } from "lucide-react";

const milestones = [
  { year: "2000", title: "Foundation", desc: "Sunshine School established with 120 students" },
  { year: "2005", title: "Recognition", desc: "Affiliated with CBSE curriculum" },
  { year: "2010", title: "Expansion", desc: "New campus with modern facilities inaugurated" },
  { year: "2015", title: "Excellence", desc: "Ranked among top schools in the region" },
  { year: "2020", title: "Innovation", desc: "Digital classrooms & smart learning initiative" },
  { year: "2025", title: "Legacy", desc: "2,000+ students, 98% pass percentage" },
];

export default function About() {
  return (
    <div>
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-violet-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 text-white/90 text-sm font-medium backdrop-blur-sm mb-6 animate-fadeIn">
            <Sparkles className="w-4 h-4" />
            Our Story
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 animate-fadeIn">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-400">
              Sunshine School
            </span>
          </h1>
          <p className="text-lg text-primary-100 leading-relaxed max-w-2xl mx-auto animate-fadeIn" style={{ animationDelay: "0.15s" }}>
            For over two decades, we've been dedicated to providing quality education that nurtures young minds and builds character.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-secondary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="animate-fadeInLeft">
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900/30 dark:to-primary-800/20 border border-primary-200 dark:border-primary-800/50 flex items-center justify-center">
                  <BookOpen className="w-16 h-16 text-primary-300 dark:text-primary-600" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl -z-10 blur-sm opacity-30" />
              </div>
            </div>
            <div className="animate-fadeInRight">
              <h2 className="text-3xl sm:text-4xl font-bold text-secondary-800 dark:text-white mb-6 leading-tight">
                Our Journey of{" "}
                <span className="text-primary-600 dark:text-primary-400">Excellence</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                Sunshine School was founded in the year 2000 with a vision to create a learning environment that goes beyond textbooks. What started with 120 students has grown into a thriving community of over 2,000 students, supported by a dedicated faculty of 50+ experienced educators.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                Our commitment to academic excellence, combined with a strong focus on character development and co-curricular activities, has made us one of the most respected educational institutions in the region.
              </p>
              <div className="flex flex-wrap gap-3">
                {["CBSE Affiliated", "ISO Certified", "Green Campus", "Digital Classrooms"].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 text-xs font-medium rounded-lg bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800/50">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Target, title: "Our Mission", desc: "To provide holistic education that develops intellectual curiosity, creative thinking, and strong moral values in every student." },
              { icon: Eye, title: "Our Vision", desc: "To be a beacon of educational excellence, nurturing responsible global citizens who contribute meaningfully to society." },
              { icon: Heart, title: "Our Values", desc: "Integrity, respect, compassion, perseverance, and excellence form the foundation of everything we do." },
            ].map((item, i) => (
              <div key={item.title} className="p-8 rounded-2xl bg-gray-50 dark:bg-secondary-800 border border-gray-100 dark:border-gray-700 animate-fadeIn" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center mb-5 shadow-lg shadow-primary-500/20">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-secondary-800 dark:text-white mb-3">{item.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50/50 dark:bg-secondary-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-800 dark:text-white mb-4">Our Journey</h2>
            <p className="text-gray-500 dark:text-gray-400">Key milestones that shaped Sunshine School</p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary-500 via-primary-300 to-transparent hidden md:block" />
            <div className="space-y-12">
              {milestones.map((m, i) => (
                <div key={m.year} className={`relative flex items-center gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className={`hidden md:block flex-1 ${i % 2 === 0 ? "text-right" : "text-left"}`}>
                    <div className="animate-fadeIn" style={{ animationDelay: `${i * 0.1}s` }}>
                      <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">{m.year}</div>
                      <h3 className="text-lg font-semibold text-secondary-800 dark:text-white mt-1">{m.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{m.desc}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex w-10 h-10 rounded-full bg-white dark:bg-secondary-800 border-4 border-primary-500 shadow-lg shadow-primary-500/20 items-center justify-center flex-shrink-0 z-10">
                    <div className="w-3 h-3 rounded-full bg-primary-500" />
                  </div>
                  <div className="md:hidden flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-secondary-800 border border-gray-100 dark:border-gray-700 animate-fadeIn">
                    <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                      <div className="w-3 h-3 rounded-full bg-primary-500" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-primary-600 dark:text-primary-400">{m.year}</div>
                      <h3 className="font-semibold text-secondary-800 dark:text-white">{m.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{m.desc}</p>
                    </div>
                  </div>
                  <div className={`hidden md:block flex-1 ${i % 2 === 0 ? "text-left" : "text-right"}`}>
                    <div className="animate-fadeIn" style={{ animationDelay: `${i * 0.1 + 0.1}s` }}>
                      {i % 2 === 0 ? (
                        <p className="text-sm text-gray-500 dark:text-gray-400">{m.desc}</p>
                      ) : (
                        <>
                          <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">{m.year}</div>
                          <h3 className="text-lg font-semibold text-secondary-800 dark:text-white mt-1">{m.title}</h3>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-secondary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fadeInLeft">
              <h2 className="text-3xl sm:text-4xl font-bold text-secondary-800 dark:text-white mb-6 leading-tight">
                Message from the{" "}
                <span className="text-primary-600 dark:text-primary-400">Director</span>
              </h2>
              <div className="relative">
                <Quote className="w-10 h-10 text-primary-200 dark:text-primary-800 mb-4" />
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed italic mb-6">
                  "At Sunshine School, we believe every child is a unique gift with immense potential. Our mission is to create an environment where students not only excel academically but also develop into compassionate, confident, and responsible individuals ready to make a positive impact on the world."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-xl font-bold">
                    SD
                  </div>
                  <div>
                    <div className="font-semibold text-secondary-800 dark:text-white">Dr. Sunita Devi</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Director, Sunshine School</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="animate-fadeInRight">
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900/30 dark:to-primary-800/20 border border-primary-200 dark:border-primary-800/50 flex items-center justify-center">
                <Users className="w-16 h-16 text-primary-300 dark:text-primary-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-primary-700 to-violet-800" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Join Our Community</h2>
          <p className="text-primary-100 text-lg mb-8">Experience the Sunshine difference. Admissions open for the academic year 2025-26.</p>
          <Link to="/public/admission" className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-primary-700 bg-white rounded-2xl hover:bg-primary-50 shadow-xl transition-all">
            Apply Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
