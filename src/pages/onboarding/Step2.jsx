import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Calendar, Globe, Clock, DollarSign, ArrowLeft, ArrowRight, AlertCircle, Sun } from 'lucide-react';
import { saveStep2 } from '../../store/slices/onboardingSlice';
import { toast } from 'sonner';

const DAYS = [
  { value: 'sat', label: 'Sat' },
  { value: 'sun', label: 'Sun' },
  { value: 'mon', label: 'Mon' },
  { value: 'tue', label: 'Tue' },
  { value: 'wed', label: 'Wed' },
  { value: 'thu', label: 'Thu' },
  { value: 'fri', label: 'Fri' },
];

const step2Schema = z.object({
  academic_year_start: z.preprocess(
    (v) => (v === '' || v === undefined || v === null ? undefined : Number(v)),
    z.number().int().min(1).max(12).optional()
  ),
  default_language: z.string().max(10).optional().or(z.literal('')),
  timezone: z.string().optional().or(z.literal('')),
  date_format: z.string().max(30).optional().or(z.literal('')),
  currency: z.string().max(3).optional().or(z.literal('')),
  holidays: z.string().optional(),
});

const MONTHS = [
  { value: 1, label: 'January' }, { value: 2, label: 'February' }, { value: 3, label: 'March' },
  { value: 4, label: 'April' }, { value: 5, label: 'May' }, { value: 6, label: 'June' },
  { value: 7, label: 'July' }, { value: 8, label: 'August' }, { value: 9, label: 'September' },
  { value: 10, label: 'October' }, { value: 11, label: 'November' }, { value: 12, label: 'December' },
];

const inputClass = 'block w-full bg-slate-900/50 border border-slate-700 rounded-xl py-2.5 px-4 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all sm:text-sm';
const labelClass = 'block text-sm font-medium text-slate-300 mb-1.5';

const Step2 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((s) => s.onboarding);
  const [workingDays, setWorkingDays] = useState(['sun', 'mon', 'tue', 'wed', 'thu']);
  const [holidayInput, setHolidayInput] = useState('');
  const [holidays, setHolidays] = useState([]);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(step2Schema),
  });

  const toggleDay = (day) => {
    setWorkingDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const addHoliday = () => {
    if (holidayInput.trim() && !holidays.includes(holidayInput.trim())) {
      setHolidays([...holidays, holidayInput.trim()]);
      setHolidayInput('');
    }
  };

  const removeHoliday = (idx) => {
    setHolidays(holidays.filter((_, i) => i !== idx));
  };

  const onSubmit = (data) => {
    const payload = {
      ...data,
      working_days: workingDays,
      holidays: holidays.length > 0 ? holidays : null,
    };
    if (payload.academic_year_start === undefined) payload.academic_year_start = null;
    if (!payload.default_language) payload.default_language = null;
    if (!payload.timezone) payload.timezone = null;
    if (!payload.date_format) payload.date_format = null;
    if (!payload.currency) payload.currency = null;

    dispatch(saveStep2(payload)).then((result) => {
      if (saveStep2.fulfilled.match(result)) {
        toast.success('Academic calendar saved!');
        navigate('/onboarding/step-3');
      }
    });
  };

  return (
    <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-700/30">
        <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center">
          <Calendar className="w-5 h-5 text-indigo-400" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">Academic Calendar</h2>
          <p className="text-xs text-slate-400">Step 2 of 4 — Set up your academic year</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl flex items-start gap-3 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Academic Year Start Month</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500"><Calendar className="h-4 w-4" /></div>
              <select {...register('academic_year_start')} className={`block w-full pl-10 bg-slate-900/50 border ${errors.academic_year_start ? 'border-red-500' : 'border-slate-700'} rounded-xl py-2.5 text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all sm:text-sm appearance-none`}>
                <option value="" className="text-slate-500">Select month</option>
                {MONTHS.map((m) => (
                  <option key={m.value} value={m.value} className="text-slate-200">{m.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className={labelClass}>Default Language</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500"><Globe className="h-4 w-4" /></div>
              <input {...register('default_language')} type="text" placeholder="en" className={`pl-10 ${inputClass}`} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Timezone</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500"><Clock className="h-4 w-4" /></div>
              <input {...register('timezone')} type="text" placeholder="Asia/Dhaka" className={`pl-10 ${inputClass}`} />
            </div>
          </div>
          <div>
            <label className={labelClass}>Date Format</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500"><Calendar className="h-4 w-4" /></div>
              <input {...register('date_format')} type="text" placeholder="dd/mm/yyyy" className={`pl-10 ${inputClass}`} />
            </div>
          </div>
          <div>
            <label className={labelClass}>Currency</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500"><DollarSign className="h-4 w-4" /></div>
              <input {...register('currency')} type="text" placeholder="BDT" className={`pl-10 ${inputClass}`} />
            </div>
          </div>
        </div>

        <div>
          <label className={labelClass}>Working Days</label>
          <div className="flex flex-wrap gap-2 mt-1.5">
            {DAYS.map((day) => (
              <button key={day.value} type="button" onClick={() => toggleDay(day.value)}
                className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                  workingDays.includes(day.value)
                    ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300'
                    : 'bg-slate-900/50 border-slate-700 text-slate-500 hover:border-slate-600'
                }`}
              >
                {day.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className={labelClass}>Holidays (list of holiday names)</label>
          <div className="flex gap-2">
            <input value={holidayInput} onChange={(e) => setHolidayInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addHoliday(); } }}
              type="text" placeholder="e.g. Summer Vacation" className={`flex-1 ${inputClass}`}
            />
            <button type="button" onClick={addHoliday}
              className="px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-xl text-sm font-medium transition-all"
            >
              Add
            </button>
          </div>
          {holidays.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {holidays.map((h, i) => (
                <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900/50 border border-slate-700 rounded-lg text-xs text-slate-300">
                  <Sun className="w-3 h-3 text-amber-400" /> {h}
                  <button type="button" onClick={() => removeHoliday(i)} className="text-slate-500 hover:text-red-400 ml-1">&times;</button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="pt-4 flex items-center justify-between">
          <button type="button" onClick={() => navigate('/onboarding/step-1')}
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

export default Step2;
