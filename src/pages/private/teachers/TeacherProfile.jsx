import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Power, Pencil, Eye, Loader2, XCircle, X, Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { Button } from '../../../components/ui/Button';
import { FormField } from '../../../components/common/FormField';
import { Input } from '../../../components/ui/Input';
import { StatusBadge } from '../../../components/ui/StatusBadge';
import { DatePicker } from '../../../components/ui/DatePicker';
import {
  fetchTeachers,
  fetchTeacher,
  createTeacher,
  updateTeacher,
  activateTeacher,
  inactivateTeacher,
  clearTeacherError,
  clearTeacherMessage,
} from '../../../store/slices/teacher-management/teacherSlice';
import {
  fetchSubjectAssignments,
  fetchClassTeacherAssignments,
  clearAssignmentError,
  clearAssignmentMessage,
} from '../../../store/slices/teacher-management/teacherAssignmentSlice';
import {
  fetchQualifications,
  fetchTrainings,
  fetchExperiences,
  fetchTeacherDocuments,
  clearCredentialError,
  clearCredentialMessage,
} from '../../../store/slices/teacher-management/teacherCredentialSlice';
import {
  fetchAcademicYears,
} from '../../../store/slices/Academic-Management/academicYearSlice';
import {
  fetchClasses,
} from '../../../store/slices/Academic-Management/classSlice';
import {
  fetchSections,
} from '../../../store/slices/Academic-Management/sectionSlice';
import {
  fetchSubjects,
} from '../../../store/slices/Academic-Management/subjectSlice';
import TeacherDetailModal from './TeacherDetailModal';

const EMPLOYMENT_TYPES = ['full_time', 'part_time', 'contractual', 'visiting', 'mpo', 'non_mpo'];

const selectCls =
  'flex h-9 w-full rounded-md border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 dark:border-slate-800 dark:focus-visible:ring-slate-300';

const capitalize = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1).replace(/_/g, ' ') : '');

const emptyCreateForm = {
  name_en: '',
  name_bn: '',
  email: '',
  phone: '',
  designation: '',
  department: '',
  employment_type: 'full_time',
};

const emptyEditForm = {
  designation: '',
  department: '',
  employment_type: 'full_time',
  salary_grade: '',
  tin_number: '',
  emergency_contact_name: '',
  emergency_contact_phone: '',
  emergency_contact_relation: '',
};

const TeacherProfile = () => {
  const dispatch = useDispatch();
  const { teachers, loading, error, lastMessage } = useSelector((state) => state.teacher);

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyCreateForm);
  const [viewing, setViewing] = useState(null);
  const [editing, setEditing] = useState(null);
  const [editForm, setEditForm] = useState(emptyEditForm);
  const [actionId, setActionId] = useState(null);

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearTeacherError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (lastMessage) {
      toast.success(lastMessage);
      dispatch(clearTeacherMessage());
    }
  }, [lastMessage, dispatch]);

  const handleInput = (setter) => (e) => {
    const { name, value } = e.target;
    setter((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const payload = {
      name_en: form.name_en,
      email: form.email,
      phone: form.phone,
      designation: form.designation,
      employment_type: form.employment_type,
      name_bn: form.name_bn || null,
      department: form.department || null,
    };
    const result = await dispatch(createTeacher(payload));
    if (result.meta.requestStatus === 'fulfilled') {
      setForm(emptyCreateForm);
      setShowForm(false);
      dispatch(fetchTeachers());
    }
  };

  const openView = (t) => {
    setViewing(t.id);
    dispatch(fetchTeacher(t.id));
    // Load all detail data + academic dropdown sources
    dispatch(fetchSubjectAssignments(t.id));
    dispatch(fetchClassTeacherAssignments());
    dispatch(fetchQualifications(t.id));
    dispatch(fetchTrainings(t.id));
    dispatch(fetchExperiences(t.id));
    dispatch(fetchTeacherDocuments(t.id));
    dispatch(fetchAcademicYears());
    dispatch(fetchClasses());
    dispatch(fetchSections());
    dispatch(fetchSubjects());
  };

  const openEdit = (t) => {
    setEditing(t);
    setEditForm({
      designation: t.designation || '',
      department: t.department || '',
      employment_type: t.employment_type || 'full_time',
      salary_grade: t.salary_grade || '',
      tin_number: t.tin_number || '',
      emergency_contact_name: t.emergency_contact_name || '',
      emergency_contact_phone: t.emergency_contact_phone || '',
      emergency_contact_relation: t.emergency_contact_relation || '',
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = {};
    if (editForm.designation !== (editing.designation || '')) data.designation = editForm.designation;
    if (editForm.department !== (editing.department || '')) data.department = editForm.department || null;
    if (editForm.employment_type !== editing.employment_type) data.employment_type = editForm.employment_type;
    if (editForm.salary_grade !== (editing.salary_grade || '')) data.salary_grade = editForm.salary_grade || null;
    if (editForm.tin_number !== (editing.tin_number || '')) data.tin_number = editForm.tin_number || null;
    if (editForm.emergency_contact_name !== (editing.emergency_contact_name || '')) data.emergency_contact_name = editForm.emergency_contact_name || null;
    if (editForm.emergency_contact_phone !== (editing.emergency_contact_phone || '')) data.emergency_contact_phone = editForm.emergency_contact_phone || null;
    if (editForm.emergency_contact_relation !== (editing.emergency_contact_relation || '')) data.emergency_contact_relation = editForm.emergency_contact_relation || null;
    if (Object.keys(data).length === 0) {
      setEditing(null);
      return;
    }
    const result = await dispatch(updateTeacher({ id: editing.id, data }));
    if (result.meta.requestStatus === 'fulfilled') {
      setEditing(null);
      dispatch(fetchTeachers());
    }
  };

  const handleToggle = async (t) => {
    setActionId(t.id);
    const result = await dispatch(t.is_active ? inactivateTeacher(t.id) : activateTeacher(t.id));
    setActionId(null);
    if (result.meta.requestStatus === 'fulfilled') dispatch(fetchTeachers());
  };

  // Also surface assignment/credential errors as toasts inside this page
  const assignmentError = useSelector((s) => s.teacherAssignment.error);
  const credentialError = useSelector((s) => s.teacherCredential.error);
  useEffect(() => {
    if (assignmentError) {
      toast.error(assignmentError);
      dispatch(clearAssignmentError());
    }
  }, [assignmentError, dispatch]);
  useEffect(() => {
    if (credentialError) {
      toast.error(credentialError);
      dispatch(clearCredentialError());
    }
  }, [credentialError, dispatch]);

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
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Teacher Profile</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Manage teachers, qualifications, trainings, experiences, documents and assignments.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-end">
        <Button onClick={() => setShowForm((s) => !s)}>
          {showForm ? <XCircle className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
          {showForm ? 'Cancel' : 'New Teacher'}
        </Button>
      </div>

      {showForm && (
        <form
          onSubmit={handleCreate}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField label="Name (English)" name="name_en" required>
              <Input id="name_en" name="name_en" value={form.name_en} onChange={handleInput(setForm)} placeholder="e.g. John Doe" required maxLength={200} />
            </FormField>
            <FormField label="Name (Bangla)" name="name_bn">
              <Input id="name_bn" name="name_bn" value={form.name_bn} onChange={handleInput(setForm)} placeholder="e.g. জন ডো" maxLength={200} />
            </FormField>
            <FormField label="Email" name="email" required>
              <Input id="email" name="email" type="email" value={form.email} onChange={handleInput(setForm)} placeholder="teacher@school.com" required />
            </FormField>
            <FormField label="Phone" name="phone" required>
              <Input id="phone" name="phone" value={form.phone} onChange={handleInput(setForm)} placeholder="+8801XXXXXXXXX" required maxLength={20} />
            </FormField>
            <FormField label="Designation" name="designation" required>
              <Input id="designation" name="designation" value={form.designation} onChange={handleInput(setForm)} placeholder="e.g. Assistant Teacher" required maxLength={100} />
            </FormField>
            <FormField label="Department" name="department">
              <Input id="department" name="department" value={form.department} onChange={handleInput(setForm)} placeholder="e.g. Science" maxLength={100} />
            </FormField>
            <FormField label="Employment Type" name="employment_type" required>
              <select id="employment_type" name="employment_type" value={form.employment_type} onChange={handleInput(setForm)} className={selectCls} required>
                {EMPLOYMENT_TYPES.map((t) => (
                  <option key={t} value={t}>{capitalize(t)}</option>
                ))}
              </select>
            </FormField>
          </div>
          <p className="text-xs text-slate-500">Creating a teacher also creates their user account.</p>
          <div className="flex justify-end">
            <Button type="submit" isLoading={loading}>Create Teacher</Button>
          </div>
        </form>
      )}

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
              <tr>
                <th className="px-6 py-3 font-semibold">Employee ID</th>
                <th className="px-6 py-3 font-semibold">Designation</th>
                <th className="px-6 py-3 font-semibold">Department</th>
                <th className="px-6 py-3 font-semibold">Employment</th>
                <th className="px-6 py-3 font-semibold">Status</th>
                <th className="px-6 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && teachers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    <Loader2 className="mx-auto h-6 w-6 animate-spin" />
                  </td>
                </tr>
              ) : teachers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">No teachers found.</td>
                </tr>
              ) : (
                teachers.map((t) => (
                  <tr key={t.id} className="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900 dark:text-slate-200">{t.employee_id}</div>
                      <div className="text-xs text-slate-500">User: {t.user_id?.slice(0, 8)}…</div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{t.designation || '—'}</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{t.department || '—'}</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{capitalize(t.employment_type)}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={t.is_active ? 'active' : 'inactive'}>
                        {t.is_active ? 'Active' : 'Inactive'}
                      </StatusBadge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => openView(t)} title="View" className="text-blue-500 hover:text-blue-600">
                          <Eye size={14} />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => openEdit(t)} title="Edit" className="text-slate-500 hover:text-slate-700">
                          <Pencil size={14} />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          isLoading={loading && actionId === t.id}
                          onClick={() => handleToggle(t)}
                          title={t.is_active ? 'Inactivate' : 'Activate'}
                          className={t.is_active ? 'text-red-500 hover:text-red-600' : 'text-emerald-600 hover:text-emerald-500'}
                        >
                          <Power size={14} />
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

      {viewing && (
        <TeacherDetailModal teacherId={viewing} onClose={() => setViewing(null)} />
      )}

      {editing && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4"
          onClick={() => setEditing(null)}
        >
          <div
            className="w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Edit Teacher: {editing.employee_id}
              </h2>
              <button
                onClick={() => setEditing(null)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField label="Designation" name="edit_designation">
                  <Input name="designation" value={editForm.designation} onChange={handleInput(setEditForm)} maxLength={100} />
                </FormField>
                <FormField label="Department" name="edit_department">
                  <Input name="department" value={editForm.department} onChange={handleInput(setEditForm)} maxLength={100} />
                </FormField>
                <FormField label="Employment Type" name="edit_employment_type">
                  <select name="employment_type" value={editForm.employment_type} onChange={handleInput(setEditForm)} className={selectCls}>
                    {EMPLOYMENT_TYPES.map((t) => (
                      <option key={t} value={t}>{capitalize(t)}</option>
                    ))}
                  </select>
                </FormField>
                <FormField label="Salary Grade" name="edit_salary_grade">
                  <Input name="salary_grade" value={editForm.salary_grade} onChange={handleInput(setEditForm)} maxLength={50} />
                </FormField>
                <FormField label="TIN Number" name="edit_tin_number">
                  <Input name="tin_number" value={editForm.tin_number} onChange={handleInput(setEditForm)} maxLength={50} />
                </FormField>
                <FormField label="Emergency Contact Name" name="edit_emergency_contact_name">
                  <Input name="emergency_contact_name" value={editForm.emergency_contact_name} onChange={handleInput(setEditForm)} maxLength={100} />
                </FormField>
                <FormField label="Emergency Contact Phone" name="edit_emergency_contact_phone">
                  <Input name="emergency_contact_phone" value={editForm.emergency_contact_phone} onChange={handleInput(setEditForm)} maxLength={20} />
                </FormField>
                <FormField label="Emergency Contact Relation" name="edit_emergency_contact_relation">
                  <Input name="emergency_contact_relation" value={editForm.emergency_contact_relation} onChange={handleInput(setEditForm)} maxLength={50} />
                </FormField>
              </div>
              <p className="text-xs text-slate-500">Name, email and phone cannot be changed here.</p>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
                <Button type="submit" isLoading={loading}>Save Changes</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherProfile;
