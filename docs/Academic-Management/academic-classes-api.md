# EPS API: Academic Classes

Module: **Academic Management > Classes** (manage class levels, e.g. Six-Ten, with type and ordering).

- All paths below are relative to the base URL (set in `.env`).
- All endpoints require a bearer token: `Authorization: Bearer <token>`
- Requests and responses are `application/json`.

---

## Endpoints

| # | Method | Path | Purpose |
|---|--------|------|---------|
| 1 | `GET` | `/academic/classes` | List all classes for the tenant |
| 2 | `POST` | `/academic/classes` | Create a class |
| 3 | `GET` | `/academic/classes/{schoolClass}` | Get one class |
| 4 | `POST` | `/academic/classes/{schoolClass}/update` | Update a class |
| 5 | `POST` | `/academic/classes/{schoolClass}/activate` | Set `is_active = true` |
| 6 | `POST` | `/academic/classes/{schoolClass}/inactivate` | Set `is_active = false` |
| 7 | `POST` | `/academic/classes/{schoolClass}/delete` | Soft-delete a class |

`{schoolClass}` is the class `id` (uuid).

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
- On create, update, activate and inactivate, `data` can also be `null` (spec allows `SchoolClass | null`), so handle it.

Errors:

| Status | Meaning | Body |
|--------|---------|------|
| `401` | Unauthenticated | `{ "message": string }` |
| `404` | Class not found | `{ "message": string }` |
| `422` | Validation error | `{ "message": string, "errors": { "<field>": [string, ...] } }` |

---

## 1. List classes

`GET /academic/classes`

- Sorted by `numeric_order` ascending.
- Can be filtered by `is_active`. The spec does not define this param, so confirm how it is passed.
- Response `200`: `data` is an array of [SchoolClass](#schoolclass).
- Errors: `401`

---

## 2. Create class

`POST /academic/classes`

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| `class_name` | string | Yes | max 100 |
| `class_type` | string | Yes | `regular`, `special` or `vocational` |
| `class_name_bn` | string or null | No | max 200 |
| `is_active` | boolean or null | No | |

- `numeric_order` is **auto-calculated** (max + 1 for the tenant). Do not send it.
- Response `201`: message `Class created successfully.`, `data` is a [SchoolClass](#schoolclass).
- Errors: `401`, `422`

---

## 3. Get class

`GET /academic/classes/{schoolClass}`

- Response `200`: `data` is a [SchoolClass](#schoolclass).
- Errors: `401`, `404`

---

## 4. Update class

`POST /academic/classes/{schoolClass}/update`

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| `class_name` | string | No | max 100 |
| `class_name_bn` | string or null | No | max 200 |
| `class_type` | string | No | `regular`, `special` or `vocational` |
| `is_active` | boolean or null | No | |

- All fields are optional. Send only what needs to change.
- `numeric_order` is **not** updated here. The spec says to use a reorder endpoint, but no such endpoint is documented yet.
- Response `200`: message `Class updated successfully.`, `data` is a [SchoolClass](#schoolclass).
- Errors: `401`, `404`, `422`

---

## 5. Activate class

`POST /academic/classes/{schoolClass}/activate`

- No request body.
- Sets `is_active` to `true`.
- Response `200`: message `Class activated successfully.`
- Errors: `401`, `404`

---

## 6. Inactivate class

`POST /academic/classes/{schoolClass}/inactivate`

- No request body.
- Sets `is_active` to `false`.
- Response `200`: message `Class inactivated successfully.`
- Errors: `401`, `404`

---

## 7. Delete class (soft delete)

`POST /academic/classes/{schoolClass}/delete`

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| `delete_reason` | string or null | No | max 500 |

- Sets `deleted_at`, `deleted_by` and the optional `delete_reason`.
- After this, the class **no longer appears** in list or show requests.
- Response `200`: `{ "status": "success", "message": "Class deleted successfully." }` (no `data`).
- Errors: `401`, `404`, `422`

---

## SchoolClass

Returned in `data` by endpoints 1 to 6.

| Field | Type | Nullable |
|-------|------|----------|
| `id` | string | No |
| `tenant_id` | string | No |
| `branch_id` | string | Yes |
| `class_name` | string | No |
| `class_name_bn` | string | Yes |
| `numeric_order` | integer | No |
| `class_type` | string | No |
| `is_active` | boolean | No |
| `status` | string | No |

`is_active` (on/off toggle) and `status` (record status) are two different fields.

---

## Important notes

- `numeric_order` is set by the server on create and cannot be changed through update.
- Deleted classes are hidden from list and show requests.
- `is_active` can be changed through update, activate or inactivate.
- Not defined in the spec: how the `is_active` list filter is passed, the values of `status`, and the reorder endpoint.
