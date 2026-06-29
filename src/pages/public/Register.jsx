import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, User, Phone, Building, Globe, ArrowLeft, BookOpen, AlertCircle, Check } from 'lucide-react';
import { registerSchool, clearAuthError } from '../../store/slices/authSlice';

const SCHOOL_TYPES = [
  { value: 'school', label: 'School' },
  { value: 'college', label: 'College' },
  { value: 'university', label: 'University' },
  { value: 'madrasa', label: 'Madrasa' },
  { value: 'kindergarten', label: 'Kindergarten' },
];

const registerSchema = z.object({
  name_en: z.string().min(1, 'School name (English) is required').max(200),
  name_bn: z.string().min(1, 'School name (Bengali) is required').max(200),
  school_type: z.string().min(1, 'School type is required').max(50),
  email: z.string().max(254).email('Invalid email').optional().or(z.literal('')),
  phone: z.string().min(1, 'Phone is required').max(30),
  admin_name_en: z.string().min(1, 'Admin name (English) is required').max(200),
  admin_name_bn: z.string().min(1, 'Admin name (Bengali) is required').max(200),
  admin_password: z.string().min(1, 'Password is required'),
});

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useSelector((state) => state.auth);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/dashboard');
    }
  }, [token, navigate]);

  useEffect(() => {
    return () => { dispatch(clearAuthError()); };
  }, [dispatch]);

  const onSubmit = (data) => {
    dispatch(registerSchool(data));
  };

  const inputClass = 'block w-full pl-10 bg-slate-900/50 border border-slate-700 rounded-xl py-2.5 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all sm:text-sm';
  const inputErrorClass = 'block w-full pl-10 bg-slate-900/50 border border-red-500 rounded-xl py-2.5 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all sm:text-sm';
  const labelClass = 'block text-sm font-medium text-slate-300';
  const iconClass = 'absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors group-focus-within:text-indigo-400 text-slate-500';

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://patterns.dev/img/topography.svg')] opacity-10"></div>
      <div className="absolute top-10 right-10 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-emerald-500 rounded-full mix-blend-multiply filter blur-[120px] opacity-30 animate-pulse animation-delay-2000"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-lg relative z-10">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-tr from-emerald-600 to-indigo-500 rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.4)]">
            <BookOpen className="text-white w-8 h-8" />
          </div>
        </div>
        <h2 className="mt-2 text-center text-3xl font-extrabold text-white tracking-tight">
          Register Your School
        </h2>
        <p className="mt-2 text-center text-sm text-slate-400">
          Create your EduPro school management account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg relative z-10 px-4 sm:px-0">
        <div className="bg-slate-800/60 backdrop-blur-xl py-8 px-4 shadow-2xl sm:rounded-2xl sm:px-10 border border-slate-700/50">
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl flex items-start gap-3 text-sm">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 pb-1 border-b border-slate-700/50">School Information</p>

            <div>
              <label className={labelClass}>School Name (English) *</label>
              <div className="mt-1.5 relative group">
                <div className={iconClass}><Building className="h-5 w-5" /></div>
                <input {...register('name_en')} type="text" className={errors.name_en ? inputErrorClass : inputClass} placeholder="EduPro Academy" />
              </div>
              {errors.name_en && <p className="mt-1 text-xs text-red-400">{errors.name_en.message}</p>}
            </div>

            <div>
              <label className={labelClass}>School Name (Bengali) *</label>
              <div className="mt-1.5 relative group">
                <div className={iconClass}><Building className="h-5 w-5" /></div>
                <input {...register('name_bn')} type="text" className={errors.name_bn ? inputErrorClass : inputClass} placeholder="এডুপ্রো অ্যাকাডেমি" />
              </div>
              {errors.name_bn && <p className="mt-1 text-xs text-red-400">{errors.name_bn.message}</p>}
            </div>

            <div>
              <label className={labelClass}>School Type *</label>
              <div className="mt-1.5 relative group">
                <div className={iconClass}><Globe className="h-5 w-5" /></div>
                <select {...register('school_type')} className={`block w-full pl-10 bg-slate-900/50 border ${errors.school_type ? 'border-red-500' : 'border-slate-700'} rounded-xl py-2.5 text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all sm:text-sm appearance-none`}>
                  <option value="" className="text-slate-500">Select type</option>
                  {SCHOOL_TYPES.map((t) => (
                    <option key={t.value} value={t.value} className="text-slate-200">{t.label}</option>
                  ))}
                </select>
              </div>
              {errors.school_type && <p className="mt-1 text-xs text-red-400">{errors.school_type.message}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Email</label>
                <div className="mt-1.5 relative group">
                  <div className={iconClass}><Mail className="h-5 w-5" /></div>
                  <input {...register('email')} type="email" className={errors.email ? inputErrorClass : inputClass} placeholder="admin@school.com" />
                </div>
                {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
              </div>
              <div>
                <label className={labelClass}>Phone *</label>
                <div className="mt-1.5 relative group">
                  <div className={iconClass}><Phone className="h-5 w-5" /></div>
                  <input {...register('phone')} type="tel" className={errors.phone ? inputErrorClass : inputClass} placeholder="+8801XXXXXXXXX" />
                </div>
                {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone.message}</p>}
              </div>
            </div>

            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 pb-1 pt-2 border-b border-slate-700/50">Admin Account</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Admin Name (English) *</label>
                <div className="mt-1.5 relative group">
                  <div className={iconClass}><User className="h-5 w-5" /></div>
                  <input {...register('admin_name_en')} type="text" className={errors.admin_name_en ? inputErrorClass : inputClass} placeholder="John Doe" />
                </div>
                {errors.admin_name_en && <p className="mt-1 text-xs text-red-400">{errors.admin_name_en.message}</p>}
              </div>
              <div>
                <label className={labelClass}>Admin Name (Bengali) *</label>
                <div className="mt-1.5 relative group">
                  <div className={iconClass}><User className="h-5 w-5" /></div>
                  <input {...register('admin_name_bn')} type="text" className={errors.admin_name_bn ? inputErrorClass : inputClass} placeholder="জন ডো" />
                </div>
                {errors.admin_name_bn && <p className="mt-1 text-xs text-red-400">{errors.admin_name_bn.message}</p>}
              </div>
            </div>

            <div>
              <label className={labelClass}>Admin Password *</label>
              <div className="mt-1.5 relative group">
                <div className={iconClass}><Lock className="h-5 w-5" /></div>
                <input {...register('admin_password')} type="password" className={errors.admin_password ? inputErrorClass : inputClass} placeholder="••••••••" />
              </div>
              {errors.admin_password && <p className="mt-1 text-xs text-red-400">{errors.admin_password.message}</p>}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.2)] text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-emerald-500 transition-all active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Registering...
                  </span>
                ) : (
                  <span className="flex items-center gap-2"><Check className="w-5 h-5" /> Register School</span>
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-700/50">
            <Link
              to="/login"
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-slate-600 rounded-xl text-sm font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-indigo-500 transition-all"
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
