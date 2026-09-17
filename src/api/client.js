import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL || 'https://api.krafosystems.com/api';

const isDev = import.meta.env.DEV;

if (isDev) {
    // Log only in dev so we don't spam production consoles.
    console.info('API Base URL:', baseURL);
}

export const apiClient = axios.create({
    baseURL,
});

/**
 * Admin reads must never come from a cache.
 *
 * The host's nginx caches API responses, and it keys on the full URL while
 * ignoring both the Authorization header and a no-cache request header. The
 * practical effect on the dashboard was brutal: an admin saves a record,
 * the list refetches, nginx returns the body it stored minutes earlier, and
 * the change looks like it never happened. Every save looked like a failure.
 *
 * The origin should be sending Cache-Control: no-store, and does in the code.
 * This is deliberately belt-and-braces on top of that: a unique query
 * parameter makes every admin read its own cache key, so no intermediary —
 * the host, a CDN, a corporate proxy, or the browser — can serve a stale one.
 *
 * Scoped to /admin/ on purpose. Public reads stay cacheable, which is the
 * behaviour that makes the site fast for visitors.
 */
const isAdminRead = (config) =>
    (config.method || 'get').toLowerCase() === 'get' &&
    String(config.url || '').includes('/admin/');

// Attach the auth token to every request.
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        if (isAdminRead(config)) {
            config.params = { ...config.params, _ts: Date.now() };
        }
        return config;
    },
    (error) => Promise.reject(error)
);

/**
 * Decide whether a 401 response should force the user back to /login.
 *
 * We only force-logout when the server explicitly confirms the *token itself*
 * is invalid. Other 401s — e.g. business-logic ones like "Current password is
 * incorrect" on the change-password endpoint — should NOT log the user out.
 *
 * The protect middleware returns these messages for token failures:
 *   - "Unauthorized: Missing token"
 *   - "Unauthorized: Invalid token"
 *   - "Unauthorized: User not found"
 */
const isTokenFailure = (error) => {
    if (error.response?.status !== 401) return false;
    const msg = error.response?.data?.error || '';
    return /Unauthorized/i.test(msg);
};

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (isDev) {
            console.error(
                'API Error:',
                error.response?.status,
                error.config?.url,
                error.response?.data?.error || error.message
            );
        }

        if (isTokenFailure(error)) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            // Only redirect from admin areas — public-site 401s shouldn't bounce
            // visitors who never logged in.
            if (window.location.pathname.startsWith('/admin')) {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);
