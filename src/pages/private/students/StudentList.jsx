import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown, ChevronRight, Loader2, RefreshCw, Search, Users } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { Button } from '../../../components/ui/Button';
import { FormField } from '../../../components/common/FormField';
import { Input } from '../../../components/ui/Input';
import { StatusBadge } from '../../../components/ui/StatusBadge';
import { fetchStudents, fetchStudentsByClass, fetchStudentsBySection, setFilters, setLookup, setView, clearStudentError } from '../../../store/slices/studentSlice';
import { cn } from '../../../lib/utils';

const PAGE_SIZE = 25;
const COLUMN_COUNT = 10;

const ACTIVE_OPTIONS = [
  { value: '', label: 'All' },
  { value: '1', label: 'Active only' },
  { value: '0', label: 'Inactive only' },
];

const KNOWN_FIELDS = [
  { label: 'Record ID', keys: ['id'] },
  { label: 'Tenant ID', keys: ['tenant_id'] },
  { label: 'Branch ID', keys: ['branch_id'] },
  { label: 'Student ID', keys: ['student_id'] },
  { label: 'Name (English)', keys: ['name_en'] },
  { label: 'Name (Bangla)', keys: ['name_bn'] },
  { label: 'Name (Arabic)', keys: ['name_ar'] },
  { label: 'Date of Birth', keys: ['date_of_birth'] },
  { label: 'Gender', keys: ['gender'] },
  { label: 'Blood Group', keys: ['blood_group'] },
  { label: 'Religion', keys: ['religion'] },
  { label: 'Nationality', keys: ['nationality'] },
  { label: 'Birth Reg. No', keys: ['birth_reg_no'] },
  { label: 'Mobile', keys: ['mobile'] },
  { label: 'Email', keys: ['email'] },
  { label: 'Current Address', keys: ['current_address'], wide: true },
  { label: 'Permanent Address', keys: ['permanent_address'], wide: true },
  { label: 'Photo URL', keys: ['photo_url'], wide: true },
  { label: 'Admission Date', keys: ['admission_date'] },
  { label: 'Student Type', keys: ['student_type'] },
  { label: 'Status', keys: ['status'] },
  { label: 'Father', keys: ['father_name'] },
  { label: 'Mother', keys: ['mother_name'] },
  { label: 'Guardian', keys: ['guardian_name'] },
];

const isFilled = (value) =>
  value !== undefined && value !== null && value !== '' && value !== false;

const displayValue = (value) => {
  if (value === true) return 'Yes';
  if (value === false) return 'No';
  if (Array.isArray(value)) return value.join(', ');
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
};

const initialsOf = (student) =>
  (student.name_en || student.student_id || '?')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('');

const selectClass =
  'flex h-9 w-full rounded-md border border-slate-200 bg-transparent px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 dark:border-slate-800';

const VIEWS = [
  { value: 'all', label: 'All Students' },
  { value: 'class', label: 'By Class' },
  { value: 'section', label: 'By Section' },
];

const StudentList = () => {
  const dispatch = useDispatch();
  const { items, loading, error, filters, fetchedAt, view, lookup } = useSelector(
    (state) => state.student
  );

  const [search, setSearch] = useState('');
  const [isActive, setIsActive] = useState(filters.is_active);
  const [studentType, setStudentType] = useState(filters.student_type);
  const [page, setPage] = useState(1);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    dispatch(fetchStudents(filters));
  }, [dispatch, filters]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearStudentError());
    }
  }, [error, dispatch]);

  const handleRefresh = () => {
    if (view === 'class') {
      dispatch(fetchStudentsByClass(lookup.classId));
    } else if (view === 'section') {
      dispatch(fetchStudentsBySection(lookup.sectionId));
    } else {
      dispatch(fetchStudents(filters));
    }
  };

  const handleViewChange = (next) => {
    dispatch(setView(next));
    setPage(1);
    setExpandedId(null);
    if (next === 'all') dispatch(fetchStudents(filters));
  };

  const handleLookupSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    setExpandedId(null);
    if (view === 'class') {
      dispatch(fetchStudentsByClass(lookup.classId.trim()));
    } else {
      dispatch(fetchStudentsBySection(lookup.sectionId.trim()));
    }
  };

  const handleLookupReset = () => {
    dispatch(setLookup({ classId: '', sectionId: '' }));
    handleViewChange('all');
  };

  const handleApply = (e) => {
    e.preventDefault();
    setPage(1);
    dispatch(setFilters({ is_active: isActive, student_type: studentType.trim() }));
  };

  const handleReset = () => {
    setSearch('');
    setIsActive('');
    setStudentType('');
    setPage(1);
    setExpandedId(null);
    dispatch(setFilters({ is_active: '', student_type: '' }));
  };

  const visible = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return items;
    return items.filter((student) =>
      [
        student.student_id,
        student.name_en,
        student.name_bn,
        student.mobile,
        student.email,
        student.father_name,
      ]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(term))
    );
  }, [items, search]);

  const totalPages = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const rows = visible.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

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
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Student List</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            All students for the tenant. Click a row to see the full record.
          </p>
        </div>
      </div>

      <div className="border-b border-slate-200 dark:border-slate-800">
        <nav className="flex gap-1 -mb-px">
          {VIEWS.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => handleViewChange(item.value)}
              className={cn(
                'px-4 py-2.5 text-sm font-medium border-b-2 transition-colors',
                view === item.value
                  ? 'border-slate-900 text-slate-900 dark:border-slate-100 dark:text-white'
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {view === 'class' && (
        <form
          onSubmit={handleLookupSubmit}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <FormField label="Class ID" name="class_id" helperText="GET /students/by-class">
              <Input
                id="class_id"
                value={lookup.classId}
                onChange={(e) => dispatch(setLookup({ classId: e.target.value }))}
                placeholder="e.g. 1"
                autoComplete="off"
              />
            </FormField>
            <Button type="submit" isLoading={loading} disabled={!lookup.classId.trim()}>
              Fetch Students
            </Button>
            <Button type="button" variant="outline" onClick={handleLookupReset}>
              Reset
            </Button>
          </div>
        </form>
      )}

      {view === 'section' && (
        <form
          onSubmit={handleLookupSubmit}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <FormField label="Section ID" name="section_id" helperText="GET /students/by-section">
              <Input
                id="section_id"
                value={lookup.sectionId}
                onChange={(e) => dispatch(setLookup({ sectionId: e.target.value }))}
                placeholder="e.g. 1"
                autoComplete="off"
              />
            </FormField>
            <Button type="submit" isLoading={loading} disabled={!lookup.sectionId.trim()}>
              Fetch Students
            </Button>
            <Button type="button" variant="outline" onClick={handleLookupReset}>
              Reset
            </Button>
          </div>
        </form>
      )}

      {view === 'all' && (
      <form
        onSubmit={handleApply}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <FormField label="Active Status" name="is_active">
            <select
              id="is_active"
              name="is_active"
              value={isActive}
              onChange={(e) => setIsActive(e.target.value)}
              className={cn(selectClass, 'dark:bg-slate-900')}
            >
              {ACTIVE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Student Type" name="student_type">
            <Input
              id="student_type"
              name="student_type"
              value={studentType}
              onChange={(e) => setStudentType(e.target.value)}
              placeholder="e.g. regular"
            />
          </FormField>

          <Button type="submit" isLoading={loading}>
            Apply Filters
          </Button>

          <Button type="button" variant="outline" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </form>
      )}

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search name, ID, mobile..."
              className="pl-9"
            />
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <Users className="h-4 w-4" />
              {visible.length} student{visible.length === 1 ? '' : 's'}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={loading}
            >
              <RefreshCw className={cn('h-4 w-4', loading && 'animate-spin')} />
              Refresh
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
              <tr>
                <th className="w-10 px-4 py-3" />
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Student ID</th>
                <th className="px-4 py-3 font-semibold">Gender</th>
                <th className="px-4 py-3 font-semibold">Date of Birth</th>
                <th className="px-4 py-3 font-semibold">Blood Group</th>
                <th className="px-4 py-3 font-semibold">Mobile</th>
                <th className="px-4 py-3 font-semibold">Type</th>
                <th className="px-4 py-3 font-semibold">Admission</th>
                <th className="px-4 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading && items.length === 0 ? (
                <tr>
                  <td colSpan={COLUMN_COUNT} className="px-6 py-12 text-center text-slate-500">
                    <Loader2 className="mx-auto h-6 w-6 animate-spin" />
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={COLUMN_COUNT} className="px-6 py-12 text-center text-slate-500">
                    No students found.
                  </td>
                </tr>
              ) : (
                rows.map((student) => {
                  const isExpanded = expandedId === student.id;
                  return (
                    <StudentRow
                      key={student.id}
                      student={student}
                      isExpanded={isExpanded}
                      onToggle={() => setExpandedId(isExpanded ? null : student.id)}
                    />
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {visible.length > PAGE_SIZE && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 dark:border-slate-800">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      {fetchedAt && (
        <p className="text-xs text-slate-400">Last synced {new Date(fetchedAt).toLocaleString()}</p>
      )}
    </div>
  );
};

const StudentRow = ({ student, isExpanded, onToggle }) => (
  <>
    <tr
      onClick={onToggle}
      className={cn(
        'cursor-pointer border-b border-slate-200 dark:border-slate-800 transition-colors',
        isExpanded ? 'bg-slate-50 dark:bg-slate-900/50' : 'hover:bg-slate-50 dark:hover:bg-slate-900/50'
      )}
    >
      <td className="px-4 py-4 text-slate-400">
        {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          {student.photo_url ? (
            <img
              src={student.photo_url}
              alt={student.name_en || 'Student'}
              className="h-8 w-8 rounded-full object-cover border border-slate-200 dark:border-slate-700"
            />
          ) : (
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white dark:bg-slate-50 dark:text-slate-900">
              {initialsOf(student)}
            </div>
          )}
          <div className="min-w-0">
            <div className="font-medium text-slate-900 dark:text-slate-200 truncate">
              {student.name_en || '—'}
            </div>
            {student.name_bn && <div className="text-xs text-slate-500">{student.name_bn}</div>}
          </div>
        </div>
      </td>
      <td className="px-4 py-4 font-medium text-slate-900 dark:text-slate-200">
        {student.student_id || '—'}
      </td>
      <td className="px-4 py-4 capitalize text-slate-600 dark:text-slate-300">
        {student.gender || '—'}
      </td>
      <td className="px-4 py-4 text-slate-600 dark:text-slate-300">
        {student.date_of_birth?.slice(0, 10) || '—'}
      </td>
      <td className="px-4 py-4 text-slate-600 dark:text-slate-300">{student.blood_group || '—'}</td>
      <td className="px-4 py-4 text-slate-600 dark:text-slate-300">{student.mobile || student.email || '—'}</td>
      <td className="px-4 py-4 capitalize text-slate-600 dark:text-slate-300">
        {student.student_type || '—'}
      </td>
      <td className="px-4 py-4 text-slate-600 dark:text-slate-300">
        {student.admission_date?.slice(0, 10) || '—'}
      </td>
      <td className="px-4 py-4">
        <StatusBadge status={student.is_active ? 'active' : 'inactive'}>
          {student.is_active ? 'Active' : 'Inactive'}
        </StatusBadge>
      </td>
    </tr>
    {isExpanded && (
      <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/30">
        <td colSpan={COLUMN_COUNT} className="px-6 py-5">
          <StudentDetails student={student} />
        </td>
      </tr>
    )}
  </>
);

const StudentDetails = ({ student }) => {
  const knownKeys = new Set(KNOWN_FIELDS.flatMap((field) => field.keys));
  const details = [
    ...KNOWN_FIELDS.filter((field) => field.keys.some((key) => isFilled(student[key]))),
    ...Object.entries(student)
      .filter(([key, value]) => !knownKeys.has(key) && key !== 'is_active' && isFilled(value))
      .map(([key]) => ({ label: key, keys: [key] })),
  ];

  return (
    <div className="space-y-4">
      <Link
        to={`/students/student-profile/${encodeURIComponent(student.id ?? student.student_id ?? '')}`}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-900 hover:underline dark:text-slate-100"
      >
        View full profile
      </Link>
      {details.length === 0 ? (
        <p className="text-sm text-slate-500">No additional details returned.</p>
      ) : (
        <dl className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-3">
          {details.map((field) => (
            <div key={field.label} className={cn('min-w-0', field.wide && 'col-span-2 md:col-span-3')}>
              <dt className="text-xs uppercase tracking-wide text-slate-400">{field.label}</dt>
              <dd className="mt-0.5 text-sm text-slate-700 dark:text-slate-200 break-words">
                {field.keys.map((key) => displayValue(student[key])).join(' / ')}
              </dd>
            </div>
          ))}
          <div className="min-w-0">
            <dt className="text-xs uppercase tracking-wide text-slate-400">Is Active</dt>
            <dd className="mt-0.5 text-sm text-slate-700 dark:text-slate-200">
              {displayValue(student.is_active)}
            </dd>
          </div>
        </dl>
      )}
    </div>
  );
};

export default StudentList;
