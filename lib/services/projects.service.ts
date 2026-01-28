import { projectsApi as api } from '../api-clients';

export type ProjectType = 'humanitarian' | 'gospel_outreach' | 'education' | 'medical' | 'water_sanitation' | 'agriculture';
export type ProjectStatus = 'planned' | 'active' | 'on_hold' | 'completed' | 'cancelled';

export interface Project {
  id: string; // UUID
  name: string;
  slug: string;
  description: string;
  project_type: ProjectType;
  status: ProjectStatus;
  country: string;
  location?: string;
  start_date: string; // ISO date
  end_date?: string; // ISO date
  budget?: number;
  currency: string;
  funds_raised: number;
  target_beneficiaries?: number;
  actual_beneficiaries: number;
  partner_id?: string; // UUID
  tags?: string[];
  project_metadata?: Record<string, any>;
  created_by: string; // UUID
  created_at: string; // ISO datetime
  updated_at: string; // ISO datetime
}

export interface CreateProjectDto {
  name: string;
  slug: string;
  description: string;
  project_type: ProjectType;
  status?: ProjectStatus;
  country: string;
  location?: string;
  start_date: string; // ISO date format: YYYY-MM-DD
  end_date?: string; // ISO date format: YYYY-MM-DD
  budget?: number;
  currency?: string;
  target_beneficiaries?: number;
  partner_id?: string;
  tags?: string[];
  project_metadata?: Record<string, any>;
  created_by: string; // UUID - will be auto-filled in dev mode
}

export interface ProjectsListResponse {
  items: Project[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

export const projectsService = {
  // Get all projects
  getAll: async (params?: {
    skip?: number;
    limit?: number;
    status?: string;
    category?: string;
  }) => {
    const response = await api.get('/projects', { params });
    return response.data;
  },

  // Get project by ID
  getById: async (id: string | number) => {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  },

  // Create new project
  create: async (data: CreateProjectDto) => {
    const response = await api.post('/projects', data);
    return response.data;
  },

  // Update project
  update: async (id: string | number, data: Partial<CreateProjectDto>) => {
    const response = await api.put(`/projects/${id}`, data);
    return response.data;
  },

  // Delete project
  delete: async (id: string | number) => {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
  },

  // Get project statistics
  getStatistics: async () => {
    const response = await api.get('/projects/statistics');
    return response.data;
  },
};
