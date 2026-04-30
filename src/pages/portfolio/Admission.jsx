import { User, FileText, CalendarCheck, HelpCircle } from "lucide-react";

const Admission = () => {
  return (
    <div className="w-full bg-slate-50">
      <div className="bg-[#C82026] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-white uppercase tracking-wider mb-4">Admission</h1>
          <p className="text-white/80 max-w-2xl mx-auto">Join our community. Learn about admission procedures, requirements, and circulars.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* Principal's Message */}
        <div className="flex flex-col md:flex-row-reverse gap-12 items-center bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <div className="w-full md:w-1/3">
            <div className="aspect-square bg-slate-200 rounded-xl overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <User size={64} className="text-slate-400" />
              </div>
            </div>
            <div className="mt-4 text-center text-slate-800 font-bold text-lg">Brig. Gen. Khandaker Farhad Hossain (Retd)</div>
            <div className="text-center text-[#C82026] font-semibold text-sm uppercase tracking-wider">Principal</div>
          </div>
          <div className="w-full md:w-2/3">
             <h2 className="text-3xl font-bold text-[#002157] mb-6">Principal's Message</h2>
             <div className="text-slate-600 space-y-4 leading-relaxed">
               <p>It is my distinct pleasure to welcome prospective students and parents to GPH International School. We pride ourselves on offering a curriculum that is rigorous, balanced, and tailored to meet the needs of every individual student.</p>
               <p>Our admissions process is designed to identify students who will not only benefit from our academic programs but who will also contribute actively to our vibrant school community. We look forward to receiving your application.</p>
             </div>
          </div>
        </div>

        {/* Admission Information Blocks */}
        <div className="grid md:grid-cols-3 gap-8">
           <div className="bg-white p-8 border border-slate-200 rounded-xl hover:border-[#002157] hover:shadow-lg transition-all cursor-pointer group">
             <FileText size={40} className="text-[#002157] mb-4 group-hover:scale-110 transition-transform" />
             <h3 className="text-xl font-bold text-slate-900 mb-2">Admission Circular</h3>
             <p className="text-slate-600 text-sm">Download the latest admission circulars for the upcoming academic session.</p>
           </div>
           
           <div className="bg-white p-8 border border-slate-200 rounded-xl hover:border-[#C82026] hover:shadow-lg transition-all cursor-pointer group">
             <CalendarCheck size={40} className="text-[#C82026] mb-4 group-hover:scale-110 transition-transform" />
             <h3 className="text-xl font-bold text-slate-900 mb-2">Procedure & Dates</h3>
             <p className="text-slate-600 text-sm">View the step-by-step admission procedure and important deadlines.</p>
           </div>
           
           <div className="bg-white p-8 border border-slate-200 rounded-xl hover:border-[#002157] hover:shadow-lg transition-all cursor-pointer group">
             <HelpCircle size={40} className="text-[#002157] mb-4 group-hover:scale-110 transition-transform" />
             <h3 className="text-xl font-bold text-slate-900 mb-2">Admission FAQ</h3>
             <p className="text-slate-600 text-sm">Find answers to frequently asked questions regarding age limits, fees, and more.</p>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Admission;
