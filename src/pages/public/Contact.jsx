import { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Send, Sparkles, ChevronRight } from "lucide-react";

const contactInfo = [
  { icon: MapPin, title: "Address", desc: "123 Sunshine Avenue,\nEducation District, City 560001" },
  { icon: Phone, title: "Phone", desc: "+91 98765 43210\n+91 98765 43211" },
  { icon: Mail, title: "Email", desc: "info@sunshineschool.edu\nadmissions@sunshineschool.edu" },
  { icon: Clock, title: "Office Hours", desc: "Mon - Fri: 8:00 AM - 3:00 PM\nSat: 8:00 AM - 12:00 PM" },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div>
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 via-cyan-700 to-teal-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 text-white/90 text-sm font-medium backdrop-blur-sm mb-6 animate-fadeIn">
            <Sparkles className="w-4 h-4" />
            Get in Touch
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 animate-fadeIn">
            Contact{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-400">
              Us
            </span>
          </h1>
          <p className="text-lg text-cyan-100 leading-relaxed max-w-2xl mx-auto animate-fadeIn" style={{ animationDelay: "0.15s" }}>
            We'd love to hear from you. Reach out with any questions, feedback, or inquiries.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-secondary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6 animate-fadeInLeft">
              {contactInfo.map((item, i) => (
                <div key={item.title} className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50 dark:bg-secondary-800 border border-gray-100 dark:border-gray-700 animate-fadeIn" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-700 flex items-center justify-center flex-shrink-0 shadow-lg shadow-cyan-500/20">
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary-800 dark:text-white mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 whitespace-pre-line">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="animate-fadeInRight">
              <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-gray-50 dark:bg-secondary-800 border border-gray-100 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-secondary-800 dark:text-white mb-6">Send us a Message</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary-800 dark:text-white mb-1.5">Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-secondary-900 text-sm text-secondary-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-secondary-800 dark:text-white mb-1.5">Email</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-secondary-900 text-sm text-secondary-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-800 dark:text-white mb-1.5">Phone</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-secondary-900 text-sm text-secondary-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-800 dark:text-white mb-1.5">Message</label>
                    <textarea name="message" value={formData.message} onChange={handleChange} rows="4" placeholder="Your message..." className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-secondary-900 text-sm text-secondary-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all resize-none" />
                  </div>
                  <button type="submit" className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-cyan-600 to-cyan-700 rounded-xl hover:from-cyan-700 hover:to-cyan-800 shadow-lg shadow-cyan-500/25 transition-all">
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50/50 dark:bg-secondary-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="aspect-[21/9] bg-gradient-to-br from-cyan-100 to-cyan-50 dark:from-cyan-900/30 dark:to-cyan-800/20 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-10 h-10 text-cyan-300 dark:text-cyan-600 mx-auto mb-2" />
                <p className="text-sm text-cyan-400 dark:text-cyan-500">Map will be displayed here</p>
                <p className="text-xs text-cyan-300 dark:text-cyan-700">123 Sunshine Avenue, Education District</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
