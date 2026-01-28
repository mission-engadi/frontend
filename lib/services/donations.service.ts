import api from '../api';

export interface Donation {
  id: number;
  partnerId: number;
  partnerName?: string;
  amount: number;
  type: 'one-time' | 'monthly' | 'quarterly' | 'annual';
  method: 'bank_transfer' | 'wire_transfer' | 'credit_card' | 'paypal' | 'check' | 'cash';
  status: 'completed' | 'pending' | 'failed';
  date: string;
  projectId?: number;
  projectName?: string;
  transactionId?: string;
  reference?: string;
  receiptNumber?: string;
  notes?: string;
  taxDeductible: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateDonationDto {
  partnerId: number;
  amount: number;
  type: string;
  method: string;
  status: string;
  date: string;
  projectId?: number;
  reference?: string;
  notes?: string;
  taxDeductible?: boolean;
}

export const donationsService = {
  // Get all donations
  getAll: async (params?: {
    skip?: number;
    limit?: number;
    status?: string;
    partnerId?: number;
    projectId?: number;
  }) => {
    const response = await api.get('/donations', { params });
    return response.data;
  },

  // Get donation by ID
  getById: async (id: number) => {
    const response = await api.get(`/donations/${id}`);
    return response.data;
  },

  // Create new donation
  create: async (data: CreateDonationDto) => {
    const response = await api.post('/donations', data);
    return response.data;
  },

  // Update donation
  update: async (id: number, data: Partial<CreateDonationDto>) => {
    const response = await api.put(`/donations/${id}`, data);
    return response.data;
  },

  // Delete donation
  delete: async (id: number) => {
    const response = await api.delete(`/donations/${id}`);
    return response.data;
  },

  // Download receipt
  downloadReceipt: async (id: number) => {
    const response = await api.get(`/donations/${id}/receipt`, {
      responseType: 'blob',
    });
    return response.data;
  },

  // Get donation statistics
  getStatistics: async () => {
    const response = await api.get('/donations/statistics');
    return response.data;
  },
};
