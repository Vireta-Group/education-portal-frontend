import { Image as ImageIcon, Video, Calendar } from "lucide-react";

const Newsroom = () => {
  return (
    <div className="w-full bg-slate-50">
      <div className="bg-indigo-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-white uppercase tracking-wider mb-4">Newsroom</h1>
          <p className="text-white/80 max-w-2xl mx-auto">Latest updates, events, and media from EduPro.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* News & Events Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
             <div key={item} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
               <div className="aspect-video bg-slate-200 w-full relative flex items-center justify-center">
                 <ImageIcon size={40} className="text-slate-400" />
               </div>
               <div className="p-6 flex flex-col flex-1">
                  <div className="text-xs font-bold text-indigo-600 mb-2 flex items-center gap-1 uppercase tracking-wider">
                   <Calendar size={14} /> {new Date().toLocaleDateString()}
                 </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Annual Science Fair {new Date().getFullYear()} Concludes Successfully</h3>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-3">Students from all grades showcased brilliant innovative projects addressing modern-day challenges at the annual exhibition.</p>
                  <button className="mt-auto text-indigo-600 font-semibold hover:text-sky-600 transition-colors self-start text-sm">Read Full Story</button>
               </div>
             </div>
          ))}
        </div>

        {/* Video Gallery */}
        <h2 className="text-2xl font-bold text-slate-900 mb-8 mt-20 pb-2 border-b-2 border-slate-200 flex items-center gap-2">
          <Video className="text-indigo-600" /> Promotional Videos
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
           <div className="aspect-video bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center cursor-pointer group">
              <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <div className="w-0 h-0 border-t-8 border-t-transparent border-l-[14px] border-l-white border-b-8 border-b-transparent ml-1" />
              </div>
           </div>
           <div className="aspect-video bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center cursor-pointer group">
              <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <div className="w-0 h-0 border-t-8 border-t-transparent border-l-[14px] border-l-white border-b-8 border-b-transparent ml-1" />
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Newsroom;
