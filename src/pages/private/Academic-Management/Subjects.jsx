import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Power, Pencil, Trash2, Eye, Loader2, XCircle, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { Button } from '../../../components/ui/Button';
import { FormField } from '../../../components/common/FormField';
import { Input } from '../../../components/ui/Input';
import { StatusBadge } from '../../../components/ui/StatusBadge';
import {
  fetchSubjects,
  fetchSubject,
  createSubject,
  updateSubject,
  activateSubject,
  inactivateSubject,
  deleteSubject,
  clearSubjectError,
  clearSubjectMessage,
} from '../../../store/slices/Academic-Management/subjectSlice';

const SUBJECT_TYPES = ['theory', 'practical', 'both'];

const selectCls =
  'flex h-9 w-full rounded-md border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 dark:border-slate-800 dark:focus-visible:ring-slate-300';
const textareaCls =
  'flex w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 dark:border-slate-800 dark:focus-visible:ring-slate-300';

const capitalize = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : '');

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

const DetailRow = ({ label, value }) => (
  <div className="flex justify-between gap-4 py-2 border-b border-slate-100 dark:border-slate-800 last:border-0">
    <span className="text-sm text-slate-500 dark:text-slate-400">{label}</span>
    <span className="text-sm font-medium text-slate-900 dark:text-slate-200 text-right">{value ?? '—'}</span>
  </div>
);

const emptySubjectForm = { subject_name: '', subject_name_bn: '', subject_code: '', subject_type: 'theory', credit_hour: '', is_optional: false };

const Subjects = () => {
  const dispatch = useDispatch();
  const { subjects, currentSubject, loading, error, lastMessage } = useSelector((state) => state.academicSubject);

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptySubjectForm);
  const [viewing, setViewing] = useState(null);
  const [editing, setEditing] = useState(null);
  const [editForm, setEditForm] = useState(emptySubjectForm);
  const [deleting, setDeleting] = useState(null);
  const [deleteReason, setDeleteReason] = useState('');
  const [actionId, setActionId] = useState(null);

  useEffect(() => {
    dispatch(fetchSubjects());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearSubjectError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (lastMessage) {
      toast.success(lastMessage);
      dispatch(clearSubjectMessage());
    }
  }, [lastMessage, dispatch]);

  const handleInput = (setter) => (e) => {
    const { name, value, type, checked } = e.target;
    setter((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const payload = {
      subject_name: form.subject_name,
      subject_name_bn: form.subject_name_bn || null,
      subject_code: form.subject_code || null,
      subject_type: form.subject_type || null,
      credit_hour: form.credit_hour === '' ? null : Number(form.credit_hour),
      is_optional: form.is_optional || null,
    };
    const result = await dispatch(createSubject(payload));
    if (result.meta.requestStatus === 'fulfilled') {
      setForm(emptySubjectForm);
      setShowForm(false);
      dispatch(fetchSubjects());
    }
  };

  const handleView = async (sub) => {
    setViewing(sub.id);
    dispatch(fetchSubject(sub.id));
  };

  const openEdit = (sub) => {
    setEditing(sub);
    setEditForm({
      subject_name: sub.subject_name,
      subject_name_bn: sub.subject_name_bn || '',
      subject_code: sub.subject_code || '',
      subject_type: sub.subject_type || 'theory',
      credit_hour: sub.credit_hour != null ? String(sub.credit_hour) : '',
      is_optional: !!sub.is_optional,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = {};
    if (editForm.subject_name !== editing.subject_name) data.subject_name = editForm.subject_name;
    if ((editForm.subject_name_bn || null) !== (editing.subject_name_bn || null)) {
      data.subject_name_bn = editForm.subject_name_bn || null;
    }
    if ((editForm.subject_code || null) !== (editing.subject_code || null)) {
      data.subject_code = editForm.subject_code || null;
    }
    if ((editForm.subject_type || null) !== (editing.subject_type || null)) {
      data.subject_type = editForm.subject_type || null;
    }
    const editCredit = editForm.credit_hour === '' ? null : Number(editForm.credit_hour);
    const origCredit = editing.credit_hour != null ? Number(editing.credit_hour) : null;
    if (editCredit !== origCredit) data.credit_hour = editCredit;
    if (!!editForm.is_optional !== !!editing.is_optional) data.is_optional = !!editForm.is_optional;
    if (Object.keys(data).length === 0) {
      setEditing(null);
      return;
    }
    const result = await dispatch(updateSubject({ id: editing.id, data }));
    if (result.meta.requestStatus === 'fulfilled') {
      setEditing(null);
      dispatch(fetchSubjects());
    }
  };

  const handleToggle = async (sub) => {
    setActionId(sub.id);
    const result = await dispatch(sub.is_active ? inactivateSubject(sub.id) : activateSubject(sub.id));
    setActionId(null);
    if (result.meta.requestStatus === 'fulfilled') dispatch(fetchSubjects());
  };

  const handleDelete = async () => {
    setActionId(deleting.id);
    const result = await dispatch(deleteSubject({ id: deleting.id, reason: deleteReason }));
    setActionId(null);
    if (result.meta.requestStatus === 'fulfilled') {
      setDeleting(null);
      setDeleteReason('');
      dispatch(fetchSubjects());
    }
  };

  const detail = viewing && currentSubject?.id === viewing ? currentSubject : null;

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
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Subjects</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Manage subjects with type, credit hour and optional flag.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-end">
        <Button onClick={() => setShowForm((s) => !s)}>
          {showForm ? <XCircle className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
          {showForm ? 'Cancel' : 'New Subject'}
        </Button>
      </div>

      {showForm && (
        <form
          onSubmit={handleCreate}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField label="Subject Name" name="subject_name" required>
              <Input id="subject_name" name="subject_name" value={form.subject_name} onChange={handleInput(setForm)} placeholder="e.g. Mathematics" required maxLength={100} />
            </FormField>
            <FormField label="Subject Name (Bangla)" name="subject_name_bn">
              <Input id="subject_name_bn" name="subject_name_bn" value={form.subject_name_bn} onChange={handleInput(setForm)} placeholder="e.g. গণিত" maxLength={200} />
            </FormField>
            <FormField label="Subject Code" name="subject_code">
              <Input id="subject_code" name="subject_code" value={form.subject_code} onChange={handleInput(setForm)} placeholder="e.g. MATH-101" maxLength={50} />
            </FormField>
            <FormField label="Subject Type" name="subject_type">
              <select id="subject_type" name="subject_type" value={form.subject_type} onChange={handleInput(setForm)} className={selectCls}>
                {SUBJECT_TYPES.map((t) => (
                  <option key={t} value={t}>{capitalize(t)}</option>
                ))}
              </select>
            </FormField>
            <FormField label="Credit Hour" name="credit_hour" helperText="0 to 99.99">
              <Input id="credit_hour" name="credit_hour" type="number" step="0.01" min={0} max={99.99} value={form.credit_hour} onChange={handleInput(setForm)} placeholder="e.g. 2.5" />
            </FormField>
            <div className="flex items-end pb-1.5">
              <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                <input
                  type="checkbox"
                  name="is_optional"
                  checked={form.is_optional}
                  onChange={handleInput(setForm)}
                  className="rounded border-slate-300"
                />
                Optional subject
              </label>
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit" isLoading={loading}>Create Subject</Button>
          </div>
        </form>
      )}

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
              <tr>
                <th className="px-6 py-3 font-semibold">Subject</th>
                <th className="px-6 py-3 font-semibold">Code</th>
                <th className="px-6 py-3 font-semibold">Type</th>
                <th className="px-6 py-3 font-semibold">Credit</th>
                <th className="px-6 py-3 font-semibold">Optional</th>
                <th className="px-6 py-3 font-semibold">Status</th>
                <th className="px-6 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && subjects.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                    <Loader2 className="mx-auto h-6 w-6 animate-spin" />
                  </td>
                </tr>
              ) : subjects.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-500">No subjects found.</td>
                </tr>
              ) : (
                subjects.map((sub) => (
                  <tr key={sub.id} className="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900 dark:text-slate-200">{sub.subject_name}</div>
                      {sub.subject_name_bn && <div className="text-xs text-slate-500">{sub.subject_name_bn}</div>}
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{sub.subject_code || '—'}</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{capitalize(sub.subject_type)}</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{sub.credit_hour ?? '—'}</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{sub.is_optional ? 'Yes' : 'No'}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={sub.is_active ? 'active' : 'inactive'}>
                        {sub.is_active ? 'Active' : 'Inactive'}
                      </StatusBadge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleView(sub)} title="View" className="text-blue-500 hover:text-blue-600">
                          <Eye size={14} />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => openEdit(sub)} title="Edit" className="text-slate-500 hover:text-slate-700">
                          <Pencil size={14} />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          isLoading={loading && actionId === sub.id}
                          onClick={() => handleToggle(sub)}
                          title={sub.is_active ? 'Inactivate' : 'Activate'}
                          className={sub.is_active ? 'text-red-500 hover:text-red-600' : 'text-emerald-600 hover:text-emerald-500'}
                        >
                          <Power size={14} />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => setDeleting(sub)} title="Delete" className="text-red-500 hover:text-red-600">
                          <Trash2 size={14} />
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

      <Modal open={!!viewing} title="Subject Details" onClose={() => setViewing(null)}>
        {detail ? (
          <div>
            <DetailRow label="Subject Name" value={detail.subject_name} />
            <DetailRow label="Subject Name (Bangla)" value={detail.subject_name_bn} />
            <DetailRow label="Subject Code" value={detail.subject_code} />
            <DetailRow label="Subject Type" value={capitalize(detail.subject_type)} />
            <DetailRow label="Credit Hour" value={detail.credit_hour} />
            <DetailRow label="Optional" value={detail.is_optional ? 'Yes' : 'No'} />
            <DetailRow
              label="Status"
              value={
                <StatusBadge status={detail.is_active ? 'active' : 'inactive'}>
                  {detail.is_active ? 'Active' : 'Inactive'}
                </StatusBadge>
              }
            />
            <DetailRow label="Record Status" value={detail.status} />
            <DetailRow label="Branch ID" value={detail.branch_id} />
            <DetailRow label="Tenant ID" value={detail.tenant_id} />
          </div>
        ) : (
          <div className="py-8 text-center text-slate-500">
            <Loader2 className="mx-auto h-6 w-6 animate-spin" />
          </div>
        )}
      </Modal>

      <Modal open={!!editing} title={`Edit Subject: ${editing?.subject_name || ''}`} onClose={() => setEditing(null)}>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField label="Subject Name" name="edit_subject_name" required>
              <Input name="subject_name" value={editForm.subject_name} onChange={handleInput(setEditForm)} required maxLength={100} />
            </FormField>
            <FormField label="Subject Name (Bangla)" name="edit_subject_name_bn">
              <Input name="subject_name_bn" value={editForm.subject_name_bn} onChange={handleInput(setEditForm)} maxLength={200} />
            </FormField>
            <FormField label="Subject Code" name="edit_subject_code">
              <Input name="subject_code" value={editForm.subject_code} onChange={handleInput(setEditForm)} maxLength={50} />
            </FormField>
            <FormField label="Subject Type" name="edit_subject_type">
              <select name="subject_type" value={editForm.subject_type} onChange={handleInput(setEditForm)} className={selectCls}>
                {SUBJECT_TYPES.map((t) => (
                  <option key={t} value={t}>{capitalize(t)}</option>
                ))}
              </select>
            </FormField>
            <FormField label="Credit Hour" name="edit_credit_hour">
              <Input name="credit_hour" type="number" step="0.01" min={0} max={99.99} value={editForm.credit_hour} onChange={handleInput(setEditForm)} />
            </FormField>
            <div className="flex items-end pb-1.5">
              <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                <input
                  type="checkbox"
                  name="is_optional"
                  checked={editForm.is_optional}
                  onChange={handleInput(setEditForm)}
                  className="rounded border-slate-300"
                />
                Optional subject
              </label>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
            <Button type="submit" isLoading={loading && actionId === editing?.id}>Save Changes</Button>
          </div>
        </form>
      </Modal>

      <Modal open={!!deleting} title={`Delete Subject: ${deleting?.subject_name || ''}`} onClose={() => setDeleting(null)}>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
          This subject will be removed from lists. You may record a reason (optional).
        </p>
        <FormField label="Reason" name="delete_reason">
          <textarea
            name="delete_reason"
            value={deleteReason}
            onChange={(e) => setDeleteReason(e.target.value)}
            maxLength={500}
            rows={3}
            className={textareaCls}
          />
        </FormField>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => setDeleting(null)}>Cancel</Button>
          <Button variant="destructive" onClick={handleDelete} isLoading={loading && actionId === deleting?.id}>Delete</Button>
        </div>
      </Modal>
    </div>
  );
};

export default Subjects;
