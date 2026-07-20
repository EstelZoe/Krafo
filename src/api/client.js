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

// Attach the auth token to every request.
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
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
