import { Palette, Trophy, Music, Users } from "lucide-react";

const CoCurricular = () => {
  return (
    <div className="w-full bg-white">
      <div className="bg-[#002157] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-white uppercase tracking-wider mb-4">Co-Curricular</h1>
          <p className="text-slate-300 max-w-2xl mx-auto">Exploring talents beyond the classroom through sports, arts, and clubs.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 flex flex-col items-center text-center">
             <Trophy size={48} className="text-[#C82026] mb-4" />
             <h3 className="font-bold text-slate-900 text-lg">Sports & Athletics</h3>
             <p className="text-slate-500 text-sm mt-2">Football, Cricket, Basketball, and Track events fostering teamwork.</p>
          </div>
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 flex flex-col items-center text-center">
             <Palette size={48} className="text-[#002157] mb-4" />
             <h3 className="font-bold text-slate-900 text-lg">Arts & Crafts</h3>
             <p className="text-slate-500 text-sm mt-2">Creative expression through painting, sculpture, and digital art.</p>
          </div>
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 flex flex-col items-center text-center">
             <Music size={48} className="text-[#C82026] mb-4" />
             <h3 className="font-bold text-slate-900 text-lg">Music & Culture</h3>
             <p className="text-slate-500 text-sm mt-2">Choir, instrumental bands, and cultural dance performances.</p>
          </div>
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 flex flex-col items-center text-center">
             <Users size={48} className="text-[#002157] mb-4" />
             <h3 className="font-bold text-slate-900 text-lg">Clubs & Societies</h3>
             <p className="text-slate-500 text-sm mt-2">Debate club, Science club, Robotics, and Language societies.</p>
          </div>
        </div>
        
        {/* Gallery Placeholder */}
        <h2 className="text-3xl font-bold text-[#002157] mb-8 text-center uppercase tracking-wide">Activity Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
           {[1, 2, 3, 4, 5, 6].map((i) => (
             <div key={i} className="aspect-video bg-slate-200 rounded-lg overflow-hidden relative group">
                <div className="absolute inset-0 bg-[#002157]/20 group-hover:bg-transparent transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
                  <span className="text-white font-bold">View Activity</span>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default CoCurricular;
