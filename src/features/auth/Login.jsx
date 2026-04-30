import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, ArrowRight, AlertCircle, BookOpen } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate network request for UI polish
    setTimeout(() => {
      setIsLoading(false);
      // Demo authentication check
      if (email === "admin@example.com" && password === "12345") {
        localStorage.setItem("isAuthenticated", "true");
        navigate("/dashboard");
      } else {
        setError("Invalid email or password. Hint: admin@example.com / 12345");
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-[url('https://patterns.dev/img/topography.svg')] opacity-10"></div>
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-sky-500 rounded-full mix-blend-multiply filter blur-[120px] opacity-30 animate-pulse animation-delay-2000"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-tr from-indigo-600 to-sky-500 rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(79,70,229,0.4)]">
            <BookOpen className="text-white w-8 h-8" />
          </div>
        </div>
        <h2 className="mt-2 text-center text-3xl font-extrabold text-white tracking-tight">
          Welcome back
        </h2>
        <p className="mt-2 text-center text-sm text-slate-400">
          Sign in to your EduPro administrative account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0">
        <div className="bg-slate-800/60 backdrop-blur-xl py-8 px-4 shadow-2xl sm:rounded-2xl sm:px-10 border border-slate-700/50">
          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl flex items-start gap-3 text-sm animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{error}</span>
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                  Email address
                </label>
                <div className="mt-1.5 relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors group-focus-within:text-indigo-400 text-slate-500">
                    <Mail className="h-5 w-5" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 bg-slate-900/50 border border-slate-700 rounded-xl py-2.5 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all sm:text-sm"
                    placeholder="admin@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                  Password
                </label>
                <div className="mt-1.5 relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors group-focus-within:text-indigo-400 text-slate-500">
                    <Lock className="h-5 w-5" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 bg-slate-900/50 border border-slate-700 rounded-xl py-2.5 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all sm:text-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 bg-slate-900 border-slate-600 rounded focus:ring-indigo-500 focus:ring-offset-slate-800"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-300">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.2)] text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-indigo-500 transition-all active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  "Sign in"
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-700/50">
             <Link
              to="/register"
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-slate-600 rounded-xl text-sm font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-indigo-500 transition-all"
            >
              Apply for Access <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
