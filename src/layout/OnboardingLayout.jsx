import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { BookOpen, Check } from 'lucide-react';

const STEPS = [
  { label: 'School Info', path: '/onboarding/step-1' },
  { label: 'Academic Calendar', path: '/onboarding/step-2' },
  { label: 'Address & Principal', path: '/onboarding/step-3' },
  { label: 'Branding & Notifications', path: '/onboarding/step-4' },
];

const OnboardingLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentIndex = STEPS.findIndex((s) => location.pathname === s.path);

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <div className="absolute inset-0 bg-[url('https://patterns.dev/img/topography.svg')] opacity-10 pointer-events-none"></div>
      <div className="absolute top-20 right-20 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-[120px] opacity-30 animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-[140px] opacity-20 animate-pulse animation-delay-2000 pointer-events-none"></div>

      <div className="relative z-10 flex-1 flex flex-col max-w-3xl mx-auto w-full px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-tr from-emerald-600 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg shrink-0">
            <BookOpen className="text-white w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">School Setup</h1>
            <p className="text-xs text-slate-400">Complete all steps to finish setup</p>
          </div>
        </div>

        <div className="flex items-center gap-0 mb-8 bg-slate-800/40 rounded-2xl p-1.5 border border-slate-700/30">
          {STEPS.map((step, i) => {
            const isActive = i === currentIndex;
            const isPast = i < currentIndex;
            const isClickable = i <= currentIndex;
            return (
              <button
                key={step.path}
                onClick={() => isClickable && navigate(step.path)}
                disabled={!isClickable}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-2 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-500/20 text-indigo-300 shadow-sm'
                    : isPast
                    ? 'text-emerald-400'
                    : 'text-slate-500 cursor-not-allowed'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  isPast
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : isActive
                    ? 'bg-indigo-500 text-white'
                    : 'bg-slate-700 text-slate-500'
                }`}>
                  {isPast ? <Check className="w-3 h-3" /> : i + 1}
                </span>
                <span className="hidden sm:inline">{step.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default OnboardingLayout;
