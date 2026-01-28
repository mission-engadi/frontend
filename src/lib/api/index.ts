// Export API client
export { api, default as apiClient } from './client';

// Export all API modules
export * from './projects';
export * from './partners';
export * from './content';
export * from './campaigns';
export * from './analytics';

// Re-export for convenience
export { projectsApi } from './projects';
export { partnersApi, donationsApi } from './partners';
export { contentApi } from './content';
export { campaignsApi, postsApi } from './campaigns';
export { analyticsApi } from './analytics';
