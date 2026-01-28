import api from '../api';

export interface Content {
  id: number;
  title: string;
  type: 'article' | 'story' | 'update' | 'testimonial';
  status: 'draft' | 'published' | 'archived';
  content: string;
  excerpt?: string;
  projectId?: number;
  projectName?: string;
  author: string;
  publishedDate?: string;
  featuredImage?: string;
  tags?: string[];
  views: number;
  likes: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateContentDto {
  title: string;
  type: string;
  status: string;
  content: string;
  excerpt?: string;
  projectId?: number;
  author: string;
  publishedDate?: string;
  featuredImage?: string;
  tags?: string[];
}

export interface MediaFile {
  id: number;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  type: 'image' | 'video' | 'document';
  projectId?: number;
  uploadedBy: string;
  createdAt?: string;
}

export interface Translation {
  id: number;
  contentId: number;
  language: string;
  title: string;
  content: string;
  excerpt?: string;
  status: 'draft' | 'published';
  translatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const contentService = {
  // Content management
  getAllContent: async (params?: {
    skip?: number;
    limit?: number;
    type?: string;
    status?: string;
  }) => {
    const response = await api.get('/content', { params });
    return response.data;
  },

  getContentById: async (id: number) => {
    const response = await api.get(`/content/${id}`);
    return response.data;
  },

  createContent: async (data: CreateContentDto) => {
    const response = await api.post('/content', data);
    return response.data;
  },

  updateContent: async (id: number, data: Partial<CreateContentDto>) => {
    const response = await api.put(`/content/${id}`, data);
    return response.data;
  },

  deleteContent: async (id: number) => {
    const response = await api.delete(`/content/${id}`);
    return response.data;
  },

  // Media management
  getAllMedia: async (params?: {
    skip?: number;
    limit?: number;
    type?: string;
  }) => {
    const response = await api.get('/media', { params });
    return response.data;
  },

  uploadMedia: async (file: File, projectId?: number) => {
    const formData = new FormData();
    formData.append('file', file);
    if (projectId) {
      formData.append('projectId', projectId.toString());
    }
    const response = await api.post('/media/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  deleteMedia: async (id: number) => {
    const response = await api.delete(`/media/${id}`);
    return response.data;
  },

  // Translation management
  getTranslations: async (contentId: number) => {
    const response = await api.get(`/content/${contentId}/translations`);
    return response.data;
  },

  createTranslation: async (contentId: number, data: Partial<Translation>) => {
    const response = await api.post(`/content/${contentId}/translations`, data);
    return response.data;
  },

  updateTranslation: async (contentId: number, translationId: number, data: Partial<Translation>) => {
    const response = await api.put(`/content/${contentId}/translations/${translationId}`, data);
    return response.data;
  },

  deleteTranslation: async (contentId: number, translationId: number) => {
    const response = await api.delete(`/content/${contentId}/translations/${translationId}`);
    return response.data;
  },
};
