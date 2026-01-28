import { api } from './client';

export interface Project {
  id: number;
  title: string;
  description: string;
  status: 'planning' | 'active' | 'completed' | 'on_hold';
  location: string;
  start_date: string;
  end_date?: string;
  budget: number;
  funds_raised: number;
  beneficiaries: number;
  category: string;
  created_at?: string;
  updated_at?: string;
}

export interface ProjectCreateInput {
  title: string;
  description: string;
  status: string;
  location: string;
  start_date: string;
  end_date?: string;
  budget: number;
  category: string;
}

export interface ProjectUpdateInput extends Partial<ProjectCreateInput> {}

export interface ProjectListResponse {
  items: Project[];
  total: number;
  page: number;
  size: number;
}

export const projectsApi = {
  // List projects with pagination and filters
  list: async (params?: {
    page?: number;
    size?: number;
    status?: string;
    search?: string;
  }): Promise<ProjectListResponse> => {
    return api.get('/projects/', { params });
  },

  // Get single project by ID
  get: async (id: number): Promise<Project> => {
    return api.get(`/projects/${id}`);
  },

  // Create new project
  create: async (data: ProjectCreateInput): Promise<Project> => {
    return api.post('/projects/', data);
  },

  // Update project
  update: async (id: number, data: ProjectUpdateInput): Promise<Project> => {
    return api.put(`/projects/${id}`, data);
  },

  // Delete project
  delete: async (id: number): Promise<void> => {
    return api.delete(`/projects/${id}`);
  },

  // Get project statistics
  stats: async (): Promise<{
    total: number;
    active: number;
    completed: number;
    total_budget: number;
    total_raised: number;
  }> => {
    return api.get('/projects/stats');
  },
};
