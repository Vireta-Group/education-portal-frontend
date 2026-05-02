import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contact = () => {
  return (
    <div className="w-full bg-white">
      <div className="bg-[#002157] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-white uppercase tracking-wider mb-4">Contact Us</h1>
          <p className="text-slate-300 max-w-2xl mx-auto">We'd love to hear from you. Get in touch with our administration office.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          
          {/* Contact Information & Map */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-[#002157] mb-6 border-b-2 border-slate-100 pb-4">Our Campus</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-indigo-50 text-[#002157] rounded-full flex items-center justify-center shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">Address</h3>
                  <p className="text-slate-600">Swimming Pool Road<br/>Munshiganj, Bangladesh</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-50 text-[#C82026] rounded-full flex items-center justify-center shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">Phone Numbers</h3>
                  <p className="text-slate-600">02 9977-32951<br/>01712-345678</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-sky-50 text-sky-600 rounded-full flex items-center justify-center shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">Email Support</h3>
                  <p className="text-slate-600">info@gphis.edu.bd</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">Office Hours</h3>
                  <p className="text-slate-600">Saturday to Thursday<br/>8:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>

            <div className="w-full h-64 bg-slate-200 rounded-xl overflow-hidden mt-8 border border-slate-200 flex items-center justify-center relative">
               <span className="text-slate-500 font-bold z-10 bg-white/80 px-4 py-2 rounded shadow-sm">Google Map Embedded Here</span>
               <div className="absolute inset-0 bg-[url('https://maps.gstatic.com/tactile/basemap/roadmap_x2.png')] opacity-30 bg-cover bg-center" />
            </div>
          </div>

          {/* Enquiry Form */}
          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 shadow-sm">
             <h2 className="text-2xl font-bold text-[#002157] mb-6">Send an Enquiry</h2>
             <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Sent!"); }}>
               <div>
                 <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name *</label>
                 <input type="text" className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#002157]" required />
               </div>
               <div>
                 <label className="block text-sm font-semibold text-slate-700 mb-1">Email Address</label>
                 <input type="email" className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#002157]" />
               </div>
               <div>
                 <label className="block text-sm font-semibold text-slate-700 mb-1">Phone Number *</label>
                 <input type="tel" className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#002157]" required />
               </div>
               <div>
                 <label className="block text-sm font-semibold text-slate-700 mb-1">Subject *</label>
                 <select className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#002157]" required>
                   <option value="">Select Topic</option>
                   <option value="admission">Admission Inquiry</option>
                   <option value="career">Career Opportunity</option>
                   <option value="general">General Information</option>
                 </select>
               </div>
               <div>
                 <label className="block text-sm font-semibold text-slate-700 mb-1">Message *</label>
                 <textarea rows={4} className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#002157] resize-none" required></textarea>
               </div>
               <button type="submit" className="w-full bg-[#C82026] hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg uppercase tracking-wide transition-colors mt-4">
                 Submit Enquiry
               </button>
             </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
