import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../../../lib/api';

export const fetchTeacherAttendance = createAsyncThunk(
  'teacherAttendance/list',
  (_, thunkApi) => apiRequest({ url: 'teacher-attendance' }, thunkApi)
);

export const markTeacherAttendance = createAsyncThunk(
  'teacherAttendance/mark',
  (data, thunkApi) => apiRequest({ url: 'teacher-attendance', method: 'POST', body: data }, thunkApi)
);

export const fetchAttendanceRecord = createAsyncThunk(
  'teacherAttendance/show',
  (id, thunkApi) => apiRequest({ url: `teacher-attendance/${id}` }, thunkApi)
);

export const fetchRegularizations = createAsyncThunk(
  'teacherAttendance/listRegularizations',
  (_, thunkApi) => apiRequest({ url: 'teacher-attendance/regularizations' }, thunkApi)
);

export const submitRegularization = createAsyncThunk(
  'teacherAttendance/submitRegularization',
  (data, thunkApi) =>
    apiRequest({ url: 'teacher-attendance/regularizations', method: 'POST', body: data }, thunkApi)
);

export const reviewRegularization = createAsyncThunk(
  'teacherAttendance/reviewRegularization',
  ({ id, data }, thunkApi) =>
    apiRequest({ url: `teacher-attendance/regularizations/${id}/review`, method: 'POST', body: data }, thunkApi)
);

export const fetchDailyReport = createAsyncThunk(
  'teacherAttendance/dailyReport',
  (date, thunkApi) =>
    apiRequest({ url: `teacher-attendance/reports/daily${date ? `?date=${date}` : ''}` }, thunkApi)
);

export const fetchMonthlyReport = createAsyncThunk(
  'teacherAttendance/monthlyReport',
  (yearMonth, thunkApi) =>
    apiRequest({ url: `teacher-attendance/reports/monthly${yearMonth ? `?year_month=${yearMonth}` : ''}` }, thunkApi)
);

const initialState = {
  loading: false,
  error: null,
  records: [],
  regularizations: [],
  dailyReport: null,
  monthlyReport: null,
  lastMessage: null,
};

const isTeacherAttendance = (suffix) => (action) =>
  action.type.startsWith('teacherAttendance/') && action.type.endsWith(suffix);

const teacherAttendanceSlice = createSlice({
  name: 'teacherAttendance',
  initialState,
  reducers: {
    clearAttendanceError: (state) => {
      state.error = null;
    },
    clearAttendanceMessage: (state) => {
      state.lastMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeacherAttendance.fulfilled, (state, action) => {
        state.records = action.payload?.data || [];
      })
      .addCase(fetchRegularizations.fulfilled, (state, action) => {
        state.regularizations = action.payload?.data || [];
      })
      .addCase(fetchDailyReport.fulfilled, (state, action) => {
        state.dailyReport = action.payload?.data;
      })
      .addCase(fetchMonthlyReport.fulfilled, (state, action) => {
        state.monthlyReport = action.payload?.data;
      })
      .addMatcher(isTeacherAttendance('/pending'), (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(isTeacherAttendance('/fulfilled'), (state, action) => {
        state.loading = false;
        state.lastMessage = action.payload?.message || null;
      })
      .addMatcher(isTeacherAttendance('/rejected'), (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAttendanceError, clearAttendanceMessage } = teacherAttendanceSlice.actions;
export default teacherAttendanceSlice.reducer;
