import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Palette, Image, Type, Code, Bell, Smartphone, Mail, MessageSquare, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { saveStep4 } from '../../store/slices/onboardingSlice';
import { toast } from 'sonner';

const step4Schema = z.object({
  primary_color: z.string().max(7).optional().or(z.literal('')),
  secondary_color: z.string().max(7).optional().or(z.literal('')),
  accent_color: z.string().max(7).optional().or(z.literal('')),
  logo_primary_url: z.string().max(200).optional().or(z.literal('')),
  logo_landscape_url: z.string().max(200).optional().or(z.literal('')),
  logo_dark_url: z.string().max(200).optional().or(z.literal('')),
  favicon_url: z.string().max(200).optional().or(z.literal('')),
  font_family: z.string().max(100).optional().or(z.literal('')),
  custom_css: z.string().optional().or(z.literal('')),
  sms: z.boolean().optional(),
  email: z.boolean().optional(),
  push: z.boolean().optional(),
  whatsapp: z.boolean().optional(),
});

const inputClass = 'block w-full bg-slate-900/50 border border-slate-700 rounded-xl py-2.5 px-4 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all sm:text-sm';
const labelClass = 'block text-sm font-medium text-slate-300 mb-1.5';

const ColorInput = ({ label, field, register }) => (
  <div>
    <label className={labelClass}>{label}</label>
    <div className="flex gap-2">
      <input {...register(field)} type="color" className="w-10 h-10 rounded-lg border border-slate-700 bg-slate-900 cursor-pointer p-0.5 shrink-0" />
      <input {...register(field)} type="text" placeholder="#000000" className={`flex-1 ${inputClass}`} />
    </div>
  </div>
);

const Step4 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((s) => s.onboarding);

  const { register, handleSubmit } = useForm({
    resolver: zodResolver(step4Schema),
    defaultValues: { sms: false, email: false, push: false, whatsapp: false },
  });

  const onSubmit = (data) => {
    const payload = {
      primary_color: data.primary_color || null,
      secondary_color: data.secondary_color || null,
      accent_color: data.accent_color || null,
      logo_primary_url: data.logo_primary_url || null,
      logo_landscape_url: data.logo_landscape_url || null,
      logo_dark_url: data.logo_dark_url || null,
      favicon_url: data.favicon_url || null,
      font_family: data.font_family || null,
      custom_css: data.custom_css || null,
      notifications: {
        sms: data.sms || false,
        email: data.email || false,
        push: data.push || false,
        whatsapp: data.whatsapp || false,
      },
    };

    dispatch(saveStep4(payload)).then((result) => {
      if (saveStep4.fulfilled.match(result)) {
        toast.success('Setup complete! Welcome to EduPro.');
        navigate('/dashboard');
      }
    });
  };

  return (
    <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-700/30">
        <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center">
          <Palette className="w-5 h-5 text-indigo-400" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">Notification & Branding</h2>
          <p className="text-xs text-slate-400">Step 4 of 4 — Final touches for your school</p>
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
          <Palette className="w-3 h-3 inline mr-1" /> Branding Colors
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ColorInput label="Primary Color" field="primary_color" register={register} />
          <ColorInput label="Secondary Color" field="secondary_color" register={register} />
          <ColorInput label="Accent Color" field="accent_color" register={register} />
        </div>

        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 pb-1 pt-2 border-b border-slate-700/50">
          <Image className="w-3 h-3 inline mr-1" /> Logos & Favicon
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Primary Logo URL</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500"><Image className="h-4 w-4" /></div>
              <input {...register('logo_primary_url')} type="text" placeholder="https://..." className={`pl-10 ${inputClass}`} />
            </div>
          </div>
          <div>
            <label className={labelClass}>Landscape Logo URL</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500"><Image className="h-4 w-4" /></div>
              <input {...register('logo_landscape_url')} type="text" placeholder="https://..." className={`pl-10 ${inputClass}`} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Dark Logo URL</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500"><Image className="h-4 w-4" /></div>
              <input {...register('logo_dark_url')} type="text" placeholder="https://..." className={`pl-10 ${inputClass}`} />
            </div>
          </div>
          <div>
            <label className={labelClass}>Favicon URL</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500"><Image className="h-4 w-4" /></div>
              <input {...register('favicon_url')} type="text" placeholder="https://..." className={`pl-10 ${inputClass}`} />
            </div>
          </div>
        </div>

        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 pb-1 pt-2 border-b border-slate-700/50">
          <Type className="w-3 h-3 inline mr-1" /> Typography & Custom
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Font Family</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500"><Type className="h-4 w-4" /></div>
              <input {...register('font_family')} type="text" placeholder="Inter, sans-serif" className={`pl-10 ${inputClass}`} />
            </div>
          </div>
          <div>
            <label className={labelClass}>Custom CSS</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500"><Code className="h-4 w-4" /></div>
              <input {...register('custom_css')} type="text" placeholder=".custom-class { ... }" className={`pl-10 ${inputClass}`} />
            </div>
          </div>
        </div>

        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 pb-1 pt-2 border-b border-slate-700/50">
          <Bell className="w-3 h-3 inline mr-1" /> Notification Channels
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { field: 'sms', icon: Smartphone, label: 'SMS' },
            { field: 'email', icon: Mail, label: 'Email' },
            { field: 'push', icon: Bell, label: 'Push' },
            { field: 'whatsapp', icon: MessageSquare, label: 'WhatsApp' },
          ].map(({ field, icon: Icon, label }) => (
            <label key={field} className="flex items-center gap-3 p-3 bg-slate-900/30 border border-slate-700/50 rounded-xl cursor-pointer hover:border-indigo-500/30 transition-all">
              <input type="checkbox" {...register(field)} className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-0" />
              <Icon className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-300">{label}</span>
            </label>
          ))}
        </div>

        <div className="pt-4 flex items-center justify-between">
          <button type="button" onClick={() => navigate('/onboarding/step-3')}
            className="flex items-center gap-2 py-3 px-6 border border-slate-600 rounded-xl text-sm font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <button type="submit" disabled={loading}
            className="flex items-center gap-2 py-3 px-6 border border-transparent rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.2)] text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-emerald-500 transition-all active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100"
          >
            {loading ? (
              <span className="flex items-center gap-2"><span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> Finalizing...</span>
            ) : (
              <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Complete Setup</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step4;
