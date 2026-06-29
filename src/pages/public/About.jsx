import { User, BookOpen, Target } from "lucide-react";

const About = () => {
  return (
    <div className="w-full bg-slate-50">
      <div className="bg-indigo-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-white uppercase tracking-wider mb-4">About Us</h1>
          <p className="text-slate-300 max-w-2xl mx-auto">Discover our history, mission, and the vision that drives excellence at EduPro School.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">

        <div className="flex flex-col md:flex-row gap-12 items-center bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <div className="w-full md:w-1/3">
            <div className="aspect-square bg-slate-200 rounded-xl overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <User size={64} className="text-slate-400" />
              </div>
            </div>
            <div className="mt-4 text-center text-slate-800 font-bold text-xl">School Director</div>
            <div className="text-center text-indigo-600 font-semibold text-sm uppercase tracking-wider">Director</div>
          </div>
          <div className="w-full md:w-2/3">
             <h2 className="text-3xl font-bold text-indigo-600 mb-6">Director's Message</h2>
             <div className="text-slate-600 space-y-4 leading-relaxed">
               <p>Welcome to EduPro School. We are committed to building a generation of learners who will be capable of meeting the global challenges of tomorrow. Our curriculum integrates modern pedagogical techniques with strong moral values.</p>
               <p>Education is not just about academic excellence; it is about character building, critical thinking, and social responsibility. Here at EduPro, we focus on unleashing the true potential of every child in a safe, nurturing, and highly equipped environment.</p>
             </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8">
           <div className="bg-white p-10 border-t-4 border-indigo-600 shadow-md rounded-b-xl flex flex-col items-center text-center">
             <Target size={48} className="text-indigo-600 mb-6" />
             <h3 className="text-2xl font-bold text-slate-900 mb-4 uppercase">Our Mission</h3>
             <p className="text-slate-600">To inspire students to achieve their highest academic and personal potential by engaging them in challenging and supportive learning experiences.</p>
           </div>
           <div className="bg-white p-10 border-t-4 border-sky-500 shadow-md rounded-b-xl flex flex-col items-center text-center">
             <BookOpen size={48} className="text-sky-500 mb-6" />
             <h3 className="text-2xl font-bold text-slate-900 mb-4 uppercase">Our Vision</h3>
             <p className="text-slate-600">To be a premier institution recognized globally for academic excellence, innovation in education, and shaping responsible global citizens.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default About;
