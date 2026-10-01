# EPS API: Academic Years

Module: **Academic Management > Academic Years** (manage academic years, activate, archive, copy data).

- All paths below are relative to the base URL (set in `.env`).
- All endpoints require a bearer token: `Authorization: Bearer <token>`
- Requests and responses are `application/json`.

---

## Endpoints

| # | Method | Path | Purpose |
|---|--------|------|---------|
| 1 | `GET` | `/academic/years` | List all academic years for the tenant |
| 2 | `POST` | `/academic/years` | Create an academic year |
| 3 | `GET` | `/academic/years/{year}` | Get one academic year |
| 4 | `POST` | `/academic/years/{year}/activate` | Set a year as current |
| 5 | `POST` | `/academic/years/{year}/archive` | Archive a year (read-only) |
| 6 | `POST` | `/academic/years/{year}/copy` | Save copy source and scope |

`{year}` is the academic year `id` (uuid).

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
- `data` is an array for the list endpoint, an object for the others.
- On POST endpoints `data` can also be `null` (spec allows `AcademicYear | null`), so handle it.

Errors:

| Status | Meaning | Body |
|--------|---------|------|
| `401` | Unauthenticated | `{ "message": string }` |
| `404` | Year not found | `{ "message": string }` |
| `422` | Validation error | `{ "message": string, "errors": { "<field>": [string, ...] } }` |

---

## 1. List academic years

`GET /academic/years`

- Returns all academic years for the tenant.
- Can be filtered by `status` or `is_current`. The spec does not define these params, so confirm how they are passed.
- Response `200`: `data` is an array of [AcademicYear](#academicyear).
- Errors: `401`

---

## 2. Create academic year

`POST /academic/years`

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| `year_name` | string | Yes | max 100 |
| `start_date` | string | Yes | `date-time` |
| `end_date` | string | Yes | `date-time` |
| `year_name_bn` | string or null | No | max 200 |
| `is_current` | boolean or null | No | |
| `branch_id` | string or null | No | exactly 36 chars |
| `copied_from_year_id` | string or null | No | uuid |
| `copy_scope` | string or null | No | |

- Response `201`: message `Academic year created successfully.`, `data` is an [AcademicYear](#academicyear).
- Errors: `401`, `422`

---

## 3. Get academic year

`GET /academic/years/{year}`

- Response `200`: `data` is an [AcademicYear](#academicyear).
- Errors: `401`, `404`

---

## 4. Activate academic year

`POST /academic/years/{year}/activate`

- No request body.
- Sets this year as current, deactivates all other years for the tenant, and **auto-archives the previously active year**.
- Response `200`: message `Academic year activated successfully. Previous year has been archived.`
- Errors: `401`, `404`

---

## 5. Archive academic year

`POST /academic/years/{year}/archive`

- No request body.
- Makes the year read-only: `is_locked = true`, `year_status = archived`.
- If the year was current, it is deactivated.
- Response `200`: message `Academic year archived successfully.`
- Errors: `401`, `404`

---

## 6. Copy structure from a previous year

`POST /academic/years/{year}/copy`

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `copy_scope` | string | Yes | Valid values not defined in spec |
| `copied_from_year_id` | string or null | No | uuid. Defaults to the latest previous year |

- `{year}` is the target year.
- Only **records** the copy source and scope for later processing. Actual duplication will happen when the Class/Section/Subject modules are implemented.
- Response `200`: message `Copy preferences saved. Structure will be duplicated when Class/Section modules are available.`
- Errors: `401`, `404`, `422`

---

## AcademicYear

Returned in `data` by all endpoints.

| Field | Type | Nullable |
|-------|------|----------|
| `id` | string | No |
| `tenant_id` | string | No |
| `branch_id` | string | Yes |
| `year_name` | string | No |
| `year_name_bn` | string | Yes |
| `start_date` | string (`date`) | No |
| `end_date` | string (`date`) | No |
| `is_current` | boolean | No |
| `year_status` | string | No |
| `is_locked` | boolean | No |
| `locked_at` | string (`date-time`) | Yes |
| `locked_by` | string | Yes |
| `result_published` | boolean | No |
| `promotion_completed` | boolean | No |
| `fee_settled` | boolean | No |
| `library_cleared` | boolean | No |
| `copied_from_year_id` | string | Yes |
| `copy_scope` | string | Yes |
| `is_demo` | boolean | No |
| `status` | string | No |
| `deleted_at` | string (`date-time`) | Yes |
| `deleted_by` | string | Yes |
| `delete_reason` | string | Yes |
| `created_by` | string | Yes |
| `updated_by` | string | Yes |
| `created_at` | string (`date-time`) | Yes |
| `updated_at` | string (`date-time`) | Yes |

`year_status` (lifecycle, e.g. `archived`) and `status` (record status) are two different fields.

---

## Important notes

- **Date format differs:** requests use `date-time`, responses return `date`.
- `activate` and `archive` change other years too. Do not call them without a clear intent.
- Archived years are locked (read-only).
- `copy` does not duplicate any data yet.
- Not defined in the spec: valid `copy_scope` values, full `year_status` values, list filter param format.