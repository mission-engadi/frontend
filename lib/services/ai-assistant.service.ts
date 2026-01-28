/**
 * AI Assistant Service
 * Handles communication with AI agents for chat and generation tasks
 */

import { apiClient, serviceUrls } from '@/src/config/api';
import {
  AIContext,
  ChatRequest,
  ChatResponse,
  Message,
  ProjectGenerationRequest,
  ProjectDraft,
  BudgetScenario,
  ContentGenerationRequest,
  ContentDraft,
  CampaignGenerationRequest,
  CampaignDraft,
  AnalyticsQuery,
  AnalyticsInsight,
} from '@/src/types/ai-assistant';
import { mockAIService } from './ai-assistant-mock.service';

// TEMPORARY: Set to true to use mock service for testing
const USE_MOCK_SERVICE = true;

class AIAssistantService {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = serviceUrls.ai;
  }

  /**
   * Send a chat message to the AI assistant
   */
  async chat(params: ChatRequest): Promise<ChatResponse> {
    // TEMPORARY: Use mock service for testing
    if (USE_MOCK_SERVICE) {
      return mockAIService.chat(params);
    }

    try {
      const endpoint = this.getChatEndpoint(params.context);
      const response = await apiClient.post(`${this.baseUrl}${endpoint}`, {
        message: params.message,
        conversation_id: params.conversationId,
        metadata: params.metadata,
      });

      return {
        message: response.data.response || response.data.message,
        conversationId: response.data.conversation_id || params.conversationId || this.generateConversationId(),
        suggestedActions: response.data.suggested_actions || [],
        confidence: response.data.confidence || 0.85,
        sources: response.data.sources || [],
      };
    } catch (error) {
      console.error('AI chat error:', error);
      throw new Error('Failed to get AI response. Please try again.');
    }
  }

  /**
   * Stream chat responses (for real-time streaming)
   * Note: This is a placeholder for future WebSocket implementation
   */
  async *streamChat(params: ChatRequest): AsyncGenerator<string> {
    // For now, we'll simulate streaming by yielding the full response
    // In the future, this will use WebSocket or Server-Sent Events
    const response = await this.chat(params);

    // Simulate streaming by yielding chunks
    const words = response.message.split(' ');
    for (let i = 0; i < words.length; i++) {
      yield words[i] + ' ';
      // Small delay to simulate streaming
      await new Promise(resolve => setTimeout(resolve, 30));
    }
  }

  /**
   * Generate a project from a description
   */
  async generateProject(request: ProjectGenerationRequest): Promise<ProjectDraft> {
    // TEMPORARY: Use mock service
    if (USE_MOCK_SERVICE) {
      return mockAIService.generateProject(request);
    }

    try {
      const response = await apiClient.post(
        `${this.baseUrl}/api/v1/agents/projects/generate`,
        request
      );

      return response.data;
    } catch (error) {
      console.error('Project generation error:', error);
      throw new Error('Failed to generate project. Please try again.');
    }
  }

  /**
   * Generate budget scenarios for a project
   */
  async generateBudgetScenarios(params: {
    projectType: string;
    location: string;
    beneficiaries: number;
    description?: string;
  }): Promise<BudgetScenario[]> {
    // TEMPORARY: Use mock service
    if (USE_MOCK_SERVICE) {
      return mockAIService.generateBudgetScenarios(params);
    }

    try {
      const response = await apiClient.post(
        `${this.baseUrl}/api/v1/agents/budget/generate`,
        {
          project_type: params.projectType,
          location: params.location,
          beneficiaries: params.beneficiaries,
          description: params.description,
        }
      );

      // The backend returns scenarios in the response
      return response.data.scenarios || [];
    } catch (error) {
      console.error('Budget generation error:', error);
      throw new Error('Failed to generate budget scenarios. Please try again.');
    }
  }

  /**
   * Generate content (article, social post, etc.)
   */
  async generateContent(request: ContentGenerationRequest): Promise<ContentDraft> {
    // TEMPORARY: Use mock service
    if (USE_MOCK_SERVICE) {
      return mockAIService.generateContent(request);
    }

    try {
      const response = await apiClient.post(
        `${this.baseUrl}/api/v1/agents/content/generate`,
        {
          prompt: request.prompt,
          type: request.type,
          tone: request.tone || 'professional',
          length: request.length || 'medium',
          language: request.language || 'en',
          project_id: request.projectId,
        }
      );

      return response.data;
    } catch (error) {
      console.error('Content generation error:', error);
      throw new Error('Failed to generate content. Please try again.');
    }
  }

  /**
   * Translate content to multiple languages
   */
  async translateContent(params: {
    contentId?: string;
    content?: string;
    targetLanguages: string[];
    preserveTone?: boolean;
  }): Promise<Record<string, string>> {
    try {
      const response = await apiClient.post(
        `${this.baseUrl}/api/v1/agents/content/translate`,
        {
          content_id: params.contentId,
          content: params.content,
          target_languages: params.targetLanguages,
          preserve_tone: params.preserveTone !== false,
        }
      );

      return response.data.translations || {};
    } catch (error) {
      console.error('Translation error:', error);
      throw new Error('Failed to translate content. Please try again.');
    }
  }

  /**
   * Generate multi-platform campaign
   */
  async generateCampaign(request: CampaignGenerationRequest): Promise<CampaignDraft> {
    try {
      const response = await apiClient.post(
        `${this.baseUrl}/api/v1/agents/campaigns/generate`,
        {
          message: request.message,
          platforms: request.platforms,
          tone: request.tone || 'inspirational',
          project_id: request.projectId,
        }
      );

      return response.data;
    } catch (error) {
      console.error('Campaign generation error:', error);
      throw new Error('Failed to generate campaign. Please try again.');
    }
  }

  /**
   * Get analytics insights
   */
  async getAnalyticsInsights(query: AnalyticsQuery): Promise<AnalyticsInsight[]> {
    try {
      const response = await apiClient.post(
        `${this.baseUrl}/api/v1/agents/analytics/insights`,
        {
          question: query.question,
          date_range: query.dateRange,
          metrics: query.metrics,
        }
      );

      return response.data.insights || [];
    } catch (error) {
      console.error('Analytics insights error:', error);
      throw new Error('Failed to get analytics insights. Please try again.');
    }
  }

  /**
   * Get crisis intelligence for a location
   */
  async getCrisisIntelligence(params: {
    country?: string;
    region?: string;
    topics?: string[];
  }): Promise<any> {
    try {
      const response = await apiClient.get(
        `${this.baseUrl}/api/v1/agents/workflows/crisis-intelligence`,
        {
          params: {
            country: params.country,
            region: params.region,
            topics: params.topics?.join(','),
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Crisis intelligence error:', error);
      throw new Error('Failed to get crisis intelligence. Please try again.');
    }
  }

  /**
   * Get conversation history
   */
  async getConversationHistory(conversationId: string): Promise<Message[]> {
    try {
      const response = await apiClient.get(
        `${this.baseUrl}/api/v1/agents/conversations/${conversationId}`
      );

      return response.data.messages || [];
    } catch (error) {
      console.error('Failed to load conversation history:', error);
      return [];
    }
  }

  /**
   * Delete conversation history
   */
  async deleteConversation(conversationId: string): Promise<void> {
    try {
      await apiClient.delete(
        `${this.baseUrl}/api/v1/agents/conversations/${conversationId}`
      );
    } catch (error) {
      console.error('Failed to delete conversation:', error);
      throw new Error('Failed to delete conversation. Please try again.');
    }
  }

  /**
   * Get chat endpoint based on context
   */
  private getChatEndpoint(context: AIContext): string {
    const endpoints: Record<AIContext, string> = {
      project: '/api/v1/agents/chat/project',
      content: '/api/v1/agents/chat/content',
      campaign: '/api/v1/agents/chat/campaign',
      crm: '/api/v1/agents/chat/crm',
      analytics: '/api/v1/agents/chat/analytics',
      general: '/api/v1/agents/chat',
    };

    return endpoints[context] || endpoints.general;
  }

  /**
   * Generate a unique conversation ID
   */
  private generateConversationId(): string {
    return `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

export const aiAssistantService = new AIAssistantService();
