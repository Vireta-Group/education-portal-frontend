# Academic Management — Academic Years API

> Base URL: `https://school.acharu.com`
> Tag: `Academic Management > Academic Years`
> Auth: Bearer token (`Authorization: Bearer <token>`) — required on all endpoints.

This document describes the **5 sub-paths** under the Academic Years API. Each section
lists the HTTP method, full path, path parameters, request body (fields, types, and
required flags), and every possible response (status code, response body schema, and
required fields).

---

## Shared Definitions (referenced by multiple endpoints)

### Error response — `401 AuthenticationException`
Returned when the request is unauthenticated.
```json
{
  "message": "string"
}
```
- `message` (string, **required**): error overview.

### Error response — `422 ValidationException`
Returned when the request body fails validation.
```json
{
  "message": "string",
  "errors": {
    "<field_name>": ["string", "..."]
  }
}
```
- `message` (string, **required**): errors overview.
- `errors` (object, **required**): map of field name → array of error message strings.

### Error response — `404 ModelNotFoundException`
Returned when the requested resource does not exist.
```json
{
  "message": "string"
}
```
- `message` (string, **required**): error overview.

### `AcademicYear` object (returned as `data`)
```json
{
  "id": "string",
  "tenant_id": "string",
  "branch_id": "string | null",
  "year_name": "string",
  "year_name_bn": "string | null",
  "start_date": "date",
  "end_date": "date",
  "is_current": "boolean",
  "year_status": "string",
  "is_locked": "boolean",
  "locked_at": "date-time | null",
  "locked_by": "string | null",
  "result_published": "boolean",
  "promotion_completed": "boolean",
  "fee_settled": "boolean",
  "library_cleared": "boolean",
  "copied_from_year_id": "string | null",
  "copy_scope": "string | null",
  "is_demo": "boolean",
  "status": "string",
  "deleted_at": "date-time | null",
  "deleted_by": "string | null",
  "delete_reason": "string | null",
  "created_by": "string | null",
  "updated_by": "string | null",
  "created_at": "date-time | null",
  "updated_at": "date-time | null"
}
```

---

## 1. GET `/academic/years`
**Operation:** `academicYear.index`
**Summary:** List all academic years for the tenant
**Description:** Optionally filter by `status` or `is_current`.

- **Path Parameters:** none
- **Query Parameters:** none documented (filter via `status` / `is_current` described in text only)
- **Request Body:** none

### Responses
**200 OK** — Success
```json
{
  "status": "success",
  "data": [ "AcademicYear", "..."]
}
```
- `status` (string, const `"success"`, **required**)
- `data` (array of `AcademicYear`, **required**)

**401** — `AuthenticationException` (see shared definitions)

---

## 2. POST `/academic/years`
**Operation:** `academicYear.store`
**Summary:** Create a new academic year
**Description:**
- **Required:** `year_name`, `start_date`, `end_date`
- **Optional:** `year_name_bn`, `is_current`, `branch_id`, `copied_from_year_id`, `copy_scope`

- **Path Parameters:** none
- **Request Body:** **required** (`application/json`)

| Field | Type | Required | Constraints |
|---|---|---|---|
| `year_name` | string | **yes** | maxLength 100 |
| `year_name_bn` | string \| null | no | maxLength 200 |
| `start_date` | string (date-time) | **yes** | — |
| `end_date` | string (date-time) | **yes** | — |
| `is_current` | boolean \| null | no | — |
| `branch_id` | string \| null | no | minLength 36, maxLength 36 |
| `copied_from_year_id` | string \| null (uuid) | no | — |
| `copy_scope` | string \| null | no | — |

### Responses
**201 Created** — Success
```json
{
  "status": "success",
  "message": "Academic year created successfully.",
  "data": "AcademicYear | null"
}
```
- `status` (string, const `"success"`, **required**)
- `message` (string, const `"Academic year created successfully."`, **required**)
- `data` (`AcademicYear` or `null`, **required**)

**422** — `ValidationException` (see shared definitions)
**401** — `AuthenticationException` (see shared definitions)

---

## 3. GET `/academic/years/{year}`
**Operation:** `academicYear.show`
**Summary:** Get a single academic year

- **Path Parameters:**
  - `year` (string, uuid, **required**) — The year ID
- **Request Body:** none

### Responses
**200 OK** — Success
```json
{
  "status": "success",
  "data": "AcademicYear"
}
```
- `status` (string, const `"success"`, **required**)
- `data` (`AcademicYear`, **required**)

**404** — `ModelNotFoundException` (see shared definitions)
**401** — `AuthenticationException` (see shared definitions)

---

## 4. POST `/academic/years/{year}/activate`
**Operation:** `academicYear.activate`
**Summary:** Activate an academic year
**Description:** Sets the year as current, deactivates all other years for the tenant, and auto-archives the previously active year.

- **Path Parameters:**
  - `year` (string, uuid, **required**) — The year ID
- **Request Body:** none

### Responses
**200 OK** — Success
```json
{
  "status": "success",
  "message": "Academic year activated successfully. Previous year has been archived.",
  "data": "AcademicYear | null"
}
```
- `status` (string, const `"success"`, **required**)
- `message` (string, const `"Academic year activated successfully. Previous year has been archived."`, **required**)
- `data` (`AcademicYear` or `null`, **required**)

**404** — `ModelNotFoundException` (see shared definitions)
**401** — `AuthenticationException` (see shared definitions)

---

## 5. POST `/academic/years/{year}/archive`
**Operation:** `academicYear.archive`
**Summary:** Archive an academic year
**Description:** Makes the year read-only (`is_locked = true`, `year_status = archived`). If it was current, it will be deactivated.

- **Path Parameters:**
  - `year` (string, uuid, **required**) — The year ID
- **Request Body:** none

### Responses
**200 OK** — Success
```json
{
  "status": "success",
  "message": "Academic year archived successfully.",
  "data": "AcademicYear | null"
}
```
- `status` (string, const `"success"`, **required**)
- `message` (string, const `"Academic year archived successfully."`, **required**)
- `data` (`AcademicYear` or `null`, **required**)

**404** — `ModelNotFoundException` (see shared definitions)
**401** — `AuthenticationException` (see shared definitions)

---

## 6. POST `/academic/years/{year}/copy`
**Operation:** `academicYear.copy`
**Summary:** Copy structure from a previous academic year
**Description:** Records the copy source and scope for later processing when Class/Section/Subject modules are implemented.
- **Required:** `copy_scope`
- **Optional:** `copied_from_year_id` (defaults to latest previous year)

- **Path Parameters:**
  - `year` (string, uuid, **required**) — The year ID
- **Request Body:** **required** (`application/json`)

| Field | Type | Required | Constraints |
|---|---|---|---|
| `copy_scope` | string | **yes** | — |
| `copied_from_year_id` | string \| null (uuid) | no | — |

### Responses
**200 OK** — Success
```json
{
  "status": "success",
  "message": "Copy preferences saved. Structure will be duplicated when Class/Section modules are available.",
  "data": "AcademicYear | null"
}
```
- `status` (string, const `"success"`, **required**)
- `message` (string, const `"Copy preferences saved. Structure will be duplicated when Class/Section modules are available."`, **required**)
- `data` (`AcademicYear` or `null`, **required**)

**422** — `ValidationException` (see shared definitions)
**404** — `ModelNotFoundException` (see shared definitions)
**401** — `AuthenticationException` (see shared definitions)

---

## Quick Reference Table

| # | Method | Path | Path Params | Request Body | Success Response |
|---|---|---|---|---|---|
| 1 | GET | `/academic/years` | none | none | 200 `{status, data[]}` |
| 2 | POST | `/academic/years` | none | year_name*, start_date*, end_date* | 201 `{status, message, data}` |
| 3 | GET | `/academic/years/{year}` | year (uuid)* | none | 200 `{status, data}` |
| 4 | POST | `/academic/years/{year}/activate` | year (uuid)* | none | 200 `{status, message, data}` |
| 5 | POST | `/academic/years/{year}/archive` | year (uuid)* | none | 200 `{status, message, data}` |
| 6 | POST | `/academic/years/{year}/copy` | year (uuid)* | copy_scope* | 200 `{status, message, data}` |

(*) = required
