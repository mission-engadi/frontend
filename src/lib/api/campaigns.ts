import { api } from './client';

export interface Campaign {
  id: number;
  title: string;
  description: string;
  status: 'draft' | 'scheduled' | 'active' | 'paused' | 'completed';
  platforms: string[];
  start_date: string;
  end_date: string;
  project_id?: number;
  objective?: string;
  target_audience?: string;
  budget?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Post {
  id: number;
  campaign_id: number;
  content: string;
  platforms: string[];
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  scheduled_date?: string;
  published_date?: string;
  media_type?: 'image' | 'video' | 'text';
  media_url?: string;
  created_at?: string;
}

export interface CampaignCreateInput {
  title: string;
  description: string;
  status: string;
  platforms: string[];
  start_date: string;
  end_date: string;
  project_id?: number;
  objective?: string;
  target_audience?: string;
  budget?: number;
}

export const campaignsApi = {
  // List campaigns
  list: async (params?: {
    page?: number;
    size?: number;
    status?: string;
    search?: string;
  }): Promise<{ items: Campaign[]; total: number }> => {
    return api.get('/campaigns/', { params });
  },

  // Get single campaign
  get: async (id: number): Promise<Campaign> => {
    return api.get(`/campaigns/${id}`);
  },

  // Create campaign
  create: async (data: CampaignCreateInput): Promise<Campaign> => {
    return api.post('/campaigns/', data);
  },

  // Update campaign
  update: async (id: number, data: Partial<CampaignCreateInput>): Promise<Campaign> => {
    return api.put(`/campaigns/${id}`, data);
  },

  // Delete campaign
  delete: async (id: number): Promise<void> => {
    return api.delete(`/campaigns/${id}`);
  },

  // Get campaign statistics
  stats: async (): Promise<{
    active: number;
    total_reach: number;
    engagement_rate: number;
    scheduled_posts: number;
  }> => {
    return api.get('/campaigns/stats');
  },
};

export const postsApi = {
  // List posts
  list: async (params?: {
    page?: number;
    size?: number;
    campaign_id?: number;
    status?: string;
    search?: string;
  }): Promise<{ items: Post[]; total: number }> => {
    return api.get('/posts/', { params });
  },

  // Get single post
  get: async (id: number): Promise<Post> => {
    return api.get(`/posts/${id}`);
  },

  // Create post
  create: async (data: any): Promise<Post> => {
    return api.post('/posts/', data);
  },

  // Update post
  update: async (id: number, data: any): Promise<Post> => {
    return api.put(`/posts/${id}`, data);
  },

  // Delete post
  delete: async (id: number): Promise<void> => {
    return api.delete(`/posts/${id}`);
  },
};
