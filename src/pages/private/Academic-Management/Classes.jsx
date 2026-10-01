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
  fetchClasses,
  fetchClass,
  createClass,
  updateClass,
  activateClass,
  inactivateClass,
  deleteClass,
  clearClassError,
  clearClassMessage,
} from '../../../store/slices/Academic-Management/classSlice';

const CLASS_TYPES = ['regular', 'special', 'vocational'];

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

const emptyClassForm = { class_name: '', class_name_bn: '', class_type: 'regular' };

const Classes = () => {
  const dispatch = useDispatch();
  const { classes, currentClass, loading, error, lastMessage } = useSelector((state) => state.academicClass);

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyClassForm);
  const [viewing, setViewing] = useState(null);
  const [editing, setEditing] = useState(null);
  const [editForm, setEditForm] = useState(emptyClassForm);
  const [deleting, setDeleting] = useState(null);
  const [deleteReason, setDeleteReason] = useState('');
  const [actionId, setActionId] = useState(null);

  useEffect(() => {
    dispatch(fetchClasses());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearClassError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (lastMessage) {
      toast.success(lastMessage);
      dispatch(clearClassMessage());
    }
  }, [lastMessage, dispatch]);

  const handleInput = (setter) => (e) => {
    const { name, value } = e.target;
    setter((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const payload = {
      class_name: form.class_name,
      class_type: form.class_type,
      class_name_bn: form.class_name_bn || null,
    };
    const result = await dispatch(createClass(payload));
    if (result.meta.requestStatus === 'fulfilled') {
      setForm(emptyClassForm);
      setShowForm(false);
      dispatch(fetchClasses());
    }
  };

  const handleView = async (cls) => {
    setViewing(cls.id);
    dispatch(fetchClass(cls.id));
  };

  const openEdit = (cls) => {
    setEditing(cls);
    setEditForm({
      class_name: cls.class_name,
      class_name_bn: cls.class_name_bn || '',
      class_type: cls.class_type,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = {};
    if (editForm.class_name !== editing.class_name) data.class_name = editForm.class_name;
    if ((editForm.class_name_bn || null) !== (editing.class_name_bn || null)) {
      data.class_name_bn = editForm.class_name_bn || null;
    }
    if (editForm.class_type !== editing.class_type) data.class_type = editForm.class_type;
    if (Object.keys(data).length === 0) {
      setEditing(null);
      return;
    }
    const result = await dispatch(updateClass({ id: editing.id, data }));
    if (result.meta.requestStatus === 'fulfilled') {
      setEditing(null);
      dispatch(fetchClasses());
    }
  };

  const handleToggle = async (cls) => {
    setActionId(cls.id);
    const result = await dispatch(cls.is_active ? inactivateClass(cls.id) : activateClass(cls.id));
    setActionId(null);
    if (result.meta.requestStatus === 'fulfilled') dispatch(fetchClasses());
  };

  const handleDelete = async () => {
    setActionId(deleting.id);
    const result = await dispatch(deleteClass({ id: deleting.id, reason: deleteReason }));
    setActionId(null);
    if (result.meta.requestStatus === 'fulfilled') {
      setDeleting(null);
      setDeleteReason('');
      dispatch(fetchClasses());
    }
  };

  const detail = viewing && currentClass?.id === viewing ? currentClass : null;

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
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Classes</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Manage class levels for your school.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-end">
        <Button onClick={() => setShowForm((s) => !s)}>
          {showForm ? <XCircle className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
          {showForm ? 'Cancel' : 'New Class'}
        </Button>
      </div>

      {showForm && (
        <form
          onSubmit={handleCreate}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField label="Class Name" name="class_name" required>
              <Input id="class_name" name="class_name" value={form.class_name} onChange={handleInput(setForm)} placeholder="e.g. Six" required maxLength={100} />
            </FormField>
            <FormField label="Class Name (Bangla)" name="class_name_bn">
              <Input id="class_name_bn" name="class_name_bn" value={form.class_name_bn} onChange={handleInput(setForm)} placeholder="e.g. ষষ্ঠ" maxLength={200} />
            </FormField>
            <FormField label="Class Type" name="class_type" required>
              <select id="class_type" name="class_type" value={form.class_type} onChange={handleInput(setForm)} className={selectCls} required>
                {CLASS_TYPES.map((t) => (
                  <option key={t} value={t}>{capitalize(t)}</option>
                ))}
              </select>
            </FormField>
          </div>
          <div className="flex justify-end">
            <Button type="submit" isLoading={loading}>Create Class</Button>
          </div>
        </form>
      )}

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
              <tr>
                <th className="px-6 py-3 font-semibold">Class</th>
                <th className="px-6 py-3 font-semibold">Type</th>
                <th className="px-6 py-3 font-semibold">Order</th>
                <th className="px-6 py-3 font-semibold">Status</th>
                <th className="px-6 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && classes.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    <Loader2 className="mx-auto h-6 w-6 animate-spin" />
                  </td>
                </tr>
              ) : classes.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">No classes found.</td>
                </tr>
              ) : (
                classes.map((cls) => (
                  <tr key={cls.id} className="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900 dark:text-slate-200">{cls.class_name}</div>
                      {cls.class_name_bn && <div className="text-xs text-slate-500">{cls.class_name_bn}</div>}
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{capitalize(cls.class_type)}</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{cls.numeric_order}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={cls.is_active ? 'active' : 'inactive'}>
                        {cls.is_active ? 'Active' : 'Inactive'}
                      </StatusBadge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleView(cls)} title="View" className="text-blue-500 hover:text-blue-600">
                          <Eye size={14} />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => openEdit(cls)} title="Edit" className="text-slate-500 hover:text-slate-700">
                          <Pencil size={14} />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          isLoading={loading && actionId === cls.id}
                          onClick={() => handleToggle(cls)}
                          title={cls.is_active ? 'Inactivate' : 'Activate'}
                          className={cls.is_active ? 'text-red-500 hover:text-red-600' : 'text-emerald-600 hover:text-emerald-500'}
                        >
                          <Power size={14} />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => setDeleting(cls)} title="Delete" className="text-red-500 hover:text-red-600">
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

      <Modal open={!!viewing} title="Class Details" onClose={() => setViewing(null)}>
        {detail ? (
          <div>
            <DetailRow label="Class Name" value={detail.class_name} />
            <DetailRow label="Class Name (Bangla)" value={detail.class_name_bn} />
            <DetailRow label="Class Type" value={capitalize(detail.class_type)} />
            <DetailRow label="Numeric Order" value={detail.numeric_order} />
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

      <Modal open={!!editing} title={`Edit Class: ${editing?.class_name || ''}`} onClose={() => setEditing(null)}>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField label="Class Name" name="edit_class_name" required>
              <Input name="class_name" value={editForm.class_name} onChange={handleInput(setEditForm)} required maxLength={100} />
            </FormField>
            <FormField label="Class Name (Bangla)" name="edit_class_name_bn">
              <Input name="class_name_bn" value={editForm.class_name_bn} onChange={handleInput(setEditForm)} maxLength={200} />
            </FormField>
            <FormField label="Class Type" name="edit_class_type" required>
              <select name="class_type" value={editForm.class_type} onChange={handleInput(setEditForm)} className={selectCls} required>
                {CLASS_TYPES.map((t) => (
                  <option key={t} value={t}>{capitalize(t)}</option>
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

      <Modal open={!!deleting} title={`Delete Class: ${deleting?.class_name || ''}`} onClose={() => setDeleting(null)}>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
          This class will be removed from lists. You may record a reason (optional).
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

export default Classes;
