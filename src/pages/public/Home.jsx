
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Trophy, Globe } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-50 pt-20 pb-32">
        <div className="absolute inset-0 bg-[url('https://patterns.dev/img/topography.svg')] opacity-5" />
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" />
        <div className="absolute top-32 -left-32 w-96 h-96 bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-medium mb-8">
            <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse"></span>
            Admissions Open for {new Date().getFullYear()} - {new Date().getFullYear() + 1}
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6 max-w-4xl">
            Where Excellence Meets <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-500">Opportunity</span>
          </h1>
          
          <p className="text-xl text-slate-600 mb-10 max-w-2xl leading-relaxed">
             EduPro provides a world-class academic environment nurturing innovation, critical thinking, and character development in every student.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="#admissions" className="px-8 py-4 bg-indigo-600 text-white rounded-full font-semibold text-lg hover:bg-indigo-700 shadow-lg hover:shadow-indigo-500/30 transition-all flex items-center justify-center gap-2">
              Apply Now <ArrowRight size={20} />
            </Link>
            <Link to="#about" className="px-8 py-4 bg-white text-slate-700 rounded-full font-semibold text-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all flex items-center justify-center">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16 border-y border-slate-100">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
               <div className="text-center">
                 <div className="text-4xl md:text-5xl font-extrabold text-indigo-600 mb-2">15+</div>
                 <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">Years of Excellence</div>
               </div>
               <div className="text-center border-l md:border-l-0 lg:border-l border-slate-100">
                 <div className="text-4xl md:text-5xl font-extrabold text-indigo-600 mb-2">2,500+</div>
                 <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">Students Enrolled</div>
               </div>
               <div className="text-center md:border-l border-slate-100">
                 <div className="text-4xl md:text-5xl font-extrabold text-indigo-600 mb-2">150+</div>
                 <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">Expert Teachers</div>
               </div>
               <div className="text-center border-l md:border-l-0 lg:border-l border-slate-100">
                 <div className="text-4xl md:text-5xl font-extrabold text-indigo-600 mb-2">100%</div>
                 <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">Passing Rate</div>
               </div>
            </div>
         </div>
      </section>

      {/* Why Choose Us */}
      <section id="about" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-4">Why Choose EduPro?</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">We provide a holistic educational experience that prepares students for the challenges of tomorrow.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
             <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
               <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 mb-6">
                 <BookOpen size={24} />
               </div>
               <h3 className="text-xl font-bold text-slate-900 mb-3">Modern Curriculum</h3>
               <p className="text-slate-600">Our dynamic curriculum is continuously updated to meet global standards and focuses on practical learning.</p>
             </div>
             
             <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
               <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center text-sky-600 mb-6">
                 <Globe size={24} />
               </div>
               <h3 className="text-xl font-bold text-slate-900 mb-3">Global Perspective</h3>
               <p className="text-slate-600">We nurture a global mindset through multicultural environments and international exchange programs.</p>
             </div>

             <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
               <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-6">
                 <Trophy size={24} />
               </div>
               <h3 className="text-xl font-bold text-slate-900 mb-3">Holistic Development</h3>
               <p className="text-slate-600">Beyond academics, we focus on sports, arts, and character building to ensure well-rounded development.</p>
             </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://patterns.dev/img/topography.svg')]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl mb-6">Ready to shape your child's future?</h2>
          <p className="text-xl text-indigo-200 mb-10">Join the EduPro community today and embark on a journey of academic excellence.</p>
          <Link to="#admissions" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-900 rounded-full font-semibold text-lg hover:bg-indigo-50 shadow-lg transition-all">
            Start Admission Process
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
