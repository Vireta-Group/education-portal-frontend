import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { MapPin, User, Phone, Mail, BookOpen, ArrowLeft, ArrowRight, AlertCircle, Globe } from 'lucide-react';
import { saveStep3 } from '../../store/slices/onboardingSlice';
import { toast } from 'sonner';

const step3Schema = z.object({
  division: z.string().max(100).optional().or(z.literal('')),
  district: z.string().max(100).optional().or(z.literal('')),
  upazila: z.string().max(100).optional().or(z.literal('')),
  village_area: z.string().max(500).optional().or(z.literal('')),
  google_map_url: z.string().max(500).optional().or(z.literal('')),
  principal_name_en: z.string().max(200).optional().or(z.literal('')),
  principal_name_bn: z.string().max(200).optional().or(z.literal('')),
  principal_designation: z.string().max(100).optional().or(z.literal('')),
  principal_mobile: z.string().max(20).optional().or(z.literal('')),
  principal_email: z.string().max(200).email('Invalid email').optional().or(z.literal('')),
});

const inputClass = 'block w-full bg-slate-900/50 border border-slate-700 rounded-xl py-2.5 px-4 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all sm:text-sm';
const labelClass = 'block text-sm font-medium text-slate-300 mb-1.5';

const Field = ({ label, icon: Icon, field, type = 'text', placeholder, register }) => (
  <div>
    <label className={labelClass}>{label}</label>
    <div className="relative">
      {Icon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500"><Icon className="h-4 w-4" /></div>}
      <input {...register(field)} type={type} placeholder={placeholder}
        className={`${inputClass} ${Icon ? 'pl-10' : ''}`}
      />
    </div>
  </div>
);

const Step3 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((s) => s.onboarding);

  const { register, handleSubmit } = useForm({
    resolver: zodResolver(step3Schema),
  });

  const onSubmit = (data) => {
    const payload = {
      address: {
        division: data.division || null,
        district: data.district || null,
        upazila: data.upazila || null,
        village_area: data.village_area || null,
        google_map_url: data.google_map_url || null,
      },
      principal: {
        name_en: data.principal_name_en || null,
        name_bn: data.principal_name_bn || null,
        designation: data.principal_designation || null,
        mobile: data.principal_mobile || null,
        email: data.principal_email || null,
      },
    };

    dispatch(saveStep3(payload)).then((result) => {
      if (saveStep3.fulfilled.match(result)) {
        toast.success('Address & Principal info saved!');
        navigate('/onboarding/step-4');
      }
    });
  };

  return (
    <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-700/30">
        <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center">
          <MapPin className="w-5 h-5 text-indigo-400" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">Address & Principal Info</h2>
          <p className="text-xs text-slate-400">Step 3 of 4 — School location and head details</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl flex items-start gap-3 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 pb-1 border-b border-slate-700/50">
          <MapPin className="w-3 h-3 inline mr-1" /> School Address
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field label="Division" icon={Globe} field="division" placeholder="Dhaka" register={register} />
          <Field label="District" icon={MapPin} field="district" placeholder="Dhaka" register={register} />
          <Field label="Upazila" icon={MapPin} field="upazila" placeholder="Savar" register={register} />
        </div>
        <Field label="Village / Area" icon={MapPin} field="village_area" placeholder="Hemayetpur, Savar" register={register} />
        <Field label="Google Map URL" icon={Globe} field="google_map_url" placeholder="https://maps.google.com/..." register={register} />

        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 pb-1 pt-2 border-b border-slate-700/50">
          <User className="w-3 h-3 inline mr-1" /> Principal / Head of School
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Name (English)" icon={User} field="principal_name_en" placeholder="Dr. John Doe" register={register} />
          <Field label="Name (Bengali)" icon={User} field="principal_name_bn" placeholder="ড. জন ডো" register={register} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field label="Designation" icon={BookOpen} field="principal_designation" placeholder="Principal" register={register} />
          <Field label="Mobile" icon={Phone} field="principal_mobile" placeholder="+8801XXXXXXXXX" register={register} />
          <Field label="Email" icon={Mail} field="principal_email" type="email" placeholder="principal@school.com" register={register} />
        </div>

        <div className="pt-4 flex items-center justify-between">
          <button type="button" onClick={() => navigate('/onboarding/step-2')}
            className="flex items-center gap-2 py-3 px-6 border border-slate-600 rounded-xl text-sm font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
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

export default Step3;
