import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Loader2, Plus, Trash2, UserPlus } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { Button } from '../../../components/ui/Button';
import { FormField } from '../../../components/common/FormField';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { Textarea } from '../../../components/ui/Textarea';
import { DatePicker } from '../../../components/ui/DatePicker';
import { createStudent, clearStudentError, clearStudentMessage } from '../../../store/slices/studentSlice';
import { fetchAcademicYears, clearAcademicYearError } from '../../../store/slices/academicYearSlice';
import { StatusBadge } from '../../../components/ui/StatusBadge';

const DUMMY_CLASS_ID = '1';

const GENDERS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const GUARDIAN_TYPES = [
  { value: 'father', label: 'Father' },
  { value: 'mother', label: 'Mother' },
  { value: 'guardian', label: 'Guardian' },
];

const emptyGuardian = () => ({
  guardian_type: 'father',
  name_en: '',
  name_bn: '',
  occupation: '',
  mobile: '',
  email: '',
  nid_number: '',
  address: '',
  photo_url: '',
  is_primary: false,
});

const today = () => new Date().toISOString().slice(0, 10);

const defaultValues = () => ({
  name_en: '',
  name_bn: '',
  name_ar: '',
  date_of_birth: '',
  gender: 'male',
  admission_date: today(),
  academic_year: '',
  class_id: DUMMY_CLASS_ID,
  roll_number: '',
  student_type: 'regular',
  blood_group: '',
  religion: '',
  nationality: '',
  birth_reg_no: '',
  mobile: '',
  email: '',
  current_address: '',
  permanent_address: '',
  photo_url: '',
  father_name: '',
  mother_name: '',
  is_active: true,
  guardians: [emptyGuardian()],
});

const guardianSchema = z.object({
  guardian_type: z.string().min(1, 'Select relationship'),
  name_en: z.string().max(100, 'Maximum 100 characters'),
  name_bn: z.string().max(100, 'Maximum 100 characters').optional().or(z.literal('')),
  occupation: z.string().max(100, 'Maximum 100 characters').optional().or(z.literal('')),
  mobile: z.string().max(30, 'Maximum 30 characters').optional().or(z.literal('')),
  email: z.union([z.string().email('Invalid email address'), z.literal('')]).optional(),
  nid_number: z.string().max(50, 'Maximum 50 characters').optional().or(z.literal('')),
  address: z.string().optional().or(z.literal('')),
  photo_url: z.string().optional().or(z.literal('')),
  is_primary: z.boolean(),
});

const admissionSchema = z.object({
  name_en: z.string().trim().min(1, 'Student name is required').max(100, 'Maximum 100 characters'),
  name_bn: z.string().max(100, 'Maximum 100 characters').optional().or(z.literal('')),
  name_ar: z.string().max(100, 'Maximum 100 characters').optional().or(z.literal('')),
  date_of_birth: z.string().min(1, 'Date of birth is required'),
  gender: z.enum(['male', 'female', 'other']),
  admission_date: z.string().min(1, 'Admission date is required'),
  academic_year: z.string().trim().min(1, 'Academic year is required'),
  class_id: z.string().trim().min(1, 'Class is required'),
  roll_number: z.coerce
    .number()
    .int('Whole numbers only')
    .min(1, 'Roll number is required and must be at least 1'),
  student_type: z.string().optional().or(z.literal('')),
  blood_group: z.string().optional().or(z.literal('')),
  religion: z.string().max(100, 'Maximum 100 characters').optional().or(z.literal('')),
  nationality: z.string().max(100, 'Maximum 100 characters').optional().or(z.literal('')),
  birth_reg_no: z.string().max(50, 'Maximum 50 characters').optional().or(z.literal('')),
  mobile: z.string().max(30, 'Maximum 30 characters').optional().or(z.literal('')),
  email: z.union([z.string().email('Invalid email address'), z.literal('')]).optional(),
  current_address: z.string().optional().or(z.literal('')),
  permanent_address: z.string().optional().or(z.literal('')),
  photo_url: z.string().optional().or(z.literal('')),
  father_name: z.string().max(100, 'Maximum 100 characters').optional().or(z.literal('')),
  mother_name: z.string().max(100, 'Maximum 100 characters').optional().or(z.literal('')),
  is_active: z.boolean(),
  guardians: z.array(guardianSchema),
});

const Section = ({ title, description, children }) => (
  <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-4">
    <div>
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h2>
      {description && <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>}
    </div>
    {children}
  </section>
);

const Admission = () => {
  const dispatch = useDispatch();
  const { creating, error, lastMessage } = useSelector((state) => state.student);
  const { years, error: yearsError } = useSelector((state) => state.academicYear);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(admissionSchema),
    defaultValues: defaultValues(),
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'guardians' });

  const academicYearInput = useWatch({ control, name: 'academic_year' });

  const matchedYear = useMemo(
    () =>
      years.find(
        (year) =>
          year.year_name?.toLowerCase() === academicYearInput.trim().toLowerCase() ||
          year.id === academicYearInput.trim()
      ),
    [years, academicYearInput]
  );

  useEffect(() => {
    dispatch(fetchAcademicYears());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearStudentError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (yearsError) {
      toast.error(yearsError);
      dispatch(clearAcademicYearError());
    }
  }, [yearsError, dispatch]);

  useEffect(() => {
    if (lastMessage) {
      toast.success(lastMessage);
      dispatch(clearStudentMessage());
    }
  }, [lastMessage, dispatch]);

  const onSubmit = async (data) => {
    const result = await dispatch(
      createStudent({ ...data, academic_year_id: matchedYear?.id })
    );
    if (createStudent.fulfilled.match(result)) {
      reset(defaultValues());
    }
  };

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
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">New Admission</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Student ID is generated automatically as STU-{'{year}'}-{'{4 digits}'}.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Section title="Student Identity" description="Required fields are marked with an asterisk.">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField label="Name (English)" name="name_en" required error={errors.name_en?.message}>
              <Input id="name_en" {...register('name_en')} placeholder="e.g. John Smith" />
            </FormField>
            <FormField label="Name (Bangla)" name="name_bn" error={errors.name_bn?.message}>
              <Input id="name_bn" {...register('name_bn')} placeholder="e.g. জন স্মিথ" />
            </FormField>
            <FormField label="Name (Arabic)" name="name_ar" error={errors.name_ar?.message}>
              <Input id="name_ar" {...register('name_ar')} dir="rtl" />
            </FormField>
          </div>
        </Section>

        <Section title="Academic Placement">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              label="Academic Year"
              name="academic_year"
              required
              error={errors.academic_year?.message}
              helperText={
                academicYearInput.trim() && !matchedYear
                  ? `No academic year matches "${academicYearInput.trim()}"`
                  : 'Type a year or pick from the list'
              }
            >
              <Input
                id="academic_year"
                list="academic-year-options"
                {...register('academic_year')}
                placeholder="e.g. 2026-2027"
                autoComplete="off"
              />
              <datalist id="academic-year-options">
                {years.map((year) => (
                  <option key={year.id} value={year.year_name}>
                    {year.is_current ? ' (current)' : ''}
                  </option>
                ))}
              </datalist>
            </FormField>

            <FormField
              label="Class"
              name="class_id"
              required
              error={errors.class_id?.message}
              helperText="Temporary: class id is sent to the API as-is."
            >
              <Input
                id="class_id"
                {...register('class_id')}
                placeholder={DUMMY_CLASS_ID}
                autoComplete="off"
              />
            </FormField>

            <FormField label="Roll Number" name="roll_number" required error={errors.roll_number?.message}>
              <Input
                id="roll_number"
                type="number"
                min="1"
                step="1"
                {...register('roll_number')}
                placeholder="e.g. 12"
              />
            </FormField>

            <FormField label="Admission Date" name="admission_date" required error={errors.admission_date?.message}>
              <DatePicker id="admission_date" {...register('admission_date')} />
            </FormField>

            <FormField label="Date of Birth" name="date_of_birth" required error={errors.date_of_birth?.message}>
              <DatePicker id="date_of_birth" {...register('date_of_birth')} />
            </FormField>

            <FormField label="Gender" name="gender" required error={errors.gender?.message}>
              <Select id="gender" {...register('gender')}>
                {GENDERS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </FormField>

            <FormField label="Student Type" name="student_type" error={errors.student_type?.message}>
              <Input id="student_type" {...register('student_type')} placeholder="e.g. regular" />
            </FormField>
          </div>

          <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              {...register('is_active')}
              className="rounded border-slate-300"
            />
            Student is active
          </label>
        </Section>

        <Section title="Personal Details" description="All optional.">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField label="Blood Group" name="blood_group" error={errors.blood_group?.message}>
              <Select id="blood_group" {...register('blood_group')}>
                <option value="">Select blood group</option>
                {BLOOD_GROUPS.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </Select>
            </FormField>
            <FormField label="Religion" name="religion" error={errors.religion?.message}>
              <Input id="religion" {...register('religion')} />
            </FormField>
            <FormField label="Nationality" name="nationality" error={errors.nationality?.message}>
              <Input id="nationality" {...register('nationality')} placeholder="e.g. Bangladeshi" />
            </FormField>
            <FormField
              label="Birth Registration No"
              name="birth_reg_no"
              error={errors.birth_reg_no?.message}
              helperText="Maximum 50 characters"
            >
              <Input id="birth_reg_no" {...register('birth_reg_no')} />
            </FormField>
            <FormField label="Mobile" name="mobile" error={errors.mobile?.message}>
              <Input id="mobile" type="tel" {...register('mobile')} placeholder="+8801XXXXXXXXX" />
            </FormField>
            <FormField label="Email" name="email" error={errors.email?.message}>
              <Input id="email" type="email" {...register('email')} />
            </FormField>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Current Address" name="current_address" error={errors.current_address?.message}>
              <Textarea id="current_address" {...register('current_address')} />
            </FormField>
            <FormField label="Permanent Address" name="permanent_address" error={errors.permanent_address?.message}>
              <Textarea id="permanent_address" {...register('permanent_address')} />
            </FormField>
          </div>

          <FormField label="Photo URL" name="photo_url" error={errors.photo_url?.message}>
            <Input id="photo_url" {...register('photo_url')} placeholder="https://..." />
          </FormField>
        </Section>

        <Section title="Family" description="Optional.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Father's Name" name="father_name" error={errors.father_name?.message}>
              <Input id="father_name" {...register('father_name')} />
            </FormField>
            <FormField label="Mother's Name" name="mother_name" error={errors.mother_name?.message}>
              <Input id="mother_name" {...register('mother_name')} />
            </FormField>
          </div>
        </Section>

        <Section
          title="Guardians"
          description="Guardians are sent with the same admission request. Leave a row blank to skip it."
        >
          <div className="space-y-4">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="rounded-lg border border-slate-200 dark:border-slate-800 p-4 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                    Guardian {index + 1}
                  </h3>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => remove(index)}
                    className="text-red-600 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                    Remove
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    label="Relationship"
                    name={`guardians.${index}.guardian_type`}
                    required
                    error={errors.guardians?.[index]?.guardian_type?.message}
                  >
                    <Select {...register(`guardians.${index}.guardian_type`)}>
                      {GUARDIAN_TYPES.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Select>
                  </FormField>
                  <FormField
                    label="Name (English)"
                    name={`guardians.${index}.name_en`}
                    error={errors.guardians?.[index]?.name_en?.message}
                  >
                    <Input {...register(`guardians.${index}.name_en`)} />
                  </FormField>
                  <FormField
                    label="Name (Bangla)"
                    name={`guardians.${index}.name_bn`}
                    error={errors.guardians?.[index]?.name_bn?.message}
                  >
                    <Input {...register(`guardians.${index}.name_bn`)} />
                  </FormField>
                  <FormField
                    label="Occupation"
                    name={`guardians.${index}.occupation`}
                    error={errors.guardians?.[index]?.occupation?.message}
                  >
                    <Input {...register(`guardians.${index}.occupation`)} />
                  </FormField>
                  <FormField
                    label="Mobile"
                    name={`guardians.${index}.mobile`}
                    error={errors.guardians?.[index]?.mobile?.message}
                  >
                    <Input type="tel" {...register(`guardians.${index}.mobile`)} />
                  </FormField>
                  <FormField
                    label="Email"
                    name={`guardians.${index}.email`}
                    error={errors.guardians?.[index]?.email?.message}
                  >
                    <Input type="email" {...register(`guardians.${index}.email`)} />
                  </FormField>
                  <FormField
                    label="NID Number"
                    name={`guardians.${index}.nid_number`}
                    error={errors.guardians?.[index]?.nid_number?.message}
                  >
                    <Input {...register(`guardians.${index}.nid_number`)} />
                  </FormField>
                  <FormField
                    label="Photo URL"
                    name={`guardians.${index}.photo_url`}
                    error={errors.guardians?.[index]?.photo_url?.message}
                  >
                    <Input {...register(`guardians.${index}.photo_url`)} />
                  </FormField>
                </div>

                <FormField
                  label="Address"
                  name={`guardians.${index}.address`}
                  error={errors.guardians?.[index]?.address?.message}
                >
                  <Textarea rows={2} {...register(`guardians.${index}.address`)} />
                </FormField>

                <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    {...register(`guardians.${index}.is_primary`)}
                    className="rounded border-slate-300"
                  />
                  Primary guardian
                </label>
              </div>
            ))}

            <Button type="button" variant="outline" onClick={() => append(emptyGuardian())}>
              <Plus className="h-4 w-4" />
              Add Guardian
            </Button>
          </div>
        </Section>

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <UserPlus className="h-4 w-4" />
            Student ID will be generated by the server.
            {matchedYear && (
              <StatusBadge status={matchedYear.is_current ? 'active' : 'pending'}>
                {matchedYear.year_name}
                {matchedYear.is_current ? ' (current)' : ''}
              </StatusBadge>
            )}
          </div>

          <div className="flex items-center gap-2">
            {creating && <Loader2 className="h-4 w-4 animate-spin text-slate-400" />}
            <Button type="button" variant="outline" onClick={() => reset(defaultValues())} disabled={creating}>
              Clear
            </Button>
            <Button type="submit" isLoading={creating}>
              Admit Student
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Admission;
