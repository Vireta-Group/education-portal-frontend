# EPS API: Academic Subjects

Module: **Academic Management > Subjects** (manage subjects with type: theory, practical, both).

- All paths below are relative to the base URL (set in `.env`).
- All endpoints require a bearer token: `Authorization: Bearer <token>`
- Requests and responses are `application/json`.

---

## Endpoints

| # | Method | Path | Purpose |
|---|--------|------|---------|
| 1 | `GET` | `/academic/subjects` | List all subjects for the tenant |
| 2 | `POST` | `/academic/subjects` | Create a subject |
| 3 | `GET` | `/academic/subjects/{subject}` | Get one subject |
| 4 | `POST` | `/academic/subjects/{subject}/update` | Update a subject |
| 5 | `POST` | `/academic/subjects/{subject}/activate` | Set `is_active = true` |
| 6 | `POST` | `/academic/subjects/{subject}/inactivate` | Set `is_active = false` |
| 7 | `POST` | `/academic/subjects/{subject}/delete` | Soft-delete a subject |

`{subject}` is the subject `id` (uuid).

Note: update, activate, inactivate and delete all use `POST` (no `PUT`/`PATCH`/`DELETE`).

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
- `data` is an array for the list endpoint, an object for the others. The delete endpoint returns no `data`.
- On create, update, activate and inactivate, `data` can also be `null` (spec allows `Subject | null`), so handle it.

Errors:

| Status | Meaning | Body |
|--------|---------|------|
| `401` | Unauthenticated | `{ "message": string }` |
| `404` | Subject not found | `{ "message": string }` |
| `422` | Validation error | `{ "message": string, "errors": { "<field>": [string, ...] } }` |

---

## 1. List subjects

`GET /academic/subjects`

- Can be filtered by `is_active` or `subject_type`. The spec does not define these params, so confirm how they are passed.
- Response `200`: `data` is an array of [Subject](#subject).
- Errors: `401`

---

## 2. Create subject

`POST /academic/subjects`

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| `subject_name` | string | Yes | max 100 |
| `subject_name_bn` | string or null | No | max 200 |
| `subject_code` | string or null | No | max 50 |
| `subject_type` | string or null | No | `theory`, `practical` or `both` |
| `credit_hour` | number or null | No | min 0, max 99.99 |
| `is_optional` | boolean or null | No | |
| `is_active` | boolean or null | No | |

- Response `201`: message `Subject created successfully.`, `data` is a [Subject](#subject).
- Errors: `401`, `422`

---

## 3. Get subject

`GET /academic/subjects/{subject}`

- Response `200`: `data` is a [Subject](#subject).
- Errors: `401`, `404`

---

## 4. Update subject

`POST /academic/subjects/{subject}/update`

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| `subject_name` | string | No | max 100 |
| `subject_name_bn` | string or null | No | max 200 |
| `subject_code` | string or null | No | max 50 |
| `subject_type` | string or null | No | `theory`, `practical` or `both` |
| `credit_hour` | number or null | No | min 0, max 99.99 |
| `is_optional` | boolean or null | No | |
| `is_active` | boolean or null | No | |

- All fields are optional. Send only what needs to change.
- Response `200`: message `Subject updated successfully.`, `data` is a [Subject](#subject).
- Errors: `401`, `404`, `422`

---

## 5. Activate subject

`POST /academic/subjects/{subject}/activate`

- No request body.
- Sets `is_active` to `true`.
- Response `200`: message `Subject activated successfully.`
- Errors: `401`, `404`

---

## 6. Inactivate subject

`POST /academic/subjects/{subject}/inactivate`

- No request body.
- Sets `is_active` to `false`.
- Response `200`: message `Subject inactivated successfully.`
- Errors: `401`, `404`

---

## 7. Delete subject (soft delete)

`POST /academic/subjects/{subject}/delete`

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| `delete_reason` | string or null | No | max 500 |

- Sets `deleted_at`, `deleted_by` and the optional `delete_reason`.
- Response `200`: `{ "status": "success", "message": "Subject deleted successfully." }` (no `data`).
- Errors: `401`, `404`, `422`

---

## Subject

Returned in `data` by endpoints 1 to 6.

| Field | Type | Nullable |
|-------|------|----------|
| `id` | string | No |
| `tenant_id` | string | No |
| `branch_id` | string | Yes |
| `subject_name` | string | No |
| `subject_name_bn` | string | Yes |
| `subject_code` | string | Yes |
| `subject_type` | string | No |
| `credit_hour` | string | Yes |
| `is_optional` | boolean | No |
| `is_active` | boolean | No |
| `status` | string | No |

`is_active` (on/off toggle) and `status` (record status) are two different fields.

---

## Important notes

- Only `subject_name` is required on create.
- **`credit_hour` type differs:** requests take a number (0 to 99.99), responses return a **string** (or null).
- `subject_type` is nullable in requests, but the response `subject_type` is a non-null string.
- `is_optional` and `is_active` are nullable in requests, but always boolean in responses.
- `is_active` can be changed through update, activate or inactivate.
- Not defined in the spec: how the list filters are passed, the values of `status`, and whether deleted subjects are hidden from list and show.
