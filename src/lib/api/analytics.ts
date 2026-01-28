import { api } from './client';

export interface AnalyticsMetrics {
  total_revenue: number;
  active_partners: number;
  campaign_reach: number;
  total_donations: number;
  revenue_change: number;
  partners_change: number;
  reach_change: number;
  donations_change: number;
}

export interface RevenueData {
  period: string;
  revenue: number;
  target?: number;
}

export interface ProjectPerformance {
  project_name: string;
  funds_raised: number;
  beneficiaries: number;
  roi: number;
}

export interface GeographicDistribution {
  region: string;
  count: number;
  percentage: number;
}

export const analyticsApi = {
  // Get dashboard metrics
  getMetrics: async (params?: {
    period?: '7days' | '30days' | '90days' | '1year' | 'all';
  }): Promise<AnalyticsMetrics> => {
    return api.get('/analytics/metrics', { params });
  },

  // Get revenue trend
  getRevenueTrend: async (params?: {
    period?: string;
    interval?: 'daily' | 'weekly' | 'monthly';
  }): Promise<RevenueData[]> => {
    return api.get('/analytics/revenue-trend', { params });
  },

  // Get project performance
  getProjectPerformance: async (): Promise<ProjectPerformance[]> => {
    return api.get('/analytics/project-performance');
  },

  // Get geographic distribution
  getGeographicDistribution: async (): Promise<GeographicDistribution[]> => {
    return api.get('/analytics/geographic-distribution');
  },

  // Get real-time metrics
  getRealTimeMetrics: async (): Promise<{
    active_users: number;
    today_revenue: number;
    page_views: number;
    conversions: number;
  }> => {
    return api.get('/analytics/realtime');
  },

  // Get campaign performance
  getCampaignPerformance: async (): Promise<{
    reach: number;
    engagement: number;
    conversions: number;
    roi: number;
    sentiment: number;
  }> => {
    return api.get('/analytics/campaign-performance');
  },

  // Get top donors
  getTopDonors: async (params?: {
    limit?: number;
    period?: string;
  }): Promise<Array<{
    id: number;
    name: string;
    amount: number;
    donations: number;
    trend: string;
  }>> => {
    return api.get('/analytics/top-donors', { params });
  },
};
