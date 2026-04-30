import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, User, ArrowLeft, BookOpen, Building } from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    schoolName: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/login");
    }, 1000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://patterns.dev/img/topography.svg')] opacity-10"></div>
      <div className="absolute top-10 right-10 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-emerald-500 rounded-full mix-blend-multiply filter blur-[120px] opacity-30 animate-pulse animation-delay-2000"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-tr from-emerald-600 to-indigo-500 rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.4)]">
            <BookOpen className="text-white w-8 h-8" />
          </div>
        </div>
        <h2 className="mt-2 text-center text-3xl font-extrabold text-white tracking-tight">
          Apply for Access
        </h2>
        <p className="mt-2 text-center text-sm text-slate-400">
          Set up your organization administrative account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0">
        <div className="bg-slate-800/60 backdrop-blur-xl py-8 px-4 shadow-2xl sm:rounded-2xl sm:px-10 border border-slate-700/50">
          <form className="space-y-5" onSubmit={handleRegister}>
            <div>
              <label className="block text-sm font-medium text-slate-300">Full Name</label>
              <div className="mt-1.5 relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors group-focus-within:text-emerald-400 text-slate-500">
                  <User className="h-5 w-5" />
                </div>
                <input
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full pl-10 bg-slate-900/50 border border-slate-700 rounded-xl py-2.5 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all sm:text-sm"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300">School / Organization Name</label>
              <div className="mt-1.5 relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors group-focus-within:text-emerald-400 text-slate-500">
                  <Building className="h-5 w-5" />
                </div>
                <input
                  name="schoolName"
                  type="text"
                  required
                  value={formData.schoolName}
                  onChange={handleChange}
                  className="block w-full pl-10 bg-slate-900/50 border border-slate-700 rounded-xl py-2.5 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all sm:text-sm"
                  placeholder="EduPro Academy"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300">Email Address</label>
              <div className="mt-1.5 relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors group-focus-within:text-emerald-400 text-slate-500">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-10 bg-slate-900/50 border border-slate-700 rounded-xl py-2.5 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all sm:text-sm"
                  placeholder="admin@school.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300">Secure Password</label>
              <div className="mt-1.5 relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors group-focus-within:text-emerald-400 text-slate-500">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-10 bg-slate-900/50 border border-slate-700 rounded-xl py-2.5 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.2)] text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-emerald-500 transition-all active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Registering...
                  </span>
                ) : (
                  "Create Account"
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-700/50">
             <Link
              to="/login"
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-slate-600 rounded-xl text-sm font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 transition-all"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
