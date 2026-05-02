import { BookOpen, CheckCircle, Clock } from "lucide-react";

const AcademicLife = () => {
  return (
    <div className="w-full bg-white">
      <div className="bg-[#002157] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-white uppercase tracking-wider mb-4">Academic Life</h1>
          <p className="text-slate-300 max-w-2xl mx-auto">Rules, Code of Conduct, and daily academic procedures at GPHIS.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <section>
          <h2 className="text-3xl font-bold text-[#C82026] mb-8 pb-2 border-b-2 border-slate-100 flex items-center gap-3">
            <BookOpen className="text-[#002157]" /> Rules & Code of Conduct
          </h2>
          
          <div className="space-y-6">
            <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
              <h3 className="text-xl font-bold text-[#002157] mb-4 flex items-center gap-2"><Clock size={20} className="text-[#C82026]" /> Daily Attendance</h3>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start gap-2"><CheckCircle size={18} className="text-emerald-500 shrink-0 mt-0.5" /> Students must arrive at the school premises at least 15 minutes before the morning assembly.</li>
                <li className="flex items-start gap-2"><CheckCircle size={18} className="text-emerald-500 shrink-0 mt-0.5" /> A minimum of 80% attendance is mandatory for appearing in the final examinations.</li>
                <li className="flex items-start gap-2"><CheckCircle size={18} className="text-emerald-500 shrink-0 mt-0.5" /> Leave applications must be submitted in advance, signed by the parents/guardians.</li>
              </ul>
            </div>

            <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
              <h3 className="text-xl font-bold text-[#002157] mb-4">Uniform & Grooming</h3>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start gap-2"><CheckCircle size={18} className="text-emerald-500 shrink-0 mt-0.5" /> Students must wear the prescribed school uniform at all times.</li>
                <li className="flex items-start gap-2"><CheckCircle size={18} className="text-emerald-500 shrink-0 mt-0.5" /> Hair must be neatly trimmed (for boys) and appropriately tied (for girls).</li>
                <li className="flex items-start gap-2"><CheckCircle size={18} className="text-emerald-500 shrink-0 mt-0.5" /> Wearing ID cards is compulsory while on the school campus.</li>
              </ul>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
              <h3 className="text-xl font-bold text-[#002157] mb-4">Discipline</h3>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start gap-2"><CheckCircle size={18} className="text-emerald-500 shrink-0 mt-0.5" /> Utmost respect must be shown to teachers, staff, and fellow students.</li>
                <li className="flex items-start gap-2"><CheckCircle size={18} className="text-emerald-500 shrink-0 mt-0.5" /> Use of mobile phones, smartwatches, or other unauthorized electronic devices is strictly prohibited inside the classroom.</li>
                <li className="flex items-start gap-2"><CheckCircle size={18} className="text-emerald-500 shrink-0 mt-0.5" /> Property damage will incur strict disciplinary action and fine recovery.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AcademicLife;
