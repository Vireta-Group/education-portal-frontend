import { Link } from "react-router-dom";
import { BookOpen, Calendar, Clock, Award, Shield, Users, GraduationCap, CheckCircle, ArrowRight, Sparkles } from "lucide-react";

const sections = [
  {
    icon: Shield,
    title: "Code of Conduct",
    items: [
      "Students must wear proper uniform to school every day",
      "Maintain discipline and respect towards teachers and staff",
      "Regular attendance is mandatory — minimum 75% required for exams",
      "Use of mobile phones during school hours is prohibited",
      "Bullying, misconduct, or indiscipline will result in strict action",
      "Library books must be returned within the stipulated time",
    ],
  },
  {
    icon: BookOpen,
    title: "Academic Guidelines",
    items: [
      "Follow the prescribed CBSE curriculum and syllabus",
      "Complete homework and assignments on time",
      "Participate in periodic assessments and term exams",
      "Parent-teacher meetings are mandatory every term",
      "Maintain separate notebooks for each subject",
      "Practical sessions are compulsory for science subjects",
    ],
  },
  {
    icon: Calendar,
    title: "Daily Schedule",
    items: [
      "School starts at 8:00 AM — gates close at 7:45 AM",
      "Morning assembly from 8:00 AM to 8:15 AM",
      "Academic periods: 8:15 AM to 1:30 PM",
      "Lunch break: 1:30 PM to 2:00 PM",
      "Co-curricular activities: 2:00 PM to 3:00 PM",
      "School dispersal: 3:00 PM",
    ],
  },
  {
    icon: Clock,
    title: "Attendance Policy",
    items: [
      "75% attendance is compulsory for annual examinations",
      "Leave applications must be submitted in advance",
      "Medical certificate required for sick leave beyond 3 days",
      "Late arrival will be marked as half-day attendance",
      "Attendance is tracked through the student portal",
      "Irregular attendance may lead to detention",
    ],
  },
];

export default function AcademicLife() {
  return (
    <div>
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 text-white/90 text-sm font-medium backdrop-blur-sm mb-6 animate-fadeIn">
            <BookOpen className="w-4 h-4" />
            Academics & Life
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 animate-fadeIn">
            Academic Life &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-400">
              Code of Conduct
            </span>
          </h1>
          <p className="text-lg text-emerald-100 leading-relaxed max-w-2xl mx-auto animate-fadeIn" style={{ animationDelay: "0.15s" }}>
            Our academic framework is designed to foster discipline, curiosity, and a lifelong love for learning in a structured environment.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-secondary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-6">
            {sections.map((section, i) => (
              <div key={section.title} className="p-8 rounded-2xl bg-gray-50 dark:bg-secondary-800 border border-gray-100 dark:border-gray-700 animate-fadeIn" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                    <section.icon className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-secondary-800 dark:text-white">{section.title}</h2>
                </div>
                <ul className="space-y-3">
                  {section.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50/50 dark:bg-secondary-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-800 dark:text-white mb-4">Academic Highlights</h2>
            <p className="text-gray-500 dark:text-gray-400">Excellence through rigorous academics and holistic development</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: GraduationCap, value: "98%", label: "Pass Percentage" },
              { icon: Award, value: "50+", label: "Qualified Teachers" },
              { icon: Users, value: "15:1", label: "Student-Teacher Ratio" },
              { icon: BookOpen, value: "10,000+", label: "Library Resources" },
            ].map((item, i) => (
              <div key={item.label} className="text-center p-6 rounded-2xl bg-white dark:bg-secondary-800 border border-gray-100 dark:border-gray-700 animate-fadeIn" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/20">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-secondary-800 dark:text-white">{item.value}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{item.label}</div>
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
                Discipline &{" "}
                <span className="text-emerald-600 dark:text-emerald-400">Values</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                At Sunshine School, discipline is not about rules — it's about building character, responsibility, and respect for oneself and others. Our comprehensive code of conduct ensures a safe, productive, and harmonious learning environment for every student.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Zero tolerance for bullying and harassment",
                  "Reward system for exemplary conduct",
                  "Regular counseling and mentorship programs",
                  "Parental involvement in student development",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="animate-fadeInRight">
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-50 dark:from-emerald-900/30 dark:to-emerald-800/20 border border-emerald-200 dark:border-emerald-800/50 flex items-center justify-center">
                <Shield className="w-16 h-16 text-emerald-300 dark:text-emerald-600" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
