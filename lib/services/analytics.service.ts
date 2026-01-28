import api from '../api';

export interface DashboardStats {
  totalDonations: number;
  totalDonors: number;
  activeProjects: number;
  activeCampaigns: number;
  monthlyGrowth: number;
  reachGrowth: number;
  engagementRate: number;
  donorRetention: number;
}

export interface TimeSeriesData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    [key: string]: any;
  }[];
}

export interface TopItem {
  id: number;
  name: string;
  value: number;
  percentage?: number;
  trend?: 'up' | 'down';
  change?: string;
}

export const analyticsService = {
  // Dashboard overview
  getDashboardStats: async () => {
    const response = await api.get('/analytics/dashboard');
    return response.data;
  },

  // Real-time analytics
  getRealtimeMetrics: async () => {
    const response = await api.get('/analytics/realtime');
    return response.data;
  },

  // Donation analytics
  getDonationTrends: async (params?: {
    startDate?: string;
    endDate?: string;
    granularity?: 'day' | 'week' | 'month';
  }) => {
    const response = await api.get('/analytics/donations/trends', { params });
    return response.data;
  },

  getTopDonors: async (limit: number = 10) => {
    const response = await api.get('/analytics/donations/top-donors', {
      params: { limit },
    });
    return response.data;
  },

  // Project analytics
  getProjectPerformance: async (params?: {
    startDate?: string;
    endDate?: string;
  }) => {
    const response = await api.get('/analytics/projects/performance', { params });
    return response.data;
  },

  getProjectROI: async () => {
    const response = await api.get('/analytics/projects/roi');
    return response.data;
  },

  // Campaign analytics
  getCampaignPerformance: async (campaignId?: number) => {
    const endpoint = campaignId
      ? `/analytics/campaigns/${campaignId}/performance`
      : '/analytics/campaigns/performance';
    const response = await api.get(endpoint);
    return response.data;
  },

  getSocialMediaMetrics: async (params?: {
    startDate?: string;
    endDate?: string;
    platform?: string;
  }) => {
    const response = await api.get('/analytics/social-media/metrics', { params });
    return response.data;
  },

  // Report generation
  generateReport: async (reportType: 'pdf' | 'excel', params?: {
    startDate?: string;
    endDate?: string;
    includeCharts?: boolean;
  }) => {
    const response = await api.post('/analytics/reports/generate', {
      format: reportType,
      ...params,
    }, {
      responseType: 'blob',
    });
    return response.data;
  },

  // Export data
  exportData: async (dataType: string, format: 'csv' | 'json' | 'xlsx') => {
    const response = await api.get(`/analytics/export/${dataType}`, {
      params: { format },
      responseType: format === 'json' ? 'json' : 'blob',
    });
    return response.data;
  },
};
