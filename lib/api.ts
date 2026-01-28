import axios from 'axios';

// TEMPORARY: Use projects service directly while gateway has DB connection issues
// TODO: Switch back to gateway once fixed
const USE_GATEWAY = true;

// Determine base URL
const getBaseURL = () => {
  if (USE_GATEWAY) {
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';
  } else {
    // Direct to projects service
    return process.env.NEXT_PUBLIC_PROJECTS_SERVICE_URL || 'http://localhost:8006/api/v1';
  }
};

// Create an axios instance pointing to the Gateway Service (or projects service directly)
const api = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds
});

// Add request interceptor for auth token (placeholder for now)
api.interceptors.request.use(
  (config) => {
    // Log the full URL being called in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[API Request]', config.method?.toUpperCase(), `${config.baseURL || ''}${config.url || ''}`);
    }
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log errors in development
    if (process.env.NODE_ENV === 'development') {
      console.error('API Error:', {
        url: error.config?.url,
        method: error.config?.method,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
      });
    }

    // Handle specific error cases
    if (error.response?.status === 401) {
      // Token expired or invalid
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        // Optionally redirect to login
        // window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;

// API functions
export const checkHealth = async () => {
  // Check projects service health (since we're pointing to it directly)
  // The baseURL is http://localhost:8006/api/v1, so we need /health
  const response = await api.get('/health');
  return response.data;
};
