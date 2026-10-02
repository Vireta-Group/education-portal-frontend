import { useEffect, useState } from 'react';
import { Loader2, X, Plus, Trash2, CheckCircle2, XCircle } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { Button } from '../../../components/ui/Button';
import { FormField } from '../../../components/common/FormField';
import { Input } from '../../../components/ui/Input';
import { StatusBadge } from '../../../components/ui/StatusBadge';
import {
  fetchSubjectAssignments,
  fetchClassTeacherAssignments,
  assignSubjectTeacher,
  removeSubjectAssignment,
  assignClassTeacher,
  removeClassTeacherAssignment,
  clearAssignmentMessage,
} from '../../../store/slices/teacher-management/teacherAssignmentSlice';
import {
  fetchQualifications,
  addQualification,
  deleteQualification,
  fetchTrainings,
  addTraining,
  deleteTraining,
  fetchExperiences,
  addExperience,
  deleteExperience,
  fetchTeacherDocuments,
  addTeacherDocument,
  verifyTeacherDocument,
  deleteTeacherDocument,
  clearCredentialMessage,
} from '../../../store/slices/teacher-management/teacherCredentialSlice';

const selectCls =
  'flex h-9 w-full rounded-md border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 dark:border-slate-800 dark:focus-visible:ring-slate-300';

const capitalize = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1).replace(/_/g, ' ') : '');
const fmtDate = (d) => (d ? d.slice(0, 10) : '—');

const DetailRow = ({ label, value }) => (
  <div className="flex justify-between gap-4 py-2 border-b border-slate-100 dark:border-slate-800 last:border-0">
    <span className="text-sm text-slate-500 dark:text-slate-400">{label}</span>
    <span className="text-sm font-medium text-slate-900 dark:text-slate-200 text-right">{value ?? '—'}</span>
  </div>
);

const SectionHeader = ({ title, onAdd, addLabel }) => (
  <div className="flex items-center justify-between mb-3">
    <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">{title}</h3>
    {onAdd && (
      <Button variant="outline" size="sm" onClick={onAdd}>
        <Plus className="mr-1 h-3.5 w-3.5" /> {addLabel || 'Add'}
      </Button>
    )}
  </div>
);

const EmptyRow = ({ label }) => (
  <tr>
    <td colSpan={6} className="px-4 py-8 text-center text-sm text-slate-500">{label}</td>
  </tr>
);

const th = 'px-4 py-2 text-left text-xs font-semibold uppercase text-slate-500 dark:text-slate-400';
const td = 'px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300';

const TeacherDetailModal = ({ teacherId, onClose }) => {
  const dispatch = useDispatch();

  const { currentTeacher: teacher } = useSelector((s) => s.teacher);
  const { years } = useSelector((s) => s.academicYear);
  const { classes } = useSelector((s) => s.academicClass);
  const { sections } = useSelector((s) => s.academicSection);
  const { subjects } = useSelector((s) => s.academicSubject);
  const {
    subjectAssignments,
    classTeacherAssignments,
    loading: assignmentLoading,
    lastMessage: assignmentMessage,
  } = useSelector((s) => s.teacherAssignment);
  const {
    qualifications,
    trainings,
    experiences,
    documents,
    loading: credentialLoading,
    lastMessage: credentialMessage,
  } = useSelector((s) => s.teacherCredential);

  const [activeTab, setActiveTab] = useState('profile');
  const tabs = ['profile', 'assignments', 'qualifications', 'trainings', 'experiences', 'documents'];

  // ---- form states ----
  const [showSubjectForm, setShowSubjectForm] = useState(false);
  const [subjectForm, setSubjectForm] = useState({ academic_year_id: '', school_class_id: '', school_section_id: '', subject_id: '' });
  const [showClassTeacherForm, setShowClassTeacherForm] = useState(false);
  const [classTeacherForm, setClassTeacherForm] = useState({ academic_year_id: '', school_section_id: '' });
  const [showQualForm, setShowQualForm] = useState(false);
  const [qualForm, setQualForm] = useState({ degree: '', subject: '', institution: '', passing_year: '' });
  const [showTrainingForm, setShowTrainingForm] = useState(false);
  const [trainingForm, setTrainingForm] = useState({ training_name: '', provider: '', duration: '' });
  const [showExpForm, setShowExpForm] = useState(false);
  const [expForm, setExpForm] = useState({ organization: '', designation: '', from_date: '', to_date: '' });
  const [showDocForm, setShowDocForm] = useState(false);
  const [docForm, setDocForm] = useState({ document_type: '', file_url: '', document_name: '' });

  useEffect(() => {
    if (assignmentMessage) {
      toast.success(assignmentMessage);
      dispatch(clearAssignmentMessage());
    }
  }, [assignmentMessage, dispatch]);

  useEffect(() => {
    if (credentialMessage) {
      toast.success(credentialMessage);
      dispatch(clearCredentialMessage());
    }
  }, [credentialMessage, dispatch]);

  const handleInput = (setter) => (e) => {
    const { name, value } = e.target;
    setter((prev) => ({ ...prev, [name]: value }));
  };

  const yearName = (id) => years.find((y) => y.id === id)?.year_name || '—';
  const className = (id) => classes.find((c) => c.id === id)?.class_name || '—';
  const sectionName = (id) => sections.find((s) => s.id === id)?.section_name || '—';
  const subjectName = (id) => subjects.find((s) => s.id === id)?.subject_name || '—';

  // ---- actions ----
  const handleAssignSubject = async (e) => {
    e.preventDefault();
    const result = await dispatch(assignSubjectTeacher({ ...subjectForm, teacher_id: teacherId }));
    if (result.meta.requestStatus === 'fulfilled') {
      setSubjectForm({ academic_year_id: '', school_class_id: '', school_section_id: '', subject_id: '' });
      setShowSubjectForm(false);
      dispatch(fetchSubjectAssignments(teacherId));
    }
  };

  const handleRemoveSubject = async (id) => {
    const result = await dispatch(removeSubjectAssignment(id));
    if (result.meta.requestStatus === 'fulfilled') dispatch(fetchSubjectAssignments(teacherId));
  };

  const handleAssignClassTeacher = async (e) => {
    e.preventDefault();
    const result = await dispatch(assignClassTeacher({ ...classTeacherForm, teacher_id: teacherId }));
    if (result.meta.requestStatus === 'fulfilled') {
      setClassTeacherForm({ academic_year_id: '', school_section_id: '' });
      setShowClassTeacherForm(false);
      dispatch(fetchSubjectAssignments(teacherId));
      dispatch(fetchClassTeacherAssignments());
    }
  };

  const handleRemoveClassTeacher = async (id) => {
    const result = await dispatch(removeClassTeacherAssignment(id));
    if (result.meta.requestStatus === 'fulfilled') {
      // refetch class teacher assignments (thunk listClassTeacher takes no arg)
      dispatch(fetchClassTeacherAssignments());
    }
  };

  const handleAddQualification = async (e) => {
    e.preventDefault();
    const data = {
      degree: qualForm.degree,
      subject: qualForm.subject || null,
      institution: qualForm.institution || null,
      passing_year: qualForm.passing_year ? Number(qualForm.passing_year) : null,
    };
    const result = await dispatch(addQualification({ teacherId, data }));
    if (result.meta.requestStatus === 'fulfilled') {
      setQualForm({ degree: '', subject: '', institution: '', passing_year: '' });
      setShowQualForm(false);
      dispatch(fetchQualifications(teacherId));
    }
  };

  const handleDeleteQualification = async (qid) => {
    const result = await dispatch(deleteQualification({ teacherId, qualificationId: qid }));
    if (result.meta.requestStatus === 'fulfilled') dispatch(fetchQualifications(teacherId));
  };

  const handleAddTraining = async (e) => {
    e.preventDefault();
    const data = {
      training_name: trainingForm.training_name,
      provider: trainingForm.provider || null,
      duration: trainingForm.duration || null,
    };
    const result = await dispatch(addTraining({ teacherId, data }));
    if (result.meta.requestStatus === 'fulfilled') {
      setTrainingForm({ training_name: '', provider: '', duration: '' });
      setShowTrainingForm(false);
      dispatch(fetchTrainings(teacherId));
    }
  };

  const handleDeleteTraining = async (tid) => {
    const result = await dispatch(deleteTraining({ teacherId, trainingId: tid }));
    if (result.meta.requestStatus === 'fulfilled') dispatch(fetchTrainings(teacherId));
  };

  const handleAddExperience = async (e) => {
    e.preventDefault();
    const data = {
      organization: expForm.organization,
      designation: expForm.designation || null,
      from_date: expForm.from_date || null,
      to_date: expForm.to_date || null,
    };
    const result = await dispatch(addExperience({ teacherId, data }));
    if (result.meta.requestStatus === 'fulfilled') {
      setExpForm({ organization: '', designation: '', from_date: '', to_date: '' });
      setShowExpForm(false);
      dispatch(fetchExperiences(teacherId));
    }
  };

  const handleDeleteExperience = async (eid) => {
    const result = await dispatch(deleteExperience({ teacherId, experienceId: eid }));
    if (result.meta.requestStatus === 'fulfilled') dispatch(fetchExperiences(teacherId));
  };

  const handleAddDocument = async (e) => {
    e.preventDefault();
    const data = {
      document_type: docForm.document_type,
      file_url: docForm.file_url,
      document_name: docForm.document_name || null,
    };
    const result = await dispatch(addTeacherDocument({ teacherId, data }));
    if (result.meta.requestStatus === 'fulfilled') {
      setDocForm({ document_type: '', file_url: '', document_name: '' });
      setShowDocForm(false);
      dispatch(fetchTeacherDocuments(teacherId));
    }
  };

  const handleVerifyDocument = async (documentId, status) => {
    const result = await dispatch(
      verifyTeacherDocument({ teacherId, documentId, data: { verification_status: status } })
    );
    if (result.meta.requestStatus === 'fulfilled') dispatch(fetchTeacherDocuments(teacherId));
  };

  const handleDeleteDocument = async (documentId) => {
    const result = await dispatch(deleteTeacherDocument({ teacherId, documentId }));
    if (result.meta.requestStatus === 'fulfilled') dispatch(fetchTeacherDocuments(teacherId));
  };

  const busy = assignmentLoading || credentialLoading;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl max-h-[88vh] overflow-y-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Teacher: {teacher?.employee_id || '…'}
            </h2>
            {teacher && (
              <StatusBadge className="mt-1" status={teacher.is_active ? 'active' : 'inactive'}>
                {teacher.is_active ? 'Active' : 'Inactive'}
              </StatusBadge>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="border-b border-slate-200 dark:border-slate-800 mb-4">
          <div className="flex gap-5 overflow-x-auto">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`pb-2.5 pt-1 text-sm font-medium border-b-2 -mb-px whitespace-nowrap transition-colors ${
                  activeTab === t
                    ? 'border-slate-900 dark:border-white text-slate-900 dark:text-white'
                    : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                {capitalize(t)}
              </button>
            ))}
          </div>
        </div>

        {/* ------------------ Profile tab ------------------ */}
        {activeTab === 'profile' && (
          !teacher ? (
            <div className="py-10 text-center text-slate-500">
              <Loader2 className="mx-auto h-6 w-6 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
              <div>
                <DetailRow label="Employee ID" value={teacher.employee_id} />
                <DetailRow label="Designation" value={teacher.designation} />
                <DetailRow label="Department" value={teacher.department} />
                <DetailRow label="Employment Type" value={capitalize(teacher.employment_type)} />
                <DetailRow label="Salary Grade" value={teacher.salary_grade} />
                <DetailRow label="TIN Number" value={teacher.tin_number} />
                <DetailRow label="MPO Status" value={teacher.mpo_status ? 'Yes' : 'No'} />
                <DetailRow label="MPO Index" value={teacher.mpo_index} />
                <DetailRow label="Probation End" value={fmtDate(teacher.probation_end_date)} />
              </div>
              <div>
                <DetailRow label="Confirmation Date" value={fmtDate(teacher.confirmation_date)} />
                <DetailRow label="Emergency Contact" value={teacher.emergency_contact_name} />
                <DetailRow label="Emergency Phone" value={teacher.emergency_contact_phone} />
                <DetailRow label="Emergency Relation" value={teacher.emergency_contact_relation} />
                <DetailRow label="User ID" value={teacher.user_id} />
                <DetailRow label="Tenant ID" value={teacher.tenant_id} />
                <DetailRow label="Created At" value={fmtDate(teacher.created_at)} />
                <DetailRow label="Deleted At" value={fmtDate(teacher.deleted_at)} />
              </div>
            </div>
          )
        )}

        {/* ------------------ Assignments tab ------------------ */}
        {activeTab === 'assignments' && (
          <div className="space-y-8">
            <div>
              <SectionHeader title="Subject Assignments" onAdd={() => setShowSubjectForm((s) => !s)} addLabel="Assign Subject" />
              {showSubjectForm && (
                <form onSubmit={handleAssignSubject} className="mb-4 grid grid-cols-1 md:grid-cols-5 gap-3 items-end bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4">
                  <FormField label="Academic Year" name="sa_year" required>
                    <select name="academic_year_id" value={subjectForm.academic_year_id} onChange={handleInput(setSubjectForm)} className={selectCls} required>
                      <option value="">Select year</option>
                      {years.map((y) => (
                        <option key={y.id} value={y.id}>{y.year_name}</option>
                      ))}
                    </select>
                  </FormField>
                  <FormField label="Class" name="sa_class" required>
                    <select name="school_class_id" value={subjectForm.school_class_id} onChange={handleInput(setSubjectForm)} className={selectCls} required>
                      <option value="">Select class</option>
                      {classes.map((c) => (
                        <option key={c.id} value={c.id}>{c.class_name}</option>
                      ))}
                    </select>
                  </FormField>
                  <FormField label="Section" name="sa_section" required>
                    <select name="school_section_id" value={subjectForm.school_section_id} onChange={handleInput(setSubjectForm)} className={selectCls} required>
                      <option value="">Select section</option>
                      {sections.map((s) => (
                        <option key={s.id} value={s.id}>{s.section_name}</option>
                      ))}
                    </select>
                  </FormField>
                  <FormField label="Subject" name="sa_subject" required>
                    <select name="subject_id" value={subjectForm.subject_id} onChange={handleInput(setSubjectForm)} className={selectCls} required>
                      <option value="">Select subject</option>
                      {subjects.map((s) => (
                        <option key={s.id} value={s.id}>{s.subject_name}</option>
                      ))}
                    </select>
                  </FormField>
                  <Button type="submit" isLoading={busy}>Assign</Button>
                </form>
              )}
              <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
                <table className="w-full">
                  <thead className="bg-slate-50 dark:bg-slate-900">
                    <tr>
                      <th className={th}>Year</th>
                      <th className={th}>Class</th>
                      <th className={th}>Section</th>
                      <th className={th}>Subject</th>
                      <th className={th}>Effective</th>
                      <th className={th}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjectAssignments.length === 0 ? (
                      <EmptyRow label="No subject assignments." />
                    ) : (
                      subjectAssignments.map((a) => (
                        <tr key={a.id} className="border-t border-slate-200 dark:border-slate-800">
                          <td className={td}>{yearName(a.academic_year_id)}</td>
                          <td className={td}>{className(a.school_class_id)}</td>
                          <td className={td}>{sectionName(a.school_section_id)}</td>
                          <td className={td}>{subjectName(a.subject_id)}</td>
                          <td className={td}>{fmtDate(a.effective_date)}</td>
                          <td className="px-4 py-2.5 text-right">
                            <Button variant="outline" size="sm" onClick={() => handleRemoveSubject(a.id)} title="Remove" className="text-red-500 hover:text-red-600">
                              <Trash2 size={14} />
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <SectionHeader title="Class Teacher Assignments" onAdd={() => setShowClassTeacherForm((s) => !s)} addLabel="Assign Class Teacher" />
              {showClassTeacherForm && (
                <form onSubmit={handleAssignClassTeacher} className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-3 items-end bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4">
                  <FormField label="Academic Year" name="ct_year" required>
                    <select name="academic_year_id" value={classTeacherForm.academic_year_id} onChange={handleInput(setClassTeacherForm)} className={selectCls} required>
                      <option value="">Select year</option>
                      {years.map((y) => (
                        <option key={y.id} value={y.id}>{y.year_name}</option>
                      ))}
                    </select>
                  </FormField>
                  <FormField label="Section" name="ct_section" required>
                    <select name="school_section_id" value={classTeacherForm.school_section_id} onChange={handleInput(setClassTeacherForm)} className={selectCls} required>
                      <option value="">Select section</option>
                      {sections.map((s) => (
                        <option key={s.id} value={s.id}>{s.section_name}</option>
                      ))}
                    </select>
                  </FormField>
                  <Button type="submit" isLoading={busy}>Assign</Button>
                </form>
              )}
              <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
                <table className="w-full">
                  <thead className="bg-slate-50 dark:bg-slate-900">
                    <tr>
                      <th className={th}>Year</th>
                      <th className={th}>Section</th>
                      <th className={th}>Teacher ID</th>
                      <th className={th}>Effective</th>
                      <th className={th}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {classTeacherAssignments.filter((a) => a.teacher_id === teacherId).length === 0 ? (
                      <EmptyRow label="No class teacher assignments for this teacher." />
                    ) : (
                      classTeacherAssignments
                        .filter((a) => a.teacher_id === teacherId)
                        .map((a) => (
                          <tr key={a.id} className="border-t border-slate-200 dark:border-slate-800">
                            <td className={td}>{yearName(a.academic_year_id)}</td>
                            <td className={td}>{sectionName(a.school_section_id)}</td>
                            <td className={td}>{a.teacher_id?.slice(0, 8)}…</td>
                            <td className={td}>{fmtDate(a.effective_date)}</td>
                            <td className="px-4 py-2.5 text-right">
                              <Button variant="outline" size="sm" onClick={() => handleRemoveClassTeacher(a.id)} title="Remove" className="text-red-500 hover:text-red-600">
                                <Trash2 size={14} />
                              </Button>
                            </td>
                          </tr>
                        ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ------------------ Qualifications tab ------------------ */}
        {activeTab === 'qualifications' && (
          <div>
            <SectionHeader title="Qualifications" onAdd={() => setShowQualForm((s) => !s)} />
            {showQualForm && (
              <form onSubmit={handleAddQualification} className="mb-4 grid grid-cols-1 md:grid-cols-5 gap-3 items-end bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4">
                <FormField label="Degree" name="q_degree" required>
                  <Input name="degree" value={qualForm.degree} onChange={handleInput(setQualForm)} required maxLength={100} />
                </FormField>
                <FormField label="Subject" name="q_subject">
                  <Input name="subject" value={qualForm.subject} onChange={handleInput(setQualForm)} maxLength={200} />
                </FormField>
                <FormField label="Institution" name="q_institution">
                  <Input name="institution" value={qualForm.institution} onChange={handleInput(setQualForm)} maxLength={200} />
                </FormField>
                <FormField label="Passing Year" name="q_year">
                  <Input name="passing_year" type="number" min={1900} max={2100} value={qualForm.passing_year} onChange={handleInput(setQualForm)} />
                </FormField>
                <Button type="submit" isLoading={busy}>Add</Button>
              </form>
            )}
            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
              <table className="w-full">
                <thead className="bg-slate-50 dark:bg-slate-900">
                  <tr>
                    <th className={th}>Degree</th>
                    <th className={th}>Subject</th>
                    <th className={th}>Institution</th>
                    <th className={th}>Result</th>
                    <th className={th}>Year</th>
                    <th className={th}>Highest</th>
                    <th className={th}></th>
                  </tr>
                </thead>
                <tbody>
                  {qualifications.length === 0 ? (
                    <EmptyRow label="No qualifications found." />
                  ) : (
                    qualifications.map((q) => (
                      <tr key={q.id} className="border-t border-slate-200 dark:border-slate-800">
                        <td className={td}>{q.degree}</td>
                        <td className={td}>{q.subject || '—'}</td>
                        <td className={td}>{q.institution || '—'}</td>
                        <td className={td}>{q.result || '—'}</td>
                        <td className={td}>{q.passing_year || '—'}</td>
                        <td className={td}>{q.is_highest ? 'Yes' : 'No'}</td>
                        <td className="px-4 py-2.5 text-right">
                          <Button variant="outline" size="sm" onClick={() => handleDeleteQualification(q.id)} title="Delete" className="text-red-500 hover:text-red-600">
                            <Trash2 size={14} />
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ------------------ Trainings tab ------------------ */}
        {activeTab === 'trainings' && (
          <div>
            <SectionHeader title="Trainings" onAdd={() => setShowTrainingForm((s) => !s)} />
            {showTrainingForm && (
              <form onSubmit={handleAddTraining} className="mb-4 grid grid-cols-1 md:grid-cols-4 gap-3 items-end bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4">
                <FormField label="Training Name" name="t_name" required>
                  <Input name="training_name" value={trainingForm.training_name} onChange={handleInput(setTrainingForm)} required maxLength={200} />
                </FormField>
                <FormField label="Provider" name="t_provider">
                  <Input name="provider" value={trainingForm.provider} onChange={handleInput(setTrainingForm)} maxLength={200} />
                </FormField>
                <FormField label="Duration" name="t_duration">
                  <Input name="duration" value={trainingForm.duration} onChange={handleInput(setTrainingForm)} maxLength={100} placeholder="e.g. 3 months" />
                </FormField>
                <Button type="submit" isLoading={busy}>Add</Button>
              </form>
            )}
            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
              <table className="w-full">
                <thead className="bg-slate-50 dark:bg-slate-900">
                  <tr>
                    <th className={th}>Training</th>
                    <th className={th}>Provider</th>
                    <th className={th}>Duration</th>
                    <th className={th}>Completed</th>
                    <th className={th}>Expiry</th>
                    <th className={th}></th>
                  </tr>
                </thead>
                <tbody>
                  {trainings.length === 0 ? (
                    <EmptyRow label="No trainings found." />
                  ) : (
                    trainings.map((t) => (
                      <tr key={t.id} className="border-t border-slate-200 dark:border-slate-800">
                        <td className={td}>{t.training_name}</td>
                        <td className={td}>{t.provider || '—'}</td>
                        <td className={td}>{t.duration || '—'}</td>
                        <td className={td}>{fmtDate(t.completion_date)}</td>
                        <td className={td}>{fmtDate(t.expiry_date)}</td>
                        <td className="px-4 py-2.5 text-right">
                          <Button variant="outline" size="sm" onClick={() => handleDeleteTraining(t.id)} title="Delete" className="text-red-500 hover:text-red-600">
                            <Trash2 size={14} />
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ------------------ Experiences tab ------------------ */}
        {activeTab === 'experiences' && (
          <div>
            <SectionHeader title="Experiences" onAdd={() => setShowExpForm((s) => !s)} />
            {showExpForm && (
              <form onSubmit={handleAddExperience} className="mb-4 grid grid-cols-1 md:grid-cols-5 gap-3 items-end bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4">
                <FormField label="Organization" name="e_org" required>
                  <Input name="organization" value={expForm.organization} onChange={handleInput(setExpForm)} required maxLength={200} />
                </FormField>
                <FormField label="Designation" name="e_desig">
                  <Input name="designation" value={expForm.designation} onChange={handleInput(setExpForm)} maxLength={100} />
                </FormField>
                <FormField label="From" name="e_from">
                  <Input name="from_date" type="date" value={expForm.from_date} onChange={handleInput(setExpForm)} />
                </FormField>
                <FormField label="To" name="e_to">
                  <Input name="to_date" type="date" value={expForm.to_date} onChange={handleInput(setExpForm)} />
                </FormField>
                <Button type="submit" isLoading={busy}>Add</Button>
              </form>
            )}
            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
              <table className="w-full">
                <thead className="bg-slate-50 dark:bg-slate-900">
                  <tr>
                    <th className={th}>Organization</th>
                    <th className={th}>Designation</th>
                    <th className={th}>From</th>
                    <th className={th}>To</th>
                    <th className={th}>Current</th>
                    <th className={th}></th>
                  </tr>
                </thead>
                <tbody>
                  {experiences.length === 0 ? (
                    <EmptyRow label="No experiences found." />
                  ) : (
                    experiences.map((e) => (
                      <tr key={e.id} className="border-t border-slate-200 dark:border-slate-800">
                        <td className={td}>{e.organization}</td>
                        <td className={td}>{e.designation || '—'}</td>
                        <td className={td}>{fmtDate(e.from_date)}</td>
                        <td className={td}>{fmtDate(e.to_date)}</td>
                        <td className={td}>{e.is_current ? 'Yes' : 'No'}</td>
                        <td className="px-4 py-2.5 text-right">
                          <Button variant="outline" size="sm" onClick={() => handleDeleteExperience(e.id)} title="Delete" className="text-red-500 hover:text-red-600">
                            <Trash2 size={14} />
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ------------------ Documents tab ------------------ */}
        {activeTab === 'documents' && (
          <div>
            <SectionHeader title="Documents" onAdd={() => setShowDocForm((s) => !s)} />
            {showDocForm && (
              <form onSubmit={handleAddDocument} className="mb-4 grid grid-cols-1 md:grid-cols-4 gap-3 items-end bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4">
                <FormField label="Document Type" name="d_type" required>
                  <Input name="document_type" value={docForm.document_type} onChange={handleInput(setDocForm)} required maxLength={50} placeholder="e.g. NID" />
                </FormField>
                <FormField label="File URL" name="d_url" required>
                  <Input name="file_url" value={docForm.file_url} onChange={handleInput(setDocForm)} required placeholder="https://…" />
                </FormField>
                <FormField label="Document Name" name="d_name">
                  <Input name="document_name" value={docForm.document_name} onChange={handleInput(setDocForm)} maxLength={200} />
                </FormField>
                <Button type="submit" isLoading={busy}>Add</Button>
              </form>
            )}
            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
              <table className="w-full">
                <thead className="bg-slate-50 dark:bg-slate-900">
                  <tr>
                    <th className={th}>Type</th>
                    <th className={th}>Name</th>
                    <th className={th}>Expiry</th>
                    <th className={th}>Verification</th>
                    <th className={th}></th>
                  </tr>
                </thead>
                <tbody>
                  {documents.length === 0 ? (
                    <EmptyRow label="No documents found." />
                  ) : (
                    documents.map((d) => (
                      <tr key={d.id} className="border-t border-slate-200 dark:border-slate-800">
                        <td className={td}>{d.document_type}</td>
                        <td className={td}>
                          {d.file_url ? (
                            <a href={d.file_url} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
                              {d.document_name || 'View file'}
                            </a>
                          ) : (
                            d.document_name || '—'
                          )}
                        </td>
                        <td className={td}>{fmtDate(d.expiry_date)}</td>
                        <td className="px-4 py-2.5">
                          <StatusBadge
                            status={
                              d.verification_status === 'verified'
                                ? 'active'
                                : d.verification_status === 'rejected'
                                ? 'destructive'
                                : 'pending'
                            }
                          >
                            {capitalize(d.verification_status)}
                          </StatusBadge>
                        </td>
                        <td className="px-4 py-2.5">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleVerifyDocument(d.id, 'verified')}
                              title="Verify"
                              className="text-emerald-600 hover:text-emerald-500"
                            >
                              <CheckCircle2 size={14} />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleVerifyDocument(d.id, 'rejected')}
                              title="Reject"
                              className="text-yellow-600 hover:text-yellow-500"
                            >
                              <XCircle size={14} />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteDocument(d.id)}
                              title="Delete"
                              className="text-red-500 hover:text-red-600"
                            >
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
        )}
      </div>
    </div>
  );
};

export default TeacherDetailModal;
