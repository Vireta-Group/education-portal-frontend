import { useEffect, useState } from 'react';
import { Check, Plus, Star, Trash2, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { Button } from '../../../../components/ui/Button';
import { FormField } from '../../../../components/common/FormField';
import { Input } from '../../../../components/ui/Input';
import { Select } from '../../../../components/ui/Select';
import { Textarea } from '../../../../components/ui/Textarea';
import { cn } from '../../../../lib/utils';
import {
  addGuardian,
  deleteGuardian,
  fetchGuardians,
  setPrimaryGuardian,
  clearStudentError,
  clearStudentMessage,
} from '../../../../store/slices/studentSlice';

const GUARDIAN_TYPES = [
  { value: 'father', label: 'Father' },
  { value: 'mother', label: 'Mother' },
  { value: 'local_guardian', label: 'Local Guardian' },
  { value: 'custom', label: 'Custom' },
];

const DELETE_REASON_MAX = 500;

const EMPTY_GUARDIAN = {
  guardian_type: '',
  name_en: '',
  name_bn: '',
  occupation: '',
  mobile: '',
  email: '',
  nid_number: '',
  address: '',
  photo_url: '',
  is_primary: false,
};

const display = (value) => {
  if (value === null || value === undefined || value === '') return '—';
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  return String(value);
};

const typeLabel = (value) =>
  GUARDIAN_TYPES.find((item) => item.value === value)?.label ?? display(value);

const validate = (form) => {
  const errors = {};
  if (!form.guardian_type) errors.guardian_type = 'Guardian type is required';
  if (!form.name_en.trim()) errors.name_en = 'Guardian name is required';
  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Enter a valid email address';
  }
  if (form.mobile && !/^[+\d][\d\s-]{4,19}$/.test(form.mobile)) {
    errors.mobile = 'Enter a valid mobile number';
  }
  if (form.photo_url && !/^https?:\/\/\S+$/i.test(form.photo_url)) {
    errors.photo_url = 'Enter a valid image URL';
  }
  return errors;
};

export const GuardiansManager = ({ studentId }) => {
  const dispatch = useDispatch();
  const { guardians, guardiansLoading, addingGuardian, guardianActionId, error, lastMessage } =
    useSelector((state) => state.student);

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_GUARDIAN);
  const [errors, setErrors] = useState({});
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteReason, setDeleteReason] = useState('');

  useEffect(() => {
    if (studentId) dispatch(fetchGuardians(studentId));
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

  const setField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const validation = validate(form);
    setErrors(validation);
    if (Object.keys(validation).length > 0) {
      toast.error('Please fix the highlighted fields.');
      return;
    }
    const result = await dispatch(addGuardian({ studentId, form }));
    if (addGuardian.fulfilled.match(result)) {
      setForm(EMPTY_GUARDIAN);
      setShowForm(false);
    }
  };

  const handleSetPrimary = async (guardianId) => {
    await dispatch(setPrimaryGuardian({ studentId, guardianId }));
  };

  const handleDelete = async () => {
    await dispatch(
      deleteGuardian({ studentId, guardianId: activeDeleteTarget?.id, reason: deleteReason })
    );
    setDeleteTarget(null);
    setDeleteReason('');
  };

  const activeDeleteTarget = guardians.some((item) => item.id === deleteTarget?.id)
    ? deleteTarget
    : null;

  if (!studentId) {
    return (
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-10 flex flex-col items-center text-center">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Load a student to view and manage their guardians.
        </p>
      </section>
    );
  }

  return (
    <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Guardians
        </h2>
        <Button
          type="button"
          variant={showForm ? 'outline' : 'default'}
          onClick={() => {
            setShowForm((prev) => !prev);
            setErrors({});
          }}
        >
          {showForm ? <X size={16} /> : <Plus size={16} />}
          {showForm ? 'Cancel' : 'Add Guardian'}
        </Button>
      </div>

      {showForm && (
        <form
          onSubmit={handleAdd}
          className="rounded-lg border border-slate-200 dark:border-slate-800 p-4 space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <FormField label="Guardian Type" name="guardian_type" required error={errors.guardian_type}>
              <Select
                id="guardian_type"
                value={form.guardian_type}
                onChange={(e) => setField('guardian_type', e.target.value)}
                disabled={addingGuardian}
              >
                <option value="">Select type</option>
                {GUARDIAN_TYPES.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </Select>
            </FormField>

            <FormField label="Name (English)" name="guardian_name_en" required error={errors.name_en}>
              <Input
                id="guardian_name_en"
                maxLength={100}
                value={form.name_en}
                onChange={(e) => setField('name_en', e.target.value)}
                disabled={addingGuardian}
              />
            </FormField>

            <FormField label="Name (Bangla)" name="guardian_name_bn">
              <Input
                id="guardian_name_bn"
                maxLength={200}
                value={form.name_bn}
                onChange={(e) => setField('name_bn', e.target.value)}
                disabled={addingGuardian}
              />
            </FormField>

            <FormField label="Occupation" name="guardian_occupation">
              <Input
                id="guardian_occupation"
                maxLength={100}
                value={form.occupation}
                onChange={(e) => setField('occupation', e.target.value)}
                disabled={addingGuardian}
              />
            </FormField>

            <FormField label="Mobile" name="guardian_mobile" error={errors.mobile}>
              <Input
                id="guardian_mobile"
                maxLength={20}
                value={form.mobile}
                onChange={(e) => setField('mobile', e.target.value)}
                disabled={addingGuardian}
              />
            </FormField>

            <FormField label="Email" name="guardian_email" error={errors.email}>
              <Input
                id="guardian_email"
                maxLength={100}
                value={form.email}
                onChange={(e) => setField('email', e.target.value)}
                disabled={addingGuardian}
              />
            </FormField>

            <FormField label="NID Number" name="guardian_nid">
              <Input
                id="guardian_nid"
                maxLength={50}
                value={form.nid_number}
                onChange={(e) => setField('nid_number', e.target.value)}
                disabled={addingGuardian}
              />
            </FormField>

            <FormField label="Photo URL" name="guardian_photo" error={errors.photo_url}>
              <Input
                id="guardian_photo"
                maxLength={500}
                value={form.photo_url}
                onChange={(e) => setField('photo_url', e.target.value)}
                disabled={addingGuardian}
              />
            </FormField>

            <FormField label="Primary" name="guardian_is_primary">
              <Select
                id="guardian_is_primary"
                value={form.is_primary ? '1' : '0'}
                onChange={(e) => setField('is_primary', e.target.value === '1')}
                disabled={addingGuardian}
              >
                <option value="0">No</option>
                <option value="1">Yes</option>
              </Select>
            </FormField>
          </div>

          <FormField label="Address" name="guardian_address">
            <Textarea
              id="guardian_address"
              value={form.address}
              onChange={(e) => setField('address', e.target.value)}
              disabled={addingGuardian}
            />
          </FormField>

          <div className="flex items-center gap-3">
            <Button type="submit" isLoading={addingGuardian}>
              Save Guardian
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={addingGuardian}
              onClick={() => {
                setShowForm(false);
                setForm(EMPTY_GUARDIAN);
                setErrors({});
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}

      {guardiansLoading ? (
        <p className="text-sm text-slate-500 dark:text-slate-400">Loading guardians...</p>
      ) : guardians.length === 0 ? (
        <p className="text-sm text-slate-500 dark:text-slate-400">No guardians added yet.</p>
      ) : (
        <div className="space-y-3">
          {guardians.map((guardian) => (
            <div
              key={guardian.id}
              className={cn(
                'rounded-lg border p-4',
                guardian.is_primary
                  ? 'border-amber-300 bg-amber-50/50 dark:border-amber-700/50 dark:bg-amber-950/20'
                  : 'border-slate-200 dark:border-slate-800'
              )}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-slate-900 dark:text-white">
                      {display(guardian.name_en)}
                    </p>
                    {guardian.is_primary && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
                        <Star size={11} /> Primary
                      </span>
                    )}
                  </div>
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    {typeLabel(guardian.guardian_type)}
                    {guardian.status ? ` · ${guardian.status}` : ''}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={guardian.is_primary || guardianActionId === guardian.id}
                    isLoading={guardianActionId === guardian.id && !activeDeleteTarget}
                    onClick={() => handleSetPrimary(guardian.id)}
                  >
                    <Check size={14} />
                    Set Primary
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      setDeleteTarget(guardian);
                      setDeleteReason('');
                    }}
                  >
                    <Trash2 size={14} />
                    Delete
                  </Button>
                </div>
              </div>

              <dl className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: 'Mobile', value: guardian.mobile },
                  { label: 'Email', value: guardian.email },
                  { label: 'Occupation', value: guardian.occupation },
                  { label: 'NID', value: guardian.nid_number },
                ].map((item) => (
                  <div key={item.label} className="min-w-0">
                    <dt className="text-xs uppercase tracking-wide text-slate-400">{item.label}</dt>
                    <dd className="text-sm text-slate-700 dark:text-slate-200 break-words">
                      {display(item.value)}
                    </dd>
                  </div>
                ))}
              </dl>

              {guardian.address && (
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{guardian.address}</p>
              )}

              {activeDeleteTarget?.id === guardian.id && (
                <div className="mt-4 space-y-3 rounded-md border border-red-200 bg-red-50/50 p-3 dark:border-red-900/60 dark:bg-red-950/20">
                  <FormField
                    label="Delete reason (optional)"
                    name={`guardian_delete_reason_${guardian.id}`}
                    helperText={`${deleteReason.length}/${DELETE_REASON_MAX} characters. Sent as null when empty.`}
                  >
                    <Textarea
                      rows={2}
                      maxLength={DELETE_REASON_MAX}
                      value={deleteReason}
                      onChange={(e) => setDeleteReason(e.target.value)}
                      disabled={guardianActionId === guardian.id}
                      placeholder="e.g. entered by mistake"
                    />
                  </FormField>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      isLoading={guardianActionId === guardian.id}
                      onClick={handleDelete}
                    >
                      Confirm Delete
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={guardianActionId === guardian.id}
                      onClick={() => {
                        setDeleteTarget(null);
                        setDeleteReason('');
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default GuardiansManager;
