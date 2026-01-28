/**
 * Type definitions for AI Assistant features
 */

export type AIContext = 'project' | 'content' | 'campaign' | 'crm' | 'analytics' | 'general';

export type MessageRole = 'user' | 'assistant' | 'system';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  streaming?: boolean;
}

export interface AIAction {
  type: 'fill_form' | 'create_project' | 'generate_content' | 'create_campaign' | 'analyze_data';
  data: Record<string, any>;
  label: string;
  description?: string;
}

export interface ChatRequest {
  message: string;
  context: AIContext;
  conversationId?: string;
  metadata?: Record<string, any>;
}

export interface ChatResponse {
  message: string;
  conversationId: string;
  suggestedActions?: AIAction[];
  confidence?: number;
  sources?: string[];
}

export interface ConversationHistory {
  id: string;
  context: AIContext;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface QuickAction {
  id: string;
  label: string;
  prompt: string;
  icon?: string;
  context: AIContext;
}

// Project-specific types
export interface ProjectGenerationRequest {
  description: string;
  preferences?: {
    budget?: number;
    timeline?: string;
    location?: string;
  };
}

export interface ProjectDraft {
  name: string;
  description: string;
  type: string;
  country?: string;
  location?: string;
  estimatedBudget?: number;
  estimatedBeneficiaries?: number;
  startDate?: string;
  endDate?: string;
  confidence: number;
}

export interface BudgetScenario {
  name: 'minimal' | 'standard' | 'optimal';
  totalCost: number;
  categories: BudgetCategory[];
  timeline: string;
  description: string;
  recommended?: boolean;
}

export interface BudgetCategory {
  name: string;
  amount: number;
  description: string;
  items?: BudgetItem[];
}

export interface BudgetItem {
  description: string;
  quantity: number;
  unitCost: number;
  totalCost: number;
}

// Content-specific types
export interface ContentGenerationRequest {
  prompt: string;
  type: 'article' | 'video_script' | 'social' | 'email' | 'report';
  tone?: 'inspirational' | 'professional' | 'urgent' | 'casual';
  length?: 'short' | 'medium' | 'long';
  language?: 'en' | 'es' | 'fr' | 'pt';
  projectId?: string;
}

export interface ContentDraft {
  title: string;
  content: string;
  type: string;
  language: string;
  tags?: string[];
  seoScore?: number;
  confidence: number;
}

// Campaign-specific types
export interface CampaignGenerationRequest {
  message: string;
  platforms: ('facebook' | 'twitter' | 'instagram' | 'linkedin' | 'youtube')[];
  tone?: string;
  projectId?: string;
}

export interface PlatformPost {
  platform: string;
  content: string;
  hashtags?: string[];
  mediaType?: 'text' | 'image' | 'video' | 'carousel';
  characterCount: number;
  suggestedTime?: string;
  engagementScore?: number;
}

export interface CampaignDraft {
  name: string;
  posts: PlatformPost[];
  overallEngagement?: number;
  bestPostingTimes?: Record<string, string>;
}

// Analytics-specific types
export interface AnalyticsQuery {
  question: string;
  dateRange?: {
    start: string;
    end: string;
  };
  metrics?: string[];
}

export interface AnalyticsInsight {
  type: 'trend' | 'anomaly' | 'prediction' | 'recommendation';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  actionable: boolean;
  suggestedAction?: string;
  data?: Record<string, any>;
}
