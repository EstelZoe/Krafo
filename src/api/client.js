import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL || 'https://krafo-api.onrender.com/api';

console.log('API Base URL:', baseURL); // Debug log

export const apiClient = axios.create({
    baseURL: baseURL, 
});

// Add auth token to all requests
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log('Request:', config.method?.toUpperCase(), config.baseURL + '/' + config.url); // Debug log
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Handle 401 responses (unauthorized)
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error.response?.status, error.message); // Debug log
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            // Optionally redirect to login
            if (window.location.pathname.startsWith('/admin')) {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

