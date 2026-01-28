import { api } from './client';

export interface Partner {
  id: number;
  name: string;
  type: 'church' | 'foundation' | 'ministry' | 'nonprofit' | 'individual';
  status: 'active' | 'inactive' | 'pending';
  email: string;
  phone: string;
  website?: string;
  address: string;
  city: string;
  country: string;
  contact_name: string;
  contact_role: string;
  contact_email: string;
  contact_phone: string;
  notes?: string;
  member_since?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Donation {
  id: number;
  partner_id: number;
  partner_name?: string;
  amount: number;
  type: 'one-time' | 'monthly' | 'quarterly' | 'annual';
  method: 'bank_transfer' | 'wire_transfer' | 'credit_card' | 'paypal' | 'check';
  status: 'completed' | 'pending' | 'failed';
  date: string;
  project_id?: number;
  project_name?: string;
  created_at?: string;
}

export interface PartnerCreateInput {
  name: string;
  type: string;
  status: string;
  email: string;
  phone: string;
  website?: string;
  address: string;
  city: string;
  country: string;
  contact_name: string;
  contact_role: string;
  contact_email: string;
  contact_phone: string;
  notes?: string;
}

export interface DonationCreateInput {
  partner_id: number;
  amount: number;
  type: string;
  method: string;
  status: string;
  date: string;
  project_id?: number;
}

export const partnersApi = {
  // List partners
  list: async (params?: {
    page?: number;
    size?: number;
    type?: string;
    status?: string;
    search?: string;
  }): Promise<{ items: Partner[]; total: number }> => {
    return api.get('/partners/', { params });
  },

  // Get single partner
  get: async (id: number): Promise<Partner> => {
    return api.get(`/partners/${id}`);
  },

  // Create partner
  create: async (data: PartnerCreateInput): Promise<Partner> => {
    return api.post('/partners/', data);
  },

  // Update partner
  update: async (id: number, data: Partial<PartnerCreateInput>): Promise<Partner> => {
    return api.put(`/partners/${id}`, data);
  },

  // Delete partner
  delete: async (id: number): Promise<void> => {
    return api.delete(`/partners/${id}`);
  },

  // Get partner statistics
  stats: async (): Promise<{
    total: number;
    active: number;
    total_donations: number;
    this_month: number;
  }> => {
    return api.get('/partners/stats');
  },
};

export const donationsApi = {
  // List donations
  list: async (params?: {
    page?: number;
    size?: number;
    partner_id?: number;
    status?: string;
    search?: string;
  }): Promise<{ items: Donation[]; total: number }> => {
    return api.get('/donations/', { params });
  },

  // Get single donation
  get: async (id: number): Promise<Donation> => {
    return api.get(`/donations/${id}`);
  },

  // Create donation
  create: async (data: DonationCreateInput): Promise<Donation> => {
    return api.post('/donations/', data);
  },

  // Get donation statistics
  stats: async (): Promise<{
    total_raised: number;
    this_month: number;
    avg_donation: number;
    total_donors: number;
  }> => {
    return api.get('/donations/stats');
  },
};
