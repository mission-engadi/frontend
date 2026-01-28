/**
 * Mock AI Assistant Service
 * Provides simulated AI responses for testing without backend
 */

import {
  AIContext,
  ChatRequest,
  ChatResponse,
  ProjectGenerationRequest,
  ProjectDraft,
  BudgetScenario,
  ContentGenerationRequest,
  ContentDraft,
  CampaignGenerationRequest,
  CampaignDraft,
} from '@/src/types/ai-assistant';

class MockAIAssistantService {
  private conversationHistories: Map<string, Array<{ role: string; content: string }>> = new Map();

  /**
   * Simulate API delay
   */
  private async delay(ms: number = 1000): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Generate conversation ID
   */
  private generateConversationId(): string {
    return `mock_conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get context-specific welcome message
   */
  private getWelcomeMessage(context: AIContext): string {
    const messages: Record<AIContext, string> = {
      general: `Hi! I'm your AI assistant for MinistryOS. I can help you with:

- **Projects**: Create and manage humanitarian projects
- **Content**: Write articles, translate, optimize for SEO
- **Campaigns**: Multi-platform social media posts
- **CRM**: Donor management and communications
- **Analytics**: Data insights and forecasting

What would you like help with?`,

      project: `I can help you create and manage projects! Tell me:

1. What type of project? (water, food, education, health, etc.)
2. Where will it be located?
3. How many people will benefit?
4. What's your estimated budget?

I'll help you plan everything from budget scenarios to crisis intelligence!`,

      content: `I'm your content creation assistant! I can:

- Write articles about your projects
- Create social media posts
- Translate content to 4 languages (EN, ES, FR, PT)
- Optimize for SEO
- Generate video scripts

What content do you need?`,

      campaign: `I can create multi-platform campaigns! Just tell me your message and I'll:

- Adapt it for Facebook, Twitter, Instagram, LinkedIn, YouTube
- Suggest optimal posting times
- Predict engagement
- Add platform-specific hashtags

What's your campaign about?`,

      crm: `I'm your donor relationship specialist! I can help with:

- Writing personalized thank you messages
- Donor segmentation strategies
- Retention predictions
- Re-engagement campaigns

How can I help with your donors?`,

      analytics: `I can analyze your data! I provide:

- Trend analysis
- Revenue forecasting
- Anomaly detection
- Automated reports
- Actionable insights

What would you like to know about your data?`,
    };

    return messages[context] || messages.general;
  }

  /**
   * Extract project data from message
   */
  private extractProjectData(message: string): any {
    const lowerMessage = message.toLowerCase();
    const data: any = {};

    // Extract type
    if (lowerMessage.includes('water')) {
      data.type = 'water_sanitation';
      data.name = 'Clean Water Initiative';
    } else if (lowerMessage.includes('food')) {
      data.type = 'humanitarian';
      data.name = 'Food Distribution Program';
    } else if (lowerMessage.includes('education') || lowerMessage.includes('school')) {
      data.type = 'education';
      data.name = 'Education Support Program';
    } else if (lowerMessage.includes('health') || lowerMessage.includes('medical') || lowerMessage.includes('clinic')) {
      data.type = 'medical';
      data.name = 'Healthcare Initiative';
    }

    // Extract country
    const countries = ['kenya', 'haiti', 'uganda', 'india', 'ethiopia', 'nigeria', 'tanzania'];
    for (const country of countries) {
      if (lowerMessage.includes(country)) {
        data.country = country.charAt(0).toUpperCase() + country.slice(1);
        if (data.name) {
          data.name = `${data.name} - ${data.country}`;
        }
        break;
      }
    }

    // Extract beneficiaries
    const beneficiariesMatch = message.match(/(\d+)\s*(?:people|beneficiaries|persons)/i);
    if (beneficiariesMatch) {
      data.estimated_beneficiaries = parseInt(beneficiariesMatch[1]);
    }

    // Extract budget
    const budgetMatch = message.match(/\$?([\d,]+)(?:k|,000)?/i);
    if (budgetMatch) {
      let budget = parseInt(budgetMatch[1].replace(/,/g, ''));
      if (message.toLowerCase().includes('k')) {
        budget *= 1000;
      }
      data.estimated_budget = budget;
    }

    // Set default description
    if (data.type || data.country) {
      data.description = `A ${data.type || 'humanitarian'} project aimed at providing essential services and support to communities in need.`;
    }

    // Set dates (start today, end in 9 months)
    data.start_date = new Date().toISOString().split('T')[0];
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 9);
    data.end_date = endDate.toISOString().split('T')[0];

    return data;
  }

  /**
   * Generate contextual response based on message
   */
  private generateResponse(message: string, context: AIContext, history: Array<{ role: string; content: string }>): string {
    const lowerMessage = message.toLowerCase();

    // Project-related responses
    if (context === 'project' || lowerMessage.includes('project')) {
      if (lowerMessage.includes('water')) {
        return `Great! A water project is one of the most impactful initiatives. Here's what I recommend:

**Project Type**: Water & Sanitation
**Estimated Beneficiaries**: Based on typical village sizes, you're looking at 400-600 people per community.

**Key Considerations**:
1. **Location**: Kenya has varying water table depths - coastal vs. highland regions
2. **Budget**: Expect $40,000-$70,000 for well drilling with pumps
3. **Timeline**: 6-9 months including community training
4. **Sustainability**: Include maintenance training and spare parts

I'll auto-fill the form with these details now! ✨

Would you like me to generate detailed budget scenarios?`;
      }

      if (lowerMessage.includes('budget') || lowerMessage.includes('cost')) {
        return `I can generate three budget scenarios for your project:

**Minimal Scenario** ($45,000):
- Basic well drilling
- Manual pump installation
- Essential training

**Standard Scenario** ($60,000) - Recommended:
- Mechanized drilling
- Solar-powered pumps
- Comprehensive community training
- Water quality testing equipment

**Optimal Scenario** ($75,000):
- Advanced filtration systems
- 2-year maintenance contract
- Monthly water quality monitoring
- Emergency response kit

Which scenario would you like to explore further?`;
      }

      return `Tell me more about your project! What specific help do you need? I can assist with:
- Budget planning
- Beneficiary estimates
- Timeline creation
- Crisis intelligence for your location
- Project proposal generation`;
    }

    // Content-related responses
    if (context === 'content' || lowerMessage.includes('article') || lowerMessage.includes('write')) {
      if (lowerMessage.includes('water') || lowerMessage.includes('clean')) {
        return `I'll help you write an impactful article about clean water! Here's a draft:

**Title**: "Clean Water: Transforming Lives One Well at a Time"

**Opening**:
Access to clean water isn't just about quenching thirst—it's about dignity, health, and opportunity. In rural Kenya, women and children walk an average of 6 kilometers daily to fetch water. That's time stolen from education, income generation, and family.

**Body** (key points to expand):
- Health impact: 80% reduction in waterborne diseases
- Economic empowerment: Women can start small businesses
- Education: Children attend school instead of fetching water
- Community transformation: Entire villages revitalized

**Call to Action**:
Your support can bring clean water to 500 people. Join us in transforming lives.

**SEO Keywords**: clean water, Kenya, humanitarian, water wells, impact

Would you like me to expand any section or translate this to other languages?`;
      }

      return `I'm ready to help with content! I can:
- Write full articles (any length)
- Create social media posts
- Generate SEO-optimized titles
- Translate to Spanish, French, Portuguese
- Suggest hashtags and keywords

Just describe what you need!`;
    }

    // Campaign-related responses
    if (context === 'campaign' || lowerMessage.includes('social') || lowerMessage.includes('post')) {
      return `I'll create multi-platform posts for you!

**Facebook** (Engaging story):
🎉 AMAZING NEWS! Thanks to your generosity, 500 people in rural Kenya now have access to clean water! 💧

What does this mean?
- Children can go to school instead of walking 6km for water
- Mothers can start small businesses
- Waterborne diseases reduced by 80%

YOU made this possible! 🙌

[Photo gallery: Before & After]
👉 See the impact: [link]

**Twitter/X** (Concise):
Clean water = transformed lives! 🇰🇪
✅ 500 people now have access
✅ Children in school
✅ Communities thriving

Thanks to supporters like YOU! 💙
#CleanWater #Kenya #Impact

**Instagram** (Visual):
The moment everything changed... 💙

Swipe to see how your gift brought clean water to 500 people in Kenya ➡️

#CleanWater #Kenya #Humanitarian #Impact #TransformingLives

**Best posting times**:
- Facebook: Tuesday 7pm EST
- Twitter: Wednesday 12pm EST
- Instagram: Thursday 6pm EST

Would you like me to adjust the tone or create more variations?`;
    }

    // CRM-related responses
    if (context === 'crm' || lowerMessage.includes('donor') || lowerMessage.includes('thank')) {
      return `I'll help you craft a personalized thank you message:

**Subject**: You Changed Lives in Kenya - Thank You!

**Dear [Donor Name]**,

I wanted you to be the first to know: because of your generous gift of $500, clean water is now flowing in rural Kenya.

**Your Impact**:
- 500 people now have access to safe water
- 45 children are back in school (they were fetching water before)
- 12 mothers have started small businesses with their freed-up time

This morning, I watched as the first water flowed from the new well. The joy on the children's faces was indescribable. That moment happened because of YOU.

**What's Next**:
Over the next month, we'll provide training for the community to maintain the well. I'll send you photos and updates as they happen.

Thank you for being part of this transformation.

With gratitude,
[Your Name]

**Personalization tips**:
- Use donor's name throughout
- Reference their specific gift amount
- Include a personal photo if possible
- Send within 48 hours of completion

Would you like me to adjust the tone or create variations for different donor segments?`;
    }

    // Analytics-related responses
    if (context === 'analytics' || lowerMessage.includes('data') || lowerMessage.includes('insight')) {
      return `Based on typical ministry data patterns, here are key insights:

**📈 Trend Analysis**:
- Donations increased 23% month-over-month
- Social media engagement up 340% (campaigns working!)
- Email open rates: 28% (above nonprofit average of 21%)

**🎯 Key Opportunities**:
1. **High-value donor segment** (12 donors giving $1,000+)
   - Recommendation: Personal video updates increase retention by 82%

2. **At-risk donors** (5 donors, last gave 6+ months ago)
   - Total value: $2,400
   - Recommendation: Re-engagement campaign this week

3. **Social media** leverage
   - Your Kenya water story got 340% more engagement
   - Create similar content for other projects

**📊 Forecast (next 30 days)**:
- Expected donations: $14,200 (based on current trends)
- Confidence: 78%
- To reach your $18,000 goal: Launch one more project

Would you like me to generate a detailed report or focus on a specific metric?`;
    }

    // Generic helpful response
    return `I understand you're asking about "${message}".

${this.getWelcomeMessage(context)}

Could you provide more details about what you need help with?`;
  }

  /**
   * Mock chat method
   */
  async chat(params: ChatRequest): Promise<ChatResponse> {
    await this.delay(1500); // Simulate network delay

    const conversationId = params.conversationId || this.generateConversationId();

    // Get or create conversation history
    if (!this.conversationHistories.has(conversationId)) {
      this.conversationHistories.set(conversationId, []);
    }

    const history = this.conversationHistories.get(conversationId)!;

    // Add user message to history
    history.push({ role: 'user', content: params.message });

    // Generate response based on context and history
    const responseMessage = this.generateResponse(params.message, params.context, history);

    // Add assistant response to history
    history.push({ role: 'assistant', content: responseMessage });

    // Extract project data if in project context and message describes a project
    const suggestedActions: Array<{
      type: 'fill_form' | 'create_project' | 'generate_content' | 'create_campaign' | 'analyze_data';
      label: string;
      description: string;
      data: Record<string, any>;
    }> = [];
    if (params.context === 'project') {
      const projectData = this.extractProjectData(params.message);

      // If we extracted meaningful data, suggest auto-filling the form
      if (Object.keys(projectData).length > 0) {
        suggestedActions.push({
          type: 'fill_form' as const,
          label: 'Auto-fill project form',
          description: 'Fill the project form with extracted details',
          data: projectData,
        });
      }
    }

    return {
      message: responseMessage,
      conversationId,
      suggestedActions,
      confidence: 0.92,
      sources: ['Mock AI Service - Demo Mode'],
    };
  }

  /**
   * Mock project generation
   */
  async generateProject(request: ProjectGenerationRequest): Promise<ProjectDraft> {
    await this.delay(2000);

    return {
      name: 'Clean Water Initiative - Rural Kenya',
      description: 'Drilling wells and providing clean water access to 5 rural villages in Kenya, benefiting approximately 2,500 people.',
      type: 'WATER_SANITATION',
      country: 'Kenya',
      location: 'Eastern Region',
      estimatedBudget: 60000,
      estimatedBeneficiaries: 2500,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 270 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 9 months
      confidence: 0.88,
    };
  }

  /**
   * Mock budget scenarios
   */
  async generateBudgetScenarios(params: any): Promise<BudgetScenario[]> {
    await this.delay(2000);

    return [
      {
        name: 'minimal',
        totalCost: 45000,
        categories: [
          { name: 'Personnel', amount: 15000, description: 'Project manager and field coordinator' },
          { name: 'Equipment', amount: 20000, description: 'Basic drilling equipment and manual pumps' },
          { name: 'Training', amount: 5000, description: 'Community maintenance training' },
          { name: 'Contingency', amount: 5000, description: '10% contingency fund' },
        ],
        timeline: '6 months',
        description: 'Minimal viable project with basic equipment and essential training',
      },
      {
        name: 'standard',
        totalCost: 60000,
        categories: [
          { name: 'Personnel', amount: 18000, description: 'Full project team' },
          { name: 'Equipment', amount: 28000, description: 'Mechanized drilling with solar pumps' },
          { name: 'Training', amount: 7000, description: 'Comprehensive community training' },
          { name: 'Quality Testing', amount: 3000, description: 'Water quality monitoring equipment' },
          { name: 'Contingency', amount: 4000, description: '10% contingency fund' },
        ],
        timeline: '9 months',
        description: 'Recommended scenario with quality equipment and thorough training',
        recommended: true,
      },
      {
        name: 'optimal',
        totalCost: 75000,
        categories: [
          { name: 'Personnel', amount: 20000, description: 'Extended team with specialists' },
          { name: 'Equipment', amount: 35000, description: 'Advanced filtration systems and solar pumps' },
          { name: 'Training', amount: 10000, description: 'Advanced training and certification' },
          { name: 'Maintenance', amount: 5000, description: '2-year maintenance contract' },
          { name: 'Monitoring', amount: 3000, description: 'Monthly water quality monitoring' },
          { name: 'Contingency', amount: 2000, description: 'Contingency fund' },
        ],
        timeline: '12 months',
        description: 'Premium scenario with long-term sustainability and monitoring',
      },
    ];
  }

  /**
   * Mock content generation
   */
  async generateContent(request: ContentGenerationRequest): Promise<ContentDraft> {
    await this.delay(1800);

    return {
      title: 'Transforming Lives Through Clean Water',
      content: `# Transforming Lives Through Clean Water

In the heart of rural Kenya, clean water is more than a convenience—it's a lifeline...

(This is a mock response showing what the AI would generate)`,
      type: request.type,
      language: request.language || 'en',
      tags: ['water', 'kenya', 'impact', 'humanitarian'],
      seoScore: 85,
      confidence: 0.90,
    };
  }

  /**
   * Mock campaign generation
   */
  async generateCampaign(request: CampaignGenerationRequest): Promise<CampaignDraft> {
    await this.delay(2000);

    return {
      name: 'Kenya Water Project Impact Campaign',
      posts: request.platforms.map(platform => ({
        platform,
        content: `Platform-optimized content for ${platform}...`,
        hashtags: ['CleanWater', 'Kenya', 'Impact'],
        mediaType: 'text',
        characterCount: 120,
        suggestedTime: '2pm EST',
        engagementScore: 0.78,
      })),
      overallEngagement: 0.82,
      bestPostingTimes: {
        facebook: 'Tuesday 7pm',
        twitter: 'Wednesday 12pm',
        instagram: 'Thursday 6pm',
      },
    };
  }
}

export const mockAIService = new MockAIAssistantService();
