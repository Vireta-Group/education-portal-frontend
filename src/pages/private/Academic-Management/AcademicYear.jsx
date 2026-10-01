import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Power, Archive, Copy, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { Button } from '../../../components/ui/Button';
import { FormField } from '../../../components/common/FormField';
import { Input } from '../../../components/ui/Input';
import { DatePicker } from '../../../components/ui/DatePicker';
import { StatusBadge } from '../../../components/ui/StatusBadge';
import {
  fetchAcademicYears,
  createAcademicYear,
  activateAcademicYear,
  archiveAcademicYear,
  copyAcademicYear,
  clearAcademicYearError,
  clearAcademicYearMessage,
} from '../../../store/slices/academicYearSlice';

const COPY_SCOPES = [
  { value: 'classes', label: 'Classes' },
  { value: 'sections', label: 'Sections' },
  { value: 'subjects', label: 'Subjects' },
  { value: 'students', label: 'Students' },
  { value: 'staff', label: 'Staff' },
];

const AcademicYear = () => {
  const dispatch = useDispatch();
  const { years, loading, error, lastMessage } = useSelector((state) => state.academicYear);

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    year_name: '',
    year_name_bn: '',
    start_date: '',
    end_date: '',
    is_current: false,
  });
  const [copyYearId, setCopyYearId] = useState('');
  const [copyScope, setCopyScope] = useState('classes');
  const [actionId, setActionId] = useState(null);

  useEffect(() => {
    dispatch(fetchAcademicYears());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAcademicYearError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (lastMessage) {
      toast.success(lastMessage);
      dispatch(clearAcademicYearMessage());
    }
  }, [lastMessage, dispatch]);

  const handleInput = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const payload = {
      year_name: form.year_name,
      year_name_bn: form.year_name_bn || null,
      start_date: form.start_date,
      end_date: form.end_date,
      is_current: form.is_current || null,
    };
    const result = await dispatch(createAcademicYear(payload));
    if (result.meta.requestStatus === 'fulfilled') {
      setForm({ year_name: '', year_name_bn: '', start_date: '', end_date: '', is_current: false });
      setShowForm(false);
      dispatch(fetchAcademicYears());
    }
  };

  const handleActivate = async (id) => {
    setActionId(id);
    const result = await dispatch(activateAcademicYear(id));
    setActionId(null);
    if (result.meta.requestStatus === 'fulfilled') {
      dispatch(fetchAcademicYears());
    }
  };

  const handleArchive = async (id) => {
    setActionId(id);
    const result = await dispatch(archiveAcademicYear(id));
    setActionId(null);
    if (result.meta.requestStatus === 'fulfilled') {
      dispatch(fetchAcademicYears());
    }
  };

  const handleCopy = async (id) => {
    setActionId(id);
    const result = await dispatch(
      copyAcademicYear({
        id,
        data: { copy_scope: copyScope, copied_from_year_id: copyYearId || null },
      })
    );
    setActionId(null);
  };

  const isBusy = (id) => loading && actionId === id;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4 mb-2">
        <Link
          to=".."
          className="p-2 -ml-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-500 dark:text-slate-400"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Academic Years</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Manage the academic years for your school.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-end">
        <Button onClick={() => setShowForm((s) => !s)}>
          {showForm ? <XCircle className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
          {showForm ? 'Cancel' : 'New Academic Year'}
        </Button>
      </div>

      {showForm && (
        <form
          onSubmit={handleCreate}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Year Name" name="year_name" required>
              <Input
                id="year_name"
                name="year_name"
                value={form.year_name}
                onChange={handleInput}
                placeholder="e.g. 2026-2027"
                required
              />
            </FormField>
            <FormField label="Year Name (Bangla)" name="year_name_bn">
              <Input
                id="year_name_bn"
                name="year_name_bn"
                value={form.year_name_bn}
                onChange={handleInput}
                placeholder="e.g. ২০২৬-২০২৭"
              />
            </FormField>
            <FormField label="Start Date" name="start_date" required>
              <DatePicker id="start_date" name="start_date" value={form.start_date} onChange={handleInput} required />
            </FormField>
            <FormField label="End Date" name="end_date" required>
              <DatePicker id="end_date" name="end_date" value={form.end_date} onChange={handleInput} required />
            </FormField>
          </div>
          <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              name="is_current"
              checked={form.is_current}
              onChange={handleInput}
              className="rounded border-slate-300"
            />
            Set as current year
          </label>
          <div className="flex justify-end">
            <Button type="submit" isLoading={loading && actionId === 'create'}>
              Create Academic Year
            </Button>
          </div>
        </form>
      )}

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
              <tr>
                <th className="px-6 py-3 font-semibold">Year</th>
                <th className="px-6 py-3 font-semibold">Start Date</th>
                <th className="px-6 py-3 font-semibold">End Date</th>
                <th className="px-6 py-3 font-semibold">Status</th>
                <th className="px-6 py-3 font-semibold">Locked</th>
                <th className="px-6 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && years.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    <Loader2 className="mx-auto h-6 w-6 animate-spin" />
                  </td>
                </tr>
              ) : years.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    No academic years found.
                  </td>
                </tr>
              ) : (
                years.map((year) => (
                  <tr
                    key={year.id}
                    className="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900 dark:text-slate-200">{year.year_name}</div>
                      {year.year_name_bn && (
                        <div className="text-xs text-slate-500">{year.year_name_bn}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                      {year.start_date?.slice(0, 10)}
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                      {year.end_date?.slice(0, 10)}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={year.is_current ? 'active' : year.year_status === 'archived' ? 'inactive' : 'pending'}>
                        {year.is_current ? 'Current' : year.year_status === 'archived' ? 'Archived' : 'Inactive'}
                      </StatusBadge>
                    </td>
                    <td className="px-6 py-4">
                      {year.is_locked ? (
                        <CheckCircle2 className="h-5 w-5 text-red-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-slate-300" />
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {!year.is_current && !year.is_locked && (
                          <Button
                            variant="outline"
                            size="sm"
                            isLoading={isBusy(year.id) && actionId === year.id && false}
                            onClick={() => handleActivate(year.id)}
                            title="Activate"
                            className="text-emerald-600 hover:text-emerald-500"
                          >
                            <Power size={14} />
                          </Button>
                        )}
                        {!year.is_locked && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleArchive(year.id)}
                            title="Archive"
                            className="text-slate-500 hover:text-slate-700"
                          >
                            <Archive size={14} />
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCopy(year.id)}
                          title="Copy structure from previous year"
                          className="text-blue-500 hover:text-blue-600"
                        >
                          <Copy size={14} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Copy Structure</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <FormField label="Target Year" name="copy_year" required>
            <select
              id="copy_year"
              name="copy_year"
              value={copyYearId}
              onChange={(e) => setCopyYearId(e.target.value)}
              className="flex h-9 w-full rounded-md border border-slate-200 bg-transparent px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 dark:border-slate-800"
              required
            >
              <option value="">Select academic year</option>
              {years.map((y) => (
                <option key={y.id} value={y.id}>
                  {y.year_name}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="Copy Scope" name="copy_scope" required>
            <select
              id="copy_scope"
              name="copy_scope"
              value={copyScope}
              onChange={(e) => setCopyScope(e.target.value)}
              className="flex h-9 w-full rounded-md border border-slate-200 bg-transparent px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 dark:border-slate-800"
              required
            >
              {COPY_SCOPES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </FormField>
          <Button onClick={() => copyYearId && handleCopy(copyYearId)} disabled={!copyYearId}>
            Save Copy Preferences
          </Button>
        </div>
        <p className="text-xs text-slate-500 mt-3">
          Structure will be duplicated when Class/Section modules are available.
        </p>
      </div>
    </div>
  );
};

export default AcademicYear;
