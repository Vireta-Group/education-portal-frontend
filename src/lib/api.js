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
