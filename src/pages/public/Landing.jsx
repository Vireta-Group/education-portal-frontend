import { Link } from 'react-router-dom';
import { BookOpen, Users, Award, ArrowRight } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">EPS</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-800">EduPro School</h1>
          </div>
          <div className="flex gap-4">
            <Link to="/login" className="px-4 py-2 text-indigo-600 font-medium hover:bg-slate-50 rounded-lg transition-colors">
              Log in
            </Link>
            <Link to="/register" className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
              Register
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center text-center">
          <h2 className="text-5xl font-extrabold text-slate-900 tracking-tight sm:text-6xl mb-6">
            Empowering the Next Generation of <span className="text-indigo-600">Leaders</span>
          </h2>
          <p className="mt-4 text-xl text-slate-600 max-w-3xl mb-10">
            A comprehensive, modern school management system designed to connect students, teachers, and administrators in one unified platform.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/register" className="px-8 py-4 bg-indigo-600 text-white text-lg font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg flex items-center gap-2">
              Get Started <ArrowRight size={20} />
            </Link>
          </div>

          {/* Features Grid */}
          <div className="mt-24 grid grid-cols-1 gap-8 sm:grid-cols-3 w-full">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                <BookOpen size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Academic Excellence</h3>
              <p className="text-slate-600">Streamline curriculum management, grading, and coursework with our intuitive academic tools.</p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
                <Users size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Community Hub</h3>
              <p className="text-slate-600">Foster collaboration between parents, teachers, and students through unified communication.</p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Award size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Achievement Tracking</h3>
              <p className="text-slate-600">Monitor student progress with comprehensive analytics and detailed performance reports.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-400 text-sm">
            &copy; {new Date().getFullYear()} EduPro School Management. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
