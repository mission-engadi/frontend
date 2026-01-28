import axios from 'axios';

export const API_BASE_URL = process.env.NEXT_PUBLIC_GATEWAY_URL || 'http://localhost:8000';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('auth-token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const serviceUrls = {
  gateway: process.env.NEXT_PUBLIC_GATEWAY_URL || 'http://localhost:8000',
  auth: process.env.NEXT_PUBLIC_AUTH_SERVICE_URL || 'http://localhost:8001',
  content: process.env.NEXT_PUBLIC_CONTENT_SERVICE_URL || 'http://localhost:8002',
  projects: process.env.NEXT_PUBLIC_PROJECTS_SERVICE_URL || 'http://localhost:8003',
  partners: process.env.NEXT_PUBLIC_PARTNERS_CRM_SERVICE_URL || 'http://localhost:8004',
  search: process.env.NEXT_PUBLIC_SEARCH_SERVICE_URL || 'http://localhost:8005',
  socialMedia: process.env.NEXT_PUBLIC_SOCIAL_MEDIA_SERVICE_URL || 'http://localhost:8006',
  notification: process.env.NEXT_PUBLIC_NOTIFICATION_SERVICE_URL || 'http://localhost:8008',
  analytics: process.env.NEXT_PUBLIC_ANALYTICS_SERVICE_URL || 'http://localhost:8009',
  ai: process.env.NEXT_PUBLIC_AI_SERVICE_URL || 'http://localhost:8010',
};
