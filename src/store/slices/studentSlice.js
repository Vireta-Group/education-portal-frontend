import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { get, post } from '../../lib/api';

const buildStudentParams = (filters = {}) => ({
  class_id: filters.class_id,
  section_id: filters.section_id,
  academic_year_id: filters.academic_year_id,
  is_active: filters.is_active,
  student_type: filters.student_type,
});

const buildStudentPayload = (form) => ({
  name_en: form.name_en.trim(),
  name_bn: form.name_bn?.trim() || null,
  name_ar: form.name_ar?.trim() || null,
  date_of_birth: form.date_of_birth,
  gender: form.gender,
  admission_date: form.admission_date,
  academic_year_id: form.academic_year_id || null,
  school_class_id: form.class_id || null,
  school_section_id: null,
  roll_number: Number(form.roll_number),
  student_type: form.student_type || null,
  blood_group: form.blood_group || null,
  religion: form.religion?.trim() || null,
  nationality: form.nationality?.trim() || null,
  birth_reg_no: form.birth_reg_no?.trim() || null,
  mobile: form.mobile?.trim() || null,
  email: form.email?.trim() || null,
  current_address: form.current_address?.trim() || null,
  permanent_address: form.permanent_address?.trim() || null,
  photo_url: form.photo_url?.trim() || null,
  father_name: form.father_name?.trim() || null,
  mother_name: form.mother_name?.trim() || null,
  is_active: form.is_active,
  guardians: (form.guardians || [])
    .filter((guardian) => guardian?.name_en?.trim())
    .map((guardian) => ({
      guardian_type: guardian.guardian_type,
      name_en: guardian.name_en.trim(),
      name_bn: guardian.name_bn?.trim() || null,
      occupation: guardian.occupation?.trim() || null,
      mobile: guardian.mobile?.trim() || null,
      email: guardian.email?.trim() || null,
      nid_number: guardian.nid_number?.trim() || null,
      address: guardian.address?.trim() || null,
      photo_url: guardian.photo_url?.trim() || null,
      is_primary: guardian.is_primary,
    })),
});

export const fetchStudents = createAsyncThunk(
  'student/fetchStudents',
  async (filters = {}, { getState, rejectWithValue }) => {
    try {
      return await get('/students', {
        token: getState().auth.token,
        params: buildStudentParams(filters),
      });
    } catch (err) {
      return rejectWithValue(err.message || 'Network error');
    }
  }
);

export const createStudent = createAsyncThunk(
  'student/createStudent',
  async (form, { getState, rejectWithValue }) => {
    try {
      return await post('/students', buildStudentPayload(form), {
        token: getState().auth.token,
      });
    } catch (err) {
      return rejectWithValue(err.message || 'Network error');
    }
  }
);

export const fetchStudentsByClass = createAsyncThunk(
  'student/fetchByClass',
  async (classId, { getState, rejectWithValue }) => {
    if (!classId) return rejectWithValue('Class is required');
    try {
      return await get('/students/by-class', {
        token: getState().auth.token,
        params: { class_id: classId },
      });
    } catch (err) {
      return rejectWithValue(err.message || 'Network error');
    }
  }
);

export const fetchStudentsBySection = createAsyncThunk(
  'student/fetchBySection',
  async (sectionId, { getState, rejectWithValue }) => {
    if (!sectionId) return rejectWithValue('Section is required');
    try {
      return await get('/students/by-section', {
        token: getState().auth.token,
        params: { section_id: sectionId },
      });
    } catch (err) {
      return rejectWithValue(err.message || 'Network error');
    }
  }
);

export const fetchStudentById = createAsyncThunk(
  'student/fetchById',
  async (studentId, { getState, rejectWithValue }) => {
    if (!studentId) return rejectWithValue('Student id is required');
    try {
      return await get(`/students/${encodeURIComponent(studentId)}`, {
        token: getState().auth.token,
      });
    } catch (err) {
      return rejectWithValue(err.message || 'Network error');
    }
  }
);

export const deleteStudent = createAsyncThunk(
  'student/deleteStudent',
  async ({ studentId, reason } = {}, { getState, rejectWithValue }) => {
    if (!studentId) return rejectWithValue('Student id is required');
    try {
      return await post(
        `/students/${encodeURIComponent(studentId)}/delete`,
        { delete_reason: reason?.trim() ? reason.trim() : null },
        { token: getState().auth.token }
      );
    } catch (err) {
      return rejectWithValue(err.message || 'Network error');
    }
  }
);

const UPDATE_FIELDS = [
  'name_en',
  'name_bn',
  'name_ar',
  'father_name',
  'mother_name',
  'date_of_birth',
  'gender',
  'blood_group',
  'religion',
  'nationality',
  'birth_reg_no',
  'mobile',
  'email',
  'current_address',
  'permanent_address',
  'photo_url',
  'student_type',
  'is_active',
  'roll_number',
];

const normalizeValue = (value) => {
  if (value === null || value === undefined) return null;
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed === '' ? null : trimmed;
  }
  return value;
};

const buildUpdatePayload = (form = {}, original = {}) => {
  const payload = {};
  UPDATE_FIELDS.forEach((key) => {
    const next = normalizeValue(form[key]);
    const previous = normalizeValue(
      key === 'date_of_birth' ? String(original[key] ?? '').slice(0, 10) : original[key]
    );
    if (String(next ?? '') !== String(previous ?? '')) payload[key] = next;
  });
  return payload;
};

export const updateStudent = createAsyncThunk(
  'student/updateStudent',
  async ({ studentId, form, original } = {}, { getState, rejectWithValue }) => {
    if (!studentId) return rejectWithValue('Student id is required');
    const payload = buildUpdatePayload(form, original);
    if (Object.keys(payload).length === 0) return rejectWithValue('No changes to save.');
    try {
      return await post(`/students/${encodeURIComponent(studentId)}/update`, payload, {
        token: getState().auth.token,
      });
    } catch (err) {
      return rejectWithValue(err.message || 'Network error');
    }
  }
);

const GUARDIAN_TYPES = ['father', 'mother', 'local_guardian', 'custom'];

const buildGuardianPayload = (form = {}) => {
  const text = (value, maxLength) => {
    const trimmed = value?.trim();
    if (!trimmed) return null;
    return maxLength ? trimmed.slice(0, maxLength) : trimmed;
  };

  return {
    guardian_type: form.guardian_type,
    name_en: text(form.name_en, 100),
    name_bn: text(form.name_bn, 200),
    occupation: text(form.occupation, 100),
    mobile: text(form.mobile, 20),
    email: text(form.email, 100),
    nid_number: text(form.nid_number, 50),
    address: text(form.address),
    photo_url: text(form.photo_url, 500),
    is_primary: form.is_primary ? true : null,
  };
};

export const fetchGuardians = createAsyncThunk(
  'student/fetchGuardians',
  async (studentId, { getState, rejectWithValue }) => {
    if (!studentId) return rejectWithValue('Student id is required');
    try {
      return await get(`/students/${encodeURIComponent(studentId)}/guardians`, {
        token: getState().auth.token,
      });
    } catch (err) {
      return rejectWithValue(err.message || 'Network error');
    }
  }
);

export const addGuardian = createAsyncThunk(
  'student/addGuardian',
  async ({ studentId, form } = {}, { getState, rejectWithValue }) => {
    if (!studentId) return rejectWithValue('Student id is required');
    if (!form?.guardian_type) return rejectWithValue('Guardian type is required');
    if (!form?.name_en?.trim()) return rejectWithValue('Guardian name is required');
    if (!GUARDIAN_TYPES.includes(form.guardian_type)) {
      return rejectWithValue('Invalid guardian type');
    }
    try {
      return await post(
        `/students/${encodeURIComponent(studentId)}/guardians`,
        buildGuardianPayload(form),
        { token: getState().auth.token }
      );
    } catch (err) {
      return rejectWithValue(err.message || 'Network error');
    }
  }
);

export const setPrimaryGuardian = createAsyncThunk(
  'student/setPrimaryGuardian',
  async ({ studentId, guardianId } = {}, { getState, rejectWithValue }) => {
    if (!studentId) return rejectWithValue('Student id is required');
    if (!guardianId) return rejectWithValue('Guardian id is required');
    try {
      return await post(
        `/students/${encodeURIComponent(studentId)}/guardians/${encodeURIComponent(guardianId)}/primary`,
        undefined,
        { token: getState().auth.token }
      );
    } catch (err) {
      return rejectWithValue(err.message || 'Network error');
    }
  }
);

export const deleteGuardian = createAsyncThunk(
  'student/deleteGuardian',
  async ({ studentId, guardianId, reason } = {}, { getState, rejectWithValue }) => {
    if (!studentId) return rejectWithValue('Student id is required');
    if (!guardianId) return rejectWithValue('Guardian id is required');
    try {
      return await post(
        `/students/${encodeURIComponent(studentId)}/guardians/${encodeURIComponent(guardianId)}/delete`,
        { delete_reason: reason?.trim() ? reason.trim() : null },
        { token: getState().auth.token }
      );
    } catch (err) {
      return rejectWithValue(err.message || 'Network error');
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  items: [],
  filters: {
    is_active: '',
    student_type: '',
  },
  fetchedAt: null,
  creating: false,
  lastMessage: null,
  view: 'all',
  lookup: { classId: '', sectionId: '' },
  selected: null,
  detailLoading: false,
  deleting: false,
  updating: false,
  guardians: [],
  guardiansLoading: false,
  addingGuardian: false,
  guardianActionId: null,
};

const toList = (payload) => (Array.isArray(payload) ? payload : []);

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setLookup: (state, action) => {
      state.lookup = { ...state.lookup, ...action.payload };
    },
    setView: (state, action) => {
      state.view = action.payload;
    },
    clearSelected: (state) => {
      state.selected = null;
    },
    clearStudentError: (state) => {
      state.error = null;
    },
    clearStudentMessage: (state) => {
      state.lastMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.items = toList(action.payload);
        state.view = 'all';
        state.fetchedAt = new Date().toISOString();
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createStudent.pending, (state) => {
        state.creating = true;
        state.error = null;
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        state.creating = false;
        state.lastMessage = 'Student admitted successfully.';
        if (action.payload) state.items.unshift(action.payload);
      })
      .addCase(createStudent.rejected, (state, action) => {
        state.creating = false;
        state.error = action.payload;
      })
      .addCase(fetchStudentsByClass.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentsByClass.fulfilled, (state, action) => {
        state.loading = false;
        state.items = toList(action.payload);
        state.view = 'class';
        state.fetchedAt = new Date().toISOString();
      })
      .addCase(fetchStudentsByClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchStudentsBySection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentsBySection.fulfilled, (state, action) => {
        state.loading = false;
        state.items = toList(action.payload);
        state.view = 'section';
        state.fetchedAt = new Date().toISOString();
      })
      .addCase(fetchStudentsBySection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchStudentById.pending, (state) => {
        state.detailLoading = true;
        state.error = null;
      })
      .addCase(fetchStudentById.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.selected = action.payload ?? null;
      })
      .addCase(fetchStudentById.rejected, (state, action) => {
        state.detailLoading = false;
        state.selected = null;
        state.error = action.payload;
      })
      .addCase(deleteStudent.pending, (state) => {
        state.deleting = true;
        state.error = null;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.deleting = false;
        state.lastMessage = 'Student deleted successfully.';
        const removedId = action.meta?.arg?.studentId;
        state.items = state.items.filter((item) => item.id !== removedId);
        if (state.selected?.id === removedId) state.selected = null;
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.deleting = false;
        state.error = action.payload;
      })
      .addCase(updateStudent.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.updating = false;
        state.lastMessage = 'Student updated successfully.';
        const returned = action.payload;
        if (returned) {
          state.selected = { ...state.selected, ...returned };
          const index = state.items.findIndex((item) => item.id === returned.id);
          if (index !== -1) state.items[index] = { ...state.items[index], ...returned };
        }
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
      })
      .addCase(fetchGuardians.pending, (state) => {
        state.guardiansLoading = true;
        state.error = null;
      })
      .addCase(fetchGuardians.fulfilled, (state, action) => {
        state.guardiansLoading = false;
        state.guardians = toList(action.payload);
      })
      .addCase(fetchGuardians.rejected, (state, action) => {
        state.guardiansLoading = false;
        state.guardians = [];
        state.error = action.payload;
      })
      .addCase(addGuardian.pending, (state) => {
        state.addingGuardian = true;
        state.error = null;
      })
      .addCase(addGuardian.fulfilled, (state, action) => {
        state.addingGuardian = false;
        state.lastMessage = 'Guardian added successfully.';
        if (action.payload) state.guardians.push(action.payload);
      })
      .addCase(addGuardian.rejected, (state, action) => {
        state.addingGuardian = false;
        state.error = action.payload;
      })
      .addCase(setPrimaryGuardian.pending, (state, action) => {
        state.guardianActionId = action.meta.arg.guardianId;
        state.error = null;
      })
      .addCase(setPrimaryGuardian.fulfilled, (state, action) => {
        state.guardianActionId = null;
        state.lastMessage = 'Primary guardian updated successfully.';
        const updated = action.payload?.id ?? action.meta.arg.guardianId;
        state.guardians = state.guardians.map((guardian) =>
          guardian.id === updated
            ? { ...guardian, ...(action.payload ?? {}), is_primary: true }
            : { ...guardian, is_primary: false }
        );
      })
      .addCase(setPrimaryGuardian.rejected, (state) => {
        state.guardianActionId = null;
      })
      .addCase(deleteGuardian.pending, (state, action) => {
        state.guardianActionId = action.meta.arg.guardianId;
        state.error = null;
      })
      .addCase(deleteGuardian.fulfilled, (state, action) => {
        state.guardianActionId = null;
        state.lastMessage = 'Guardian deleted successfully.';
        state.guardians = state.guardians.filter(
          (guardian) => guardian.id !== action.meta.arg.guardianId
        );
      })
      .addCase(deleteGuardian.rejected, (state) => {
        state.guardianActionId = null;
      });
  },
});

export const {
  setFilters,
  setLookup,
  setView,
  clearSelected,
  clearStudentError,
  clearStudentMessage,
} = studentSlice.actions;
export default studentSlice.reducer;
