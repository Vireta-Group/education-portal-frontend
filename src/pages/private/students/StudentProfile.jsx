import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowLeft,
  GraduationCap,
  Loader2,
  Pencil,
  Search,
  Trash2,
  UserRound,
  Users,
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { Button } from '../../../components/ui/Button';
import { FormField } from '../../../components/common/FormField';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { Textarea } from '../../../components/ui/Textarea';
import { StatusBadge } from '../../../components/ui/StatusBadge';
import { GuardiansManager } from './components/GuardiansManager';
import {
  fetchStudentById,
  deleteStudent,
  updateStudent,
  clearStudentError,
  clearStudentMessage,
} from '../../../store/slices/studentSlice';

const DELETE_REASON_MAX = 500;

const GENDERS = ['male', 'female', 'other'];
const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const EDITABLE_FIELDS = [
  { key: 'name_en', label: 'Name (English)', maxLength: 200 },
  { key: 'name_bn', label: 'Name (Bangla)', maxLength: 200 },
  { key: 'name_ar', label: 'Name (Arabic)', maxLength: 200 },
  { key: 'father_name', label: 'Father Name', maxLength: 100 },
  { key: 'mother_name', label: 'Mother Name', maxLength: 100 },
  { key: 'religion', label: 'Religion' },
  { key: 'nationality', label: 'Nationality' },
  { key: 'birth_reg_no', label: 'Birth Reg. No', maxLength: 50 },
  { key: 'mobile', label: 'Mobile', maxLength: 20 },
  { key: 'email', label: 'Email', maxLength: 100 },
  { key: 'student_type', label: 'Student Type' },
  { key: 'roll_number', label: 'Roll Number' },
];

const toDraft = (student = {}) => ({
  name_en: student.name_en ?? '',
  name_bn: student.name_bn ?? '',
  name_ar: student.name_ar ?? '',
  father_name: student.father_name ?? '',
  mother_name: student.mother_name ?? '',
  date_of_birth: String(student.date_of_birth ?? '').slice(0, 10),
  gender: student.gender ?? '',
  blood_group: student.blood_group ?? '',
  religion: student.religion ?? '',
  nationality: student.nationality ?? '',
  birth_reg_no: student.birth_reg_no ?? '',
  mobile: student.mobile ?? '',
  email: student.email ?? '',
  current_address: student.current_address ?? '',
  permanent_address: student.permanent_address ?? '',
  photo_url: student.photo_url ?? '',
  student_type: student.student_type ?? '',
  is_active: student.is_active !== false,
  roll_number: student.roll_number ?? '',
});

const validateDraft = (draft) => {
  const errors = {};
  if (draft.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email)) {
    errors.email = 'Enter a valid email address';
  }
  if (draft.mobile && !/^[+\d][\d\s-]{4,19}$/.test(draft.mobile)) {
    errors.mobile = 'Enter a valid mobile number';
  }
  if (!draft.date_of_birth) errors.date_of_birth = 'Date of birth is required';
  return errors;
};

const display = (value) => {
  if (value === null || value === undefined || value === '') return '—';
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  return String(value);
};

const PERSONAL_FIELDS = [
  { key: 'student_id', label: 'Student ID' },
  { key: 'name_en', label: 'Name (English)' },
  { key: 'name_bn', label: 'Name (Bangla)' },
  { key: 'name_ar', label: 'Name (Arabic)' },
  { key: 'date_of_birth', label: 'Date of Birth' },
  { key: 'gender', label: 'Gender' },
  { key: 'blood_group', label: 'Blood Group' },
  { key: 'religion', label: 'Religion' },
  { key: 'nationality', label: 'Nationality' },
  { key: 'birth_reg_no', label: 'Birth Reg. No' },
];

const CONTACT_FIELDS = [
  { key: 'mobile', label: 'Mobile' },
  { key: 'email', label: 'Email' },
  { key: 'current_address', label: 'Current Address' },
  { key: 'permanent_address', label: 'Permanent Address' },
];

const ACADEMIC_FIELDS = [
  { key: 'roll_number', label: 'Roll Number' },
  { key: 'admission_date', label: 'Admission Date' },
  { key: 'student_type', label: 'Student Type' },
];

const DETAIL_FIELDS = [
  { key: 'id', label: 'Record ID' },
  { key: 'tenant_id', label: 'Tenant ID' },
  { key: 'branch_id', label: 'Branch ID' },
  { key: 'photo_url', label: 'Photo URL' },
  { key: 'father_name', label: 'Father Name' },
  { key: 'mother_name', label: 'Mother Name' },
];

const Section = ({ icon: Icon, title, children }) => (
  <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
    <div className="flex items-center gap-2 mb-4">
      <Icon size={18} className="text-slate-400" />
      <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {title}
      </h2>
    </div>
    {children}
  </section>
);

const FieldGrid = ({ fields, data }) => (
  <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {fields.map((field) => (
      <div key={field.key}>
        <dt className="text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
          {field.label}
        </dt>
        <dd className="mt-1 text-sm text-slate-900 dark:text-slate-100 break-words">
          {display(data[field.key])}
        </dd>
      </div>
    ))}
  </dl>
);

const StudentProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { studentId } = useParams();

  const { selected, detailLoading, deleting, updating, error, lastMessage } = useSelector(
    (state) => state.student
  );
  const [searchId, setSearchId] = useState(studentId ?? '');
  const [deleteReason, setDeleteReason] = useState('');
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(toDraft());
  const [draftErrors, setDraftErrors] = useState({});

  useEffect(() => {
    if (studentId) dispatch(fetchStudentById(studentId));
  }, [studentId, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearStudentError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (lastMessage) {
      toast.success(lastMessage);
      dispatch(clearStudentMessage());
    }
  }, [lastMessage, dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    const value = searchId.trim();
    if (!value) {
      toast.error('Enter a student id first.');
      return;
    }
    navigate(`/students/student-profile/${encodeURIComponent(value)}`);
  };

  const handleDelete = async () => {
    await dispatch(
      deleteStudent({ studentId: selected?.id ?? studentId, reason: deleteReason })
    );
    setConfirmingDelete(false);
    setDeleteReason('');
    navigate('/students/student-profile');
  };

  const startEditing = () => {
    setDraft(toDraft(selected));
    setDraftErrors({});
    setEditing(true);
  };

  const cancelEditing = () => {
    setEditing(false);
    setDraftErrors({});
  };

  const setField = (key, value) =>
    setDraft((prev) => {
      const next = { ...prev, [key]: value };
      setDraftErrors((errs) => ({ ...errs, [key]: undefined }));
      return next;
    });

  const handleSave = async (e) => {
    e.preventDefault();
    const errors = validateDraft(draft);
    setDraftErrors(errors);
    if (Object.keys(errors).length > 0) {
      toast.error('Please fix the highlighted fields.');
      return;
    }
    const result = await dispatch(
      updateStudent({ studentId: selected?.id ?? studentId, form: draft, original: selected })
    );
    if (updateStudent.fulfilled.match(result)) {
      setEditing(false);
      dispatch(fetchStudentById(selected?.id ?? studentId));
    }
  };

  const academicHistory = Array.isArray(selected?.academic_history)
    ? selected.academic_history
    : Array.isArray(selected?.academic_history?.data)
      ? selected.academic_history.data
      : [];

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
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Student Profile</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Full record with academic history and guardians.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSearch}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <FormField label="Student ID" name="studentId" helperText="GET /students/{student}">
            <Input
              id="studentId"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="e.g. 1"
              autoComplete="off"
            />
          </FormField>
          <Button type="submit" isLoading={detailLoading} disabled={!searchId.trim()}>
            Fetch Profile
          </Button>
          <Button type="button" variant="outline" onClick={() => setSearchId(studentId ?? '')}>
            Clear
          </Button>
        </div>
      </form>

      {!studentId && !selected && !detailLoading && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-10 flex flex-col items-center text-center">
          <Search size={32} className="text-slate-300 dark:text-slate-600" />
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            Enter a student id above to load the profile.
          </p>
        </div>
      )}

      {detailLoading && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-10 flex flex-col items-center">
          <Loader2 size={28} className="animate-spin text-slate-400" />
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Loading student...</p>
        </div>
      )}

      {!detailLoading && selected && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                {display(selected.name_en)}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {display(selected.student_id)} &middot; {display(selected.gender)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button type="button" variant="outline" onClick={startEditing} disabled={editing}>
                <Pencil size={16} />
                Edit Profile
              </Button>
              <StatusBadge
                status={
                  selected.is_active === false
                    ? 'inactive'
                    : selected.status
                      ? String(selected.status)
                      : 'active'
                }
              >
                {display(selected.status || (selected.is_active ? 'Active' : 'Inactive'))}
              </StatusBadge>
            </div>
          </div>

          {editing && (
            <form
              onSubmit={handleSave}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-5"
            >
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Only the fields you change are sent to the API. Roll number updates the current
                academic history record.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {EDITABLE_FIELDS.map((field) => (
                  <FormField
                    key={field.key}
                    label={field.label}
                    name={field.key}
                    error={draftErrors[field.key]}
                  >
                    <Input
                      id={field.key}
                      name={field.key}
                      maxLength={field.maxLength}
                      value={draft[field.key]}
                      onChange={(e) => setField(field.key, e.target.value)}
                      disabled={updating}
                    />
                  </FormField>
                ))}

                <FormField
                  label="Date of Birth"
                  name="date_of_birth"
                  error={draftErrors.date_of_birth}
                >
                  <Input
                    id="date_of_birth"
                    type="date"
                    value={draft.date_of_birth}
                    onChange={(e) => setField('date_of_birth', e.target.value)}
                    disabled={updating}
                  />
                </FormField>

                <FormField label="Gender" name="gender">
                  <Select
                    id="gender"
                    value={draft.gender}
                    onChange={(e) => setField('gender', e.target.value)}
                    disabled={updating}
                  >
                    <option value="">Select gender</option>
                    {GENDERS.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </Select>
                </FormField>

                <FormField label="Blood Group" name="blood_group">
                  <Select
                    id="blood_group"
                    value={draft.blood_group}
                    onChange={(e) => setField('blood_group', e.target.value)}
                    disabled={updating}
                  >
                    <option value="">Select blood group</option>
                    {BLOOD_GROUPS.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </Select>
                </FormField>

                <FormField label="Is Active" name="is_active">
                  <Select
                    id="is_active"
                    value={draft.is_active ? '1' : '0'}
                    onChange={(e) => setField('is_active', e.target.value === '1')}
                    disabled={updating}
                  >
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </Select>
                </FormField>
              </div>

              <FormField label="Current Address" name="current_address">
                <Textarea
                  id="current_address"
                  value={draft.current_address}
                  onChange={(e) => setField('current_address', e.target.value)}
                  disabled={updating}
                />
              </FormField>

              <FormField label="Permanent Address" name="permanent_address">
                <Textarea
                  id="permanent_address"
                  value={draft.permanent_address}
                  onChange={(e) => setField('permanent_address', e.target.value)}
                  disabled={updating}
                />
              </FormField>

              <FormField label="Photo URL" name="photo_url">
                <Input
                  id="photo_url"
                  value={draft.photo_url}
                  onChange={(e) => setField('photo_url', e.target.value)}
                  disabled={updating}
                />
              </FormField>

              <div className="flex items-center gap-3">
                <Button type="submit" isLoading={updating}>
                  Save Changes
                </Button>
                <Button type="button" variant="outline" onClick={cancelEditing} disabled={updating}>
                  Cancel
                </Button>
              </div>
            </form>
          )}

          {!editing && (
            <div className="space-y-6">
              <Section icon={UserRound} title="Personal Information">
                <FieldGrid fields={PERSONAL_FIELDS} data={selected} />
              </Section>

              <Section icon={Users} title="Contact Information">
                <FieldGrid fields={CONTACT_FIELDS} data={selected} />
              </Section>

              <Section icon={GraduationCap} title="Academic Summary">
                <FieldGrid fields={ACADEMIC_FIELDS} data={selected} />
              </Section>

              {academicHistory.length > 0 && (
                <Section icon={GraduationCap} title="Academic History">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800 text-left">
                          <th className="py-2 pr-4 font-medium text-slate-500">Academic Year</th>
                          <th className="py-2 pr-4 font-medium text-slate-500">Class</th>
                          <th className="py-2 pr-4 font-medium text-slate-500">Section</th>
                          <th className="py-2 pr-4 font-medium text-slate-500">Roll</th>
                          <th className="py-2 font-medium text-slate-500">Result</th>
                        </tr>
                      </thead>
                      <tbody>
                        {academicHistory.map((row, index) => (
                          <tr
                            key={row.id ?? index}
                            className="border-b border-slate-100 dark:border-slate-800/60"
                          >
                            <td className="py-2 pr-4">
                              {display(row.year_name ?? row.academic_year_name ?? row.academic_year_id)}
                            </td>
                            <td className="py-2 pr-4">{display(row.class_name ?? row.school_class_id)}</td>
                            <td className="py-2 pr-4">
                              {display(row.section_name ?? row.school_section_id)}
                            </td>
                            <td className="py-2 pr-4">{display(row.roll_number)}</td>
                            <td className="py-2">{display(row.result ?? row.grade)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Section>
              )}

              <GuardiansManager studentId={selected.id ?? studentId} />

              <Section icon={UserRound} title="Record Information">
                <FieldGrid fields={DETAIL_FIELDS} data={selected} />
              </Section>

              <section className="border border-red-200 dark:border-red-900/60 bg-red-50/40 dark:bg-red-950/20 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle size={18} className="text-red-500" />
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-red-600 dark:text-red-400">
                    Danger Zone
                  </h2>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                  This soft-deletes the student record. The record stays in the database but is hidden
                  from active lists.
                </p>

                {!confirmingDelete ? (
                  <Button
                    type="button"
                    variant="destructive"
                    isLoading={deleting}
                    onClick={() => setConfirmingDelete(true)}
                  >
                    <Trash2 size={16} />
                    Delete Student
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <FormField
                      label="Reason (optional)"
                      name="delete_reason"
                      helperText={`${deleteReason.length}/${DELETE_REASON_MAX} characters. Sent as null when empty.`}
                    >
                      <Textarea
                        id="delete_reason"
                        rows={3}
                        maxLength={DELETE_REASON_MAX}
                        value={deleteReason}
                        onChange={(e) => setDeleteReason(e.target.value)}
                        placeholder="e.g. duplicate admission record"
                        disabled={deleting}
                      />
                    </FormField>
                    <div className="flex items-center gap-3">
                      <Button
                        type="button"
                        variant="destructive"
                        isLoading={deleting}
                        onClick={handleDelete}
                      >
                        <Trash2 size={16} />
                        Confirm Delete
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        disabled={deleting}
                        onClick={() => {
                          setConfirmingDelete(false);
                          setDeleteReason('');
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </section>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentProfile;
