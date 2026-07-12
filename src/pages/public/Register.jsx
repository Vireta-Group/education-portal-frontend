import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, User, Phone, Building, Globe, ArrowLeft, School, AlertCircle, Check, ChevronRight, ChevronLeft } from 'lucide-react';
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

const STEPS = [
  { title: 'School Info', fields: ['name_en', 'name_bn', 'school_type'] },
  { title: 'Contact', fields: ['email', 'phone'] },
  { title: 'Admin Account', fields: ['admin_name_en', 'admin_name_bn', 'admin_password'] },
];

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useSelector((state) => state.auth);
  const [step, setStep] = useState(0);

  const { register, handleSubmit, trigger, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/school-onboarding');
    }
  }, [token, navigate]);

  useEffect(() => {
    return () => { dispatch(clearAuthError()); };
  }, [dispatch]);

  const validateStep = async () => {
    const fields = STEPS[step].fields;
    const result = await trigger(fields);
    return result;
  };

  const handleNext = async () => {
    const valid = await validateStep();
    if (valid) setStep((prev) => Math.min(prev + 1, STEPS.length - 1));
  };

  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 0));

  const onSubmit = (data) => {
    dispatch(registerSchool(data));
  };

  const inputClass = "block w-full pl-11 pr-4 py-2.5 bg-white dark:bg-secondary-900 border border-gray-200 dark:border-gray-700 rounded-xl text-secondary-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all sm:text-sm";

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center gap-2 mb-8">
      {STEPS.map((s, i) => (
        <div key={i} className="flex items-center gap-2">
          <button type="button" disabled={loading} onClick={() => i < step && setStep(i)} className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${i === step ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 scale-110' : i < step ? 'bg-emerald-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'}`}>
            {i < step ? <Check className="w-4 h-4" /> : i + 1}
          </button>
          <span className={`text-xs font-medium hidden sm:block ${i === step ? 'text-indigo-600 dark:text-indigo-400' : i < step ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400 dark:text-gray-500'}`}>{s.title}</span>
          {i < STEPS.length - 1 && <div className={`w-8 h-0.5 ${i < step ? 'bg-emerald-400' : 'bg-gray-200 dark:bg-gray-700'}`} />}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-secondary-900 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <School className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="mt-2 text-center text-3xl font-extrabold text-secondary-800 dark:text-white tracking-tight">
          Register Your School
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
          Create your Sunshine School management account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg px-4 sm:px-0">
        <div className="bg-white dark:bg-secondary-800 py-8 px-4 shadow-sm sm:rounded-2xl sm:px-10 border border-gray-100 dark:border-gray-700">
          {renderStepIndicator()}

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 text-red-600 dark:text-red-400 p-4 rounded-xl flex items-start gap-3 text-sm">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Step 1: School Info */}
            {step === 0 && (
              <>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 pb-1 border-b border-gray-100 dark:border-gray-700">School Information</p>
                <div>
                  <label className="block text-sm font-medium text-secondary-800 dark:text-white">School Name (English) *</label>
                  <div className="mt-1.5 relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none"><Building className="h-5 w-5 text-gray-400 dark:text-gray-500" /></div>
                    <input {...register('name_en')} type="text" className={inputClass} placeholder="Sunshine School" />
                  </div>
                  {errors.name_en && <p className="mt-1 text-xs text-red-500">{errors.name_en.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-800 dark:text-white">School Name (Bengali) *</label>
                  <div className="mt-1.5 relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none"><Building className="h-5 w-5 text-gray-400 dark:text-gray-500" /></div>
                    <input {...register('name_bn')} type="text" className={inputClass} placeholder="সানশাইন স্কুল" />
                  </div>
                  {errors.name_bn && <p className="mt-1 text-xs text-red-500">{errors.name_bn.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-800 dark:text-white">School Type *</label>
                  <div className="mt-1.5 relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none"><Globe className="h-5 w-5 text-gray-400 dark:text-gray-500" /></div>
                    <select {...register('school_type')} className="block w-full pl-11 pr-4 py-2.5 bg-white dark:bg-secondary-900 border border-gray-200 dark:border-gray-700 rounded-xl text-secondary-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all sm:text-sm appearance-none">
                      <option value="" className="text-gray-400">Select type</option>
                      {SCHOOL_TYPES.map((t) => (
                        <option key={t.value} value={t.value} className="text-secondary-800 dark:text-white">{t.label}</option>
                      ))}
                    </select>
                  </div>
                  {errors.school_type && <p className="mt-1 text-xs text-red-500">{errors.school_type.message}</p>}
                </div>
              </>
            )}

            {/* Step 2: Contact */}
            {step === 1 && (
              <>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 pb-1 border-b border-gray-100 dark:border-gray-700">Contact Information</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary-800 dark:text-white">Email</label>
                    <div className="mt-1.5 relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none"><Mail className="h-5 w-5 text-gray-400 dark:text-gray-500" /></div>
                      <input {...register('email')} type="email" className={inputClass} placeholder="admin@school.com" />
                    </div>
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-800 dark:text-white">Phone *</label>
                    <div className="mt-1.5 relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none"><Phone className="h-5 w-5 text-gray-400 dark:text-gray-500" /></div>
                      <input {...register('phone')} type="tel" className={inputClass} placeholder="+8801XXXXXXXXX" />
                    </div>
                    {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
                  </div>
                </div>
              </>
            )}

            {/* Step 3: Admin Account */}
            {step === 2 && (
              <>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 pb-1 border-b border-gray-100 dark:border-gray-700">Admin Account</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary-800 dark:text-white">Admin Name (English) *</label>
                    <div className="mt-1.5 relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none"><User className="h-5 w-5 text-gray-400 dark:text-gray-500" /></div>
                      <input {...register('admin_name_en')} type="text" className={inputClass} placeholder="John Doe" />
                    </div>
                    {errors.admin_name_en && <p className="mt-1 text-xs text-red-500">{errors.admin_name_en.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-800 dark:text-white">Admin Name (Bengali) *</label>
                    <div className="mt-1.5 relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none"><User className="h-5 w-5 text-gray-400 dark:text-gray-500" /></div>
                      <input {...register('admin_name_bn')} type="text" className={inputClass} placeholder="জন ডো" />
                    </div>
                    {errors.admin_name_bn && <p className="mt-1 text-xs text-red-500">{errors.admin_name_bn.message}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-800 dark:text-white">Admin Password *</label>
                  <div className="mt-1.5 relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none"><Lock className="h-5 w-5 text-gray-400 dark:text-gray-500" /></div>
                    <input {...register('admin_password')} type="password" className={inputClass} placeholder="••••••••" />
                  </div>
                  {errors.admin_password && <p className="mt-1 text-xs text-red-500">{errors.admin_password.message}</p>}
                </div>
              </>
            )}

            {/* Navigation Buttons */}
            <div className={`pt-2 flex ${step === 0 ? 'justify-end' : 'justify-between'} gap-3`}>
              {step > 0 && (
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={loading}
                  className="flex items-center justify-center gap-2 py-3 px-5 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-secondary-900 hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all active:scale-[0.98] disabled:opacity-70"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>
              )}
              {step < STEPS.length - 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={loading}
                  className="flex items-center justify-center gap-2 py-3 px-6 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all active:scale-[0.98] disabled:opacity-70"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 py-3 px-6 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all active:scale-[0.98] disabled:opacity-70"
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
              )}
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
            <Link
              to="/login"
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-secondary-900 hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
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
