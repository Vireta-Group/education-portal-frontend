# EPS API: Teacher Profile

Module: **Teacher Management > Profile** (manage teacher profiles, qualifications, trainings, experiences, documents, and teaching assignments).

- All paths below are relative to the base URL (set in `.env`).
- All endpoints require a bearer token: `Authorization: Bearer <token>`
- Requests and responses are `application/json`.

---

## Endpoints

### Teacher profile

| # | Method | Path | Purpose |
|---|--------|------|---------|
| 1 | `GET` | `/teachers` | List all teachers for the tenant |
| 2 | `POST` | `/teachers` | Create a teacher (creates User account and Teacher profile) |
| 3 | `GET` | `/teachers/{teacher}` | Get one teacher |
| 4 | `POST` | `/teachers/{teacher}/update` | Update a teacher |
| 5 | `POST` | `/teachers/{teacher}/activate` | Activate a teacher |
| 6 | `POST` | `/teachers/{teacher}/inactivate` | Inactivate a teacher |
| 7 | `GET` | `/teachers/workload` | Workload overview per teacher |

### Assignments

| # | Method | Path | Purpose |
|---|--------|------|---------|
| 8 | `POST` | `/teachers/assign-subject` | Assign a subject teacher |
| 9 | `GET` | `/teachers/{teacher}/subject-assignments` | List subject assignments of a teacher |
| 10 | `POST` | `/teachers/subject-assignments/{assignment}/remove` | Remove a subject assignment |
| 11 | `POST` | `/teachers/assign-class-teacher` | Assign a class teacher to a section |
| 12 | `GET` | `/teachers/class-teacher-assignments` | List class teacher assignments |
| 13 | `POST` | `/teachers/class-teacher-assignments/{assignment}/remove` | Remove a class teacher assignment |

### Qualifications

| # | Method | Path | Purpose |
|---|--------|------|---------|
| 14 | `GET` | `/teachers/{teacher}/qualifications` | List qualifications |
| 15 | `POST` | `/teachers/{teacher}/qualifications` | Add a qualification |
| 16 | `POST` | `/teachers/{teacher}/qualifications/{qualification}/delete` | Delete a qualification |

### Trainings

| # | Method | Path | Purpose |
|---|--------|------|---------|
| 17 | `GET` | `/teachers/{teacher}/trainings` | List trainings |
| 18 | `POST` | `/teachers/{teacher}/trainings` | Add a training |
| 19 | `POST` | `/teachers/{teacher}/trainings/{training}/delete` | Delete a training |

### Experiences

| # | Method | Path | Purpose |
|---|--------|------|---------|
| 20 | `GET` | `/teachers/{teacher}/experiences` | List experiences |
| 21 | `POST` | `/teachers/{teacher}/experiences` | Add an experience |
| 22 | `POST` | `/teachers/{teacher}/experiences/{experience}/delete` | Delete an experience |

### Documents

| # | Method | Path | Purpose |
|---|--------|------|---------|
| 23 | `GET` | `/teachers/{teacher}/documents` | List documents |
| 24 | `POST` | `/teachers/{teacher}/documents` | Upload a document record |
| 25 | `POST` | `/teachers/{teacher}/documents/{document}/verify` | Verify or reject a document |
| 26 | `POST` | `/teachers/{teacher}/documents/{document}/delete` | Delete a document |

Path parameters are all uuid: `{teacher}` is the teacher `id`, `{assignment}`, `{qualification}`, `{training}`, `{experience}` and `{document}` are the `id` of the matching record.

Note: only list and show use `GET`. Every action (create, update, activate, delete, remove, verify) uses `POST`. There is no update endpoint for qualifications, trainings, experiences, documents or assignments.

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
- `data` is an array for list endpoints and an object for create, show and update endpoints.
- Activate, inactivate, all delete and all remove endpoints return **no `data`**, only `status` and `message`.
- The verify document endpoint can return `data: null` (spec allows `TeacherDocument | null`), so handle it.

Errors:

| Status | Meaning | Body |
|--------|---------|------|
| `401` | Unauthenticated | `{ "message": string }` |
| `404` | Record not found | `{ "message": string }` |
| `422` | Validation error | `{ "message": string, "errors": { "<field>": [string, ...] } }` |

`404` applies to every endpoint that has a path parameter. `422` applies only to endpoints with a request body, and is listed per endpoint below.

---

## 1. List teachers

`GET /teachers`

- Response `200`: `data` is an array of [Teacher](#teacher).
- Errors: `401`

## 2. Create teacher

`POST /teachers`

Creates both the User account and the Teacher profile.

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| `name_en` | string | Yes | max 200 |
| `email` | string | Yes | email format |
| `phone` | string | Yes | max 20 |
| `designation` | string | Yes | max 100 |
| `employment_type` | string | Yes | `full_time`, `part_time`, `contractual`, `visiting`, `mpo`, `non_mpo` |
| `name_bn` | string or null | No | max 200 |
| `department` | string or null | No | max 100 |
| `mpo_status` | boolean or null | No | |
| `mpo_index` | string or null | No | max 50 |
| `probation_end_date` | string or null | No | `date-time` |
| `salary_grade` | string or null | No | max 50 |
| `bank_info` | array of string or null | No | |
| `tin_number` | string or null | No | max 50 |
| `emergency_contact_name` | string or null | No | max 100 |
| `emergency_contact_phone` | string or null | No | max 20 |
| `emergency_contact_relation` | string or null | No | max 50 |

- `employee_id` is not in the request body, so it is not sent on create.
- Response `201`: message `Teacher created successfully.`, `data` is a [Teacher](#teacher).
- Errors: `401`, `422`

## 3. Get teacher

`GET /teachers/{teacher}`

- Response `200`: `data` is a [Teacher](#teacher).
- Errors: `401`, `404`

## 4. Update teacher

`POST /teachers/{teacher}/update`

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| `designation` | string | No | max 100 |
| `department` | string or null | No | max 100 |
| `employment_type` | string | No | `full_time`, `part_time`, `contractual`, `visiting`, `mpo`, `non_mpo` |
| `mpo_status` | boolean or null | No | |
| `mpo_index` | string or null | No | max 50 |
| `probation_end_date` | string or null | No | `date-time` |
| `confirmation_date` | string or null | No | `date-time` |
| `salary_grade` | string or null | No | max 50 |
| `bank_info` | array of string or null | No | |
| `tin_number` | string or null | No | max 50 |
| `emergency_contact_name` | string or null | No | max 100 |
| `emergency_contact_phone` | string or null | No | max 20 |
| `emergency_contact_relation` | string or null | No | max 50 |
| `is_active` | boolean or null | No | |

- `name_en`, `name_bn`, `email` and `phone` are **not** in the update body.
- `confirmation_date` and `is_active` can be set here but not on create.
- Response `200`: message `Teacher updated successfully.`, `data` is a [Teacher](#teacher).
- Errors: `401`, `404`, `422`

## 5. Activate teacher

`POST /teachers/{teacher}/activate`

- No request body.
- Response `200`: message `Teacher activated successfully.` (no `data`).
- Errors: `401`, `404`

## 6. Inactivate teacher

`POST /teachers/{teacher}/inactivate`

- No request body.
- Response `200`: message `Teacher inactivated successfully.` (no `data`).
- Errors: `401`, `404`

## 7. Teacher workload

`GET /teachers/workload`

- Returns subject count, class count and total assignments per teacher.
- Response `200`: `data` is an array of [WorkloadItem](#workloaditem).
- Errors: `401`

---

## 8. Assign subject teacher

`POST /teachers/assign-subject`

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| `academic_year_id` | string | Yes | uuid |
| `school_class_id` | string | Yes | uuid |
| `school_section_id` | string | Yes | uuid |
| `subject_id` | string | Yes | uuid |
| `teacher_id` | string | Yes | uuid |
| `effective_date` | string or null | No | `date-time` |

- Response `201`: message `Subject teacher assigned successfully.`, `data` is a [SubjectTeacherAssignment](#subjectteacherassignment).
- Errors: `401`, `422`

## 9. List subject assignments of a teacher

`GET /teachers/{teacher}/subject-assignments`

- Response `200`: `data` is an array of [SubjectTeacherAssignment](#subjectteacherassignment).
- Errors: `401`, `404`

## 10. Remove subject assignment

`POST /teachers/subject-assignments/{assignment}/remove`

- No request body.
- Response `200`: message `Subject assignment removed.` (no `data`).
- Errors: `401`, `404`

## 11. Assign class teacher

`POST /teachers/assign-class-teacher`

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| `academic_year_id` | string | Yes | uuid |
| `school_section_id` | string | Yes | uuid |
| `teacher_id` | string | Yes | uuid |
| `effective_date` | string or null | No | `date-time` |

- There is no `school_class_id` here. A class teacher is assigned to a **section**.
- Response `201`: message `Class teacher assigned successfully.`, `data` is a [ClassTeacherAssignment](#classteacherassignment).
- Errors: `401`, `422`

## 12. List class teacher assignments

`GET /teachers/class-teacher-assignments`

- Response `200`: `data` is an array of [ClassTeacherAssignment](#classteacherassignment).
- Errors: `401`

## 13. Remove class teacher assignment

`POST /teachers/class-teacher-assignments/{assignment}/remove`

- No request body.
- Response `200`: message `Class teacher assignment removed.` (no `data`).
- Errors: `401`, `404`

---

## 14. List qualifications

`GET /teachers/{teacher}/qualifications`

- Response `200`: `data` is an array of [TeacherQualification](#teacherqualification).
- Errors: `401`, `404`

## 15. Add qualification

`POST /teachers/{teacher}/qualifications`

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| `degree` | string | Yes | max 100 |
| `subject` | string or null | No | max 200 |
| `institution` | string or null | No | max 200 |
| `board` | string or null | No | max 100 |
| `result` | string or null | No | max 50 |
| `passing_year` | integer or null | No | min 1900, max 2100 |
| `certificate_url` | string or null | No | |
| `status` | string or null | No | max 20 |
| `is_highest` | boolean or null | No | |

- Response `201`: message `Qualification added successfully.`, `data` is a [TeacherQualification](#teacherqualification).
- Errors: `401`, `404`, `422`

## 16. Delete qualification

`POST /teachers/{teacher}/qualifications/{qualification}/delete`

- No request body.
- Response `200`: message `Qualification deleted successfully.` (no `data`).
- Errors: `401`, `404`

---

## 17. List trainings

`GET /teachers/{teacher}/trainings`

- Response `200`: `data` is an array of [TeacherTraining](#teachertraining).
- Errors: `401`, `404`

## 18. Add training

`POST /teachers/{teacher}/trainings`

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| `training_name` | string | Yes | max 200 |
| `provider` | string or null | No | max 200 |
| `duration` | string or null | No | max 100 |
| `completion_date` | string or null | No | `date-time` |
| `expiry_date` | string or null | No | `date-time` |
| `certificate_url` | string or null | No | |
| `description` | string or null | No | |

- Response `201`: message `Training added successfully.`, `data` is a [TeacherTraining](#teachertraining).
- Errors: `401`, `404`, `422`

## 19. Delete training

`POST /teachers/{teacher}/trainings/{training}/delete`

- No request body.
- Response `200`: message `Training deleted successfully.` (no `data`).
- Errors: `401`, `404`

---

## 20. List experiences

`GET /teachers/{teacher}/experiences`

- Response `200`: `data` is an array of [TeacherExperience](#teacherexperience).
- Errors: `401`, `404`

## 21. Add experience

`POST /teachers/{teacher}/experiences`

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| `organization` | string | Yes | max 200 |
| `designation` | string or null | No | max 100 |
| `from_date` | string or null | No | `date-time` |
| `to_date` | string or null | No | `date-time` |
| `is_current` | boolean or null | No | |
| `responsibilities` | string or null | No | |
| `certificate_url` | string or null | No | |

- Response `201`: message `Experience added successfully.`, `data` is a [TeacherExperience](#teacherexperience).
- Errors: `401`, `404`, `422`

## 22. Delete experience

`POST /teachers/{teacher}/experiences/{experience}/delete`

- No request body.
- Response `200`: message `Experience deleted successfully.` (no `data`).
- Errors: `401`, `404`

---

## 23. List documents

`GET /teachers/{teacher}/documents`

- Response `200`: `data` is an array of [TeacherDocument](#teacherdocument).
- Errors: `401`, `404`

## 24. Upload document

`POST /teachers/{teacher}/documents`

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| `document_type` | string | Yes | max 50 |
| `file_url` | string | Yes | |
| `document_name` | string or null | No | max 200 |
| `expiry_date` | string or null | No | `date-time` |
| `verification_status` | string or null | No | `pending`, `verified` or `rejected` |
| `remarks` | string or null | No | |

- The body takes a `file_url`. It does not upload a file itself.
- Response `201`: message `Document added successfully.`, `data` is a [TeacherDocument](#teacherdocument).
- Errors: `401`, `404`, `422`

## 25. Verify document

`POST /teachers/{teacher}/documents/{document}/verify`

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| `verification_status` | string | Yes | `verified` or `rejected` |
| `remarks` | string or null | No | |

- `pending` is **not** allowed here.
- Response `200`: message `Document verification status updated.`, `data` is a [TeacherDocument](#teacherdocument) or `null`.
- Errors: `401`, `404`, `422`

## 26. Delete document

`POST /teachers/{teacher}/documents/{document}/delete`

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| `delete_reason` | string | No | |

- The body is optional, and `delete_reason` here is not nullable, so do not send `null`.
- Response `200`: message `Document deleted successfully.` (no `data`).
- Errors: `401`, `404`

---

## Schemas

### Teacher

| Field | Type | Nullable |
|-------|------|----------|
| `id` | string | No |
| `tenant_id` | string | No |
| `user_id` | string | No |
| `employee_id` | string | No |
| `designation` | string | Yes |
| `department` | string | Yes |
| `employment_type` | string | No |
| `mpo_status` | boolean | No |
| `mpo_index` | string | Yes |
| `probation_end_date` | string (`date-time`) | Yes |
| `confirmation_date` | string (`date-time`) | Yes |
| `salary_grade` | string | Yes |
| `bank_info` | array | Yes |
| `tin_number` | string | Yes |
| `emergency_contact_name` | string | Yes |
| `emergency_contact_phone` | string | Yes |
| `emergency_contact_relation` | string | Yes |
| `is_active` | boolean | No |
| `created_at` | string (`date-time`) | Yes |
| `deleted_at` | string (`date-time`) | Yes |

The teacher's name, email and phone are **not** in this schema. They belong to the linked User (`user_id`).

### WorkloadItem

| Field | Type | Nullable |
|-------|------|----------|
| `id` | string | No |
| `employee_id` | string | No |
| `designation` | string | Yes |
| `department` | string | Yes |
| `subjects` | string | No |
| `class_teacher_sections` | string | No |
| `total_assignments` | string | No |

`subjects`, `class_teacher_sections` and `total_assignments` are typed as **string**, not integer.

### SubjectTeacherAssignment

| Field | Type | Nullable |
|-------|------|----------|
| `id` | string | No |
| `tenant_id` | string | No |
| `academic_year_id` | string | No |
| `school_class_id` | string | No |
| `school_section_id` | string | No |
| `subject_id` | string | No |
| `teacher_id` | string | No |
| `effective_date` | string (`date-time`) | Yes |
| `end_date` | string (`date-time`) | Yes |
| `is_active` | boolean | No |

### ClassTeacherAssignment

| Field | Type | Nullable |
|-------|------|----------|
| `id` | string | No |
| `tenant_id` | string | No |
| `academic_year_id` | string | No |
| `school_section_id` | string | No |
| `teacher_id` | string | No |
| `effective_date` | string (`date-time`) | Yes |
| `end_date` | string (`date-time`) | Yes |
| `is_active` | boolean | No |

### TeacherQualification

| Field | Type | Nullable |
|-------|------|----------|
| `id` | string | No |
| `tenant_id` | string | No |
| `teacher_id` | string | No |
| `degree` | string | No |
| `subject` | string | Yes |
| `institution` | string | Yes |
| `board` | string | Yes |
| `result` | string | Yes |
| `passing_year` | integer | Yes |
| `certificate_url` | string | Yes |
| `status` | string | No |
| `is_highest` | boolean | No |

### TeacherTraining

| Field | Type | Nullable |
|-------|------|----------|
| `id` | string | No |
| `tenant_id` | string | No |
| `teacher_id` | string | No |
| `training_name` | string | No |
| `provider` | string | Yes |
| `duration` | string | Yes |
| `completion_date` | string (`date-time`) | Yes |
| `expiry_date` | string (`date-time`) | Yes |
| `certificate_url` | string | Yes |
| `description` | string | Yes |

### TeacherExperience

| Field | Type | Nullable |
|-------|------|----------|
| `id` | string | No |
| `tenant_id` | string | No |
| `teacher_id` | string | No |
| `organization` | string | No |
| `designation` | string | Yes |
| `from_date` | string (`date-time`) | Yes |
| `to_date` | string (`date-time`) | Yes |
| `is_current` | boolean | No |
| `responsibilities` | string | Yes |
| `certificate_url` | string | Yes |

### TeacherDocument

| Field | Type | Nullable |
|-------|------|----------|
| `id` | string | No |
| `tenant_id` | string | No |
| `teacher_id` | string | No |
| `document_type` | string | No |
| `document_name` | string | Yes |
| `file_url` | string | No |
| `expiry_date` | string (`date-time`) | Yes |
| `verification_status` | string | No |
| `remarks` | string | Yes |
| `deleted_by` | string | Yes |
| `delete_reason` | string | Yes |

---

## Important notes

- Creating a teacher also creates a User account. The teacher's name, email and phone live on the User, not on the Teacher record.
- A **subject** assignment needs year, class, section, subject and teacher. A **class teacher** assignment needs year, section and teacher only.
- `employment_type` values: `full_time`, `part_time`, `contractual`, `visiting`, `mpo`, `non_mpo`.
- Document `verification_status` is `pending`, `verified` or `rejected` on upload, but only `verified` or `rejected` on verify.
- `is_active` on a teacher can be changed through update, activate or inactivate.
- Not defined in the spec: filters on any list endpoint, how `employee_id` is generated, the `bank_info` item format in responses, the values of qualification `status`, whether deleted or removed records are hidden from lists, and how the created User logs in.
