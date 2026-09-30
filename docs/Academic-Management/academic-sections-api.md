# EPS API: Academic Sections

Module: **Academic Management > Sections** (manage class sections with shift type: morning, day, evening).

- All paths below are relative to the base URL (set in `.env`).
- All endpoints require a bearer token: `Authorization: Bearer <token>`
- Requests and responses are `application/json`.

---

## Endpoints

| # | Method | Path | Purpose |
|---|--------|------|---------|
| 1 | `GET` | `/academic/sections` | List all sections for the tenant |
| 2 | `POST` | `/academic/sections` | Create a section |
| 3 | `GET` | `/academic/sections/{section}` | Get one section |
| 4 | `POST` | `/academic/sections/{section}/update` | Update a section |
| 5 | `POST` | `/academic/sections/{section}/activate` | Set `is_active = true` |
| 6 | `POST` | `/academic/sections/{section}/inactivate` | Set `is_active = false` |
| 7 | `POST` | `/academic/sections/{section}/delete` | Soft-delete a section |

`{section}` is the section `id` (uuid).

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
- On create, update, activate and inactivate, `data` can also be `null` (spec allows `SchoolSection | null`), so handle it.

Errors:

| Status | Meaning | Body |
|--------|---------|------|
| `401` | Unauthenticated | `{ "message": string }` |
| `404` | Section not found | `{ "message": string }` |
| `422` | Validation error | `{ "message": string, "errors": { "<field>": [string, ...] } }` |

---

## 1. List sections

`GET /academic/sections`

- Can be filtered by `school_class_id`, `shift` or `is_active`. The spec does not define these params, so confirm how they are passed.
- Response `200`: `data` is an array of [SchoolSection](#schoolsection).
- Errors: `401`

---

## 2. Create section

`POST /academic/sections`

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| `school_class_id` | string | Yes | uuid |
| `section_name` | string | Yes | max 100 |
| `section_name_bn` | string or null | No | max 200 |
| `max_capacity` | integer or null | No | min 1 |
| `class_teacher_id` | string or null | No | uuid |
| `room_number` | string or null | No | max 50 |
| `shift` | string or null | No | `morning`, `day` or `evening` |
| `is_active` | boolean or null | No | |

- Response `201`: message `Section created successfully.`, `data` is a [SchoolSection](#schoolsection).
- Errors: `401`, `422`

---

## 3. Get section

`GET /academic/sections/{section}`

- Response `200`: `data` is a [SchoolSection](#schoolsection).
- Errors: `401`, `404`

---

## 4. Update section

`POST /academic/sections/{section}/update`

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| `school_class_id` | string | No | uuid |
| `section_name` | string | No | max 100 |
| `section_name_bn` | string or null | No | max 200 |
| `max_capacity` | integer or null | No | min 1 |
| `class_teacher_id` | string or null | No | uuid |
| `room_number` | string or null | No | max 50 |
| `shift` | string or null | No | `morning`, `day` or `evening` |
| `is_active` | boolean or null | No | |

- All fields are optional. Send only what needs to change.
- Response `200`: message `Section updated successfully.`, `data` is a [SchoolSection](#schoolsection).
- Errors: `401`, `404`, `422`

---

## 5. Activate section

`POST /academic/sections/{section}/activate`

- No request body.
- Sets `is_active` to `true`.
- Response `200`: message `Section activated successfully.`
- Errors: `401`, `404`

---

## 6. Inactivate section

`POST /academic/sections/{section}/inactivate`

- No request body.
- Sets `is_active` to `false`.
- Response `200`: message `Section inactivated successfully.`
- Errors: `401`, `404`

---

## 7. Delete section (soft delete)

`POST /academic/sections/{section}/delete`

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| `delete_reason` | string or null | No | max 500 |

- Sets `deleted_at`, `deleted_by` and the optional `delete_reason`.
- Response `200`: `{ "status": "success", "message": "Section deleted successfully." }` (no `data`).
- Errors: `401`, `404`, `422`

---

## SchoolSection

Returned in `data` by endpoints 1 to 6.

| Field | Type | Nullable |
|-------|------|----------|
| `id` | string | No |
| `tenant_id` | string | No |
| `branch_id` | string | Yes |
| `school_class_id` | string | No |
| `section_name` | string | No |
| `section_name_bn` | string | Yes |
| `max_capacity` | integer | Yes |
| `class_teacher_id` | string | Yes |
| `room_number` | string | Yes |
| `shift` | string | No |
| `is_active` | boolean | No |
| `status` | string | No |

`is_active` (on/off toggle) and `status` (record status) are two different fields.

---

## Important notes

- A section belongs to a class through `school_class_id` (see the Classes API for class ids).
- `school_class_id` and `section_name` are the only required fields on create.
- `shift` is nullable in requests, but the response `shift` is a non-null string.
- `is_active` can be changed through update, activate or inactivate.
- Not defined in the spec: how the list filters are passed, the values of `status`, and whether deleted sections are hidden from list and show (the Classes API docs say so, the Sections docs do not).
