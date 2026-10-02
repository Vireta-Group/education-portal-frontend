# EPS API: Teacher Attendance

Module: **Teacher Management > Attendance** (mark teacher attendance, regularization requests, daily and monthly reports).

- All paths below are relative to the base URL (set in `.env`).
- All endpoints require a bearer token: `Authorization: Bearer <token>`
- Requests and responses are `application/json`.

---

## Endpoints

| # | Method | Path | Purpose |
|---|--------|------|---------|
| 1 | `GET` | `/teacher-attendance` | List attendance records |
| 2 | `POST` | `/teacher-attendance` | Mark attendance for a teacher |
| 3 | `GET` | `/teacher-attendance/{attendance}` | Get one attendance record |
| 4 | `GET` | `/teacher-attendance/regularizations` | List regularization requests |
| 5 | `POST` | `/teacher-attendance/regularizations` | Submit a regularization request |
| 6 | `POST` | `/teacher-attendance/regularizations/{regularization}/review` | Approve or reject a request |
| 7 | `GET` | `/teacher-attendance/reports/daily` | Daily attendance report |
| 8 | `GET` | `/teacher-attendance/reports/monthly` | Monthly attendance report |

`{attendance}` and `{regularization}` are the `id` (uuid) of the matching record.

Note: the base path is `/teacher-attendance`, not under `/teachers`. There is no update or delete endpoint for attendance records.

---

## Response format

Success:

```json
{
  "status": "success",
  "message": "...",
  "data": {}
}
```

- `status` is always `"success"`.
- `message` is present on POST endpoints only.
- `data` is an array for the two list endpoints and an object for the others.

Errors:

| Status | Meaning | Body |
|--------|---------|------|
| `401` | Unauthenticated | `{ "message": string }` |
| `404` | Record not found | `{ "message": string }` |
| `422` | Validation error | `{ "message": string, "errors": { "<field>": [string, ...] } }` |

`404` applies only to endpoints with a path parameter (#3 and #6). `422` applies only to #2, #5 and #6. The list and report endpoints return `401` only.

---

## 1. List attendance

`GET /teacher-attendance`

- Response `200`: `data` is an array of [TeacherAttendance](#teacherattendance).
- Errors: `401`

## 2. Mark attendance

`POST /teacher-attendance`

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| `teacher_id` | string | Yes | uuid |
| `attendance_date` | string | Yes | `date-time` |
| `status` | string or null | No | `present`, `absent`, `late`, `half_day`, `on_leave`, `excused` |
| `check_in_time` | string or null | No | |
| `check_out_time` | string or null | No | |
| `source` | string or null | No | `manual`, `fingerprint`, `mobile` |
| `latitude` | number or null | No | min -90, max 90 |
| `longitude` | number or null | No | min -180, max 180 |
| `location_name` | string or null | No | max 255 |
| `remarks` | string or null | No | |

- Response `201`: message `Teacher attendance marked successfully.`, `data` is a [TeacherAttendance](#teacherattendance).
- Errors: `401`, `422`

## 3. Get attendance

`GET /teacher-attendance/{attendance}`

- Response `200`: `data` is a [TeacherAttendance](#teacherattendance).
- Errors: `401`, `404`

---

## 4. List regularization requests

`GET /teacher-attendance/regularizations`

- Response `200`: `data` is an array of [TeacherAttendanceRegularization](#teacherattendanceregularization).
- Errors: `401`

## 5. Submit regularization request

`POST /teacher-attendance/regularizations`

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| `reason` | string | Yes | max 1000 |
| `attendance_id` | string or null | No | uuid |
| `attendance_date` | string or null | No | `date-time` |
| `teacher_id` | string or null | No | uuid |
| `check_in_time` | string or null | No | |
| `check_out_time` | string or null | No | |
| `new_status` | string or null | No | `present`, `absent`, `late`, `half_day`, `excused` |
| `supporting_doc_url` | string or null | No | uri, max 500 |

- Only `reason` is required. `attendance_id`, `attendance_date` and `teacher_id` are all optional in the spec.
- `new_status` does **not** accept `on_leave` (unlike mark attendance).
- Response `201`: message `Regularization request submitted successfully.`, `data` is a [TeacherAttendanceRegularization](#teacherattendanceregularization).
- Errors: `401`, `422`

## 6. Review regularization request

`POST /teacher-attendance/regularizations/{regularization}/review`

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| `status` | string | Yes | `approved` or `rejected` |
| `review_remarks` | string or null | No | max 500 |

- Response `200`: message `Regularization request reviewed successfully.`, `data` is a [TeacherAttendanceRegularization](#teacherattendanceregularization).
- Errors: `401`, `404`, `422`

---

## 7. Daily report

`GET /teacher-attendance/reports/daily`

Query parameters:

| Param | Type | Required |
|-------|------|----------|
| `date` | string | No |

- Response `200`: `data` is a [DailyReport](#dailyreport).
- Errors: `401`

## 8. Monthly report

`GET /teacher-attendance/reports/monthly`

Query parameters:

| Param | Type | Required |
|-------|------|----------|
| `year_month` | string | No |

- Response `200`: `data` is a [MonthlyReport](#monthlyreport).
- Errors: `401`

---

## Schemas

### TeacherAttendance

| Field | Type | Nullable |
|-------|------|----------|
| `id` | string | No |
| `tenant_id` | string | No |
| `teacher_id` | string | No |
| `academic_year_id` | string | Yes |
| `attendance_date` | string (`date`) | No |
| `check_in_time` | string (`date-time`) | Yes |
| `check_out_time` | string (`date-time`) | Yes |
| `status` | string | No |
| `latitude` | string | Yes |
| `longitude` | string | Yes |
| `location_name` | string | Yes |
| `source` | string | No |
| `remarks` | string | Yes |
| `marked_by` | string | Yes |
| `created_at` | string (`date-time`) | Yes |

### TeacherAttendanceRegularization

| Field | Type | Nullable |
|-------|------|----------|
| `id` | string | No |
| `tenant_id` | string | No |
| `teacher_id` | string | No |
| `attendance_id` | string | Yes |
| `attendance_date` | string (`date`) | No |
| `check_in_time` | string (`date-time`) | Yes |
| `check_out_time` | string (`date-time`) | Yes |
| `old_status` | string | Yes |
| `new_status` | string | No |
| `reason` | string | No |
| `supporting_doc_url` | string | Yes |
| `status` | string | No |
| `reviewed_by` | string | Yes |
| `review_remarks` | string | Yes |
| `reviewed_at` | string (`date-time`) | Yes |
| `created_at` | string (`date-time`) | Yes |
| `updated_at` | string (`date-time`) | Yes |

### DailyReport

| Field | Type | Notes |
|-------|------|-------|
| `date` | any | Type not defined in spec |
| `summary.total` | integer | min 0 |
| `summary.present` | integer | min 0 |
| `summary.absent` | integer | min 0 |
| `summary.late` | integer | min 0 |
| `summary.half_day` | integer | min 0 |
| `summary.on_leave` | integer | min 0 |
| `teachers` | array | Items are [TeacherAttendance](#teacherattendance) |

`summary` has no `excused` count.

### MonthlyReport

| Field | Type | Notes |
|-------|------|-------|
| `year_month` | any | Type not defined in spec |
| `working_days` | string | Top level, typed as **string** |
| `teachers` | array | See item fields below |

Each item in `teachers`:

| Field | Type |
|-------|------|
| `teacher_id` | string |
| `teacher_name` | string |
| `employee_id` | string |
| `working_days` | integer (min 0) |
| `present` | integer (min 0) |
| `absent` | integer (min 0) |
| `late` | integer (min 0) |
| `leave` | integer (min 0) |
| `percentage` | number |

---

## Important notes

- To mark attendance, only `teacher_id` and `attendance_date` are required.
- **Type differences on attendance:** `latitude` and `longitude` are numbers in requests but **strings** in responses. `attendance_date` is `date-time` in requests but `date` in responses.
- `status` and `source` are nullable in requests but always a string in responses.
- Regularization `status` (the request state) is a different field from `new_status` (the attendance status being requested). Review sets `status` to `approved` or `rejected`.
- Monthly report uses `leave`, while the daily summary uses `on_leave`.
- Monthly report `working_days` is a string at the top level but an integer per teacher.
- Not defined in the spec: filters on the list endpoints, the format of the `date` and `year_month` query params, the initial regularization `status` value, whether approving a request updates the attendance record, and the format of `check_in_time` and `check_out_time` in requests.