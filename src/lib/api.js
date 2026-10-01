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
