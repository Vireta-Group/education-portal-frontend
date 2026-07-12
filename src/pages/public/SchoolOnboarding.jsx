import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { School, ChevronRight, ChevronLeft, Check, Building, Globe, Calendar, Mail, Phone, MapPin, User, Palette, Bell, Image, Clock, BookOpen, Hash, Monitor, CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';
import { saveSetupStep, fetchSetupStatus, clearSetupError } from '../../store/slices/setupSlice';

const SCHOOL_TYPES = ['Primary', 'Secondary', 'Higher Secondary', 'Madrasa', 'Kindergarten'];
const BOARDS = ['Dhaka', 'Rajshahi', 'Comilla', 'Jessore', 'Chittagong', 'Barisal', 'Sylhet', 'Dinajpur', 'Mymensingh'];
const DIVISIONS = ['Dhaka', 'Chittagong', 'Rajshahi', 'Khulna', 'Barisal', 'Sylhet', 'Rangpur', 'Mymensingh'];
const LANGUAGES = ['Bengali', 'English', 'Arabic'];
const TIMEZONES = ['Asia/Dhaka', 'Asia/Kolkata', 'UTC'];
const DATE_FORMATS = ['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD'];
const CURRENCIES = ['BDT', 'USD', 'INR'];
const DAYS = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

const STEPS = [
  { title: 'School Details', subtitle: 'Basic information about your institution' },
  { title: 'Academic Setup', subtitle: 'Configure academic year and preferences' },
  { title: 'Address & Principal', subtitle: 'Location and leadership details' },
  { title: 'Branding & Notifications', subtitle: 'Customize your school portal' },
];

const SchoolOnboarding = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.setup);
  const { token } = useSelector((state) => state.auth);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name_en: '', name_bn: '', name_short: '', school_type: '', eiin_number: '', board_affiliation: '', mpo_status: false, mpo_index: '', established_year: '', tin_number: '',
    email: '', phone_primary: '', phone_secondary: '', whatsapp_number: '', website_url: '', logo_url: '',
    academic_year_start: '', default_language: '', timezone: '', date_format: '', currency: '', working_days: [], holidays: '',
    division: '', district: '', upazila: '', village_area: '', google_map_url: '',
    principal_name_en: '', principal_name_bn: '', principal_designation: '', principal_mobile: '', principal_email: '',
    primary_color: '#4F46E5', secondary_color: '#0F172A', accent_color: '#10B981', logo_primary_url: '', logo_landscape_url: '', logo_dark_url: '', favicon_url: '', font_family: 'Inter', custom_css: '',
    sms: true, email: true, push: true, whatsapp: true,
  });
  const [submitted, setSubmitted] = useState(false);
  const [stepError, setStepError] = useState('');

  useEffect(() => {
    if (!token) { navigate('/login'); return; }
    dispatch(fetchSetupStatus());
  }, [token, navigate, dispatch]);

  useEffect(() => {
    if (error) setStepError(error);
  }, [error]);

  useEffect(() => {
    setStepError('');
    dispatch(clearSetupError());
  }, [step, dispatch]);

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const toggleDay = (day) => {
    setForm((prev) => ({
      ...prev,
      working_days: prev.working_days.includes(day) ? prev.working_days.filter((d) => d !== day) : [...prev.working_days, day],
    }));
  };

  const validateStep = () => {
    if (step === 0) {
      if (!form.name_en || !form.name_bn || !form.school_type) { setStepError('Name (EN/BN) and School Type are required'); return false; }
    }
    if (step === 2) {
      if (!form.principal_name_en) { setStepError('Principal name (English) is required'); return false; }
    }
    return true;
  };

  const buildStepPayload = (stepIdx) => {
    const apiStep = stepIdx + 1;
    if (apiStep === 1) {
      return {
        name_en: form.name_en, name_bn: form.name_bn, name_short: form.name_short, school_type: form.school_type,
        eiin_number: form.eiin_number, board_affiliation: form.board_affiliation, mpo_status: form.mpo_status,
        mpo_index: form.mpo_index, established_year: Number(form.established_year) || 0, tin_number: form.tin_number,
        email: form.email, phone_primary: form.phone_primary, phone_secondary: form.phone_secondary,
        whatsapp_number: form.whatsapp_number, website_url: form.website_url, logo_url: form.logo_url,
      };
    }
    if (apiStep === 2) {
      return {
        academic_year_start: Number(form.academic_year_start) || 0, default_language: form.default_language,
        timezone: form.timezone, date_format: form.date_format, currency: form.currency,
        working_days: form.working_days, holidays: form.holidays ? form.holidays.split(',').map((h) => h.trim()).filter(Boolean) : [],
      };
    }
    if (apiStep === 3) {
      return {
        address: { division: form.division, district: form.district, upazila: form.upazila, village_area: form.village_area, google_map_url: form.google_map_url },
        principal: { name_en: form.principal_name_en, name_bn: form.principal_name_bn, designation: form.principal_designation, mobile: form.principal_mobile, email: form.principal_email },
      };
    }
    return {
      primary_color: form.primary_color, secondary_color: form.secondary_color, accent_color: form.accent_color,
      logo_primary_url: form.logo_primary_url, logo_landscape_url: form.logo_landscape_url, logo_dark_url: form.logo_dark_url,
      favicon_url: form.favicon_url, font_family: form.font_family, custom_css: form.custom_css,
      notifications: { sms: form.sms, email: form.email, push: form.push, whatsapp: form.whatsapp },
    };
  };

  const handleNext = async () => {
    if (!validateStep()) return;
    const apiStep = step + 1;
    const payload = buildStepPayload(step);
    const result = await dispatch(saveSetupStep({ step: apiStep, data: payload }));
    if (result.meta.requestStatus === 'fulfilled') {
      setStepError('');
      setStep((prev) => prev + 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;
    const payload = buildStepPayload(3);
    const result = await dispatch(saveSetupStep({ step: 4, data: payload }));
    if (result.meta.requestStatus === 'fulfilled') {
      setSubmitted(true);
    }
  };

  const inputClass = "w-full px-4 py-2.5 bg-white dark:bg-secondary-900 border border-gray-200 dark:border-gray-700 rounded-xl text-secondary-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm";
  const labelClass = "block text-sm font-medium text-secondary-800 dark:text-white mb-1.5";
  const iconInputClass = "w-full pl-10 pr-4 py-2.5 bg-white dark:bg-secondary-900 border border-gray-200 dark:border-gray-700 rounded-xl text-secondary-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm";

  if (submitted) {
    return (
      <div className="min-h-screen bg-white dark:bg-secondary-900 flex items-center justify-center px-4">
        <div className="w-full max-w-lg text-center animate-fadeIn">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/25">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-extrabold text-secondary-800 dark:text-white mb-3">Onboarding Complete!</h2>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" /> Your school is now active
          </div>
          <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm mx-auto">Your school has been successfully set up. You can now manage academics, students, and everything from your dashboard.</p>
          <Link to="/dashboard" className="inline-flex items-center gap-2 py-3 px-8 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all active:scale-[0.98]">
            Go to Dashboard <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-secondary-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <School className="w-7 h-7 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-extrabold text-secondary-800 dark:text-white tracking-tight">Complete School Setup</h2>
          <p className="mt-2 text-gray-500 dark:text-gray-400">Fill in the details to activate your school portal</p>
        </div>

        <div className="flex items-center justify-center gap-3 mb-10">
          {STEPS.map((s, i) => (
            <div key={i} className="flex items-center gap-3">
              <button type="button" className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${i === step ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 ring-2 ring-indigo-500' : i < step ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300' : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500'}`}>
                {i < step ? <Check className="w-3.5 h-3.5" /> : <span className="w-3.5 h-3.5 rounded-full border-2 inline-block border-current" />}
                <span className="hidden sm:inline">{s.title}</span>
              </button>
              {i < STEPS.length - 1 && <div className={`w-10 h-0.5 ${i < step ? 'bg-emerald-400' : 'bg-gray-200 dark:bg-gray-700'}`} />}
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-secondary-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 sm:p-8 animate-fadeIn">
          {stepError && (
            <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 text-red-600 dark:text-red-400 p-4 rounded-xl flex items-start gap-3 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <span>{stepError}</span>
            </div>
          )}

          {/* Step 1: School Identity + Contact */}
          {step === 0 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-secondary-800 dark:text-white flex items-center gap-2"><Building className="w-5 h-5 text-indigo-500" /> School Identity</h3>
                <p className="text-xs text-gray-400 mt-1">Official details of your institution</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-1">
                  <label className={labelClass}>Name (English) *</label>
                  <input className={inputClass} placeholder="Sunshine School" value={form.name_en} onChange={(e) => update('name_en', e.target.value)} />
                </div>
                <div className="sm:col-span-1">
                  <label className={labelClass}>Name (Bengali) *</label>
                  <input className={inputClass} placeholder="সানশাইন স্কুল" value={form.name_bn} onChange={(e) => update('name_bn', e.target.value)} />
                </div>
                <div className="sm:col-span-1">
                  <label className={labelClass}>Short Name</label>
                  <input className={inputClass} placeholder="SHS" value={form.name_short} onChange={(e) => update('name_short', e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className={labelClass}>School Type *</label>
                  <select className={inputClass} value={form.school_type} onChange={(e) => update('school_type', e.target.value)}>
                    <option value="">Select type</option>
                    {SCHOOL_TYPES.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>EIIN Number</label>
                  <input className={inputClass} placeholder="123456" value={form.eiin_number} onChange={(e) => update('eiin_number', e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>Board Affiliation</label>
                  <select className={inputClass} value={form.board_affiliation} onChange={(e) => update('board_affiliation', e.target.value)}>
                    <option value="">Select board</option>
                    {BOARDS.map((b) => <option key={b}>{b}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="flex items-center gap-3 pt-6">
                  <input type="checkbox" id="mpo_status" className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" checked={form.mpo_status} onChange={(e) => update('mpo_status', e.target.checked)} />
                  <label htmlFor="mpo_status" className="text-sm text-secondary-800 dark:text-white font-medium">MPO Included</label>
                </div>
                <div>
                  <label className={labelClass}>MPO Index</label>
                  <input className={inputClass} placeholder="MPO-001" value={form.mpo_index} onChange={(e) => update('mpo_index', e.target.value)} disabled={!form.mpo_status} />
                </div>
                <div>
                  <label className={labelClass}>Established Year</label>
                  <input type="number" className={inputClass} placeholder="1990" value={form.established_year} onChange={(e) => update('established_year', e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>TIN Number</label>
                  <input className={inputClass} placeholder="TIN-XXXXX" value={form.tin_number} onChange={(e) => update('tin_number', e.target.value)} />
                </div>
              </div>

              <hr className="border-gray-100 dark:border-gray-700" />
              <div>
                <h3 className="text-lg font-bold text-secondary-800 dark:text-white flex items-center gap-2"><Mail className="w-5 h-5 text-indigo-500" /> Contact Information</h3>
                <p className="text-xs text-gray-400 mt-1">Official communication details</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Email *</label>
                  <div className="relative"><div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Mail className="w-4 h-4 text-gray-400" /></div><input className={iconInputClass} placeholder="admin@school.com" value={form.email} onChange={(e) => update('email', e.target.value)} /></div>
                </div>
                <div>
                  <label className={labelClass}>Phone (Primary) *</label>
                  <div className="relative"><div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Phone className="w-4 h-4 text-gray-400" /></div><input className={iconInputClass} placeholder="+8801XXXXXXXXX" value={form.phone_primary} onChange={(e) => update('phone_primary', e.target.value)} /></div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className={labelClass}>Phone (Secondary)</label>
                  <div className="relative"><div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Phone className="w-4 h-4 text-gray-400" /></div><input className={iconInputClass} placeholder="+8801XXXXXXXXX" value={form.phone_secondary} onChange={(e) => update('phone_secondary', e.target.value)} /></div>
                </div>
                <div>
                  <label className={labelClass}>WhatsApp</label>
                  <div className="relative"><div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z'/%3E%3C/svg%3E" alt="" className="w-4 h-4" /></div><input className={iconInputClass} placeholder="+8801XXXXXXXXX" value={form.whatsapp_number} onChange={(e) => update('whatsapp_number', e.target.value)} /></div>
                </div>
                <div>
                  <label className={labelClass}>Website</label>
                  <div className="relative"><div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Globe className="w-4 h-4 text-gray-400" /></div><input className={iconInputClass} placeholder="https://school.com" value={form.website_url} onChange={(e) => update('website_url', e.target.value)} /></div>
                </div>
              </div>
              <div>
                <label className={labelClass}>Logo URL</label>
                <div className="relative"><div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Image className="w-4 h-4 text-gray-400" /></div><input className={iconInputClass} placeholder="https://example.com/logo.png" value={form.logo_url} onChange={(e) => update('logo_url', e.target.value)} /></div>
              </div>
            </div>
          )}

          {/* Step 2: Academic Config */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-secondary-800 dark:text-white flex items-center gap-2"><BookOpen className="w-5 h-5 text-indigo-500" /> Academic Configuration</h3>
                <p className="text-xs text-gray-400 mt-1">Set up your academic year and preferences</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className={labelClass}>Academic Year Start</label>
                  <div className="relative"><div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Calendar className="w-4 h-4 text-gray-400" /></div><input type="number" className={iconInputClass} placeholder="2025" value={form.academic_year_start} onChange={(e) => update('academic_year_start', e.target.value)} /></div>
                </div>
                <div>
                  <label className={labelClass}>Default Language</label>
                  <div className="relative"><div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Globe className="w-4 h-4 text-gray-400" /></div><select className={iconInputClass} value={form.default_language} onChange={(e) => update('default_language', e.target.value)}>
                    <option value="">Select</option>
                    {LANGUAGES.map((l) => <option key={l}>{l}</option>)}
                  </select></div>
                </div>
                <div>
                  <label className={labelClass}>Timezone</label>
                  <div className="relative"><div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Clock className="w-4 h-4 text-gray-400" /></div><select className={iconInputClass} value={form.timezone} onChange={(e) => update('timezone', e.target.value)}>
                    <option value="">Select</option>
                    {TIMEZONES.map((t) => <option key={t}>{t}</option>)}
                  </select></div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className={labelClass}>Date Format</label>
                  <select className={inputClass} value={form.date_format} onChange={(e) => update('date_format', e.target.value)}>
                    <option value="">Select</option>
                    {DATE_FORMATS.map((d) => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Currency</label>
                  <select className={inputClass} value={form.currency} onChange={(e) => update('currency', e.target.value)}>
                    <option value="">Select</option>
                    {CURRENCIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className={labelClass}>Working Days</label>
                <div className="flex flex-wrap gap-2 mt-1.5">
                  {DAYS.map((day) => (
                    <button type="button" key={day} onClick={() => toggleDay(day)} className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all border ${form.working_days.includes(day) ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-700' : 'bg-white dark:bg-secondary-900 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-gray-300'}`}>
                      {day}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className={labelClass}>Holiday List <span className="text-gray-400 font-normal">(comma separated)</span></label>
                <input className={inputClass} placeholder="Fri, Sat, 21 Feb, 26 Mar, 14 Dec" value={form.holidays} onChange={(e) => update('holidays', e.target.value)} />
              </div>
            </div>
          )}

          {/* Step 3: Address + Principal */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-secondary-800 dark:text-white flex items-center gap-2"><MapPin className="w-5 h-5 text-indigo-500" /> Address</h3>
                <p className="text-xs text-gray-400 mt-1">School location details</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className={labelClass}>Division</label>
                  <select className={inputClass} value={form.division} onChange={(e) => update('division', e.target.value)}>
                    <option value="">Select</option>
                    {DIVISIONS.map((d) => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>District</label>
                  <input className={inputClass} placeholder="Dhaka" value={form.district} onChange={(e) => update('district', e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>Upazila</label>
                  <input className={inputClass} placeholder="Savar" value={form.upazila} onChange={(e) => update('upazila', e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Village / Area</label>
                  <input className={inputClass} placeholder="Kodomtoli" value={form.village_area} onChange={(e) => update('village_area', e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>Google Map URL</label>
                  <div className="relative"><div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><MapPin className="w-4 h-4 text-gray-400" /></div><input className={iconInputClass} placeholder="https://maps.google.com/..." value={form.google_map_url} onChange={(e) => update('google_map_url', e.target.value)} /></div>
                </div>
              </div>

              <hr className="border-gray-100 dark:border-gray-700" />
              <div>
                <h3 className="text-lg font-bold text-secondary-800 dark:text-white flex items-center gap-2"><User className="w-5 h-5 text-indigo-500" /> Principal Information</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Name (English) *</label>
                  <input className={inputClass} placeholder="Dr. John Doe" value={form.principal_name_en} onChange={(e) => update('principal_name_en', e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>Name (Bengali)</label>
                  <input className={inputClass} placeholder="ড. জন ডো" value={form.principal_name_bn} onChange={(e) => update('principal_name_bn', e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className={labelClass}>Designation</label>
                  <input className={inputClass} placeholder="Principal" value={form.principal_designation} onChange={(e) => update('principal_designation', e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>Mobile</label>
                  <div className="relative"><div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Phone className="w-4 h-4 text-gray-400" /></div><input className={iconInputClass} placeholder="+8801XXXXXXXXX" value={form.principal_mobile} onChange={(e) => update('principal_mobile', e.target.value)} /></div>
                </div>
                <div>
                  <label className={labelClass}>Email</label>
                  <div className="relative"><div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Mail className="w-4 h-4 text-gray-400" /></div><input className={iconInputClass} placeholder="principal@school.com" value={form.principal_email} onChange={(e) => update('principal_email', e.target.value)} /></div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Branding + Notifications */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-secondary-800 dark:text-white flex items-center gap-2"><Palette className="w-5 h-5 text-indigo-500" /> Branding & Theme</h3>
                <p className="text-xs text-gray-400 mt-1">Customize the look and feel of your school portal</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className={labelClass}>Primary Color</label>
                  <div className="flex gap-3 items-center">
                    <input type="color" className="w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer p-0.5" value={form.primary_color} onChange={(e) => update('primary_color', e.target.value)} />
                    <input className={inputClass} value={form.primary_color} onChange={(e) => update('primary_color', e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Secondary Color</label>
                  <div className="flex gap-3 items-center">
                    <input type="color" className="w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer p-0.5" value={form.secondary_color} onChange={(e) => update('secondary_color', e.target.value)} />
                    <input className={inputClass} value={form.secondary_color} onChange={(e) => update('secondary_color', e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Accent Color</label>
                  <div className="flex gap-3 items-center">
                    <input type="color" className="w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer p-0.5" value={form.accent_color} onChange={(e) => update('accent_color', e.target.value)} />
                    <input className={inputClass} value={form.accent_color} onChange={(e) => update('accent_color', e.target.value)} />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Logo (Primary)</label>
                  <div className="relative"><div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Image className="w-4 h-4 text-gray-400" /></div><input className={iconInputClass} placeholder="https://example.com/logo.png" value={form.logo_primary_url} onChange={(e) => update('logo_primary_url', e.target.value)} /></div>
                </div>
                <div>
                  <label className={labelClass}>Logo (Landscape)</label>
                  <div className="relative"><div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Image className="w-4 h-4 text-gray-400" /></div><input className={iconInputClass} placeholder="https://example.com/logo-landscape.png" value={form.logo_landscape_url} onChange={(e) => update('logo_landscape_url', e.target.value)} /></div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className={labelClass}>Logo (Dark Mode)</label>
                  <div className="relative"><div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Image className="w-4 h-4 text-gray-400" /></div><input className={iconInputClass} placeholder="https://..." value={form.logo_dark_url} onChange={(e) => update('logo_dark_url', e.target.value)} /></div>
                </div>
                <div>
                  <label className={labelClass}>Favicon URL</label>
                  <div className="relative"><div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Hash className="w-4 h-4 text-gray-400" /></div><input className={iconInputClass} placeholder="https://example.com/favicon.ico" value={form.favicon_url} onChange={(e) => update('favicon_url', e.target.value)} /></div>
                </div>
                <div>
                  <label className={labelClass}>Font Family</label>
                  <input className={inputClass} placeholder="Inter" value={form.font_family} onChange={(e) => update('font_family', e.target.value)} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Custom CSS <span className="text-gray-400 font-normal">(optional)</span></label>
                <textarea className={`${inputClass} h-20 resize-none`} placeholder="/* Add custom styles */" value={form.custom_css} onChange={(e) => update('custom_css', e.target.value)} />
              </div>

              <hr className="border-gray-100 dark:border-gray-700" />
              <div>
                <h3 className="text-lg font-bold text-secondary-800 dark:text-white flex items-center gap-2"><Bell className="w-5 h-5 text-indigo-500" /> Notification Preferences</h3>
                <p className="text-xs text-gray-400 mt-1">Choose how your school sends alerts</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { key: 'sms', label: 'SMS', icon: '💬' },
                  { key: 'email', label: 'Email', icon: '📧' },
                  { key: 'push', label: 'Push', icon: '🔔' },
                  { key: 'whatsapp', label: 'WhatsApp', icon: '💚' },
                ].map(({ key, label, icon }) => (
                  <button type="button" key={key} onClick={() => update(key, !form[key])} className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${form[key] ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-400 dark:border-indigo-600' : 'bg-white dark:bg-secondary-900 border-gray-200 dark:border-gray-700 hover:border-gray-300'}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${form[key] ? 'bg-indigo-100 dark:bg-indigo-800' : 'bg-gray-100 dark:bg-gray-800'}`}><span>{icon}</span></div>
                    <span className={`text-xs font-semibold ${form[key] ? 'text-indigo-700 dark:text-indigo-300' : 'text-gray-500 dark:text-gray-400'}`}>{label}</span>
                    {form[key] && <Check className="w-3.5 h-3.5 text-indigo-500" />}
                  </button>
                ))}
              </div>

              <hr className="border-gray-100 dark:border-gray-700" />
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-5 border border-indigo-100 dark:border-indigo-900/30">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center shrink-0 mt-0.5"><Check className="w-4 h-4 text-white" /></div>
                  <div>
                    <h4 className="font-semibold text-secondary-800 dark:text-white text-sm">Almost there!</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Review your information and click <strong>Complete Setup</strong> to activate your school portal. You can always change these later in settings.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className={`mt-8 pt-6 border-t border-gray-100 dark:border-gray-700 flex ${step === 0 ? 'justify-end' : 'justify-between'}`}>
            {step > 0 && (
              <button type="button" onClick={() => setStep((prev) => prev - 1)} disabled={loading} className="flex items-center gap-2 py-2.5 px-5 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-secondary-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all active:scale-[0.98] disabled:opacity-70">
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>
            )}
            {step < STEPS.length - 1 ? (
              <button type="button" onClick={handleNext} disabled={loading} className="flex items-center gap-2 py-2.5 px-6 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 transition-all active:scale-[0.98] disabled:opacity-70">
                {loading ? <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <>Next <ChevronRight className="w-4 h-4" /></>}
              </button>
            ) : (
              <button type="button" onClick={handleSubmit} disabled={loading} className="flex items-center gap-2 py-2.5 px-6 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 transition-all active:scale-[0.98] disabled:opacity-70">
                {loading ? <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <><Check className="w-4 h-4" /> Complete Setup</>}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolOnboarding;
