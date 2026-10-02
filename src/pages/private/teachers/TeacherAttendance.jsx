import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, XCircle, X, Loader2, CheckCircle2, Ban, FileText, CalendarDays } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { Button } from '../../../components/ui/Button';
import { FormField } from '../../../components/common/FormField';
import { Input } from '../../../components/ui/Input';
import { StatusBadge } from '../../../components/ui/StatusBadge';
import { fetchTeachers } from '../../../store/slices/teacher-management/teacherSlice';
import {
  fetchTeacherAttendance,
  markTeacherAttendance,
  fetchRegularizations,
  submitRegularization,
  reviewRegularization,
  fetchDailyReport,
  fetchMonthlyReport,
  clearAttendanceError,
  clearAttendanceMessage,
} from '../../../store/slices/teacher-management/teacherAttendanceSlice';

const ATTENDANCE_STATUSES = ['present', 'absent', 'late', 'half_day', 'on_leave', 'excused'];
const REG_STATUSES = ['present', 'absent', 'late', 'half_day', 'excused']; // on_leave not allowed
const SOURCES = ['manual', 'fingerprint', 'mobile'];

const selectCls =
  'flex h-9 w-full rounded-md border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 dark:border-slate-800 dark:focus-visible:ring-slate-300';
const textareaCls =
  'flex w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 dark:border-slate-800 dark:focus-visible:ring-slate-300';

const capitalize = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1).replace(/_/g, ' ') : '');
const fmtDate = (d) => (d ? d.slice(0, 10) : '—');
const fmtTime = (t) => (t ? t.slice(0, 16).replace('T', ' ') : '—');

// API expects date-time; combine the picked date with the HH:mm time value
const toDateTime = (date, time) => {
  if (!time) return null;
  return date ? `${date} ${time}:00` : `${time}:00`;
};

const statusVariant = (s) =>
  s === 'present' || s === 'approved' || s === 'verified'
    ? 'active'
    : s === 'absent' || s === 'rejected'
    ? 'destructive'
    : 'pending';

const Modal = ({ open, title, onClose, children }) => {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const th = 'px-4 py-2 text-left text-xs font-semibold uppercase text-slate-500 dark:text-slate-400';
const td = 'px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300';

// ------------------------------------ Attendance Tab ------------------------------------
const emptyMarkForm = {
  teacher_id: '',
  attendance_date: '',
  status: 'present',
  check_in_time: '',
  check_out_time: '',
  source: 'manual',
  latitude: '',
  longitude: '',
  location_name: '',
  remarks: '',
};

const AttendanceTab = () => {
  const dispatch = useDispatch();
  const { teachers } = useSelector((s) => s.teacher);
  const { records, loading } = useSelector((s) => s.teacherAttendance);

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyMarkForm);

  useEffect(() => {
    dispatch(fetchTeachers());
    dispatch(fetchTeacherAttendance());
  }, [dispatch]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const teacherLabel = (id) => {
    const t = teachers.find((x) => x.id === id);
    return t ? t.employee_id : id?.slice(0, 8) + '…';
  };

  const handleMark = async (e) => {
    e.preventDefault();
    const payload = {
      teacher_id: form.teacher_id,
      attendance_date: form.attendance_date,
      status: form.status || null,
      check_in_time: toDateTime(form.attendance_date, form.check_in_time),
      check_out_time: toDateTime(form.attendance_date, form.check_out_time),
      source: form.source || null,
      latitude: form.latitude === '' ? null : Number(form.latitude),
      longitude: form.longitude === '' ? null : Number(form.longitude),
      location_name: form.location_name || null,
      remarks: form.remarks || null,
    };
    const result = await dispatch(markTeacherAttendance(payload));
    if (result.meta.requestStatus === 'fulfilled') {
      setForm(emptyMarkForm);
      setShowForm(false);
      dispatch(fetchTeacherAttendance());
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end">
        <Button onClick={() => setShowForm((s) => !s)}>
          {showForm ? <XCircle className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
          {showForm ? 'Cancel' : 'Mark Attendance'}
        </Button>
      </div>

      {showForm && (
        <form
          onSubmit={handleMark}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField label="Teacher" name="teacher_id" required>
              <select name="teacher_id" value={form.teacher_id} onChange={handleInput} className={selectCls} required>
                <option value="">Select teacher</option>
                {teachers.map((t) => (
                  <option key={t.id} value={t.id}>{t.employee_id}</option>
                ))}
              </select>
            </FormField>
            <FormField label="Date" name="attendance_date" required>
              <Input name="attendance_date" type="date" value={form.attendance_date} onChange={handleInput} required />
            </FormField>
            <FormField label="Status" name="status">
              <select name="status" value={form.status} onChange={handleInput} className={selectCls}>
                {ATTENDANCE_STATUSES.map((s) => (
                  <option key={s} value={s}>{capitalize(s)}</option>
                ))}
              </select>
            </FormField>
            <FormField label="Check-in Time" name="check_in_time">
              <Input name="check_in_time" type="time" value={form.check_in_time} onChange={handleInput} />
            </FormField>
            <FormField label="Check-out Time" name="check_out_time">
              <Input name="check_out_time" type="time" value={form.check_out_time} onChange={handleInput} />
            </FormField>
            <FormField label="Source" name="source">
              <select name="source" value={form.source} onChange={handleInput} className={selectCls}>
                {SOURCES.map((s) => (
                  <option key={s} value={s}>{capitalize(s)}</option>
                ))}
              </select>
            </FormField>
            <FormField label="Latitude" name="latitude" helperText="-90 to 90">
              <Input name="latitude" type="number" step="any" min={-90} max={90} value={form.latitude} onChange={handleInput} />
            </FormField>
            <FormField label="Longitude" name="longitude" helperText="-180 to 180">
              <Input name="longitude" type="number" step="any" min={-180} max={180} value={form.longitude} onChange={handleInput} />
            </FormField>
            <FormField label="Location Name" name="location_name">
              <Input name="location_name" value={form.location_name} onChange={handleInput} maxLength={255} placeholder="e.g. Main Campus" />
            </FormField>
          </div>
          <FormField label="Remarks" name="remarks">
            <textarea name="remarks" value={form.remarks} onChange={handleInput} rows={2} className={textareaCls} />
          </FormField>
          <div className="flex justify-end">
            <Button type="submit" isLoading={loading}>Save Attendance</Button>
          </div>
        </form>
      )}

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
              <tr>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Teacher</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Check-in</th>
                <th className="px-4 py-3 font-semibold">Check-out</th>
                <th className="px-4 py-3 font-semibold">Source</th>
                <th className="px-4 py-3 font-semibold">Location</th>
              </tr>
            </thead>
            <tbody>
              {loading && records.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-slate-500">
                    <Loader2 className="mx-auto h-6 w-6 animate-spin" />
                  </td>
                </tr>
              ) : records.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-slate-500">No attendance records found.</td>
                </tr>
              ) : (
                records.map((r) => (
                  <tr key={r.id} className="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{fmtDate(r.attendance_date)}</td>
                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-200">{teacherLabel(r.teacher_id)}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={statusVariant(r.status)}>{capitalize(r.status)}</StatusBadge>
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{fmtTime(r.check_in_time)}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{fmtTime(r.check_out_time)}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{capitalize(r.source)}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{r.location_name || '—'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ------------------------------------ Regularizations Tab ------------------------------------
const emptyRegForm = { teacher_id: '', attendance_date: '', new_status: 'present', check_in_time: '', check_out_time: '', reason: '', supporting_doc_url: '' };

const RegularizationsTab = () => {
  const dispatch = useDispatch();
  const { teachers } = useSelector((s) => s.teacher);
  const { regularizations, loading } = useSelector((s) => s.teacherAttendance);

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyRegForm);
  const [reviewing, setReviewing] = useState(null);
  const [reviewRemarks, setReviewRemarks] = useState('');

  useEffect(() => {
    dispatch(fetchTeachers());
    dispatch(fetchRegularizations());
  }, [dispatch]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const teacherLabel = (id) => {
    const t = teachers.find((x) => x.id === id);
    return t ? t.employee_id : id?.slice(0, 8) + '…';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      reason: form.reason,
      teacher_id: form.teacher_id || null,
      attendance_date: form.attendance_date || null,
      new_status: form.new_status || null,
      check_in_time: toDateTime(form.attendance_date, form.check_in_time),
      check_out_time: toDateTime(form.attendance_date, form.check_out_time),
      supporting_doc_url: form.supporting_doc_url || null,
    };
    const result = await dispatch(submitRegularization(payload));
    if (result.meta.requestStatus === 'fulfilled') {
      setForm(emptyRegForm);
      setShowForm(false);
      dispatch(fetchRegularizations());
    }
  };

  const handleReview = async (status) => {
    const result = await dispatch(
      reviewRegularization({
        id: reviewing.id,
        data: { status, review_remarks: reviewRemarks || null },
      })
    );
    if (result.meta.requestStatus === 'fulfilled') {
      setReviewing(null);
      setReviewRemarks('');
      dispatch(fetchRegularizations());
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end">
        <Button onClick={() => setShowForm((s) => !s)}>
          {showForm ? <XCircle className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
          {showForm ? 'Cancel' : 'New Request'}
        </Button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField label="Teacher" name="reg_teacher">
              <select name="teacher_id" value={form.teacher_id} onChange={handleInput} className={selectCls}>
                <option value="">Select teacher</option>
                {teachers.map((t) => (
                  <option key={t.id} value={t.id}>{t.employee_id}</option>
                ))}
              </select>
            </FormField>
            <FormField label="Date" name="reg_date">
              <Input name="attendance_date" type="date" value={form.attendance_date} onChange={handleInput} />
            </FormField>
            <FormField label="Requested Status" name="reg_status" helperText="on_leave not allowed">
              <select name="new_status" value={form.new_status} onChange={handleInput} className={selectCls}>
                {REG_STATUSES.map((s) => (
                  <option key={s} value={s}>{capitalize(s)}</option>
                ))}
              </select>
            </FormField>
            <FormField label="Check-in Time" name="reg_check_in">
              <Input name="check_in_time" type="time" value={form.check_in_time} onChange={handleInput} />
            </FormField>
            <FormField label="Check-out Time" name="reg_check_out">
              <Input name="check_out_time" type="time" value={form.check_out_time} onChange={handleInput} />
            </FormField>
            <FormField label="Supporting Doc URL" name="reg_doc">
              <Input name="supporting_doc_url" value={form.supporting_doc_url} onChange={handleInput} placeholder="https://…" />
            </FormField>
          </div>
          <FormField label="Reason" name="reg_reason" required>
            <textarea name="reason" value={form.reason} onChange={handleInput} rows={2} maxLength={1000} className={textareaCls} required />
          </FormField>
          <div className="flex justify-end">
            <Button type="submit" isLoading={loading}>Submit Request</Button>
          </div>
        </form>
      )}

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
              <tr>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Teacher</th>
                <th className="px-4 py-3 font-semibold">Old → New</th>
                <th className="px-4 py-3 font-semibold">Reason</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && regularizations.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-slate-500">
                    <Loader2 className="mx-auto h-6 w-6 animate-spin" />
                  </td>
                </tr>
              ) : regularizations.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-slate-500">No regularization requests found.</td>
                </tr>
              ) : (
                regularizations.map((r) => (
                  <tr key={r.id} className="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{fmtDate(r.attendance_date)}</td>
                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-200">{teacherLabel(r.teacher_id)}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                      {capitalize(r.old_status)} → <span className="font-medium">{capitalize(r.new_status)}</span>
                    </td>
                    <td className="px-4 py-3 max-w-[220px] truncate text-slate-600 dark:text-slate-300" title={r.reason}>{r.reason}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={statusVariant(r.status)}>{capitalize(r.status)}</StatusBadge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {r.status === 'pending' ? (
                        <Button variant="outline" size="sm" onClick={() => setReviewing(r)} className="text-blue-500 hover:text-blue-600">
                          Review
                        </Button>
                      ) : (
                        <span className="text-xs text-slate-400">{fmtDate(r.reviewed_at)}</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={!!reviewing} title="Review Regularization Request" onClose={() => setReviewing(null)}>
        {reviewing && (
          <div className="space-y-4">
            <div className="rounded-lg bg-slate-50 dark:bg-slate-900/50 p-4 space-y-1.5 text-sm">
              <div className="flex justify-between"><span className="text-slate-500">Teacher</span><span className="font-medium">{teacherLabel(reviewing.teacher_id)}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Date</span><span className="font-medium">{fmtDate(reviewing.attendance_date)}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Change</span><span className="font-medium">{capitalize(reviewing.old_status)} → {capitalize(reviewing.new_status)}</span></div>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                <span className="text-slate-500">Reason: </span>
                <span className="text-slate-700 dark:text-slate-300">{reviewing.reason}</span>
              </div>
              {reviewing.supporting_doc_url && (
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                  <a href={reviewing.supporting_doc_url} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">View supporting document</a>
                </div>
              )}
            </div>
            <FormField label="Review Remarks" name="review_remarks">
              <textarea
                name="review_remarks"
                value={reviewRemarks}
                onChange={(e) => setReviewRemarks(e.target.value)}
                rows={2}
                maxLength={500}
                className={textareaCls}
              />
            </FormField>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setReviewing(null)}>Cancel</Button>
              <Button variant="outline" onClick={() => handleReview('rejected')} className="text-red-500 hover:text-red-600">
                <Ban className="mr-2 h-4 w-4" /> Reject
              </Button>
              <Button onClick={() => handleReview('approved')} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <CheckCircle2 className="mr-2 h-4 w-4" /> Approve
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

// ------------------------------------ Reports Tab ------------------------------------
const SummaryCard = ({ label, value, tone }) => (
  <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
    <div className="text-xs uppercase text-slate-500 dark:text-slate-400">{label}</div>
    <div className={`mt-1 text-2xl font-bold ${tone || 'text-slate-900 dark:text-white'}`}>{value}</div>
  </div>
);

const ReportsTab = () => {
  const dispatch = useDispatch();
  const { teachers } = useSelector((s) => s.teacher);
  const { dailyReport, monthlyReport, loading } = useSelector((s) => s.teacherAttendance);

  const [reportType, setReportType] = useState('daily');
  const [date, setDate] = useState('');
  const [yearMonth, setYearMonth] = useState('');

  useEffect(() => {
    dispatch(fetchTeachers());
    dispatch(fetchDailyReport());
    dispatch(fetchMonthlyReport());
  }, [dispatch]);

  const teacherLabel = (id) => {
    const t = teachers.find((x) => x.id === id);
    return t ? t.employee_id : id?.slice(0, 8) + '…';
  };

  const loadDaily = () => dispatch(fetchDailyReport(date || undefined));
  const loadMonthly = () => dispatch(fetchMonthlyReport(yearMonth || undefined));

  const summary = dailyReport?.summary;

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 dark:border-slate-800">
        <div className="flex gap-6">
          {[
            { id: 'daily', label: 'Daily' },
            { id: 'monthly', label: 'Monthly' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setReportType(t.id)}
              className={`pb-2.5 pt-1 text-sm font-medium border-b-2 -mb-px transition-colors ${
                reportType === t.id
                  ? 'border-slate-900 dark:border-white text-slate-900 dark:text-white'
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {reportType === 'daily' ? (
        <div className="space-y-6">
          <div className="flex items-end gap-3">
            <FormField label="Date" name="report_date" className="w-64">
              <Input name="report_date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </FormField>
            <Button variant="outline" onClick={loadDaily}>
              <CalendarDays className="mr-2 h-4 w-4" /> Load
            </Button>
          </div>

          {summary ? (
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              <SummaryCard label="Total" value={summary.total} />
              <SummaryCard label="Present" value={summary.present} tone="text-emerald-600" />
              <SummaryCard label="Absent" value={summary.absent} tone="text-red-600" />
              <SummaryCard label="Late" value={summary.late} tone="text-yellow-600" />
              <SummaryCard label="Half Day" value={summary.half_day} tone="text-orange-600" />
              <SummaryCard label="On Leave" value={summary.on_leave} tone="text-blue-600" />
            </div>
          ) : (
            <div className="py-8 text-center text-slate-500">
              {loading ? <Loader2 className="mx-auto h-6 w-6 animate-spin" /> : 'No daily report data.'}
            </div>
          )}

          {dailyReport?.teachers?.length > 0 && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs uppercase bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Teacher</th>
                      <th className="px-4 py-3 font-semibold">Status</th>
                      <th className="px-4 py-3 font-semibold">Check-in</th>
                      <th className="px-4 py-3 font-semibold">Check-out</th>
                      <th className="px-4 py-3 font-semibold">Source</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dailyReport.teachers.map((r) => (
                      <tr key={r.id} className="border-b border-slate-200 dark:border-slate-800">
                        <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-200">{teacherLabel(r.teacher_id)}</td>
                        <td className="px-4 py-3">
                          <StatusBadge status={statusVariant(r.status)}>{capitalize(r.status)}</StatusBadge>
                        </td>
                        <td className={td}>{fmtTime(r.check_in_time)}</td>
                        <td className={td}>{fmtTime(r.check_out_time)}</td>
                        <td className={td}>{capitalize(r.source)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-end gap-3">
            <FormField label="Month" name="report_month" className="w-64" helperText="Format: YYYY-MM">
              <Input name="report_month" placeholder="2026-09" value={yearMonth} onChange={(e) => setYearMonth(e.target.value)} />
            </FormField>
            <Button variant="outline" onClick={loadMonthly}>
              <FileText className="mr-2 h-4 w-4" /> Load
            </Button>
          </div>

          {monthlyReport?.teachers?.length > 0 ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs uppercase bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Employee</th>
                      <th className="px-4 py-3 font-semibold">Name</th>
                      <th className="px-4 py-3 font-semibold">Working Days</th>
                      <th className="px-4 py-3 font-semibold">Present</th>
                      <th className="px-4 py-3 font-semibold">Absent</th>
                      <th className="px-4 py-3 font-semibold">Late</th>
                      <th className="px-4 py-3 font-semibold">Leave</th>
                      <th className="px-4 py-3 font-semibold">Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthlyReport.teachers.map((t, i) => (
                      <tr key={t.teacher_id || i} className="border-b border-slate-200 dark:border-slate-800">
                        <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-200">{t.employee_id}</td>
                        <td className={td}>{t.teacher_name}</td>
                        <td className={td}>{t.working_days}</td>
                        <td className={`${td} text-emerald-600 dark:text-emerald-400`}>{t.present}</td>
                        <td className={`${td} text-red-600 dark:text-red-400`}>{t.absent}</td>
                        <td className={`${td} text-yellow-600 dark:text-yellow-400`}>{t.late}</td>
                        <td className={`${td} text-blue-600 dark:text-blue-400`}>{t.leave}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="h-1.5 w-16 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                              <div
                                className={`h-full ${t.percentage >= 90 ? 'bg-emerald-500' : t.percentage >= 75 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                style={{ width: `${Math.min(t.percentage || 0, 100)}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">{t.percentage ?? '—'}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="py-8 text-center text-slate-500">
              {loading ? <Loader2 className="mx-auto h-6 w-6 animate-spin" /> : 'No monthly report data.'}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ------------------------------------ Main Page ------------------------------------
const TeacherAttendance = () => {
  const dispatch = useDispatch();
  const { error, lastMessage } = useSelector((s) => s.teacherAttendance);
  const [activeTab, setActiveTab] = useState('attendance');

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAttendanceError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (lastMessage) {
      toast.success(lastMessage);
      dispatch(clearAttendanceMessage());
    }
  }, [lastMessage, dispatch]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link
          to=".."
          className="p-2 -ml-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-500 dark:text-slate-400"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Teacher Attendance</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Mark attendance, review regularization requests and view reports.
          </p>
        </div>
      </div>

      <div className="border-b border-slate-200 dark:border-slate-800">
        <div className="flex gap-6">
          {[
            { id: 'attendance', label: 'Attendance' },
            { id: 'regularizations', label: 'Regularizations' },
            { id: 'reports', label: 'Reports' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`pb-3 pt-1 text-sm font-medium border-b-2 -mb-px transition-colors ${
                activeTab === t.id
                  ? 'border-slate-900 dark:border-white text-slate-900 dark:text-white'
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'attendance' && <AttendanceTab />}
      {activeTab === 'regularizations' && <RegularizationsTab />}
      {activeTab === 'reports' && <ReportsTab />}
    </div>
  );
};

export default TeacherAttendance;
