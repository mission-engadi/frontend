/**
 * QuickActions Component
 * Displays context-specific quick action buttons for AI assistant
 */

'use client';

import React from 'react';
import { Box, Chip, Typography } from '@mui/material';
import {
  Lightbulb as IdeaIcon,
  Description as DocumentIcon,
  Calculate as BudgetIcon,
  Campaign as CampaignIcon,
  Analytics as AnalyticsIcon,
  Help as HelpIcon,
} from '@mui/icons-material';
import { AIContext, QuickAction } from '@/src/types/ai-assistant';

interface QuickActionsProps {
  context: AIContext;
  onAction: (prompt: string) => void;
  disabled?: boolean;
}

// Define quick actions for each context
const quickActionsByContext: Record<AIContext, QuickAction[]> = {
  project: [
    {
      id: 'create-project',
      label: 'Create from description',
      prompt: 'I want to create a new project. Can you help me?',
      icon: 'idea',
      context: 'project',
    },
    {
      id: 'budget-scenarios',
      label: 'Generate budget',
      prompt: 'Can you create budget scenarios for my project?',
      icon: 'budget',
      context: 'project',
    },
    {
      id: 'crisis-check',
      label: 'Check crisis data',
      prompt: 'Are there any humanitarian crises in my project location?',
      icon: 'analytics',
      context: 'project',
    },
  ],
  content: [
    {
      id: 'write-article',
      label: 'Write an article',
      prompt: 'Help me write an article about my project',
      icon: 'document',
      context: 'content',
    },
    {
      id: 'translate',
      label: 'Translate content',
      prompt: 'I need to translate my content to multiple languages',
      icon: 'idea',
      context: 'content',
    },
    {
      id: 'seo-optimize',
      label: 'Optimize for SEO',
      prompt: 'Can you help optimize my content for search engines?',
      icon: 'analytics',
      context: 'content',
    },
  ],
  campaign: [
    {
      id: 'multi-platform',
      label: 'Multi-platform post',
      prompt: 'Create posts for all my social media platforms',
      icon: 'campaign',
      context: 'campaign',
    },
    {
      id: 'best-times',
      label: 'Best posting times',
      prompt: 'When should I post for maximum engagement?',
      icon: 'analytics',
      context: 'campaign',
    },
    {
      id: 'repurpose',
      label: 'Repurpose content',
      prompt: 'Turn my latest article into social media posts',
      icon: 'idea',
      context: 'campaign',
    },
  ],
  crm: [
    {
      id: 'donor-message',
      label: 'Thank you message',
      prompt: 'Help me write a thank you message for my donors',
      icon: 'document',
      context: 'crm',
    },
    {
      id: 'segment-donors',
      label: 'Segment donors',
      prompt: 'How should I segment my donor list?',
      icon: 'analytics',
      context: 'crm',
    },
    {
      id: 'retention',
      label: 'Retention insights',
      prompt: 'Which donors are at risk of lapsing?',
      icon: 'idea',
      context: 'crm',
    },
  ],
  analytics: [
    {
      id: 'insights',
      label: 'Get insights',
      prompt: 'What are the key insights from my data?',
      icon: 'analytics',
      context: 'analytics',
    },
    {
      id: 'forecast',
      label: 'Forecast revenue',
      prompt: 'What will my donations look like next month?',
      icon: 'idea',
      context: 'analytics',
    },
    {
      id: 'report',
      label: 'Generate report',
      prompt: 'Create a monthly board report',
      icon: 'document',
      context: 'analytics',
    },
  ],
  general: [
    {
      id: 'help',
      label: 'How can you help?',
      prompt: 'What can you help me with?',
      icon: 'help',
      context: 'general',
    },
    {
      id: 'project-help',
      label: 'Project assistance',
      prompt: 'I need help with my projects',
      icon: 'idea',
      context: 'general',
    },
    {
      id: 'content-help',
      label: 'Content creation',
      prompt: 'I want to create content',
      icon: 'document',
      context: 'general',
    },
  ],
};

const iconMap: Record<string, React.ReactElement> = {
  idea: <IdeaIcon fontSize="small" />,
  document: <DocumentIcon fontSize="small" />,
  budget: <BudgetIcon fontSize="small" />,
  campaign: <CampaignIcon fontSize="small" />,
  analytics: <AnalyticsIcon fontSize="small" />,
  help: <HelpIcon fontSize="small" />,
};

export function QuickActions({ context, onAction, disabled = false }: QuickActionsProps) {
  const actions = quickActionsByContext[context] || quickActionsByContext.general;

  return (
    <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
      <Typography variant="caption" sx={{ display: 'block', mb: 1, color: 'text.secondary' }}>
        Quick Actions
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {actions.map((action) => (
          <Chip
            key={action.id}
            label={action.label}
            icon={iconMap[action.icon || 'help']}
            onClick={() => onAction(action.prompt)}
            disabled={disabled}
            variant="outlined"
            size="small"
            sx={{
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
