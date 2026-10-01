import { useState } from "react";
import { Link } from "react-router-dom";
import { FileText, ClipboardList, ClipboardCheck, CreditCard, ChevronDown, ChevronUp, Quote, ArrowRight, Sparkles, Users, Calendar, Download } from "lucide-react";

const steps = [
  { icon: ClipboardList, title: "Submit Application", desc: "Fill out the online application form with student details." },
  { icon: FileText, title: "Document Verification", desc: "Submit required documents for verification." },
  { icon: ClipboardCheck, title: "Assessment & Interaction", desc: "Student assessment & parent-teacher interaction." },
  { icon: CreditCard, title: "Fee Payment", desc: "Confirm admission by paying the required fee." },
];

const faqs = [
  { q: "What is the age criteria for admission?", a: "For Nursery: 3+ years, KG: 4+ years, Class 1: 5+ years as of March 31st of the academic year." },
  { q: "What documents are required for admission?", a: "Birth certificate, previous report card (if applicable), transfer certificate, passport-size photographs, and address proof." },
  { q: "Is there an entrance exam?", a: "For classes Nursery to KG, there is a simple interaction. For Class 1 and above, there's a basic assessment in English, Math, and Science." },
  { q: "What is the fee structure?", a: "Fee varies by grade. Please contact the school office or download the fee structure from our circulars." },
  { q: "Does the school provide transportation?", a: "Yes, we have a fleet of school buses covering major routes in and around the city." },
];

export default function Admission() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div>
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-violet-700 to-purple-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 text-white/90 text-sm font-medium backdrop-blur-sm mb-6 animate-fadeIn">
            <Sparkles className="w-4 h-4" />
            Admissions Open 2025-26
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 animate-fadeIn">
            Admissions{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-400">
              Open
            </span>
          </h1>
          <p className="text-lg text-violet-100 leading-relaxed max-w-2xl mx-auto animate-fadeIn" style={{ animationDelay: "0.15s" }}>
            Begin your child's journey at Sunshine School. We welcome applications for Nursery through Class XII.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-secondary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-800 dark:text-white mb-4">Admission Process</h2>
            <p className="text-gray-500 dark:text-gray-400">Simple and transparent process to join the Sunshine family</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={step.title} className="relative p-6 rounded-2xl bg-gray-50 dark:bg-secondary-800 border border-gray-100 dark:border-gray-700 animate-fadeIn" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center text-white text-sm font-bold shadow-lg">
                  {i + 1}
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center mb-4 shadow-lg shadow-violet-500/20">
                  <step.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-secondary-800 dark:text-white mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50/50 dark:bg-secondary-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fadeInLeft">
              <h2 className="text-3xl sm:text-4xl font-bold text-secondary-800 dark:text-white mb-6 leading-tight">
                Message from the{" "}
                <span className="text-violet-600 dark:text-violet-400">Principal</span>
              </h2>
              <Quote className="w-10 h-10 text-violet-200 dark:text-violet-800 mb-4" />
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed italic mb-6">
                "Choosing the right school is one of the most important decisions for any parent. At Sunshine School, we offer not just academic excellence but a nurturing environment where your child will grow, discover their passions, and build character that lasts a lifetime."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center text-white text-xl font-bold">
                  AK
                </div>
                <div>
                  <div className="font-semibold text-secondary-800 dark:text-white">Mr. Anil Kumar</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Principal, Sunshine School</div>
                </div>
              </div>
            </div>
            <div className="animate-fadeInRight">
              <div className="bg-white dark:bg-secondary-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm">
                <h3 className="text-xl font-bold text-secondary-800 dark:text-white mb-6">Download Resources</h3>
                <div className="space-y-4">
                  {[
                    { icon: FileText, title: "Admission Form 2025-26", desc: "PDF format" },
                    { icon: Calendar, title: "Academic Calendar", desc: "Important dates & events" },
                    { icon: Download, title: "Fee Structure", desc: "Grade-wise breakdown" },
                  ].map((r) => (
                    <div key={r.title} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-secondary-700 border border-gray-100 dark:border-gray-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 cursor-pointer transition-colors">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center">
                        <r.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-secondary-800 dark:text-white">{r.title}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{r.desc}</div>
                      </div>
                      <Download className="w-4 h-4 text-violet-500" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-secondary-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-800 dark:text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-500 dark:text-gray-400">Find answers to common queries about admissions</p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-2xl bg-gray-50 dark:bg-secondary-800 border border-gray-100 dark:border-gray-700 overflow-hidden animate-fadeIn" style={{ animationDelay: `${i * 0.05}s` }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="text-sm font-semibold text-secondary-800 dark:text-white pr-4">{faq.q}</span>
                  {openFaq === i ? <ChevronUp className="w-4 h-4 text-violet-500 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-violet-700 to-purple-800" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Apply?</h2>
          <p className="text-violet-100 text-lg mb-8">Start your child's admission process today. Limited seats available for the 2025-26 session.</p>
          <Link to="/register" className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-violet-700 bg-white rounded-2xl hover:bg-violet-50 shadow-xl transition-all">
            Apply Online <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
