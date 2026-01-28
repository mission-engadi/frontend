/**
 * API Client Configuration for MinistryOS Services
 *
 * This file provides axios instances for each microservice.
 * Use these clients in service files instead of the default api client.
 */

import axios from 'axios';

// Gateway configuration (recommended for production)
const USE_GATEWAY = false; // TODO: Enable once gateway is fully configured

// Base URLs for each service
const getServiceURL = (serviceName: string): string => {
  if (USE_GATEWAY) {
    // All requests go through gateway
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';
  }

  // Direct service URLs (development mode)
  const serviceUrls: Record<string, string> = {
    auth: process.env.NEXT_PUBLIC_AUTH_SERVICE_URL || 'http://localhost:8002/api/v1',
    content: process.env.NEXT_PUBLIC_CONTENT_SERVICE_URL || 'http://localhost:8003/api/v1',
    partners: process.env.NEXT_PUBLIC_PARTNERS_CRM_SERVICE_URL || 'http://localhost:8005/api/v1',
    projects: process.env.NEXT_PUBLIC_PROJECTS_SERVICE_URL || 'http://localhost:8006/api/v1',
    social: process.env.NEXT_PUBLIC_SOCIAL_MEDIA_SERVICE_URL || 'http://localhost:8007/api/v1',
    notifications: process.env.NEXT_PUBLIC_NOTIFICATION_SERVICE_URL || 'http://localhost:8008/api/v1',
    analytics: process.env.NEXT_PUBLIC_ANALYTICS_SERVICE_URL || 'http://localhost:8009/api/v1',
    ai: process.env.NEXT_PUBLIC_AI_SERVICE_URL || 'http://localhost:8010/api/v1',
    search: process.env.NEXT_PUBLIC_SEARCH_SERVICE_URL || 'http://localhost:8011/api/v1',
  };

  return serviceUrls[serviceName] || serviceUrls.projects; // Default to projects
};

// Create axios instance factory
const createApiClient = (serviceName: string) => {
  const client = axios.create({
    baseURL: getServiceURL(serviceName),
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 30000,
  });

  // Request interceptor for auth token
  client.interceptors.request.use(
    (config) => {
      if (process.env.NODE_ENV === 'development') {
        console.log(`[${serviceName.toUpperCase()} API]`, config.method?.toUpperCase(), `${config.baseURL}${config.url}`);
      }
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor for error handling
  client.interceptors.response.use(
    (response) => response,
    (error) => {
      if (process.env.NODE_ENV === 'development') {
        const fullUrl = error.config?.baseURL
          ? `${error.config.baseURL}${error.config.url || ''}`
          : error.config?.url;

        console.error(`[${serviceName.toUpperCase()} API Error]:`, {
          fullUrl: fullUrl,
          baseURL: error.config?.baseURL,
          url: error.config?.url,
          method: error.config?.method,
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          message: error.message,
        });
      }

      // Handle 401 unauthorized
      if (error.response?.status === 401) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
          // Optionally redirect to login
        }
      }

      return Promise.reject(error);
    }
  );

  return client;
};

// Export API clients for each service
export const authApi = createApiClient('auth');
export const contentApi = createApiClient('content');
export const partnersApi = createApiClient('partners');
export const projectsApi = createApiClient('projects');
export const socialApi = createApiClient('social');
export const notificationsApi = createApiClient('notifications');
export const analyticsApi = createApiClient('analytics');
export const aiApi = createApiClient('ai');
export const searchApi = createApiClient('search');

// Export default (projects for backward compatibility)
export default projectsApi;
