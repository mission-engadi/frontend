import { partnersApi as api } from '../api-clients';

// Partner types matching backend enum
export type PartnerType = 'corporate' | 'church_ministry' | 'family_individual' | 'prayer';

// Partner status matching backend enum
export type PartnerStatus = 'active' | 'inactive' | 'pending';

export interface Partner {
  id: string; // UUID in backend
  name: string;
  partner_type: PartnerType;
  status: PartnerStatus;
  email?: string;
  phone?: string;
  address?: string;
  country?: string;
  website?: string;
  description?: string;
  tags?: string[];
  partner_metadata?: Record<string, any>;
  created_by?: string;
  created_at: string;
  updated_at: string;
  total_donations?: number;
}

export interface CreatePartnerDto {
  name: string;
  partner_type: PartnerType;
  status?: PartnerStatus;
  email?: string;
  phone?: string;
  address?: string;
  country?: string;
  website?: string;
  description?: string;
  tags?: string[];
  partner_metadata?: Record<string, any>;
  created_by?: string;
}

export interface PartnerListResponse {
  total: number;
  page: number;
  page_size: number;
  partners: Partner[];
}

export const partnersService = {
  // Get all partners with pagination
  getAll: async (params?: {
    skip?: number;
    limit?: number;
    partner_type?: PartnerType;
    status?: PartnerStatus;
  }): Promise<PartnerListResponse> => {
    const response = await api.get('/partners', { params });
    return response.data;
  },

  // Get partner by ID
  getById: async (id: string): Promise<Partner> => {
    const response = await api.get(`/partners/${id}`);
    return response.data;
  },

  // Create new partner
  create: async (data: CreatePartnerDto): Promise<Partner> => {
    const response = await api.post('/partners', data);
    return response.data;
  },

  // Update partner
  update: async (id: string, data: Partial<CreatePartnerDto>): Promise<Partner> => {
    const response = await api.put(`/partners/${id}`, data);
    return response.data;
  },

  // Delete partner
  delete: async (id: string): Promise<void> => {
    const response = await api.delete(`/partners/${id}`);
    return response.data;
  },

  // Get partner statistics
  getStatistics: async () => {
    const response = await api.get('/partners/statistics');
    return response.data;
  },
};
