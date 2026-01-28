import api from '../api';

export interface Campaign {
  id: number;
  title: string;
  description: string;
  projectId?: number;
  projectName?: string;
  startDate: string;
  endDate: string;
  status: 'draft' | 'active' | 'completed' | 'paused';
  platforms: string[];
  objective: string;
  targetAudience: string;
  budget: number;
  totalReach: number;
  likes: number;
  comments: number;
  shares: number;
  engagementRate: number;
  postsScheduled: number;
  postsPublished: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateCampaignDto {
  title: string;
  description: string;
  projectId?: number;
  startDate: string;
  endDate: string;
  status: string;
  platforms: string[];
  objective: string;
  targetAudience: string;
  budget: number;
}

export interface Post {
  id: number;
  campaignId?: number;
  campaignName?: string;
  content: string;
  platforms: string[];
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  scheduledDate?: string;
  publishedDate?: string;
  mediaType?: 'image' | 'video' | 'carousel';
  mediaUrl?: string;
  reach: number;
  engagement: number;
  likes: number;
  comments: number;
  shares: number;
  clicks: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreatePostDto {
  campaignId?: number;
  content: string;
  platforms: string[];
  status: string;
  scheduledDate?: string;
  mediaType?: string;
  mediaUrl?: string;
}

export const campaignsService = {
  // Campaign management
  getAllCampaigns: async (params?: {
    skip?: number;
    limit?: number;
    status?: string;
    projectId?: number;
  }) => {
    const response = await api.get('/campaigns', { params });
    return response.data;
  },

  getCampaignById: async (id: number) => {
    const response = await api.get(`/campaigns/${id}`);
    return response.data;
  },

  createCampaign: async (data: CreateCampaignDto) => {
    const response = await api.post('/campaigns', data);
    return response.data;
  },

  updateCampaign: async (id: number, data: Partial<CreateCampaignDto>) => {
    const response = await api.put(`/campaigns/${id}`, data);
    return response.data;
  },

  deleteCampaign: async (id: number) => {
    const response = await api.delete(`/campaigns/${id}`);
    return response.data;
  },

  // Post management
  getAllPosts: async (params?: {
    skip?: number;
    limit?: number;
    status?: string;
    campaignId?: number;
  }) => {
    const response = await api.get('/campaigns/posts', { params });
    return response.data;
  },

  getPostById: async (id: number) => {
    const response = await api.get(`/campaigns/posts/${id}`);
    return response.data;
  },

  createPost: async (data: CreatePostDto) => {
    const response = await api.post('/campaigns/posts', data);
    return response.data;
  },

  updatePost: async (id: number, data: Partial<CreatePostDto>) => {
    const response = await api.put(`/campaigns/posts/${id}`, data);
    return response.data;
  },

  deletePost: async (id: number) => {
    const response = await api.delete(`/campaigns/posts/${id}`);
    return response.data;
  },

  // Statistics
  getCampaignStatistics: async () => {
    const response = await api.get('/campaigns/statistics');
    return response.data;
  },
};
