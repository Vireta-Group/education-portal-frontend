const BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');
const API_PREFIX = '/api';

const readToken = () => {
  try {
    return localStorage.getItem('token');
  } catch {
    return null;
  }
};

export const apiUrl = (path = '') => {
  const clean = String(path).replace(/^\/+/, '');
  return `${BASE_URL}${API_PREFIX}${clean ? `/${clean}` : ''}`;
};

export const buildQuery = (params = {}) => {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    search.append(key, String(value));
  });
  return search.toString();
};

export const extractErrorMessage = (payload, fallback = 'Request failed') => {
  const fieldErrors = Object.values(payload?.errors || {})
    .flat()
    .filter(Boolean)
    .join(', ');
  return payload?.message || fieldErrors || fallback;
};

export const request = async (path, options = {}) => {
  const { method = 'GET', body, params, token, signal, headers = {} } = options;

  const query = buildQuery(params);
  const url = query ? `${apiUrl(path)}?${query}` : apiUrl(path);
  const bearer = token ?? readToken();

  const response = await fetch(url, {
    method,
    signal,
    headers: {
      Accept: 'application/json',
      ...(body ? { 'Content-Type': 'application/json' } : {}),
      ...(bearer ? { Authorization: `Bearer ${bearer}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  let payload = null;
  try {
    payload = await response.json();
  } catch {
    // Non-JSON response body (e.g. an HTML error page from the server).
  }
  if (!response.ok) {
    const error = new Error(
      extractErrorMessage(payload, response.statusText || `Request failed (${response.status})`)
    );
    error.status = response.status;
    error.errors = payload?.errors || null;
    throw error;
  }

  return payload?.data ?? payload;
};

export const get = (path, options) => request(path, { ...options, method: 'GET' });

export const post = (path, body, options) => request(path, { ...options, method: 'POST', body });
// Shared API request helper for Redux async thunks.
// Returns { data, message } on success, or rejects with a readable error message.
export const apiRequest = async ({ url, method = 'GET', body }, { getState, rejectWithValue }) => {
  const token = getState().auth.token;
  // Normalize URL: strip trailing slash from base, ensure api/ prefix (avoids // and missing api/ 404s)
  const base = `${import.meta.env.VITE_API_URL}`.replace(/\/+$/, '');
  const clean = url.replace(/^\/+/, '');
  const fullUrl = clean.startsWith('api/') ? `${base}/${clean}` : `${base}/api/${clean}`;
  try {
    const res = await fetch(fullUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    let result = {};
    try {
      result = await res.json();
    } catch {
      result = {};
    }

    if (!res.ok) {
      const msg =
        result.message ||
        Object.values(result.errors || {}).flat().join(', ') ||
        'Request failed';
      return rejectWithValue(msg);
    }

    return { data: result.data ?? null, message: result.message || null };
  } catch (err) {
    return rejectWithValue(err.message || 'Network error');
  }
};
