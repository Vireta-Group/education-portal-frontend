import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Building, Globe, Mail, Phone, Hash, BookOpen, Calendar, BadgeInfo, Link, Image, ArrowRight, AlertCircle } from 'lucide-react';
import { saveStep1 } from '../../store/slices/onboardingSlice';
import { toast } from 'sonner';

const SCHOOL_TYPES = [
  { value: 'Primary', label: 'Primary' },
  { value: 'High School', label: 'High School' },
  { value: 'College', label: 'College' },
  { value: 'Madrasa', label: 'Madrasa' },
  { value: 'Kindergarten', label: 'Kindergarten' },
];

const step1Schema = z.object({
  name_en: z.string().min(1, 'School name (English) is required').max(200),
  name_bn: z.string().min(1, 'School name (Bengali) is required').max(200),
  school_type: z.string().min(1, 'School type is required'),
  name_short: z.string().max(50).optional().or(z.literal('')),
  eiin_number: z.string().max(20).optional().or(z.literal('')),
  board_affiliation: z.string().max(100).optional().or(z.literal('')),
  mpo_status: z.boolean().optional(),
  mpo_index: z.string().max(50).optional().or(z.literal('')),
  established_year: z.preprocess(
    (v) => (v === '' || v === undefined || v === null ? undefined : Number(v)),
    z.number().int().min(1800).max(2100).optional()
  ),
  tin_number: z.string().max(30).optional().or(z.literal('')),
  email: z.string().max(200).email('Invalid email').optional().or(z.literal('')),
  phone_primary: z.string().min(1, 'Primary phone is required').max(20),
  phone_secondary: z.string().max(20).optional().or(z.literal('')),
  whatsapp_number: z.string().max(20).optional().or(z.literal('')),
  website_url: z.string().max(200).optional().or(z.literal('')),
  logo_url: z.string().max(200).optional().or(z.literal('')),
});

const inputClass = 'block w-full bg-slate-900/50 border border-slate-700 rounded-xl py-2.5 px-4 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all sm:text-sm';
const inputErrorClass = 'block w-full bg-slate-900/50 border border-red-500 rounded-xl py-2.5 px-4 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all sm:text-sm';
const labelClass = 'block text-sm font-medium text-slate-300 mb-1.5';

const Field = ({ label, icon: Icon, field, type = 'text', placeholder, error, required, className, register }) => (
  <div className={className}>
    <label className={labelClass}>{label} {required && <span className="text-red-400">*</span>}</label>
    <div className="relative">
      {Icon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500"><Icon className="h-4 w-4" /></div>}
      <input {...register(field)} type={type} placeholder={placeholder}
        className={error ? `${inputErrorClass} ${Icon ? 'pl-10' : ''}` : `${inputClass} ${Icon ? 'pl-10' : ''}`}
      />
    </div>
    {error && <p className="mt-1 text-xs text-red-400">{error.message}</p>}
  </div>
);

const Step1 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((s) => s.onboarding);
  const [mpoEnabled, setMpoEnabled] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(step1Schema),
    defaultValues: { mpo_status: false },
  });

  const onSubmit = async (data) => {
    const payload = { ...data };
    if (!payload.name_short) payload.name_short = null;
    if (!payload.eiin_number) payload.eiin_number = null;
    if (!payload.board_affiliation) payload.board_affiliation = null;
    if (!payload.mpo_index) payload.mpo_index = null;
    if (payload.established_year === undefined) payload.established_year = null;
    if (!payload.tin_number) payload.tin_number = null;
    if (!payload.email) payload.email = null;
    if (!payload.phone_secondary) payload.phone_secondary = null;
    if (!payload.whatsapp_number) payload.whatsapp_number = null;
    if (!payload.website_url) payload.website_url = null;
    if (!payload.logo_url) payload.logo_url = null;

    const result = await dispatch(saveStep1(payload));
    if (saveStep1.fulfilled.match(result)) {
      toast.success('School info saved!');
      navigate('/onboarding/step-2');
    }
  };

  return (
    <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-700/30">
        <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center">
          <Building className="w-5 h-5 text-indigo-400" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">School Basic Info</h2>
          <p className="text-xs text-slate-400">Step 1 of 4 — Fill in your school details</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl flex items-start gap-3 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 pb-1 border-b border-slate-700/50">School Identity</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="School Name (English)" icon={Building} field="name_en" placeholder="EduPro Academy" error={errors.name_en} required register={register} />
          <Field label="School Name (Bengali)" icon={Building} field="name_bn" placeholder="এডুপ্রো অ্যাকাডেমি" error={errors.name_bn} required register={register} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Short Name" icon={Hash} field="name_short" placeholder="EPA" error={errors.name_short} register={register} />
          <div>
            <label className={labelClass}>School Type *</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500"><Globe className="h-4 w-4" /></div>
              <select {...register('school_type')} className={`block w-full pl-10 bg-slate-900/50 border ${errors.school_type ? 'border-red-500' : 'border-slate-700'} rounded-xl py-2.5 text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all sm:text-sm appearance-none`}>
                <option value="" className="text-slate-500">Select type</option>
                {SCHOOL_TYPES.map((t) => (
                  <option key={t.value} value={t.value} className="text-slate-200">{t.label}</option>
                ))}
              </select>
            </div>
            {errors.school_type && <p className="mt-1 text-xs text-red-400">{errors.school_type.message}</p>}
          </div>
        </div>

        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 pb-1 pt-2 border-b border-slate-700/50">Affiliations & Registration</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field label="EIIN Number" icon={Hash} field="eiin_number" placeholder="123456" error={errors.eiin_number} register={register} />
          <Field label="Board Affiliation" icon={BookOpen} field="board_affiliation" placeholder="Dhaka Board" error={errors.board_affiliation} register={register} />
          <Field label="Est. Year" icon={Calendar} field="established_year" type="number" placeholder="1990" error={errors.established_year} register={register} />
        </div>

        <div className="bg-slate-900/30 rounded-xl p-4 border border-slate-700/30">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" {...register('mpo_status')} onChange={(e) => setMpoEnabled(e.target.checked)}
              className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-0"
            />
            <span className="text-sm font-medium text-slate-300">MPO Status</span>
          </label>
          <div className={`mt-3 transition-all ${mpoEnabled ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
            <Field label="MPO Index" icon={Hash} field="mpo_index" placeholder="MPO-001" error={errors.mpo_index} register={register} />
          </div>
        </div>

        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 pb-1 pt-2 border-b border-slate-700/50">Contact & Online</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Primary Phone" icon={Phone} field="phone_primary" placeholder="+8801XXXXXXXXX" error={errors.phone_primary} required register={register} />
          <Field label="Secondary Phone" icon={Phone} field="phone_secondary" placeholder="+8801XXXXXXXXX" error={errors.phone_secondary} register={register} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Email" icon={Mail} field="email" type="email" placeholder="admin@school.com" error={errors.email} register={register} />
          <Field label="WhatsApp Number" icon={Phone} field="whatsapp_number" placeholder="+8801XXXXXXXXX" error={errors.whatsapp_number} register={register} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Website URL" icon={Link} field="website_url" placeholder="https://school.edu" error={errors.website_url} register={register} />
          <Field label="Logo URL" icon={Image} field="logo_url" placeholder="https://..." error={errors.logo_url} register={register} />
        </div>
        <Field label="TIN Number" icon={BadgeInfo} field="tin_number" placeholder="TIN-XXXXX" error={errors.tin_number} register={register} />

        <div className="pt-4 flex justify-end">
          <button type="submit" disabled={loading}
            className="flex items-center gap-2 py-3 px-6 border border-transparent rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.2)] text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-emerald-500 transition-all active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100"
          >
            {loading ? (
              <span className="flex items-center gap-2"><span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> Saving...</span>
            ) : (
              <span className="flex items-center gap-2">Save & Next <ArrowRight className="w-4 h-4" /></span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step1;
