import { api } from './client';

export interface Content {
  id: number;
  title: string;
  type: 'article' | 'video' | 'image' | 'document';
  status: 'draft' | 'published' | 'archived';
  author: string;
  content?: string;
  description?: string;
  media_url?: string;
  thumbnail_url?: string;
  tags?: string[];
  views: number;
  likes: number;
  published_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ContentCreateInput {
  title: string;
  type: string;
  status: string;
  author: string;
  content?: string;
  description?: string;
  media_url?: string;
  thumbnail_url?: string;
  tags?: string[];
}

export const contentApi = {
  // List content
  list: async (params?: {
    page?: number;
    size?: number;
    type?: string;
    status?: string;
    search?: string;
  }): Promise<{ items: Content[]; total: number }> => {
    return api.get('/content/', { params });
  },

  // Get single content
  get: async (id: number): Promise<Content> => {
    return api.get(`/content/${id}`);
  },

  // Create content
  create: async (data: ContentCreateInput): Promise<Content> => {
    return api.post('/content/', data);
  },

  // Update content
  update: async (id: number, data: Partial<ContentCreateInput>): Promise<Content> => {
    return api.put(`/content/${id}`, data);
  },

  // Delete content
  delete: async (id: number): Promise<void> => {
    return api.delete(`/content/${id}`);
  },

  // Get content statistics
  stats: async (): Promise<{
    total: number;
    published: number;
    total_views: number;
    total_engagement: number;
  }> => {
    return api.get('/content/stats');
  },
};
