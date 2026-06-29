import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { BookOpen, LogIn, Menu, X } from 'lucide-react';

const PublicLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'About Us', to: '/public/about' },
    { label: 'Academics', to: '/public/academic-life' },
    { label: 'Co-Curricular', to: '/public/co-curricular' },
    { label: 'Admissions', to: '/public/admission' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/public" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                 <BookOpen className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">EduPro</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <Link to="/login" className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-indigo-600 transition-colors px-2 py-1">
                <LogIn size={18} /> Staff / Student Portal
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-600 hover:text-slate-900 p-2"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white">
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors py-2"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors py-2 border-t border-slate-100 pt-4 mt-2"
              >
                <LogIn size={16} className="inline mr-2" />Staff / Student Portal
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
             <div className="col-span-1 md:col-span-2">
               <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                     <BookOpen className="text-white w-5 h-5" />
                  </div>
                  <span className="text-xl font-bold text-slate-100">EduPro</span>
               </div>
               <p className="text-sm max-w-sm">Empowering the next generation of global leaders through innovative education, character building, and academic excellence.</p>
             </div>
             <div>
               <h3 className="text-slate-100 font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/public/about" className="hover:text-indigo-400 transition-colors">About Us</Link></li>
                  <li><Link to="/public/academic-life" className="hover:text-indigo-400 transition-colors">Academics</Link></li>
                  <li><Link to="/public/admission" className="hover:text-indigo-400 transition-colors">Admissions</Link></li>
                </ul>
             </div>
             <div>
               <h3 className="text-slate-100 font-semibold mb-4">Contact</h3>
               <ul className="space-y-2 text-sm">
                 <li>123 Education Lane</li>
                 <li>Cityville, State 12345</li>
                 <li>info@edupro.school</li>
                 <li>(555) 123-4567</li>
               </ul>
             </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-800 text-sm text-center">
            <p>&copy; {new Date().getFullYear()} EduPro School Management. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
