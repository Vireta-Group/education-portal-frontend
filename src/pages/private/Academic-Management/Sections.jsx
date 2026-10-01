import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Power, Pencil, Trash2, Eye, Loader2, XCircle, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { Button } from '../../../components/ui/Button';
import { FormField } from '../../../components/common/FormField';
import { Input } from '../../../components/ui/Input';
import { StatusBadge } from '../../../components/ui/StatusBadge';
import { fetchClasses } from '../../../store/slices/Academic-Management/classSlice';
import {
  fetchSections,
  fetchSection,
  createSection,
  updateSection,
  activateSection,
  inactivateSection,
  deleteSection,
  clearSectionError,
  clearSectionMessage,
} from '../../../store/slices/Academic-Management/sectionSlice';

const SHIFTS = ['morning', 'day', 'evening'];

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

const emptySectionForm = { school_class_id: '', section_name: '', section_name_bn: '', max_capacity: '', room_number: '', shift: 'morning' };

const Sections = () => {
  const dispatch = useDispatch();
  const { classes } = useSelector((state) => state.academicClass);
  const { sections, currentSection, loading, error, lastMessage } = useSelector((state) => state.academicSection);

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptySectionForm);
  const [viewing, setViewing] = useState(null);
  const [editing, setEditing] = useState(null);
  const [editForm, setEditForm] = useState(emptySectionForm);
  const [deleting, setDeleting] = useState(null);
  const [deleteReason, setDeleteReason] = useState('');
  const [actionId, setActionId] = useState(null);

  useEffect(() => {
    dispatch(fetchClasses());
    dispatch(fetchSections());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearSectionError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (lastMessage) {
      toast.success(lastMessage);
      dispatch(clearSectionMessage());
    }
  }, [lastMessage, dispatch]);

  const handleInput = (setter) => (e) => {
    const { name, value } = e.target;
    setter((prev) => ({ ...prev, [name]: value }));
  };

  const className = (id) => classes.find((c) => c.id === id)?.class_name || '—';

  const handleCreate = async (e) => {
    e.preventDefault();
    const payload = {
      school_class_id: form.school_class_id,
      section_name: form.section_name,
      section_name_bn: form.section_name_bn || null,
      max_capacity: form.max_capacity ? Number(form.max_capacity) : null,
      room_number: form.room_number || null,
      shift: form.shift || null,
    };
    const result = await dispatch(createSection(payload));
    if (result.meta.requestStatus === 'fulfilled') {
      setForm(emptySectionForm);
      setShowForm(false);
      dispatch(fetchSections());
    }
  };

  const handleView = async (sec) => {
    setViewing(sec.id);
    dispatch(fetchSection(sec.id));
  };

  const openEdit = (sec) => {
    setEditing(sec);
    setEditForm({
      school_class_id: sec.school_class_id,
      section_name: sec.section_name,
      section_name_bn: sec.section_name_bn || '',
      max_capacity: sec.max_capacity != null ? String(sec.max_capacity) : '',
      room_number: sec.room_number || '',
      shift: sec.shift || 'morning',
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = {};
    if (editForm.school_class_id !== editing.school_class_id) data.school_class_id = editForm.school_class_id;
    if (editForm.section_name !== editing.section_name) data.section_name = editForm.section_name;
    if ((editForm.section_name_bn || null) !== (editing.section_name_bn || null)) {
      data.section_name_bn = editForm.section_name_bn || null;
    }
    const editCap = editForm.max_capacity ? Number(editForm.max_capacity) : null;
    if (editCap !== (editing.max_capacity ?? null)) data.max_capacity = editCap;
    if ((editForm.room_number || null) !== (editing.room_number || null)) {
      data.room_number = editForm.room_number || null;
    }
    if ((editForm.shift || null) !== (editing.shift || null)) data.shift = editForm.shift || null;
    if (Object.keys(data).length === 0) {
      setEditing(null);
      return;
    }
    const result = await dispatch(updateSection({ id: editing.id, data }));
    if (result.meta.requestStatus === 'fulfilled') {
      setEditing(null);
      dispatch(fetchSections());
    }
  };

  const handleToggle = async (sec) => {
    setActionId(sec.id);
    const result = await dispatch(sec.is_active ? inactivateSection(sec.id) : activateSection(sec.id));
    setActionId(null);
    if (result.meta.requestStatus === 'fulfilled') dispatch(fetchSections());
  };

  const handleDelete = async () => {
    setActionId(deleting.id);
    const result = await dispatch(deleteSection({ id: deleting.id, reason: deleteReason }));
    setActionId(null);
    if (result.meta.requestStatus === 'fulfilled') {
      setDeleting(null);
      setDeleteReason('');
      dispatch(fetchSections());
    }
  };

  const detail = viewing && currentSection?.id === viewing ? currentSection : null;

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
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Sections</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Manage class sections with shift and capacity.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-end">
        <Button onClick={() => setShowForm((s) => !s)}>
          {showForm ? <XCircle className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
          {showForm ? 'Cancel' : 'New Section'}
        </Button>
      </div>

      {showForm && (
        <form
          onSubmit={handleCreate}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField label="Class" name="school_class_id" required>
              <select id="school_class_id" name="school_class_id" value={form.school_class_id} onChange={handleInput(setForm)} className={selectCls} required>
                <option value="">Select class</option>
                {classes.map((c) => (
                  <option key={c.id} value={c.id}>{c.class_name}</option>
                ))}
              </select>
            </FormField>
            <FormField label="Section Name" name="section_name" required>
              <Input id="section_name" name="section_name" value={form.section_name} onChange={handleInput(setForm)} placeholder="e.g. A" required maxLength={100} />
            </FormField>
            <FormField label="Section Name (Bangla)" name="section_name_bn">
              <Input id="section_name_bn" name="section_name_bn" value={form.section_name_bn} onChange={handleInput(setForm)} placeholder="e.g. ক" maxLength={200} />
            </FormField>
            <FormField label="Max Capacity" name="max_capacity" helperText="Minimum 1">
              <Input id="max_capacity" name="max_capacity" type="number" min={1} value={form.max_capacity} onChange={handleInput(setForm)} placeholder="e.g. 40" />
            </FormField>
            <FormField label="Room Number" name="room_number">
              <Input id="room_number" name="room_number" value={form.room_number} onChange={handleInput(setForm)} placeholder="e.g. 201" maxLength={50} />
            </FormField>
            <FormField label="Shift" name="shift">
              <select id="shift" name="shift" value={form.shift} onChange={handleInput(setForm)} className={selectCls}>
                {SHIFTS.map((s) => (
                  <option key={s} value={s}>{capitalize(s)}</option>
                ))}
              </select>
            </FormField>
          </div>
          <div className="flex justify-end">
            <Button type="submit" isLoading={loading}>Create Section</Button>
          </div>
        </form>
      )}

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
              <tr>
                <th className="px-6 py-3 font-semibold">Section</th>
                <th className="px-6 py-3 font-semibold">Class</th>
                <th className="px-6 py-3 font-semibold">Shift</th>
                <th className="px-6 py-3 font-semibold">Capacity</th>
                <th className="px-6 py-3 font-semibold">Room</th>
                <th className="px-6 py-3 font-semibold">Status</th>
                <th className="px-6 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && sections.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                    <Loader2 className="mx-auto h-6 w-6 animate-spin" />
                  </td>
                </tr>
              ) : sections.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-500">No sections found.</td>
                </tr>
              ) : (
                sections.map((sec) => (
                  <tr key={sec.id} className="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900 dark:text-slate-200">{sec.section_name}</div>
                      {sec.section_name_bn && <div className="text-xs text-slate-500">{sec.section_name_bn}</div>}
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{className(sec.school_class_id)}</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{capitalize(sec.shift)}</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{sec.max_capacity ?? '—'}</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{sec.room_number || '—'}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={sec.is_active ? 'active' : 'inactive'}>
                        {sec.is_active ? 'Active' : 'Inactive'}
                      </StatusBadge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleView(sec)} title="View" className="text-blue-500 hover:text-blue-600">
                          <Eye size={14} />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => openEdit(sec)} title="Edit" className="text-slate-500 hover:text-slate-700">
                          <Pencil size={14} />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          isLoading={loading && actionId === sec.id}
                          onClick={() => handleToggle(sec)}
                          title={sec.is_active ? 'Inactivate' : 'Activate'}
                          className={sec.is_active ? 'text-red-500 hover:text-red-600' : 'text-emerald-600 hover:text-emerald-500'}
                        >
                          <Power size={14} />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => setDeleting(sec)} title="Delete" className="text-red-500 hover:text-red-600">
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

      <Modal open={!!viewing} title="Section Details" onClose={() => setViewing(null)}>
        {detail ? (
          <div>
            <DetailRow label="Section Name" value={detail.section_name} />
            <DetailRow label="Section Name (Bangla)" value={detail.section_name_bn} />
            <DetailRow label="Class" value={className(detail.school_class_id)} />
            <DetailRow label="Shift" value={capitalize(detail.shift)} />
            <DetailRow label="Max Capacity" value={detail.max_capacity} />
            <DetailRow label="Room Number" value={detail.room_number} />
            <DetailRow
              label="Status"
              value={
                <StatusBadge status={detail.is_active ? 'active' : 'inactive'}>
                  {detail.is_active ? 'Active' : 'Inactive'}
                </StatusBadge>
              }
            />
            <DetailRow label="Record Status" value={detail.status} />
            <DetailRow label="Class Teacher ID" value={detail.class_teacher_id} />
            <DetailRow label="Branch ID" value={detail.branch_id} />
            <DetailRow label="Tenant ID" value={detail.tenant_id} />
          </div>
        ) : (
          <div className="py-8 text-center text-slate-500">
            <Loader2 className="mx-auto h-6 w-6 animate-spin" />
          </div>
        )}
      </Modal>

      <Modal open={!!editing} title={`Edit Section: ${editing?.section_name || ''}`} onClose={() => setEditing(null)}>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField label="Class" name="edit_school_class_id" required>
              <select name="school_class_id" value={editForm.school_class_id} onChange={handleInput(setEditForm)} className={selectCls} required>
                <option value="">Select class</option>
                {classes.map((c) => (
                  <option key={c.id} value={c.id}>{c.class_name}</option>
                ))}
              </select>
            </FormField>
            <FormField label="Section Name" name="edit_section_name" required>
              <Input name="section_name" value={editForm.section_name} onChange={handleInput(setEditForm)} required maxLength={100} />
            </FormField>
            <FormField label="Section Name (Bangla)" name="edit_section_name_bn">
              <Input name="section_name_bn" value={editForm.section_name_bn} onChange={handleInput(setEditForm)} maxLength={200} />
            </FormField>
            <FormField label="Max Capacity" name="edit_max_capacity">
              <Input name="max_capacity" type="number" min={1} value={editForm.max_capacity} onChange={handleInput(setEditForm)} />
            </FormField>
            <FormField label="Room Number" name="edit_room_number">
              <Input name="room_number" value={editForm.room_number} onChange={handleInput(setEditForm)} maxLength={50} />
            </FormField>
            <FormField label="Shift" name="edit_shift">
              <select name="shift" value={editForm.shift} onChange={handleInput(setEditForm)} className={selectCls}>
                {SHIFTS.map((s) => (
                  <option key={s} value={s}>{capitalize(s)}</option>
                ))}
              </select>
            </FormField>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
            <Button type="submit" isLoading={loading && actionId === editing?.id}>Save Changes</Button>
          </div>
        </form>
      </Modal>

      <Modal open={!!deleting} title={`Delete Section: ${deleting?.section_name || ''}`} onClose={() => setDeleting(null)}>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
          This section will be removed from lists. You may record a reason (optional).
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

export default Sections;
